/**
 * Time Tracker - Precise time tracking for learning activities
 */
class TimeTracker {
    constructor() {
        this.sessions = new Map(); // Active sessions
        this.pausedSessions = new Map(); // Paused sessions
        this.totalTime = 0;
        this.isTracking = false;
    }

    /**
     * Start tracking time for an activity
     */
    startSession(sessionId, metadata = {}) {
        const session = {
            id: sessionId,
            startTime: Date.now(),
            pausedTime: 0,
            totalPausedDuration: 0,
            metadata: {
                userId: metadata.userId,
                courseId: metadata.courseId,
                activityType: metadata.activityType, // 'lesson' or 'game'
                activityId: metadata.activityId,
                ...metadata
            },
            events: [{
                type: 'start',
                timestamp: Date.now()
            }]
        };

        this.sessions.set(sessionId, session);
        this.isTracking = true;

        console.log(`⏱️ Started tracking session: ${sessionId}`);
        return session;
    }

    /**
     * Pause a tracking session
     */
    pauseSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session || session.pausedTime > 0) {
            return false; // Already paused or doesn't exist
        }

        session.pausedTime = Date.now();
        session.events.push({
            type: 'pause',
            timestamp: Date.now()
        });

        this.pausedSessions.set(sessionId, session);
        console.log(`⏸️ Paused session: ${sessionId}`);
        return true;
    }

    /**
     * Resume a paused session
     */
    resumeSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session || session.pausedTime === 0) {
            return false; // Not paused or doesn't exist
        }

        const pauseDuration = Date.now() - session.pausedTime;
        session.totalPausedDuration += pauseDuration;
        session.pausedTime = 0;
        session.events.push({
            type: 'resume',
            timestamp: Date.now(),
            pauseDuration
        });

        this.pausedSessions.delete(sessionId);
        console.log(`▶️ Resumed session: ${sessionId} (paused for ${Math.round(pauseDuration / 1000)}s)`);
        return true;
    }

    /**
     * End a tracking session
     */
    endSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            return null;
        }

        // If session was paused, account for final pause
        if (session.pausedTime > 0) {
            session.totalPausedDuration += Date.now() - session.pausedTime;
        }

        const endTime = Date.now();
        const totalDuration = endTime - session.startTime;
        const activeDuration = totalDuration - session.totalPausedDuration;

        session.endTime = endTime;
        session.totalDuration = totalDuration;
        session.activeDuration = activeDuration;
        session.events.push({
            type: 'end',
            timestamp: endTime
        });

        // Remove from active sessions
        this.sessions.delete(sessionId);
        this.pausedSessions.delete(sessionId);

        // Store completed session
        this.storeCompletedSession(session);

        console.log(`⏹️ Ended session: ${sessionId} (${Math.round(activeDuration / 1000 / 60)}min active)`);
        
        if (this.sessions.size === 0) {
            this.isTracking = false;
        }

        return {
            sessionId,
            totalDuration: Math.round(totalDuration / 1000 / 60), // minutes
            activeDuration: Math.round(activeDuration / 1000 / 60), // minutes
            pausedDuration: Math.round(session.totalPausedDuration / 1000 / 60), // minutes
            metadata: session.metadata,
            events: session.events
        };
    }

    /**
     * Get current session duration
     */
    getCurrentDuration(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            return 0;
        }

        const now = Date.now();
        const totalDuration = now - session.startTime;
        let pausedDuration = session.totalPausedDuration;

        // Add current pause if session is paused
        if (session.pausedTime > 0) {
            pausedDuration += now - session.pausedTime;
        }

        const activeDuration = totalDuration - pausedDuration;
        return Math.round(activeDuration / 1000 / 60); // minutes
    }

    /**
     * Get all active sessions
     */
    getActiveSessions() {
        const sessions = [];
        this.sessions.forEach((session, id) => {
            sessions.push({
                id,
                duration: this.getCurrentDuration(id),
                isPaused: session.pausedTime > 0,
                metadata: session.metadata
            });
        });
        return sessions;
    }

    /**
     * Store completed session
     */
    storeCompletedSession(session) {
        const userId = session.metadata.userId;
        if (!userId) return;

        const key = `eduquest_time_sessions_${userId}`;
        const sessions = StorageManager.load(key, []);
        
        // Store simplified session data
        sessions.push({
            id: session.id,
            startTime: session.startTime,
            endTime: session.endTime,
            totalDuration: session.totalDuration,
            activeDuration: session.activeDuration,
            pausedDuration: session.totalPausedDuration,
            metadata: session.metadata,
            date: new Date(session.startTime).toDateString()
        });

        // Keep only last 50 sessions per user
        if (sessions.length > 50) {
            sessions.splice(0, sessions.length - 50);
        }

        StorageManager.save(key, sessions);
    }

    /**
     * Get stored sessions for a user
     */
    static getStoredSessions(userId) {
        const key = `eduquest_time_sessions_${userId}`;
        return StorageManager.load(key, []);
    }

    /**
     * Analyze time patterns for a user
     */
    static analyzeTimePatterns(userId) {
        const sessions = this.getStoredSessions(userId);
        
        if (sessions.length === 0) {
            return null;
        }

        // Group by date
        const dailyStats = new Map();
        let totalActiveTime = 0;
        let totalSessions = sessions.length;

        sessions.forEach(session => {
            const date = session.date;
            if (!dailyStats.has(date)) {
                dailyStats.set(date, {
                    date,
                    sessions: 0,
                    totalTime: 0,
                    activeTime: 0,
                    activities: []
                });
            }

            const dayStats = dailyStats.get(date);
            dayStats.sessions++;
            dayStats.totalTime += session.totalDuration;
            dayStats.activeTime += session.activeDuration;
            dayStats.activities.push({
                type: session.metadata.activityType,
                duration: session.activeDuration
            });

            totalActiveTime += session.activeDuration;
        });

        // Calculate averages
        const averageSessionLength = totalActiveTime / totalSessions;
        const averageDailyTime = totalActiveTime / dailyStats.size;

        // Find most productive day
        let mostProductiveDay = null;
        let maxDailyTime = 0;
        dailyStats.forEach(dayStats => {
            if (dayStats.activeTime > maxDailyTime) {
                maxDailyTime = dayStats.activeTime;
                mostProductiveDay = dayStats;
            }
        });

        return {
            totalSessions,
            totalActiveTime: Math.round(totalActiveTime / 1000 / 60), // minutes
            averageSessionLength: Math.round(averageSessionLength / 1000 / 60), // minutes
            averageDailyTime: Math.round(averageDailyTime / 1000 / 60), // minutes
            activeDays: dailyStats.size,
            mostProductiveDay: mostProductiveDay ? {
                date: mostProductiveDay.date,
                activeTime: Math.round(mostProductiveDay.activeTime / 1000 / 60),
                sessions: mostProductiveDay.sessions
            } : null,
            dailyBreakdown: Array.from(dailyStats.values()).map(day => ({
                ...day,
                totalTime: Math.round(day.totalTime / 1000 / 60),
                activeTime: Math.round(day.activeTime / 1000 / 60)
            }))
        };
    }

    /**
     * Auto-pause detection based on inactivity
     */
    setupAutoPause(sessionId, inactivityThreshold = 5 * 60 * 1000) { // 5 minutes
        let lastActivity = Date.now();
        let autoPauseTimer = null;

        const resetTimer = () => {
            lastActivity = Date.now();
            if (autoPauseTimer) {
                clearTimeout(autoPauseTimer);
            }
            
            autoPauseTimer = setTimeout(() => {
                if (this.sessions.has(sessionId) && this.sessions.get(sessionId).pausedTime === 0) {
                    console.log(`🔄 Auto-pausing session ${sessionId} due to inactivity`);
                    this.pauseSession(sessionId);
                }
            }, inactivityThreshold);
        };

        // Listen for user activity
        const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        const activityHandler = () => resetTimer();

        activityEvents.forEach(event => {
            document.addEventListener(event, activityHandler, true);
        });

        // Start the timer
        resetTimer();

        // Return cleanup function
        return () => {
            if (autoPauseTimer) {
                clearTimeout(autoPauseTimer);
            }
            activityEvents.forEach(event => {
                document.removeEventListener(event, activityHandler, true);
            });
        };
    }

    /**
     * Get time tracking statistics
     */
    static getTimeStats(userId) {
        const sessions = this.getStoredSessions(userId);
        const patterns = this.analyzeTimePatterns(userId);
        
        if (!patterns) {
            return {
                hasData: false,
                message: 'No hay datos de tiempo disponibles'
            };
        }

        // Calculate efficiency metrics
        const recentSessions = sessions.slice(-10);
        const recentActiveTime = recentSessions.reduce((sum, session) => sum + session.activeDuration, 0);
        const recentTotalTime = recentSessions.reduce((sum, session) => sum + session.totalDuration, 0);
        const efficiency = recentTotalTime > 0 ? (recentActiveTime / recentTotalTime) * 100 : 0;

        return {
            hasData: true,
            totalTime: patterns.totalActiveTime,
            averageSession: patterns.averageSessionLength,
            totalSessions: patterns.totalSessions,
            activeDays: patterns.activeDays,
            efficiency: Math.round(efficiency),
            mostProductiveDay: patterns.mostProductiveDay,
            recentTrend: this.calculateTrend(sessions),
            weeklyGoal: this.calculateWeeklyGoal(patterns.averageDailyTime)
        };
    }

    /**
     * Calculate learning trend
     */
    static calculateTrend(sessions) {
        if (sessions.length < 7) {
            return { trend: 'insufficient_data', message: 'Necesitas más sesiones para calcular tendencias' };
        }

        const recent = sessions.slice(-7);
        const previous = sessions.slice(-14, -7);

        const recentAvg = recent.reduce((sum, s) => sum + s.activeDuration, 0) / recent.length;
        const previousAvg = previous.length > 0 ? 
            previous.reduce((sum, s) => sum + s.activeDuration, 0) / previous.length : 
            recentAvg;

        const change = ((recentAvg - previousAvg) / previousAvg) * 100;

        if (change > 10) {
            return { trend: 'improving', change: Math.round(change), message: 'Tu tiempo de estudio está mejorando' };
        } else if (change < -10) {
            return { trend: 'declining', change: Math.round(Math.abs(change)), message: 'Tu tiempo de estudio ha disminuido' };
        } else {
            return { trend: 'stable', change: Math.round(Math.abs(change)), message: 'Tu tiempo de estudio se mantiene estable' };
        }
    }

    /**
     * Calculate weekly goal progress
     */
    static calculateWeeklyGoal(averageDailyTime) {
        const targetWeeklyMinutes = 7 * 20; // 20 minutes per day goal
        const currentWeeklyMinutes = averageDailyTime * 7;
        const progress = Math.min(100, (currentWeeklyMinutes / targetWeeklyMinutes) * 100);

        return {
            target: targetWeeklyMinutes,
            current: Math.round(currentWeeklyMinutes),
            progress: Math.round(progress),
            remaining: Math.max(0, targetWeeklyMinutes - currentWeeklyMinutes)
        };
    }
}

// Global time tracker instance
window.timeTracker = new TimeTracker();