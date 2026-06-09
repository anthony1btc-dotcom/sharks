// sharks-v9 - network first, no cache for HTML
const CACHE = 'sharks-v9';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  // Never intercept these - let them go direct
  if (url.includes('firebase') || url.includes('anthropic') ||
      url.includes('googleapis') || url.includes('gstatic') ||
      url.includes('openai') || url.includes('generativelanguage') ||
      url.includes('fonts.')) return;
  // Always network first - no caching of app files
  e.respondWith(fetch(e.request).catch(() => new Response('Offline', {status: 503})));
});
