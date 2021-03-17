import { Vector2, Vector3, Plane, Raycaster, Clock } from 'three';
import { MainCamera } from '../Cameras/MainCamera';
import { GameObject, MonoBehaviour } from '../Core/Behaviour';
import { currentScene } from '../Manifest';
import { BoxMeshComponent } from '../Models/BoxMeshComponent';

const clock = new Clock();

class BoxLogic extends MonoBehaviour {
  start() {
    const mousePosition = new Vector3(0, 0, 1);
    const raycaster = new Raycaster(MainCamera.position, mousePosition.sub(MainCamera.position).normalize());
    window.addEventListener('mousemove', event => {
      mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mousePosition, MainCamera);
    });
    this.raycaster = raycaster;
    this.mesh = this.getComponent('BoxMeshComponent').mesh;
  }
  
  update(time) {
    if(currentScene) {
      const intersects = this.raycaster.intersectObjects([this.mesh], true);
      if(intersects.length > 0) {
        const elapsedTime = clock.getElapsedTime();
        for(const intersect of intersects) {
          intersect.object.position.x = Math.sin(elapsedTime) * 2;
        }
      }
    }
  }
}

export class StaticBox extends GameObject {
  monobehaviours = {
    BoxMeshComponent,
    BoxLogic
  }
}
