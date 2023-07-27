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

    this.generateInput1(div1);
    this.generateInput2(div2);

    const button = generate("button").setId("btn-start").setContentText("Start").setAttrib("type", "submit");

    form.appendChild(div1);
    form.appendChild(div2);
    form.appendChild(button);

    form.onsubmit = this.onsubmit.bind(this);

    this.element.appendChild(form);
  }

  generateInput1(container) {
    const label1 = generate("label").setContentText("No of teams/players").setAttrib("for", "noOfTeams");

    const input1 = generate("input")
      .setId("noOfTeams")
      .setAttrib("type", "number")
      .setAttrib("name", "noOfTeams")
      .setAttrib("value", "2")
      .setAttrib("min", "2")
      .setAttrib("max", "5")
      .setAttrib("required", "true");

    input1.onchange = (event) => {
      this.noOfTeams = +event.target.value;
    };

    container.appendChild(label1);
    container.appendChild(input1);
  }

  generateInput2(container) {
    const label2 = generate("label").setContentText("No of question per category").setAttrib("for", "noOfQuestions");

    const input2 = generate("input")
      .setId("noOfQuestions")
      .setAttrib("type", "number")
      .setAttrib("name", "noOfQuestions")
      .setAttrib("value", "3")
      .setAttrib("min", "3")
      .setAttrib("max", "5")
      .setAttrib("required", "true");

    input2.onchange = (event) => {
      this.noOfQuestions = +event.target.value;
    };

    container.appendChild(label2);
    container.appendChild(input2);
  }

  generateTeamNameInputs() {
    const label2 = generate("label").setContentText("Team names").setAttrib("for", "team1");

    for (let i = 1; i <= this.noOfTeams; i++) {
      const input = generate("input");
      
      
    }
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
