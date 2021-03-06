import { MonoBehaviour, GameObject } from '../Core/Behaviour';
import { BoxMeshComponent } from '../Models/BoxMeshComponent';

class BoxLogic extends MonoBehaviour {
  start() {
    this.mesh = this.getComponent('BoxMeshComponent').mesh;
    this.mesh.position.x = -2;
    this.mesh.position.z = -2;
  }

  update(time) {
    this.mesh.rotation.x = time / 2000;
    this.mesh.rotation.y = time / 1000;
  }
}


export class BoxObject extends GameObject {
  monobehaviours = {
    BoxMeshComponent,
    BoxLogic
  }
}
