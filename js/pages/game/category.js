import Component from "../../lib/component.js";
import store from "../../store/index.js";

export default class Category extends Component {
  constructor(props) {
    super({ store, selector: "category", ...props });
  }

  render() {
    this.element.setId("cat-" + this.props.id).setContentText(this.props.title);
  }
}
