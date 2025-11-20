/**
 * Demo Users - Creates sample users for testing authentication
 */
class DemoUsers {
    /**
     * Create demo users if they don't exist
     */
    static createDemoUsers() {
        console.log('👥 Creating demo users...');
        
        const demoUsers = [
            {
                username: 'estudiante',
                email: 'estudiante@eduquest.com',
                password: '123456',
                fullName: 'Estudiante Demo',
                role: 'student'
            },
            {
                username: 'profesor',
                email: 'profesor@eduquest.com',
                password: '123456',
                fullName: 'Profesor Demo',
                role: 'teacher'
            },
            {
                username: 'admin',
                email: 'admin@eduquest.com',
                password: '123456',
                fullName: 'Administrador Demo',
                role: 'admin'
            }
        ];

        // Check if auth system is available
        if (!window.authSystem) {
            console.warn('⚠️ Auth system not available, cannot create demo users');
            return;
        }

        // Get existing users
        const existingUsers = window.authSystem.getStoredUsers();
        
        demoUsers.forEach(userData => {
            // Check if user already exists
            const userExists = existingUsers.some(user => 
                user.username === userData.username || user.email === userData.email
            );

            if (!userExists) {
                try {
                    // Create user directly in storage (bypass validation for demo)
                    const newUser = {
                        id: window.authSystem.generateUserId(),
                        username: userData.username,
                        email: userData.email,
                        fullName: userData.fullName,
                        password: window.authSystem.hashPassword(userData.password),
                        createdAt: new Date().toISOString(),
                        lastLoginAt: null,
                        isActive: true,
                        role: userData.role,
                        profile: {
                            avatar: null,
                            bio: `Usuario de demostración - ${userData.role}`,
                            preferences: {
                                theme: 'light',
                                notifications: true,
                                soundEffects: true,
                                language: 'es'
                            }
                        },
                        stats: {
                            totalPoints: userData.role === 'student' ? Math.floor(Math.random() * 1000) : 0,
                            coursesCompleted: userData.role === 'student' ? Math.floor(Math.random() * 5) : 0,
                            currentStreak: userData.role === 'student' ? Math.floor(Math.random() * 10) : 0,
                            achievements: [],
                            totalTimeSpent: userData.role === 'student' ? Math.floor(Math.random() * 10000) : 0
                        }
                    };

                    // Store user
                    window.authSystem.storeUser(newUser);
                    console.log(`✅ Created demo user: ${userData.username}`);
                    
                } catch (error) {
                    console.error(`❌ Error creating demo user ${userData.username}:`, error);
                }
            } else {
                console.log(`👤 Demo user already exists: ${userData.username}`);
            }
        });

        console.log('✅ Demo users setup complete');
        this.showDemoUsersInfo();
    }

    /**
     * Show demo users information
     */
    static showDemoUsersInfo() {
        console.log(`
🎭 USUARIOS DE DEMOSTRACIÓN DISPONIBLES:

📚 Estudiante:
   Usuario: estudiante
   Email: estudiante@eduquest.com
   Contraseña: 123456

👨‍🏫 Profesor:
   Usuario: profesor
   Email: profesor@eduquest.com
   Contraseña: 123456

👨‍💼 Administrador:
   Usuario: admin
   Email: admin@eduquest.com
   Contraseña: 123456

💡 Puedes usar cualquiera de estos usuarios para probar la aplicación.
        `);
    }

    /**
     * Reset demo users (recreate them)
     */
    static resetDemoUsers() {
        console.log('🔄 Resetting demo users...');
        
        if (!window.authSystem) {
            console.warn('⚠️ Auth system not available');
            return;
        }

        // Get existing users
        const existingUsers = window.authSystem.getStoredUsers();
        
        // Remove demo users
        const demoUsernames = ['estudiante', 'profesor', 'admin'];
        const filteredUsers = existingUsers.filter(user => 
            !demoUsernames.includes(user.username)
        );
        
        // Save filtered users
        localStorage.setItem('eduquest_users', JSON.stringify(filteredUsers));
        
        // Recreate demo users
        this.createDemoUsers();
    }

    /**
     * Get demo user credentials for quick login
     */
    static getDemoCredentials() {
        return [
            { username: 'estudiante', password: '123456', role: 'student' },
            { username: 'profesor', password: '123456', role: 'teacher' },
            { username: 'admin', password: '123456', role: 'admin' }
        ];
    }

    /**
     * Auto-login with demo user (for development)
     */
    static async autoLoginDemo(username = 'estudiante') {
        if (!window.authSystem) {
            console.warn('⚠️ Auth system not available');
            return false;
        }

        console.log(`🔐 Auto-logging in with demo user: ${username}`);
        
        const result = await window.authSystem.login(username, '123456', false);
        
        if (result.success) {
            console.log('✅ Auto-login successful');
            return true;
        } else {
            console.error('❌ Auto-login failed:', result.error);
            return false;
        }
    }

    /**
     * Create sample progress data for demo users
     */
    static createDemoProgress() {
        if (!window.dataManager || !window.authSystem) {
            console.warn('⚠️ Required systems not available');
            return;
        }

        const currentUser = window.authSystem.getCurrentUser();
        if (!currentUser || currentUser.role !== 'student') {
            return; // Only create progress for students
        }

        console.log('📊 Creating demo progress data...');

        // Sample course IDs (these should match actual courses)
        const sampleCourses = ['javascript-basics', 'html-css', 'python-intro'];
        
        sampleCourses.forEach(async (courseId, index) => {
            const progressData = {
                lessonsCompleted: new Set([`lesson-${index + 1}`, `lesson-${index + 2}`]),
                gamesCompleted: new Set([`game-${index + 1}`]),
                totalPoints: (index + 1) * 100,
                completionPercentage: (index + 1) * 25,
                lastAccessedAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
                completedAt: index === 0 ? new Date().toISOString() : null
            };

            await window.dataManager.saveUserProgress(currentUser.id, courseId, progressData);
        });

        // Create some achievements
        const achievements = [
            'first-lesson-complete',
            'first-course-complete',
            'streak-3-days'
        ];

        window.dataManager.saveUserAchievements(currentUser.id, achievements);

        // Create stats
        const stats = {
            totalPoints: 350,
            coursesCompleted: 1,
            currentStreak: 5,
            totalTimeSpent: 7200 // 2 hours in seconds
        };

        window.dataManager.saveUserStats(currentUser.id, stats);

        console.log('✅ Demo progress data created');
    }
}

// Auto-create demo users when the script loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for auth system to initialize
    setTimeout(() => {
        if (window.authSystem) {
            DemoUsers.createDemoUsers();
        }
    }, 1000);
});

// Make available globally for console testing
window.DemoUsers = DemoUsers;