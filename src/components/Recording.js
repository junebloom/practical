import { createElement as h } from "react";
import { MdClose, MdFileDownload } from "react-icons/md";

import PlaybackControls from "./PlaybackControls.js";

// Recordings list item
function Recording({ recording, player, deleteRecording }) {
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
          className: "button flex-grow text-left p-075",
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
          className: "button w-4 p-075 d-flex justify-center",
          href: recording.url,
          download: "recording.ogg",
        },
        h(MdFileDownload)
      ),
      // Delete button
      h(
        "button",
        {
          className: "button w-4 p-075 d-flex justify-center",
          onClick: () => {
            deleteRecording(recording);
            if (isSelected) player.reset();
          },
        },
        h(MdClose)
      )
    ),
    isSelected && h(PlaybackControls, { player })
  );
}

export default Recording;
