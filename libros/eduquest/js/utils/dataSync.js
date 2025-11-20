/**
 * Data Sync - Advanced data synchronization and persistence
 */
class DataSync {
    static SYNC_VERSION = '1.0.0';
    static SYNC_INTERVAL = 30000; // 30 seconds
    static MAX_RETRY_ATTEMPTS = 3;

    /**
     * Initialize data synchronization
     */
    static init() {
        this.syncQueue = [];
        this.isOnline = navigator.onLine;
        this.lastSyncTime = this.getLastSyncTime();
        
        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.processSyncQueue();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });

        // Periodic sync
        setInterval(() => {
            this.performPeriodicSync();
        }, this.SYNC_INTERVAL);

        // Sync on page unload
        window.addEventListener('beforeunload', () => {
            this.performFinalSync();
        });

        console.log('📡 Data sync initialized');
    }

    /**
     * Queue data for synchronization
     */
    static queueSync(type, data, priority = 'normal') {
        const syncItem = {
            id: this.generateSyncId(),
            type,
            data,
            priority,
            timestamp: Date.now(),
            attempts: 0,
            status: 'pending'
        };

        this.syncQueue.push(syncItem);
        
        // Sort by priority (high -> normal -> low)
        this.syncQueue.sort((a, b) => {
            const priorityOrder = { high: 3, normal: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });

        // Try immediate sync if online
        if (this.isOnline) {
            this.processSyncQueue();
        }

        return syncItem.id;
    }

    /**
     * Process sync queue
     */
    static async processSyncQueue() {
        if (!this.isOnline || this.syncQueue.length === 0) {
            return;
        }

        const pendingItems = this.syncQueue.filter(item => item.status === 'pending');
        
        for (const item of pendingItems) {
            try {
                await this.syncItem(item);
                item.status = 'completed';
                item.completedAt = Date.now();
            } catch (error) {
                item.attempts++;
                item.lastError = error.message;
                
                if (item.attempts >= this.MAX_RETRY_ATTEMPTS) {
                    item.status = 'failed';
                    console.error(`❌ Sync failed for item ${item.id}:`, error);
                } else {
                    console.warn(`⚠️ Sync retry ${item.attempts}/${this.MAX_RETRY_ATTEMPTS} for item ${item.id}`);
                }
            }
        }

        // Clean up completed and failed items
        this.syncQueue = this.syncQueue.filter(item => 
            item.status === 'pending' && item.attempts < this.MAX_RETRY_ATTEMPTS
        );

        this.updateLastSyncTime();
    }

    /**
     * Sync individual item
     */
    static async syncItem(item) {
        switch (item.type) {
            case 'user_progress':
                return this.syncUserProgress(item.data);
            case 'user_profile':
                return this.syncUserProfile(item.data);
            case 'time_session':
                return this.syncTimeSession(item.data);
            case 'achievement':
                return this.syncAchievement(item.data);
            default:
                throw new Error(`Unknown sync type: ${item.type}`);
        }
    }

    /**
     * Sync user progress
     */
    static async syncUserProgress(data) {
        // In a real implementation, this would sync to a backend
        // For now, we'll just ensure local storage is consistent
        const key = `eduquest_progress_${data.userId}_${data.courseId}`;
        StorageManager.save(key, data);
        console.log(`✅ Synced progress for course ${data.courseId}`);
    }

    /**
     * Sync user profile
     */
    static async syncUserProfile(data) {
        StorageManager.save('eduquest_user', data);
        console.log(`✅ Synced user profile for ${data.username}`);
    }

    /**
     * Sync time session
     */
    static async syncTimeSession(data) {
        const key = `eduquest_time_sessions_${data.userId}`;
        const sessions = StorageManager.load(key, []);
        
        // Check if session already exists
        const existingIndex = sessions.findIndex(s => s.id === data.id);
        if (existingIndex >= 0) {
            sessions[existingIndex] = data;
        } else {
            sessions.push(data);
        }
        
        StorageManager.save(key, sessions);
        console.log(`✅ Synced time session ${data.id}`);
    }

    /**
     * Sync achievement
     */
    static async syncAchievement(data) {
        // Achievement data is part of user profile, so sync that
        return this.syncUserProfile(data.user);
    }

    /**
     * Perform periodic sync
     */
    static performPeriodicSync() {
        if (!this.isOnline) return;

        // Sync any pending items
        this.processSyncQueue();

        // Check for data integrity
        this.performDataIntegrityCheck();
    }

    /**
     * Perform final sync before page unload
     */
    static performFinalSync() {
        // Use sendBeacon for reliable data sending on page unload
        if (this.syncQueue.length > 0 && navigator.sendBeacon) {
            const syncData = {
                version: this.SYNC_VERSION,
                timestamp: Date.now(),
                items: this.syncQueue.filter(item => item.status === 'pending')
            };

            // In a real app, this would send to your backend
            console.log('📤 Final sync data prepared:', syncData);
        }
    }

    /**
     * Data integrity check
     */
    static performDataIntegrityCheck() {
        try {
            // Check user data consistency
            const user = StorageManager.load('eduquest_user');
            if (user) {
                // Validate user data structure
                if (!user.id || !user.username || typeof user.totalPoints !== 'number') {
                    console.warn('⚠️ User data integrity issue detected');
                    this.repairUserData(user);
                }
            }

            // Check progress data consistency
            this.checkProgressDataIntegrity();

        } catch (error) {
            console.error('❌ Data integrity check failed:', error);
        }
    }

    /**
     * Repair user data
     */
    static repairUserData(user) {
        const repairedUser = {
            id: user.id || `user_${Date.now()}`,
            username: user.username || 'Usuario',
            totalPoints: typeof user.totalPoints === 'number' ? user.totalPoints : 0,
            coursesCompleted: typeof user.coursesCompleted === 'number' ? user.coursesCompleted : 0,
            currentStreak: typeof user.currentStreak === 'number' ? user.currentStreak : 0,
            achievements: Array.isArray(user.achievements) ? user.achievements : [],
            createdAt: user.createdAt || new Date().toISOString(),
            settings: user.settings || { theme: 'light', notifications: true, soundEffects: true }
        };

        StorageManager.save('eduquest_user', repairedUser);
        console.log('🔧 User data repaired');
    }

    /**
     * Check progress data integrity
     */
    static checkProgressDataIntegrity() {
        // Scan for progress data inconsistencies
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('eduquest_progress_')) {
                try {
                    const data = StorageManager.load(key);
                    if (data && (!data.userId || !data.courseId)) {
                        console.warn(`⚠️ Progress data integrity issue: ${key}`);
                        // Could repair or flag for manual review
                    }
                } catch (error) {
                    console.warn(`⚠️ Corrupted progress data: ${key}`);
                    // Could attempt repair or removal
                }
            }
        }
    }

    /**
     * Export all user data
     */
    static exportUserData(userId) {
        const exportData = {
            version: this.SYNC_VERSION,
            exportDate: new Date().toISOString(),
            userId,
            user: StorageManager.load('eduquest_user'),
            progress: {},
            sessions: TimeTracker.getStoredSessions(userId),
            settings: StorageManager.load('eduquest_settings', {}),
            syncQueue: this.syncQueue.filter(item => item.data.userId === userId)
        };

        // Export all progress data
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(`eduquest_progress_${userId}_`)) {
                const courseId = key.replace(`eduquest_progress_${userId}_`, '');
                exportData.progress[courseId] = StorageManager.load(key);
            }
        }

        return exportData;
    }

    /**
     * Import user data
     */
    static importUserData(importData) {
        try {
            if (!importData.version || !importData.userId) {
                throw new Error('Invalid import data format');
            }

            // Import user profile
            if (importData.user) {
                StorageManager.save('eduquest_user', importData.user);
            }

            // Import progress data
            if (importData.progress) {
                Object.entries(importData.progress).forEach(([courseId, progressData]) => {
                    const key = `eduquest_progress_${importData.userId}_${courseId}`;
                    StorageManager.save(key, progressData);
                });
            }

            // Import sessions
            if (importData.sessions) {
                const key = `eduquest_time_sessions_${importData.userId}`;
                StorageManager.save(key, importData.sessions);
            }

            // Import settings
            if (importData.settings) {
                StorageManager.save('eduquest_settings', importData.settings);
            }

            console.log('✅ User data imported successfully');
            return true;

        } catch (error) {
            console.error('❌ Import failed:', error);
            return false;
        }
    }

    /**
     * Get sync status
     */
    static getSyncStatus() {
        const pendingItems = this.syncQueue.filter(item => item.status === 'pending').length;
        const failedItems = this.syncQueue.filter(item => item.status === 'failed').length;

        return {
            isOnline: this.isOnline,
            lastSyncTime: this.lastSyncTime,
            pendingItems,
            failedItems,
            queueSize: this.syncQueue.length,
            status: pendingItems > 0 ? 'syncing' : failedItems > 0 ? 'error' : 'synced'
        };
    }

    /**
     * Generate sync ID
     */
    static generateSyncId() {
        return `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Get last sync time
     */
    static getLastSyncTime() {
        return StorageManager.load('eduquest_last_sync', 0);
    }

    /**
     * Update last sync time
     */
    static updateLastSyncTime() {
        const now = Date.now();
        StorageManager.save('eduquest_last_sync', now);
        this.lastSyncTime = now;
    }

    /**
     * Clear sync queue
     */
    static clearSyncQueue() {
        this.syncQueue = [];
        console.log('🗑️ Sync queue cleared');
    }

    /**
     * Force sync all data
     */
    static forceSyncAll(userId) {
        // Queue all user data for sync
        const user = StorageManager.load('eduquest_user');
        if (user) {
            this.queueSync('user_profile', user, 'high');
        }

        // Queue all progress data
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(`eduquest_progress_${userId}_`)) {
                const progressData = StorageManager.load(key);
                if (progressData) {
                    this.queueSync('user_progress', progressData, 'high');
                }
            }
        }

        // Queue recent sessions
        const sessions = TimeTracker.getStoredSessions(userId);
        sessions.slice(-10).forEach(session => {
            this.queueSync('time_session', session, 'normal');
        });

        console.log(`🔄 Queued all data for sync (${this.syncQueue.length} items)`);
    }
}