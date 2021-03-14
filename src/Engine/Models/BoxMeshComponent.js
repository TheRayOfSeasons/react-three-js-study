import { MonoBehaviour } from '../Core/Behaviour';
import { BoxGeometry, MeshNormalMaterial, Mesh } from 'three';


export class BoxMeshComponent extends MonoBehaviour {
  start() {
    this.geometry = new BoxGeometry(1, 1, 1);
    this.material = new MeshNormalMaterial();
    this.mesh = new Mesh(this.geometry, this.material);
  }

  exportAsSceneObject() {
    return this.mesh;
  }
}
