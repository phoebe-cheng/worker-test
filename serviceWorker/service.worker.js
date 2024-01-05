// sw.ts

console.log('哈哈123');

// 定义缓存名称
const CACHE_NAME = 'cache-test-v1';

// 定义需要缓存的资源
const urlsToCache = ['./manifest.json', './index.html', './assets/logo.png'];

// install事件会在service worker注册成功的时候触发，主要用于缓存资源
// 如果sw.js发生了变化，install会重新触发，activate处于等待状态，直到当前service worker终止
self.addEventListener('install', async (event) => {
  console.log('service worker install...');

  // cacheStorage接口表示Cache对象的存储，可以通过CacheStorage.open()方法打开缓存, 配合service worker来实现资源的缓存
  const cache = await caches.open(CACHE_NAME);
  // 存储资源
  await cache.addAll(urlsToCache);
  
  // 可以通过self.skipWaiting()方法跳过等待，立即激活新的service worker
  await self.skipWaiting();
});

// activate事件会在service worker激活的时候触发，主要用户删除旧的资源
self.addEventListener('activate', async (event) => {
  console.log('service worker activate...');

  // 表示service worker激活后立即获取控制权
  self.clients.claim();

  // 清除旧的缓存资源
  const keys = await caches.keys();
  keys.forEach((key) => {
    if (key !== CACHE_NAME) {
      caches.delete(key);
    }
  });
});

// fetch事件会在发送请求的时候触发，主要用户操作缓存或者读取网络资源
// 各种缓存策略
self.addEventListener('fetch', (event) => {

  const req = event.request;

  console.log('service worker fetch...', req);

  event.respondWith(cacheFirst(req));
});

// 网络优先
const networkFirst = async (req) => {
  try {
    const response = await fetch(req);
    const cache = await caches.open(CACHE_NAME);
    return response;
  } catch (error) {
    // 从缓存中读取资源
    return await caches.match(req);
  }
};

// 缓存优先
const cacheFirst = async (req) => {
  try {
    const cacheResponse = await caches.match(req);
    return cacheResponse || networkFirst(req);
  } catch (error) {
    return await caches.match(req);
  }
};

// 监听消息事件，用于触发资源更新
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

// 在service worker中无法使用xmlHttpRequest，只能使用fetch



// 对于不同的数据，需要不同的缓存策略
// 本地的静态资源，缓存优先
// 对于需要动态更新的数据，网络优化