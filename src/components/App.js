import { createElement as h, useState } from 'react'

import Recorder from './Recorder'
import RecordingsList from './RecordingsList'

function App() {
  const [state, setState] = useState({
    recordings: [],
    recorder: {
      mediaRecorder: null,
      recording: false,
      slices: []
    },
    player: new Audio(),
    playerRAFId: null
  })

  return h(
    'main',
    { className: 'd-flex flex-column' },
    h(Recorder, { state, setState }),
    h('h1', null, 'recordings'),
    h(RecordingsList, { state, setState })
  )
}

export default App
