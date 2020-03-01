import { h } from '../vdom'

const Recording = (state, setState, recording) =>
  h('li', { className: 'recording' }, [
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

export default Recording
