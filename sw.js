const CACHE='fieldpro-v3';
const ASSETS=['./fieldpro-v3.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(cached=>{const network=fetch(e.request).then(resp=>{if(resp.ok){const clone=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));}return resp;}).catch(()=>cached);return cached||network;}));});
self.addEventListener('push',e=>{const data=e.data?e.data.json():{title:'FieldPro',body:'New notification'};e.waitUntil(self.registration.showNotification(data.title,{body:data.body,icon:'./icon-192.png',badge:'./icon-192.png',tag:data.tag||'fp',data:data.url||'/'}));});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(cs=>{for(const c of cs){if('focus' in c)return c.focus();}if(clients.openWindow)return clients.openWindow('./fieldpro-v3.html');}));});
