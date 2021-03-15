import { PerspectiveCamera } from 'three';
import { Size } from '../Constants.js';

export const MainCamera = new PerspectiveCamera(
  75,
  Size.GameScreen.width / Size.GameScreen.height
);
MainCamera.position.z = 10;

