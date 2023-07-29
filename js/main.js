import App from "./app.js";
import store from "./store/index.js";
import Game from "./pages/game/game.js";
import Home from "./pages/home.js";
import Setup from "./pages/setup.js";

const routes = new Map();

routes.set("home", Home);
routes.set("setup", Setup);
routes.set("game", Game);

const app = new App(routes);
app.init();

if (window.location.hash === "") {
  store.dispatch("navigate", "home");
} else {
  store.dispatch("navigate", window.location.hash.substring(1));
}
