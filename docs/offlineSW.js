self.addEventListener("install",(()=>{self.skipWaiting()})),self.addEventListener("activate",(e=>{e.waitUntil(self.clients.claim())})),self.addEventListener("fetch",(e=>{e.respondWith(async function(e){const t=await caches.open("recorder-offline-v1");try{const n=await fetch(e);return t.put(e,n.clone()),n}catch(n){return await t.match(e)}}(e.request))}));
//# sourceMappingURL=offlineSW.js.map
