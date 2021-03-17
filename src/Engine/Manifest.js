import { WebGLRenderer } from 'three';
import { Size } from './Constants.js';
import { MainCamera } from './Cameras/MainCamera';
import { MainScene } from './Scenes/MainScene';

export let currentCanvas;
export let currentScene = new MainScene;

export const manifest = {
  init: canvas => {
    currentCanvas = canvas;
    const renderer = new WebGLRenderer({
      antialias: true,
      canvas
    });
    renderer.setSize(Size.GameScreen.width, Size.GameScreen.height);
    const scene = currentScene;
    scene.start();
    const animate = (time) => {
      scene.update(time);
      renderer.render(scene.scene, MainCamera);
    }
    renderer.setAnimationLoop(animate);
  }
}
