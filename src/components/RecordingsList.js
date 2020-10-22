import { createElement as h } from "react";
import Recording from "./Recording.js";

function RecordingsList({ recordings, player, deleteRecording }) {
  return h(
    "ol",
    { className: "recordings-list" },
    recordings.map((recording) =>
      h(Recording, { recording, player, deleteRecording, key: recording.id })
    )
  );
}

export default RecordingsList;
