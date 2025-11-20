/**
 * Leaderboard Component - UI for displaying user rankings and competition
 */
class Leaderboard {
    constructor(app) {
        this.app = app;
        this.currentPeriod = LeaderboardSystem.RANKING_PERIODS.ALL_TIME;
        this.currentCategory = LeaderboardSystem.RANKING_CATEGORIES.TOTAL_POINTS;
        this.isVisible = false;
        this.refreshInterval = null;
        
        this.init();
    }

    /**
     * Initialize leaderboard component
     */
    init() {
        this.createLeaderboardModal();
        this.setupEventListeners();
        
        // Auto-refresh every 30 seconds when visible
        this.refreshInterval = setInterval(() => {
            if (this.isVisible) {
                this.refreshLeaderboard();
            }
        }, 30000);
    }

    /**
     * Create leaderboard modal structure
     */
    createLeaderboardModal() {
        const modal = document.createElement('div');
        modal.id = 'leaderboard-modal';
        modal.className = 'leaderboard-modal';
        modal.innerHTML = `
            <div class="leaderboard-overlay" onclick="leaderboard.hide()"></div>
            <div class="leaderboard-content">
                <div class="leaderboard-header">
                    <h2>🏆 Tabla de Clasificación</h2>
                    <button class="close-btn" onclick="leaderboard.hide()">×</button>
                </div>
                
                <div class="leaderboard-controls">
                    <div class="period-selector">
                        <label>Período:</label>
                        <select id="period-select">
                            <option value="all_time">🏆 Todos los Tiempos</option>
                            <option value="monthly">📅 Este Mes</option>
                            <option value="weekly">📊 Esta Semana</option>
                            <option value="daily">⚡ Hoy</option>
                        </select>
                    </div>
                    
                    <div class="category-selector">
                        <label>Categoría:</label>
                        <select id="category-select">
                            <option value="total_points">⭐ Puntos Totales</option>
                            <option value="courses_completed">🎓 Cursos Completados</option>
                            <option value="current_streak">🔥 Racha Actual</option>
                            <option value="activities_completed">📚 Actividades</option>
                        </select>
                    </div>
                    
                    <button class="refresh-btn" onclick="leaderboard.refreshLeaderboard()">
                        🔄 Actualizar
                    </button>
                </div>
                
                <div class="leaderboard-stats">
                    <div class="stat-card">
                        <div class="stat-value" id="total-users">-</div>
                        <div class="stat-label">Usuarios Activos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="average-points">-</div>
                        <div class="stat-label">Promedio de Puntos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="top-score">-</div>
                        <div class="stat-label">Puntuación Máxima</div>
                    </div>
                </div>
                
                <div class="leaderboard-tabs">
                    <button class="tab-btn active" data-tab="rankings">🏆 Rankings</button>
                    <button class="tab-btn" data-tab="trending">📈 Tendencias</button>
                    <button class="tab-btn" data-tab="achievements">🏅 Logros</button>
                </div>
                
                <div class="leaderboard-body">
                    <div class="tab-content active" id="rankings-tab">
                        <div class="user-position" id="user-position">
                            <!-- User's current position will be displayed here -->
                        </div>
                        
                        <div class="rankings-list" id="rankings-list">
                            <!-- Rankings will be populated here -->
                        </div>
                    </div>
                    
                    <div class="tab-content" id="trending-tab">
                        <div class="trending-users" id="trending-users">
                            <!-- Trending users will be populated here -->
                        </div>
                    </div>
                    
                    <div class="tab-content" id="achievements-tab">
                        <div class="achievement-leaders" id="achievement-leaders">
                            <!-- Achievement leaders will be populated here -->
                        </div>
                    </div>
                </div>
                
                <div class="leaderboard-footer">
                    <div class="last-updated" id="last-updated">
                        Última actualización: <span>-</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.addLeaderboardStyles();
    }

    /**
     * Add CSS styles for leaderboard
     */
    addLeaderboardStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .leaderboard-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: none;
                align-items: center;
                justify-content: center;
            }

            .leaderboard-modal.show {
                display: flex;
            }

            .leaderboard-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
            }

            .leaderboard-content {
                position: relative;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 20px;
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                color: white;
            }

            .leaderboard-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 30px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }

            .leaderboard-header h2 {
                margin: 0;
                font-size: 24px;
                font-weight: bold;
            }

            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 30px;
                cursor: pointer;
                padding: 0;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.3s;
            }

            .close-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .leaderboard-controls {
                display: flex;
                gap: 20px;
                padding: 20px 30px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                flex-wrap: wrap;
                align-items: center;
            }

            .period-selector, .category-selector {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .period-selector label, .category-selector label {
                font-weight: 500;
                white-space: nowrap;
            }

            .period-selector select, .category-selector select {
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 8px;
                color: white;
                padding: 8px 12px;
                font-size: 14px;
            }

            .period-selector select option, .category-selector select option {
                background: #333;
                color: white;
            }

            .refresh-btn {
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 8px;
                color: white;
                padding: 8px 16px;
                cursor: pointer;
                font-size: 14px;
                transition: background 0.3s;
            }

            .refresh-btn:hover {
                background: rgba(255, 255, 255, 0.3);
            }

            .leaderboard-stats {
                display: flex;
                gap: 20px;
                padding: 20px 30px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }

            .stat-card {
                flex: 1;
                text-align: center;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 15px;
            }

            .stat-value {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 5px;
            }

            .stat-label {
                font-size: 12px;
                opacity: 0.8;
            }

            .leaderboard-tabs {
                display: flex;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }

            .tab-btn {
                flex: 1;
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.7);
                padding: 15px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s;
                border-bottom: 3px solid transparent;
            }

            .tab-btn.active {
                color: white;
                border-bottom-color: #ffd700;
                background: rgba(255, 255, 255, 0.1);
            }

            .leaderboard-body {
                height: 400px;
                overflow-y: auto;
                padding: 0;
            }

            .tab-content {
                display: none;
                padding: 20px 30px;
            }

            .tab-content.active {
                display: block;
            }

            .user-position {
                background: rgba(255, 215, 0, 0.2);
                border: 2px solid #ffd700;
                border-radius: 12px;
                padding: 15px;
                margin-bottom: 20px;
                text-align: center;
            }

            .user-position h3 {
                margin: 0 0 10px 0;
                color: #ffd700;
            }

            .ranking-item {
                display: flex;
                align-items: center;
                padding: 15px;
                margin-bottom: 10px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                transition: background 0.3s;
            }

            .ranking-item:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .ranking-item.current-user {
                background: rgba(255, 215, 0, 0.2);
                border: 1px solid #ffd700;
            }

            .ranking-item.clickable {
                cursor: pointer;
                position: relative;
            }

            .ranking-item.clickable:hover {
                background: rgba(255, 255, 255, 0.25);
                transform: translateY(-2px);
            }

            .compare-indicator {
                position: absolute;
                top: 5px;
                right: 10px;
                font-size: 10px;
                opacity: 0;
                transition: opacity 0.3s;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 2px 6px;
                border-radius: 4px;
            }

            .ranking-item.clickable:hover .compare-indicator {
                opacity: 1;
            }

            .rank-number {
                font-size: 20px;
                font-weight: bold;
                width: 40px;
                text-align: center;
                margin-right: 15px;
            }

            .rank-number.top-3 {
                color: #ffd700;
            }

            .user-info {
                flex: 1;
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 16px;
            }

            .user-details h4 {
                margin: 0;
                font-size: 16px;
            }

            .user-details p {
                margin: 5px 0 0 0;
                font-size: 12px;
                opacity: 0.8;
            }

            .user-stats {
                text-align: right;
            }

            .primary-stat {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 5px;
            }

            .secondary-stats {
                font-size: 12px;
                opacity: 0.8;
            }

            .trending-item {
                display: flex;
                align-items: center;
                padding: 15px;
                margin-bottom: 10px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                border-left: 4px solid #ff6b6b;
            }

            .trend-indicator {
                color: #ff6b6b;
                font-size: 20px;
                margin-right: 15px;
            }

            .leaderboard-footer {
                padding: 15px 30px;
                border-top: 1px solid rgba(255, 255, 255, 0.2);
                text-align: center;
                font-size: 12px;
                opacity: 0.8;
            }

            @media (max-width: 768px) {
                .leaderboard-content {
                    width: 95%;
                    margin: 20px;
                }

                .leaderboard-controls {
                    flex-direction: column;
                    gap: 15px;
                }

                .leaderboard-stats {
                    flex-direction: column;
                    gap: 10px;
                }

                .user-info {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Period and category selectors
        document.getElementById('period-select').addEventListener('change', (e) => {
            this.currentPeriod = e.target.value;
            this.refreshLeaderboard();
        });

        document.getElementById('category-select').addEventListener('change', (e) => {
            this.currentCategory = e.target.value;
            this.refreshLeaderboard();
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Listen for leaderboard updates
        window.addEventListener('leaderboardUpdate', () => {
            if (this.isVisible) {
                this.refreshLeaderboard();
            }
        });
    }

    /**
     * Show leaderboard modal
     */
    show() {
        const modal = document.getElementById('leaderboard-modal');
        modal.classList.add('show');
        this.isVisible = true;
        this.refreshLeaderboard();
    }

    /**
     * Hide leaderboard modal
     */
    hide() {
        const modal = document.getElementById('leaderboard-modal');
        modal.classList.remove('show');
        this.isVisible = false;
    }

    /**
     * Switch between tabs
     */
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Load tab-specific content
        switch (tabName) {
            case 'rankings':
                this.loadRankings();
                break;
            case 'trending':
                this.loadTrending();
                break;
            case 'achievements':
                this.loadAchievements();
                break;
        }
    }

    /**
     * Refresh leaderboard data
     */
    refreshLeaderboard() {
        this.loadStats();
        this.loadRankings();
        this.updateLastUpdated();
    }

    /**
     * Load leaderboard statistics
     */
    loadStats() {
        const stats = LeaderboardSystem.getLeaderboardStats(this.currentPeriod);
        
        document.getElementById('total-users').textContent = stats.totalUsers;
        document.getElementById('average-points').textContent = stats.averagePoints.toLocaleString();
        document.getElementById('top-score').textContent = stats.topScore.toLocaleString();
    }

    /**
     * Load rankings tab
     */
    loadRankings() {
        const leaderboard = LeaderboardSystem.getLeaderboard(this.currentPeriod, this.currentCategory, 20);
        const userPosition = LeaderboardSystem.getUserPosition(this.app.user.id, this.currentPeriod, this.currentCategory);
        
        // Update user position
        this.updateUserPosition(userPosition);
        
        // Update rankings list
        this.updateRankingsList(leaderboard.rankings);
    }

    /**
     * Update user position display
     */
    updateUserPosition(userPosition) {
        const container = document.getElementById('user-position');
        
        if (!userPosition.found) {
            container.innerHTML = `
                <h3>Tu Posición</h3>
                <p>No tienes actividad en este período</p>
            `;
            return;
        }

        const categoryInfo = LeaderboardSystem.getCategoryInfo(this.currentCategory);
        
        container.innerHTML = `
            <h3>Tu Posición: #${userPosition.rank}</h3>
            <p>Estás en el top ${userPosition.percentile}% de ${userPosition.totalUsers} usuarios</p>
            <div class="user-quick-stats">
                <span>${categoryInfo.icon} ${this.formatStatValue(userPosition.user, this.currentCategory)}</span>
            </div>
        `;
    }

    /**
     * Update rankings list
     */
    updateRankingsList(rankings) {
        const container = document.getElementById('rankings-list');
        
        if (rankings.length === 0) {
            container.innerHTML = '<p>No hay datos disponibles para este período</p>';
            return;
        }

        container.innerHTML = rankings.map(user => this.createRankingItem(user)).join('');
    }

    /**
     * Create ranking item HTML
     */
    createRankingItem(user) {
        const isCurrentUser = user.isCurrentUser;
        const isTop3 = user.rank <= 3;
        const primaryStat = this.formatStatValue(user, this.currentCategory);
        const clickHandler = isCurrentUser ? '' : `onclick="leaderboard.showUserComparison('${user.id}')"`;
        
        return `
            <div class="ranking-item ${isCurrentUser ? 'current-user' : 'clickable'}" ${clickHandler}>
                <div class="rank-number ${isTop3 ? 'top-3' : ''}">#${user.rank}</div>
                <div class="user-info">
                    <div class="user-avatar">${user.username.charAt(0).toUpperCase()}</div>
                    <div class="user-details">
                        <h4>${user.username} ${isCurrentUser ? '(Tú)' : ''}</h4>
                        <p>${user.achievements.length} logros • ${user.coursesCompleted} cursos</p>
                    </div>
                </div>
                <div class="user-stats">
                    <div class="primary-stat">${primaryStat}</div>
                    <div class="secondary-stats">
                        Racha: ${user.currentStreak} días<br>
                        Eficiencia: ${user.efficiency}%
                    </div>
                </div>
                ${!isCurrentUser ? '<div class="compare-indicator">👥 Click para comparar</div>' : ''}
            </div>
        `;
    }

    /**
     * Load trending users
     */
    loadTrending() {
        const trendingUsers = LeaderboardSystem.getTrendingUsers(10);
        const container = document.getElementById('trending-users');
        
        if (trendingUsers.length === 0) {
            container.innerHTML = '<p>No hay usuarios con actividad reciente</p>';
            return;
        }

        container.innerHTML = `
            <h3>📈 Usuarios en Tendencia</h3>
            <p>Usuarios con mayor actividad reciente</p>
            ${trendingUsers.map(user => `
                <div class="trending-item" onclick="leaderboard.showUserComparison('${user.id}')">
                    <div class="trend-indicator">🔥</div>
                    <div class="user-info">
                        <div class="user-avatar">${user.username.charAt(0).toUpperCase()}</div>
                        <div class="user-details">
                            <h4>${user.username}</h4>
                            <p>${user.totalPoints} puntos • ${user.totalActivities} actividades</p>
                        </div>
                    </div>
                    <div class="user-stats">
                        <div class="primary-stat">#${user.trendRank}</div>
                        <div class="secondary-stats">Tendencia</div>
                    </div>
                </div>
            `).join('')}
        `;
    }

    /**
     * Load achievement leaders
     */
    loadAchievements() {
        const users = LeaderboardSystem.getAllUsers();
        const achievementLeaders = users
            .sort((a, b) => b.achievements.length - a.achievements.length)
            .slice(0, 10);
        
        const container = document.getElementById('achievement-leaders');
        
        container.innerHTML = `
            <h3>🏅 Líderes en Logros</h3>
            <p>Usuarios con más logros desbloqueados</p>
            ${achievementLeaders.map((user, index) => `
                <div class="ranking-item ${user.id === this.app.user.id ? 'current-user' : ''}">
                    <div class="rank-number ${index < 3 ? 'top-3' : ''}">#${index + 1}</div>
                    <div class="user-info">
                        <div class="user-avatar">${user.username.charAt(0).toUpperCase()}</div>
                        <div class="user-details">
                            <h4>${user.username} ${user.id === this.app.user.id ? '(Tú)' : ''}</h4>
                            <p>${user.totalPoints} puntos • ${user.coursesCompleted} cursos</p>
                        </div>
                    </div>
                    <div class="user-stats">
                        <div class="primary-stat">🏅 ${user.achievements.length}</div>
                        <div class="secondary-stats">Logros</div>
                    </div>
                </div>
            `).join('')}
        `;
    }

    /**
     * Format stat value based on category
     */
    formatStatValue(user, category) {
        switch (category) {
            case LeaderboardSystem.RANKING_CATEGORIES.TOTAL_POINTS:
                return user.totalPoints.toLocaleString();
            case LeaderboardSystem.RANKING_CATEGORIES.COURSES_COMPLETED:
                return user.coursesCompleted;
            case LeaderboardSystem.RANKING_CATEGORIES.CURRENT_STREAK:
                return `${user.currentStreak} días`;
            case LeaderboardSystem.RANKING_CATEGORIES.ACTIVITIES_COMPLETED:
                return user.totalActivities;
            default:
                return user.totalPoints.toLocaleString();
        }
    }

    /**
     * Update last updated timestamp
     */
    updateLastUpdated() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        document.querySelector('#last-updated span').textContent = timeString;
    }

    /**
     * Show user comparison modal
     */
    showUserComparison(userId) {
        const comparison = LeaderboardSystem.compareUsers(this.app.user.id, userId);
        
        if (!comparison) {
            console.error('No se pudo comparar con el usuario');
            return;
        }

        const comparisonModal = document.createElement('div');
        comparisonModal.className = 'comparison-modal';
        comparisonModal.innerHTML = `
            <div class="comparison-overlay" onclick="this.parentElement.remove()"></div>
            <div class="comparison-content">
                <div class="comparison-header">
                    <h2>👥 Comparación de Usuarios</h2>
                    <button class="close-btn" onclick="this.closest('.comparison-modal').remove()">×</button>
                </div>
                
                <div class="comparison-body">
                    <div class="user-comparison">
                        <div class="comparison-user">
                            <div class="user-avatar">${comparison.user1.username.charAt(0).toUpperCase()}</div>
                            <h3>${comparison.user1.username} (Tú)</h3>
                            <div class="comparison-stats">
                                <div class="comp-stat">
                                    <span class="comp-value">${comparison.user1.totalPoints}</span>
                                    <span class="comp-label">Puntos</span>
                                </div>
                                <div class="comp-stat">
                                    <span class="comp-value">${comparison.user1.coursesCompleted}</span>
                                    <span class="comp-label">Cursos</span>
                                </div>
                                <div class="comp-stat">
                                    <span class="comp-value">${comparison.user1.currentStreak}</span>
                                    <span class="comp-label">Racha</span>
                                </div>
                                <div class="comp-stat">
                                    <span class="comp-value">${comparison.user1.achievements}</span>
                                    <span class="comp-label">Logros</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="comparison-vs">
                            <div class="vs-circle">VS</div>
                            <div class="comparison-differences">
                                <div class="diff-item ${comparison.comparison.pointsDifference >= 0 ? 'positive' : 'negative'}">
                                    ${comparison.comparison.pointsDifference >= 0 ? '+' : ''}${comparison.comparison.pointsDifference} puntos
                                </div>
                                <div class="diff-item ${comparison.comparison.coursesDifference >= 0 ? 'positive' : 'negative'}">
                                    ${comparison.comparison.coursesDifference >= 0 ? '+' : ''}${comparison.comparison.coursesDifference} cursos
                                </div>
                                <div class="diff-item ${comparison.comparison.streakDifference >= 0 ? 'positive' : 'negative'}">
                                    ${comparison.comparison.streakDifference >= 0 ? '+' : ''}${comparison.comparison.streakDifference} días racha
                                </div>
                                <div class="diff-item ${comparison.comparison.achievementsDifference >= 0 ? 'positive' : 'negative'}">
                                    ${comparison.comparison.achievementsDifference >= 0 ? '+' : ''}${comparison.comparison.achievementsDifference} logros
                                </div>
                            </div>
                        </div>
                        
                        <div class="comparison-user">
                            <div class="user-avatar">${comparison.user2.username.charAt(0).toUpperCase()}</div>
                            <h3>${comparison.user2.username}</h3>
                            <div class="comparison-stats">
                                <div class="comp-stat">
                                    <span class="comp-value">${comparison.user2.totalPoints}</span>
                                    <span class="comp-label">Puntos</span>
                                </div>
                                <div class="comp-stat">
                                    <span class="comp-value">${comparison.user2.coursesCompleted}</span>
                                    <span class="comp-label">Cursos</span>
                                </div>
                                <div class="comp-stat">
                                    <span class="comp-value">${comparison.user2.currentStreak}</span>
                                    <span class="comp-label">Racha</span>
                                </div>
                                <div class="comp-stat">
                                    <span class="comp-value">${comparison.user2.achievements}</span>
                                    <span class="comp-label">Logros</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(comparisonModal);
        this.addComparisonStyles();
    }

    /**
     * Add comparison modal styles
     */
    addComparisonStyles() {
        if (document.getElementById('comparison-styles')) return;

        const style = document.createElement('style');
        style.id = 'comparison-styles';
        style.textContent = `
            .comparison-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.8);
            }

            .comparison-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            .comparison-content {
                position: relative;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 20px;
                width: 90%;
                max-width: 700px;
                color: white;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }

            .comparison-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 30px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }

            .comparison-body {
                padding: 30px;
            }

            .user-comparison {
                display: flex;
                align-items: center;
                gap: 30px;
            }

            .comparison-user {
                flex: 1;
                text-align: center;
            }

            .comparison-user .user-avatar {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                font-weight: bold;
                margin: 0 auto 15px auto;
            }

            .comparison-user h3 {
                margin: 0 0 20px 0;
                font-size: 20px;
            }

            .comparison-stats {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }

            .comp-stat {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .comp-value {
                font-size: 18px;
                font-weight: bold;
            }

            .comp-label {
                font-size: 12px;
                opacity: 0.8;
            }

            .comparison-vs {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
            }

            .vs-circle {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 18px;
            }

            .comparison-differences {
                display: flex;
                flex-direction: column;
                gap: 8px;
                min-width: 120px;
            }

            .diff-item {
                padding: 5px 10px;
                border-radius: 6px;
                font-size: 12px;
                text-align: center;
                font-weight: bold;
            }

            .diff-item.positive {
                background: rgba(76, 175, 80, 0.3);
                color: #4caf50;
            }

            .diff-item.negative {
                background: rgba(244, 67, 54, 0.3);
                color: #f44336;
            }

            @media (max-width: 768px) {
                .user-comparison {
                    flex-direction: column;
                    gap: 20px;
                }

                .comparison-vs {
                    order: 2;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Cleanup
     */
    destroy() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
        
        const modal = document.getElementById('leaderboard-modal');
        if (modal) {
            modal.remove();
        }
    }
}

// Global leaderboard instance
window.leaderboard = null;