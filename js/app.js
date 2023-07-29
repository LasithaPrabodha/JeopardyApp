import { generate, select } from "./helpers/dom-helper.js";
import htmlExtensions from "./extensions/html-element-extensions.js";
import store from "./store/index.js";

export default class App {
  routes = new Map();
  accessedRoutes = new Map();

  constructor(routes) {
    this.routes = routes;
  }

  init() {
    htmlExtensions.apply();
    this.#addLogo();
    this.#subscribeToLocationChanges();
  }

  #addLogo() {
    const nav = generate("nav");

    const a = generate("a");
    a.addEventListener("click", () => {
      store.dispatch("navigate", "home");
    });

    const img = generate("img")
      .setAttrib("src", "assets/images/Jeopardy-logo.png")
      .setAttrib("alt", "Jeopardy logo")
      .setAttrib("width", 100);

    a.appendChild(img);

    nav.appendChild(a);

    select("#root").prepend(nav);
  }

  #subscribeToLocationChanges() {
    let prevLocation = null;

    store.location.subscribe((route) => {
      if (prevLocation !== route) {
        prevLocation = route;

        this.accessedRoutes.forEach((route) => route.destroy());

        // clear all subscriptions on route change
        store.stateObserver.unsubscribeAll();

        const page = this.routes.get(route);
        this.accessedRoutes.set(route, new page());
      }
    });
  }
}
