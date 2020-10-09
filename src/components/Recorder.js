import { useRef, useState, useEffect, createElement as h } from "react";
import { MdMic, MdStop } from "react-icons/md";

// UI component for recording user audio
function Recorder({ addRecording }) {
  const [isRecording, setIsRecording] = useState(false);
  const slices = useRef([]);
  const recorder = useRef();
  const startTime = useRef();

  useEffect(() => {
    async function setupRecorder() {
      // Create the input stream from the user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          autoGainControl: false,
          echoCancellation: false,
          noiseSuppression: false,
          sampleRate: 48000,
        },
      });

      let type = MediaRecorder.isTypeSupported("audio/ogg")
        ? "audio/ogg"
        : "audio/webm";

      // Use the stream to create a MediaRecorder
      recorder.current = new MediaRecorder(stream, {
        mimeType: type,
        audioBitsPerSecond: 128000,
      });

      // Track the start time so we can estimate the duration metadata
      recorder.current.addEventListener("start", () => {
        startTime.current = performance.now();
      });

      // Store each chunk of recording data as it becomes available
      recorder.current.addEventListener("dataavailable", ({ data }) => {
        slices.current.push(data);
      });

      // Handle the end of the recording
      recorder.current.addEventListener("stop", () => {
        // Join the chunks of partial data together into the final recording
        const blob = new Blob(slices.current, { type: slices.current[0].type });

        // Create an object with the recording data and metadata
        const recording = {
          duration: (performance.now() - startTime.current) / 1000,
          timestamp: new Date(),
          blob,
        };

        // Store the recording object for use elsewhere
        addRecording(recording);
      });
    }
    setupRecorder();
  }, []);

  // Starts recording
  function start() {
    slices.current = [];
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
