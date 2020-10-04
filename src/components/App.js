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
    const handleEnded = () => setPlaying(false);
    const handleTimeupdate = () => setCurrentTime(audio.current.currentTime);
    const handleDurationchange = () => setDuration(audio.current.duration);

    audio.current.addEventListener("ended", handleEnded);
    audio.current.addEventListener("timeupdate", handleTimeupdate);
    audio.current.addEventListener("durationchange", handleDurationchange);

    return () => {
      audio.current.removeEventListener("ended", handleEnded);
      audio.current.removeEventListener("timeupdate", handleTimeupdate);
      audio.current.removeEventListener("durationchange", handleDurationchange);
    };
  });

  return {
    src,
    setSrc: (url) => {
      setSrc(url);
      audio.current.src = url;
      audio.current.load();
    },
    playing,
    setPlaying: (isPlaying) => {
      setPlaying(isPlaying);
      if (isPlaying) audio.current.play();
      else audio.current.pause();
    },
    currentTime,
    setCurrentTime: (time) => {
      setCurrentTime(time);
      audio.current.currentTime = time;
    },
    duration,
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
