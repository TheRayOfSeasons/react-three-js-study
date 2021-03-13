import { Scene } from 'three';
import { MyBox } from '../GameObjects/MyBox.js';

export const MainScene = new Scene();

MainScene.add(MyBox.meshModel.mesh);
