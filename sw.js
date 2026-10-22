// Service worker: guarda la app para usarla sin internet. Versión 8f74097dce (cambia al cambiar la app).
const V='cuaderno-8f74097dce';
const ARCH=["./", "index.html", "manifest.webmanifest", "icons/icon-48.png", "icons/icon-72.png", "icons/icon-96.png", "icons/icon-144.png", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-512-maskable.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ARCH)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);if(u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('index.html'):Response.error())));
});
