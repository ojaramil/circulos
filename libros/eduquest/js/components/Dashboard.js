/**
 * Dashboard Component - Main course selection interface
 */
class Dashboard {
    constructor(app) {
        this.app = app;
        this.container = document.getElementById('app');
        this.searchQuery = '';
        this.selectedCategory = 'all';
        this.sortBy = 'title';
    }

    /**
     * Render the dashboard
     */
    render() {
        if (!this.container) {
            console.error('App container not found');
            return;
        }

        this.container.innerHTML = this.getHTML();
        this.attachEventListeners();
        this.renderCourses();
    }

    /**
     * Get dashboard HTML structure
     */
    getHTML() {
        const userStats = this.app.getUserStats();
        
        return `
            <div class="dashboard">
                <header class="dashboard-header">
                    <div class="user-info">
                        <div class="user-avatar">
                            <span class="avatar-text">${this.app.user.username.charAt(0).toUpperCase()}</span>
                        </div>
                        <div class="user-details">
                            <h1 class="user-name">¡Hola, ${this.app.user.username}!</h1>
                            <p class="user-subtitle">Continúa tu aventura de aprendizaje</p>
                            ${this.app.user.email ? `<p class="user-email">${this.app.user.email}</p>` : ''}
                        </div>
                    </div>
                    
                    <div class="header-actions">
                        <button class="auth-button logout" id="logoutBtn" title="Cerrar Sesión">
                            <i class="fas fa-sign-out-alt"></i>
                            Salir
                        </button>
                    </div>
                    
                    <div class="user-stats">
                        <div class="stat-item">
                            <span class="stat-value">${userStats.totalPoints}</span>
                            <span class="stat-label">Puntos</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${userStats.completedCourses}</span>
                            <span class="stat-label">Cursos</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${userStats.currentStreak}</span>
                            <span class="stat-label">Racha</span>
                        </div>
                    </div>
                    
                    <nav class="main-nav">
                        <button class="nav-btn active" data-view="dashboard">
                            <span class="nav-icon">🏠</span>
                            Cursos
                        </button>
                        <button class="nav-btn" data-view="leaderboard">
                            <span class="nav-icon">🏆</span>
                            Ranking
                        </button>
                        <button class="nav-btn" data-view="profile">
                            <span class="nav-icon">👤</span>
                            Perfil
                        </button>
                    </nav>
                </header>

                <div class="dashboard-content">
                    ${this.getRecommendationsSection()}
                    
                    <div class="content-header">
                        <div class="section-title">
                            <h2>Todos los Cursos</h2>
                            <p>Explora nuestra colección completa de cursos interactivos</p>
                        </div>
                        
                        <div class="search-section">
                            <div class="search-box">
                                <input type="text" 
                                       id="course-search" 
                                       placeholder="Buscar cursos..." 
                                       value="${this.searchQuery}">
                                <span class="search-icon">🔍</span>
                            </div>
                            
                            <div class="filters">
                                <select id="category-filter">
                                    <option value="all">Todas las categorías</option>
                                    ${this.getCategoryOptions()}
                                </select>
                                
                                <select id="sort-filter">
                                    <option value="title">Ordenar por título</option>
                                    <option value="progress">Por progreso</option>
                                    <option value="recent">Más recientes</option>
                                    <option value="difficulty">Por dificultad</option>
                                    <option value="duration">Por duración</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="view-controls">
                            <button class="view-btn active" data-view="grid">
                                <span class="view-icon">⊞</span>
                                <span class="view-label">Grid</span>
                            </button>
                            <button class="view-btn" data-view="list">
                                <span class="view-icon">☰</span>
                                <span class="view-label">Lista</span>
                            </button>
                        </div>
                    </div>

                    <div class="courses-container">
                        <div class="courses-stats">
                            ${this.getCoursesStats()}
                        </div>
                        
                        <div id="courses-grid" class="courses-grid">
                            <!-- Courses will be rendered here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Get category options for filter
     */
    getCategoryOptions() {
        const categories = CourseMetadata.getAllCategories();
        
        return categories
            .map(category => `<option value="${category}">${category}</option>`)
            .join('');
    }

    /**
     * Render courses grid
     */
    renderCourses() {
        const coursesGrid = document.getElementById('courses-grid');
        if (!coursesGrid) return;

        const filteredCourses = this.getFilteredCourses();
        
        if (filteredCourses.length === 0) {
            coursesGrid.innerHTML = this.getEmptyState();
            return;
        }

        coursesGrid.innerHTML = filteredCourses
            .map(course => this.getCourseCardHTML(course))
            .join('');
    }

    /**
     * Get filtered and sorted courses
     */
    getFilteredCourses() {
        let courses;

        // Filter by search query
        if (this.searchQuery) {
            courses = CourseMetadata.searchCourses(this.searchQuery, this.app.courses);
        } else {
            courses = Array.from(this.app.courses.values());
        }

        // Filter by category
        if (this.selectedCategory !== 'all') {
            courses = CourseMetadata.filterByCategory(this.selectedCategory, new Map(courses.map(c => [c.id, c])));
        }

        // Sort courses
        courses = CourseMetadata.sortCourses(courses, this.sortBy, this.app.progressMap);

        return courses;
    }

    /**
     * Get course card HTML
     */
    getCourseCardHTML(course) {
        const progress = this.app.getProgress(course.id);
        const stats = course.getStats();
        const metadata = CourseMetadata.getMetadata(course.id);
        const completionPercentage = course.getCompletionPercentage(progress);
        const isCompleted = course.isCompleted(progress);
        
        return `
            <div class="course-card ${isCompleted ? 'completed' : ''}" 
                 data-course-id="${course.id}"
                 onclick="app.navigateToCourse('${course.id}')">
                
                <div class="course-thumbnail">
                    <div class="thumbnail-content" style="background: ${metadata.thumbnail?.gradient || metadata.thumbnail?.color || '#6C757D'}">
                        <span class="thumbnail-icon">${metadata.thumbnail?.icon || '📖'}</span>
                        <span class="thumbnail-text">${metadata.thumbnail?.initials || course.id}</span>
                    </div>
                    ${isCompleted ? '<div class="completion-badge">✓</div>' : ''}
                    <div class="difficulty-badge difficulty-${metadata.difficulty?.toLowerCase() || 'intermedio'}">
                        ${metadata.difficulty || 'Intermedio'}
                    </div>
                </div>
                
                <div class="course-info">
                    <div class="course-header">
                        <h3 class="course-title">${course.title}</h3>
                        <span class="course-author">por ${metadata.author || 'Autor Desconocido'}</span>
                        <span class="course-category">${course.category}</span>
                    </div>
                    
                    <p class="course-description">${course.description}</p>
                    
                    <div class="course-stats">
                        <div class="stat">
                            <span class="stat-icon">📄</span>
                            <span class="stat-text">${stats.totalLessons} lecciones</span>
                        </div>
                        <div class="stat">
                            <span class="stat-icon">🎮</span>
                            <span class="stat-text">${stats.totalGames} juegos</span>
                        </div>
                        <div class="stat">
                            <span class="stat-icon">⏱️</span>
                            <span class="stat-text">${Math.round(course.estimatedDuration / 60)}h</span>
                        </div>
                        <div class="stat">
                            <span class="stat-icon">⭐</span>
                            <span class="stat-text">${stats.totalPoints} puntos</span>
                        </div>
                    </div>
                    
                    ${metadata.tags && metadata.tags.length > 0 ? `
                    <div class="course-tags">
                        ${metadata.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    ` : ''}
                    
                    <div class="course-progress">
                        <div class="progress-info">
                            <span class="progress-text">${completionPercentage}% completado</span>
                            <span class="points-earned">+${progress.pointsEarned} puntos</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${completionPercentage}%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="course-actions">
                    <div class="action-buttons">
                        <button class="btn btn-outline btn-details" onclick="event.stopPropagation(); app.dashboard.showCourseDetails('${course.id}')">
                            <span class="btn-icon">ℹ️</span>
                            Detalles
                        </button>
                        ${this.getCourseActionButton(course, progress)}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Get course action button
     */
    getCourseActionButton(course, progress) {
        if (course.isCompleted(progress)) {
            return '<button class="btn btn-success">Completado</button>';
        } else if (progress.lastAccessedAt) {
            return '<button class="btn btn-primary">Continuar</button>';
        } else {
            return '<button class="btn btn-outline">Comenzar</button>';
        }
    }

    /**
     * Get empty state HTML
     */
    getEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-icon">📚</div>
                <h3>No se encontraron cursos</h3>
                <p>Intenta ajustar tus filtros de búsqueda</p>
                <button class="btn btn-primary" onclick="this.clearFilters()">
                    Limpiar filtros
                </button>
            </div>
        `;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('course-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.renderCourses();
            });
        }

        // Category filter
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.selectedCategory = e.target.value;
                this.renderCourses();
            });
        }

        // Sort filter
        const sortFilter = document.getElementById('sort-filter');
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.renderCourses();
            });
        }

        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.handleNavigation(view);
            });
        });

        // View controls
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.handleViewChange(view);
            });
        });

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }
    }

    /**
     * Handle navigation
     */
    handleNavigation(view) {
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        // Handle view change
        switch (view) {
            case 'dashboard':
                // Already on dashboard
                break;
            case 'leaderboard':
                if (window.leaderboard) {
                    window.leaderboard.show();
                } else {
                    console.warn('Leaderboard not initialized');
                }
                break;
            case 'profile':
                if (window.userProfile) {
                    window.userProfile.show();
                } else {
                    console.warn('User profile not initialized');
                }
                break;
        }
    }

    /**
     * Handle view change (grid/list)
     */
    handleViewChange(view) {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        const coursesGrid = document.getElementById('courses-grid');
        if (coursesGrid) {
            coursesGrid.className = view === 'list' ? 'courses-list' : 'courses-grid';
        }
    }

    /**
     * Get recommendations section HTML
     */
    getRecommendationsSection() {
        const recommendations = CourseMetadata.getRecommendations(
            this.app.user.id, 
            this.app.courses, 
            this.app.progressMap, 
            3
        );

        if (recommendations.length === 0) {
            return '';
        }

        return `
            <div class="recommendations-section">
                <div class="section-header">
                    <h2>Recomendado para ti</h2>
                    <p>Cursos seleccionados basados en tu progreso y preferencias</p>
                </div>
                
                <div class="recommendations-grid">
                    ${recommendations.map(course => this.getRecommendationCardHTML(course)).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Get recommendation card HTML
     */
    getRecommendationCardHTML(course) {
        const progress = this.app.getProgress(course.id);
        const metadata = CourseMetadata.getMetadata(course.id);
        const completionPercentage = course.getCompletionPercentage(progress);

        return `
            <div class="recommendation-card" onclick="app.navigateToCourse('${course.id}')">
                <div class="rec-thumbnail">
                    <div class="rec-thumbnail-content" style="background: ${metadata.thumbnail?.gradient}">
                        <span class="rec-icon">${metadata.thumbnail?.icon}</span>
                    </div>
                    <div class="rec-badge">Recomendado</div>
                </div>
                
                <div class="rec-info">
                    <h3 class="rec-title">${course.title}</h3>
                    <p class="rec-author">por ${metadata.author}</p>
                    <div class="rec-category">${course.category}</div>
                    
                    ${completionPercentage > 0 ? `
                    <div class="rec-progress">
                        <span class="rec-progress-text">${completionPercentage}% completado</span>
                        <div class="rec-progress-bar">
                            <div class="rec-progress-fill" style="width: ${completionPercentage}%"></div>
                        </div>
                    </div>
                    ` : `
                    <div class="rec-stats">
                        <span class="rec-stat">📄 ${course.lessons.length} lecciones</span>
                        <span class="rec-stat">🎮 ${course.games.length} juegos</span>
                    </div>
                    `}
                </div>
            </div>
        `;
    }

    /**
     * Get courses statistics HTML
     */
    getCoursesStats() {
        const filteredCourses = this.getFilteredCourses();
        const totalCourses = this.app.courses.size;
        const completedCourses = Array.from(this.app.progressMap.values())
            .filter(progress => progress.completedAt !== null).length;
        
        const categories = new Map();
        filteredCourses.forEach(course => {
            categories.set(course.category, (categories.get(course.category) || 0) + 1);
        });

        return `
            <div class="courses-stats-bar">
                <div class="stats-item">
                    <span class="stats-number">${filteredCourses.length}</span>
                    <span class="stats-label">cursos mostrados</span>
                </div>
                <div class="stats-item">
                    <span class="stats-number">${totalCourses}</span>
                    <span class="stats-label">total disponibles</span>
                </div>
                <div class="stats-item">
                    <span class="stats-number">${completedCourses}</span>
                    <span class="stats-label">completados</span>
                </div>
                <div class="stats-item">
                    <span class="stats-number">${categories.size}</span>
                    <span class="stats-label">categorías</span>
                </div>
            </div>
        `;
    }

    /**
     * Clear all filters
     */
    clearFilters() {
        this.searchQuery = '';
        this.selectedCategory = 'all';
        this.sortBy = 'title';
        
        // Update UI
        const searchInput = document.getElementById('course-search');
        const categoryFilter = document.getElementById('category-filter');
        const sortFilter = document.getElementById('sort-filter');
        
        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = 'all';
        if (sortFilter) sortFilter.value = 'title';
        
        this.renderCourses();
    }

    /**
     * Show course details modal
     */
    showCourseDetails(courseId) {
        const course = this.app.getCourse(courseId);
        const progress = this.app.getProgress(courseId);
        const metadata = CourseMetadata.getMetadata(courseId);
        
        if (!course) return;

        const modal = document.createElement('div');
        modal.className = 'course-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${course.title}</h2>
                    <button class="modal-close" onclick="this.closest('.course-modal').remove()">×</button>
                </div>
                
                <div class="modal-body">
                    <div class="course-details">
                        <div class="detail-thumbnail">
                            <div class="detail-thumbnail-content" style="background: ${metadata.thumbnail?.gradient}">
                                <span class="detail-icon">${metadata.thumbnail?.icon}</span>
                            </div>
                        </div>
                        
                        <div class="detail-info">
                            <p class="detail-author">por ${metadata.author}</p>
                            <div class="detail-meta">
                                <span class="detail-category">${course.category}</span>
                                <span class="detail-difficulty">${metadata.difficulty}</span>
                                <span class="detail-duration">${Math.round(course.estimatedDuration / 60)}h</span>
                            </div>
                            
                            <p class="detail-description">${course.description}</p>
                            
                            ${metadata.tags ? `
                            <div class="detail-tags">
                                ${metadata.tags.map(tag => `<span class="detail-tag">${tag}</span>`).join('')}
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="course-content-preview">
                        <div class="content-section">
                            <h3>📄 Lecciones (${course.lessons.length})</h3>
                            <ul class="content-list">
                                ${course.lessons.slice(0, 5).map(lesson => `
                                    <li class="content-item ${progress.isLessonCompleted(lesson.id) ? 'completed' : ''}">
                                        <span class="content-icon">${lesson.icon}</span>
                                        <span class="content-title">${lesson.title}</span>
                                        ${progress.isLessonCompleted(lesson.id) ? '<span class="content-check">✓</span>' : ''}
                                    </li>
                                `).join('')}
                                ${course.lessons.length > 5 ? `<li class="content-more">... y ${course.lessons.length - 5} más</li>` : ''}
                            </ul>
                        </div>
                        
                        <div class="content-section">
                            <h3>🎮 Juegos y Actividades (${course.games.length})</h3>
                            <ul class="content-list">
                                ${course.games.slice(0, 5).map(game => `
                                    <li class="content-item ${progress.isGameCompleted(game.id) ? 'completed' : ''}">
                                        <span class="content-icon">${game.icon}</span>
                                        <span class="content-title">${game.title}</span>
                                        ${progress.isGameCompleted(game.id) ? '<span class="content-check">✓</span>' : ''}
                                    </li>
                                `).join('')}
                                ${course.games.length > 5 ? `<li class="content-more">... y ${course.games.length - 5} más</li>` : ''}
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <div class="progress-summary">
                        <span class="progress-label">${course.getCompletionPercentage(progress)}% completado</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${course.getCompletionPercentage(progress)}%"></div>
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-outline" onclick="this.closest('.course-modal').remove()">
                            Cerrar
                        </button>
                        <button class="btn btn-primary" onclick="app.navigateToCourse('${courseId}'); this.closest('.course-modal').remove();">
                            ${progress.lastAccessedAt ? 'Continuar Curso' : 'Comenzar Curso'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Add animation
        setTimeout(() => modal.classList.add('show'), 10);
    }

    /**
     * Handle user logout
     */
    handleLogout() {
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            console.log('🚪 Logging out user...');
            
            if (window.authSystem) {
                window.authSystem.logout();
            } else {
                console.error('❌ Auth system not available');
                // Fallback: reload page
                location.reload();
            }
        }
    }}
