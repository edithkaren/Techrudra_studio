import { cities, latLngToPos, type City } from "./GlobeData";

/**
 * Compute 3D positions for every hub once, then pair them up into great-circle
 * arcs. Each arc travels a particle from its start city to its end city.
 */
export interface Hub {
  city: City;
  pos: [number, number, number];
  color: [number, number, number];
}

export interface Arc {
  start: Hub;
  end: Hub;
  color: [number, number, number];
  pos: [number, number, number];
}

/** Give each city a bright "source" color distinct from its node glow. */
const accentToColor = (rgb: [number, number, number]) => [
  rgb[0] / 255,
  rgb[1] / 255,
  rgb[2] / 255,
];

export function buildHubs(radius: number): Hub[] {
  return cities.map((city) => ({
    city,
    pos: latLngToPos(city.lat, city.lng, radius) as [number, number, number],
    color: [city.accent[0] / 255, city.accent[1] / 255, city.accent[2] / 255] as [number, number, number],
  }));
}

export function buildArcs(hubs: Hub[]): Arc[] {
  const arcs: Arc[] = [];
  const count = hubs.length;
  // Connect each hub to a few neighbours so the network feels dense but not
  // visually crowded.  The pattern is: i -> i+1, i+3, i+5 (modulo).
  for (let i = 0; i < count; i++) {
    for (const offset of [1, 3, 5]) {
      const j = (i + offset) % count;
      if (j <= i) continue;
      const a = hubs[i];
      const b = hubs[j];
      arcs.push({
        start: a,
        end: b,
        color: accentToColor(a.city.accent) as [number, number, number],
        pos: a.pos as [number, number, number],
      });
    }
  }
  return arcs;
}
