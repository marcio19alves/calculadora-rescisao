const CACHE_NAME = 'ctrabalhista-v1';

// Recursos para cache offline
const PRECACHE_URLS = [
  '/',
  '/calculadora-rescisao',
  '/calculadora-fgts',
  '/calculadora-ferias',
  '/calculadora-horas-extras',
  '/calculadora-juros',
  '/calculadora-adicional-noturno',
  '/calculadora-salario-minimo',
  '/calculadora-salario-liquido',
  '/calculadora-seguro-desemprego',
  '/calculadora-13o-salario',
  '/calculadora-inss',
  '/calculadora-irrf',
  '/calculadora-empregado-domestico',
  '/calculadora-escala-trabalho',
  '/calculadora-juros-simples',
  '/calculadora-porcentagem',
  '/calculadora-reajuste-aluguel',
  '/calculadora-financiamento-veiculos',
  '/calculadora-emprestimo-pessoal',
  '/calculadora-imc',
  '/calculadora-gestacional',
  '/calculadora-dias-entre-datas',
  '/calculadora-churrasco',
  '/sobre',
  '/contato',
  '/politica-de-privacidade'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('google-analytics') ||
      event.request.url.includes('googletagmanager')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          if (event.request.headers.get('Accept')?.includes('text/html')) {
            return caches.match('/');
          }
          return new Response('Offline', { status: 503 });
        });
      })
  );
});
