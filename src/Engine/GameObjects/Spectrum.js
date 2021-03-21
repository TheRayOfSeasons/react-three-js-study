import peepoHappy from '../Textures/stars-png-634.png';
import { AdditiveBlending, BoxGeometry, BufferAttribute, BufferGeometry, CircleGeometry, Clock, FlatShading, Group, InstancedBufferAttribute, InstancedBufferGeometry, Mesh, MeshLambertMaterial, MeshNormalMaterial, Object3D, Points, PointsMaterial, RawShaderMaterial, ShaderMaterial, TextureLoader, SphereGeometry } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';

const clock = new Clock();
const colors = [0xf7a541, 0xf45d4c, 0xfa2e59, 0x4783c3, 0x9c6cb7];

class Particle extends MonoBehaviour {
  parameters = {
    count: 500,
    particlesPerRow: 20,
    particlesPerColumn: 25,
    columnGap: 0.1,
    rowGap: 0.1,
    waveIntensity: 4
  };
  particles = [];

  start() {
    this.group = new Group();
    const geometryCore = new BoxGeometry(0.035, 0.035, 0.035);
    const geometries = {
      box: new BoxGeometry(0.035, 0.035, 0.035),
      sphere: new SphereGeometry(0.0175, 8, 8),
    };
    const particlesGeometry = new BufferGeometry();
    const particlesMaterial = new PointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexColors: true,
      // transparent: true,
    });

    const positions = new Float32Array(this.parameters.count * 3);
    const colors = new Float32Array(this.parameters.count * 3);
    for(let i = 0, i3 = 0, columnPosition = -(this.parameters.particlesPerColumn / 2), alt = true; i < this.parameters.count; i++, i3 += 3) {
      const x = i3;
      const y = i3 + 1;
      const z = i3 + 2;
      const rowPosition = (i % this.parameters.particlesPerRow) - (this.parameters.particlesPerRow / 2);
      let currentColumn = columnPosition;
      if(i % this.parameters.particlesPerRow == 0) {
        currentColumn = columnPosition++;
        alt = !alt;
      }
      positions[x] = rowPosition * this.parameters.rowGap;
      positions[y] = 0;
      positions[z] = currentColumn * this.parameters.columnGap;

      console.log(currentColumn);
      const shapes = alt ? [geometries.box, geometries.sphere] : [geometries.sphere, geometries.box];
      const geometry = i % 2 == 0 ? shapes[0] : shapes[1];

      const particle = new Object3D();
      const materialCore = new MeshNormalMaterial({
        color: colors[i % colors.length],
        // shading: FlatShading,
      });
      const box = new Mesh(geometry, materialCore);
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
