import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: 0xff0000 });
const mesh = new Mesh(geometry, material);

export const Box = {
  geometry,
  material,
  mesh
};
