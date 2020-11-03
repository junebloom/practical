# Practical

A simple audio recorder app designed for rapid feedback while practicing speaking, singing, or whatever skill you're working on.

Practical is a Progressive Web App. It is completely offline and your data persists on your device until your browser cache is cleared. You can even install Practical on your device using the "add to home screen" feature of your browser.

## Behind the scenes

My goal in making Practical was to create a little tool that is useful to me personally, respects privacy and data ownership, makes good use of the modern web platform, and which teaches me something new.

### Technologies

- [React](https://github.com/facebook/react) - for UI ([without JSX](https://junebloom.github.io/blog/some-thoughts-on-dropping-jsx))
- MediaRecorder and HTMLAudioElement - for audio i/o
- IndexedDB (promisified via [idb](https://github.com/jakearchibald/idb)) - for offline data storage
- Service Worker - for caching assets offline
