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
        onClick: () => (player.playing ? player.pause() : player.play()),
      },
      player.playing ? "pause" : "play"
    ),

    // Progress bar
    h(
      "div",
      {
        className: "flex-grow",
        onClick: (e) => {
          // Normalize the clicked position between [0,1]
          const { left } = e.target.getBoundingClientRect();
          const position = (e.clientX - left) / e.target.clientWidth;

          player.seek(player.duration * position);
        },
      },
      player.currentTime
    ),

    // Volume control
    h("div", {}, "volume")
  );
}

export default PlaybackControls;
