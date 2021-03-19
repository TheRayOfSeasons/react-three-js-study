import peepoHappy from '../Textures/stars-png-634.png';
import { AdditiveBlending, BoxGeometry, BufferAttribute, BufferGeometry, CircleGeometry, Clock, FlatShading, Group, InstancedBufferAttribute, InstancedBufferGeometry, Mesh, MeshLambertMaterial, MeshNormalMaterial, Object3D, Points, PointsMaterial, RawShaderMaterial, ShaderMaterial, TextureLoader } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';

const clock = new Clock();
const colors = [0xf7a541, 0xf45d4c, 0xfa2e59, 0x4783c3, 0x9c6cb7];

class Particle extends MonoBehaviour {
  parameters = {
    count: 100
  };
  particles = [];

  start() {
    this.group = new Group();
    const geometryCore = new BoxGeometry(0.035, 0.035, 0.035);
    
    const positions = new Float32Array(this.parameters.count * 3);
    for(let i = 0, i3 = 0; i < this.parameters.count; i++, i3 += 3) {
      const x = i3;
      const y = i3 + 1;
      const z = i3 + 2;
      positions[x] = (Math.random() - 0.5) * 2;
      positions[y] = 0;
      positions[z] = (Math.random() - 0.5) * 2;
      
      const particle = new Object3D();
      const materialCore = new MeshNormalMaterial({
        color: colors[i % colors.length],
        // shading: FlatShading,
      });
      const box = new Mesh(geometryCore, materialCore);
      box.geometry.__dirtyVertices = true;
      box.geometry.dynamic = true;
      box.position.set(positions[x], positions[y], positions[z]);

      particle.add(box);
      this.particles.push(particle);
      this.group.add(particle);
      this.geometryCore = geometryCore;
    }
    console.log(this.particles);
  }

  update(time) {
    const elapsedTime = clock.getElapsedTime();
    // console.log(this.group.children[10].children[0].position);
    for(let i = 0; i < this.parameters.count; i++) {
      const xValue = this.particles[i].position.x;
      this.particles[i].position.y = Math.sin(elapsedTime + xValue);
      this.particles[i].position.needsUpdate = true;
    }
  }

  exportAsSceneObject() {
    return this.group;
  }
}

export class Spectrum extends GameObject {
  monobehaviours = {
    Particle
  }
}
