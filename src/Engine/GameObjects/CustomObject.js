import { Clock } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';
import { CustomShape } from '../Models/CustomShape';

const clock = new Clock();

class CustomShapeLogic extends MonoBehaviour {
  start() {
    this.mesh = this.getComponent('CustomShape').mesh;
    // this.mesh.position.x = -5;
    // this.mesh.position.y = -10;
  }
  update(time) {
    // const elapsedTime = clock.getElapsedTime();
    // this.mesh.rotation.x = elapsedTime * Math.PI * 0.05;
    // this.mesh.rotation.y = elapsedTime * Math.PI * 0.05;
  }
}

export class CustomObject extends GameObject {
  monobehaviours = {
    CustomShape,
    CustomShapeLogic
  }
}
