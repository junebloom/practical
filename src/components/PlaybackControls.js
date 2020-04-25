import { h } from '../vdom'

const PlaybackControls = (state, setState) =>
  h('div', {}, [
    // Play button
    h('button', {}, ['play']),
    // Progress bar
    h('div', {}, ['progress bar']),
    // Volume control
    h('div', {}, ['volume'])
  ])

export default PlaybackControls
