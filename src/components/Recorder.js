import { useRef, useState, useEffect, createElement as h } from "react";
import { MdMic, MdStop } from "react-icons/md";

// UI component for recording user audio
function Recorder({ addRecording }) {
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef();
  const startTime = useRef();
  const blob = useRef();

  useEffect(() => {
    async function setupRecorder() {
      // Create the input stream from the user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          autoGainControl: false,
          echoCancellation: false,
          noiseSuppression: false,
        },
      });

      // Use the stream to create a MediaRecorder
      recorder.current = new MediaRecorder(stream);

      // Track the start time so we can estimate the duration metadata
      recorder.current.addEventListener("start", () => {
        startTime.current = performance.now();
      });

      // Hold the recording data in a ref when it becomes available
      recorder.current.addEventListener("dataavailable", ({ data }) => {
        blob.current = data;
      });

      // Store the recorded audio with its metadata when recording stops
      recorder.current.addEventListener("stop", () => {
        // Timestamp
        const ts = new Date();
        // Pieces for file name
        const date = `${ts.getFullYear()}-${ts.getMonth() + 1}-${ts.getDate()}`;
        const time = `${ts.getHours()} ${ts.getMinutes()} ${ts.getSeconds()}`;
        // File name
        const name = `${date} ${time}`;

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
