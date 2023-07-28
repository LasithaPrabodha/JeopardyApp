import Component from "../../lib/component.js";
import store from "../../store/index.js";

export default class Question extends Component {
  constructor(props) {
    super({ store, selector: "question", ...props });

    this.element.addEventListener("click", () => {
      this.store.dispatch("setSelectedQuestionAndAnswer", {
        index: props.index,
        category: props.category,
      });
    });
  }

  render() {
    this.element.setId(`q-${this.props.category}-${this.props.index}`).setContentText("$" + this.props.index * 200);

    if (
      this.store.state.answeredQuestions.findIndex((q) => q === `${this.props.category}-${this.props.index}`) !== -1
    ) {
      this.element.setClass("answered");
    }
  }
}
