import { BoxGeometry, MeshNormalMaterial, Mesh } from 'three';

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshNormalMaterial();
const mesh = new Mesh(geometry, material);

export const Box = {
  geometry,
  material,
  mesh
};
