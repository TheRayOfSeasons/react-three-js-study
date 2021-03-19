import { DirectionalLight, Group } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';

class Light extends MonoBehaviour {
  start() {
    this.group = new Group();
    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    this.group.add(directionalLight);
  }

  exportAsSceneObject() {
    return this.group;
  }
}

export class SceneDirectionalLight extends GameObject {
  monobehaviours = {
    Light,
  }
}
