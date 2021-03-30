import { BoxGeometry, BufferGeometry, Group, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshLambertMaterial, MeshNormalMaterial, MeshStandardMaterial, sRGBEncoding, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

class TestMesh extends MonoBehaviour {

  createMaterial() {
    // const textureLoader = new TextureLoader();
    // const map = textureLoader.load('/models/bust/testures/Default_OBJ_baseColor.jpeg');
    // map.encoding = sRGBEncoding;
    // map.flipY = false;
    // const normalMap = textureLoader.load('/models/bust/testures/Default_OBJ_normal.jpeg');
    const material = new MeshNormalMaterial({ color: 0xffffff });
    // const material = new MeshStandardMaterial({
    //   color: 'purple',
    //   normalMap,
    //   map,
    // });
    return material;
  }

  start() {
    this.group = new Group();
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/gltf/');
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load(
      '/models/bust/bust.glb',
      (gltf) => {
        console.log('success');
        for(const child of [...gltf.scene.children]) {
          if(child.geometry) {
            const geometry = child.geometry;
            const material = this.createMaterial();
            const mesh = new Mesh(geometry, material);
            this.group.add(mesh);
            mesh.rotation.x = - Math.PI * 0.5;
          }
          child.layers.enable(1);
        }
      },
      () => {
        console.log('progress');
      },
      (err) => {
        console.log('error');
        console.log(err);
      }
    );
  }

  exportAsSceneObject() {
    return this.group;
  }
}

export class TestGLBMesh extends GameObject {
  monobehaviours = {
    TestMesh
  }
}
