import { h } from '../vdom'

const Recording = (state, setState, recording) =>
  h('li', { className: 'd-flex' }, [
    h(
      'button',
      {
        className: 'button button--dark',
        onclick: () => setState({ ...state, playing: recording })
      },
      ['play']
    ),
    h('span', { className: 'd-flex flex-grow bg-lighter p-1' }, [
      h(
        'a',
        {
          className: '',
          href: recording.url,
          download: 'recording.ogg'
        },
        ['download']
      ),
      h('span', { className: 'flex-grow' }, []),
      h('span', {}, [
        recording.timestamp
          .toLocaleString(undefined, {
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
          .toLowerCase()
      ])
    ])
  ])

export default Recording
