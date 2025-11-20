/**
 * Achievement System - Manages user achievements and rewards
 */
class AchievementSystem {
    static ACHIEVEMENTS = {
        // Course Completion Achievements
        'first_course': {
            id: 'first_course',
            name: 'Primer Graduado',
            description: 'Completa tu primer curso',
            icon: '🎓',
            points: 25,
            type: 'course_completion',
            condition: (user, progress) => user.coursesCompleted >= 1
        },
        'course_master': {
            id: 'course_master',
            name: 'Maestro de Cursos',
            description: 'Completa 5 cursos',
            icon: '👨‍🎓',
            points: 100,
            type: 'course_completion',
            condition: (user, progress) => user.coursesCompleted >= 5
        },
        'course_legend': {
            id: 'course_legend',
            name: 'Leyenda del Aprendizaje',
            description: 'Completa 10 cursos',
            icon: '🏆',
            points: 250,
            type: 'course_completion',
            condition: (user, progress) => user.coursesCompleted >= 10
        },

        // Activity Achievements
        'lesson_lover': {
            id: 'lesson_lover',
            name: 'Amante de las Lecciones',
            description: 'Completa 25 lecciones',
            icon: '📚',
            points: 50,
            type: 'activity',
            condition: (user, progress) => {
                let totalLessons = 0;
                progress.forEach(p => totalLessons += p.lessonsCompleted.size);
                return totalLessons >= 25;
            }
        },
        'game_master': {
            id: 'game_master',
            name: 'Maestro de Juegos',
            description: 'Completa 25 juegos',
            icon: '🎮',
            points: 75,
            type: 'activity',
            condition: (user, progress) => {
                let totalGames = 0;
                progress.forEach(p => totalGames += p.gamesCompleted.size);
                return totalGames >= 25;
            }
        },

        // Streak Achievements
        'week_streak': {
            id: 'week_streak',
            name: 'Semana Completa',
            description: 'Mantén una racha de 7 días',
            icon: '🔥',
            points: 50,
            type: 'streak',
            condition: (user, progress) => user.currentStreak >= 7
        },
        'month_streak': {
            id: 'month_streak',
            name: 'Mes Imparable',
            description: 'Mantén una racha de 30 días',
            icon: '⚡',
            points: 200,
            type: 'streak',
            condition: (user, progress) => user.currentStreak >= 30
        },

        // Points Achievements
        'point_collector': {
            id: 'point_collector',
            name: 'Coleccionista de Puntos',
            description: 'Acumula 1,000 puntos',
            icon: '💰',
            points: 100,
            type: 'points',
            condition: (user, progress) => user.totalPoints >= 1000
        },
        'point_master': {
            id: 'point_master',
            name: 'Maestro de Puntos',
            description: 'Acumula 5,000 puntos',
            icon: '💎',
            points: 250,
            type: 'points',
            condition: (user, progress) => user.totalPoints >= 5000
        },

        // Special Achievements
        'early_bird': {
            id: 'early_bird',
            name: 'Madrugador',
            description: 'Completa una actividad antes de las 8 AM',
            icon: '🌅',
            points: 25,
            type: 'special',
            condition: (user, progress, context) => {
                if (context && context.completionTime) {
                    const hour = new Date(context.completionTime).getHours();
                    return hour < 8;
                }
                return false;
            }
        },
        'night_owl': {
            id: 'night_owl',
            name: 'Búho Nocturno',
            description: 'Completa una actividad después de las 10 PM',
            icon: '🦉',
            points: 25,
            type: 'special',
            condition: (user, progress, context) => {
                if (context && context.completionTime) {
                    const hour = new Date(context.completionTime).getHours();
                    return hour >= 22;
                }
                return false;
            }
        },
        'speed_learner': {
            id: 'speed_learner',
            name: 'Aprendiz Veloz',
            description: 'Completa 5 actividades en un día',
            icon: '⚡',
            points: 75,
            type: 'special',
            condition: (user, progress, context) => {
                if (context && context.dailyCompletions) {
                    return context.dailyCompletions >= 5;
                }
                return false;
            }
        },

        // Category Achievements
        'finance_expert': {
            id: 'finance_expert',
            name: 'Experto en Finanzas',
            description: 'Completa 3 cursos de finanzas personales',
            icon: '💳',
            points: 150,
            type: 'category',
            condition: (user, progress, context) => {
                if (context && context.completedCoursesByCategory) {
                    return (context.completedCoursesByCategory['Finanzas personales'] || 0) >= 3;
                }
                return false;
            }
        },
        'leadership_guru': {
            id: 'leadership_guru',
            name: 'Gurú del Liderazgo',
            description: 'Completa 2 cursos de liderazgo',
            icon: '👑',
            points: 100,
            type: 'category',
            condition: (user, progress, context) => {
                if (context && context.completedCoursesByCategory) {
                    return (context.completedCoursesByCategory['Liderazgo y Propósito'] || 0) >= 2;
                }
                return false;
            }
        }
    };

    /**
     * Check for new achievements
     */
    static checkAchievements(user, progressMap, context = {}) {
        const newAchievements = [];
        
        Object.values(this.ACHIEVEMENTS).forEach(achievement => {
            // Skip if user already has this achievement
            if (user.achievements.includes(achievement.id)) {
                return;
            }
            
            // Check if condition is met
            if (achievement.condition(user, progressMap, context)) {
                newAchievements.push(achievement);
                user.awardAchievement(achievement.id);
                user.addPoints(achievement.points);
                
                console.log(`🏆 Achievement unlocked: ${achievement.name} (+${achievement.points} points)`);
            }
        });
        
        return newAchievements;
    }

    /**
     * Get achievement by ID
     */
    static getAchievement(achievementId) {
        return this.ACHIEVEMENTS[achievementId];
    }

    /**
     * Get all user achievements with details
     */
    static getUserAchievements(user) {
        return user.achievements.map(id => this.getAchievement(id)).filter(Boolean);
    }

    /**
     * Get available achievements (not yet earned)
     */
    static getAvailableAchievements(user) {
        return Object.values(this.ACHIEVEMENTS).filter(achievement => 
            !user.achievements.includes(achievement.id)
        );
    }

    /**
     * Get achievements by type
     */
    static getAchievementsByType(type) {
        return Object.values(this.ACHIEVEMENTS).filter(achievement => 
            achievement.type === type
        );
    }

    /**
     * Calculate achievement progress
     */
    static getAchievementProgress(user, progressMap, achievementId) {
        const achievement = this.getAchievement(achievementId);
        if (!achievement || user.achievements.includes(achievementId)) {
            return { completed: true, progress: 100 };
        }

        // Calculate progress based on achievement type
        switch (achievement.type) {
            case 'course_completion':
                const targetCourses = achievement.id === 'first_course' ? 1 :
                                    achievement.id === 'course_master' ? 5 : 10;
                return {
                    completed: false,
                    progress: Math.min(100, (user.coursesCompleted / targetCourses) * 100),
                    current: user.coursesCompleted,
                    target: targetCourses
                };

            case 'activity':
                let current = 0;
                let target = 25;
                
                if (achievement.id === 'lesson_lover') {
                    progressMap.forEach(p => current += p.lessonsCompleted.size);
                } else if (achievement.id === 'game_master') {
                    progressMap.forEach(p => current += p.gamesCompleted.size);
                }
                
                return {
                    completed: false,
                    progress: Math.min(100, (current / target) * 100),
                    current,
                    target
                };

            case 'streak':
                const targetDays = achievement.id === 'week_streak' ? 7 : 30;
                return {
                    completed: false,
                    progress: Math.min(100, (user.currentStreak / targetDays) * 100),
                    current: user.currentStreak,
                    target: targetDays
                };

            case 'points':
                const targetPoints = achievement.id === 'point_collector' ? 1000 : 5000;
                return {
                    completed: false,
                    progress: Math.min(100, (user.totalPoints / targetPoints) * 100),
                    current: user.totalPoints,
                    target: targetPoints
                };

            default:
                return { completed: false, progress: 0 };
        }
    }

    /**
     * Generate context for achievement checking
     */
    static generateContext(user, progressMap, courses) {
        const context = {
            completionTime: new Date().toISOString(),
            dailyCompletions: this.getDailyCompletions(progressMap),
            completedCoursesByCategory: this.getCompletedCoursesByCategory(progressMap, courses)
        };

        return context;
    }

    /**
     * Get daily completions count
     */
    static getDailyCompletions(progressMap) {
        const today = new Date().toDateString();
        let count = 0;

        progressMap.forEach(progress => {
            // Count lessons completed today
            // Note: This is a simplified version - in a real app, you'd track completion timestamps
            if (progress.lastAccessedAt) {
                const lastAccess = new Date(progress.lastAccessedAt).toDateString();
                if (lastAccess === today) {
                    count += progress.lessonsCompleted.size + progress.gamesCompleted.size;
                }
            }
        });

        return count;
    }

    /**
     * Get completed courses by category
     */
    static getCompletedCoursesByCategory(progressMap, courses) {
        const categoryCount = {};

        progressMap.forEach((progress, courseId) => {
            if (progress.completedAt) {
                const course = courses.get(courseId);
                if (course) {
                    categoryCount[course.category] = (categoryCount[course.category] || 0) + 1;
                }
            }
        });

        return categoryCount;
    }

    /**
     * Get achievement statistics
     */
    static getAchievementStats(user) {
        const totalAchievements = Object.keys(this.ACHIEVEMENTS).length;
        const earnedAchievements = user.achievements.length;
        const achievementPoints = user.achievements.reduce((total, id) => {
            const achievement = this.getAchievement(id);
            return total + (achievement ? achievement.points : 0);
        }, 0);

        return {
            total: totalAchievements,
            earned: earnedAchievements,
            percentage: Math.round((earnedAchievements / totalAchievements) * 100),
            points: achievementPoints
        };
    }

    /**
     * Get next achievement suggestions
     */
    static getNextAchievements(user, progressMap, limit = 3) {
        const available = this.getAvailableAchievements(user);
        
        // Sort by progress (closest to completion first)
        const withProgress = available.map(achievement => ({
            ...achievement,
            progressData: this.getAchievementProgress(user, progressMap, achievement.id)
        })).sort((a, b) => b.progressData.progress - a.progressData.progress);

        return withProgress.slice(0, limit);
    }
}