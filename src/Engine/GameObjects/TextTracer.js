import gsap from 'gsap';
import { FontLoader, Group, TextGeometry, Vector2, Vector3, DoubleSide, Mesh, MeshNormalMaterial, Raycaster, Clock, PlaneGeometry, MeshBasicMaterial, SphereGeometry } from 'three';
import { MainCamera } from '../Cameras/MainCamera';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';
import { currentScene } from '../Manifest';


const clock = new Clock();

const fontUrl = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';

const charCollection = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function createTextMappings(count, offset) {
  const mappings = [];
  for(let i = 0; i < count; i++) {
    for(let j = 0; j < count; j++) {
      mappings.push({
        text: charCollection.charAt(Math.floor(Math.random() * charCollection.length)),
        position: new Vector3(i + offset, j + offset, 0)
      });
    }
  }
  return mappings;
}


const textMappings = createTextMappings(10, 0);

class TextMeshGroup extends MonoBehaviour {
  start() {
    this.group = new Group();
    this.raycastGroup = new Group();
    const fontLoader = new FontLoader();
    fontLoader.load(fontUrl, font => {
      for(const { text, position } of textMappings) {
        const geometry = new TextGeometry(text, {
          font,
          size: 1,
          height: 1,
          // curveSegments: 12,
          // bevelEnabled: true,
          // bevelThickness: 10,
          // bevelSize: 8,
          // bevelOffset: 0,
          // bevelSegments: 5
        });
        const material = new MeshNormalMaterial();
        // material.fog = true;
        const mesh = new Mesh(geometry, material);
        mesh.position.x = position.x - 5;
        mesh.position.y = position.y - 5;
        mesh.position.z = position.z - 3;
        mesh.originalPosition = position;
        mesh.originalScaleZ = mesh.scale.z;
        mesh.text = text;
        this.group.add(mesh);

        const plane = new PlaneGeometry(1, 1, 1);
        const planeMaterial = new MeshBasicMaterial({color: 0x000000, side: DoubleSide, opacity: 0});
        planeMaterial.transparent = true;
        const planeMesh = new Mesh(plane, planeMaterial);
        planeMesh.position.x = position.x - 5;
        planeMesh.position.y = position.y - 5;
        planeMesh.position.z = position.z;
        planeMesh.target = mesh;
        this.raycastGroup.add(planeMesh);
      }
    });
  }

  exportAsSceneObject() {
    const group = new Group();
    group.add(this.group);
    group.add(this.raycastGroup);
    return group;
  }
}

class TextHoverEffect extends MonoBehaviour {
  start() {
    this.mousePosition = new Vector2(0, 0);
    this.raycaster = new Raycaster();
    window.addEventListener('mousemove', event => {
      this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
  }

  update(time) {
    this.objects = this.getComponent('TextMeshGroup').raycastGroup.children;
    if(currentScene) {
      this.raycaster = new Raycaster();
      this.raycaster.setFromCamera(this.mousePosition, MainCamera);

      // const directionGroup = this.getComponent('RayDirectionHelper').directionGroup;
      // const originGroup = this.getComponent('RayDirectionHelper').originGroup;

      // directionGroup.position.x = this.raycaster.ray.direction.x;
      // directionGroup.position.y = this.raycaster.ray.direction.y;
      // directionGroup.position.z = this.raycaster.ray.direction.z;

      // originGroup.position.x = this.raycaster.ray.origin.x;
      // originGroup.position.y = this.raycaster.ray.origin.y;
      // originGroup.position.z = this.raycaster.ray.origin.z;

      // document.getElementById('logs').innerHTML = `Direction ${JSON.stringify(this.raycaster.ray.direction)}<br />Origin: ${JSON.stringify(this.raycaster.ray.origin)}`;

      const speed = 0.5;
      for(const object of this.objects) {
        let intersects = this.raycaster.intersectObjects([object], true);
        intersects = [...intersects];
        // const elapsedTime = clock.getElapsedTime();
        if(intersects.map(intersect => intersect.object.text).includes(object.text)) {
          document.getElementById('logs').innerHTML = `hover ${object.target.text}`;
          if(object.target.scale.z < 3) {
            object.target.scale.z += speed;
          }
          // object.target.position.z = object.target.originalPosition.z;
          // object.target.scale.z = 3;
        }
        else {
          if(object.target.scale.z > 1) {
            object.target.scale.z -= speed;
          }
        }
      }
    }
  }
}

class RayDirectionHelper extends MonoBehaviour {
  start() {
    this.directionGroup = new Group();
    this.originGroup = new Group();
    const material = new MeshBasicMaterial();
    const sphere = new SphereGeometry(0.1, 18, 6);

    const sphereMesh1 = new Mesh(sphere, material);
    const sphereMesh2 = new Mesh(sphere, material);
    this.directionGroup.add(sphereMesh1);
    this.originGroup.add(sphereMesh2);
  }

  exportAsSceneObject() {
    const group = new Group();
    group.add(this.directionGroup);
    group.add(this.originGroup);
    return group;
  }
}

export class TextTracer extends GameObject {
  monobehaviours = {
    TextMeshGroup,
    TextHoverEffect
  }
}