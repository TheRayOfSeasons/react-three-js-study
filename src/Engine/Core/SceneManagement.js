import { Scene } from 'three';
import { Behaviour } from './Behaviour';


export class EngineScene extends Behaviour {
  gameObjects = {};
  instances = {};
  sceneProps = [];

  constructor() {
    super();
    this.scene = new Scene(...this.sceneProps);
  }

  start() {
    Object.entries(this.gameObjects).forEach(([key, gameObject]) => {
      const instance = new gameObject({ parentBehaviour: this });
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
