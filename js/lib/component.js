import { generate } from "../helpers/dom-helper.js";
import Store from "../store/store.js";

export default class Component {
  props = null;
  store = null;
  element = null;
  state = null;

  constructor(props = {}) {
    if (props.hasOwnProperty("selector")) {
      this.element = generate(props.selector);
    }

    if (props.store instanceof Store) {
      this.store = props.store;
    }

    this.props = props;
    this.render();
  }

  setState(callback) {
    this.state = callback(this.state);
  }
}
