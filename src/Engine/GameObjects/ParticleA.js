import peepoHappy from '../Textures/peepoHappy.png';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Float32BufferAttribute, Group, InstancedBufferGeometry, MeshBasicMaterial, Points, PointsMaterial, TextureLoader, Vector3 } from 'three';
import { GameObject, MonoBehaviour } from '../Core/Behaviour';

class ParticleALogic extends MonoBehaviour {
  start() {
    const particleCount = 1800;
    const geometry = new BufferGeometry();
    const textureLoader = new TextureLoader();
    const vertices = [];
    const peepoSprite = textureLoader.load(peepoHappy);
    const sprites = [
      {
        color: [1.0, 2.0, 0.5],
        sprite: peepoSprite,
        size: 20,
      },
      {
        color: [0.95, 0.1, 0.5],
        sprite: peepoSprite,
        size: 15,
      },
      {
        color: [0.95, 0.1, 0.5],
        sprite: peepoSprite,
        size: 15,
      },
      {
        color: [0.85, 0, 0.5],
        sprite: peepoSprite,
        size: 8,
      }
    ];

    for(let i = 0; i < particleCount; i++) {
      let particleX = Math.random() * 2000 - 1000;
      let particleY = Math.random() * 2000 - 1000;
      let particleZ = Math.random() * 2000 - 1000;
      vertices.push(particleX, particleY, particleZ);
    }
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

    const group = new Group();
    const materials = [];

    for(const { color, sprite, size } of sprites) {
      const material = new PointsMaterial({
        size,
        map: sprite,
        blending: AdditiveBlending,
        depthTest: false,
        transparent: true,
      });
      material.color.setHSL(...color);
      const particles = new Points(geometry, material);
      particles.rotation.x = Math.random() * 5;
      particles.rotation.y = Math.random() * 5;
      particles.rotation.z = Math.random() * 5;
      materials.push(material);
      group.add(particles);
    }

    this.sprites = sprites;
    this.group = group;
    this.materials = materials;
  }

  update(time) {
    const particleRot = Date.now() * 0.0005;
    for(let i = 0; i < this.group.children.length; i++) {
      const child = this.group.children[i];
      const material = this.materials[i];
      const color = this.sprites[i].color;
      if(child instanceof Points) {
        child.rotation.y = particleRot * (i < 4 ? i + 1 : -(i + 1));
        const hex = (360 * (color[0] + particleRot) % 360) / 360;
        material.color.setHSL(hex, color[1], color[2]);
      }
    }
  }

  exportAsSceneObject() {
    return this.group;
  }
}

export class ParticleA extends GameObject {
  monobehaviours = {
    ParticleALogic
  }
}
