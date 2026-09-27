/** Globe data — a curated set of project/studio hubs around the world. */

export type City = {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  accent: [number, number, number]; // rgb, glow color
};

// A compact "network" of hubs that the arcs and nodes will orbit around.
export const cities: City[] = [
  { id: "ny", name: "New York", country: "USA", lat: 40.71, lng: -74.01, accent: [156, 39, 176] },
  { id: "sf", name: "San Francisco", country: "USA", lat: 37.77, lng: -122.42, accent: [30, 64, 175] },
  { id: "lax", name: "Los Angeles", country: "USA", lat: 34.05, lng: -118.24, accent: [220, 53, 69] },
  { id: "london", name: "London", country: "UK", lat: 51.51, lng: -0.13, accent: [255, 183, 17] },
  { id: "paris", name: "Paris", country: "France", lat: 48.86, lng: 2.35, accent: [191, 183, 236] },
  { id: "berlin", name: "Berlin", country: "Germany", lat: 52.52, lng: 13.40, accent: [255, 140, 0] },
  { id: "tokyo", name: "Tokyo", country: "Japan", lat: 35.68, lng: 139.69, accent: [241, 97, 78] },
  { id: "shanghai", name: "Shanghai", country: "China", lat: 31.23, lng: 121.47, accent: [255, 111, 0] },
  { id: "seoul", name: "Seoul", country: "South Korea", lat: 37.57, lng: 126.98, accent: [139, 19, 59] },
  { id: "delhi", name: "Delhi", country: "India", lat: 28.61, lng: 77.21, accent: [179, 182, 187] },
  { id: "mumbai", name: "Mumbai", country: "India", lat: 19.08, lng: 72.88, accent: [13, 100, 190] },
  { id: "sao_paulo", name: "São Paulo", country: "Brazil", lat: -23.55, lng: -46.63, accent: [52, 152, 219] },
  { id: "rio", name: "Rio de Janeiro", country: "Brazil", lat: -22.91, lng: -43.17, accent: [233, 30, 99] },
  { id: "cape_town", name: "Cape Town", country: "South Africa", lat: -33.92, lng: 18.42, accent: [52, 152, 219] },
  { id: "sydney", name: "Sydney", country: "Australia", lat: -33.87, lng: 151.21, accent: [52, 152, 219] },
  { id: "moscow", name: "Moscow", country: "Russia", lat: 55.76, lng: 37.61, accent: [241, 97, 78] },
];

/** Convert lat/lng -> unit-sphere Cartesian (solid angle, not naive). */
export function latLngToPos(lat: number, lng: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ] as [number, number, number];
}

/** Great-circle interpolator along the minor arc between two points. */
export function interpolateLatLng(a: { lat: number; lng: number }, b: { lat: number; lng: number }, t: number) {
  const arg = Math.acos(
    Math.sin((a.lat * Math.PI) / 180) * Math.sin((b.lat * Math.PI) / 180) +
      Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.cos(((b.lng - a.lng) * Math.PI) / 180),
  );
  if (arg < 1e-12) return a;
  const s = Math.sin(arg);
  const w1 = Math.sin((1 - t) * arg) / s;
  const w2 = Math.sin(t * arg) / s;
  return {
    lat: ((w1 * a.lat + w2 * b.lat) * Math.PI) / 180,
    lng: ((w1 * a.lng + w2 * b.lng) * Math.PI) / 180,
  };
}
