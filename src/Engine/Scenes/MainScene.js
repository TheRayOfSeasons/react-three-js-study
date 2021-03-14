import { EngineScene } from '../Core/SceneManagement';
import { BoxObject } from '../GameObjects/BoxObject';
import { ControllableBox } from '../GameObjects/ControllableBox';

export class MainScene extends EngineScene {
  gameObjects = {
    BoxObject,
    ControllableBox
  }
}
