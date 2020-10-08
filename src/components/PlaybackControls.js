import { createElement as h } from "react";
import {
  MdPause,
  MdPlayArrow,
  MdVolumeDown,
  MdVolumeMute,
  MdVolumeUp,
} from "react-icons/md";

// Get where the client coordinate `x` lies within `element`
// The returned value is normalized between [0,1]
function getPosition(x, element) {
  const { left } = element.getBoundingClientRect();
  const position = (x - left) / element.clientWidth;
  return Math.min(Math.max(0, position), 1);
}

function padTime(t) {
  return t.toString().padStart(2, "0");
}

// Convert `t` seconds to a string format suitable for playback UI
function formatTime(t) {
  const h = Math.trunc(t / 60 / 60);
  const m = Math.trunc((t / 60) % 60);
  const s = Math.trunc(t % 60);
  return `${h ? h + ":" : ""}${h ? padTime(m) : m}:${padTime(s)}`;
}

function ProgressBar({ player }) {
  return h(
    "div",
    {
      className: "pos-relative flex-grow cursor-pointer",
      onClick: (e) => {
        player.seek(player.duration * getPosition(e.clientX, e.currentTarget));
      },
    },
    // Bar background
    h("div", {
      className: "pos-absolute w-full h-05 bottom-0 bg-dark-red",
    }),
    // Bar foreground
    h("div", {
      className: "pos-absolute h-05 bottom-0 bg-red shadow",
      style: { width: `${(player.currentTime / player.duration) * 100}%` },
    }),
    // Text container
    h(
      "div",
      { className: "flex-grow d-flex justify-between p-05" },
      h("div", {}, formatTime(player.currentTime)),
      h("div", {}, formatTime(player.duration))
    )
  );
}

function VolumeSlider({ player }) {
  return h(
    "div",
    {
      className: "pos-relative w-4 cursor-pointer",
      onClick: (e) => {
        player.setVolume(getPosition(e.clientX, e.currentTarget));
      },
    },
    // Bar background
    h("div", {
      className: "pos-absolute w-full h-05 bottom-0 bg-dark-primary",
    }),
    // Bar foreground
    h("div", {
      className: "pos-absolute h-05 bottom-0 bg-primary shadow",
      style: { width: `${player.volume * 100}%` },
    }),
    // Icon container
    h(
      "div",
      {
        className: "p-05 d-flex justify-center",
      },
      h(
        player.volume > 0.33
          ? player.volume > 0.66
            ? MdVolumeUp
            : MdVolumeDown
          : MdVolumeMute
      )
    )
  );
}

function PlaybackControls({ player }) {
  return h(
    "div",
    { className: "d-flex bg-dark text-light" },
    // Play button
    h(
      "button",
      {
        className: "button button--dark w-4 p-05 d-flex justify-center",
        onClick: () => (player.playing ? player.pause() : player.play()),
      },
      h(player.playing ? MdPause : MdPlayArrow)
    ),
    h(ProgressBar, { player }),
    h(VolumeSlider, { player })
  );
}

export default PlaybackControls;
