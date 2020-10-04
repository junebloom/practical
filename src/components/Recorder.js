import { useRef, useState, useEffect, createElement as h } from "react";

// UI component for recording user audio
function Recorder({ setRecordings }) {
  const [isRecording, setIsRecording] = useState(false);
  const [slices, setSlices] = useState([]);
  const recorder = useRef();

  useEffect(async () => {
    // Create the input stream from the user's microphone
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        autoGainControl: false,
        echoCancellation: false,
        noiseSuppression: false,
        sampleRate: 48000,
      },
    });
    recorder.current = new MediaRecorder(stream, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 256000,
    });

    // Store each chunk of recording data as it becomes available
    recorder.current.addEventListener("dataavailable", ({ data }) => {
      setSlices([...slices, data]);
    });

    // Handle the end of the recording
    recorder.current.addEventListener("stop", () => {
      // Join the chunks of partial data together into the final recording
      const blob = new Blob(slices, { type: slices[0].type });

      // Create an object with the recording data and metadata
      const recording = {
        url: URL.createObjectURL(blob),
        timestamp: new Date(),
        blob,
      };

      // Store the recording object in the app state for use elsewhere
      setRecordings((recordings) => [recording, ...recordings]);
    });
  }, []);

  // Starts recording
  function start() {
    setSlices([]);
    recorder.current.start(15);
    setIsRecording(true);
  }

  // Stops recording
  function stop() {
    recorder.current.stop();
  }

  return h(
    "button",
    {
      onClick: isRecording ? stop : start,
      className: "button button--record",
    },
    isRecording ? "stop" : "record"
  );
}

export default Recorder;
