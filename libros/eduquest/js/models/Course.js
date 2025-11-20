/**
 * Course Model - Represents a learning course
 */
class Course {
    constructor(id, title, description = '') {
        this.id = id;
        this.title = title;
        this.description = description;
        this.lessons = [];
        this.games = [];
        this.totalPoints = 0;
        this.estimatedDuration = 0;
        this.thumbnail = null;
        this.category = 'General';
        this.difficulty = 'Intermedio';
        this.tags = [];
    }

    /**
     * Add a lesson to the course
     */
    addLesson(lesson) {
        this.lessons.push(lesson);
        this.calculateTotalPoints();
    }

    /**
     * Add a game to the course
     */
    addGame(game) {
        this.games.push(game);
        this.calculateTotalPoints();
    }

    /**
     * Calculate total points available in course
     */
    calculateTotalPoints() {
        const lessonPoints = this.lessons.length * 10; // 10 points per lesson
        const gamePoints = this.games.length * 15; // 15 points per game
        const completionBonus = 50; // Bonus for completing entire course
        
        this.totalPoints = lessonPoints + gamePoints + completionBonus;
    }

    /**
     * Get course statistics
     */
    getStats() {
        return {
            totalLessons: this.lessons.length,
            totalGames: this.games.length,
            totalActivities: this.lessons.length + this.games.length,
            totalPoints: this.totalPoints,
            estimatedDuration: this.estimatedDuration
        };
    }

    /**
     * Create course from folder structure
     */
    static async fromFolder(folderId) {
        try {
            // Get enhanced metadata first
            const metadata = CourseMetadata.getMetadata(folderId);
            
            // Try to extract additional info from HTML file
            const courseInfo = await CourseDiscovery.extractCourseInfo(folderId);
            
            // Create course with enhanced metadata
            const course = new Course(folderId, metadata.title, metadata.description);
            course.category = metadata.category;
            course.thumbnail = metadata.thumbnail;
            course.difficulty = metadata.difficulty;
            course.tags = metadata.tags || [];
            course.author = metadata.author;
            course.estimatedDuration = metadata.estimatedHours * 60; // Convert to minutes
            
            // Discover lessons
            const lessons = await CourseDiscovery.discoverLessons(folderId);
            lessons.forEach(lesson => course.addLesson(lesson));
            
            // Discover games
            const games = await CourseDiscovery.discoverGames(folderId);
            games.forEach(game => course.addGame(game));
            
            // Update duration based on actual content if no metadata available
            if (!metadata.estimatedHours) {
                course.estimatedDuration = (lessons.length * 5) + (games.length * 10);
            }
            
            // Cache the course metadata
            CourseMetadata.cacheMetadata(folderId, {
                ...metadata,
                lessonsCount: lessons.length,
                gamesCount: games.length,
                totalActivities: lessons.length + games.length,
                lastUpdated: new Date().toISOString()
            });
            
            return course;
        } catch (error) {
            console.error(`Error creating course from folder ${folderId}:`, error);
            return null;
        }
    }

    /**
     * Get lesson by ID
     */
    getLessonById(lessonId) {
        return this.lessons.find(lesson => lesson.id === lessonId);
    }

    /**
     * Get game by ID
     */
    getGameById(gameId) {
        return this.games.find(game => game.id === gameId);
    }

    /**
     * Check if course is completed based on progress
     */
    isCompleted(progress) {
        if (!progress) return false;
        
        const totalActivities = this.lessons.length + this.games.length;
        const completedActivities = progress.lessonsCompleted.size + progress.gamesCompleted.size;
        
        return completedActivities === totalActivities;
    }

    /**
     * Get completion percentage based on progress
     */
    getCompletionPercentage(progress) {
        if (!progress) return 0;
        
        const totalActivities = this.lessons.length + this.games.length;
        if (totalActivities === 0) return 0;
        
        const completedActivities = progress.lessonsCompleted.size + progress.gamesCompleted.size;
        return Math.round((completedActivities / totalActivities) * 100);
    }

    /**
     * Get next available activity (lesson or game)
     */
    getNextActivity(progress) {
        if (!progress) {
            return this.lessons.length > 0 ? this.lessons[0] : 
                   this.games.length > 0 ? this.games[0] : null;
        }

        // Find first incomplete lesson
        for (const lesson of this.lessons) {
            if (!progress.lessonsCompleted.has(lesson.id)) {
                return lesson;
            }
        }

        // Find first incomplete game
        for (const game of this.games) {
            if (!progress.gamesCompleted.has(game.id)) {
                return game;
            }
        }

        return null; // All activities completed
    }

    /**
     * Export course data
     */
    export() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            lessons: this.lessons.map(lesson => ({ ...lesson })),
            games: this.games.map(game => ({ ...game })),
            totalPoints: this.totalPoints,
            estimatedDuration: this.estimatedDuration,
            category: this.category,
            difficulty: this.difficulty,
            tags: [...this.tags]
        };
    }
}

/**
 * Lesson class
 */
class Lesson {
    constructor(id, title, filePath, type = 'lesson') {
        this.id = id;
        this.title = title;
        this.filePath = filePath;
        this.type = type;
        this.points = 10;
        this.estimatedDuration = 5; // minutes
        this.icon = this.getIconForType(type);
    }

    getIconForType(type) {
        const iconMap = {
            'lesson': '📄',
            'video': '📹',
            'practical': '✨',
            'tools': '🛠️',
            'conclusion': '🏁',
            'glossary': '📖',
            'links': '🔗'
        };
        return iconMap[type] || '📄';
    }
}

/**
 * Game class
 */
class Game {
    constructor(id, title, filePath, type = 'game') {
        this.id = id;
        this.title = title;
        this.filePath = filePath;
        this.type = type;
        this.points = 15;
        this.estimatedDuration = 10; // minutes
        this.icon = this.getIconForType(type);
    }

    getIconForType(type) {
        const iconMap = {
            'simulator': '🧮',
            'quiz': '❓',
            'flashcards': '🧠',
            'true-false': '✔️',
            'planner': '🎯',
            'detective': '🕵️',
            'manager': '📊',
            'wheel': '🎲',
            'map': '🗺️',
            'challenge': '🔍',
            'builder': '🏗️',
            'myths': '💡',
            'chain': '🔗'
        };
        return iconMap[type] || '🎮';
    }
}