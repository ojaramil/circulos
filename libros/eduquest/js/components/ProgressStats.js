/**
 * Progress Stats Component - Displays detailed progress statistics
 */
class ProgressStats {
    constructor(user, progressMap, courses) {
        this.user = user;
        this.progressMap = progressMap;
        this.courses = courses;
    }

    /**
     * Render progress statistics
     */
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Progress stats container not found');
            return;
        }

        container.innerHTML = this.getHTML();
        this.attachEventListeners();
    }

    /**
     * Get progress stats HTML
     */
    getHTML() {
        const report = ProgressAnalytics.generateProgressReport(this.user, this.progressMap, this.courses);
        const timeStats = TimeTracker.getTimeStats(this.user.id);
        const recommendations = ProgressAnalytics.getLearningRecommendations(this.user, this.progressMap, this.courses);

        return `
            <div class="progress-stats">
                <div class="stats-header">
                    <h2>📊 Estadísticas de Progreso</h2>
                    <p>Análisis detallado de tu aprendizaje</p>
                </div>

                <div class="stats-grid">
                    ${this.getOverviewStatsHTML(report)}
                    ${this.getVelocityStatsHTML(report.velocity)}
                    ${this.getTimeStatsHTML(timeStats)}
                    ${this.getInsightsHTML(report.insights)}
                </div>

                ${this.getRecommendationsHTML(recommendations)}
                ${this.getCourseAnalysisHTML(report.courseAnalysis)}
            </div>
        `;
    }

    /**
     * Get overview stats HTML
     */
    getOverviewStatsHTML(report) {
        return `
            <div class="stat-card overview">
                <div class="stat-header">
                    <h3>📈 Resumen General</h3>
                </div>
                <div class="stat-content">
                    <div class="stat-row">
                        <span class="stat-label">Puntos Totales</span>
                        <span class="stat-value">${report.user.totalPoints}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Cursos Completados</span>
                        <span class="stat-value">${report.user.coursesCompleted}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Racha Actual</span>
                        <span class="stat-value">${report.user.currentStreak} días</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Logros Desbloqueados</span>
                        <span class="stat-value">${report.user.achievements}</span>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Get velocity stats HTML
     */
    getVelocityStatsHTML(velocity) {
        return `
            <div class="stat-card velocity">
                <div class="stat-header">
                    <h3>🚀 Velocidad de Aprendizaje</h3>
                </div>
                <div class="stat-content">
                    <div class="velocity-chart">
                        <div class="velocity-bar">
                            <div class="velocity-fill" style="width: ${Math.min(100, velocity.weeklyVelocity * 20)}%"></div>
                        </div>
                        <span class="velocity-label">${velocity.weeklyVelocity.toFixed(1)} actividades/día</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Actividades Esta Semana</span>
                        <span class="stat-value">${velocity.recentCompletions}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Proyección Mensual</span>
                        <span class="stat-value">${Math.round(velocity.projectedMonthly)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Get time stats HTML
     */
    getTimeStatsHTML(timeStats) {
        if (!timeStats.hasData) {
            return `
                <div class="stat-card time">
                    <div class="stat-header">
                        <h3>⏱️ Tiempo de Estudio</h3>
                    </div>
                    <div class="stat-content">
                        <div class="no-data">
                            <span class="no-data-icon">📊</span>
                            <p>Comienza a estudiar para ver estadísticas de tiempo</p>
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="stat-card time">
                <div class="stat-header">
                    <h3>⏱️ Tiempo de Estudio</h3>
                </div>
                <div class="stat-content">
                    <div class="time-summary">
                        <div class="time-circle">
                            <span class="time-value">${timeStats.totalTime}</span>
                            <span class="time-unit">min</span>
                        </div>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Sesión Promedio</span>
                        <span class="stat-value">${timeStats.averageSession} min</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Eficiencia</span>
                        <span class="stat-value">${timeStats.efficiency}%</span>
                    </div>
                    ${timeStats.weeklyGoal ? `
                    <div class="weekly-goal">
                        <div class="goal-progress">
                            <div class="goal-bar">
                                <div class="goal-fill" style="width: ${timeStats.weeklyGoal.progress}%"></div>
                            </div>
                            <span class="goal-text">${timeStats.weeklyGoal.current}/${timeStats.weeklyGoal.target} min esta semana</span>
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Get insights HTML
     */
    getInsightsHTML(insights) {
        if (insights.length === 0) {
            return '';
        }

        return `
            <div class="stat-card insights">
                <div class="stat-header">
                    <h3>💡 Insights de Aprendizaje</h3>
                </div>
                <div class="stat-content">
                    ${insights.map(insight => `
                        <div class="insight-item ${insight.type}">
                            <div class="insight-content">
                                <h4 class="insight-title">${insight.title}</h4>
                                <p class="insight-message">${insight.message}</p>
                                ${insight.action ? `<p class="insight-action">${insight.action}</p>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Get recommendations HTML
     */
    getRecommendationsHTML(recommendations) {
        if (recommendations.length === 0) {
            return '';
        }

        return `
            <div class="recommendations-section">
                <h3>🎯 Recomendaciones Personalizadas</h3>
                <div class="recommendations-grid">
                    ${recommendations.map(rec => `
                        <div class="recommendation-item priority-${rec.priority}">
                            <div class="rec-content">
                                <h4 class="rec-title">${rec.title}</h4>
                                <p class="rec-description">${rec.description}</p>
                                ${rec.courseId ? `
                                    <button class="btn btn-primary btn-sm" onclick="app.navigateToCourse('${rec.courseId}')">
                                        Ir al Curso
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Get course analysis HTML
     */
    getCourseAnalysisHTML(courseAnalysis) {
        if (courseAnalysis.length === 0) {
            return '';
        }

        return `
            <div class="course-analysis-section">
                <h3>📚 Análisis por Curso</h3>
                <div class="course-analysis-list">
                    ${courseAnalysis.slice(0, 5).map(analysis => `
                        <div class="analysis-item">
                            <div class="analysis-header">
                                <h4 class="analysis-title">${analysis.title}</h4>
                                <span class="analysis-completion">${analysis.completionPercentage}%</span>
                            </div>
                            <div class="analysis-progress">
                                <div class="analysis-bar">
                                    <div class="analysis-fill" style="width: ${analysis.completionPercentage}%"></div>
                                </div>
                            </div>
                            <div class="analysis-stats">
                                <span class="analysis-stat">⭐ ${analysis.pointsEarned} puntos</span>
                                <span class="analysis-stat">⏱️ ${analysis.timeSpent} min</span>
                                ${analysis.efficiency ? `
                                    <span class="analysis-stat efficiency-${analysis.efficiency.rating}">
                                        📊 ${analysis.efficiency.rating}
                                    </span>
                                ` : ''}
                            </div>
                            ${analysis.prediction && !analysis.prediction.completed ? `
                                <div class="analysis-prediction">
                                    <span class="prediction-text">
                                        📅 Estimado: ${analysis.prediction.estimatedCompletionDate || 'Calculando...'}
                                    </span>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Add any interactive functionality here
        // For example, clicking on course analysis items to navigate
        document.querySelectorAll('.analysis-item').forEach(item => {
            item.addEventListener('click', (e) => {
                // Could navigate to course or show more details
            });
        });
    }

    /**
     * Update stats in real-time
     */
    updateStats() {
        // Re-render with updated data
        this.render();
    }

    /**
     * Export progress report
     */
    exportReport() {
        const report = ProgressAnalytics.generateProgressReport(this.user, this.progressMap, this.courses);
        
        const blob = new Blob([JSON.stringify(report, null, 2)], { 
            type: 'application/json' 
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `eduquest-progress-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('📊 Progress report exported');
    }
}