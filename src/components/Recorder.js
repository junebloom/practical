import { useRef, useState, useEffect, createElement as h } from "react";

// UI component for recording user audio
function Recorder({ setRecordings }) {
  const [isRecording, setIsRecording] = useState(false);
  const slices = useRef([]);
  const recorder = useRef();

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

      // Use the stream to create a MediaRecorder
      recorder.current = new MediaRecorder(stream, {
        mimeType: "audio/ogg",
        audioBitsPerSecond: 256000,
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
          timestamp: new Date(),
          url: URL.createObjectURL(blob),
          blob,
        };

        // Store the recording object in the app state for use elsewhere
        setRecordings((recordings) => [recording, ...recordings]);
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
      className: "button button--record",
    },
    isRecording ? "stop" : "record"
  );
}

export default Recorder;
