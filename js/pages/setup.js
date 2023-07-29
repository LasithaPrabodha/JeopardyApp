import { generate } from "../helpers/dom-helper.js";
import Page from "../lib/page.js";
import store from "../store/index.js";

export default class Setup extends Page {
  constructor() {
    super({ store, selector: "setup-grid" });
  }

  onInit() {
    this.state = {
      noOfTeams: 2,
      noOfQuestions: 3,
      teams: [
        {
          id: 1,
          name: "Team 1",
          score: 0,
        },
        {
          id: 2,
          name: "Team 2",
          score: 0,
        },
      ],
    };
  }

  render() {
    const form = generate("form").setClass("setup-form");

    const div1 = generate("div").setClass("d-flex").setClass("mt-2");
    const div2 = generate("div").setClass("d-flex").setClass("mt-2");
    const div3 = generate("div").setClass("d-flex").setClass("mt-2");

    this.generateInput1(div1, div2);
    this.generateInput2(div3);

    const button = generate("button").setId("btn-start").setContentText("Start").setAttrib("type", "submit");

    form.appendChild(div1);
    form.appendChild(div2);
    form.appendChild(div3);
    form.appendChild(button);

    form.onsubmit = this.onsubmit.bind(this);

    this.element.appendChild(form);
  }

  generateInput1(container, container2) {
    const label1 = generate("label").setContentText("No of teams/players").setAttrib("for", "noOfTeams");

    const input1 = generate("input")
      .setId("noOfTeams")
      .setAttrib("type", "number")
      .setAttrib("name", "noOfTeams")
      .setAttrib("value", this.state.noOfTeams)
      .setAttrib("min", "2")
      .setAttrib("max", "5")
      .setAttrib("required", "true");

    input1.onchange = (event) => {
      this.setState((state) => {
        const noOfTeams = +event.target.value;
        const teams = Array(noOfTeams)
          .fill()
          .map((_, i) => ({
            score: 0,
            id: i + 1,
            name: "Team " + (i + 1),
          }));

        return { ...state, noOfTeams, teams };
      });

      container2.innerHTML = "";

      this.generateTeamNameInputs(container2);
    };

    container.appendChild(label1);
    container.appendChild(input1);

    this.generateTeamNameInputs(container2);
  }

  generateInput2(container) {
    const label2 = generate("label").setContentText("No of question per category").setAttrib("for", "noOfQuestions");

    const input2 = generate("input")
      .setId("noOfQuestions")
      .setAttrib("type", "number")
      .setAttrib("name", "noOfQuestions")
      .setAttrib("value", this.state.noOfQuestions)
      .setAttrib("min", "3")
      .setAttrib("max", "5")
      .setAttrib("required", "true");

    input2.onchange = (event) => {
      this.setState((state) => ({ ...state, noOfQuestions: +event.target.value }));
    };

    container.appendChild(label2);
    container.appendChild(input2);
  }

  generateTeamNameInputs(div) {
    const label2 = generate("label").setContentText("Team names").setAttrib("for", "team1");
    div.appendChild(label2);

    const teamInputs = generate("div").setClass("team-names");
    for (let i = 1; i <= this.state.noOfTeams; i++) {
      const input = generate("input")
        .setId("team-" + i)
        .setAttrib("placeholder", "Team " + i);

      input.value = this.state.teams[i - 1].name;

      input.addEventListener("change", (event) => {
        this.setState((state) => {
          const teams = state.teams;

          teams[i - 1].name = event.target.value;

          return { ...state, teams };
        });
      });
      teamInputs.appendChild(input);
    }

    div.appendChild(teamInputs);
  }

  onsubmit(event) {
    event.preventDefault();
    this.store.dispatch("setTeams", this.state.teams);
    this.store.dispatch("setQuestionsCount", this.state.noOfQuestions);
    this.store.dispatch("navigate", "game");
  }
}
