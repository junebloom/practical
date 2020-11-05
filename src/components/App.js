import { createElement as h, useState } from "react";
import useRecordings from "../hooks/useRecordings.js";
import usePlayer from "../hooks/usePlayer.js";

import { IconContext } from "react-icons";
import Error from "./Error.js";
import ErrorBoundary from "./ErrorBoundary.js";
import Recorder from "./Recorder.js";
import RecordingsList from "./RecordingsList.js";
import Footer from "./Footer.js";

function App() {
  const { recordings, addRecording, deleteRecording } = useRecordings();
  const player = usePlayer();
  const [error, setError] = useState();

  return h(
    IconContext.Provider,
    { value: { size: "1.25em" } },
    h(
      "main",
      { className: "d-flex flex-column maxw-600 minh-full-vh mx-auto p-1" },
      h(
        ErrorBoundary,
        null,
        error ? h(Error, { error }) : null,
        h(Recorder, { addRecording, setError })
      ),
      h("h2", null, "Recordings"),
      h(
        ErrorBoundary,
        null,
        recordings.length > 0
          ? h(RecordingsList, { recordings, player, deleteRecording })
          : h(
              "div",
              null,
              h("p", null, "Your lovely audio clips will appear here."),
              h(
                "p",
                null,
                "Practical works 100% offline. After your first visit, you can load this page even if you don't have an internet connection, and your recordings will always* be here waiting for you!"
              ),
              h(
                "em",
                { className: "text-sm" },
                "*Note that clearing your browser cache will erase any recordings living here."
              )
            )
      ),
      h("div", { className: "flex-grow" }),
      h(Footer)
    )
  );
}

export default App;
