export class Behaviour {
  start() {}
  update() {}
  exportAsSceneObject() {}
}

export class Component extends Behaviour {}

export class GameObject extends Behaviour {
  monobehaviours = {}
  components = {}

  start() {
    Object.entries(this.monobehaviours).forEach(([key, monobehaviour]) => {
      const component = new monobehaviour({ parentBehaviour: this });
      this.components[key] = component;
      component.start();
    });
  }

  update(time) {
    Object.values(this.components).forEach(component => component.update(time));
  }

  exportSceneObjects() {
    return Object.values(this.components)
      .map(component => component.exportAsSceneObject())
      .filter(sceneObject => sceneObject);
  }
}

export class MonoBehaviour extends Component {
  constructor({ parentBehaviour }) {
    super();
    this.parentBehaviour = parentBehaviour;
  }

  getComponent(type) {
    return this.parentBehaviour.components[type];
  }
}
