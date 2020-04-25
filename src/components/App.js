import { h } from '../vdom'
import Recorder from './Recorder'
import RecordingsList from './RecordingsList'

const App = (state, setState) =>
  h('main', { className: 'd-flex flex-column' }, [
    // Recorder
    Recorder(state, setState),
    // Recordings list header
    h('h1', {}, ['recordings']),
    // List of recorded audio clips
    RecordingsList(state, setState)
  ])

export default App
