/**
 * Course App - Application for the enhanced course viewer
 */
class CourseApp {
    constructor() {
        this.user = null;
        this.courses = new Map();
        this.progressMap = new Map();
        this.courseViewer = null;
        this.courseId = null;
    }

    /**
     * Initialize the course application
     */
    async init() {
        try {
            console.log('🚀 Initializing Course Viewer...');
            
            // Show loading screen
            this.showLoading();
            
            // Get course ID from URL parameters
            this.courseId = this.getCourseIdFromURL();
            if (!this.courseId) {
                throw new Error('No course ID provided');
            }

            // Initialize storage
            if (!StorageManager.isAvailable()) {
                console.warn('⚠️ LocalStorage not available, using memory storage');
            }
            
            // Load user
            this.user = User.load();
            console.log('👤 User loaded:', this.user.username);
            
            // Load specific course
            await this.loadCourse(this.courseId);
            
            // Load user progress
            this.loadProgress();
            
            // Initialize course viewer
            this.initializeCourseViewer();
            
            // Hide loading screen
            this.hideLoading();
            
            console.log('✅ Course Viewer initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize Course Viewer:', error);
            this.showError('Error al cargar el curso. Por favor, verifica que el curso existe.');
        }
    }

    /**
     * Get course ID from URL parameters
     */
    getCourseIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('course') || urlParams.get('id');
    }

    /**
     * Load specific course
     */
    async loadCourse(courseId) {
        try {
            console.log(`📚 Loading course: ${courseId}`);
            console.log(`🔍 Current location: ${window.location.pathname}`);
            console.log(`🔍 Base path will be: ${window.location.pathname.includes('course-viewer.html') ? '../' : ''}`);
            
            const course = await Course.fromFolder(courseId);
            if (course) {
                this.courses.set(course.id, course);
                console.log(`📚 Loaded course: ${course.title}`);
                console.log(`📚 Course lessons: ${course.lessons.length}`);
                console.log(`📚 Course games: ${course.games.length}`);
                
                // Debug: log first few lessons and games
                if (course.lessons.length > 0) {
                    console.log(`📄 First lesson: ${course.lessons[0].title} at ${course.lessons[0].filePath}`);
                }
                if (course.games.length > 0) {
                    console.log(`🎮 First game: ${course.games[0].title} at ${course.games[0].filePath}`);
                }
            } else {
                throw new Error(`Course ${courseId} not found`);
            }
            
        } catch (error) {
            console.error('❌ Error loading course:', error);
            throw error;
        }
    }

    /**
     * Load user progress
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
     * Initialize course viewer
     */
    initializeCourseViewer() {
        this.courseViewer = new CourseViewer(this, this.courseId);
        window.courseViewer = this.courseViewer; // Make globally accessible
        this.courseViewer.init();
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
        const container = document.getElementById('app');
        if (container) {
            container.innerHTML = `
                <div class="error-screen">
                    <div class="error-content">
                        <h2>⚠️ Error</h2>
                        <p>${message}</p>
                        <div class="error-actions">
                            <button onclick="window.history.back()" class="btn btn-outline">Volver</button>
                            <button onclick="location.reload()" class="btn btn-primary">Reintentar</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Navigate back to dashboard
     */
    navigateToDashboard() {
        window.location.href = 'index.html';
    }
}

// Global app instance
let courseApp;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    courseApp = new CourseApp();
    await courseApp.init();
});

// Handle page visibility changes for activity tracking
document.addEventListener('visibilitychange', () => {
    if (courseApp && courseApp.courseViewer) {
        if (document.hidden) {
            console.log('💾 Page hidden, saving progress');
        } else {
            console.log('👁️ Page visible, resuming tracking');
        }
    }
});

// Handle beforeunload for data persistence
window.addEventListener('beforeunload', () => {
    if (courseApp && courseApp.courseViewer) {
        console.log('💾 Saving data before page unload');
    }
});