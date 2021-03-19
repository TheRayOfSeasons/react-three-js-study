import { BufferGeometry, Group, Mesh, MeshNormalMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

class TestMesh extends MonoBehaviour {
  start() {
    this.group = new Group();
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/gltf/');
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load(
      '/models/test.glb',
      (gltf) => {
        console.log('success');
        for(const child of [...gltf.scene.children]) {
          this.group.add(child);
          if(child.geometry) {
            const geometry = child.geometry;
            const material = new MeshNormalMaterial();
            const mesh = new Mesh(geometry, material);
            this.group.add(mesh);
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
    )
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
