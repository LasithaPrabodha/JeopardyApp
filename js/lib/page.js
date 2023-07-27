import { select } from "../helpers/dom-helper.js";
import Component from "./component.js";

export default class Page extends Component {
  root = null;

  constructor(props = {}) {
    super(props);

    this.root = select("routes");
    this.root.appendChild(this.element);
  }
}
