import gsap from 'gsap/gsap-core';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Clock, Color, Group, Points, PointsMaterial, SphereBufferGeometry } from 'three';
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
    count: 100000,
    size: 0.02,
    radius: 5,
    branches: 3,
    spin: 1,
    speed: 0.2,
    breathingIntensity: 0.02,
    breathingDistance: 5,
    randomness: 0.2,
    spread: 5,
    innerColor: 0xff3c30,
    outerColor: 0x1b7184,
  }

  createGalaxyDefinition() {
    const colorInside = new Color(this.parameters.innerColor);
    const colorOutside = new Color(this.parameters.outerColor);
    const positions = new Float32Array(this.parameters.count * 3);
    const colors = new Float32Array(this.parameters.count * 3);
    for(let i = 0; i < this.parameters.count; i++) {
      const i3 = i * 3;
      const x = i3;
      const y = i3 + 1;
      const z = i3 + 2;

      // Positions
      const radius = Math.random() * this.parameters.radius;
      const spinAngle = radius * this.parameters.spin;
      const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2;
      const upwardsAngle = (i % 10) / 10 * Math.PI * 2;

      // const randomX = (Math.random() - 0.5) * this.parameters.randomness;
      // const randomY = (Math.random() - 0.5) * this.parameters.randomness;
      // const randomZ = (Math.random() - 0.5) * this.parameters.randomness;

      const randomX = Math.pow(Math.random(), this.parameters.spread) * (Math.random() < 0.5 ? 1 : -1);
      const randomY = Math.pow(Math.random(), this.parameters.spread) * (Math.random() < 0.5 ? 1 : -1);
      const randomZ = Math.pow(Math.random(), this.parameters.spread) * (Math.random() < 0.5 ? 1 : -1);

      positions[x] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[y] = Math.tan(upwardsAngle + spinAngle) * radius + randomY;
      positions[z] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Colors
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / this.parameters.radius);
      colors[x] = mixedColor.r;
      colors[y] = mixedColor.g;
      colors[z] = mixedColor.b;
    }
    return { positions, colors };
  }

  createOtherDefinition() {
    const positions = new Float32Array(this.parameters.count * 3);
    for(let i = 0; i < this.parameters.count; i++) {
      const i3 = i * 3;
      const x = i3;
      const y = i3 + 1;
      const z = i3 + 2;

      positions[x] = (Math.random() - 0.5) * 10;
      positions[y] = (Math.random() - 0.5) * 10;
      positions[z] = (Math.random() - 0.5) * 10;
    }
    return { positions };
  }

  start() {
    this.group = new Group();
    this.definitions = {
      'galaxy': this.createGalaxyDefinition(),
      'other': this.createOtherDefinition(),
    }
    const generateGalaxy = () => {
      const geometry = new BufferGeometry();
      const { positions, colors } = this.definitions.galaxy;
      geometry.setAttribute('position', new BufferAttribute(positions, 3));
      geometry.setAttribute('color', new BufferAttribute(colors, 3));
      const material = new PointsMaterial({
        size: this.parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: AdditiveBlending,
        vertexColors: true
      });
      const points = new Points(geometry, material);
      this.geometry = geometry;
      this.points = points;
      this.group.add(points);
      this.points.rotation.x = 1;
      this.points.rotation.z = 2.7;
    }
    generateGalaxy();
  }

  update(time) {
    const elapsedTime = clock.getElapsedTime();
    this.points.rotation.y = elapsedTime * this.parameters.speed;
    this.points.scale.y = Math.sin(elapsedTime + this.parameters.breathingDistance) * this.parameters.breathingIntensity;
    // if(Math.ceil(elapsedTime) % 5 == 0) {
    //   this.points.geometry.setAttribute('position', new BufferAttribute(this.definitions.other.positions, 3));
    // }
    // else {
    //   this.points.geometry.setAttribute('position', new BufferAttribute(this.definitions.galaxy.positions, 3));
    // }
    // for(let i = 0; i < this.parameters.count; i++) {
    //   const i3 = i * 3;
    //   const x = i3;
    //   const y = i3 + 1;
    //   const z = i3 + 2;
      // const radius = Math.random() * this.parameters.radius;
      // const spinAngle = radius * this.parameters.spin;
      // const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2;

      // const randomY = Math.pow(Math.random(), this.parameters.spread) * (Math.random() < 0.5 ? 1 : -1);
      // this.geometry.attributes.position.array[y] = Math.sin(branchAngle + spinAngle) * radius + randomY;
    // }
    this.geometry.attributes.position.needsUpdate = true;
  }

  exportAsSceneObject() {
    return this.group;
  }
}

class GalaxyParticle2 extends MonoBehaviour {
  parameters = {
    count: 100000,
    size: 0.02,
    radius: 5,
    branches: 3,
    spin: 1,
    speed: 0.2,
    breathingIntensity: 0.02,
    breathingDistance: 5,
    randomness: 0.2,
    spread: 5,
    innerColor: 0xff3c30,
    outerColor: 0x1b7184,
  }

  createGalaxyDefinition() {
    const colorInside = new Color(this.parameters.innerColor);
    const colorOutside = new Color(this.parameters.outerColor);
    const positions = new Float32Array(this.parameters.count * 3);
    const colors = new Float32Array(this.parameters.count * 3);
    for(let i = 0; i < this.parameters.count; i++) {
      const i3 = i * 3;
      const x = i3;
      const y = i3 + 1;
      const z = i3 + 2;

      // Positions
      const radius = Math.random() * this.parameters.radius;
      const spinAngle = radius * this.parameters.spin;
      const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2;
      const upwardsAngle = (i % 10) / 10 * Math.PI * 2;

      // const randomX = (Math.random() - 0.5) * this.parameters.randomness;
      // const randomY = (Math.random() - 0.5) * this.parameters.randomness;
      // const randomZ = (Math.random() - 0.5) * this.parameters.randomness;

      const randomX = Math.pow(Math.random(), this.parameters.spread) * (Math.random() < 0.5 ? 1 : -1);
      const randomY = Math.pow(Math.random(), this.parameters.spread) * (Math.random() < 0.5 ? 1 : -1);
      const randomZ = Math.pow(Math.random(), this.parameters.spread) * (Math.random() < 0.5 ? 1 : -1);

      positions[x] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[y] = Math.tan(upwardsAngle + spinAngle) * radius + randomY;
      positions[z] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Colors
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / this.parameters.radius);
      colors[x] = mixedColor.r;
      colors[y] = mixedColor.g;
      colors[z] = mixedColor.b;
    }
    return { positions, colors };
  }

  createOtherDefinition() {
    const positions = new Float32Array(this.parameters.count * 3);
    for(let i = 0; i < this.parameters.count; i++) {
      const i3 = i * 3;
      const x = i3;
      const y = i3 + 1;
      const z = i3 + 2;

      positions[x] = (Math.random() - 0.5) * 10;
      positions[y] = (Math.random() - 0.5) * 10;
      positions[z] = (Math.random() - 0.5) * 10;
    }
    return { positions };
  }

  createExtraDefinition() {
    const positions = new Float32Array(this.parameters.count * 3);
    for(let i = 0; i < this.parameters.count; i++) {
      const i3 = i * 3;
      const x = i3;
      const y = i3 + 1;
      const z = i3 + 2;

      positions[x] = (Math.random() - 0.5) * 5;
      positions[y] = (Math.random() - 0.5) * 5;
      positions[z] = (Math.random() - 0.5) * 5;
    }
    return { positions };
  }

  start() {
    this.group = new Group();
    this.definitions = {
      galaxy: this.createGalaxyDefinition(),
      other: this.createOtherDefinition(),
      // extra: this.createExtraDefinition(),
    }
    this.definitionOrder = ['galaxy', 'other'];
    this.currentIndex = 0;
    const generateGalaxy = () => {
      const geometry = new BufferGeometry();
      const { positions, colors } = this.definitions.galaxy;
      this.originalPosition = positions;
      geometry.setAttribute('position', new BufferAttribute(positions.slice(0), 3));
      geometry.setAttribute('color', new BufferAttribute(colors, 3));
      const material = new PointsMaterial({
        size: this.parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: AdditiveBlending,
        vertexColors: true
      });
      const points = new Points(geometry, material);
      this.geometry = geometry;
      this.points = points;
      this.group.add(points);
      this.points.rotation.x = 1;
      this.points.rotation.z = 2.7;
      this.currentPositions = positions;
    }
    generateGalaxy();

    this.triggeredSwitch = false;
    setInterval(() => {
      this.updateIndex();
      this.switchGeometry();
    }, 1000);
    this.switchAnimation = () => {};
  }

  updateIndex() {
    if(this.currentIndex < Object.keys(this.definitions).length) {
      this.currentIndex++;
    }
    else {
      this.currentIndex = 0;
    }
  }

  switchGeometry() {
    const nextGeometry = this.definitions[this.definitionOrder[this.currentIndex]];
    if(nextGeometry) {
      this.switchAnimation = () => {
        for(let i = 0; i < this.parameters.count; i++) {
          const i3 = i * 3;
          const x = i3;
          const y = i3 + 1;
          const z = i3 + 2;
          const xChange = Math.ceil(this.geometry.attributes.position.array[x]) <= Math.ceil(nextGeometry.positions[x]) ? -0.01 :  0.01;
          const yChange = Math.ceil(this.geometry.attributes.position.array[y]) <= Math.ceil(nextGeometry.positions[y]) ? -0.01 :  0.01;
          const zChange = Math.ceil(this.geometry.attributes.position.array[z]) <= Math.ceil(nextGeometry.positions[z]) ? -0.01 :  0.01;
          this.geometry.attributes.position.array[x] -= xChange;
          this.geometry.attributes.position.array[y] -= yChange;
          this.geometry.attributes.position.array[z] -= zChange;
        }
      }
    }
  }

  update(time) {
    const elapsedTime = clock.getElapsedTime();
    this.points.rotation.y = elapsedTime * this.parameters.speed;
    this.points.scale.y = Math.sin(elapsedTime + this.parameters.breathingDistance) * this.parameters.breathingIntensity;
    this.switchAnimation();
    // if(Math.ceil(elapsedTime) % 5 == 0) {
    //   this.triggeredSwitch = false;
    // }
    // if(Math.ceil(elapsedTime) % 2 == 0) {
    //   if(!this.triggeredSwitch) {
    //     this.triggeredSwitch = true;
    //     this.switchGeometry();
    //   }
    // }
    // if(Math.ceil(elapsedTime) % 5 == 0) {
    //   this.points.geometry.setAttribute('position', new BufferAttribute(this.definitions.other.positions, 3));
    // }
    // else {
    //   this.points.geometry.setAttribute('position', new BufferAttribute(this.definitions.galaxy.positions, 3));
    // }
    // for(let i = 0; i < this.parameters.count; i++) {
    //   const i3 = i * 3;
    //   const x = i3;
    //   const y = i3 + 1;
    //   const z = i3 + 2;
      // const radius = Math.random() * this.parameters.radius;
      // const spinAngle = radius * this.parameters.spin;
      // const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2;

      // const randomY = Math.pow(Math.random(), this.parameters.spread) * (Math.random() < 0.5 ? 1 : -1);
      // this.geometry.attributes.position.array[y] = Math.sin(branchAngle + spinAngle) * radius + randomY;
    // }
    this.geometry.attributes.position.needsUpdate = true;
  }

  exportAsSceneObject() {
    return this.group;
  }
}


class SiliconValley extends MonoBehaviour {
  parameters = {
    count: 100000,
    size: 0.02,
    radius: 5,
    branches: 3,
    spin: 1,
    speed: 0.5,
    breathingIntensity: 0.02,
    breathingDistance: 5,
    randomness: 0.2,
    spread: 5,
    innerColor: 0xff3c30,
    outerColor: 0x1b7184,
  }

  start() {
    this.geometryDefinitions = {
      'pos1': {
        define: () => {
          const positions = new Float32Array(this.parameters.count * 3);
          const colors = new Float32Array(this.parameters.count * 3);

          for(let i = 0; i < this.parameters.count; i++) {
            const i3 = i * 3;
            const x = i3;
            const y = i3 + 1;
            const z = i3 + 2;

            positions[x] = (Math.random() - 0.5) * 2;
            positions[y] = (Math.random() - 0.5) * 2;
            positions[z] = (Math.random() - 0.5) * 2;

            colors[x] = Math.random();
            colors[y] = Math.random();
            colors[z] = Math.random();
          }

          return { positions, colors };
        }
      },
      'pos2': {
        define: () => {
          const positions = new Float32Array(this.parameters.count * 3);
          const colors = new Float32Array(this.parameters.count * 3);

          for(let i = 0; i < this.parameters.count; i++) {
            const i3 = i * 3;
            const x = i3;
            const y = i3 + 1;
            const z = i3 + 2;

            positions[x] = (Math.random() - 0.5) * 10;
            positions[y] = (Math.random() - 0.5) * 10;
            positions[z] = (Math.random() - 0.5) * 10;

            colors[x] = Math.random();
            colors[y] = Math.random();
            colors[z] = Math.random();
          }

          return { positions, colors };
        }
      },
      'galaxy': {
        define: () => {
          const colorInside = new Color(this.parameters.innerColor);
          const colorOutside = new Color(this.parameters.outerColor);
          const positions = new Float32Array(this.parameters.count * 3);
          const colors = new Float32Array(this.parameters.count * 3);
          for(let i = 0; i < this.parameters.count; i++) {
            const i3 = i * 3;
            const x = i3;
            const y = i3 + 1;
            const z = i3 + 2;

            // Positions
            const radius = Math.random() * this.parameters.radius;
            const spinAngle = radius * this.parameters.spin;
            const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2;
            // const upwardsAngle = (i % 10) / 10 * Math.PI * 2;

            // const randomX = (Math.random() - 0.5) * this.parameters.randomness;
            // const randomY = (Math.random() - 0.5) * this.parameters.randomness;
            // const randomZ = (Math.random() - 0.5) * this.parameters.randomness;

            const randomX = Math.pow(Math.random(), this.parameters.spread) * (Math.random() < 0.5 ? 1 : -1);
            const randomY = Math.pow(Math.random(), this.parameters.spread) * (Math.random() < 0.5 ? 1 : -1);
            const randomZ = Math.pow(Math.random(), this.parameters.spread) * (Math.random() < 0.5 ? 1 : -1);

            positions[x] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[y] = randomY;
            positions[z] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            // Colors
            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radius / this.parameters.radius);
            colors[x] = mixedColor.r;
            colors[y] = mixedColor.g;
            colors[z] = mixedColor.b;
          }
          return { positions, colors };
        }
      }
    }
    this.group = new Group();

    const geometry = new BufferGeometry();

    const { positions, colors } = this.geometryDefinitions['galaxy'].define();

    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));

    const material = new PointsMaterial({
      size: this.parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexColors: true
    });
    const points = new Points(geometry, material);
    this.points = points;
    this.geometry = geometry;
    this.group.add(points);
    this.order = ['galaxy', 'pos2', 'pos1'];
    this.currentIndex = 0;
    this.switchAnimation = () => {}

    setInterval(() => {
      this.updateIndex();
      this.switchGeometry();
    }, 3000);
    this.points.rotation.x = 2.7;
    this.points.rotation.z = 1;
  }

  updateIndex() {
    if(this.currentIndex < Object.keys(this.geometryDefinitions).length - 1) {
      this.currentIndex++;
    }
    else {
      this.currentIndex = 0;
    }
  }

  switchGeometry() {
    console.log(this.currentIndex);
    console.log(this.order[this.currentIndex]);
    const { positions, colors } = this.geometryDefinitions[this.order[this.currentIndex]].define();
    if(positions) {
      this.switchAnimation = () => {
        for(let i = 0; i < this.parameters.count; i++) {
          const i3 = i * 3;
          const x = i3;
          const y = i3 + 1;
          const z = i3 + 2;
          const xChange = this.geometry.attributes.position.array[x] < positions[x] ? 0.1 :  -0.1;
          const yChange = this.geometry.attributes.position.array[y] < positions[y] ? 0.1 :  -0.1;
          const zChange = this.geometry.attributes.position.array[z] < positions[z] ? 0.1 :  -0.1;
          this.geometry.attributes.position.array[x] += xChange;
          this.geometry.attributes.position.array[y] += yChange;
          this.geometry.attributes.position.array[z] += zChange;

          // this.geometry.attributes.color.array[x] = colors[x];
          // this.geometry.attributes.color.array[y] = colors[y];
          // this.geometry.attributes.color.array[z] = colors[z];
        }
      }
    }
  }

  update(time) {
    this.switchAnimation();
    const elapsedTime = clock.getElapsedTime();
    this.points.rotation.y = elapsedTime * this.parameters.speed;
    this.points.rotation.x = Math.sin(elapsedTime) * 0.02;
    this.geometry.attributes.position.needsUpdate = true;
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
    // GalaxyParticle,
    // GalaxyParticle2,
    SiliconValley,
    ParticleEffect
  }
}
