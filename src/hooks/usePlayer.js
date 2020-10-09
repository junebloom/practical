import { useRef, useState, useEffect } from "react";

function usePlayer() {
  const audio = useRef(new Audio());
  const [selected, setSelected] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    audio.current.onplay = () => {
      setPlaying(!audio.current.paused);
    };
    audio.current.onpause = () => {
      setPlaying(!audio.current.paused);
    };
    audio.current.ontimeupdate = () => {
      setCurrentTime(audio.current.currentTime);
    };
    audio.current.ondurationchange = () => {
      // Update the duration estimated at record-time with the actual duration
      const current = audio.current.duration;
      if (current && current < Infinity) selected.duration = current;
      // And sync the player state
      setDuration(selected.duration);
    };
    audio.current.onvolumechange = () => {
      setVolume(audio.current.volume);
    };
  }, [selected]);

  // Return the public interface for the player
  return {
    selected,
    playing,
    currentTime,
    duration,
    volume,
    load: (recording) => {
      audio.current.src = recording.url;
      audio.current.load();
      setSelected(recording);
      setCurrentTime(0);
      setDuration(recording.duration);
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

export default usePlayer;
