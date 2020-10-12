# Practical

A simple audio recorder app designed for rapid feedback while practicing speaking, singing, or whatever skill you're working on.

Practical is a Progressive Web App. It is completely offline and your data persists on your device until your browser cache is cleared. You can even install Practical on your device using the "add to home screen" feature of your browser.

## Behind the scenes

My goal in making Practical is to create a little tool that is useful to me personally, respects privacy and data ownership, makes good use of the modern web platform, and which teaches me some new things.

### Technologies

- [React](https://github.com/facebook/react) - for UI
- MediaRecorder and HTMLAudioElement - for audio i/o
- IndexedDB (promisified via [idb](https://github.com/jakearchibald/idb)) - for offline data storage
- Service Worker - for caching assets offline

I also experimented with _not_ using JSX in this project. At first, this was because I started the project with the technical goal of zero dependencies and no build step, but I decided to stick with plain JS even after I dropped that requirement.

When I started, I had a very small custom VDOM, and the components I wrote for it were in plain JS. After running in to limitations with my VDOM, I chose to switch to React for the sake of completing the project, rather than reinvent the wheel. _(I'll totally give reinventing the wheel a shot at some point, though!)_

After translating my components to JSX, I was a bit surprised to find that they were less readable than before. HTML, we must admit, is kind of verbose and JSX adds to the verbosity. Compare passing props in JS and JSX for example:

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

_(What is our object spreading in to, exactly? An implied object literal that will only be present after transpiling, it seems. It feels icky to write an invalid JS expression and then rely on the transpiler to complete it. It also seems silly to create an object literal whose sole purpose is to be spread.)_

It was hard to see the major benefit of JSX for this project, so I tried dropping it entirely, and it turns out I had almost no problems doing so. For application UI, it felt totally natural to write and consume using plain JS.

However, a use-case that would certainly benefit from JSX is in the [Footer component](/src/components/Footer.js) of the app. It is an area that makes use of hypertext, and the plain JS code is a bit difficult to read, so writing it with some kind of purpose-made _HyperText Markup Language_ would make sense!

## TODO

- gh pages
- undo delete
- kb control
- renaming
- sessions/projects
