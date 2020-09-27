import { h } from '../vdom'
import PlaybackControls from './PlaybackControls'

// Recordings list item
const Recording = (state, setState, recording) =>
  h(
    'li',
    { className: 'd-flex flex-column' },
    [
      h('div', { className: 'd-flex' }, [
        // Select button
        // Loads the recording and begins playback
        h(
          'button',
          {
            className: 'button flex-grow text-left p-05',
            onclick: () => {
              state.player.src = recording.url
              state.player.load()
              state.player.play()

              // Force a render
              setState(state)
            }
          },
          [
            recording.timestamp
              .toLocaleString(undefined, {
                weekday: 'short',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })
              .toLowerCase()
          ]
        ),
        // Download button
        h(
          'a',
          {
            className: 'button button--dark p-05',
            href: recording.url,
            download: 'recording.webm'
          },
          ['save']
        )
      ]),
      state.player.src === recording.url
        ? PlaybackControls(state, setState)
        : null
    ].filter(child => child) // Remove the null element if present
  )

export default Recording
