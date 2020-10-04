import { createElement as h } from "react";

function PlaybackControls({ player }) {
  return h(
    "div",
    { className: "d-flex" },
    // Play button
    h(
      "button",
      {
        className: "button p-05",
        onClick: () => {
          player.setPlaying(!player.playing);
        },
      },
      player.playing ? "pause" : "play"
    ),

    // Progress bar
    h("div", { className: "flex-grow" }, player.currentTime),

    // Volume control
    h("div", {}, "volume")
  );
}

export default PlaybackControls;
