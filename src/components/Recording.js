import { createElement as h } from "react";
import { MdFileDownload } from "react-icons/md";

import PlaybackControls from "./PlaybackControls";

// Recordings list item
function Recording({ recording, player }) {
  const isSelected = player.selected === recording;

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
            player.load(recording);
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
          className: "button w-4 p-05 d-flex justify-center",
          href: recording.url,
          download: "recording.ogg",
        },
        h(MdFileDownload)
      )
    ),
    isSelected && h(PlaybackControls, { player })
  );
}

export default Recording;
