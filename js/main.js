import speaker from "./helpers/speaker.js";
import Game from "./pages/game/game.js";
import Home from "./pages/home.js";
import Setup from "./pages/setup.js";
import store from "./store/index.js";

const routes = new Map();

routes.set("home", Home);
routes.set("setup", Setup);
routes.set("game", Game);

let prevLocation = null;

store.observer.subscribe(() => {
  if (prevLocation !== store.state.location) {
    prevLocation = store.state.location;

    routes.forEach((route, key) => {
      route.destroy && route.destroy();
    });

    var page = routes.get(store.state.location); 
    routes.set(store.state.location, new page());
  }
});

if (window.location.hash === "") {
  store.commit("setLocation", "home");
} else {
  store.commit("setLocation", window.location.hash.substring(1));
}
