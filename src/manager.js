export default class {
  constructor() {
    this.instances = [];
  }
  register(instance) {
    this.instances.push(instance);
    return this;
  }
  getActiveInstances() {
    return this.instances.filter(ts => ts.enabled);
  }
}