import { MonoBehaviour } from '../Core/Behaviour';
import { Shape, ShapeGeometry, MeshNormalMaterial, Mesh, Vector3 } from 'three';


export class CustomShape extends MonoBehaviour {
  start() {
    this.shape = new Shape();
    const x = 0, y = 0;
    // this.shape.moveTo( x + 5, y + 5 );
    const coordinatesList = [
      new Vector3(0, 0, 0),
      new Vector3(0, 10, 0),
      new Vector3(5, 10, 0),
      new Vector3(2, 8, 0),
      new Vector3(5, 5, 0)
    ];
    this.shape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
    // this.shape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
    // this.shape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
    // this.shape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
    // this.shape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
    // this.shape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

    this.geometry = new ShapeGeometry(new Shape(coordinatesList));
    this.material = new MeshNormalMaterial();
    this.mesh = new Mesh(this.geometry, this.material);
  }

  exportAsSceneObject() {
    return this.mesh;
  }
}
