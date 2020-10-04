import { createElement as h } from "react";

function PlaybackControls({ state, setState }) {
  function togglePaused() {
    if (state.player.paused) state.player.play();
    else state.player.pause();
    setState(state);
  }

  return h(
    "div",
    { className: "d-flex" },
    // Play button
    h(
      "button",
      { className: "button p-05", onClick: togglePaused },
      state.player.paused ? "play" : "pause"
    ),

    // Progress bar
    h("div", { className: "flex-grow" }, `${state.player.currentTime}`),

    // Volume control
    h("div", {}, "volume")
  );
}

export default PlaybackControls;
