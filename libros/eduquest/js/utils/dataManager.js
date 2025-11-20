/**
 * Data Manager - Handles user data persistence and synchronization
 */
class DataManager {
    constructor() {
        this.storagePrefix = 'eduquest_';
        this.syncEnabled = false;
        this.syncEndpoint = null;
        this.lastSyncTime = null;
        this.pendingChanges = new Map();
        
        this.init();
    }

    /**
     * Initialize data manager
     */
    init() {
        console.log('💾 Initializing Data Manager...');
        
        // Load sync settings
        this.loadSyncSettings();
        
        // Setup auto-save
        this.setupAutoSave();
        
        // Setup sync monitoring
        this.setupSyncMonitoring();
        
        console.log('✅ Data Manager initialized');
    }

    /**
     * Save user progress data
     */
    async saveUserProgress(userId, courseId, progressData) {
        try {
            const key = `${this.storagePrefix}progress_${userId}_${courseId}`;
            const existingData = this.getStoredData(key) || {};
            
            // Merge with existing data
            const updatedData = {
                ...existingData,
                ...progressData,
                lastUpdated: new Date().toISOString(),
                userId,
                courseId
            };
            
            // Save to local storage
            this.setStoredData(key, updatedData);
            
            // Track pending changes for sync
            this.trackPendingChange('progress', key, updatedData);
            
            console.log(`✅ Progress saved for user ${userId}, course ${courseId}`);
            return { success: true, data: updatedData };
            
        } catch (error) {
            console.error('❌ Error saving progress:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Load user progress data
     */
    async loadUserProgress(userId, courseId = null) {
        try {
            if (courseId) {
                // Load specific course progress
                const key = `${this.storagePrefix}progress_${userId}_${courseId}`;
                const data = this.getStoredData(key);
                return { success: true, data };
            } else {
                // Load all progress for user
                const allProgress = {};
                const keys = Object.keys(localStorage);
                
                keys.forEach(key => {
                    if (key.startsWith(`${this.storagePrefix}progress_${userId}_`)) {
                        const courseId = key.split('_').pop();
                        allProgress[courseId] = this.getStoredData(key);
                    }
                });
                
                return { success: true, data: allProgress };
            }
        } catch (error) {
            console.error('❌ Error loading progress:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Save user achievements
     */
    async saveUserAchievements(userId, achievements) {
        try {
            const key = `${this.storagePrefix}achievements_${userId}`;
            const data = {
                achievements,
                lastUpdated: new Date().toISOString(),
                userId
            };
            
            this.setStoredData(key, data);
            this.trackPendingChange('achievements', key, data);
            
            console.log(`✅ Achievements saved for user ${userId}`);
            return { success: true, data };
            
        } catch (error) {
            console.error('❌ Error saving achievements:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Load user achievements
     */
    async loadUserAchievements(userId) {
        try {
            const key = `${this.storagePrefix}achievements_${userId}`;
            const data = this.getStoredData(key);
            return { success: true, data: data?.achievements || [] };
        } catch (error) {
            console.error('❌ Error loading achievements:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Save user statistics
     */
    async saveUserStats(userId, stats) {
        try {
            const key = `${this.storagePrefix}stats_${userId}`;
            const existingStats = this.getStoredData(key) || {};
            
            const updatedStats = {
                ...existingStats,
                ...stats,
                lastUpdated: new Date().toISOString(),
                userId
            };
            
            this.setStoredData(key, updatedStats);
            this.trackPendingChange('stats', key, updatedStats);
            
            console.log(`✅ Stats saved for user ${userId}`);
            return { success: true, data: updatedStats };
            
        } catch (error) {
            console.error('❌ Error saving stats:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Load user statistics
     */
    async loadUserStats(userId) {
        try {
            const key = `${this.storagePrefix}stats_${userId}`;
            const data = this.getStoredData(key);
            return { success: true, data: data || {} };
        } catch (error) {
            console.error('❌ Error loading stats:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Save user preferences
     */
    async saveUserPreferences(userId, preferences) {
        try {
            const key = `${this.storagePrefix}preferences_${userId}`;
            const data = {
                preferences,
                lastUpdated: new Date().toISOString(),
                userId
            };
            
            this.setStoredData(key, data);
            this.trackPendingChange('preferences', key, data);
            
            console.log(`✅ Preferences saved for user ${userId}`);
            return { success: true, data };
            
        } catch (error) {
            console.error('❌ Error saving preferences:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Load user preferences
     */
    async loadUserPreferences(userId) {
        try {
            const key = `${this.storagePrefix}preferences_${userId}`;
            const data = this.getStoredData(key);
            return { success: true, data: data?.preferences || {} };
        } catch (error) {
            console.error('❌ Error loading preferences:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Export all user data
     */
    async exportUserData(userId) {
        try {
            const userData = {
                userId,
                exportedAt: new Date().toISOString(),
                progress: {},
                achievements: [],
                stats: {},
                preferences: {}
            };

            // Load progress data
            const progressResult = await this.loadUserProgress(userId);
            if (progressResult.success) {
                userData.progress = progressResult.data;
            }

            // Load achievements
            const achievementsResult = await this.loadUserAchievements(userId);
            if (achievementsResult.success) {
                userData.achievements = achievementsResult.data;
            }

            // Load stats
            const statsResult = await this.loadUserStats(userId);
            if (statsResult.success) {
                userData.stats = statsResult.data;
            }

            // Load preferences
            const preferencesResult = await this.loadUserPreferences(userId);
            if (preferencesResult.success) {
                userData.preferences = preferencesResult.data;
            }

            return { success: true, data: userData };
            
        } catch (error) {
            console.error('❌ Error exporting user data:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Import user data
     */
    async importUserData(userId, userData) {
        try {
            // Validate data structure
            if (!userData || typeof userData !== 'object') {
                throw new Error('Invalid user data format');
            }

            // Import progress
            if (userData.progress) {
                for (const [courseId, progressData] of Object.entries(userData.progress)) {
                    await this.saveUserProgress(userId, courseId, progressData);
                }
            }

            // Import achievements
            if (userData.achievements) {
                await this.saveUserAchievements(userId, userData.achievements);
            }

            // Import stats
            if (userData.stats) {
                await this.saveUserStats(userId, userData.stats);
            }

            // Import preferences
            if (userData.preferences) {
                await this.saveUserPreferences(userId, userData.preferences);
            }

            console.log(`✅ User data imported for user ${userId}`);
            return { success: true };
            
        } catch (error) {
            console.error('❌ Error importing user data:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Clear all user data
     */
    async clearUserData(userId) {
        try {
            const keys = Object.keys(localStorage);
            let clearedCount = 0;

            keys.forEach(key => {
                if (key.includes(`_${userId}_`) || key.includes(`_${userId}`)) {
                    localStorage.removeItem(key);
                    clearedCount++;
                }
            });

            // Clear pending changes
            this.pendingChanges.clear();

            console.log(`✅ Cleared ${clearedCount} data entries for user ${userId}`);
            return { success: true, clearedCount };
            
        } catch (error) {
            console.error('❌ Error clearing user data:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get storage usage statistics
     */
    getStorageStats() {
        try {
            const stats = {
                totalKeys: 0,
                edquestKeys: 0,
                totalSize: 0,
                edquestSize: 0,
                availableSpace: 0
            };

            // Calculate storage usage
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    stats.totalKeys++;
                    const size = (localStorage[key].length + key.length) * 2; // Rough estimate in bytes
                    stats.totalSize += size;

                    if (key.startsWith(this.storagePrefix)) {
                        stats.edquestKeys++;
                        stats.edquestSize += size;
                    }
                }
            }

            // Estimate available space (5MB typical limit)
            const estimatedLimit = 5 * 1024 * 1024; // 5MB in bytes
            stats.availableSpace = Math.max(0, estimatedLimit - stats.totalSize);

            return stats;
            
        } catch (error) {
            console.error('❌ Error getting storage stats:', error);
            return null;
        }
    }

    /**
     * Cleanup old data
     */
    async cleanupOldData(maxAge = 30) {
        try {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - maxAge);
            
            const keys = Object.keys(localStorage);
            let cleanedCount = 0;

            keys.forEach(key => {
                if (key.startsWith(this.storagePrefix)) {
                    try {
                        const data = JSON.parse(localStorage.getItem(key));
                        if (data && data.lastUpdated) {
                            const lastUpdated = new Date(data.lastUpdated);
                            if (lastUpdated < cutoffDate) {
                                localStorage.removeItem(key);
                                cleanedCount++;
                            }
                        }
                    } catch (error) {
                        // Invalid JSON, remove it
                        localStorage.removeItem(key);
                        cleanedCount++;
                    }
                }
            });

            console.log(`✅ Cleaned up ${cleanedCount} old data entries`);
            return { success: true, cleanedCount };
            
        } catch (error) {
            console.error('❌ Error cleaning up old data:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Backup data to file
     */
    async backupToFile(userId) {
        try {
            const exportResult = await this.exportUserData(userId);
            if (!exportResult.success) {
                throw new Error('Failed to export user data');
            }

            const backupData = {
                version: '1.0',
                timestamp: new Date().toISOString(),
                userData: exportResult.data
            };

            const dataStr = JSON.stringify(backupData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `eduquest-backup-${userId}-${Date.now()}.json`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            URL.revokeObjectURL(url);

            console.log(`✅ Backup created for user ${userId}`);
            return { success: true };
            
        } catch (error) {
            console.error('❌ Error creating backup:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Restore data from file
     */
    async restoreFromFile(file, userId) {
        try {
            const text = await file.text();
            const backupData = JSON.parse(text);

            // Validate backup format
            if (!backupData.version || !backupData.userData) {
                throw new Error('Invalid backup file format');
            }

            // Import the data
            const importResult = await this.importUserData(userId, backupData.userData);
            if (!importResult.success) {
                throw new Error('Failed to import backup data');
            }

            console.log(`✅ Data restored from backup for user ${userId}`);
            return { success: true };
            
        } catch (error) {
            console.error('❌ Error restoring from backup:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Helper methods
     */
    getStoredData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`❌ Error parsing stored data for key ${key}:`, error);
            return null;
        }
    }

    setStoredData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`❌ Error storing data for key ${key}:`, error);
            throw error;
        }
    }

    trackPendingChange(type, key, data) {
        if (this.syncEnabled) {
            this.pendingChanges.set(key, {
                type,
                key,
                data,
                timestamp: Date.now()
            });
        }
    }

    loadSyncSettings() {
        try {
            const settings = this.getStoredData(`${this.storagePrefix}sync_settings`);
            if (settings) {
                this.syncEnabled = settings.enabled || false;
                this.syncEndpoint = settings.endpoint || null;
                this.lastSyncTime = settings.lastSyncTime || null;
            }
        } catch (error) {
            console.error('❌ Error loading sync settings:', error);
        }
    }

    setupAutoSave() {
        // Auto-save every 30 seconds if there are pending changes
        setInterval(() => {
            if (this.pendingChanges.size > 0) {
                console.log(`💾 Auto-saving ${this.pendingChanges.size} pending changes...`);
                // In a real app, this would trigger sync to server
            }
        }, 30000);
    }

    setupSyncMonitoring() {
        // Monitor online/offline status
        window.addEventListener('online', () => {
            console.log('🌐 Connection restored, checking for pending sync...');
            if (this.syncEnabled && this.pendingChanges.size > 0) {
                // Trigger sync when back online
                this.syncPendingChanges();
            }
        });

        window.addEventListener('offline', () => {
            console.log('📴 Connection lost, data will be synced when online');
        });
    }

    async syncPendingChanges() {
        if (!this.syncEnabled || !navigator.onLine) {
            return;
        }

        try {
            console.log(`🔄 Syncing ${this.pendingChanges.size} pending changes...`);
            
            // In a real app, this would send data to server
            // For now, we'll just clear the pending changes
            this.pendingChanges.clear();
            this.lastSyncTime = Date.now();
            
            // Save sync time
            this.setStoredData(`${this.storagePrefix}sync_settings`, {
                enabled: this.syncEnabled,
                endpoint: this.syncEndpoint,
                lastSyncTime: this.lastSyncTime
            });
            
            console.log('✅ Sync completed successfully');
            
        } catch (error) {
            console.error('❌ Sync failed:', error);
        }
    }
}

// Global data manager instance
window.dataManager = new DataManager();