import { generate } from "../../helpers/dom-helper.js";
import Page from "../../lib/page.js";
import store from "../../store/index.js";
import Category from "./category.js";
import Question from "./question.js";
import Team from "./team.js";

export default class Game extends Page {
  constructor() {
    super({ store, selector: "game-view" });

    this.store.dispatch("loadCategories");
  }

  render() {
    const resetBtn = generate("button").setId("btn-reset").setContentText("Reset");
    resetBtn.addEventListener("click", () => {
      this.store.dispatch("resetGame");
    });
    this.element.appendChild(resetBtn);

    if (this.store.state.categories.length) {
      const gameGrid = generate("div").setClass("game-grid");

      for (let i = 1; i <= 6; i++) {
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

    this.store.state.teams.forEach((_, key) => {
      const team = new Team({ index: key + 1 });
      teams.appendChild(team.element);
    });

    this.element.appendChild(teams);
  }
}
