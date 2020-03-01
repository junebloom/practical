import { h } from '../vdom'
import Recorder from './Recorder'

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
    // Recordings list header
    h('h1', {}, ['recordings']),
    // Recordings list
    h(
      'ul',
      {},
      state.recordings.map(recording =>
        h('li', {}, [
          h('a', { href: recording.url, download: 'recording.ogg' }, [
            recording.timestamp.toLocaleString()
          ]),
          h(
            'button',
            {
              onclick: () => setState({ ...state, playing: recording })
            },
            ['play']
          )
        ])
      )
    )
  ])

export default App
