import { generate, select } from "../helpers/dom-helper.js";
import Store from "../store/store.js";

export default class Component {
  store = null;
  subscription = null;
  element = null;
  root = null;
  props = null;

  constructor(props = {}) {
    if (props.hasOwnProperty("selector")) {
      this.element = generate(props.selector);
    }

    if (props.store instanceof Store) {
      this.store = props.store;

      this.subscription = this.store.observer.subscribe(() => {
        this.#generateHTML();
      });
    }
    this.props = props;
    
    this.#generateHTML();
  }

  destroy() {
    this.element.remove();
    this.store.observer.unsubscribe(this.subscription);
  }

  #generateHTML() {
    this.element.innerHTML = "";

    this.render();
  }
}
