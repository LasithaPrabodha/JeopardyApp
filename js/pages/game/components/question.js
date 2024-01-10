import Component from "../../../lib/component.js";
import store from "../../../store/index.js";

export default class Question extends Component {
  constructor(props) {
    super({ store, selector: "question", ...props });
  }

  onInit() {
    this.element.addEventListener("click", () => {
      this.element.classList.add('loading')
      if (!this.element.classList.contains("answered")) {
        this.store.dispatch("setSelectedQuestionAndAnswer", {
          index: this.props.index,
          category: this.props.category,
        });
      }
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
