import { WebGLRenderer } from 'three';
import { Size } from './Constants.js';
import { MainCamera } from './Cameras/MainCamera';
import { MainScene } from './Scenes/MainScene';

export const manifest = {
  init: canvas => {
    const renderer = new WebGLRenderer({
      antialias: true,
      canvas
    });
    renderer.setSize(Size.GameScreen.width, Size.GameScreen.height);
    const scene = new MainScene();
    scene.start();
    renderer.render(scene.scene, MainCamera);
    const animate = (time) => {
      scene.update(time);
      renderer.render(scene.scene, MainCamera);
    }
    renderer.setAnimationLoop(animate);
    renderer.render(scene.scene, MainCamera);
  }
}
