import { MonoBehaviour, GameObject } from '../Core/Behaviour';
import { BoxMeshComponent } from '../Models/BoxMeshComponent';

class Move extends MonoBehaviour {
  start() {
    this.mesh = this.getComponent('BoxMeshComponent').mesh;
    this.mesh.geometry.translate(1, 0 ,0);
  }
  update() {
    // this.mesh.geometry.position
  }
}

export class MovingBox extends GameObject {
  monobehaviours = {
    BoxMeshComponent,
    Move,
  }
}
