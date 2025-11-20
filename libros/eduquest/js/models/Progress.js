/**
 * Progress Model - Tracks user progress through courses
 */
class Progress {
    constructor(userId, courseId) {
        this.userId = userId;
        this.courseId = courseId;
        this.lessonsCompleted = new Set();
        this.gamesCompleted = new Set();
        this.pointsEarned = 0;
        this.completionPercentage = 0;
        this.startedAt = new Date().toISOString();
        this.lastAccessedAt = null;
        this.completedAt = null;
        this.timeSpent = 0; // in minutes
    }

    /**
     * Mark a lesson as completed
     */
    markLessonComplete(lessonId, user = null) {
        if (!this.lessonsCompleted.has(lessonId)) {
            this.lessonsCompleted.add(lessonId);
            const basePoints = 10;
            this.pointsEarned += basePoints;
            this.lastAccessedAt = new Date().toISOString();
            this.updateCompletionPercentage();
            
            // Calculate and apply bonus points
            if (user && typeof BonusPointSystem !== 'undefined') {
                const bonusResult = BonusPointSystem.applyActivityBonus(user, 'lesson');
                
                // Show base points notification
                if (window.notificationSystem) {
                    window.notificationSystem.showPointNotification(basePoints, 'Lección completada');
                }
            } else {
                // Fallback notification
                if (window.notificationSystem) {
                    window.notificationSystem.showPointNotification(basePoints, 'Lección completada');
                }
            }
            
            this.save();
            
            // Track completion analytics
            this.trackCompletion('lesson', lessonId);
            
            // Queue for sync
            if (typeof DataSync !== 'undefined') {
                DataSync.queueSync('user_progress', this.export(), 'high');
            }
            
            return true;
        }
        return false;
    }

    /**
     * Mark a game as completed
     */
    markGameComplete(gameId, user = null) {
        if (!this.gamesCompleted.has(gameId)) {
            this.gamesCompleted.add(gameId);
            const basePoints = 15;
            this.pointsEarned += basePoints;
            this.lastAccessedAt = new Date().toISOString();
            this.updateCompletionPercentage();
            
            // Calculate and apply bonus points
            if (user && typeof BonusPointSystem !== 'undefined') {
                const bonusResult = BonusPointSystem.applyActivityBonus(user, 'game');
                
                // Show base points notification
                if (window.notificationSystem) {
                    window.notificationSystem.showPointNotification(basePoints, 'Juego completado');
                }
            } else {
                // Fallback notification
                if (window.notificationSystem) {
                    window.notificationSystem.showPointNotification(basePoints, 'Juego completado');
                }
            }
            
            this.save();
            
            // Track completion analytics
            this.trackCompletion('game', gameId);
            
            // Queue for sync
            if (typeof DataSync !== 'undefined') {
                DataSync.queueSync('user_progress', this.export(), 'high');
            }
            
            return true;
        }
        return false;
    }

    /**
     * Update completion percentage
     */
    updateCompletionPercentage(course = null) {
        if (course) {
            const totalActivities = course.lessons.length + course.games.length;
            if (totalActivities > 0) {
                const completedActivities = this.lessonsCompleted.size + this.gamesCompleted.size;
                this.completionPercentage = Math.round((completedActivities / totalActivities) * 100);
                
                // Check if course is completed
                if (this.completionPercentage === 100 && !this.completedAt) {
                    this.completedAt = new Date().toISOString();
                    const baseCompletionBonus = 50;
                    this.pointsEarned += baseCompletionBonus;
                    
                    // Show course completion notification
                    if (window.notificationSystem && course) {
                        window.notificationSystem.showCourseCompletionNotification(
                            course.title, 
                            baseCompletionBonus
                        );
                    }
                    
                    // Generate certificate if available
                    if (typeof CertificateGenerator !== 'undefined' && course && window.app) {
                        CertificateGenerator.checkAndGenerateCertificate(window.app.user, course, this);
                    }
                }
            }
        }
    }

    /**
     * Add time spent on course
     */
    addTimeSpent(minutes) {
        this.timeSpent += minutes;
        this.lastAccessedAt = new Date().toISOString();
        this.save();
        
        // Queue for sync
        if (typeof DataSync !== 'undefined') {
            DataSync.queueSync('user_progress', this.export(), 'normal');
        }
    }

    /**
     * Start time tracking session
     */
    startTimeTracking(activityType, activityId) {
        if (typeof timeTracker !== 'undefined') {
            const sessionId = `${this.courseId}_${activityType}_${activityId}_${Date.now()}`;
            return timeTracker.startSession(sessionId, {
                userId: this.userId,
                courseId: this.courseId,
                activityType,
                activityId
            });
        }
        return null;
    }

    /**
     * End time tracking session
     */
    endTimeTracking(sessionId) {
        if (typeof timeTracker !== 'undefined' && sessionId) {
            const result = timeTracker.endSession(sessionId);
            if (result) {
                this.addTimeSpent(result.activeDuration);
                return result;
            }
        }
        return null;
    }

    /**
     * Check if lesson is completed
     */
    isLessonCompleted(lessonId) {
        return this.lessonsCompleted.has(lessonId);
    }

    /**
     * Check if game is completed
     */
    isGameCompleted(gameId) {
        return this.gamesCompleted.has(gameId);
    }

    /**
     * Get progress statistics
     */
    getStats() {
        return {
            lessonsCompleted: this.lessonsCompleted.size,
            gamesCompleted: this.gamesCompleted.size,
            totalCompleted: this.lessonsCompleted.size + this.gamesCompleted.size,
            pointsEarned: this.pointsEarned,
            completionPercentage: this.completionPercentage,
            timeSpent: this.timeSpent,
            isCompleted: this.completedAt !== null,
            startedAt: this.startedAt,
            lastAccessedAt: this.lastAccessedAt,
            completedAt: this.completedAt
        };
    }

    /**
     * Save progress to localStorage
     */
    save() {
        try {
            const key = `eduquest_progress_${this.userId}_${this.courseId}`;
            const data = {
                userId: this.userId,
                courseId: this.courseId,
                lessonsCompleted: Array.from(this.lessonsCompleted),
                gamesCompleted: Array.from(this.gamesCompleted),
                pointsEarned: this.pointsEarned,
                completionPercentage: this.completionPercentage,
                startedAt: this.startedAt,
                lastAccessedAt: this.lastAccessedAt,
                completedAt: this.completedAt,
                timeSpent: this.timeSpent
            };
            
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving progress:', error);
            return false;
        }
    }

    /**
     * Load progress from localStorage
     */
    static load(userId, courseId) {
        try {
            const key = `eduquest_progress_${userId}_${courseId}`;
            const data = localStorage.getItem(key);
            
            if (data) {
                const progressData = JSON.parse(data);
                const progress = new Progress(userId, courseId);
                
                // Restore data
                progress.lessonsCompleted = new Set(progressData.lessonsCompleted || []);
                progress.gamesCompleted = new Set(progressData.gamesCompleted || []);
                progress.pointsEarned = progressData.pointsEarned || 0;
                progress.completionPercentage = progressData.completionPercentage || 0;
                progress.startedAt = progressData.startedAt || progress.startedAt;
                progress.lastAccessedAt = progressData.lastAccessedAt;
                progress.completedAt = progressData.completedAt;
                progress.timeSpent = progressData.timeSpent || 0;
                
                return progress;
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
        
        return new Progress(userId, courseId);
    }

    /**
     * Get all progress for a user
     */
    static loadAllForUser(userId) {
        const progressMap = new Map();
        
        try {
            // Scan localStorage for progress keys
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(`eduquest_progress_${userId}_`)) {
                    const courseId = key.replace(`eduquest_progress_${userId}_`, '');
                    const progress = Progress.load(userId, courseId);
                    if (progress) {
                        progressMap.set(courseId, progress);
                    }
                }
            }
        } catch (error) {
            console.error('Error loading all progress:', error);
        }
        
        return progressMap;
    }

    /**
     * Delete progress
     */
    delete() {
        try {
            const key = `eduquest_progress_${this.userId}_${this.courseId}`;
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error deleting progress:', error);
            return false;
        }
    }

    /**
     * Export progress data
     */
    export() {
        return {
            courseId: this.courseId,
            lessonsCompleted: Array.from(this.lessonsCompleted),
            gamesCompleted: Array.from(this.gamesCompleted),
            pointsEarned: this.pointsEarned,
            completionPercentage: this.completionPercentage,
            startedAt: this.startedAt,
            lastAccessedAt: this.lastAccessedAt,
            completedAt: this.completedAt,
            timeSpent: this.timeSpent
        };
    }

    /**
     * Track completion event
     */
    trackCompletion(activityType, activityId) {
        // Store completion analytics
        const completionData = {
            userId: this.userId,
            courseId: this.courseId,
            activityType,
            activityId,
            timestamp: new Date().toISOString(),
            pointsEarned: activityType === 'lesson' ? 10 : 15,
            totalProgressAfter: this.completionPercentage
        };

        // Store in analytics
        if (typeof ProgressAnalytics !== 'undefined') {
            ProgressAnalytics.trackSession(
                this.userId,
                this.courseId,
                activityType,
                activityId,
                5 // Default duration if not tracked
            );
        }

        console.log(`📊 Tracked completion: ${activityType} ${activityId}`);
    }

    /**
     * Get detailed progress statistics
     */
    getDetailedStats() {
        const basicStats = this.getStats();
        
        // Calculate additional metrics
        const daysSinceStart = this.startedAt ? 
            Math.ceil((Date.now() - new Date(this.startedAt).getTime()) / (1000 * 60 * 60 * 24)) : 0;
        
        const averagePointsPerDay = daysSinceStart > 0 ? this.pointsEarned / daysSinceStart : 0;
        const averageTimePerActivity = (basicStats.totalCompleted > 0) ? 
            this.timeSpent / basicStats.totalCompleted : 0;

        return {
            ...basicStats,
            daysSinceStart,
            averagePointsPerDay: Math.round(averagePointsPerDay * 100) / 100,
            averageTimePerActivity: Math.round(averageTimePerActivity * 100) / 100,
            learningEfficiency: this.calculateLearningEfficiency()
        };
    }

    /**
     * Calculate learning efficiency
     */
    calculateLearningEfficiency() {
        if (this.timeSpent === 0) return null;
        
        const pointsPerMinute = this.pointsEarned / this.timeSpent;
        const completionRate = this.completionPercentage / 100;
        
        // Efficiency score (0-100)
        const efficiencyScore = Math.min(100, (pointsPerMinute * 100) + (completionRate * 50));
        
        let rating = 'low';
        if (efficiencyScore >= 80) rating = 'excellent';
        else if (efficiencyScore >= 60) rating = 'good';
        else if (efficiencyScore >= 40) rating = 'average';
        
        return {
            score: Math.round(efficiencyScore),
            rating,
            pointsPerMinute: Math.round(pointsPerMinute * 100) / 100
        };
    }

    /**
     * Import progress data
     */
    import(progressData) {
        try {
            this.lessonsCompleted = new Set(progressData.lessonsCompleted || []);
            this.gamesCompleted = new Set(progressData.gamesCompleted || []);
            this.pointsEarned = progressData.pointsEarned || 0;
            this.completionPercentage = progressData.completionPercentage || 0;
            this.startedAt = progressData.startedAt || this.startedAt;
            this.lastAccessedAt = progressData.lastAccessedAt;
            this.completedAt = progressData.completedAt;
            this.timeSpent = progressData.timeSpent || 0;
            
            this.save();
            return true;
        } catch (error) {
            console.error('Error importing progress:', error);
            return false;
        }
    }
}