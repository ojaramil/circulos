/**
 * PWA Manager - Handles Progressive Web App functionality
 */
class PWAManager {
    constructor() {
        this.isInstalled = false;
        this.deferredPrompt = null;
        this.serviceWorker = null;
        
        this.init();
    }

    /**
     * Initialize PWA functionality
     */
    async init() {
        console.log('📱 Initializing PWA Manager...');
        
        // Register service worker
        await this.registerServiceWorker();
        
        // Setup install prompt
        this.setupInstallPrompt();
        
        // Check if already installed
        this.checkInstallStatus();
        
        // Setup update handling
        this.setupUpdateHandling();
        
        // Setup offline detection
        this.setupOfflineDetection();
        
        // Setup background sync
        this.setupBackgroundSync();
        
        console.log('✅ PWA Manager initialized');
    }

    /**
     * Register service worker
     */
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                this.serviceWorker = registration;
                
                console.log('✅ Service Worker registered:', registration.scope);
                
                // Handle updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            this.showUpdateNotification();
                        }
                    });
                });
                
                return registration;
                
            } catch (error) {
                console.error('❌ Service Worker registration failed:', error);
            }
        } else {
            console.warn('⚠️ Service Worker not supported');
        }
    }

    /**
     * Setup install prompt
     */
    setupInstallPrompt() {
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('📱 Install prompt available');
            
            // Prevent the mini-infobar from appearing
            e.preventDefault();
            
            // Save the event for later use
            this.deferredPrompt = e;
            
            // Show custom install button
            this.showInstallButton();
        });

        // Listen for app installed event
        window.addEventListener('appinstalled', () => {
            console.log('✅ PWA installed successfully');
            this.isInstalled = true;
            this.hideInstallButton();
            this.showInstalledNotification();
        });
    }

    /**
     * Show install button
     */
    showInstallButton() {
        // Create install button if it doesn't exist
        let installBtn = document.getElementById('pwa-install-btn');
        
        if (!installBtn) {
            installBtn = document.createElement('button');
            installBtn.id = 'pwa-install-btn';
            installBtn.className = 'pwa-install-btn';
            installBtn.innerHTML = '📱 Instalar App';
            installBtn.onclick = () => this.promptInstall();
            
            // Add styles
            installBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 25px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                z-index: 9999;
                transition: transform 0.2s ease;
                animation: slideInUp 0.3s ease;
            `;
            
            // Add hover effect
            installBtn.addEventListener('mouseenter', () => {
                installBtn.style.transform = 'translateY(-2px)';
            });
            
            installBtn.addEventListener('mouseleave', () => {
                installBtn.style.transform = 'translateY(0)';
            });
            
            document.body.appendChild(installBtn);
        }
        
        installBtn.style.display = 'block';
    }

    /**
     * Hide install button
     */
    hideInstallButton() {
        const installBtn = document.getElementById('pwa-install-btn');
        if (installBtn) {
            installBtn.style.display = 'none';
        }
    }

    /**
     * Prompt user to install PWA
     */
    async promptInstall() {
        if (!this.deferredPrompt) {
            console.warn('⚠️ Install prompt not available');
            return;
        }

        // Show the install prompt
        this.deferredPrompt.prompt();
        
        // Wait for user response
        const { outcome } = await this.deferredPrompt.userChoice;
        
        console.log(`📱 Install prompt outcome: ${outcome}`);
        
        if (outcome === 'accepted') {
            console.log('✅ User accepted install prompt');
        } else {
            console.log('❌ User dismissed install prompt');
        }
        
        // Clear the deferred prompt
        this.deferredPrompt = null;
        this.hideInstallButton();
    }

    /**
     * Check if app is already installed
     */
    checkInstallStatus() {
        // Check if running in standalone mode
        if (window.matchMedia('(display-mode: standalone)').matches) {
            this.isInstalled = true;
            console.log('✅ PWA is running in standalone mode');
        }
        
        // Check for iOS standalone mode
        if (window.navigator.standalone === true) {
            this.isInstalled = true;
            console.log('✅ PWA is running in iOS standalone mode');
        }
        
        // Add installed class to body
        if (this.isInstalled) {
            document.body.classList.add('pwa-installed');
        }
    }

    /**
     * Setup update handling
     */
    setupUpdateHandling() {
        if (!this.serviceWorker) return;
        
        // Check for updates periodically
        setInterval(() => {
            this.serviceWorker.update();
        }, 60000); // Check every minute
    }

    /**
     * Show update notification
     */
    showUpdateNotification() {
        // Create update notification
        const updateNotification = document.createElement('div');
        updateNotification.className = 'pwa-update-notification';
        updateNotification.innerHTML = `
            <div class="update-content">
                <span class="update-icon">🔄</span>
                <div class="update-text">
                    <strong>Nueva versión disponible</strong>
                    <p>Hay una actualización de EduQuest disponible</p>
                </div>
                <button class="update-btn" onclick="pwaManager.applyUpdate()">
                    Actualizar
                </button>
                <button class="dismiss-btn" onclick="this.parentElement.parentElement.remove()">
                    ✕
                </button>
            </div>
        `;
        
        // Add styles
        updateNotification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            max-width: 400px;
            width: 90%;
            animation: slideInDown 0.3s ease;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .update-content {
                display: flex;
                align-items: center;
                padding: 16px;
                gap: 12px;
            }
            
            .update-icon {
                font-size: 24px;
            }
            
            .update-text {
                flex: 1;
            }
            
            .update-text strong {
                display: block;
                margin-bottom: 4px;
                color: #333;
            }
            
            .update-text p {
                margin: 0;
                font-size: 14px;
                color: #666;
            }
            
            .update-btn {
                background: #4caf50;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: bold;
            }
            
            .dismiss-btn {
                background: none;
                border: none;
                color: #999;
                cursor: pointer;
                padding: 8px;
                margin-left: 8px;
            }
            
            @keyframes slideInDown {
                from {
                    transform: translateX(-50%) translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(updateNotification);
        
        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            if (updateNotification.parentNode) {
                updateNotification.remove();
            }
        }, 10000);
    }

    /**
     * Apply update
     */
    async applyUpdate() {
        if (!this.serviceWorker) return;
        
        // Tell the service worker to skip waiting
        if (this.serviceWorker.waiting) {
            this.serviceWorker.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        
        // Reload the page to apply update
        window.location.reload();
    }

    /**
     * Setup offline detection
     */
    setupOfflineDetection() {
        // Update online status
        const updateOnlineStatus = () => {
            const isOnline = navigator.onLine;
            document.body.classList.toggle('offline', !isOnline);
            document.body.classList.toggle('online', isOnline);
            
            if (isOnline) {
                this.showOnlineNotification();
                this.syncOfflineData();
            } else {
                this.showOfflineNotification();
            }
        };
        
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        
        // Initial status
        updateOnlineStatus();
    }

    /**
     * Show offline notification
     */
    showOfflineNotification() {
        this.showStatusNotification('📡 Sin conexión', 'Trabajando sin conexión', 'offline');
    }

    /**
     * Show online notification
     */
    showOnlineNotification() {
        this.showStatusNotification('🌐 Conectado', 'Conexión restaurada', 'online');
    }

    /**
     * Show status notification
     */
    showStatusNotification(title, message, type) {
        // Remove existing status notifications
        const existing = document.querySelectorAll('.status-notification');
        existing.forEach(el => el.remove());
        
        const notification = document.createElement('div');
        notification.className = `status-notification ${type}`;
        notification.innerHTML = `
            <div class="status-content">
                <strong>${title}</strong>
                <p>${message}</p>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'online' ? '#4caf50' : '#ff9800'};
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }

    /**
     * Setup background sync
     */
    setupBackgroundSync() {
        if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
            // Register for background sync when data changes
            this.registerBackgroundSync('progress-sync');
            this.registerBackgroundSync('user-data-sync');
        }
    }

    /**
     * Register background sync
     */
    async registerBackgroundSync(tag) {
        try {
            const registration = await navigator.serviceWorker.ready;
            await registration.sync.register(tag);
            console.log(`✅ Background sync registered: ${tag}`);
        } catch (error) {
            console.error(`❌ Background sync registration failed: ${tag}`, error);
        }
    }

    /**
     * Sync offline data
     */
    async syncOfflineData() {
        if (typeof DataSync !== 'undefined') {
            try {
                await DataSync.processSyncQueue();
                console.log('✅ Offline data synced');
            } catch (error) {
                console.error('❌ Failed to sync offline data:', error);
            }
        }
    }

    /**
     * Show installed notification
     */
    showInstalledNotification() {
        if (window.notificationSystem) {
            window.notificationSystem.showCustomNotification({
                type: 'info',
                icon: '📱',
                title: '¡App Instalada!',
                message: 'EduQuest se ha instalado correctamente en tu dispositivo',
                duration: 5000
            });
        }
    }

    /**
     * Cache course for offline access
     */
    async cacheCourseForOffline(courseId) {
        if (!this.serviceWorker) return false;
        
        try {
            // Send message to service worker to cache course
            if (this.serviceWorker.active) {
                this.serviceWorker.active.postMessage({
                    type: 'CACHE_COURSE',
                    courseId: courseId
                });
            }
            
            console.log(`📦 Caching course ${courseId} for offline access`);
            return true;
            
        } catch (error) {
            console.error(`❌ Failed to cache course ${courseId}:`, error);
            return false;
        }
    }

    /**
     * Get PWA capabilities
     */
    getCapabilities() {
        return {
            serviceWorker: 'serviceWorker' in navigator,
            installPrompt: this.deferredPrompt !== null,
            backgroundSync: 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype,
            pushNotifications: 'serviceWorker' in navigator && 'PushManager' in window,
            isInstalled: this.isInstalled,
            isOnline: navigator.onLine
        };
    }

    /**
     * Request notification permission
     */
    async requestNotificationPermission() {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            console.log(`📱 Notification permission: ${permission}`);
            return permission === 'granted';
        }
        return false;
    }

    /**
     * Show push notification
     */
    showPushNotification(title, options = {}) {
        if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification(title, {
                icon: '/icons/icon-192x192.png',
                badge: '/icons/badge-72x72.png',
                ...options
            });
            
            notification.onclick = () => {
                window.focus();
                notification.close();
            };
            
            return notification;
        }
        return null;
    }
}

// Initialize PWA Manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.pwaManager = new PWAManager();
});

// Export for use in other modules
window.PWAManager = PWAManager;