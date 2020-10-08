import { useRef, useState, useEffect, createElement as h } from "react";
import { IconContext } from "react-icons";

import Recorder from "./Recorder";
import RecordingsList from "./RecordingsList";

function usePlayer() {
  const audio = useRef(new Audio());
  const [src, setSrc] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    audio.current.addEventListener("loadstart", () => {
      setSrc(audio.current.src);
      setCurrentTime(0);
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
    audio.current.addEventListener("volumechange", () => {
      setVolume(audio.current.volume);
    });
  }, []);

  // Return the public interface for the player
  return {
    src,
    playing,
    currentTime,
    duration,
    volume,
    load: (recording) => {
      audio.current.src = recording.url;
      audio.current.load();
    },
    play: () => {
      audio.current.play();
    },
    pause: () => {
      audio.current.pause();
    },
    seek: (time) => {
      audio.current.currentTime = time;
    },
    setVolume: (value) => {
      audio.current.volume = value;
    },
  };
}

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
