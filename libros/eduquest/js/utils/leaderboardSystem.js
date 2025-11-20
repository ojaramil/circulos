/**
 * Leaderboard System - Manages user rankings and competitive features
 */
class LeaderboardSystem {
    static RANKING_PERIODS = {
        ALL_TIME: 'all_time',
        MONTHLY: 'monthly',
        WEEKLY: 'weekly',
        DAILY: 'daily'
    };

    static RANKING_CATEGORIES = {
        TOTAL_POINTS: 'total_points',
        COURSES_COMPLETED: 'courses_completed',
        CURRENT_STREAK: 'current_streak',
        ACTIVITIES_COMPLETED: 'activities_completed'
    };

    /**
     * Get leaderboard data for a specific period and category
     */
    static getLeaderboard(period = this.RANKING_PERIODS.ALL_TIME, category = this.RANKING_CATEGORIES.TOTAL_POINTS, limit = 10) {
        const users = this.getAllUsers();
        const filteredUsers = this.filterUsersByPeriod(users, period);
        const rankedUsers = this.rankUsers(filteredUsers, category);
        
        return {
            period,
            category,
            rankings: rankedUsers.slice(0, limit),
            totalUsers: rankedUsers.length,
            lastUpdated: new Date().toISOString()
        };
    }

    /**
     * Get all users from storage
     */
    static getAllUsers() {
        const users = [];
        
        // Scan localStorage for user data
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('eduquest_user_')) {
                try {
                    const userData = JSON.parse(localStorage.getItem(key));
                    if (userData && userData.id) {
                        users.push(this.enrichUserData(userData));
                    }
                } catch (error) {
                    console.warn('Invalid user data found:', key);
                }
            }
        }
        
        // Add current user if not found
        const currentUser = User.load();
        if (currentUser && !users.find(u => u.id === currentUser.id)) {
            users.push(this.enrichUserData(currentUser));
        }
        
        return users;
    }

    /**
     * Enrich user data with calculated statistics
     */
    static enrichUserData(userData) {
        const progressMap = Progress.loadAllForUser(userData.id);
        
        // Calculate additional statistics
        let totalActivities = 0;
        let coursesCompleted = 0;
        let totalTimeSpent = 0;
        let lastActivity = null;
        
        progressMap.forEach(progress => {
            totalActivities += progress.lessonsCompleted.size + progress.gamesCompleted.size;
            totalTimeSpent += progress.timeSpent || 0;
            
            if (progress.completedAt) {
                coursesCompleted++;
            }
            
            if (progress.lastAccessedAt) {
                const accessTime = new Date(progress.lastAccessedAt);
                if (!lastActivity || accessTime > lastActivity) {
                    lastActivity = accessTime;
                }
            }
        });

        return {
            id: userData.id,
            username: userData.username || 'Usuario',
            totalPoints: userData.totalPoints || 0,
            coursesCompleted: userData.coursesCompleted || coursesCompleted,
            currentStreak: userData.currentStreak || 0,
            achievements: userData.achievements || [],
            totalActivities,
            totalTimeSpent,
            lastActivity: lastActivity ? lastActivity.toISOString() : userData.createdAt,
            createdAt: userData.createdAt,
            averagePointsPerActivity: totalActivities > 0 ? Math.round((userData.totalPoints || 0) / totalActivities) : 0,
            efficiency: this.calculateEfficiency(userData.totalPoints || 0, totalTimeSpent, totalActivities)
        };
    }

    /**
     * Calculate user efficiency score
     */
    static calculateEfficiency(points, timeSpent, activities) {
        if (timeSpent === 0 || activities === 0) return 0;
        
        const pointsPerMinute = points / timeSpent;
        const activitiesPerHour = activities / (timeSpent / 60);
        
        // Normalize to 0-100 scale
        const efficiency = Math.min(100, (pointsPerMinute * 50) + (activitiesPerHour * 2));
        return Math.round(efficiency);
    }

    /**
     * Filter users by time period
     */
    static filterUsersByPeriod(users, period) {
        if (period === this.RANKING_PERIODS.ALL_TIME) {
            return users;
        }

        const now = new Date();
        let cutoffDate;

        switch (period) {
            case this.RANKING_PERIODS.DAILY:
                cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                break;
            case this.RANKING_PERIODS.WEEKLY:
                const weekStart = new Date(now);
                weekStart.setDate(now.getDate() - now.getDay());
                weekStart.setHours(0, 0, 0, 0);
                cutoffDate = weekStart;
                break;
            case this.RANKING_PERIODS.MONTHLY:
                cutoffDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            default:
                return users;
        }

        // For time-based filtering, we'd need to track points by date
        // For now, filter by last activity
        return users.filter(user => {
            if (!user.lastActivity) return false;
            return new Date(user.lastActivity) >= cutoffDate;
        });
    }

    /**
     * Rank users by category
     */
    static rankUsers(users, category) {
        const sortedUsers = [...users].sort((a, b) => {
            let aValue, bValue;

            switch (category) {
                case this.RANKING_CATEGORIES.TOTAL_POINTS:
                    aValue = a.totalPoints;
                    bValue = b.totalPoints;
                    break;
                case this.RANKING_CATEGORIES.COURSES_COMPLETED:
                    aValue = a.coursesCompleted;
                    bValue = b.coursesCompleted;
                    break;
                case this.RANKING_CATEGORIES.CURRENT_STREAK:
                    aValue = a.currentStreak;
                    bValue = b.currentStreak;
                    break;
                case this.RANKING_CATEGORIES.ACTIVITIES_COMPLETED:
                    aValue = a.totalActivities;
                    bValue = b.totalActivities;
                    break;
                default:
                    aValue = a.totalPoints;
                    bValue = b.totalPoints;
            }

            // Primary sort by category value
            if (bValue !== aValue) {
                return bValue - aValue;
            }

            // Secondary sort by last activity (more recent first)
            const aActivity = new Date(a.lastActivity || 0);
            const bActivity = new Date(b.lastActivity || 0);
            return bActivity - aActivity;
        });

        // Add ranking positions
        return sortedUsers.map((user, index) => ({
            ...user,
            rank: index + 1,
            isCurrentUser: user.id === User.load().id
        }));
    }

    /**
     * Get user's current position in leaderboard
     */
    static getUserPosition(userId, period = this.RANKING_PERIODS.ALL_TIME, category = this.RANKING_CATEGORIES.TOTAL_POINTS) {
        const leaderboard = this.getLeaderboard(period, category, 1000); // Get more users to find position
        const userEntry = leaderboard.rankings.find(user => user.id === userId);
        
        if (!userEntry) {
            return {
                found: false,
                rank: null,
                totalUsers: leaderboard.totalUsers
            };
        }

        return {
            found: true,
            rank: userEntry.rank,
            totalUsers: leaderboard.totalUsers,
            user: userEntry,
            percentile: Math.round((1 - (userEntry.rank - 1) / leaderboard.totalUsers) * 100)
        };
    }

    /**
     * Get users around a specific user's position
     */
    static getUserNeighbors(userId, period = this.RANKING_PERIODS.ALL_TIME, category = this.RANKING_CATEGORIES.TOTAL_POINTS, range = 2) {
        const leaderboard = this.getLeaderboard(period, category, 1000);
        const userIndex = leaderboard.rankings.findIndex(user => user.id === userId);
        
        if (userIndex === -1) {
            return {
                found: false,
                neighbors: []
            };
        }

        const start = Math.max(0, userIndex - range);
        const end = Math.min(leaderboard.rankings.length, userIndex + range + 1);
        
        return {
            found: true,
            neighbors: leaderboard.rankings.slice(start, end),
            userIndex: userIndex - start
        };
    }

    /**
     * Get leaderboard statistics
     */
    static getLeaderboardStats(period = this.RANKING_PERIODS.ALL_TIME) {
        const users = this.getAllUsers();
        const filteredUsers = this.filterUsersByPeriod(users, period);
        
        if (filteredUsers.length === 0) {
            return {
                totalUsers: 0,
                averagePoints: 0,
                topScore: 0,
                totalPointsAwarded: 0,
                mostActiveUser: null
            };
        }

        const totalPoints = filteredUsers.reduce((sum, user) => sum + user.totalPoints, 0);
        const averagePoints = Math.round(totalPoints / filteredUsers.length);
        const topScore = Math.max(...filteredUsers.map(user => user.totalPoints));
        const mostActiveUser = filteredUsers.reduce((most, user) => 
            user.totalActivities > (most?.totalActivities || 0) ? user : most
        );

        return {
            totalUsers: filteredUsers.length,
            averagePoints,
            topScore,
            totalPointsAwarded: totalPoints,
            mostActiveUser: mostActiveUser ? {
                username: mostActiveUser.username,
                activities: mostActiveUser.totalActivities
            } : null
        };
    }

    /**
     * Generate achievement comparisons between users
     */
    static compareUsers(userId1, userId2) {
        const users = this.getAllUsers();
        const user1 = users.find(u => u.id === userId1);
        const user2 = users.find(u => u.id === userId2);
        
        if (!user1 || !user2) {
            return null;
        }

        return {
            user1: {
                username: user1.username,
                totalPoints: user1.totalPoints,
                coursesCompleted: user1.coursesCompleted,
                currentStreak: user1.currentStreak,
                achievements: user1.achievements.length,
                efficiency: user1.efficiency
            },
            user2: {
                username: user2.username,
                totalPoints: user2.totalPoints,
                coursesCompleted: user2.coursesCompleted,
                currentStreak: user2.currentStreak,
                achievements: user2.achievements.length,
                efficiency: user2.efficiency
            },
            comparison: {
                pointsDifference: user1.totalPoints - user2.totalPoints,
                coursesDifference: user1.coursesCompleted - user2.coursesCompleted,
                streakDifference: user1.currentStreak - user2.currentStreak,
                achievementsDifference: user1.achievements.length - user2.achievements.length,
                efficiencyDifference: user1.efficiency - user2.efficiency
            }
        };
    }

    /**
     * Get trending users (users with recent high activity)
     */
    static getTrendingUsers(limit = 5) {
        const users = this.getAllUsers();
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        // Filter users with recent activity
        const recentUsers = users.filter(user => {
            if (!user.lastActivity) return false;
            return new Date(user.lastActivity) >= weekAgo;
        });
        
        // Sort by a combination of recent activity and points
        const trendingUsers = recentUsers.sort((a, b) => {
            const aRecency = new Date(a.lastActivity).getTime();
            const bRecency = new Date(b.lastActivity).getTime();
            const aScore = a.totalPoints + (aRecency / 1000000); // Add recency bonus
            const bScore = b.totalPoints + (bRecency / 1000000);
            
            return bScore - aScore;
        });
        
        return trendingUsers.slice(0, limit).map((user, index) => ({
            ...user,
            trendRank: index + 1
        }));
    }

    /**
     * Update user in leaderboard (call when user data changes)
     */
    static updateUser(userData) {
        const key = `eduquest_user_${userData.id}`;
        try {
            localStorage.setItem(key, JSON.stringify(userData));
            
            // Trigger leaderboard update event
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('leaderboardUpdate', {
                    detail: { userId: userData.id, userData }
                }));
            }
            
            return true;
        } catch (error) {
            console.error('Error updating user in leaderboard:', error);
            return false;
        }
    }

    /**
     * Get category display information
     */
    static getCategoryInfo(category) {
        const categoryInfo = {
            [this.RANKING_CATEGORIES.TOTAL_POINTS]: {
                name: 'Puntos Totales',
                icon: '⭐',
                description: 'Usuarios con más puntos acumulados'
            },
            [this.RANKING_CATEGORIES.COURSES_COMPLETED]: {
                name: 'Cursos Completados',
                icon: '🎓',
                description: 'Usuarios que han completado más cursos'
            },
            [this.RANKING_CATEGORIES.CURRENT_STREAK]: {
                name: 'Racha Actual',
                icon: '🔥',
                description: 'Usuarios con las rachas más largas'
            },
            [this.RANKING_CATEGORIES.ACTIVITIES_COMPLETED]: {
                name: 'Actividades Completadas',
                icon: '📚',
                description: 'Usuarios más activos en lecciones y juegos'
            }
        };
        
        return categoryInfo[category] || categoryInfo[this.RANKING_CATEGORIES.TOTAL_POINTS];
    }

    /**
     * Get period display information
     */
    static getPeriodInfo(period) {
        const periodInfo = {
            [this.RANKING_PERIODS.ALL_TIME]: {
                name: 'Todos los Tiempos',
                icon: '🏆',
                description: 'Ranking histórico completo'
            },
            [this.RANKING_PERIODS.MONTHLY]: {
                name: 'Este Mes',
                icon: '📅',
                description: 'Ranking del mes actual'
            },
            [this.RANKING_PERIODS.WEEKLY]: {
                name: 'Esta Semana',
                icon: '📊',
                description: 'Ranking de la semana actual'
            },
            [this.RANKING_PERIODS.DAILY]: {
                name: 'Hoy',
                icon: '⚡',
                description: 'Ranking del día actual'
            }
        };
        
        return periodInfo[period] || periodInfo[this.RANKING_PERIODS.ALL_TIME];
    }
}