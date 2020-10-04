import { createElement as h } from "react";
import PlaybackControls from "./PlaybackControls";

// Recordings list item
function Recording({ player, recording }) {
  return h(
    "li",
    { className: "d-flex flex-column" },
    h(
      "div",
      { className: "d-flex" },
      // Select button
      // Loads the recording and begins playback
      h(
        "button",
        {
          className: "button flex-grow text-left p-05",
          onClick: () => {
            player.src = recording.url;
            player.load();
            player.play();
          },
        },
        recording.timestamp
          .toLocaleString(undefined, {
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
          .toLowerCase()
      ),
      // Download button
      h(
        "a",
        {
          className: "button button--dark p-05",
          href: recording.url,
          download: "recording.webm",
        },
        "save"
      )
    ),
    player.src === recording.url && h(PlaybackControls, { player })
  );
}

export default Recording;
