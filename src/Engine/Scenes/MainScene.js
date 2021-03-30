import { Fog } from 'three';
import { MainCamera } from '../Cameras/MainCamera';
import { EngineScene } from '../Core/SceneManagement';
import { BoxObject } from '../GameObjects/BoxObject';
import { ControllableBox } from '../GameObjects/ControllableBox';
import { AxesObject } from '../GameObjects/AxesHelper';
import { CustomObject } from '../GameObjects/CustomObject';
import { CameraHandler } from '../GameObjects/CameraHandler';
import { StaticBox } from '../GameObjects/StaticBox';
import { ParticleA } from '../GameObjects/ParticleA';
import { ParticleStudy } from '../GameObjects/ParticleStudy';
import { MyText } from '../GameObjects/MyText';
import { TextTracer } from '../GameObjects/TextTracer';
import { RaycastTest } from '../GameObjects/RaycastTest';
import { SpectrumParticle } from '../GameObjects/SpectrumParticle';
import { LineParticle } from '../GameObjects/LineParticle';
import { TestGLBMesh } from '../GameObjects/TestGLBMesh';
import { SceneDirectionalLight } from '../GameObjects/SceneDirectionalLight';
import { Spectrum } from '../GameObjects/Spectrum';
import { MovingBox } from '../GameObjects/MovingBox';
import { ShaderStudy } from '../GameObjects/ShaderStudy';
import { TestOBJMesh } from '../GameObjects/TestObjMesh';

export class MainScene extends EngineScene {
  gameObjects = {
    // BoxObject,
    // ControllableBox,
    // AxesObject,
    CameraHandler,
    // StaticBox,
    // CustomObject,
    // ParticleA,
    // MyText,
    // TextTracer,
    // ParticleStudy,
    // RaycastTest,
    // SpectrumParticle,
    // LineParticle,
    TestGLBMesh,
    // SceneDirectionalLight,
    // Spectrum,
    // MovingBox,
    // ShaderStudy,
    // TestOBJMesh,
  }
  cameras = {
    MainCamera
  }
  defaultCamera = 'MainCamera';

  modifyScene(scene) {
    const fog = new Fog('black', 1, 1000);
    console.log('mod');
    this.scene.fog = fog;
  }
}
