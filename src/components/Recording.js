import { h } from '../vdom'

const Recording = (state, setState, recording) =>
  h('li', { className: 'd-flex' }, [
    h(
      'button',
      {
        className: 'button flex-grow text-left',
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
        className: 'button button--dark',
        href: recording.url,
        download: 'recording.ogg'
      },
      ['download']
    )
  ])

export default Recording
