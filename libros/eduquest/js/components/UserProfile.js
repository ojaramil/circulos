/**
 * User Profile Component - Comprehensive user profile and statistics dashboard
 */
class UserProfile {
    constructor(app) {
        this.app = app;
        this.isVisible = false;
        this.currentTab = 'overview';
        this.charts = {};
        
        this.init();
    }

    /**
     * Initialize user profile component
     */
    init() {
        this.createProfileModal();
        this.setupEventListeners();
    }

    /**
     * Create profile modal structure
     */
    createProfileModal() {
        const modal = document.createElement('div');
        modal.id = 'profile-modal';
        modal.className = 'profile-modal';
        modal.innerHTML = `
            <div class="profile-overlay" onclick="userProfile.hide()"></div>
            <div class="profile-content">
                <div class="profile-header">
                    <div class="profile-user-info">
                        <div class="profile-avatar">
                            <span class="avatar-text">${this.app.user.username.charAt(0).toUpperCase()}</span>
                        </div>
                        <div class="profile-details">
                            <h2>${this.app.user.username}</h2>
                            <p class="profile-subtitle">Miembro desde ${new Date(this.app.user.createdAt).toLocaleDateString('es-ES')}</p>
                            <div class="profile-quick-stats">
                                <span class="quick-stat">
                                    <span class="stat-icon">⭐</span>
                                    <span class="stat-value">${this.app.user.totalPoints}</span>
                                    <span class="stat-label">Puntos</span>
                                </span>
                                <span class="quick-stat">
                                    <span class="stat-icon">🎓</span>
                                    <span class="stat-value">${this.app.user.coursesCompleted}</span>
                                    <span class="stat-label">Cursos</span>
                                </span>
                                <span class="quick-stat">
                                    <span class="stat-icon">🔥</span>
                                    <span class="stat-value">${this.app.user.currentStreak}</span>
                                    <span class="stat-label">Racha</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <button class="close-btn" onclick="userProfile.hide()">×</button>
                </div>
                
                <div class="profile-tabs">
                    <button class="profile-tab-btn active" data-tab="overview">📊 Resumen</button>
                    <button class="profile-tab-btn" data-tab="achievements">🏆 Logros</button>
                    <button class="profile-tab-btn" data-tab="progress">📈 Progreso</button>
                    <button class="profile-tab-btn" data-tab="history">📚 Historial</button>
                    <button class="profile-tab-btn" data-tab="settings">⚙️ Configuración</button>
                </div>
                
                <div class="profile-body">
                    <div class="profile-tab-content active" id="overview-tab">
                        <!-- Overview content will be populated here -->
                    </div>
                    
                    <div class="profile-tab-content" id="achievements-tab">
                        <!-- Achievements content will be populated here -->
                    </div>
                    
                    <div class="profile-tab-content" id="progress-tab">
                        <!-- Progress content will be populated here -->
                    </div>
                    
                    <div class="profile-tab-content" id="history-tab">
                        <!-- History content will be populated here -->
                    </div>
                    
                    <div class="profile-tab-content" id="settings-tab">
                        <!-- Settings content will be populated here -->
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.addProfileStyles();
    }

    /**
     * Add CSS styles for profile
     */
    addProfileStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .profile-modal {
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

            .profile-modal.show {
                display: flex;
            }

            .profile-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
            }

            .profile-content {
                position: relative;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 20px;
                width: 90%;
                max-width: 900px;
                max-height: 90vh;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                color: white;
            }

            .profile-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 30px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }

            .profile-user-info {
                display: flex;
                align-items: center;
                gap: 20px;
            }

            .profile-avatar {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                font-weight: bold;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            }

            .profile-details h2 {
                margin: 0 0 5px 0;
                font-size: 28px;
                font-weight: bold;
            }

            .profile-subtitle {
                margin: 0 0 15px 0;
                opacity: 0.8;
                font-size: 14px;
            }

            .profile-quick-stats {
                display: flex;
                gap: 20px;
            }

            .quick-stat {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                min-width: 60px;
            }

            .stat-icon {
                font-size: 20px;
                margin-bottom: 5px;
            }

            .stat-value {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 2px;
            }

            .stat-label {
                font-size: 11px;
                opacity: 0.8;
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

            .profile-tabs {
                display: flex;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                overflow-x: auto;
            }

            .profile-tab-btn {
                flex: 1;
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.7);
                padding: 15px 10px;
                cursor: pointer;
                font-size: 13px;
                transition: all 0.3s;
                border-bottom: 3px solid transparent;
                white-space: nowrap;
                min-width: 120px;
            }

            .profile-tab-btn.active {
                color: white;
                border-bottom-color: #ffd700;
                background: rgba(255, 255, 255, 0.1);
            }

            .profile-body {
                height: 500px;
                overflow-y: auto;
            }

            .profile-tab-content {
                display: none;
                padding: 30px;
            }

            .profile-tab-content.active {
                display: block;
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }

            .stat-card {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                padding: 20px;
                text-align: center;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .stat-card-icon {
                font-size: 32px;
                margin-bottom: 10px;
                display: block;
            }

            .stat-card-value {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 5px;
                display: block;
            }

            .stat-card-label {
                font-size: 14px;
                opacity: 0.8;
            }

            .achievements-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 15px;
                margin-bottom: 20px;
            }

            .achievement-card {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 15px;
                text-align: center;
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: transform 0.3s, background 0.3s;
            }

            .achievement-card:hover {
                transform: translateY(-2px);
                background: rgba(255, 255, 255, 0.15);
            }

            .achievement-card.locked {
                opacity: 0.5;
                background: rgba(255, 255, 255, 0.05);
            }

            .achievement-icon {
                font-size: 32px;
                margin-bottom: 10px;
                display: block;
            }

            .achievement-name {
                font-weight: bold;
                margin-bottom: 5px;
                font-size: 14px;
            }

            .achievement-description {
                font-size: 12px;
                opacity: 0.8;
                margin-bottom: 8px;
            }

            .achievement-points {
                background: rgba(255, 215, 0, 0.2);
                color: #ffd700;
                padding: 4px 8px;
                border-radius: 6px;
                font-size: 11px;
                font-weight: bold;
            }

            .progress-chart {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 20px;
                height: 300px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .course-history {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }

            .history-item {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .history-icon {
                font-size: 24px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .history-details {
                flex: 1;
            }

            .history-title {
                font-weight: bold;
                margin-bottom: 5px;
            }

            .history-meta {
                font-size: 12px;
                opacity: 0.8;
            }

            .history-stats {
                text-align: right;
                font-size: 12px;
            }

            .settings-section {
                margin-bottom: 30px;
            }

            .settings-section h3 {
                margin-bottom: 15px;
                font-size: 18px;
                color: #ffd700;
            }

            .setting-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                margin-bottom: 10px;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .setting-label {
                font-weight: 500;
            }

            .setting-description {
                font-size: 12px;
                opacity: 0.8;
                margin-top: 3px;
            }

            .toggle-switch {
                position: relative;
                width: 50px;
                height: 25px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 25px;
                cursor: pointer;
                transition: background 0.3s;
            }

            .toggle-switch.active {
                background: #4caf50;
            }

            .toggle-slider {
                position: absolute;
                top: 2px;
                left: 2px;
                width: 21px;
                height: 21px;
                background: white;
                border-radius: 50%;
                transition: transform 0.3s;
            }

            .toggle-switch.active .toggle-slider {
                transform: translateX(25px);
            }

            .export-btn, .import-btn {
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 8px;
                color: white;
                padding: 10px 20px;
                cursor: pointer;
                font-size: 14px;
                transition: background 0.3s;
                margin-right: 10px;
            }

            .export-btn:hover, .import-btn:hover {
                background: rgba(255, 255, 255, 0.3);
            }

            .progress-bar {
                width: 100%;
                height: 8px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                overflow: hidden;
                margin: 10px 0;
            }

            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #4caf50, #8bc34a);
                border-radius: 4px;
                transition: width 0.3s ease;
            }

            @media (max-width: 768px) {
                .profile-content {
                    width: 95%;
                    margin: 20px;
                }

                .profile-header {
                    flex-direction: column;
                    gap: 20px;
                    text-align: center;
                }

                .profile-user-info {
                    flex-direction: column;
                    text-align: center;
                }

                .stats-grid {
                    grid-template-columns: 1fr;
                }

                .achievements-grid {
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                }

                .profile-tabs {
                    flex-wrap: wrap;
                }

                .profile-tab-btn {
                    flex: none;
                    min-width: auto;
                    padding: 10px 15px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.profile-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });
    }

    /**
     * Show profile modal
     */
    show() {
        const modal = document.getElementById('profile-modal');
        modal.classList.add('show');
        this.isVisible = true;
        this.loadCurrentTab();
    }

    /**
     * Hide profile modal
     */
    hide() {
        const modal = document.getElementById('profile-modal');
        modal.classList.remove('show');
        this.isVisible = false;
    }

    /**
     * Switch between tabs
     */
    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Update tab buttons
        document.querySelectorAll('.profile-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.profile-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Load tab-specific content
        this.loadCurrentTab();
    }

    /**
     * Load current tab content
     */
    loadCurrentTab() {
        switch (this.currentTab) {
            case 'overview':
                this.loadOverview();
                break;
            case 'achievements':
                this.loadAchievements();
                break;
            case 'progress':
                this.loadProgress();
                break;
            case 'history':
                this.loadHistory();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
    }

    /**
     * Load overview tab
     */
    loadOverview() {
        const container = document.getElementById('overview-tab');
        const userStats = this.calculateDetailedStats();
        
        container.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-card-icon">⭐</span>
                    <span class="stat-card-value">${userStats.totalPoints.toLocaleString()}</span>
                    <span class="stat-card-label">Puntos Totales</span>
                </div>
                <div class="stat-card">
                    <span class="stat-card-icon">🎓</span>
                    <span class="stat-card-value">${userStats.coursesCompleted}</span>
                    <span class="stat-card-label">Cursos Completados</span>
                </div>
                <div class="stat-card">
                    <span class="stat-card-icon">📚</span>
                    <span class="stat-card-value">${userStats.totalActivities}</span>
                    <span class="stat-card-label">Actividades Completadas</span>
                </div>
                <div class="stat-card">
                    <span class="stat-card-icon">🔥</span>
                    <span class="stat-card-value">${userStats.currentStreak}</span>
                    <span class="stat-card-label">Racha Actual (días)</span>
                </div>
                <div class="stat-card">
                    <span class="stat-card-icon">🏆</span>
                    <span class="stat-card-value">${userStats.achievements}</span>
                    <span class="stat-card-label">Logros Desbloqueados</span>
                </div>
                <div class="stat-card">
                    <span class="stat-card-icon">⏱️</span>
                    <span class="stat-card-value">${userStats.totalTimeSpent}h</span>
                    <span class="stat-card-label">Tiempo Total de Estudio</span>
                </div>
            </div>
            
            <div class="progress-chart">
                <div style="text-align: center;">
                    <h3>📈 Progreso de Aprendizaje</h3>
                    <p>Gráfico de progreso semanal</p>
                    <div style="margin-top: 20px;">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${userStats.overallProgress}%"></div>
                        </div>
                        <p style="margin-top: 10px; font-size: 14px;">
                            Progreso general: ${userStats.overallProgress}%
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-card-icon">📊</span>
                    <span class="stat-card-value">${userStats.averageScore}%</span>
                    <span class="stat-card-label">Puntuación Promedio</span>
                </div>
                <div class="stat-card">
                    <span class="stat-card-icon">🎯</span>
                    <span class="stat-card-value">${userStats.efficiency}%</span>
                    <span class="stat-card-label">Eficiencia de Aprendizaje</span>
                </div>
                <div class="stat-card">
                    <span class="stat-card-icon">📅</span>
                    <span class="stat-card-value">${userStats.activeDays}</span>
                    <span class="stat-card-label">Días Activos</span>
                </div>
                <div class="stat-card">
                    <span class="stat-card-icon">🏅</span>
                    <span class="stat-card-value">#${userStats.ranking}</span>
                    <span class="stat-card-label">Posición en Ranking</span>
                </div>
            </div>
        `;
    }

    /**
     * Load achievements tab
     */
    loadAchievements() {
        const container = document.getElementById('achievements-tab');
        const userAchievements = AchievementSystem.getUserAchievements(this.app.user);
        const availableAchievements = AchievementSystem.getAvailableAchievements(this.app.user);
        
        container.innerHTML = `
            <h3>🏆 Logros Desbloqueados (${userAchievements.length})</h3>
            <div class="achievements-grid">
                ${userAchievements.map(achievement => `
                    <div class="achievement-card">
                        <span class="achievement-icon">${achievement.icon}</span>
                        <div class="achievement-name">${achievement.name}</div>
                        <div class="achievement-description">${achievement.description}</div>
                        <div class="achievement-points">+${achievement.points} puntos</div>
                    </div>
                `).join('')}
            </div>
            
            <h3 style="margin-top: 30px;">🎯 Próximos Logros</h3>
            <div class="achievements-grid">
                ${availableAchievements.slice(0, 6).map(achievement => {
                    const progress = AchievementSystem.getAchievementProgress(this.app.user, this.app.progressMap, achievement.id);
                    return `
                        <div class="achievement-card locked">
                            <span class="achievement-icon">${achievement.icon}</span>
                            <div class="achievement-name">${achievement.name}</div>
                            <div class="achievement-description">${achievement.description}</div>
                            <div class="progress-bar" style="margin: 10px 0;">
                                <div class="progress-fill" style="width: ${progress.progress}%"></div>
                            </div>
                            <div class="achievement-points">+${achievement.points} puntos</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    /**
     * Load progress tab
     */
    loadProgress() {
        const container = document.getElementById('progress-tab');
        const progressData = this.getProgressData();
        
        container.innerHTML = `
            <div class="progress-chart">
                <div style="text-align: center;">
                    <h3>📈 Progreso por Curso</h3>
                    <p>Visualización detallada de tu progreso</p>
                </div>
            </div>
            
            <div class="course-history">
                ${progressData.map(course => `
                    <div class="history-item">
                        <div class="history-icon">📚</div>
                        <div class="history-details">
                            <div class="history-title">${course.title}</div>
                            <div class="history-meta">
                                ${course.lessonsCompleted} lecciones • ${course.gamesCompleted} juegos
                            </div>
                            <div class="progress-bar" style="margin-top: 8px;">
                                <div class="progress-fill" style="width: ${course.completionPercentage}%"></div>
                            </div>
                        </div>
                        <div class="history-stats">
                            <div style="font-weight: bold;">${course.completionPercentage}%</div>
                            <div>${course.pointsEarned} puntos</div>
                            <div>${course.timeSpent}h</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Load history tab
     */
    loadHistory() {
        const container = document.getElementById('history-tab');
        const historyData = this.getHistoryData();
        const certificates = CertificateGenerator.getUserCertificates(this.app.user.id);
        
        container.innerHTML = `
            <div style="margin-bottom: 30px;">
                <h3>🎓 Certificados Obtenidos (${certificates.length})</h3>
                ${certificates.length > 0 ? `
                    <div class="achievements-grid">
                        ${certificates.map(cert => `
                            <div class="achievement-card" onclick="CertificateGenerator.showCertificate(${JSON.stringify(cert).replace(/"/g, '&quot;')})">
                                <span class="achievement-icon">🎓</span>
                                <div class="achievement-name">${cert.courseTitle}</div>
                                <div class="achievement-description">Completado el ${new Date(cert.completionDate).toLocaleDateString('es-ES')}</div>
                                <div class="achievement-points">${cert.pointsEarned} puntos</div>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p style="opacity: 0.8; text-align: center; padding: 20px;">No tienes certificados aún. ¡Completa un curso para obtener tu primer certificado!</p>'}
            </div>
            
            <h3>📚 Historial de Aprendizaje</h3>
            <div class="course-history">
                ${historyData.map(item => `
                    <div class="history-item">
                        <div class="history-icon">${item.icon}</div>
                        <div class="history-details">
                            <div class="history-title">${item.title}</div>
                            <div class="history-meta">${item.description}</div>
                        </div>
                        <div class="history-stats">
                            <div style="font-weight: bold;">${item.date}</div>
                            <div>${item.points} puntos</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Load settings tab
     */
    loadSettings() {
        const container = document.getElementById('settings-tab');
        const settings = this.app.user.settings;
        
        container.innerHTML = `
            <div class="settings-section">
                <h3>🔔 Notificaciones</h3>
                <div class="setting-item">
                    <div>
                        <div class="setting-label">Notificaciones de Logros</div>
                        <div class="setting-description">Recibir notificaciones cuando desbloquees logros</div>
                    </div>
                    <div class="toggle-switch ${settings.notifications ? 'active' : ''}" 
                         onclick="userProfile.toggleSetting('notifications')">
                        <div class="toggle-slider"></div>
                    </div>
                </div>
                <div class="setting-item">
                    <div>
                        <div class="setting-label">Efectos de Sonido</div>
                        <div class="setting-description">Reproducir sonidos para puntos y logros</div>
                    </div>
                    <div class="toggle-switch ${settings.soundEffects ? 'active' : ''}" 
                         onclick="userProfile.toggleSetting('soundEffects')">
                        <div class="toggle-slider"></div>
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <h3>🎨 Apariencia</h3>
                <div class="setting-item">
                    <div>
                        <div class="setting-label">Tema</div>
                        <div class="setting-description">Seleccionar tema de la aplicación</div>
                    </div>
                    <select onchange="userProfile.changeSetting('theme', this.value)" 
                            style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; color: white; padding: 8px;">
                        <option value="light" ${settings.theme === 'light' ? 'selected' : ''}>Claro</option>
                        <option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>Oscuro</option>
                        <option value="auto" ${settings.theme === 'auto' ? 'selected' : ''}>Automático</option>
                    </select>
                </div>
            </div>
            
            <div class="settings-section">
                <h3>💾 Datos</h3>
                <div class="setting-item">
                    <div>
                        <div class="setting-label">Exportar Datos</div>
                        <div class="setting-description">Descargar una copia de tu progreso</div>
                    </div>
                    <button class="export-btn" onclick="userProfile.exportData()">
                        📥 Exportar
                    </button>
                </div>
                <div class="setting-item">
                    <div>
                        <div class="setting-label">Importar Datos</div>
                        <div class="setting-description">Restaurar progreso desde un archivo</div>
                    </div>
                    <input type="file" id="import-file" accept=".json" style="display: none;" 
                           onchange="userProfile.importData(this.files[0])">
                    <button class="import-btn" onclick="document.getElementById('import-file').click()">
                        📤 Importar
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Calculate detailed user statistics
     */
    calculateDetailedStats() {
        const progressMap = this.app.progressMap;
        let totalActivities = 0;
        let totalTimeSpent = 0;
        let totalPointsFromProgress = 0;
        let completedCourses = 0;
        
        progressMap.forEach(progress => {
            totalActivities += progress.lessonsCompleted.size + progress.gamesCompleted.size;
            totalTimeSpent += progress.timeSpent || 0;
            totalPointsFromProgress += progress.pointsEarned || 0;
            if (progress.completedAt) completedCourses++;
        });

        const userPosition = LeaderboardSystem.getUserPosition(this.app.user.id);
        const efficiency = totalTimeSpent > 0 ? Math.round((this.app.user.totalPoints / totalTimeSpent) * 10) : 0;
        const overallProgress = this.app.courses.size > 0 ? 
            Math.round((completedCourses / this.app.courses.size) * 100) : 0;

        return {
            totalPoints: this.app.user.totalPoints,
            coursesCompleted: this.app.user.coursesCompleted,
            totalActivities,
            currentStreak: this.app.user.currentStreak,
            achievements: this.app.user.achievements.length,
            totalTimeSpent: Math.round(totalTimeSpent / 60), // Convert to hours
            averageScore: Math.round((totalPointsFromProgress / Math.max(totalActivities, 1)) * 10),
            efficiency: Math.min(100, efficiency),
            activeDays: Math.max(1, this.app.user.currentStreak),
            ranking: userPosition.found ? userPosition.rank : '-',
            overallProgress
        };
    }

    /**
     * Get progress data for courses
     */
    getProgressData() {
        const progressData = [];
        
        this.app.progressMap.forEach((progress, courseId) => {
            const course = this.app.courses.get(courseId);
            if (course) {
                progressData.push({
                    title: course.title,
                    lessonsCompleted: progress.lessonsCompleted.size,
                    gamesCompleted: progress.gamesCompleted.size,
                    completionPercentage: progress.completionPercentage,
                    pointsEarned: progress.pointsEarned,
                    timeSpent: Math.round((progress.timeSpent || 0) / 60)
                });
            }
        });
        
        return progressData.sort((a, b) => b.completionPercentage - a.completionPercentage);
    }

    /**
     * Get history data
     */
    getHistoryData() {
        const history = [];
        
        // Add course completions
        this.app.progressMap.forEach((progress, courseId) => {
            const course = this.app.courses.get(courseId);
            if (course && progress.completedAt) {
                history.push({
                    icon: '🎓',
                    title: `Curso Completado: ${course.title}`,
                    description: 'Completaste todos los módulos del curso',
                    date: new Date(progress.completedAt).toLocaleDateString('es-ES'),
                    points: 50
                });
            }
        });
        
        // Add achievements
        this.app.user.achievements.forEach(achievementId => {
            const achievement = AchievementSystem.getAchievement(achievementId);
            if (achievement) {
                history.push({
                    icon: achievement.icon,
                    title: `Logro Desbloqueado: ${achievement.name}`,
                    description: achievement.description,
                    date: 'Reciente',
                    points: achievement.points
                });
            }
        });
        
        return history.slice(0, 10); // Show last 10 items
    }

    /**
     * Toggle setting
     */
    toggleSetting(settingName) {
        this.app.user.settings[settingName] = !this.app.user.settings[settingName];
        this.app.user.save();
        this.loadSettings(); // Refresh settings display
    }

    /**
     * Change setting value
     */
    changeSetting(settingName, value) {
        this.app.user.settings[settingName] = value;
        this.app.user.save();
    }

    /**
     * Export user data
     */
    exportData() {
        const exportData = DataSync.exportUserData(this.app.user.id);
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `eduquest-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        if (window.notificationSystem) {
            window.notificationSystem.showCustomNotification({
                type: 'info',
                icon: '💾',
                title: 'Datos Exportados',
                message: 'Tu progreso ha sido exportado exitosamente'
            });
        }
    }

    /**
     * Import user data
     */
    importData(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importData = JSON.parse(e.target.result);
                if (DataSync.importUserData(importData)) {
                    if (window.notificationSystem) {
                        window.notificationSystem.showCustomNotification({
                            type: 'info',
                            icon: '📤',
                            title: 'Datos Importados',
                            message: 'Tu progreso ha sido restaurado. Recarga la página.'
                        });
                    }
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (error) {
                if (window.notificationSystem) {
                    window.notificationSystem.showCustomNotification({
                        type: 'error',
                        icon: '❌',
                        title: 'Error de Importación',
                        message: 'El archivo no es válido'
                    });
                }
            }
        };
        reader.readAsText(file);
    }

    /**
     * Cleanup
     */
    destroy() {
        const modal = document.getElementById('profile-modal');
        if (modal) {
            modal.remove();
        }
    }
}

// Global user profile instance
window.userProfile = null;