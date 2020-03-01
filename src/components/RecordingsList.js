import { h } from '../vdom'
import Recording from './Recording'

const RecordingsList = (state, setState) =>
  h('section', {}, [
    // Recordings list header
    h('h1', {}, ['recordings']),
    // Recordings list
    h(
      'ul',
      { className: 'recordingsList' },
      state.recordings.map(recording => Recording(state, setState, recording))
    )
  ])

export default RecordingsList