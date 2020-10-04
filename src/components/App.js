import { useRef, useState, createElement as h } from "react";

import Recorder from "./Recorder";
import RecordingsList from "./RecordingsList";

function App() {
  const player = useRef(new Audio());
  const [recordings, setRecordings] = useState([]);

  return h(
    "main",
    { className: "d-flex flex-column" },
    h(Recorder, { setRecordings }),
    h("h1", null, "recordings"),
    h(RecordingsList, { recordings, player })
  );
}

export default App;
