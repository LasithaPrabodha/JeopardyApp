import { generate, select } from "../../helpers/dom-helper.js";
import speaker from "../../helpers/speaker.js";
import Component from "../../lib/component.js";
import store from "../../store/index.js";

export default class CurrentQuestion extends Component {
  constructor(props) {
    super({ store, selector: "current-question", ...props });

    speaker.speak(this.props.question.question);

    this.element.addEventListener("click", () => {
      speaker.stopIfSpeak();

      const questionText = select("#current-question-text");

      if (questionText.innerText === this.props.question.answer) {
        this.store.dispatch("closeQuestion");
      } else {
        speaker.speak(this.props.question.answer);
        questionText.setContentText(this.props.question.answer);
      }
    });
  }

  render() {
    const questionText = generate("span").setId("current-question-text").setContentText(this.props.question.question);

    this.element.appendChild(questionText);
  }
}
