/**
 * Demo Data Generator - Creates sample users and progress for testing
 */
class DemoDataGenerator {
    static DEMO_USERS = [
        { username: 'Ana García', points: 2450, courses: 3, streak: 12, activities: 45 },
        { username: 'Carlos López', points: 1890, courses: 2, streak: 8, activities: 38 },
        { username: 'María Rodríguez', points: 3120, courses: 4, streak: 15, activities: 62 },
        { username: 'Juan Martínez', points: 1650, courses: 2, streak: 5, activities: 33 },
        { username: 'Laura Sánchez', points: 2780, courses: 3, streak: 20, activities: 51 },
        { username: 'Pedro Gómez', points: 1420, courses: 1, streak: 3, activities: 28 },
        { username: 'Sofia Díaz', points: 3450, courses: 5, streak: 25, activities: 68 },
        { username: 'Miguel Torres', points: 2100, courses: 3, streak: 10, activities: 42 },
        { username: 'Carmen Ruiz', points: 1980, courses: 2, streak: 7, activities: 39 },
        { username: 'David Moreno', points: 2650, courses: 3, streak: 18, activities: 48 }
    ];

    /**
     * Generate demo users for leaderboard testing
     */
    static generateDemoUsers() {
        console.log('🎭 Generating demo users for leaderboard...');
        
        this.DEMO_USERS.forEach((userData, index) => {
            const userId = `demo_user_${index + 1}`;
            const user = {
                id: userId,
                username: userData.username,
                totalPoints: userData.points,
                coursesCompleted: userData.courses,
                currentStreak: userData.streak,
                achievements: this.generateRandomAchievements(),
                createdAt: this.getRandomDate(),
                settings: {
                    theme: 'light',
                    notifications: true,
                    soundEffects: true
                }
            };

            // Save demo user
            localStorage.setItem(`eduquest_user_${userId}`, JSON.stringify(user));
            
            // Generate some progress data
            this.generateDemoProgress(userId, userData.activities, userData.courses);
        });

        console.log(`✅ Generated ${this.DEMO_USERS.length} demo users`);
    }

    /**
     * Generate random achievements for demo users
     */
    static generateRandomAchievements() {
        const allAchievements = Object.keys(AchievementSystem.ACHIEVEMENTS);
        const numAchievements = Math.floor(Math.random() * 8) + 2; // 2-10 achievements
        const achievements = [];
        
        for (let i = 0; i < numAchievements; i++) {
            const randomAchievement = allAchievements[Math.floor(Math.random() * allAchievements.length)];
            if (!achievements.includes(randomAchievement)) {
                achievements.push(randomAchievement);
            }
        }
        
        return achievements;
    }

    /**
     * Generate demo progress data
     */
    static generateDemoProgress(userId, totalActivities, coursesCompleted) {
        const courseIds = ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'];
        const activitiesPerCourse = Math.ceil(totalActivities / coursesCompleted);
        
        for (let i = 0; i < coursesCompleted; i++) {
            const courseId = courseIds[i];
            const progress = {
                userId,
                courseId,
                lessonsCompleted: this.generateRandomArray(Math.floor(activitiesPerCourse * 0.6)),
                gamesCompleted: this.generateRandomArray(Math.floor(activitiesPerCourse * 0.4)),
                pointsEarned: Math.floor(Math.random() * 500) + 200,
                completionPercentage: i < coursesCompleted ? 100 : Math.floor(Math.random() * 80) + 20,
                startedAt: this.getRandomDate(),
                lastAccessedAt: this.getRecentDate(),
                completedAt: i < coursesCompleted ? this.getRecentDate() : null,
                timeSpent: Math.floor(Math.random() * 300) + 60 // 60-360 minutes
            };

            localStorage.setItem(`eduquest_progress_${userId}_${courseId}`, JSON.stringify(progress));
        }
    }

    /**
     * Generate random array of IDs
     */
    static generateRandomArray(length) {
        const array = [];
        for (let i = 0; i < length; i++) {
            array.push(`item_${i + 1}`);
        }
        return array;
    }

    /**
     * Get random date in the past
     */
    static getRandomDate() {
        const now = new Date();
        const pastDate = new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000); // Up to 90 days ago
        return pastDate.toISOString();
    }

    /**
     * Get recent date (within last week)
     */
    static getRecentDate() {
        const now = new Date();
        const recentDate = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Up to 7 days ago
        return recentDate.toISOString();
    }

    /**
     * Clear demo data
     */
    static clearDemoData() {
        console.log('🗑️ Clearing demo data...');
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.includes('demo_user')) {
                localStorage.removeItem(key);
                i--; // Adjust index since we removed an item
            }
        }
        
        console.log('✅ Demo data cleared');
    }

    /**
     * Check if demo data exists
     */
    static hasDemoData() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.includes('demo_user')) {
                return true;
            }
        }
        return false;
    }

    /**
     * Initialize demo data if needed
     */
    static initializeDemoData() {
        if (!this.hasDemoData()) {
            this.generateDemoUsers();
        } else {
            console.log('📊 Demo data already exists');
        }
    }

    /**
     * Add demo data button to dashboard (for testing)
     */
    static addDemoControls() {
        const controls = document.createElement('div');
        controls.id = 'demo-controls';
        controls.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-size: 12px;
            z-index: 9999;
        `;
        
        controls.innerHTML = `
            <div style="margin-bottom: 10px; font-weight: bold;">Demo Controls</div>
            <button onclick="DemoDataGenerator.generateDemoUsers()" style="margin: 2px; padding: 5px 10px; font-size: 11px;">
                Generate Demo Users
            </button>
            <button onclick="DemoDataGenerator.clearDemoData()" style="margin: 2px; padding: 5px 10px; font-size: 11px;">
                Clear Demo Data
            </button>
            <button onclick="window.leaderboard?.show()" style="margin: 2px; padding: 5px 10px; font-size: 11px;">
                Show Leaderboard
            </button>
        `;
        
        document.body.appendChild(controls);
    }
}

// Auto-initialize demo data in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            DemoDataGenerator.initializeDemoData();
            DemoDataGenerator.addDemoControls();
        }, 2000);
    });
}