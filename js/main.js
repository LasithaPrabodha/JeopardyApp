import Game from "./pages/game/game.js";
import Home from "./pages/home.js";
import Setup from "./pages/setup.js";
import store from "./store/index.js";

const routes = new Map();

routes.set("home", Home);
routes.set("setup", Setup);
routes.set("game", Game);

let prevLocation = null;

store.location.subscribe((route) => {
  if (prevLocation !== route) {
    prevLocation = route;

    routes.forEach((route, key) => {
      route.destroy && route.destroy();
    });

    // clear all subscriptions on route change
    store.stateObserver.unsubscribeAll();

    const page = routes.get(route);
    routes.set(route, new page());
  }
});

if (window.location.hash === "") {
  store.dispatch("navigate", "home");
} else {
  store.dispatch("navigate", window.location.hash.substring(1));
}
