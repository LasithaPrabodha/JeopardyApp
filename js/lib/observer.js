export default class Observer {
  constructor() {
    this.changes = [];
  }

  subscribe(callback) {
    return this.changes.push(callback) - 1;
  }

  publish(data = {}) {
    this.changes.forEach((callback) => callback(data));
  }

  unsubscribe(index) {
    this.changes.splice(index, 1);
  }

  unsubscribeAll(){
    this.changes = [];
  }
}
