/**
 * User Model - Manages user data and authentication
 */
class User {
    constructor(username = 'Usuario') {
        this.id = this.generateUserId();
        this.username = username;
        this.totalPoints = 0;
        this.coursesCompleted = 0;
        this.currentStreak = 0;
        this.lastLoginDate = null;
        this.achievements = [];
        this.createdAt = new Date().toISOString();
        this.settings = {
            theme: 'light',
            notifications: true,
            soundEffects: true
        };
    }

    /**
     * Generate a unique user ID
     */
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Add points to user's total
     */
    addPoints(points) {
        if (points > 0) {
            this.totalPoints += points;
            this.save();
            return true;
        }
        return false;
    }

    /**
     * Award achievement to user
     */
    awardAchievement(achievementId) {
        if (!this.achievements.includes(achievementId)) {
            this.achievements.push(achievementId);
            
            // Show achievement notification
            if (window.notificationSystem && typeof AchievementSystem !== 'undefined') {
                const achievement = AchievementSystem.getAchievement(achievementId);
                if (achievement) {
                    window.notificationSystem.showAchievementNotification(achievement);
                }
            }
            
            this.save();
            return true;
        }
        return false;
    }

    /**
     * Update login streak
     */
    updateLoginStreak() {
        const today = new Date().toDateString();
        const lastLogin = this.lastLoginDate ? new Date(this.lastLoginDate).toDateString() : null;
        
        if (lastLogin === today) {
            // Already logged in today
            return this.currentStreak;
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        const previousStreak = this.currentStreak;
        
        if (lastLogin === yesterdayStr) {
            // Consecutive day
            this.currentStreak++;
        } else if (lastLogin !== today) {
            // Streak broken
            this.currentStreak = 1;
        }
        
        // Show streak notification for milestones
        if (window.notificationSystem && this.currentStreak > previousStreak) {
            if (this.currentStreak === 7 || this.currentStreak === 14 || 
                this.currentStreak === 30 || this.currentStreak % 10 === 0) {
                window.notificationSystem.showStreakNotification(this.currentStreak);
            }
        }
        
        this.lastLoginDate = new Date().toISOString();
        this.save();
        return this.currentStreak;
    }

    /**
     * Increment completed courses
     */
    completeCourse() {
        this.coursesCompleted++;
        this.save();
    }

    /**
     * Save user data to localStorage
     */
    save() {
        try {
            localStorage.setItem('eduquest_user', JSON.stringify(this));
            
            // Update leaderboard if available
            if (typeof LeaderboardSystem !== 'undefined') {
                LeaderboardSystem.updateUser(this);
            }
            
            return true;
        } catch (error) {
            console.error('Error saving user data:', error);
            return false;
        }
    }

    /**
     * Load user data from localStorage
     */
    static load() {
        try {
            const userData = localStorage.getItem('eduquest_user');
            if (userData) {
                const data = JSON.parse(userData);
                const user = new User(data.username);
                
                // Restore all properties
                Object.assign(user, data);
                
                // Update login streak
                user.updateLoginStreak();
                
                return user;
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
        
        // Return new user if no data found or error occurred
        return new User();
    }

    /**
     * Create user from authentication system data
     */
    static fromAuthUser(authUser) {
        const user = new User(authUser.username);
        
        // Map auth user data to User model
        user.id = authUser.id;
        user.email = authUser.email;
        user.fullName = authUser.fullName;
        user.createdAt = authUser.createdAt;
        user.lastLoginDate = authUser.lastLoginAt;
        user.isActive = authUser.isActive;
        user.role = authUser.role || 'student';
        
        // Initialize profile data
        if (authUser.profile) {
            user.avatar = authUser.profile.avatar;
            user.bio = authUser.profile.bio;
            if (authUser.profile.preferences) {
                user.settings = { ...user.settings, ...authUser.profile.preferences };
            }
        }
        
        // Initialize stats
        if (authUser.stats) {
            user.totalPoints = authUser.stats.totalPoints || 0;
            user.coursesCompleted = authUser.stats.coursesCompleted || 0;
            user.currentStreak = authUser.stats.currentStreak || 0;
            user.achievements = authUser.stats.achievements || [];
            user.totalTimeSpent = authUser.stats.totalTimeSpent || 0;
        }
        
        // Update login streak
        user.updateLoginStreak();
        
        console.log('👤 User created from auth data:', user.username);
        return user;
    }

    /**
     * Get user statistics
     */
    getStats() {
        return {
            totalPoints: this.totalPoints,
            coursesCompleted: this.coursesCompleted,
            currentStreak: this.currentStreak,
            achievementsCount: this.achievements.length,
            memberSince: new Date(this.createdAt).toLocaleDateString('es-ES')
        };
    }

    /**
     * Export user data
     */
    export() {
        return {
            username: this.username,
            totalPoints: this.totalPoints,
            coursesCompleted: this.coursesCompleted,
            currentStreak: this.currentStreak,
            achievements: [...this.achievements],
            createdAt: this.createdAt,
            settings: { ...this.settings }
        };
    }

    /**
     * Import user data
     */
    import(userData) {
        try {
            this.username = userData.username || this.username;
            this.totalPoints = userData.totalPoints || 0;
            this.coursesCompleted = userData.coursesCompleted || 0;
            this.currentStreak = userData.currentStreak || 0;
            this.achievements = userData.achievements || [];
            this.settings = { ...this.settings, ...userData.settings };
            
            this.save();
            return true;
        } catch (error) {
            console.error('Error importing user data:', error);
            return false;
        }
    }
}