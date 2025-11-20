/**
 * Course Viewer Component - Enhanced course interface with gamification
 */
class CourseViewer {
    constructor(app, courseId) {
        this.app = app;
        this.courseId = courseId;
        this.course = null;
        this.progress = null;
        this.metadata = null;
        this.currentContent = null;
        this.currentContentType = null; // 'lesson' or 'game'
        this.container = document.getElementById('app');
        this.sessionStartTime = Date.now();
        this.contentStartTime = null;
    }

    /**
     * Initialize the course viewer
     */
    async init() {
        try {
            console.log('🚀 Initializing CourseViewer...');
            console.log(`🔍 Course ID: ${this.courseId}`);
            
            // Load course data
            this.course = this.app.getCourse(this.courseId);
            this.progress = this.app.getProgress(this.courseId);
            this.metadata = CourseMetadata.getMetadata(this.courseId);

            console.log('📊 Course data:', this.course);
            console.log('📈 Progress data:', this.progress);
            console.log('📋 Metadata:', this.metadata);

            if (!this.course) {
                throw new Error(`Course ${this.courseId} not found`);
            }

            console.log(`📚 Course loaded: ${this.course.title}`);
            console.log(`📄 Lessons: ${this.course.lessons.length}`);
            console.log(`🎮 Games: ${this.course.games.length}`);

            // Update last accessed time
            this.progress.lastAccessedAt = new Date().toISOString();
            this.progress.save();

            // Render the interface
            this.render();
            
            // Load initial content
            this.loadInitialContent();

            console.log(`✅ Course viewer initialized for: ${this.course.title}`);
        } catch (error) {
            console.error('❌ Failed to initialize course viewer:', error);
            console.error('Error details:', error);
            this.showError('Error al cargar el curso: ' + error.message);
        }
    }

    /**
     * Render the course viewer interface
     */
    render() {
        if (!this.container) {
            console.error('App container not found');
            return;
        }

        this.container.innerHTML = this.getHTML();
        this.attachEventListeners();
        this.updateProgressDisplay();
    }

    /**
     * Get course viewer HTML structure
     */
    getHTML() {
        const completionPercentage = this.course.getCompletionPercentage(this.progress);
        const isCompleted = this.course.isCompleted(this.progress);

        return `
            <div class="course-viewer">
                <header class="course-header">
                    <div class="header-content">
                        <div class="course-info">
                            <button class="back-btn" onclick="window.history.back()">
                                <span class="back-icon">←</span>
                                Volver
                            </button>
                            
                            <div class="course-title-section">
                                <div class="course-thumbnail-small">
                                    <div class="thumbnail-content-small" style="background: ${this.metadata.thumbnail?.gradient}">
                                        <span class="thumbnail-icon-small">${this.metadata.thumbnail?.icon}</span>
                                    </div>
                                </div>
                                
                                <div class="title-info">
                                    <h1 class="course-title">${this.course.title}</h1>
                                    <p class="course-author">por ${this.metadata.author}</p>
                                    <span class="course-category">${this.course.category}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="course-stats">
                            <div class="stat-item">
                                <span class="stat-value">${this.progress.pointsEarned}</span>
                                <span class="stat-label">Puntos</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${completionPercentage}%</span>
                                <span class="stat-label">Progreso</span>
                            </div>
                            <div class="stat-item ${isCompleted ? 'completed' : ''}">
                                <span class="stat-value">${isCompleted ? '✓' : '○'}</span>
                                <span class="stat-label">${isCompleted ? 'Completado' : 'En Progreso'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="progress-section">
                        <div class="progress-info">
                            <span class="progress-text">Progreso del curso: ${completionPercentage}%</span>
                            <span class="activities-completed">
                                ${this.progress.lessonsCompleted.size + this.progress.gamesCompleted.size} de ${this.course.lessons.length + this.course.games.length} actividades
                            </span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${completionPercentage}%"></div>
                            </div>
                        </div>
                    </div>
                </header>

                <div class="course-layout">
                    <div class="sidebars-container">
                        <aside class="lessons-sidebar">
                            <div class="sidebar-header">
                                <h3>📄 Lecciones</h3>
                                <span class="content-count">${this.course.lessons.length}</span>
                            </div>
                            <ul class="content-list">
                                ${this.course.lessons.map(lesson => this.getLessonItemHTML(lesson)).join('')}
                            </ul>
                            
                            ${this.course.lessons.length === 0 ? '<div class="no-content">No hay lecciones disponibles</div>' : ''}
                        </aside>
                        
                        <aside class="games-sidebar">
                            <div class="sidebar-header">
                                <h3>🎮 Juegos y Actividades</h3>
                                <span class="content-count">${this.course.games.length}</span>
                            </div>
                            <ul class="content-list">
                                ${this.course.games.map(game => this.getGameItemHTML(game)).join('')}
                            </ul>
                            
                            ${this.course.games.length === 0 ? '<div class="no-content">No hay juegos disponibles</div>' : ''}
                        </aside>
                    </div>
                    
                    <main class="content-area">
                        <div class="content-header">
                            <div class="content-title-section">
                                <h2 id="content-title">Selecciona una lección o actividad</h2>
                                <div class="content-meta">
                                    <span id="content-type" class="content-type"></span>
                                    <span id="content-points" class="content-points"></span>
                                </div>
                            </div>
                            
                            <div class="content-actions">
                                <button id="mark-complete-btn" class="btn btn-success" style="display: none;">
                                    <span class="btn-icon">✓</span>
                                    Marcar como Completado
                                </button>
                                <button id="content-hint-btn" class="btn btn-outline">
                                    <span class="btn-icon">💡</span>
                                    Ayuda
                                </button>
                            </div>
                        </div>
                        
                        <div class="content-container">
                            <iframe id="content-frame" src="" frameborder="0"></iframe>
                            <div id="content-placeholder" class="content-placeholder">
                                <div class="placeholder-content">
                                    <div class="placeholder-icon">📚</div>
                                    <h3>¡Bienvenido al curso!</h3>
                                    <p>Selecciona una lección o actividad del menú lateral para comenzar tu aprendizaje.</p>
                                    <div class="quick-stats">
                                        <div class="quick-stat">
                                            <span class="quick-stat-number">${this.course.lessons.length}</span>
                                            <span class="quick-stat-label">Lecciones</span>
                                        </div>
                                        <div class="quick-stat">
                                            <span class="quick-stat-number">${this.course.games.length}</span>
                                            <span class="quick-stat-label">Juegos</span>
                                        </div>
                                        <div class="quick-stat">
                                            <span class="quick-stat-number">${this.course.totalPoints}</span>
                                            <span class="quick-stat-label">Puntos Totales</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                
                <!-- Achievement Notification -->
                <div id="achievement-notification" class="achievement-notification">
                    <div class="achievement-content">
                        <div class="achievement-icon">🏆</div>
                        <div class="achievement-text">
                            <h4 class="achievement-title"></h4>
                            <p class="achievement-description"></p>
                        </div>
                        <div class="achievement-points"></div>
                    </div>
                </div>
                
                <!-- Point Notification -->
                <div id="point-notification" class="point-notification">
                    <div class="point-content">
                        <span class="point-icon">⭐</span>
                        <span class="point-text"></span>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Get lesson item HTML
     */
    getLessonItemHTML(lesson) {
        const isCompleted = this.progress.isLessonCompleted(lesson.id);
        const isUnlocked = this.isContentUnlocked(lesson, 'lesson');
        
        return `
            <li class="content-item ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}" 
                data-content-id="${lesson.id}" 
                data-content-type="lesson">
                <div class="item-content" ${isUnlocked ? `onclick="courseViewer.loadContent('${lesson.id}', 'lesson')"` : ''}>
                    <span class="item-icon">${isCompleted ? '✅' : (isUnlocked ? lesson.icon : '🔒')}</span>
                    <div class="item-info">
                        <span class="item-title">${lesson.title}</span>
                        <span class="item-meta">
                            <span class="item-points">+${lesson.points} puntos</span>
                            <span class="item-duration">${lesson.estimatedDuration} min</span>
                        </span>
                    </div>
                    ${isCompleted ? '<span class="completion-check">✓</span>' : ''}
                </div>
                ${!isUnlocked ? '<div class="unlock-hint">Completa las actividades anteriores</div>' : ''}
            </li>
        `;
    }

    /**
     * Get game item HTML
     */
    getGameItemHTML(game) {
        const isCompleted = this.progress.isGameCompleted(game.id);
        const isUnlocked = this.isContentUnlocked(game, 'game');
        
        return `
            <li class="content-item ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}" 
                data-content-id="${game.id}" 
                data-content-type="game">
                <div class="item-content" ${isUnlocked ? `onclick="courseViewer.loadContent('${game.id}', 'game')"` : ''}>
                    <span class="item-icon">${isCompleted ? '✅' : (isUnlocked ? game.icon : '🔒')}</span>
                    <div class="item-info">
                        <span class="item-title">${game.title}</span>
                        <span class="item-meta">
                            <span class="item-points">+${game.points} puntos</span>
                            <span class="item-duration">${game.estimatedDuration} min</span>
                        </span>
                    </div>
                    ${isCompleted ? '<span class="completion-check">✓</span>' : ''}
                </div>
                ${!isUnlocked ? '<div class="unlock-hint">Completa las actividades anteriores</div>' : ''}
            </li>
        `;
    }

    /**
     * Check if content is unlocked based on progress
     */
    isContentUnlocked(content, type) {
        // For now, all content is unlocked
        // In future versions, we can implement sequential unlocking
        return true;
    }

    /**
     * Load initial content
     */
    loadInitialContent() {
        // Try to load the next incomplete lesson or game
        const nextActivity = this.course.getNextActivity(this.progress);
        
        if (nextActivity) {
            const contentType = this.course.lessons.includes(nextActivity) ? 'lesson' : 'game';
            this.loadContent(nextActivity.id, contentType);
        }
    }

    /**
     * Load content in iframe
     */
    loadContent(contentId, contentType) {
        try {
            const content = contentType === 'lesson' 
                ? this.course.getLessonById(contentId)
                : this.course.getGameById(contentId);

            if (!content) {
                throw new Error(`Content ${contentId} not found`);
            }

            this.currentContent = content;
            this.currentContentType = contentType;
            this.contentStartTime = Date.now();

            // Update UI
            this.updateContentHeader(content, contentType);
            this.updateActiveItem(contentId, contentType);
            
            // Load content in iframe
            const iframe = document.getElementById('content-frame');
            const placeholder = document.getElementById('content-placeholder');
            
            if (iframe && placeholder) {
                placeholder.style.display = 'none';
                iframe.style.display = 'block';
                iframe.src = content.filePath;
                
                // Handle iframe load
                iframe.onload = () => {
                    console.log(`📖 Loaded ${contentType}: ${content.title}`);
                    this.onContentLoaded();
                };
                
                iframe.onerror = () => {
                    console.error(`Failed to load ${contentType}: ${content.title}`);
                    this.showContentError();
                };
            }

        } catch (error) {
            console.error('Error loading content:', error);
            this.showContentError();
        }
    }

    /**
     * Update content header
     */
    updateContentHeader(content, contentType) {
        const titleElement = document.getElementById('content-title');
        const typeElement = document.getElementById('content-type');
        const pointsElement = document.getElementById('content-points');
        const markCompleteBtn = document.getElementById('mark-complete-btn');

        if (titleElement) titleElement.textContent = content.title;
        if (typeElement) {
            typeElement.textContent = contentType === 'lesson' ? '📄 Lección' : '🎮 Actividad';
            typeElement.className = `content-type ${contentType}`;
        }
        if (pointsElement) pointsElement.textContent = `+${content.points} puntos`;

        // Show/hide mark complete button
        const isCompleted = contentType === 'lesson' 
            ? this.progress.isLessonCompleted(content.id)
            : this.progress.isGameCompleted(content.id);

        if (markCompleteBtn) {
            if (isCompleted) {
                markCompleteBtn.style.display = 'none';
            } else {
                markCompleteBtn.style.display = 'flex';
                markCompleteBtn.onclick = () => this.markContentComplete();
            }
        }
    }

    /**
     * Update active item in sidebar
     */
    updateActiveItem(contentId, contentType) {
        // Remove previous active states
        document.querySelectorAll('.content-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active state to current item
        const activeItem = document.querySelector(`[data-content-id="${contentId}"][data-content-type="${contentType}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    /**
     * Handle content loaded
     */
    onContentLoaded() {
        // Add time tracking
        if (this.contentStartTime) {
            const timeSpent = Math.round((Date.now() - this.contentStartTime) / 1000 / 60); // minutes
            this.progress.addTimeSpent(timeSpent);
        }
    }

    /**
     * Mark current content as complete
     */
    markContentComplete() {
        if (!this.currentContent || !this.currentContentType) return;

        const wasCompleted = this.currentContentType === 'lesson'
            ? this.progress.isLessonCompleted(this.currentContent.id)
            : this.progress.isGameCompleted(this.currentContent.id);

        if (wasCompleted) return;

        // Mark as complete with user context for bonus calculations
        if (this.currentContentType === 'lesson') {
            this.progress.markLessonComplete(this.currentContent.id, this.app.user);
        } else {
            this.progress.markGameComplete(this.currentContent.id, this.app.user);
        }

        // Update course progress
        this.progress.updateCompletionPercentage(this.course);

        // Check for course completion
        if (this.course.isCompleted(this.progress)) {
            this.app.user.completeCourse();
            
            // Calculate course completion bonus
            if (typeof BonusPointSystem !== 'undefined') {
                const bonusResult = BonusPointSystem.calculateCourseCompletionBonusComprehensive({
                    progress: this.progress,
                    course: this.course,
                    currentStreak: this.app.user.currentStreak,
                    completionTime: new Date(),
                    totalTimeSpent: this.progress.timeSpent
                });
                
                if (bonusResult.totalBonusPoints > 0) {
                    this.app.user.addPoints(bonusResult.totalBonusPoints);
                }
            }
            
            // Check for achievements
            if (typeof AchievementSystem !== 'undefined') {
                const context = AchievementSystem.generateContext(this.app.user, this.app.progressMap, this.app.courses);
                const newAchievements = AchievementSystem.checkAchievements(this.app.user, this.app.progressMap, context);
                
                // Show new achievements with delay
                newAchievements.forEach((achievement, index) => {
                    setTimeout(() => {
                        if (window.notificationSystem) {
                            window.notificationSystem.showAchievementNotification(achievement);
                        }
                    }, (index + 1) * 2000);
                });
            }
        } else {
            // Check for achievements on regular activity completion
            if (typeof AchievementSystem !== 'undefined') {
                const context = AchievementSystem.generateContext(this.app.user, this.app.progressMap, this.app.courses);
                const newAchievements = AchievementSystem.checkAchievements(this.app.user, this.app.progressMap, context);
                
                newAchievements.forEach((achievement, index) => {
                    setTimeout(() => {
                        if (window.notificationSystem) {
                            window.notificationSystem.showAchievementNotification(achievement);
                        }
                    }, (index + 1) * 1000);
                });
            }
        }

        // Update UI
        this.updateProgressDisplay();
        this.updateActiveItem(this.currentContent.id, this.currentContentType);
        
        // Hide mark complete button
        const markCompleteBtn = document.getElementById('mark-complete-btn');
        if (markCompleteBtn) {
            markCompleteBtn.style.display = 'none';
        }

        console.log(`✅ Marked ${this.currentContentType} "${this.currentContent.title}" as complete (+${pointsEarned} points)`);
    }

    /**
     * Update progress display
     */
    updateProgressDisplay() {
        const completionPercentage = this.course.getCompletionPercentage(this.progress);
        const isCompleted = this.course.isCompleted(this.progress);

        // Update header stats
        const statValues = document.querySelectorAll('.stat-value');
        if (statValues.length >= 3) {
            statValues[0].textContent = this.progress.pointsEarned;
            statValues[1].textContent = `${completionPercentage}%`;
            statValues[2].textContent = isCompleted ? '✓' : '○';
            
            const completionStat = statValues[2].closest('.stat-item');
            if (completionStat) {
                completionStat.classList.toggle('completed', isCompleted);
                const label = completionStat.querySelector('.stat-label');
                if (label) label.textContent = isCompleted ? 'Completado' : 'En Progreso';
            }
        }

        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${completionPercentage}%`;
        }

        // Update progress text
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `Progreso del curso: ${completionPercentage}%`;
        }

        const activitiesCompleted = document.querySelector('.activities-completed');
        if (activitiesCompleted) {
            const completed = this.progress.lessonsCompleted.size + this.progress.gamesCompleted.size;
            const total = this.course.lessons.length + this.course.games.length;
            activitiesCompleted.textContent = `${completed} de ${total} actividades`;
        }

        // Update sidebar items
        this.updateSidebarItems();
    }

    /**
     * Update sidebar items completion status
     */
    updateSidebarItems() {
        // Update lesson items
        this.course.lessons.forEach(lesson => {
            const item = document.querySelector(`[data-content-id="${lesson.id}"][data-content-type="lesson"]`);
            if (item) {
                const isCompleted = this.progress.isLessonCompleted(lesson.id);
                item.classList.toggle('completed', isCompleted);
                
                const icon = item.querySelector('.item-icon');
                const check = item.querySelector('.completion-check');
                
                if (icon) icon.textContent = isCompleted ? '✅' : lesson.icon;
                if (check) check.style.display = isCompleted ? 'block' : 'none';
            }
        });

        // Update game items
        this.course.games.forEach(game => {
            const item = document.querySelector(`[data-content-id="${game.id}"][data-content-type="game"]`);
            if (item) {
                const isCompleted = this.progress.isGameCompleted(game.id);
                item.classList.toggle('completed', isCompleted);
                
                const icon = item.querySelector('.item-icon');
                const check = item.querySelector('.completion-check');
                
                if (icon) icon.textContent = isCompleted ? '✅' : game.icon;
                if (check) check.style.display = isCompleted ? 'block' : 'none';
            }
        });
    }

    /**
     * Show point notification
     */
    showPointNotification(points) {
        const notification = document.getElementById('point-notification');
        const pointText = notification.querySelector('.point-text');
        
        if (notification && pointText) {
            pointText.textContent = `+${points} puntos`;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }

    /**
     * Show achievement notification
     */
    showAchievementNotification(title, description, points) {
        const notification = document.getElementById('achievement-notification');
        const titleElement = notification.querySelector('.achievement-title');
        const descElement = notification.querySelector('.achievement-description');
        const pointsElement = notification.querySelector('.achievement-points');
        
        if (notification && titleElement && descElement && pointsElement) {
            titleElement.textContent = title;
            descElement.textContent = description;
            pointsElement.textContent = `+${points} puntos`;
            
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 5000);
        }
    }

    /**
     * Show content error
     */
    showContentError() {
        const iframe = document.getElementById('content-frame');
        const placeholder = document.getElementById('content-placeholder');
        
        if (iframe && placeholder) {
            iframe.style.display = 'none';
            placeholder.style.display = 'flex';
            
            const placeholderContent = placeholder.querySelector('.placeholder-content');
            if (placeholderContent) {
                placeholderContent.innerHTML = `
                    <div class="placeholder-icon">⚠️</div>
                    <h3>Error al cargar el contenido</h3>
                    <p>No se pudo cargar el contenido solicitado. Por favor, intenta de nuevo.</p>
                    <button class="btn btn-primary" onclick="location.reload()">Recargar</button>
                `;
            }
        }
    }

    /**
     * Show general error
     */
    showError(message) {
        this.container.innerHTML = `
            <div class="error-screen">
                <div class="error-content">
                    <h2>⚠️ Error</h2>
                    <p>${message}</p>
                    <button onclick="window.history.back()" class="btn btn-primary">Volver</button>
                </div>
            </div>
        `;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Handle window beforeunload to save progress
        window.addEventListener('beforeunload', () => {
            if (this.contentStartTime) {
                const timeSpent = Math.round((Date.now() - this.contentStartTime) / 1000 / 60);
                this.progress.addTimeSpent(timeSpent);
            }
        });

        // Handle visibility change for time tracking
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.contentStartTime) {
                const timeSpent = Math.round((Date.now() - this.contentStartTime) / 1000 / 60);
                this.progress.addTimeSpent(timeSpent);
                this.contentStartTime = Date.now(); // Reset for when user returns
            }
        });
    }
}