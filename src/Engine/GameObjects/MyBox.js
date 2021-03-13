import { Box } from '../Models/Box';

export const MyBox = {
  meshModel: Box,
  start: () => {},
  update: (method, render) => {
    const animate = time => {
      Box.mesh.rotation.x = time / 2000;
      Box.mesh.rotation.y = time / 1000;
      render();
    }
    method(animate);
  }
}
