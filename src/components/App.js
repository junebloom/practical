import { useRef, useState, useEffect, createElement as h } from "react";

import Recorder from "./Recorder";
import RecordingsList from "./RecordingsList";

function usePlayer() {
  const audio = useRef(new Audio());
  const [src, setSrc] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    audio.current.addEventListener("loadstart", () => {
      setSrc(audio.current.src);
    });
    audio.current.addEventListener("play", () => {
      setPlaying(!audio.current.paused);
    });
    audio.current.addEventListener("pause", () => {
      setPlaying(!audio.current.paused);
    });
    audio.current.addEventListener("timeupdate", () => {
      setCurrentTime(audio.current.currentTime);
    });
    audio.current.addEventListener("durationchange", () => {
      setDuration(audio.current.duration);
    });
  }, []);

  function load(recording) {
    audio.current.src = recording.url;
    audio.current.load();
  }
  function play() {
    audio.current.play();
  }
  function pause() {
    audio.current.pause();
  }
  function seek(time) {
    audio.current.currentTime = time;
  }

  // Return the public interface for the player
  return {
    src,
    playing,
    currentTime,
    duration,
    load,
    play,
    pause,
    seek,
  };
}

function App() {
  const [recordings, setRecordings] = useState([]);
  const player = usePlayer();

  return h(
    "main",
    { className: "d-flex flex-column" },
    h(Recorder, { setRecordings }),
    h("h1", null, "recordings"),
    h(RecordingsList, { recordings, player })
  );
}

export default App;
