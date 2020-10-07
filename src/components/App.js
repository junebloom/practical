import { useRef, useState, useEffect, createElement as h } from "react";

import Recorder from "./Recorder";
import RecordingsList from "./RecordingsList";

function usePlayer() {
  const ctx = useRef(new AudioContext());
  const [src, setSrc] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // src set
  useEffect(() => {
    if (src === null) return;
    setCurrentTime(0);
    setDuration(src.buffer.duration);
  }, [src]);

  // playing set
  useEffect(() => {
    if (src === null) return;
    const srcNode = ctx.current.createBufferSource();

    if (playing) {
      srcNode.buffer = src.buffer;
      srcNode.connect(ctx.current.destination);
      srcNode.onended = () => {
        setPlaying(false);
      };
      srcNode.start();
    }

    return () => {
      srcNode.onended = null;
      srcNode.disconnect();
      if (playing) srcNode.stop();
    };
  }, [src, playing, duration]);

  // Return the public interface for the player
  return {
    src,
    setSrc,
    playing,
    setPlaying,
    currentTime,
    setCurrentTime,
    duration,
    ctx,
  };
}

function App() {
  const [recordings, setRecordings] = useState([]);
  const player = usePlayer();

  return h(
    "main",
    { className: "d-flex flex-column" },
    h(Recorder, { setRecordings, ctx: player.ctx.current }),
    h("h1", null, "recordings"),
    h(RecordingsList, { recordings, player })
  );
}

export default App;
