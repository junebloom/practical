import { createElement as h } from "react";
import useRecordings from "../hooks/useRecordings.js";
import usePlayer from "../hooks/usePlayer.js";

import { IconContext } from "react-icons";
import Recorder from "./Recorder";
import RecordingsList from "./RecordingsList";
import Footer from "./Footer.js";

function App() {
  const { recordings, addRecording, deleteRecording } = useRecordings();
  const player = usePlayer();

  return h(
    IconContext.Provider,
    { value: { size: "1.25em" } },
    h(
      "main",
      { className: "d-flex flex-column maxw-600 minh-full-vh mx-auto p-1" },
      h(Recorder, { addRecording }),
      h("h2", null, "Recordings"),
      h(RecordingsList, { recordings, player, deleteRecording }),
      h("div", { className: "flex-grow" }),
      h(Footer)
    )
  );
}

export default App;
