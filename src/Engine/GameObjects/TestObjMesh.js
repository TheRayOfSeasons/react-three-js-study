import { Group } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';

class BustMesh extends MonoBehaviour {
  start() {
    this.group = new Group();
  }

  exportAsSceneObject() {
    return this.group;
  }
}

export class TestOBJMesh extends GameObject {
  monobehaviours = {
    BustMesh
  }
}
