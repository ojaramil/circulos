/**
 * Service Worker for EduQuest PWA
 * Provides offline functionality and caching
 */

const CACHE_NAME = 'eduquest-v1.0.0';
const OFFLINE_URL = './offline.html';

// Files to cache for offline functionality
const STATIC_CACHE_URLS = [
    './',
    './index.html',
    './course-viewer.html',
    './offline.html',
    
    // CSS files
    './css/main.css',
    './css/dashboard.css',
    './css/course-viewer.css',
    './css/responsive.css',
    
    // JavaScript files
    '/js/app.js',
    '/js/course-app.js',
    '/js/models/User.js',
    '/js/models/Course.js',
    '/js/models/Progress.js',
    '/js/utils/storage.js',
    '/js/utils/courseDiscovery.js',
    '/js/utils/courseMetadata.js',
    '/js/utils/thumbnailGenerator.js',
    '/js/utils/achievementSystem.js',
    '/js/utils/notificationSystem.js',
    '/js/utils/bonusPointSystem.js',
    '/js/utils/progressAnalytics.js',
    '/js/utils/timeTracker.js',
    '/js/utils/dataSync.js',
    '/js/utils/leaderboardSystem.js',
    '/js/utils/certificateGenerator.js',
    '/js/utils/demoData.js',
    '/js/components/Dashboard.js',
    '/js/components/CourseViewer.js',
    '/js/components/Leaderboard.js',
    '/js/components/UserProfile.js',
    '/js/components/ProgressStats.js',
    
    // Manifest
    '/manifest.json'
];

// Dynamic cache patterns
const CACHE_PATTERNS = {
    courses: /^\/\d{3}\//,
    images: /\.(png|jpg|jpeg|gif|svg|webp)$/,
    fonts: /\.(woff|woff2|ttf|eot)$/
};

/**
 * Install event - cache static resources
 */
self.addEventListener('install', event => {
    console.log('🔧 Service Worker installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Caching static resources...');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => {
                console.log('✅ Static resources cached');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Failed to cache static resources:', error);
            })
    );
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('🗑️ Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Service Worker activated');
                return self.clients.claim();
            })
    );
});

/**
 * Fetch event - serve cached content or fetch from network
 */
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension and other non-http requests
    if (!event.request.url.startsWith('http')) {
        return;
    }

    event.respondWith(
        handleFetch(event.request)
    );
});

/**
 * Handle fetch requests with caching strategy
 */
async function handleFetch(request) {
    const url = new URL(request.url);
    
    try {
        // Strategy 1: Cache First for static resources
        if (isStaticResource(url.pathname)) {
            return await cacheFirst(request);
        }
        
        // Strategy 2: Network First for course content
        if (isCourseContent(url.pathname)) {
            return await networkFirst(request);
        }
        
        // Strategy 3: Stale While Revalidate for API-like requests
        if (isApiRequest(url.pathname)) {
            return await staleWhileRevalidate(request);
        }
        
        // Default: Network First
        return await networkFirst(request);
        
    } catch (error) {
        console.error('❌ Fetch failed:', error);
        return await handleOffline(request);
    }
}

/**
 * Cache First strategy - serve from cache, fallback to network
 */
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
}

/**
 * Network First strategy - try network, fallback to cache
 */
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        throw error;
    }
}

/**
 * Stale While Revalidate strategy - serve from cache, update in background
 */
async function staleWhileRevalidate(request) {
    const cachedResponse = await caches.match(request);
    
    const networkResponsePromise = fetch(request)
        .then(networkResponse => {
            if (networkResponse.ok) {
                const cache = caches.open(CACHE_NAME);
                cache.then(c => c.put(request, networkResponse.clone()));
            }
            return networkResponse;
        })
        .catch(() => null);
    
    return cachedResponse || await networkResponsePromise;
}

/**
 * Handle offline scenarios
 */
async function handleOffline(request) {
    // For navigation requests, show offline page
    if (request.mode === 'navigate') {
        const offlineResponse = await caches.match(OFFLINE_URL);
        if (offlineResponse) {
            return offlineResponse;
        }
    }
    
    // For other requests, try to find a cached version
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // Return a basic offline response
    return new Response(
        JSON.stringify({
            error: 'Offline',
            message: 'No hay conexión a internet y el contenido no está en caché'
        }),
        {
            status: 503,
            statusText: 'Service Unavailable',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}

/**
 * Check if URL is a static resource
 */
function isStaticResource(pathname) {
    return STATIC_CACHE_URLS.some(url => pathname.endsWith(url)) ||
           CACHE_PATTERNS.images.test(pathname) ||
           CACHE_PATTERNS.fonts.test(pathname);
}

/**
 * Check if URL is course content
 */
function isCourseContent(pathname) {
    return CACHE_PATTERNS.courses.test(pathname);
}

/**
 * Check if URL is an API request
 */
function isApiRequest(pathname) {
    return pathname.includes('/api/') || 
           pathname.includes('.json') ||
           pathname.includes('/data/');
}

/**
 * Background sync for offline actions
 */
self.addEventListener('sync', event => {
    console.log('🔄 Background sync triggered:', event.tag);
    
    if (event.tag === 'progress-sync') {
        event.waitUntil(syncProgress());
    } else if (event.tag === 'user-data-sync') {
        event.waitUntil(syncUserData());
    }
});

/**
 * Sync progress data when back online
 */
async function syncProgress() {
    try {
        console.log('📊 Syncing progress data...');
        
        // Get pending sync data from IndexedDB or localStorage
        const pendingData = await getPendingSyncData('progress');
        
        if (pendingData.length > 0) {
            for (const data of pendingData) {
                // Simulate API call to sync progress
                await syncProgressItem(data);
            }
            
            // Clear pending data after successful sync
            await clearPendingSyncData('progress');
            console.log('✅ Progress data synced successfully');
        }
        
    } catch (error) {
        console.error('❌ Failed to sync progress data:', error);
        throw error;
    }
}

/**
 * Sync user data when back online
 */
async function syncUserData() {
    try {
        console.log('👤 Syncing user data...');
        
        const pendingData = await getPendingSyncData('user');
        
        if (pendingData.length > 0) {
            for (const data of pendingData) {
                await syncUserDataItem(data);
            }
            
            await clearPendingSyncData('user');
            console.log('✅ User data synced successfully');
        }
        
    } catch (error) {
        console.error('❌ Failed to sync user data:', error);
        throw error;
    }
}

/**
 * Get pending sync data (placeholder - would use IndexedDB in production)
 */
async function getPendingSyncData(type) {
    // In a real implementation, this would read from IndexedDB
    return [];
}

/**
 * Clear pending sync data
 */
async function clearPendingSyncData(type) {
    // In a real implementation, this would clear IndexedDB data
    console.log(`🗑️ Cleared pending ${type} sync data`);
}

/**
 * Sync individual progress item
 */
async function syncProgressItem(data) {
    // Placeholder for actual API call
    console.log('📤 Syncing progress item:', data);
}

/**
 * Sync individual user data item
 */
async function syncUserDataItem(data) {
    // Placeholder for actual API call
    console.log('📤 Syncing user data item:', data);
}

/**
 * Handle push notifications
 */
self.addEventListener('push', event => {
    console.log('📱 Push notification received');
    
    const options = {
        body: 'Tienes nuevos logros disponibles en EduQuest',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver Logros',
                icon: '/icons/action-explore.png'
            },
            {
                action: 'close',
                title: 'Cerrar',
                icon: '/icons/action-close.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('EduQuest', options)
    );
});

/**
 * Handle notification clicks
 */
self.addEventListener('notificationclick', event => {
    console.log('🔔 Notification clicked:', event.action);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/?view=profile')
        );
    } else if (event.action === 'close') {
        // Just close the notification
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

/**
 * Handle messages from the main thread
 */
self.addEventListener('message', event => {
    console.log('💬 Message received:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    } else if (event.data && event.data.type === 'CACHE_COURSE') {
        // Cache specific course content
        event.waitUntil(cacheCourse(event.data.courseId));
    }
});

/**
 * Cache specific course content for offline access
 */
async function cacheCourse(courseId) {
    try {
        console.log(`📚 Caching course ${courseId} for offline access...`);
        
        const cache = await caches.open(CACHE_NAME);
        const courseUrls = [
            `/${courseId}/`,
            `/${courseId}/lecciones/`,
            `/${courseId}/juegos/`
        ];
        
        // Add course-specific URLs to cache
        await cache.addAll(courseUrls);
        
        console.log(`✅ Course ${courseId} cached successfully`);
        
    } catch (error) {
        console.error(`❌ Failed to cache course ${courseId}:`, error);
    }
}

console.log('🎯 EduQuest Service Worker loaded');