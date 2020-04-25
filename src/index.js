import { render } from './vdom'
import App from './components/App'

// Register the offline service worker
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('./offlineSW.js')
    .catch(error => console.error('SW not registered', error))
}

// Persistent state for diffing vdom updates
const vdom = {
  container: document.getElementById('app'),
  current: null,
  previous: null
}

// Initialize application state
let state = {
  playing: null,
  recording: false,
  mediaRecorder: null,
  slices: [],
  recordings: []
}

// Sets state and re-renders the DOM based on the diff from the previous vdom
// and the current vdom
function setState(newState) {
  state = newState
  vdom.previous = vdom.current
  vdom.current = App(state, setState)
  render(vdom.container, vdom.previous, vdom.current)
  return state
}

// Initialize the app UI
vdom.current = App(state, setState)
render(vdom.container, vdom.previous, vdom.current)
