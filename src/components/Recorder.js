import { useRef, useState, useEffect, createElement as h } from "react";
import { MdMic, MdStop } from "react-icons/md";

// UI component for recording user audio
function Recorder({ addRecording, setError }) {
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef();
  const startTime = useRef();
  const blob = useRef();

  useEffect(() => {
    async function setupRecorder() {
      if (!navigator.mediaDevices) {
        const error = new DOMException(
          "Your browser may not support audio recording",
          "NotSupportedError"
        );
        setError(error);
        throw error;
      }

      try {
        // Create the input stream from the user's microphone
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            autoGainControl: false,
            echoCancellation: false,
            noiseSuppression: false,
          },
        });

        // Stop the current recorder, in case this gets re-run while recording.
        if (recorder.current) recorder.current.stop();

        // Use the stream to create a MediaRecorder
        recorder.current = new MediaRecorder(stream);
      } catch (error) {
        setError(error);
        throw error;
      }

      // Track the start time so we can estimate the duration metadata
      recorder.current.addEventListener("start", () => {
        startTime.current = performance.now();
      });

      // Hold the recording data in a ref when it becomes available
      recorder.current.addEventListener("dataavailable", ({ data }) => {
        blob.current = data;
      });

      // Handle recording errors
      recorder.current.addEventListener("error", ({ error }) => {
        setError(error);
        throw error;
      });

      // Store the recorded audio with its metadata when recording stops
      recorder.current.addEventListener("stop", () => {
        // Timestamp
        const ts = new Date();
        // Pieces for file name
        const pad = (n) => n.toString().padStart(2, "0");
        const year = pad(ts.getFullYear());
        const month = pad(ts.getMonth());
        const date = pad(ts.getDate());
        const hours = pad(ts.getHours());
        const minutes = pad(ts.getMinutes());
        const seconds = pad(ts.getSeconds());
        // File name
        const name = `${year}-${month}-${date} ${hours} ${minutes} ${seconds}`;

        addRecording({
          timestamp: ts,
          name,
          extension: blob.current.type.match(/\/(\w+)/)[1],
          duration: (performance.now() - startTime.current) / 1000,
          blob: blob.current,
        });
      });
    }
    setupRecorder();
  }, []);

  // Starts recording
  function start() {
    recorder.current.start();
    setIsRecording(true);
  }

  // Stops recording
  function stop() {
    recorder.current.stop();
    setIsRecording(false);
  }

  return h(
    "button",
    {
      onClick: isRecording ? stop : start,
      className: "button button--record d-flex justify-center",
    },
    h(isRecording ? MdStop : MdMic)
  );
}

export default Recorder;
