import { createElement as h } from 'react'
import Recording from './Recording'

function RecordingsList({ state, setState }) {
  const recordings = state.recordings.map(recording =>
    h(Recording, { state, setState, recording, key: recording.url })
  )

  return h('ol', { className: 'recordings-list' }, recordings)
}

export default RecordingsList
