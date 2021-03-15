import { Clock } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';
import { BoxMeshComponent } from '../Models/BoxMeshComponent';

const clock = new Clock();

class BoxLogic extends MonoBehaviour {
  start() {
    this.mesh = this.getComponent('BoxMeshComponent').mesh;
    this.mesh.position.x = -2;
    this.mesh.position.z = -2;
  }

  update(time) {
    const elapsedTime = clock.getElapsedTime();
    this.mesh.rotation.x = elapsedTime * Math.PI * 0.5;
    this.mesh.rotation.y = elapsedTime * Math.PI * 0.5;
    this.mesh.position.x = Math.sin(elapsedTime) * 2;
    this.mesh.position.y = Math.cos(elapsedTime) * 2;
    this.mesh.position.z = Math.cos(elapsedTime) * 7;
    this.mesh.scale.x = Math.sin(elapsedTime) + 1;
  }
}


export class BoxObject extends GameObject {
  monobehaviours = {
    BoxMeshComponent,
    BoxLogic
  }
}
