import { generate } from "../helpers/dom-helper.js";
import Page from "../lib/page.js";
import store from "../store/index.js";

export default class Home extends Page {
  constructor() {
    super({ store, selector: "welcome-message" });
  }

  render() {
    const h2 = generate("h2");
    h2.innerText = "Welcome to";

    const h1 = generate("h1");
    h1.innerText = "Jeopardy!";

    const button = generate("button").setId("btn-setup");
    button.innerText = "Start the game";

    button.addEventListener("click", () => {
      this.store.dispatch("setLocation", "setup");
    });

    this.element.appendChild(h2);
    this.element.appendChild(h1);
    this.element.appendChild(button);
  }
}
