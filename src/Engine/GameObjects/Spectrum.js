import peepoHappy from '../Textures/stars-png-634.png';
import { AdditiveBlending, BoxGeometry, BufferAttribute, BufferGeometry, CircleGeometry, Clock, FlatShading, Group, InstancedBufferAttribute, InstancedBufferGeometry, Mesh, MeshLambertMaterial, MeshNormalMaterial, Object3D, Points, PointsMaterial, RawShaderMaterial, ShaderMaterial, TextureLoader } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';

const clock = new Clock();
const colors = [0xf7a541, 0xf45d4c, 0xfa2e59, 0x4783c3, 0x9c6cb7];

class Particle extends MonoBehaviour {
  parameters = {
    count: 1000,
    waveIntensity: 2
  };
  particles = [];

  start() {
    this.group = new Group();
    const geometryCore = new BoxGeometry(0.035, 0.035, 0.035);
    const particlesGeometry = new BufferGeometry();
    const particlesMaterial = new PointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexColors: true,
      transparent: true,
    });

    const positions = new Float32Array(this.parameters.count * 3);
    const colors = new Float32Array(this.parameters.count * 3);
    for(let i = 0, i3 = 0; i < this.parameters.count; i++, i3 += 3) {
      const x = i3;
      const y = i3 + 1;
      const z = i3 + 2;
      positions[x] = (Math.random() - 0.5) * 2;
      positions[y] = (Math.random() - 0.5) * 2;
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
    particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new BufferAttribute(colors, 3));
    const particles = new Points(particlesGeometry, particlesMaterial);
    this.group.add(particles);
    this.particlesGeometry = particlesGeometry;
  }

  update(time) {
    const elapsedTime = clock.getElapsedTime();
    for(let i = 0; i < this.parameters.count; i++) {
      let i3 = i * 3;
      let x = i3;
      let y = i3 + 1;
      let z = i3 + 2;
      const xValue = this.particlesGeometry.attributes.position.array[x];
      this.particlesGeometry.attributes.position.array[y] = Math.sin(elapsedTime + xValue * this.parameters.waveIntensity);

      this.particles[i].position.x = this.particlesGeometry.attributes.position.array[x];
      this.particles[i].position.y = this.particlesGeometry.attributes.position.array[y];
      this.particles[i].position.z = this.particlesGeometry.attributes.position.array[z];
      this.particles[i].position.needsUpdate = true;
    }
    this.particlesGeometry.attributes.position.needsUpdate = true;
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
