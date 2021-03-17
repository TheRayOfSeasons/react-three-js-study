import { Fog } from 'three';
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
    SpectrumParticle
  }

  modifyScene(scene) {
    const fog = new Fog('black', 1, 1000);
    console.log('mod');
    this.scene.fog = fog;
  }
}
