import { useState, createElement as h } from "react";
import usePlayer from "../hooks/usePlayer.js";

import { IconContext } from "react-icons";
import Recorder from "./Recorder";
import RecordingsList from "./RecordingsList";

function App() {
  const [recordings, setRecordings] = useState([]);
  const player = usePlayer();

  return h(
    "main",
    { className: "d-flex flex-column" },
    h(
      IconContext.Provider,
      { value: { size: "1.25em" } },
      h(Recorder, { setRecordings }),
      h("h1", null, "recordings"),
      h(RecordingsList, { recordings, player })
    )
  );
}

export default App;
