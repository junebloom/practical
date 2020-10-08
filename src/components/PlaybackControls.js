import { createElement as h } from "react";
import {
  MdPause,
  MdPlayArrow,
  MdVolumeDown,
  MdVolumeMute,
  MdVolumeUp,
} from "react-icons/md";

function getClickedPosition(e) {
  // Normalize the clicked position between [0,1]
  const { left } = e.currentTarget.getBoundingClientRect();
  const position = (e.clientX - left) / e.currentTarget.clientWidth;
  return position;
}

function ProgressBar({ player }) {
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
    {
      className: "pos-relative flex-grow bg-dark cursor-pointer text-light",
      onClick: (e) => {
        player.seek(player.duration * getClickedPosition(e));
      },
    },
    // Bar background
    h("div", {
      className: "pos-absolute bg-dark-red w-full h-05 bottom-0",
    }),
    // Bar foreground
    h("div", {
      className: "pos-absolute bg-red shadow h-05 bottom-0",
      style: { width: `${(player.currentTime / player.duration) * 100}%` },
    }),
    // Text container
    h(
      "div",
      { className: "flex-grow d-flex justify-between p-05" },
      h("div", {}, `${fmt.current.minutes}:${fmt.current.seconds}`),
      h("div", {}, `${fmt.duration.minutes}:${fmt.duration.seconds}`)
    )
  );
}

function VolumeSlider({ player }) {
  return h(
    "div",
    {
      className: "pos-relative w-4 bg-dark cursor-pointer",
      onClick: (e) => {
        player.setVolume(getClickedPosition(e));
      },
    },
    // Bar background
    h("div", {
      className: "pos-absolute bg-dark-primary w-full h-05 bottom-0",
    }),
    // Bar foreground
    h("div", {
      className: "pos-absolute bg-primary shadow h-05 bottom-0",
      style: { width: `${player.volume * 100}%` },
    }),
    // Icon container
    h(
      "div",
      {
        className: "text-light p-05 d-flex justify-center align-center",
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
    { className: "d-flex" },
    // Play button
    h(
      "button",
      {
        className:
          "button button--dark p-05 d-flex justify-center align-center w-4",
        onClick: () => (player.playing ? player.pause() : player.play()),
      },
      h(player.playing ? MdPause : MdPlayArrow)
    ),
    h(ProgressBar, { player }),
    h(VolumeSlider, { player })
  );
}

export default PlaybackControls;
