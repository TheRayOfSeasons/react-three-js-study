import { Vector2, Vector3, Plane, Raycaster } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';
import { BoxMeshComponent } from '../Models/BoxMeshComponent';
import { MainCamera } from '../Cameras/MainCamera';

class ControllableBoxLogic extends MonoBehaviour {
  start() {
    this.mesh = this.getComponent('BoxMeshComponent').mesh;
    this.mesh.position.x = 2;
    this.mesh.position.z = -2;
    this.mesh.lookAt(new Vector3(0, 1, 0));

    const plane = new Plane(new Vector3(0, 0, 1), 0);
    const raycaster = new Raycaster();
    let mousePosition = new Vector2();
    let intersectPoint = new Vector3();
    window.addEventListener('mousemove', event => {
      mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mousePosition, MainCamera);
      raycaster.ray.intersectPlane(plane, intersectPoint);
      this.mesh.lookAt(intersectPoint);
    }, false);
  }
}


export class ControllableBox extends GameObject {
  monobehaviours = {
    BoxMeshComponent,
    ControllableBoxLogic
  }
}
