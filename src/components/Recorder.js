import { h } from '../vdom'

// UI component for recording user audio
function Recorder(state, setState) {
  // Begins the recording
  async function start() {
    // Create the input stream from the user's microphone
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        autoGainControl: false,
        echoCancellation: false,
        noiseSuppression: false,
        sampleRate: 48000
      }
    })

    // Create the MediaRecorder instance
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/ogg',
      audioBitsPerSecond: 256000
    })

    // Prepare the state for the new recording
    state = setState({
      ...state,
      mediaRecorder,
      slices: [],
      recording: true
    })

    // Store each chunk of recording data as it becomes available
    mediaRecorder.addEventListener('dataavailable', ({ data }) => {
      state.slices.push(data)
    })

    // Start the recording, outputting data every 15ms
    state.mediaRecorder.start(15)
  }

  // Stops the recording
  function stop() {
    // Register an event listener for the 'stop' event so that we can be sure
    // we reliably capture the full output of the recorder
    state.mediaRecorder.addEventListener('stop', () => {
      // Join the chunks of partial data together into the final recording
      const blob = new Blob(state.slices, { type: state.slices[0].type })

      // Create an object with the recording data and metadata
      const recording = {
        url: URL.createObjectURL(blob),
        timestamp: new Date(),
        slices: state.slices,
        blob
      }

      // Store the recording object in the app state for use elsewhere
      state = setState({
        ...state,
        recording: false,
        recordings: [recording, ...state.recordings]
      })
    })

    // Stop the recording, which should also trigger the 'stop' event
    state.mediaRecorder.stop()
  }

  // Render the component
  return h('button', { onclick: () => (state.recording ? stop() : start()) }, [
    state.recording ? 'stop' : 'record'
  ])
}

export default Recorder
