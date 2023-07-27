import StateObserver from "../lib/state-observer.js";

export default class Store {
  actions = {};
  reducer = {};
  state = {};
  observer = null;
  location = null;

  constructor(params) {
    this.observer = new StateObserver();
    this.location = new StateObserver();

    if (params.hasOwnProperty("actions")) {
      this.actions = params.actions;
    }

    if (params.hasOwnProperty("reducer")) {
      this.reducer = params.reducer;
    }

    this.state = { ...params.state };
  }

  dispatch(actionKey, payload = null) {
    if (this.actions[actionKey] === undefined) {
      console.error(`Action "${actionKey}" doesn't exist.`);
      return false;
    }

    // Call the action and pass it the Store context and whatever payload was passed
    this.actions[actionKey](this, payload);

    return true;
  }

  commit(mutationKey, payload = null) {
    if (typeof this.reducer[mutationKey] === undefined) {
      console.log(`Reducer has no function for "${mutationKey}"`);
      return false;
    }

    // Create a new version of the state after mutations
    let newState = this.reducer[mutationKey](this.state, payload);

    // Assign the new state to current state
    this.state = Object.assign(this.state, newState);

    this.observer.publish(this.state);
    localStorage.setItem("jstate", JSON.stringify(this.state));

    return true;
  }
}
