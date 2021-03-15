import { Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';
import { Size } from '../Constants.js';
import { MainCamera } from '../Cameras/MainCamera';
import { currentCanvas } from '../Manifest';

class CameraLogic extends MonoBehaviour {
  start() {
    // Leaving here for references
    // this.cursor = {x: 0, y: 0};
    // window.addEventListener('mousemove', event => {
    //   this.cursor.x = event.clientX / Size.GameScreen.width - 0.5;
    //   this.cursor.y = -(event.clientY / Size.GameScreen.height - 0.5);
    // });
    this.controls = new OrbitControls(MainCamera, currentCanvas);
    this.controls.enableDamping = true;
  }

  update(time) {
    // Leaving here for references
    // MainCamera.position.x = Math.sin(this.cursor.x * Math.PI * 2) * 3;
    // MainCamera.position.z = Math.cos(this.cursor.x * Math.PI * 2) * 3;
    // MainCamera.position.y = this.cursor.y * 5;
    // MainCamera.lookAt(new Vector3());
    this.controls.update();
  }
}

export class CameraHandler extends GameObject {
  monobehaviours = {
    CameraLogic
  }
}
