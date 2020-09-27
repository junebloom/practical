import { h } from '../vdom'

const PlaybackControls = (state, setState) =>
  h('div', { className: 'd-flex' }, [
    // Play button
    h(
      'button',
      {
        className: 'button p-05',
        onclick: () => {
          if (state.player.paused) state.player.play()
          else state.player.pause()
          setState(state)
        }
      },
      [state.player.paused ? 'play' : 'pause']
    ),
    // Progress bar
    h('div', { className: 'flex-grow' }, ['progress bar']),
    // Volume control
    h('div', {}, ['volume'])
  ])

export default PlaybackControls
