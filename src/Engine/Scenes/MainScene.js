import { EngineScene } from '../Core/SceneManagement';
import { BoxObject } from '../GameObjects/BoxObject';
import { ControllableBox } from '../GameObjects/ControllableBox';
import { AxesObject } from '../GameObjects/AxesHelper';
import { CustomObject } from '../GameObjects/CustomObject';
import { CameraHandler } from '../GameObjects/CameraHandler';
import { StaticBox } from '../GameObjects/StaticBox';

export class MainScene extends EngineScene {
  gameObjects = {
    BoxObject,
    ControllableBox,
    AxesObject,
    CameraHandler,
    StaticBox,
    // CustomObject
  }
}
