import { AxesHelper } from 'three';
import { GameObject, MonoBehaviour } from '../Core/Behaviour';

class AxesComponent extends MonoBehaviour {
  start() {
    this.axesHelper = new AxesHelper();
  }

  exportAsSceneObject() {
    return this.axesHelper;
  }
}

export class AxesObject extends GameObject {
  monobehaviours = {
    AxesComponent
  }
}
