import { h } from '../vdom'

function Recorder(state, setState) {
  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        autoGainControl: false,
        echoCancellation: false,
        noiseSuppression: false,
        sampleRate: 48000
      }
    })

    state = setState({
      ...state,
      recording: true,
      mediaRecorder: new MediaRecorder(stream, {
        mimeType: 'audio/ogg',
        audioBitsPerSecond: 256000
      }),
      slices: []
    })

    state.mediaRecorder.addEventListener('dataavailable', event => {
      state.slices.push(event.data)
    })

    state.mediaRecorder.addEventListener('stop', () => {
      const blob = new Blob(state.slices, { type: state.slices[0].type })

      const recording = {
        url: URL.createObjectURL(blob),
        timestamp: new Date(),
        slices: state.slices,
        blob
      }

      state = setState({
        ...state,
        recording: false,
        recordings: [recording, ...state.recordings]
      })
    })

    state.mediaRecorder.start(15)
  }

  function stop() {
    state.mediaRecorder.stop()
  }

  return h(
    'button',
    {
      onclick: () => (state.recording ? stop() : start())
    },
    [state.recording ? 'stop' : 'record']
  )
}

export default Recorder
