/**
 * EduQuest Main Application
 */
class EduQuestApp {
    constructor() {
        this.user = null;
        this.courses = new Map();
        this.progressMap = new Map();
        this.currentView = 'dashboard';
        this.isInitialized = false;
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            console.log('🚀 Initializing EduQuest...');
            
            // Show loading screen
            this.showLoading();
            
            // Initialize storage
            if (!StorageManager.isAvailable()) {
                console.warn('⚠️ LocalStorage not available, using memory storage');
            }
            
            // Initialize authentication system
            this.initializeAuth();
            
            // Check if user is authenticated
            if (!this.checkAuthentication()) {
                this.hideLoading();
                return; // Stop initialization if not authenticated
            }
            
            // Load or create user
            this.user = User.load();
            console.log('👤 User loaded:', this.user.username);
            
            // Discover courses
            await this.loadCourses();
            
            // Load user progress
            this.loadProgress();
            
            // Initialize systems
            this.initializeSystems();
            
            // Initialize dashboard
            this.initializeDashboard();
            
            // Hide loading screen
            this.hideLoading();
            
            this.isInitialized = true;
            console.log('✅ EduQuest initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize EduQuest:', error);
            this.showError('Error al inicializar la aplicación. Por favor, recarga la página.');
        }
    }

    /**
     * Load all courses
     */
    async loadCourses() {
        try {
            console.log('📚 Discovering courses...');
            
            // Try to load from cache first
            const cachedCourses = StorageManager.load(StorageManager.KEYS.COURSES);
            const cacheAge = cachedCourses ? Date.now() - new Date(cachedCourses.timestamp).getTime() : Infinity;
            
            // Use cache if less than 1 hour old
            if (cachedCourses && cacheAge < 3600000) {
                console.log('📦 Loading courses from cache');
                cachedCourses.courses.forEach(courseData => {
                    const course = new Course(courseData.id, courseData.title, courseData.description);
                    Object.assign(course, courseData);
                    this.courses.set(course.id, course);
                });
            } else {
                console.log('🔍 Discovering courses from filesystem...');
                const discoveredCourses = await CourseDiscovery.discoverAllCourses();
                
                discoveredCourses.forEach(course => {
                    this.courses.set(course.id, course);
                });
                
                // Cache the courses
                const cacheData = {
                    timestamp: new Date().toISOString(),
                    courses: Array.from(this.courses.values()).map(course => course.export())
                };
                StorageManager.save(StorageManager.KEYS.COURSES, cacheData);
            }
            
            console.log(`📚 Loaded ${this.courses.size} courses`);
            
        } catch (error) {
            console.error('❌ Error loading courses:', error);
            // Continue with empty courses map
        }
    }

    /**
     * Load user progress for all courses
     */
    loadProgress() {
        try {
            console.log('📊 Loading user progress...');
            this.progressMap = Progress.loadAllForUser(this.user.id);
            console.log(`📊 Loaded progress for ${this.progressMap.size} courses`);
        } catch (error) {
            console.error('❌ Error loading progress:', error);
            this.progressMap = new Map();
        }
    }

    /**
     * Initialize authentication system
     */
    initializeAuth() {
        console.log('🔐 Initializing authentication...');
        
        // Setup authentication event listeners
        window.addEventListener('auth:login', (e) => {
            console.log('✅ User logged in:', e.detail.user);
            this.onUserLogin(e.detail.user);
        });
        
        window.addEventListener('auth:logout', (e) => {
            console.log('🚪 User logged out');
            this.onUserLogout();
        });
        
        window.addEventListener('auth:register', (e) => {
            console.log('📝 User registered:', e.detail.user);
            this.onUserRegister(e.detail.user);
        });
        
        window.addEventListener('auth:loginSuccess', (e) => {
            console.log('🎉 Login successful, reloading app...');
            location.reload();
        });
        
        window.addEventListener('auth:registerSuccess', (e) => {
            console.log('🎉 Registration successful, reloading app...');
            location.reload();
        });
    }

    /**
     * Check if user is authenticated
     */
    checkAuthentication() {
        const authSystem = window.authSystem || AuthSystem;
        const currentUser = authSystem.getCurrentUser ? authSystem.getCurrentUser() : null;
        
        if (!currentUser) {
            console.log('🔒 User not authenticated, showing login modal');
            this.showAuthModal();
            return false;
        }
        
        console.log('✅ User authenticated:', currentUser.username);
        return true;
    }

    /**
     * Show authentication modal
     */
    showAuthModal() {
        if (window.authModal) {
            window.authModal.show('login');
        } else {
            console.error('❌ Auth modal not available');
            // Try to create auth modal if it doesn't exist
            if (typeof AuthModal !== 'undefined') {
                window.authModal = new AuthModal();
                window.authModal.show('login');
            }
        }
    }

    /**
     * Handle user login
     */
    onUserLogin(user) {
        console.log('🔄 Processing user login...');
        
        // Update current user
        this.user = User.fromAuthUser(user);
        
        // Load user data
        this.loadUserData(user.id);
        
        // Reinitialize systems
        this.initializeSystems();
        
        // Refresh dashboard
        if (this.dashboard) {
            this.dashboard.render();
        }
    }

    /**
     * Handle user logout
     */
    onUserLogout() {
        console.log('🔄 Processing user logout...');
        
        // Clear current user
        this.user = null;
        
        // Clear data
        this.courses.clear();
        this.progressMap.clear();
        
        // Show auth modal
        this.showAuthModal();
    }

    /**
     * Handle user registration
     */
    onUserRegister(user) {
        console.log('🔄 Processing user registration...');
        
        // Create new user
        this.user = User.fromAuthUser(user);
        
        // Initialize with demo data
        this.loadDemoData();
        
        // Initialize systems
        this.initializeSystems();
        
        // Show welcome message
        this.showWelcomeMessage(user);
    }

    /**
     * Load user-specific data
     */
    async loadUserData(userId) {
        try {
            console.log('📊 Loading user data...');
            
            // Load progress using data manager
            if (window.dataManager) {
                const progressResult = await window.dataManager.loadUserProgress(userId);
                if (progressResult.success && progressResult.data) {
                    // Convert to Progress objects
                    Object.entries(progressResult.data).forEach(([courseId, progressData]) => {
                        const progress = new Progress(userId, courseId);
                        Object.assign(progress, progressData);
                        this.progressMap.set(courseId, progress);
                    });
                }
                
                // Load achievements
                const achievementsResult = await window.dataManager.loadUserAchievements(userId);
                if (achievementsResult.success && achievementsResult.data) {
                    this.user.achievements = achievementsResult.data;
                }
                
                // Load stats
                const statsResult = await window.dataManager.loadUserStats(userId);
                if (statsResult.success && statsResult.data) {
                    Object.assign(this.user, statsResult.data);
                }
            }
            
        } catch (error) {
            console.error('❌ Error loading user data:', error);
        }
    }

    /**
     * Show welcome message for new users
     */
    showWelcomeMessage(user) {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'welcome-message';
        welcomeDiv.innerHTML = `
            <div class="welcome-content">
                <h2>🎉 ¡Bienvenido a EduQuest, ${user.fullName || user.username}!</h2>
                <p>Tu aventura de aprendizaje comienza ahora. Explora cursos, gana puntos y desbloquea logros.</p>
                <button onclick="this.parentElement.parentElement.remove()" class="btn btn-primary">¡Empezar!</button>
            </div>
        `;
        
        document.body.appendChild(welcomeDiv);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (welcomeDiv.parentElement) {
                welcomeDiv.remove();
            }
        }, 10000);
    }

    /**
     * Initialize additional systems
     */
    initializeSystems() {
        // Initialize data sync
        if (typeof DataSync !== 'undefined') {
            DataSync.init();
        }
        
        // Initialize leaderboard
        if (typeof Leaderboard !== 'undefined') {
            window.leaderboard = new Leaderboard(this);
        }
        
        // Initialize user profile
        if (typeof UserProfile !== 'undefined') {
            window.userProfile = new UserProfile(this);
        }
        
        // Check for achievements on app start
        if (typeof AchievementSystem !== 'undefined') {
            const context = AchievementSystem.generateContext(this.user, this.progressMap, this.courses);
            AchievementSystem.checkAchievements(this.user, this.progressMap, context);
        }
    }

    /**
     * Initialize dashboard
     */
    initializeDashboard() {
        this.dashboard = new Dashboard(this);
        this.dashboard.render();
    }

    /**
     * Show loading screen
     */
    showLoading() {
        const loadingScreen = document.getElementById('loading');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    /**
     * Hide loading screen
     */
    hideLoading() {
        const loadingScreen = document.getElementById('loading');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <h2>⚠️ Error</h2>
                <p>${message}</p>
                <button onclick="location.reload()" class="btn btn-primary">Recargar</button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
    }

    /**
     * Get course by ID
     */
    getCourse(courseId) {
        return this.courses.get(courseId);
    }

    /**
     * Get progress for course
     */
    getProgress(courseId) {
        return this.progressMap.get(courseId) || new Progress(this.user.id, courseId);
    }

    /**
     * Update user points and save
     */
    updateUserPoints(points) {
        if (this.user.addPoints(points)) {
            // Show point notification
            this.showPointNotification(points);
            return true;
        }
        return false;
    }

    /**
     * Show point notification
     */
    showPointNotification(points) {
        const notification = document.createElement('div');
        notification.className = 'point-notification';
        notification.innerHTML = `+${points} puntos`;
        
        document.body.appendChild(notification);
        
        // Animate and remove
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }

    /**
     * Navigate to course
     */
    navigateToCourse(courseId) {
        const course = this.getCourse(courseId);
        if (!course) {
            console.error('Course not found:', courseId);
            return;
        }
        
        // Navigate to enhanced course viewer
        window.location.href = `course-viewer.html?course=${courseId}`;
    }

    /**
     * Get user statistics
     */
    getUserStats() {
        const completedCourses = Array.from(this.progressMap.values())
            .filter(progress => progress.completedAt !== null).length;
        
        const totalPoints = this.user.totalPoints;
        const totalActivities = Array.from(this.progressMap.values())
            .reduce((sum, progress) => sum + progress.lessonsCompleted.size + progress.gamesCompleted.size, 0);
        
        return {
            totalPoints,
            completedCourses,
            totalActivities,
            currentStreak: this.user.currentStreak,
            achievements: this.user.achievements.length
        };
    }

    /**
     * Export user data
     */
    exportData() {
        return StorageManager.exportData();
    }

    /**
     * Import user data
     */
    importData(data) {
        if (StorageManager.importData(data)) {
            // Reload the application
            location.reload();
            return true;
        }
        return false;
    }
}

// Global app instance
let app;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    app = new EduQuestApp();
    await app.init();
});

// Handle page visibility changes for activity tracking
document.addEventListener('visibilitychange', () => {
    if (app && app.isInitialized) {
        if (document.hidden) {
            // Page is hidden, save current state
            console.log('💾 Saving state before page hide');
        } else {
            // Page is visible, update login streak
            app.user.updateLoginStreak();
        }
    }
});

// Handle beforeunload for data persistence
window.addEventListener('beforeunload', () => {
    if (app && app.isInitialized) {
        console.log('💾 Saving data before page unload');
        // Data is automatically saved by models, but we can do final cleanup here
    }
});