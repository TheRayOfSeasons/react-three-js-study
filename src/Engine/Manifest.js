import { WebGLRenderer } from 'three';
import { MainScene } from './Scenes/MainScene';
import { Size } from './Constants.js';
import { MainCamera } from './Cameras/MainCamera';
import { MyBox } from './GameObjects/MyBox';

export const manifest = {
  init: canvas => {
    const renderer = new WebGLRenderer({
      antialias: true,
      canvas
    });
    renderer.setSize(Size.GameScreen.width, Size.GameScreen.height);
    renderer.render(MainScene, MainCamera);
    MyBox.update(animate => {
      renderer.setAnimationLoop(animate);
    }, () => {
      renderer.render(MainScene, MainCamera);
    });
  }
}
