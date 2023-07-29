import { generate, select } from "../../helpers/dom-helper.js";
import Page from "../../lib/page.js";
import speaker from "../../lib/speaker.js";
import store from "../../store/index.js";
import Category from "./components/category.js";
import CurrentQuestion from "./components/current-question.js";
import Question from "./components/question.js";
import Team from "./components/team.js";

export default class Game extends Page {
  constructor() {
    super({ store, selector: "game-view" });
  }

  onInit() {
    this.store.dispatch("loadCategories");

    this.store.stateObserver.subscribe(() => {
      const question = this.store.state.question;

      if (question) {
        const gameGrid = select(".game-grid");

        if (gameGrid && !gameGrid.querySelector("current-question")) {
          const questionDiv = new CurrentQuestion({ question });
          gameGrid.appendChild(questionDiv.element);
        }
      }

      const winner = this.store.state.winner;
      if (winner) {
        this.announceWinner(winner);
      }
    });
  }

  announceWinner(winner) {
    Swal.fire({
      title: "Congratulations!",
      text: `The winner is ${winner.name} with $${winner.score}. Do you want to play again?`,
      imageUrl: "assets/images/winner.jpg",
      imageHeight: 200,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Nope",
    }).then((value) => {
      if (value.isConfirmed) {
        this.store.dispatch("resetGame");
      } else {
        this.store.dispatch("navigate", "home");
      }
    });
  }

  render() {
    const speakBtn = generate("button")
      .setId("btn-speaker")
      .setContentText(speaker.mute ? "Speaker: Off" : "Speaker: On");

    speakBtn.addEventListener("click", () => {
      speaker.mute = !speaker.mute;

      speakBtn.setContentText(speaker.mute ? "Speaker: Off" : "Speaker: On");
    });

    const resetBtn = generate("button").setId("btn-reset").setContentText("Reset");
    resetBtn.addEventListener("click", () => {
      this.store.dispatch("resetGame");
    });

    const settings = generate("div").setClass("d-flex").setClass("space-between");
    settings.appendChild(speakBtn);
    settings.appendChild(resetBtn);
    this.element.appendChild(settings);

    if (this.store.state.categories.length) {
      const gameGrid = generate("div").setClass("game-grid");

      for (let i = 1; i <= this.store.state.categories.length; i++) {
        const gridCol = generate("div").setClass("grid-column");

        const category = new Category({
          index: i,
          title: this.store.state.categories[i - 1].title,
          id: this.store.state.categories[i - 1].id,
        });

        gridCol.appendChild(category.element);

        for (let j = 1; j <= this.store.state.setup.questions; j++) {
          const question = new Question({ index: j, category: this.store.state.categories[i - 1].id });
          gridCol.appendChild(question.element);
        }

        gameGrid.appendChild(gridCol);
      }
      this.element.appendChild(gameGrid);
    }

    const teams = generate("div").setClass("teams");

    this.store.state.teams.forEach((t, key) => {
      const team = new Team({ index: key + 1, name: t.name });
      teams.appendChild(team.element);
    });

    this.element.appendChild(teams);
  }
}
