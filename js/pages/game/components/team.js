import { generate, select } from "../../../helpers/dom-helper.js";
import Component from "../../../lib/component.js";
import store from "../../../store/index.js";

export default class Team extends Component {
  constructor(props) {
    super({ store, selector: "team", ...props });
  }

  onInit() {
    this.state = {
      yesNoOpened: false,
    };

    this.element.addEventListener("click", (event) => {
      if (event.target.tagName === "SPAN" || !this.store.state.question) {
        return;
      } else if (this.state.yesNoOpened) {
        this.setState(() => ({ yesNoOpened: false }));
        select(".attempt").remove();
        return;
      }
      this.setState(() => ({ yesNoOpened: true }));
    });
  }

  render() {
    const p = generate("p").setContentText(this.props.name);
    const timeRemaining = generate("div").setClass("time-remaining");

    for (let i = 0; i < 9; i++) {
      const remainingBox = generate("div").setClass("active");
      timeRemaining.appendChild(remainingBox);
    }

    const team = this.store.state.teams.find((t) => t.id === this.props.index);
    const score = generate("h2")
      .setId(`team-${this.props.index}-score`)
      .setContentText("$" + team.score);

    this.element.appendChild(p);
    this.element.appendChild(timeRemaining);
    this.element.appendChild(score);

    if (this.state.yesNoOpened) {
      var div = generate("div").setClass("attempt");

      var span1 = generate("span").setId("btn-correct").setContentText("✅");
      var span2 = generate("span").setId("btn-wrong").setContentText("❌");

      span1.addEventListener("click", (event) => {
        select(".attempt").remove();
        this.store.dispatch("addPoints", { teamId: this.props.index });
      });

      span2.addEventListener("click", (event) => {
        select(".attempt").remove();
        this.store.dispatch("deductPoints", { teamId: this.props.index });
      });

      div.appendChild(span1);
      div.appendChild(span2);

      this.element.appendChild(div);
    }
  }
}
