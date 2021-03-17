import { AdditiveBlending, BufferAttribute, BufferGeometry, Clock, Group, Points, PointsMaterial, SphereBufferGeometry } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';

const clock = new Clock();

// prototypes:

// DNA
// for(let i = 0; i < this.particleCount; i++) {
//   let i3 = i * 3;
//   let x = i3;
//   let y = i3 + 1;
//   let z = i3 + 2;
//   const xValue = this.particlesGeometry.attributes.position.array[x];
//   this.particlesGeometry.attributes.position.array[y] = Math.sin(elapsedTime + xValue);
//   this.particlesGeometry.attributes.position.array[z] = Math.cos(elapsedTime + xValue);
// }

class SphereParticles extends MonoBehaviour {
  start() {
    this.group = new Group();
    const particlesGeometry = new SphereBufferGeometry(1, 32, 32);
    const particlesMaterial = new PointsMaterial({
      size: 0.02,
      sizeAttenuation: true
    });
    const particles = new Points(particlesGeometry, particlesMaterial);
    this.group.add(particles);
  }

  exportAsSceneObject() {
    return this.group;
  }
}

class BufferedParticles extends MonoBehaviour {
  particleCount = 1000;

  start() {
    this.group = new Group();
    const particlesGeometry = new BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);

    for(let i = 0; i < this.particleCount; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new BufferAttribute(colors, 3));
    const particlesMaterial = new PointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexColors: true
    });
    const particles = new Points(particlesGeometry, particlesMaterial);
    this.particlesGeometry = particlesGeometry;
    this.particles = particles;
    this.group.add(particles);
  }

  update(time) {
    const elapsedTime = clock.getElapsedTime();
    this.particles.rotation.y = elapsedTime * 1;
    this.particles.rotation.z = elapsedTime * 0.02;
    for(let i = 0; i < this.particleCount; i++) {
      let i3 = i * 3;
      let x = i3;
      let y = i3 + 1;
      let z = i3 + 2;
      const xValue = this.particlesGeometry.attributes.position.array[x];
      const yValue = this.particlesGeometry.attributes.position.array[y];
      const zValue = this.particlesGeometry.attributes.position.array[z];
      // this.particlesGeometry.attributes.position.array[x] = Math.tan(elapsedTime);
      this.particlesGeometry.attributes.position.array[y] = Math.sin(elapsedTime + xValue);
      // this.particlesGeometry.attributes.position.array[z] = Math.tan(elapsedTime + xValue);
    }
    this.particlesGeometry.attributes.position.needsUpdate = true;
  }

  exportAsSceneObject() {
    return this.group;
  }
}

class GalaxyParticle extends MonoBehaviour {
  parameters = {
    count: 1000,
    size: 0.02,
    radius: 5,
    branches: 3,
    spin: 0.5,
    speed: 2,
    randomness: 0.1,
  }

  start() {
    this.group = new Group();
    const generateGalaxy = () => {
      const geometry = new BufferGeometry();
      const positions = new Float32Array(this.parameters.count * 3);
      for(let i = 0; i < this.parameters.count; i++) {
        const i3 = i * 3;
        const x = i3;
        const y = i3 + 1;
        const z = i3 + 2;
        const radius = Math.random() * this.parameters.radius;
        const spinAngle = radius * this.parameters.spin;
        const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2;

        const randomX = (Math.random() - 0.5) * this.parameters.randomness;
        const randomY = (Math.random() - 0.5) * this.parameters.randomness;
        const randomZ = (Math.random() - 0.5) * this.parameters.randomness;

        positions[x] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[y] = randomY;
        positions[z] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
      }
      geometry.setAttribute('position', new BufferAttribute(positions, 3));
      const material = new PointsMaterial({
        size: this.parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: AdditiveBlending
      });
      const points = new Points(geometry, material);
      this.geometry = geometry;
      this.points = points;
      this.group.add(points);
    }
    generateGalaxy();
  }

  update(time) {
    const elapsedTime = clock.getElapsedTime();
    this.points.rotation.y = elapsedTime * this.parameters.speed;
  }

  exportAsSceneObject() {
    return this.group;
  }
}

class ParticleEffect extends MonoBehaviour {
  start() {
    this.group = new Group();
  }

  exportAsSceneObject() {
    return this.group;
  }
}

export class SpectrumParticle extends GameObject {
  monobehaviours = {
    // SphereParticles,
    // BufferedParticles,
    GalaxyParticle,
    ParticleEffect
  }
}
