/**
 * Bonus Point System - Calculates bonus points for various achievements
 */
class BonusPointSystem {
    static BONUS_MULTIPLIERS = {
        streak: {
            7: 1.5,   // 50% bonus for 7-day streak
            14: 2.0,  // 100% bonus for 14-day streak
            30: 2.5,  // 150% bonus for 30-day streak
            60: 3.0   // 200% bonus for 60-day streak
        },
        completion: {
            course: 50,        // Flat bonus for course completion
            perfectScore: 25,  // Bonus for perfect completion
            fastCompletion: 15 // Bonus for completing quickly
        },
        consecutive: {
            activities: 5,     // Bonus per consecutive activity
            maxBonus: 50      // Maximum consecutive bonus
        },
        timeOfDay: {
            earlyBird: 10,    // 6-8 AM bonus
            nightOwl: 10      // 10 PM-12 AM bonus
        },
        efficiency: {
            high: 20,         // High efficiency bonus
            perfect: 35       // Perfect efficiency bonus
        }
    };

    /**
     * Calculate streak bonus points
     */
    static calculateStreakBonus(basePoints, currentStreak) {
        let multiplier = 1.0;
        
        // Find the highest applicable streak multiplier
        const streakThresholds = Object.keys(this.BONUS_MULTIPLIERS.streak)
            .map(Number)
            .sort((a, b) => b - a); // Sort descending
        
        for (const threshold of streakThresholds) {
            if (currentStreak >= threshold) {
                multiplier = this.BONUS_MULTIPLIERS.streak[threshold];
                break;
            }
        }
        
        const bonusPoints = Math.round(basePoints * (multiplier - 1));
        
        return {
            bonusPoints,
            multiplier,
            reason: `Racha de ${currentStreak} días (${Math.round((multiplier - 1) * 100)}% bonus)`
        };
    }

    /**
     * Calculate course completion bonus
     */
    static calculateCourseCompletionBonus(progress, course, completionTime) {
        let bonusPoints = this.BONUS_MULTIPLIERS.completion.course;
        const bonusReasons = ['Curso completado'];
        
        // Perfect score bonus (100% completion)
        if (progress.completionPercentage === 100) {
            bonusPoints += this.BONUS_MULTIPLIERS.completion.perfectScore;
            bonusReasons.push('Completado al 100%');
        }
        
        // Fast completion bonus (completed in less than average time)
        if (completionTime && course.estimatedDuration) {
            const completionRatio = completionTime / course.estimatedDuration;
            if (completionRatio < 0.8) { // Completed 20% faster than estimated
                bonusPoints += this.BONUS_MULTIPLIERS.completion.fastCompletion;
                bonusReasons.push('Completado rápidamente');
            }
        }
        
        return {
            bonusPoints,
            reasons: bonusReasons
        };
    }

    /**
     * Calculate consecutive activity bonus
     */
    static calculateConsecutiveBonus(consecutiveCount) {
        if (consecutiveCount <= 1) {
            return { bonusPoints: 0, reason: null };
        }
        
        const bonusPoints = Math.min(
            consecutiveCount * this.BONUS_MULTIPLIERS.consecutive.activities,
            this.BONUS_MULTIPLIERS.consecutive.maxBonus
        );
        
        return {
            bonusPoints,
            reason: `${consecutiveCount} actividades consecutivas`
        };
    }

    /**
     * Calculate time of day bonus
     */
    static calculateTimeOfDayBonus(completionTime = new Date()) {
        const hour = completionTime.getHours();
        
        if (hour >= 6 && hour < 8) {
            return {
                bonusPoints: this.BONUS_MULTIPLIERS.timeOfDay.earlyBird,
                reason: 'Madrugador (6-8 AM)'
            };
        } else if (hour >= 22 && hour < 24) {
            return {
                bonusPoints: this.BONUS_MULTIPLIERS.timeOfDay.nightOwl,
                reason: 'Búho nocturno (10 PM-12 AM)'
            };
        }
        
        return { bonusPoints: 0, reason: null };
    }

    /**
     * Calculate efficiency bonus
     */
    static calculateEfficiencyBonus(timeSpent, expectedTime, pointsEarned) {
        if (!timeSpent || !expectedTime) {
            return { bonusPoints: 0, reason: null };
        }
        
        const timeRatio = timeSpent / expectedTime;
        const efficiency = 1 / timeRatio; // Higher is better
        
        if (efficiency >= 1.5) { // Completed 50% faster than expected
            return {
                bonusPoints: this.BONUS_MULTIPLIERS.efficiency.perfect,
                reason: 'Eficiencia perfecta'
            };
        } else if (efficiency >= 1.2) { // Completed 20% faster than expected
            return {
                bonusPoints: this.BONUS_MULTIPLIERS.efficiency.high,
                reason: 'Alta eficiencia'
            };
        }
        
        return { bonusPoints: 0, reason: null };
    }

    /**
     * Calculate daily goal bonus
     */
    static calculateDailyGoalBonus(dailyActivities, goalActivities = 3) {
        if (dailyActivities >= goalActivities * 2) {
            return {
                bonusPoints: 30,
                reason: 'Meta diaria superada (200%)'
            };
        } else if (dailyActivities >= goalActivities * 1.5) {
            return {
                bonusPoints: 20,
                reason: 'Meta diaria superada (150%)'
            };
        } else if (dailyActivities >= goalActivities) {
            return {
                bonusPoints: 10,
                reason: 'Meta diaria alcanzada'
            };
        }
        
        return { bonusPoints: 0, reason: null };
    }

    /**
     * Calculate weekend bonus
     */
    static calculateWeekendBonus(completionTime = new Date()) {
        const dayOfWeek = completionTime.getDay();
        
        if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
            return {
                bonusPoints: 15,
                reason: 'Aprendizaje de fin de semana'
            };
        }
        
        return { bonusPoints: 0, reason: null };
    }

    /**
     * Calculate comprehensive bonus for activity completion
     */
    static calculateActivityBonus(options) {
        const {
            basePoints = 10,
            activityType = 'lesson',
            currentStreak = 0,
            consecutiveCount = 1,
            completionTime = new Date(),
            timeSpent = null,
            expectedTime = null,
            dailyActivities = 1
        } = options;
        
        const bonuses = [];
        let totalBonusPoints = 0;
        
        // Streak bonus
        if (currentStreak > 0) {
            const streakBonus = this.calculateStreakBonus(basePoints, currentStreak);
            if (streakBonus.bonusPoints > 0) {
                bonuses.push(streakBonus);
                totalBonusPoints += streakBonus.bonusPoints;
            }
        }
        
        // Consecutive activity bonus
        const consecutiveBonus = this.calculateConsecutiveBonus(consecutiveCount);
        if (consecutiveBonus.bonusPoints > 0) {
            bonuses.push(consecutiveBonus);
            totalBonusPoints += consecutiveBonus.bonusPoints;
        }
        
        // Time of day bonus
        const timeBonus = this.calculateTimeOfDayBonus(completionTime);
        if (timeBonus.bonusPoints > 0) {
            bonuses.push(timeBonus);
            totalBonusPoints += timeBonus.bonusPoints;
        }
        
        // Efficiency bonus
        const efficiencyBonus = this.calculateEfficiencyBonus(timeSpent, expectedTime);
        if (efficiencyBonus.bonusPoints > 0) {
            bonuses.push(efficiencyBonus);
            totalBonusPoints += efficiencyBonus.bonusPoints;
        }
        
        // Daily goal bonus
        const dailyBonus = this.calculateDailyGoalBonus(dailyActivities);
        if (dailyBonus.bonusPoints > 0) {
            bonuses.push(dailyBonus);
            totalBonusPoints += dailyBonus.bonusPoints;
        }
        
        // Weekend bonus
        const weekendBonus = this.calculateWeekendBonus(completionTime);
        if (weekendBonus.bonusPoints > 0) {
            bonuses.push(weekendBonus);
            totalBonusPoints += weekendBonus.bonusPoints;
        }
        
        return {
            basePoints,
            totalBonusPoints,
            finalPoints: basePoints + totalBonusPoints,
            bonuses: bonuses.filter(bonus => bonus.bonusPoints > 0),
            multiplier: totalBonusPoints > 0 ? (basePoints + totalBonusPoints) / basePoints : 1
        };
    }

    /**
     * Calculate comprehensive bonus for course completion
     */
    static calculateCourseCompletionBonusComprehensive(options) {
        const {
            progress,
            course,
            currentStreak = 0,
            completionTime = new Date(),
            totalTimeSpent = null
        } = options;
        
        const bonuses = [];
        let totalBonusPoints = 0;
        
        // Base course completion bonus
        const completionBonus = this.calculateCourseCompletionBonus(progress, course, totalTimeSpent);
        totalBonusPoints += completionBonus.bonusPoints;
        bonuses.push({
            bonusPoints: completionBonus.bonusPoints,
            reason: completionBonus.reasons.join(', ')
        });
        
        // Streak bonus on completion
        if (currentStreak >= 7) {
            const streakBonus = {
                bonusPoints: Math.round(currentStreak * 2),
                reason: `Completado durante racha de ${currentStreak} días`
            };
            bonuses.push(streakBonus);
            totalBonusPoints += streakBonus.bonusPoints;
        }
        
        // Time of day bonus
        const timeBonus = this.calculateTimeOfDayBonus(completionTime);
        if (timeBonus.bonusPoints > 0) {
            bonuses.push(timeBonus);
            totalBonusPoints += timeBonus.bonusPoints;
        }
        
        // Weekend completion bonus
        const weekendBonus = this.calculateWeekendBonus(completionTime);
        if (weekendBonus.bonusPoints > 0) {
            bonuses.push(weekendBonus);
            totalBonusPoints += weekendBonus.bonusPoints;
        }
        
        return {
            totalBonusPoints,
            bonuses: bonuses.filter(bonus => bonus.bonusPoints > 0)
        };
    }

    /**
     * Get bonus point explanation
     */
    static getBonusExplanation(bonusResult) {
        if (!bonusResult.bonuses || bonusResult.bonuses.length === 0) {
            return null;
        }
        
        const explanations = bonusResult.bonuses.map(bonus => 
            `+${bonus.bonusPoints} por ${bonus.reason}`
        );
        
        return {
            summary: `Bonus total: +${bonusResult.totalBonusPoints} puntos`,
            details: explanations,
            multiplier: bonusResult.multiplier ? `${Math.round((bonusResult.multiplier - 1) * 100)}% bonus` : null
        };
    }

    /**
     * Track consecutive activities for bonus calculation
     */
    static trackConsecutiveActivities(userId) {
        const key = `eduquest_consecutive_${userId}`;
        const data = StorageManager.load(key, {
            count: 0,
            lastActivity: null,
            date: new Date().toDateString()
        });
        
        const today = new Date().toDateString();
        
        if (data.date === today) {
            // Same day, increment count
            data.count++;
            data.lastActivity = new Date().toISOString();
        } else {
            // New day, reset count
            data.count = 1;
            data.date = today;
            data.lastActivity = new Date().toISOString();
        }
        
        StorageManager.save(key, data);
        return data.count;
    }

    /**
     * Get daily activity count
     */
    static getDailyActivityCount(userId) {
        const key = `eduquest_daily_${userId}`;
        const data = StorageManager.load(key, {
            count: 0,
            date: new Date().toDateString()
        });
        
        const today = new Date().toDateString();
        
        if (data.date === today) {
            return data.count;
        } else {
            return 0;
        }
    }

    /**
     * Increment daily activity count
     */
    static incrementDailyActivityCount(userId) {
        const key = `eduquest_daily_${userId}`;
        const data = StorageManager.load(key, {
            count: 0,
            date: new Date().toDateString()
        });
        
        const today = new Date().toDateString();
        
        if (data.date === today) {
            data.count++;
        } else {
            data.count = 1;
            data.date = today;
        }
        
        StorageManager.save(key, data);
        return data.count;
    }

    /**
     * Calculate and apply bonus points for activity completion
     */
    static applyActivityBonus(user, activityType, options = {}) {
        const consecutiveCount = this.trackConsecutiveActivities(user.id);
        const dailyActivities = this.incrementDailyActivityCount(user.id);
        
        const bonusOptions = {
            basePoints: activityType === 'lesson' ? 10 : 15,
            activityType,
            currentStreak: user.currentStreak,
            consecutiveCount,
            dailyActivities,
            completionTime: new Date(),
            ...options
        };
        
        const bonusResult = this.calculateActivityBonus(bonusOptions);
        
        // Apply bonus points to user
        if (bonusResult.totalBonusPoints > 0) {
            user.addPoints(bonusResult.totalBonusPoints);
            
            // Show bonus notification
            if (window.notificationSystem) {
                const explanation = this.getBonusExplanation(bonusResult);
                window.notificationSystem.showPointNotification(
                    bonusResult.totalBonusPoints,
                    explanation.summary
                );
            }
        }
        
        return bonusResult;
    }
}