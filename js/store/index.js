import actions from "./actions.js";
import reducer from "./reducer.js";
import state from "./state.js";
import Store from "./store.js";

function getStateFromLocalStorage() {
  const localState = localStorage.getItem("jstate");
  return JSON.parse(localState);
}

const newState = getStateFromLocalStorage() ?? state;

export default new Store({
  actions,
  reducer,
  state: newState,
});
