A simple audio recorder app, designed for rapid feedback while practicing speaking, singing, or whatever you're into.

Practical is a Progressive Web App. It is completely offline and your data persists on your device until your browser cache is cleared. You can even install Practical on your device using the "add to home screen" feature of your browser.

## Behind the scenes

My goal in making Practical is to create a little tool that is useful to me personally, respects privacy and data ownership, makes good use of the modern web platform, and which teaches me some new things.

For example, I had a lot of fun digging into React hooks. Class components always seemed a bit clumsy to me, and certain things like binding event handlers felt more like dirty hacks than idiomatic JS. So I'm glad to be able to enjoy a much nicer API when using React.

### Technologies

- [React](https://github.com/facebook/react) - for UI
- MediaRecorder and HTMLAudioElement - for audio i/o
- IndexedDB (promisified via [idb](https://github.com/jakearchibald/idb)) - for offline data storage
- Service Worker - for caching assets offline

**I also chose _not to use JSX_ in this project.** At first, this was because I started the project with the technical goal of zero dependencies and no build step, but something unexpected happened once I dropped that requirement.

When I started, I had a very small custom VDOM, and the components I wrote for it were in plain JS. After running in to limitations with my VDOM, I chose to switch to React for the sake of completing the project, rather than reinvent the wheel. _(I'll totally give reinventing the wheel a shot at some point, though!)_

After translating my components to JSX, I was surprised to find that it was actually less readable than the same components written as plain function calls.

JS is fun and exciting to me. HTML, we must admit, is somewhat verbose and uninspiring, and JSX adds to this verbosity. Take passing props for example:

```js
import { createElement as h } from "react";
// ...

// In plain JS we just pass an object:
h(RecordingsList, { recordings, player });
```

```jsx
// In JSX we have to either repeat the property names...
<RecordingsList recordings={recordings} player={player} />
```

```jsx
// ...or use object spreading in an odd way:
<RecordingsList {...{ recordings, player }} />
```

What is our object spreading _in to_, exactly? Some implied object literal that will be present after transpiling, I guess. It feels like a hack to write an invalid JS expression and then rely on the transpiler to complete it. It also feels silly to create an object literal whose sole purpose is to be spread. Beyond the weirdness of this use of the spread operator, it is still more verbose than plain JS.

After critical examination it was hard to see any substantial benefit of JSX, at least for this project, so I tried dropping it entirely. And it turns out I had no problems at all with doing everything in JavaScript. In fact it felt more natural and consistent to write and consume components using JS.

This has the additional benefit that technically my project does not require a build step, though it may still be a good idea.

## TODO

- manifest
- footer info
- gh pages
- better slider dragging
- undo delete
- kb control
- renaming
- sessions/projects
