import { WebGLRenderer } from 'three';
import { Size } from './Constants.js';
import { MainCamera } from './Cameras/MainCamera';
import { MainScene } from './Scenes/MainScene';

const scenes = {
  MainScene,
}

const activeRenders = {};

class ActiveRender {
  constructor({canvas, sceneName, height, width, options}) {
    if(typeof(options) === 'object') {
      if(options.canvas) {
        canvas = options.canvas;
      }
    }
    this.renderer = new WebGLRenderer(options || {
      antialias: true,
      alpha: true,
      canvas
    });
    this.renderer.setSize(width || Size.GameScreen.width, height || Size.GameScreen.height);
    this.scene = new scenes[sceneName](canvas);
    this.scene.start();
    const animate = (time) => {
      this.scene.update(time);
      this.renderer.render(this.scene.scene, this.scene.currentCamera);
    }
    this.renderer.setAnimationLoop(animate);
  }
}

export const manifest = {
  init: (name, args) => {
    activeRenders[name] = new ActiveRender(args);
  },
}
