import { h } from '../vdom'

const Recording = (state, setState, recording) =>
  h('li', { className: 'd-flex' }, [
    h(
      'button',
      {
        className: 'button flex-grow text-left p-05',
        onclick: () => setState({ ...state, playing: recording })
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
    h(
      'a',
      {
        className: 'button button--dark p-05',
        href: recording.url,
        download: 'recording.webm'
      },
      ['save']
    )
  ])

export default Recording
