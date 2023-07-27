import { generate } from "../helpers/dom-helper.js";
import Page from "../lib/page.js";
import store from "../store/index.js";

export default class Setup extends Page {
  noOfTeams = 2;
  noOfQuestions = 3;
  constructor() {
    super({ store, selector: "setup-grid" });
  }

  render() {
    const form = generate("form").setClass("setup-form");

    const div1 = generate("div").setClass("d-flex");
    const div2 = generate("div").setClass("d-flex");

    const label1 = generate("label").setContentText("No of teams/players");
    label1.setAttribute("for", "noOfTeams");

    const input1 = generate("input").setId("noOfTeams");
    input1.setAttribute("type", "number");
    input1.setAttribute("name", "noOfTeams");
    input1.setAttribute("value", "2");
    input1.setAttribute("min", "2");
    input1.setAttribute("max", "5");
    input1.setAttribute("required", "true");
    input1.onchange = (event) => {
      this.noOfTeams = +event.target.value;
    };

    div1.appendChild(label1);
    div1.appendChild(input1);

    const label2 = generate("label").setContentText("No of question per category");
    label2.setAttribute("for", "noOfQuestions");
    const input2 = generate("input").setId("noOfQuestions");
    input2.setAttribute("type", "number");
    input2.setAttribute("name", "noOfQuestions");
    input2.setAttribute("value", "3");
    input2.setAttribute("min", "3");
    input2.setAttribute("max", "5");
    input2.setAttribute("required", "true");
    input2.onchange = (event) => {
      this.noOfQuestions = +event.target.value;
    };

    div2.appendChild(label2);
    div2.appendChild(input2);

    const button = generate("button").setId("btn-start").setContentText("Start");
    button.setAttribute("type", "submit");

    form.appendChild(div1);
    form.appendChild(div2);
    form.appendChild(button);

    form.onsubmit = this.onsubmit.bind(this);

    this.element.appendChild(form);
  }

  onsubmit(event) {
    event.preventDefault();

    const teams = Array(this.noOfTeams)
      .fill()
      .map((_, i) => ({
        score: 0,
        id: i + 1,
      }));

    this.store.dispatch("setTeams", teams);
    this.store.dispatch("setQuestionsCount", this.noOfQuestions);
    this.store.dispatch("setLocation", "game");
  }
}
