import { createElement as h } from "react";
import Recording from "./Recording";

function RecordingsList({ recordings, player }) {
  return h(
    "ol",
    { className: "recordings-list" },
    recordings.map((recording) =>
      h(Recording, { player, recording, key: recording.url })
    )
  );
}

export default RecordingsList;
