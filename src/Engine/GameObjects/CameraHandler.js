import { Vector3 } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';
import { Size } from '../Constants.js';
import { MainCamera } from '../Cameras/MainCamera';

class CameraLogic extends MonoBehaviour {
  start() {
    this.cursor = {x: 0, y: 0};
    window.addEventListener('mousemove', event => {
      this.cursor.x = event.clientX / Size.GameScreen.width - 0.5;
      this.cursor.y = -(event.clientY / Size.GameScreen.height - 0.5);
    });
  }

  update(time) {
    // MainCamera.position.x = Math.cos(this.cursor.x * 10);
    // MainCamera.position.y = Math.cos(this.cursor.y * 10);
    MainCamera.position.x = this.cursor.x * 10;
    MainCamera.position.y = this.cursor.y * 10;
    MainCamera.lookAt(new Vector3());
  }
}

export class CameraHandler extends GameObject {
  monobehaviours = {
    CameraLogic
  }
}
