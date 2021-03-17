import { OrthographicCamera, PerspectiveCamera } from 'three';
import { Size } from '../Constants.js';

export const MainCamera = new PerspectiveCamera(
  75,
  Size.GameScreen.width / Size.GameScreen.height
);
// const aspectRatio = Size.GameScreen.width / Size.GameScreen.height;
// export const MainCamera = new OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100);
MainCamera.position.z = 5;
// MainCamera.position.x = 3;
// MainCamera.rotation.y = 0.8;

