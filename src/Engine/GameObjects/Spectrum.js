import peepoHappy from '../Textures/stars-png-634.png';
import gsap from 'gsap';
import { AdditiveBlending, BoxGeometry, BufferAttribute, BufferGeometry, CircleGeometry, Clock, FlatShading, Group, InstancedBufferAttribute, InstancedBufferGeometry, Mesh, MeshLambertMaterial, MeshNormalMaterial, Object3D, Points, PointsMaterial, RawShaderMaterial, ShaderMaterial, TextureLoader, SphereGeometry } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';

const clock = new Clock();
const colors = [0xf7a541, 0xf45d4c, 0xfa2e59, 0x4783c3, 0x9c6cb7];

class Particle extends MonoBehaviour {
  parameters = {
    count: 1000,
    particlesPerRow: 10,
    particlesPerColumn: 10,
    particlesPerHeight: 10,
    columnGap: 0.2,
    rowGap: 0.2,
    heightGap: 0.2, 
    waveIntensity: 2
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

    this.positionCollection = this.getPositions();
    const defaultPos = 'wave';
    const { positions, colors } = this.positionCollection[defaultPos]();
    const rowHeightParticles = this.parameters.particlesPerRow + this.parameters.particlesPerHeight;
    for(let i = 0, alt = true; i < this.parameters.count; i++) {
      if(i % rowHeightParticles == 0) {
        alt = !alt;
      }
      const shapes = alt ? [geometries.box, geometries.sphere] : [geometries.sphere, geometries.box];
      const geometry = i % 2 == 0 ? shapes[0] : shapes[1];
      const particle = new Object3D();
      const materialCore = new MeshNormalMaterial({
        color: colors[i % colors.length],
        // shading: FlatShading,
      });
      const box = new Mesh(geometry, materialCore);

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
    this.animations = this.getAnimations();
    this.targetPosition = positions;
    this.currentAnimation = 'wave';
    this.currentIndex = 0;
    this.animationOrder = ['wave', 'morphToTarget', 'morphToTarget'];
    this.geometryDefinitions = ['wave', 'particleBox', 'wave'];
    setInterval(() => {
      this.updateIndex();
      this.targetPosition = this.positionCollection[this.geometryDefinitions[this.currentIndex]]().positions;
      this.currentAnimation = this.animationOrder[this.currentIndex];
    }, 5000);
  }

  updateIndex() {
    if(this.currentIndex < Object.keys(this.animationOrder).length - 1) {
      this.currentIndex++;
    }
    else {
      this.currentIndex = 0;
    }
  }

  getPositions() {
    return {
      wave: () => {
        const positions = new Float32Array(this.parameters.count * 3);
        const colors = new Float32Array(this.parameters.count * 3);
        // Combined so we have more elements to build the box.
        const rowHeightParticles = this.parameters.particlesPerRow + this.parameters.particlesPerHeight;
        for(let i = 0, i3 = 0, columnPosition = -(this.parameters.particlesPerColumn / 2), alt = true; i < this.parameters.count; i++, i3 += 3) {
          const x = i3;
          const y = i3 + 1;
          const z = i3 + 2;
          const rowPosition = (i % (rowHeightParticles)) - (rowHeightParticles / 2);
          let currentColumn = columnPosition;
          if(i % rowHeightParticles == 0) {
            currentColumn = ++columnPosition;
            alt = !alt;
          }
          const xValue = rowPosition * this.parameters.rowGap;
          positions[x] = xValue;
          positions[y] = Math.sin(xValue * this.parameters.waveIntensity);
          positions[z] = currentColumn * this.parameters.columnGap;
        }
        return { positions, colors };
      },
      particleBox: () => {
        const positions = new Float32Array(this.parameters.count * 3);
        const colors = new Float32Array(this.parameters.count * 3);
        let i3 = 0;
        for(let xPos = 0; xPos < this.parameters.particlesPerRow; xPos++) {
          for(let yPos = 0; yPos < this.parameters.particlesPerRow; yPos++) {
            for(let zPos = 0; zPos < this.parameters.particlesPerRow; zPos++) {
              const x = i3;
              const y = i3 + 1;
              const z = i3 + 2;
              positions[x] = (xPos - (xPos / 2)) * this.parameters.rowGap;
              positions[y] = (yPos - (yPos / 2)) * this.parameters.columnGap;
              positions[z] = (zPos - (zPos / 2)) * this.parameters.heightGap;
              i3 += 3;
            }
          }
        }
        return { positions, colors };
      }
    }
  }

  getAnimations() {
    return {
      wave: (index, x, y, z) => {
        const elapsedTime = clock.getElapsedTime();
        const xValue = this.particlesGeometry.attributes.position.array[x];
        this.particlesGeometry.attributes.position.array[y] = Math.sin(elapsedTime + xValue * this.parameters.waveIntensity);
        this.particles[index].position.x = this.particlesGeometry.attributes.position.array[x];
        this.particles[index].position.y = this.particlesGeometry.attributes.position.array[y];
        this.particles[index].position.z = this.particlesGeometry.attributes.position.array[z];
        this.particles[index].position.needsUpdate = true;
      },
      morphToTarget: (index, x, y, z) => {
        gsap.to(this.particles[index].position, {
          duration: 2,
          x: this.targetPosition[x],
          y: this.targetPosition[y],
          z: this.targetPosition[z]
        });
      }
    }
  }

  update(time) {
    for(let i = 0; i < this.parameters.count; i++) {
      let i3 = i * 3;
      let x = i3;
      let y = i3 + 1;
      let z = i3 + 2;
      this.animations[this.currentAnimation](i, x, y, z);
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
