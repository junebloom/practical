import { createElement as h } from "react";
import { render } from "react-dom";
import App from "./components/App.js";

// Register the offline service worker
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("./offlineSW.js")
    .catch((error) => console.error("SW not registered", error));
}

// Initialize the app UI
render(h(App), document.getElementById("app"));
