/**
 * Storage Utility - Manages localStorage operations and data persistence
 */
class StorageManager {
    static KEYS = {
        USER: 'eduquest_user',
        COURSES: 'eduquest_courses',
        SETTINGS: 'eduquest_settings',
        LEADERBOARD: 'eduquest_leaderboard'
    };

    /**
     * Check if localStorage is available
     */
    static isAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            console.warn('localStorage is not available:', error);
            return false;
        }
    }

    /**
     * Get storage usage information
     */
    static getStorageInfo() {
        if (!this.isAvailable()) return null;

        let totalSize = 0;
        let itemCount = 0;
        const items = {};

        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('eduquest_')) {
                    const value = localStorage.getItem(key);
                    const size = new Blob([value]).size;
                    items[key] = size;
                    totalSize += size;
                    itemCount++;
                }
            }

            return {
                totalSize,
                itemCount,
                items,
                available: this.isAvailable(),
                quota: this.getStorageQuota()
            };
        } catch (error) {
            console.error('Error getting storage info:', error);
            return null;
        }
    }

    /**
     * Estimate storage quota
     */
    static getStorageQuota() {
        try {
            // Try to estimate quota by attempting to store data
            let quota = 0;
            const testKey = '__quota_test__';
            const chunk = '0'.repeat(1024); // 1KB chunks
            
            while (quota < 10240) { // Max 10MB test
                try {
                    localStorage.setItem(testKey, chunk.repeat(quota + 1));
                    quota++;
                } catch (error) {
                    break;
                }
            }
            
            localStorage.removeItem(testKey);
            return quota * 1024; // Return in bytes
        } catch (error) {
            return 5242880; // Default 5MB estimate
        }
    }

    /**
     * Save data with error handling
     */
    static save(key, data) {
        if (!this.isAvailable()) {
            console.warn('Storage not available, using memory fallback');
            return this.saveToMemory(key, data);
        }

        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(key, serialized);
            return true;
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                console.warn('Storage quota exceeded, attempting cleanup');
                this.cleanup();
                
                // Try again after cleanup
                try {
                    localStorage.setItem(key, JSON.stringify(data));
                    return true;
                } catch (retryError) {
                    console.error('Storage failed after cleanup:', retryError);
                    return this.saveToMemory(key, data);
                }
            } else {
                console.error('Storage error:', error);
                return false;
            }
        }
    }

    /**
     * Load data with error handling
     */
    static load(key, defaultValue = null) {
        if (!this.isAvailable()) {
            return this.loadFromMemory(key, defaultValue);
        }

        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Error loading data:', error);
            return this.loadFromMemory(key, defaultValue);
        }
    }

    /**
     * Remove data
     */
    static remove(key) {
        if (!this.isAvailable()) {
            return this.removeFromMemory(key);
        }

        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing data:', error);
            return false;
        }
    }

    /**
     * Clear all EduQuest data
     */
    static clear() {
        if (!this.isAvailable()) {
            this.memoryStorage = {};
            return true;
        }

        try {
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('eduquest_')) {
                    keysToRemove.push(key);
                }
            }

            keysToRemove.forEach(key => localStorage.removeItem(key));
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            return false;
        }
    }

    /**
     * Cleanup old or unnecessary data
     */
    static cleanup() {
        if (!this.isAvailable()) return;

        try {
            const now = Date.now();
            const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key && key.startsWith('eduquest_temp_')) {
                    const data = this.load(key);
                    if (data && data.timestamp && (now - data.timestamp) > maxAge) {
                        localStorage.removeItem(key);
                    }
                }
            }
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    }

    /**
     * Memory storage fallback
     */
    static memoryStorage = {};

    static saveToMemory(key, data) {
        try {
            this.memoryStorage[key] = JSON.parse(JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Memory storage error:', error);
            return false;
        }
    }

    static loadFromMemory(key, defaultValue = null) {
        try {
            return this.memoryStorage.hasOwnProperty(key) ? 
                   JSON.parse(JSON.stringify(this.memoryStorage[key])) : 
                   defaultValue;
        } catch (error) {
            console.error('Memory load error:', error);
            return defaultValue;
        }
    }

    static removeFromMemory(key) {
        try {
            delete this.memoryStorage[key];
            return true;
        } catch (error) {
            console.error('Memory remove error:', error);
            return false;
        }
    }

    /**
     * Export all EduQuest data
     */
    static exportData() {
        const data = {
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            user: this.load(this.KEYS.USER),
            courses: this.load(this.KEYS.COURSES),
            settings: this.load(this.KEYS.SETTINGS),
            progress: {}
        };

        // Export all progress data
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('eduquest_progress_')) {
                    data.progress[key] = this.load(key);
                }
            }
        } catch (error) {
            console.error('Error exporting progress data:', error);
        }

        return data;
    }

    /**
     * Import EduQuest data
     */
    static importData(data) {
        try {
            if (!data || !data.version) {
                throw new Error('Invalid data format');
            }

            // Import user data
            if (data.user) {
                this.save(this.KEYS.USER, data.user);
            }

            // Import courses
            if (data.courses) {
                this.save(this.KEYS.COURSES, data.courses);
            }

            // Import settings
            if (data.settings) {
                this.save(this.KEYS.SETTINGS, data.settings);
            }

            // Import progress data
            if (data.progress) {
                Object.entries(data.progress).forEach(([key, value]) => {
                    if (key.startsWith('eduquest_progress_')) {
                        this.save(key, value);
                    }
                });
            }

            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }

    /**
     * Backup data to file
     */
    static downloadBackup() {
        try {
            const data = this.exportData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { 
                type: 'application/json' 
            });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `eduquest-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            return true;
        } catch (error) {
            console.error('Error creating backup:', error);
            return false;
        }
    }
}