import { render } from './vdom'
import App from './components/App'

const vdom = {
  container: document.getElementById('app'),
  current: null,
  previous: null
}

let state = {
  playing: null,
  recording: false,
  mediaRecorder: null,
  slices: [],
  recordings: []
}

function setState(newState) {
  state = newState
  vdom.previous = vdom.current
  vdom.current = App(state, setState)
  render(vdom.container, vdom.previous, vdom.current)
  return state
}

vdom.current = App(state, setState)
render(vdom.container, vdom.previous, vdom.current)
