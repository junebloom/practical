import { h } from '../vdom'
import Recording from './Recording'

const RecordingsList = (state, setState) =>
  h('section', {}, [
    h(
      'ol',
      { className: 'recordings-list' },
      state.recordings.map(recording => Recording(state, setState, recording))
    )
  ])

export default RecordingsList
