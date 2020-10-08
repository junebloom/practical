import { createElement as h } from "react";

function PlaybackControls({ player }) {
  const fmt = {
    current: {
      minutes: (player.currentTime / 60).toFixed(),
      seconds: (player.currentTime % 60).toFixed().padStart(2, "0"),
    },
    duration: {
      minutes: (player.duration / 60).toFixed(),
      seconds: (player.duration % 60).toFixed().padStart(2, "0"),
    },
  };

  return h(
    "div",
    { className: "d-flex" },

    // Play button
    h(
      "button",
      {
        className: "button button--dark p-05",
        onClick: () => (player.playing ? player.pause() : player.play()),
      },
      player.playing ? "pause" : "play"
    ),

    // Progress bar
    h(
      "div",
      {
        className: "progress-bar",
        onClick: (e) => {
          // Normalize the clicked position between [0,1]
          const { left } = e.currentTarget.getBoundingClientRect();
          const position = (e.clientX - left) / e.currentTarget.clientWidth;
          player.seek(player.duration * position);
        },
      },
      h("span", {
        className: "progress-bar__fg",
        style: { width: `${(player.currentTime / player.duration) * 100}%` },
      }),
      h(
        "span",
        { className: "progress-bar__text-container" },
        // current time
        h("span", {}, `${fmt.current.minutes}:${fmt.current.seconds}`),
        // remaining time
        h("span", {}, `${fmt.duration.minutes}:${fmt.duration.seconds}`)
      )
    ),

    // Volume control
    h("div", {}, "volume")
  );
}

export default PlaybackControls;
