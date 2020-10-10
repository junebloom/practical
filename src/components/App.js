import { createElement as h } from "react";
import useRecordings from "../hooks/useRecordings.js";
import usePlayer from "../hooks/usePlayer.js";

import { IconContext } from "react-icons";
import Recorder from "./Recorder";
import RecordingsList from "./RecordingsList";

function App() {
  const { recordings, addRecording, deleteRecording } = useRecordings();
  const player = usePlayer();

  return h(
    "main",
    { className: "d-flex flex-column" },
    h(
      IconContext.Provider,
      { value: { size: "1.25em" } },
      h(Recorder, { addRecording }),
      h("h1", null, "recordings"),
      h(RecordingsList, { recordings, player, deleteRecording })
    )
  );
}

export default App;
