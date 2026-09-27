import { useEffect, useMemo, useCallback, useState, useRef } from "react";
import { Vector3, SphereGeometry, Mesh, MeshBasicMaterial, Raycaster, BackSide, AdditiveBlending, Color, FogExp2 } from "three";
import { extend, useThree, Canvas, useFrame, ThreeEvent, RawShaderMaterial as R3FRawShaderMaterial } from "@react-three/fiber";
import { OrbitControls, Sky, Stars, ContactShadows, Environment, Float, Grid } from "@react-three/drei";
import { cities, latLngToPos, type City } from "./GlobeData";
import { buildHubs, buildArcs } from "./GlobeCities";
import { buildLandPositions } from "./GlobeLand";
import {
  GLOBAL_TIME,
  GLOBAL_SUN,
  GLOBAL_NODES,
  GLOBAL_NODE_COLORS,
  GLOBAL_NODE_RADII,
  GLOBAL_ARCS,
  GLOBAL_ARC_COLORS,
  GLOBAL_ARC_PARTICLES,
  GLOBAL_RIPPLE,
  GLOBAL_PARALLAX,
  projectToNDC,
  closestPointOnSegment,
} from "./UtilityShader";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      dotGrid: React.DetailedHTMLProps<React.SVGProps<SVGGraphicsElement>, unknown>;
      energyWaves: React.DetailedHTMLProps<React.SVGProps<SVGGraphicsElement>, unknown>;
      scanStroke: React.DetailedHTMLProps<React.SVGProps<SVGGraphicsElement>, unknown>;
      rippleRing: React.DetailedHTMLProps<React.SVGProps<SVGGraphicsElement>, unknown>;
      cityNode: React.DetailedHTMLProps<React.SVGProps<SVGGraphicsElement>, unknown>;
      arcStrip: React.DetailedHTMLProps<React.SVGProps<SVGGraphicsElement>, unknown>;
      orbitRing: React.DetailedHTMLProps<React.SVGProps<SVGGraphicsElement>, unknown>;
      glowSphere: React.DetailedHTMLProps<React.SVGProps<SVGGraphicsElement>, unknown>;
      labelSphere: React.DetailedHTMLProps<React.SVGProps<SVGGraphicsElement>, unknown>;
      labels: React.DetailedHTMLProps<React.SVGProps<SVGGraphicsElement>, unknown>;
    }
  }
}

const dotGridMaterial = new R3FRawShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uNodeColor: { value: new Vector3(0, 0, 0) },
    uNodeRadius: { value: 0 },
    uSunDirection: { value: new Vector3(0, 0, 0) },
    uBackground: { value: new Vector3(0.01, 0.01, 0.02) },
  },
  vertexShader: `
    varying vec3 vWorldPosition;
    uniform mat4 viewMatrix;
    uniform mat4 projectionMatrix;
    uniform vec3 uNodeColor;
    uniform float uNodeRadius;
    uniform float uTime;
    uniform vec3 uSunDirection;
    uniform vec3 uBackground;

    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;

      float lum = max(dot(normalize(worldPos.xyz), normalize(uSunDirection)), 0.0);
      lum = mix(0.15, 1.0, lum);

      float dist = distance(uBackground, vWorldPosition);
      float size = uNodeRadius * (1.6 - 0.6 * smoothstep(1.2, 0.0, dist));

      gl_PointSize = size;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: `
    uniform vec3 uNodeColor;
    uniform float uTime;
    uniform vec3 uBackground;

    varying vec3 vWorldPosition;

    void main() {
      vec2 uv = gl_PointCoord - vec2(0.5);
      float r = length(uv);
      if (r > 0.5) discard;

      float ramp = 1.0 - smoothstep(0.0, 0.5, r);
      float glow = exp(-r * 6.0);
      vec3 col = uNodeColor * ramp * glow;

      float core = 1.0 - smoothstep(0.0, 0.45, r);
      col += vec3(1.0, 1.0, 1.0) * core * 0.5;

      float sun = dot(normalize(vWorldPosition), normalize(uBackground));
      col *= mix(vec3(0.3), vec3(1.0), sun);

      gl_FragColor = vec4(col, ramp * glow);
    }
  `,
});

const energyWavesMaterial = new R3FRawShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new Vector3(0, 0, 0) },
    uOpacity: { value: 0.08 },
    uRadius: { value: 1.0 },
  },
  vertexShader: `
    attribute float size;
    attribute vec3 offset;
    varying vec2 vUv;
    varying float vSize;
    varying vec3 vOffset;

    void main() {
      vUv = uv;
      vSize = size;
      vOffset = offset;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uRadius;

    varying vec2 vUv;
    varying float vSize;
    varying vec3 vOffset;

    void main() {
      vec2 c = vUv - 0.5;
      float dist = length(c);
      float wave = sin(dist * 24.0 + uTime * 2.2) * 0.5 + 0.5;
      float band = 1.0 - smoothstep(0.0, 0.5, dist) * (1.0 - wave * 0.3);
      vec3 col = uColor * band * uOpacity;
      gl_FragColor = vec4(col, uOpacity * band);
    }
  `,
});

const scanStrokeMaterial = new R3FRawShaderMaterial({
  uniforms: {
    uProgress: { value: 0.6 },
    uSpeed: { value: 0.05 },
    uColor: { value: new Vector3(0.65, 0.54, 0.98) },
    uOpacity: { value: 0.7 },
    uTime: { value: 0 },
  },
  vertexShader: `
    uniform float uProgress;
    uniform float uSpeed;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uTime;

    void main() {
      vec2 p = uv;
      p.y += sin(p.x * 12.0 + uProgress * 6.2831 + uTime * 1.5) * 0.015;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      float width = 0.006 + sin(mv.z * 4.0 + uTime) * 0.002;
      gl_PointSize = 120.0 * width;
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uTime;

    void main() {
      float pulse = 0.5 + 0.5 * sin(uTime * 5.0);
      float alpha = uOpacity * pulse;
      gl_FragColor = vec4(uColor, alpha);
    }
  `,
});

const rippleRingMaterial = new R3FRawShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uCenter: { value: new Vector3(0, 0, 0) },
    uRadius: { value: 0.05 },
    uColor: { value: new Vector3(0.65, 0.54, 0.98) },
    uOpacity: { value: 0.8 },
  },
  vertexShader: `
    uniform vec3 uCenter;
    uniform float uTime;
    uniform float uRadius;
    uniform vec3 uColor;
    uniform float uOpacity;

    out vec2 vUv;

    void main() {
      vUv = uv;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      float d = length(position) - (uRadius + uTime * 1.6);
      float alpha = uOpacity * (1.0 - smoothstep(0.0, 1.2, abs(d) / 0.02));
      if (alpha <= 0.0) discard;
      gl_PointSize = 6.0 + uTime * 2.0;
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform float uTime;
    uniform float uOpacity;

    in vec2 vUv;

    void main() {
      float wave = sin(gl_PointCoord.x * 6.2831 + uTime * 3.0) * 0.5 + 0.5;
      float alpha = uOpacity * (0.5 + 0.5 * wave);
      gl_FragColor = vec4(uColor, alpha);
    }
  `,
});

const cityNodeMaterial = new R3FRawShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new Vector3(0, 0, 0) },
    uGlow: { value: 0.5 },
    uRadius: { value: 0.02 },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uGlow;
    uniform float uRadius;

    out vec3 vColor;
    out float vGlow;

    void main() {
      vColor = uColor;
      vGlow = uGlow;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform float uGlow;
    uniform float uTime;
    uniform float uRadius;

    in vec3 vColor;
    in float vGlow;

    out vec4 fragColor;

    void main() {
      float pulse = 0.5 + 0.5 * sin(uTime * 1.5);
      vec3 col = mix(uColor, vec3(1.0), 0.2) * (uGlow * 0.6 + 0.4);
      gl_FragColor = vec4(col, 1.0);
    }
  `,
});

const arcStripMaterial = new R3FRawShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new Vector3(0, 0, 0) },
    uOpacity: { value: 0.12 },
    uStart: { value: new Vector3(0, 0, 0) },
    uEnd: { value: new Vector3(0, 0, 0) },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform vec3 uStart;
    uniform vec3 uEnd;

    out vec3 vColor;
    out vec3 vStart;
    out vec3 vEnd;

    void main() {
      vec3 p = mix(uStart, uEnd, 0.5);
      vColor = uColor;
      vStart = uStart;
      vEnd = uEnd;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform float uOpacity;

    in vec3 vColor;

    out vec4 fragColor;

    void main() {
      gl_FragColor = vec4(vColor, uOpacity);
    }
  `,
});

const orbitRingMaterial = new R3FRawShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new Vector3(0, 0, 0) },
    uOpacity: { value: 0.15 },
    uRadius: { value: 1.0 },
    uScale: { value: 1.0 },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uRadius;
    uniform float uScale;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uRadius;
    uniform float uScale;

    void main() {
      float pulse = 0.9 + 0.1 * sin(uTime * 1.5);
      vec3 col = uColor * pulse * uScale;
      gl_FragColor = vec4(col, uOpacity);
    }
  `,
});

const glowSphereMaterial = new R3FRawShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new Vector3(0, 0, 0) },
    uRadius: { value: 0.02 },
    uOpacity: { value: 0.3 },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uRadius;
    uniform float uOpacity;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uRadius;
    uniform float uOpacity;

    void main() {
      float pulse = 0.8 + 0.2 * sin(uTime * 0.6);
      gl_FragColor = vec4(uColor * pulse, uOpacity);
    }
  `,
});

const labelSphereMaterial = new R3FRawShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new Vector3(0, 0, 0) },
    uOpacity: { value: 0.6 },
  },
  vertexShader: `
    uniform float uTime;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;

    void main() {
      gl_FragColor = vec4(vec3(1.0), 0.6);
    }
  `,
});

const labelsMaterial = new R3FRawShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new Vector3(0, 0, 0) },
    uOpacity: { value: 0.8 },
  },
  vertexShader: `
    uniform float uTime;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;

    void main() {
      gl_FragColor = vec4(vec3(1.0), 0.8);
    }
  `,
});

const GlobeScene = () => {
  const { camera, mouse } = useThree();

  const hubs = useMemo(() => buildHubs(1.0), []);
  const arcs = useMemo(() => buildArcs(hubs), [hubs]);

  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [ripple, setRipple] = useState<{ center: [number, number, number]; radius: number } | null>(null);

  useEffect(() => {
    const nodes: [number, number, number][] = [];
    const colors: [number, number, number][] = [];
    const radii: [number, number, number][] = [];
    for (const h of hubs) {
      nodes.push(h.pos as [number, number, number]);
      colors.push([h.color[0] / 255, h.color[1] / 255, h.color[2] / 255] as [number, number, number]);
      radii.push(0.016 / 1.0);
    }
    GLOBAL_NODES.value = nodes;
    GLOBAL_NODE_COLORS.value = colors;
    GLOBAL_NODE_RADII.value = radii;
  }, [hubs]);

  useEffect(() => {
    const positions: [number, number, number][] = [];
    const colors: [number, number, number][] = [];
    const particles: [number, number, number][] = [];
    for (const a of arcs) {
      positions.push(a.start.pos as [number, number, number], a.end.pos as [number, number, number]);
      colors.push(a.color as [number, number, number], a.color as [number, number, number]);
      particles.push(a.start.pos as [number, number, number], a.end.pos as [number, number, number]);
    }
    GLOBAL_ARCS.value = positions;
    GLOBAL_ARC_COLORS.value = colors;
    GLOBAL_ARC_PARTICLES.value = particles;
  }, [arcs]);

  const handlePointerDown = useCallback((e: ThreeEvent<MouseEvent>) => {
    const raycaster = new Raycaster();
    const ptr = e.point;
    raycaster.setFromCamera(new Vector3(ptr.x, ptr.y, 0.5) as any, camera as any);
    const intersects = raycaster.intersectObject(new Mesh(new SphereGeometry(0.1), new MeshBasicMaterial({ transparent: true })) as any);
    if (intersects.length > 0) {
      const hit = intersects[0].point as [number, number, number];
      const cam = (camera as any).position as [number, number, number];
      const dir = [hit[0] - cam[0], hit[1] - cam[1], hit[2] - cam[2]] as [number, number, number];
      const len = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1] + dir[2] * dir[2]);
      const pushed = [hit[0] + (dir[0] / len) * 0.15, hit[1] + (dir[1] / len) * 0.15, hit[2] + (dir[2] / len) * 0.15] as [number, number, number];
      setRipple({ center: pushed, radius: 0.05 });
    }
  }, []);

  useFrame((state, dt) => {
    const t = GLOBAL_TIME.value + dt;
    GLOBAL_TIME.value = t;

    const sun = new Vector3(0.35, 0.8, 0.4).normalize();
    GLOBAL_SUN.value = [sun.x, sun.y, sun.z];

    const mx = mouse.x;
    const my = mouse.y;
    const parallaxX = mx * 0.04;
    const parallaxY = -my * 0.04;
    GLOBAL_PARALLAX.x = parallaxX;
    GLOBAL_PARALLAX.y = parallaxY;

    if (ripple) {
      const r = ripple.radius + dt * 1.6;
      setRipple({ center: ripple.center, radius: r });
      if (r > 0.5) {
        setRipple(null);
      }
    }
  });

  return (
    <>
      <Stars radius={2.5} depth={1.5} count={6000} factor={4} saturation={8} fade speed={0.4} />
      <Sky distance={4.5} sunPosition={[0.35, 0.8, 0.4]} inclination={0.45} azimuth={0.2} />

      <Grid args={[2.4, 60]} position={[0, -0.25, 0]} />
      <ContactShadows
        position={[0, -0.25, 0]}
        opacity={0.3}
        scale={2.4}
        blur={0.15}
        resolution={256}
      />

      <group position={[0, 0, 0]}>
        <Float
          speed={1.2}
          rotationIntensity={0.2}
          floatIntensity={0.6}
          rotation={[0.5, 0, 0]}
        >
          <mesh
            geometry={new SphereGeometry(1.01, 64, 64)}
            material={{ color: 0x0a0a1a, side: BackSide, depthWrite: false, transparent: true, opacity: 0.35, blending: AdditiveBlending }}
          />
        </Float>

        <dotGrid
          time={GLOBAL_TIME}
          sunDirection={GLOBAL_SUN}
          background={[0.01, 0.01, 0.02]}
        />

        {hubs.map((h) => (
          <cityNode
            key={h.city.id}
            time={GLOBAL_TIME}
            color={h.color}
            radius={0.016}
            glow={0.5 + 0.5 * Math.sin(GLOBAL_TIME.value * 1.5 + h.city.id.length)}
          />
        ))}

        <orbitRing
          radius={1.25}
          speed={1.2}
          color={[167, 139, 250]}
          opacity={0.15}
          time={GLOBAL_TIME}
          scale={0.9}
        />
        <orbitRing
          radius={1.45}
          speed={0.9}
          color={[59, 130, 246]}
          opacity={0.12}
          time={GLOBAL_TIME}
          scale={0.8}
          rotation={[0.5, 0, 0]}
        />

        {arcs.map((a, i) => (
          <arcStrip
            key={i}
            time={GLOBAL_TIME}
            color={a.color}
            opacity={0.12}
            start={a.start.pos}
            end={a.end.pos}
          />
        ))}

        <energyWaves
          color={[167, 139, 250]}
          time={GLOBAL_TIME}
          radius={0.8}
          opacity={0.12}
        />
        <energyWaves
          color={[236, 72, 153]}
          time={GLOBAL_TIME}
          radius={0.95}
          opacity={0.08}
          scale={0.6}
        />

        <scanStroke
          color={[167, 139, 250]}
          time={GLOBAL_TIME}
          progress={0.6}
          speed={0.05}
          opacity={0.7}
        />
      </group>

      {ripple && (
        <rippleRing
          center={ripple.center}
          radius={ripple.radius}
          color={[167, 139, 250]}
          time={GLOBAL_TIME}
          opacity={0.8}
        />
      )}

      <group position={[0, 0, 1.5]}>
        <labelSphere
          color={[167, 139, 250]}
          time={GLOBAL_TIME}
          opacity={0.6}
        />
        <labels
          color={[167, 139, 250]}
          time={GLOBAL_TIME}
          opacity={0.8}
        />
      </group>
    </>
  );
};

export default function Globe() {
  return <GlobeScene />;
}
