import { Scene } from 'three';
import { Behaviour } from './Behaviour';


export class EngineScene extends Behaviour {
  gameObjects = {};
  instances = {};
  sceneProps = [];
  cameras = {};
  defaultCamera = '';

  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.scene = new Scene(...this.sceneProps);
    this.modifyScene(this.scene);
  }

  modifyScene(scene) {}

  onSceneAwake() {}

  start() {
    this.onSceneAwake();
    this.currentCamera = this.cameras[this.defaultCamera];
    Object.entries(this.gameObjects).forEach(([key, gameObject]) => {
      const instance = new gameObject({ scene: this });
      this.instances[key] = instance;
      instance.start();
      const group = instance.exportObjectGroup();
      this.scene.add(group);
    });
  }

  update(time) {
    Object.values(this.instances).forEach(instance => instance.update(time));
  }
}
