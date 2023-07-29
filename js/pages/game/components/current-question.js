import { generate, select } from "../../../helpers/dom-helper.js";
import speaker from "../../../lib/speaker.js";
import Component from "../../../lib/component.js";
import store from "../../../store/index.js";

export default class CurrentQuestion extends Component {
  constructor(props) {
    super({ store, selector: "current-question", ...props });
  }

  removeImageIfSpeaking() {
    speaker.speaking.subscribe((speaking) => {
      const questionText = select("#current-question-text");

      if (!speaking && questionText?.innerText === this.props.question.question) {
        var img = generate("img")
          .setAttrib("src", "assets/images/countdown.gif?a=" + Math.random())
          .setAttrib("width", 100);
        this.element.appendChild(img);
      } else {
        this.element.querySelector("img")?.remove();
      }
    });
  }

  onInit() {
    speaker.speak(this.props.question.question);

    this.element.addEventListener("click", () => {
      speaker.stopIfSpeak();

      const questionText = select("#current-question-text");
      if (questionText?.innerText === this.props.question.answer) {
        this.store.dispatch("closeQuestion");
      } else {
        speaker.speak(this.props.question.answer);

        this.setState((state) => ({
          showAnswer: true,
        }));
      }
    });

    this.removeImageIfSpeaking();

    this.state = {
      showAnswer: false,
    };
  }

  render() {
    const text = this.state?.showAnswer ? this.props.question.answer : this.props.question.question;
    const questionText = generate("span").setId("current-question-text").setContentText(text);

    this.element.appendChild(questionText);
  }
}
