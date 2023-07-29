import { generate } from "../helpers/dom-helper.js";
import Store from "../store/store.js";

export default class Component {
  props = null;
  store = null;
  element = null;
  state = {};

  constructor(props = {}) {
    if (props.hasOwnProperty("selector")) {
      this.element = generate(props.selector);
    }

    if (props.store instanceof Store) {
      this.store = props.store;
    }

    this.props = props;

    this.onInit();
    this.#generateHTML();
  }
  onInit() {}

  setState(callback) {
    this.state = callback(this.state);
    this.#generateHTML();
  }

  #generateHTML() {
    this.element.innerHTML = "";
    this.render();
  }
}
