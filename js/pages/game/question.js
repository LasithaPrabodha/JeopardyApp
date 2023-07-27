import { generate, select } from "../../helpers/dom-helper.js";
import Component from "../../lib/component.js";
import store from "../../store/index.js";
import CurrentQuestion from "./current-question.js";

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
    const qid = `${this.props.category}-${this.props.index}`;
    this.element.setId(`q-${this.props.category}-${this.props.index}`).setContentText("$" + this.props.index * 200);

    const selectedBox = this.store.state.selectedBox;
    const question = this.store.state.question;

    if (question && selectedBox && selectedBox === qid) {
      const gameGrid = select(".game-grid");

      if (gameGrid && !gameGrid.querySelector("current-question")) {
        const questionDiv = new CurrentQuestion({ question });
        gameGrid.appendChild(questionDiv.element);
      }
    }

    if (this.store.state.answeredQuestions.findIndex((q) => q === qid) !== -1) {
      this.element.setClass("answered");
    }
  }
}
