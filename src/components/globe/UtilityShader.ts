import { Vector3 } from "three";

/**
 * A uniform that survives React re-renders without being recreated every frame.
 * We point Three's uniform API at this object; the renderer reads .value each
 * render pass.  Zero-cost reuse.
 */
export class UniformState<T> {
  constructor(public value: T) {}
}

/**
 * A plain 3-component vector stored as a [number, number, number] tuple.
 * Kept free of Float32Array subclasses and accessors so the project's
 * erasableSyntaxOnly tsconfig stays happy.
 */
export class Vector3State {
  constructor(
    public readonly values: [number, number, number]
  ) {}

  get x(): number { return this.values[0]; }
  set x(v: number) { this.values[0] = v; }

  get y(): number { return this.values[1]; }
  set y(v: number) { this.values[1] = v; }

  get z(): number { return this.values[2]; }
  set z(v: number) { this.values[2] = v; }
}

/**
 * One [number, number, number] tuple exposed as a uniform value.
 */
export class Tuple3State<T = [number, number, number]> {
  constructor(public value: T) {}
}

// ── Globally shared uniform state (updated from useFrame) ────────────────────────
export const GLOBAL_TIME = new UniformState(0);
export const GLOBAL_SUN = new Tuple3State([0.35, 0.8, 0.4]);
export const GLOBAL_NODES = new Tuple3State<[number, number, number][]>([]);
export const GLOBAL_NODE_COLORS = new Tuple3State<[number, number, number][]>([]);
export const GLOBAL_NODE_RADII = new Tuple3State<[number, number, number]>([0, 0, 0]);
export const GLOBAL_ARCS = new Tuple3State<[number, number, number][]>([]);
export const GLOBAL_ARC_COLORS = new Tuple3State<[number, number, number][]>([]);
export const GLOBAL_ARC_PARTICLES = new Tuple3State<[number, number, number][]>([]);
export const GLOBAL_RIPPLE = new Tuple3State<{ center: [number, number, number]; radius: number } | null>(null);
export const GLOBAL_PARALLAX = new Vector3State([0, 0, 0]);

/**
 * Project a 3D point onto the camera's view plane using the camera's forward
 * vector.  Used for parallax dipoles on the globe surface.
 */
export function projectToNDC(p: [number, number, number], camera: any, target: [number, number, number]) {
  const fwd = new Vector3().copy(target).sub(camera.position).normalize();
  return [(p[0] - target[0]) / (camera.right.length() * 2), (p[1] - target[1]) / (camera.up.length() * 2)] as [number, number];
}

/**
 * Find the nearest point on a 3D line segment to a reference point (the camera).
 */
export function closestPointOnSegment(a: [number, number, number], b: [number, number, number], ref: [number, number, number]) {
  const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const ap = [ref[0] - a[0], ref[1] - a[1], ref[2] - a[2]];
  const t = (ab[0] * ap[0] + ab[1] * ap[1] + ab[2] * ap[2]) / (ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2]);
  return [a[0] + ab[0] * Math.max(0, Math.min(1, t)), a[1] + ab[1] * Math.max(0, Math.min(1, t)), a[2] + ab[2] * Math.max(0, Math.min(1, t))] as [number, number, number];
}
