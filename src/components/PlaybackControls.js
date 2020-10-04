import { createElement as h } from "react";

function PlaybackControls({ player }) {
  function togglePaused() {
    if (player.paused) player.play();
    else player.pause();
  }

  return h(
    "div",
    { className: "d-flex" },
    // Play button
    h(
      "button",
      { className: "button p-05", onClick: togglePaused },
      player.paused ? "play" : "pause"
    ),

    // Progress bar
    h("div", { className: "flex-grow" }, `${player.currentTime}`),

    // Volume control
    h("div", {}, "volume")
  );
}

export default PlaybackControls;
