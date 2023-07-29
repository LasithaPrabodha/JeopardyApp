import { generate, select } from "../helpers/dom-helper.js";
import Store from "../store/store.js";

export default class Page {
  store = null;
  subscription = null;
  element = null;
  root = null;
  props = null;
  state = {};

  constructor(props = {}) {
    if (props.hasOwnProperty("selector")) {
      this.element = generate(props.selector);
    }

    if (props.store instanceof Store) {
      this.store = props.store;

      this.initStateObserver();
    }
    this.props = props;

    this.onInit();
    this.#generateHTML();

    this.root = select("routes");
    this.root.appendChild(this.element);
  }

  onInit() {}

  setState(callback) {
    this.state = callback(this.state);
    this.#generateHTML();
  }

  initStateObserver() {
    this.subscription = this.store.stateObserver.subscribe(() => {
      this.#generateHTML();
    });
  }

  destroy() {
    this.element.remove();
    this.store.stateObserver.unsubscribe(this.subscription);
  }

  #generateHTML() {
    this.element.innerHTML = "";
    this.render();
  }
}
