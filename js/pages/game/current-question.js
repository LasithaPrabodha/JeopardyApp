import { generate, select } from "../../helpers/dom-helper.js";
import speaker from "../../lib/speaker.js";
import Component from "../../lib/component.js";
import store from "../../store/index.js";

export default class CurrentQuestion extends Component {
  constructor(props) {
    super({ store, selector: "current-question", ...props });
    this.state = {
      showAnswer: false,
    };

    this.element.addEventListener("click", () => {
      speaker.stopIfSpeak();

      const questionText = select("#current-question-text");
      if (questionText?.innerText === this.props.question.answer) {
        this.store.dispatch("closeQuestion");
      } else {
        speaker.speak(this.props.question.answer);
        questionText?.setContentText(this.props.question.answer);
        this.setState((state) => ({
          showAnswer: true,
        }));
      }
    });

    speaker.speaking.subscribe((speaking) => {
      const questionText = select("#current-question-text");

      if (!speaking && questionText?.innerText === props.question.question) {
        var img = generate("img")
          .setAttrib("src", "assets/images/countdown.gif?a=" + Math.random())
          .setAttrib("width", 100);
        this.element.appendChild(img);
      } else {
        this.element.querySelector("img")?.remove();
      }
    });

    speaker.speak(props.question.question);
  }

  render() {
    const text = this.state && this.state.showAnswer ? this.props.question.answer : this.props.question.question;
    const questionText = generate("span").setId("current-question-text").setContentText(text);

    this.element.appendChild(questionText);
  }
}
