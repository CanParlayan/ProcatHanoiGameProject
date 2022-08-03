const CACHE_NAME = "hanoi_v1.1"
const STATIC_ASSETS = [
	"index.html",
	"src/index.css",
	"src/index.js",
	"src/svg/hash-icon.svg",
	"src/svg/moon-icon.svg",
	"src/svg/reset-icon.svg"
]

self.oninstall = event =>
	event.waitUntil(caches.open(CACHE_NAME)
		.then(cache =>
			cache.addAll(STATIC_ASSETS)
		)
	)

self.onfetch = event =>
	event.respondWith(caches.match(event.request)
		.then(response =>
			response || fetch(event.request)
		)
	)