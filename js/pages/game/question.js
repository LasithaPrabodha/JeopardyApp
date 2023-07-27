import { generate, select } from "../../helpers/dom-helper.js";
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
    const qid = `${this.props.category}-${this.props.index}`;
    this.element.setId(`q-${this.props.category}-${this.props.index}`).setContentText("$" + this.props.index * 200);

    const selectedBox = this.store.state.selectedBox;
    const question = this.store.state.question;

    if (question && selectedBox && selectedBox === qid) {
      const questionDiv = generate("div").setId("question").setClass("current-question");
      const questionText = generate("span").setContentText(question.question);
      questionDiv.appendChild(questionText);

      questionDiv.addEventListener("click", () => {
        if (questionText.innerText === question.answer) {
          this.store.dispatch("closeQuestion");
        } else {
          questionText.setContentText(question.answer);
        }
      });

      const gameGrid = select(".game-grid");

      if (gameGrid && !gameGrid.querySelector("#question")) {
        gameGrid.appendChild(questionDiv);
      }
    }

    if (this.store.state.answeredQuestions.findIndex((q) => q === qid) !== -1) {
      this.element.setClass("answered");
    }
  }
}
