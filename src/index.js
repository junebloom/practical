import { h, render } from './vdom.js'

let state = {
  recording: false,
  mediaRecorder: null,
  slices: [],
  recordings: []
}

function setState(newState) {
  state = newState
  vdom.previous = vdom.current
  vdom.current = vdom.root()
  render(document.getElementById('app'), vdom.previous, vdom.current, 0)
}

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      autoGainControl: false,
      echoCancellation: false,
      noiseSuppression: false,
      sampleRate: 48000
    }
  })

  setState({
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

    setState({
      ...state,
      recording: false,
      recordings: [recording, ...state.recordings]
    })
  })

  state.mediaRecorder.start(15)
}

function stopRecording() {
  state.mediaRecorder.stop()
}

let App = () =>
  h('main', {}, [
    h(
      'button',
      { onclick: () => (state.recording ? stopRecording() : startRecording()) },
      [state.recording ? 'stop' : 'record']
    ),
    h('h2', {}, ['recordings']),
    h('audio', { id: 'player', controls: true }, []),
    h(
      'ul',
      {},
      state.recordings.map(recording =>
        h('li', {}, [
          h('a', { href: recording.url }, [
            recording.timestamp.toLocaleString()
          ]),
          h(
            'button',
            {
              onclick: () => {
                const player = document.getElementById('player')
                player.src = recording.url
                player.load()
                player.play()
              }
            },
            ['play']
          )
        ])
      )
    )
  ])

const vdom = {
  root: App,
  current: null,
  previous: null
}

setState({ ...state })
