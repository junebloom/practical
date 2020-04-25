const version = 'recorder-offline-v1'

// Attempts to fetch a resource from the server.
// Falls back to the local cache if the server is unavailable.
async function getResource(request) {
  const cache = await caches.open(version)
  try {
    const response = await fetch(request)
    cache.put(request, response.clone())
    return response
  } catch (error) {
    return await cache.match(request)
  }
}

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  event.respondWith(getResource(event.request))
})
