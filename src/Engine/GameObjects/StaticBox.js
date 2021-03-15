import { GameObject } from '../Core/Behaviour';
import { BoxMeshComponent } from '../Models/BoxMeshComponent';

export class StaticBox extends GameObject {
  monobehaviours = {
    BoxMeshComponent
  }
}
