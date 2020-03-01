import { h } from '../vdom'
import Recorder from './Recorder'
import RecordingsList from './RecordingsList'

const App = (state, setState) =>
  h('main', { className: 'main' }, [
    // Recorder
    Recorder(state, setState),
    // Player
    h(
      'audio',
      {
        autoplay: true,
        controls: true,
        src: state.playing ? state.playing.url : ''
      },
      []
    ),
    // List of recorded audio clips
    RecordingsList(state, setState)
  ])

export default App
