import { Raycaster, Vector3 } from 'three';
import { MainCamera } from '../Cameras/MainCamera';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';
import { BoxMeshComponent } from '../Models/BoxMeshComponent';


class HoverEffect extends MonoBehaviour {
  start() {
    this.mesh = this.getComponent('BoxMeshComponent').mesh;
    this.mousePosition = new Vector3(0, 0, 1);
    // let raycaster = new Raycaster(MainCamera.position, mousePosition.sub(MainCamera.position).normalize());
    window.addEventListener('mousemove', event => {
      // raycaster = new Raycaster(MainCamera.position, mousePosition.sub(MainCamera.position).normalize());
      this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
      // raycaster.setFromCamera(mousePosition, MainCamera);
      console.log('mousemode');
    }, false);
    // this.raycaster = raycaster;
  }

  update(time) {
    const raycaster = new Raycaster(this.mousePosition, new Vector3(0, 0, 1));
    // raycaster.setFromCamera();
    // console.log(this.mousePosition);
    // console.log(time);
    // console.log('Direction');
    // console.log(raycaster.ray.direction);
    // console.log('Origin');
    // console.log(raycaster.ray.origin);
  }
}

export class RaycastTest extends GameObject {
  monobehaviours = {
    BoxMeshComponent,
    HoverEffect
  }
}