export default class StateObserver {
  constructor() {
    this.stateChange = [];
  }

  subscribe(callback) {
    return this.stateChange.push(callback) - 1;
  }

  publish(data = {}) {
    this.stateChange.forEach((callback) => callback(data));
  }

  unsubscribe(index) {
    this.stateChange.splice(index, 1);
  }
}
