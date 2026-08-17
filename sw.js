const V='sharks-v11';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const u=e.request.url;
  if(u.includes('firebase')||u.includes('anthropic')||u.includes('googleapis')||
     u.includes('gstatic')||u.includes('openai')||u.includes('generativelanguage')||
     u.includes('groq')||u.includes('fonts.'))return;
  e.respondWith(fetch(e.request).catch(()=>new Response('',{status:503})));
});
