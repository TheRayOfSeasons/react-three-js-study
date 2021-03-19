import { BufferGeometry, Group, Line, LineBasicMaterial, Vector3 } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';

class Particle extends MonoBehaviour {
  start() {
    this.group = new Group();
    const lineMaterial = new LineBasicMaterial({ color: 0x0000ff });

    const points = [];
    points.push(new Vector3(0, 0, 0));
    points.push(new Vector3(2, 1, 2));
    points.push(new Vector3(2, 3, 2));
    points.push(new Vector3(5, 4, 3));

    const points2 = [];
    points2.push(new Vector3(1, 1, 1));
    points2.push(new Vector3(1, 2, 2));

    const indices = [
      0, 1,
      1, 2,
      2, 3,

      4, 5
    ]

    const geometry = new BufferGeometry().setFromPoints([...points, ...points2]);
    geometry.setIndex(indices);
    const line = new Line(geometry, lineMaterial);
    this.group.add(line);
  }

  exportAsSceneObject() {
    return this.group;
  }
}

export class LineParticle extends GameObject {
  monobehaviours = {
    Particle,
  }
}
