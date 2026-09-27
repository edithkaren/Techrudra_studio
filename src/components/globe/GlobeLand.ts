import landData from "./110m_land.json";
import { feature, mesh } from "topojson-client";

/** A single land polygon vertex in 3D. */
export type LandVertex = { x: number; y: number; z: number };

function to3d(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ] as [number, number, number];
}

/**
 * Build an array of 3D positions for every land polygon vertex using the
 * [world-atlas land-110m](https://github.com/topojson/world-atlas) data.
 * The scale is chosen so the land roughly fills a unit sphere.
 */
export function buildLandPositions(radius: number) {
  const meshData = mesh(landData, landData.objects.land) as unknown as number[][][];
  const positions: LandVertex[] = [];

  for (let i = 0; i < meshData.length; i += 2) {
    const [i1, i2] = meshData[i];
    const [lat1, lng1] = landData.objects.land.arcs[0][i1];
    const [lat2, lng2] = landData.objects.land.arcs[0][i2];
    const [x1, y1, z1] = to3d(lat1, lng1, radius);
    const [x2, y2, z2] = to3d(lat2, lng2, radius);
    positions.push({ x: x1, y: y1, z: z1 });
    positions.push({ x: x2, y: y2, z: z2 });
  }

  return positions;
}

/**
 * Lat/lng of every 110m land corner, for reprojection inside the vertex shader.
 */
export const landCorners = landData.objects.land.arcs[0];
