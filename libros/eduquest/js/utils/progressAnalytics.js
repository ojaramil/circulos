/**
 * Progress Analytics - Advanced progress tracking and analysis
 */
class ProgressAnalytics {
    /**
     * Calculate learning velocity (activities per day)
     */
    static calculateLearningVelocity(progressMap) {
        const now = Date.now();
        const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
        
        let recentCompletions = 0;
        let totalActivities = 0;
        
        progressMap.forEach(progress => {
            totalActivities += progress.lessonsCompleted.size + progress.gamesCompleted.size;
            
            // Count recent completions (simplified - in real app would track individual completion dates)
            if (progress.lastAccessedAt) {
                const lastAccess = new Date(progress.lastAccessedAt).getTime();
                if (lastAccess >= oneWeekAgo) {
                    recentCompletions += progress.lessonsCompleted.size + progress.gamesCompleted.size;
                }
            }
        });
        
        return {
            weeklyVelocity: recentCompletions / 7,
            totalActivities,
            recentCompletions,
            projectedMonthly: (recentCompletions / 7) * 30
        };
    }

    /**
     * Analyze learning patterns
     */
    static analyzeLearningPatterns(progressMap) {
        const patterns = {
            preferredContentType: 'balanced',
            completionRate: 0,
            averageSessionTime: 0,
            strongCategories: [],
            improvementAreas: []
        };

        let totalLessons = 0;
        let totalGames = 0;
        let totalTimeSpent = 0;
        let totalSessions = 0;
        const categoryStats = new Map();

        progressMap.forEach((progress, courseId) => {
            totalLessons += progress.lessonsCompleted.size;
            totalGames += progress.gamesCompleted.size;
            totalTimeSpent += progress.timeSpent;
            
            if (progress.lastAccessedAt) {
                totalSessions++;
            }

            // Analyze by category (would need course data for this)
            // For now, simplified analysis
        });

        // Determine content preference
        if (totalLessons > totalGames * 1.5) {
            patterns.preferredContentType = 'lessons';
        } else if (totalGames > totalLessons * 1.5) {
            patterns.preferredContentType = 'games';
        }

        patterns.completionRate = this.calculateOverallCompletionRate(progressMap);
        patterns.averageSessionTime = totalSessions > 0 ? totalTimeSpent / totalSessions : 0;

        return patterns;
    }

    /**
     * Calculate overall completion rate
     */
    static calculateOverallCompletionRate(progressMap) {
        let totalCompleted = 0;
        let totalAvailable = 0;

        progressMap.forEach(progress => {
            totalCompleted += progress.lessonsCompleted.size + progress.gamesCompleted.size;
            // Estimate total available (would be more accurate with course data)
            totalAvailable += 10; // Average activities per course
        });

        return totalAvailable > 0 ? (totalCompleted / totalAvailable) * 100 : 0;
    }

    /**
     * Generate learning insights
     */
    static generateInsights(user, progressMap, courses) {
        const insights = [];
        const velocity = this.calculateLearningVelocity(progressMap);
        const patterns = this.analyzeLearningPatterns(progressMap);

        // Velocity insights
        if (velocity.weeklyVelocity > 1) {
            insights.push({
                type: 'positive',
                title: '🚀 Gran Ritmo de Aprendizaje',
                message: `Estás completando ${velocity.weeklyVelocity.toFixed(1)} actividades por día. ¡Excelente progreso!`,
                action: 'Mantén este ritmo para alcanzar tus objetivos rápidamente.'
            });
        } else if (velocity.weeklyVelocity < 0.3) {
            insights.push({
                type: 'suggestion',
                title: '📈 Oportunidad de Mejora',
                message: 'Tu ritmo de aprendizaje ha sido lento esta semana.',
                action: 'Intenta dedicar 15-20 minutos diarios para mantener el momentum.'
            });
        }

        // Streak insights
        if (user.currentStreak >= 7) {
            insights.push({
                type: 'achievement',
                title: '🔥 Racha Impresionante',
                message: `¡${user.currentStreak} días consecutivos de aprendizaje!`,
                action: 'Sigue así para desbloquear más logros.'
            });
        } else if (user.currentStreak === 0) {
            insights.push({
                type: 'motivation',
                title: '💪 Momento de Retomar',
                message: 'Es un buen momento para comenzar una nueva racha de aprendizaje.',
                action: 'Completa una actividad hoy para empezar tu racha.'
            });
        }

        // Content preference insights
        if (patterns.preferredContentType === 'lessons') {
            insights.push({
                type: 'info',
                title: '📚 Perfil de Aprendizaje',
                message: 'Prefieres el contenido teórico y las lecciones.',
                action: 'Considera probar más juegos para una experiencia más variada.'
            });
        } else if (patterns.preferredContentType === 'games') {
            insights.push({
                type: 'info',
                title: '🎮 Perfil de Aprendizaje',
                message: 'Te gustan las actividades interactivas y los juegos.',
                action: 'Equilibra con algunas lecciones para profundizar conceptos.'
            });
        }

        // Points insights
        if (user.totalPoints >= 1000) {
            insights.push({
                type: 'celebration',
                title: '🏆 Maestro de Puntos',
                message: `¡Has acumulado ${user.totalPoints} puntos!`,
                action: 'Estás en el camino hacia la maestría completa.'
            });
        }

        return insights.slice(0, 4); // Limit to 4 insights
    }

    /**
     * Calculate learning efficiency
     */
    static calculateLearningEfficiency(progress, course) {
        if (!progress.timeSpent || progress.timeSpent === 0) {
            return null;
        }

        const totalActivities = progress.lessonsCompleted.size + progress.gamesCompleted.size;
        const averageTimePerActivity = progress.timeSpent / totalActivities;
        const pointsPerMinute = progress.pointsEarned / progress.timeSpent;

        return {
            averageTimePerActivity,
            pointsPerMinute,
            efficiency: pointsPerMinute > 0.5 ? 'high' : pointsPerMinute > 0.2 ? 'medium' : 'low'
        };
    }

    /**
     * Predict completion time for a course
     */
    static predictCompletionTime(progress, course, userVelocity) {
        const remainingActivities = (course.lessons.length + course.games.length) - 
                                   (progress.lessonsCompleted.size + progress.gamesCompleted.size);
        
        if (remainingActivities <= 0) {
            return { completed: true, daysRemaining: 0 };
        }

        const dailyVelocity = userVelocity.weeklyVelocity;
        const daysRemaining = dailyVelocity > 0 ? Math.ceil(remainingActivities / dailyVelocity) : null;

        return {
            completed: false,
            remainingActivities,
            daysRemaining,
            estimatedCompletionDate: daysRemaining ? 
                new Date(Date.now() + (daysRemaining * 24 * 60 * 60 * 1000)).toLocaleDateString('es-ES') : 
                null
        };
    }

    /**
     * Generate progress report
     */
    static generateProgressReport(user, progressMap, courses) {
        const velocity = this.calculateLearningVelocity(progressMap);
        const patterns = this.analyzeLearningPatterns(progressMap);
        const insights = this.generateInsights(user, progressMap, courses);

        // Course-specific analysis
        const courseAnalysis = [];
        progressMap.forEach((progress, courseId) => {
            const course = courses.get(courseId);
            if (course) {
                const efficiency = this.calculateLearningEfficiency(progress, course);
                const prediction = this.predictCompletionTime(progress, course, velocity);
                
                courseAnalysis.push({
                    courseId,
                    title: course.title,
                    completionPercentage: course.getCompletionPercentage(progress),
                    efficiency,
                    prediction,
                    pointsEarned: progress.pointsEarned,
                    timeSpent: progress.timeSpent
                });
            }
        });

        return {
            user: {
                totalPoints: user.totalPoints,
                coursesCompleted: user.coursesCompleted,
                currentStreak: user.currentStreak,
                achievements: user.achievements.length
            },
            velocity,
            patterns,
            insights,
            courseAnalysis: courseAnalysis.sort((a, b) => b.completionPercentage - a.completionPercentage),
            generatedAt: new Date().toISOString()
        };
    }

    /**
     * Track learning session
     */
    static trackSession(userId, courseId, activityType, activityId, duration) {
        const sessionData = {
            userId,
            courseId,
            activityType, // 'lesson' or 'game'
            activityId,
            duration, // in minutes
            timestamp: new Date().toISOString(),
            pointsEarned: activityType === 'lesson' ? 10 : 15
        };

        // Store session data
        const sessions = this.getStoredSessions(userId);
        sessions.push(sessionData);
        
        // Keep only last 100 sessions to avoid storage bloat
        if (sessions.length > 100) {
            sessions.splice(0, sessions.length - 100);
        }

        StorageManager.save(`eduquest_sessions_${userId}`, sessions);
        
        return sessionData;
    }

    /**
     * Get stored sessions for a user
     */
    static getStoredSessions(userId) {
        return StorageManager.load(`eduquest_sessions_${userId}`, []);
    }

    /**
     * Analyze session patterns
     */
    static analyzeSessionPatterns(userId) {
        const sessions = this.getStoredSessions(userId);
        
        if (sessions.length === 0) {
            return null;
        }

        // Analyze by time of day
        const hourlyActivity = new Array(24).fill(0);
        const dailyActivity = new Array(7).fill(0);
        let totalDuration = 0;
        let averageSessionLength = 0;

        sessions.forEach(session => {
            const date = new Date(session.timestamp);
            hourlyActivity[date.getHours()]++;
            dailyActivity[date.getDay()]++;
            totalDuration += session.duration;
        });

        averageSessionLength = totalDuration / sessions.length;

        // Find peak hours and days
        const peakHour = hourlyActivity.indexOf(Math.max(...hourlyActivity));
        const peakDay = dailyActivity.indexOf(Math.max(...dailyActivity));
        
        const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

        return {
            totalSessions: sessions.length,
            totalDuration,
            averageSessionLength,
            peakHour,
            peakDay: dayNames[peakDay],
            hourlyDistribution: hourlyActivity,
            dailyDistribution: dailyActivity,
            recentSessions: sessions.slice(-10) // Last 10 sessions
        };
    }

    /**
     * Get learning recommendations
     */
    static getLearningRecommendations(user, progressMap, courses) {
        const recommendations = [];
        const velocity = this.calculateLearningVelocity(progressMap);
        const patterns = this.analyzeLearningPatterns(progressMap);

        // Time-based recommendations
        const sessionPatterns = this.analyzeSessionPatterns(user.id);
        if (sessionPatterns && sessionPatterns.averageSessionLength < 10) {
            recommendations.push({
                type: 'time',
                title: 'Sesiones Más Largas',
                description: 'Tus sesiones promedio son cortas. Intenta dedicar 15-20 minutos por sesión.',
                priority: 'medium'
            });
        }

        // Content recommendations
        if (patterns.preferredContentType === 'lessons') {
            recommendations.push({
                type: 'content',
                title: 'Prueba Más Juegos',
                description: 'Los juegos interactivos pueden reforzar lo aprendido en las lecciones.',
                priority: 'low'
            });
        }

        // Streak recommendations
        if (user.currentStreak === 0) {
            recommendations.push({
                type: 'habit',
                title: 'Construye una Racha',
                description: 'Completa al menos una actividad diaria para mantener el momentum.',
                priority: 'high'
            });
        }

        // Course completion recommendations
        const nearCompletionCourses = [];
        progressMap.forEach((progress, courseId) => {
            const course = courses.get(courseId);
            if (course) {
                const completion = course.getCompletionPercentage(progress);
                if (completion >= 70 && completion < 100) {
                    nearCompletionCourses.push({ course, completion });
                }
            }
        });

        if (nearCompletionCourses.length > 0) {
            const bestCandidate = nearCompletionCourses.sort((a, b) => b.completion - a.completion)[0];
            recommendations.push({
                type: 'completion',
                title: 'Termina un Curso',
                description: `Estás al ${bestCandidate.completion}% en "${bestCandidate.course.title}". ¡Termínalo!`,
                priority: 'high',
                courseId: bestCandidate.course.id
            });
        }

        return recommendations.sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }
}