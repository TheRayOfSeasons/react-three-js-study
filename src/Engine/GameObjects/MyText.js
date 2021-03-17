import { FontLoader, Group, Mesh, MeshNormalMaterial, TextGeometry } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';

class MyTextLogic extends MonoBehaviour {
  start() {
    this.group = new Group;
    const loader = new FontLoader();
    let geometry;
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      geometry = new TextGeometry( 'Hello three.js!', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
      } );
      geometry.center();
      const material = new MeshNormalMaterial();
      const mesh = new Mesh(geometry, material);
      this.group.add(mesh);
    } );
  }

  exportAsSceneObject() {
    return this.group;
  }
}

export class MyText extends GameObject {
  monobehaviours = {
    MyTextLogic
  }
}