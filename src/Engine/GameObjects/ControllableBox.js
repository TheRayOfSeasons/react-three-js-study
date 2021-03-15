import { Vector2, Vector3, Plane, Raycaster, Clock } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';
import { BoxMeshComponent } from '../Models/BoxMeshComponent';
import { MainCamera } from '../Cameras/MainCamera';

const clock = new Clock();

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

  update(time) {
    const elapsedTime = clock.getElapsedTime();
    this.mesh.position.x = Math.sin(elapsedTime) * 2 + 5;
    this.mesh.position.y = Math.cos(elapsedTime) * 2;
    this.mesh.position.z = Math.cos(elapsedTime) * 2;
  }
}


export class ControllableBox extends GameObject {
  monobehaviours = {
    BoxMeshComponent,
    ControllableBoxLogic
  }
}
