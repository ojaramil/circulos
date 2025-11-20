/**
 * Certificate Generator - Creates completion certificates for courses
 */
class CertificateGenerator {
    /**
     * Generate completion certificate
     */
    static generateCertificate(user, course, progress) {
        const certificate = {
            id: `cert_${user.id}_${course.id}_${Date.now()}`,
            userId: user.id,
            courseId: course.id,
            userName: user.username,
            courseTitle: course.title,
            completionDate: progress.completedAt,
            pointsEarned: progress.pointsEarned,
            timeSpent: progress.timeSpent,
            completionPercentage: progress.completionPercentage,
            generatedAt: new Date().toISOString()
        };

        // Store certificate
        this.storeCertificate(certificate);
        
        return certificate;
    }

    /**
     * Store certificate in localStorage
     */
    static storeCertificate(certificate) {
        const certificates = this.getUserCertificates(certificate.userId);
        certificates.push(certificate);
        
        const key = `eduquest_certificates_${certificate.userId}`;
        StorageManager.save(key, certificates);
    }

    /**
     * Get user certificates
     */
    static getUserCertificates(userId) {
        const key = `eduquest_certificates_${userId}`;
        return StorageManager.load(key, []);
    }

    /**
     * Create certificate HTML for display
     */
    static createCertificateHTML(certificate) {
        const completionDate = new Date(certificate.completionDate).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
            <div class="certificate" id="certificate-${certificate.id}">
                <div class="certificate-border">
                    <div class="certificate-content">
                        <div class="certificate-header">
                            <div class="certificate-logo">🎓</div>
                            <h1 class="certificate-title">Certificado de Finalización</h1>
                            <div class="certificate-subtitle">EduQuest - Plataforma de Aprendizaje</div>
                        </div>
                        
                        <div class="certificate-body">
                            <div class="certificate-text">
                                <p class="certificate-intro">Se certifica que</p>
                                <h2 class="certificate-name">${certificate.userName}</h2>
                                <p class="certificate-achievement">ha completado exitosamente el curso</p>
                                <h3 class="certificate-course">${certificate.courseTitle}</h3>
                                <p class="certificate-date">el ${completionDate}</p>
                            </div>
                            
                            <div class="certificate-stats">
                                <div class="cert-stat">
                                    <span class="cert-stat-value">${certificate.pointsEarned}</span>
                                    <span class="cert-stat-label">Puntos Obtenidos</span>
                                </div>
                                <div class="cert-stat">
                                    <span class="cert-stat-value">${Math.round((certificate.timeSpent || 0) / 60)}h</span>
                                    <span class="cert-stat-label">Tiempo de Estudio</span>
                                </div>
                                <div class="cert-stat">
                                    <span class="cert-stat-value">${certificate.completionPercentage}%</span>
                                    <span class="cert-stat-label">Completado</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="certificate-footer">
                            <div class="certificate-signature">
                                <div class="signature-line"></div>
                                <div class="signature-text">EduQuest Platform</div>
                            </div>
                            <div class="certificate-id">
                                Certificado ID: ${certificate.id.substring(0, 12)}...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Show certificate modal
     */
    static showCertificate(certificate) {
        const modal = document.createElement('div');
        modal.className = 'certificate-modal';
        modal.innerHTML = `
            <div class="certificate-overlay" onclick="this.parentElement.remove()"></div>
            <div class="certificate-container">
                <div class="certificate-modal-header">
                    <h2>🎓 Certificado de Finalización</h2>
                    <div class="certificate-actions">
                        <button class="cert-btn" onclick="certificateGenerator.downloadCertificate('${certificate.id}')">
                            📥 Descargar
                        </button>
                        <button class="cert-btn" onclick="certificateGenerator.shareCertificate('${certificate.id}')">
                            📤 Compartir
                        </button>
                        <button class="cert-btn close" onclick="this.closest('.certificate-modal').remove()">
                            ✕ Cerrar
                        </button>
                    </div>
                </div>
                ${this.createCertificateHTML(certificate)}
            </div>
        `;

        document.body.appendChild(modal);
        this.addCertificateStyles();
    }

    /**
     * Add certificate styles
     */
    static addCertificateStyles() {
        if (document.getElementById('certificate-styles')) return;

        const style = document.createElement('style');
        style.id = 'certificate-styles';
        style.textContent = `
            .certificate-modal {
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

            .certificate-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            .certificate-container {
                position: relative;
                background: white;
                border-radius: 15px;
                padding: 20px;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }

            .certificate-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 2px solid #f0f0f0;
            }

            .certificate-modal-header h2 {
                margin: 0;
                color: #333;
            }

            .certificate-actions {
                display: flex;
                gap: 10px;
            }

            .cert-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
                transition: transform 0.2s;
            }

            .cert-btn:hover {
                transform: translateY(-1px);
            }

            .cert-btn.close {
                background: #dc3545;
            }

            .certificate {
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                border-radius: 15px;
                padding: 40px;
                margin: 20px 0;
                position: relative;
                overflow: hidden;
            }

            .certificate::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: 
                    radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%);
                pointer-events: none;
            }

            .certificate-border {
                border: 8px solid;
                border-image: linear-gradient(45deg, #ffd700, #667eea, #764ba2, #ffd700) 1;
                border-radius: 10px;
                padding: 30px;
                background: white;
                position: relative;
            }

            .certificate-header {
                text-align: center;
                margin-bottom: 40px;
            }

            .certificate-logo {
                font-size: 48px;
                margin-bottom: 15px;
            }

            .certificate-title {
                font-size: 32px;
                font-weight: bold;
                color: #333;
                margin: 0 0 10px 0;
                font-family: 'Georgia', serif;
            }

            .certificate-subtitle {
                font-size: 16px;
                color: #666;
                font-style: italic;
            }

            .certificate-body {
                text-align: center;
                margin-bottom: 40px;
            }

            .certificate-intro {
                font-size: 18px;
                color: #666;
                margin-bottom: 15px;
            }

            .certificate-name {
                font-size: 36px;
                font-weight: bold;
                color: #333;
                margin: 15px 0;
                font-family: 'Georgia', serif;
                text-decoration: underline;
                text-decoration-color: #ffd700;
            }

            .certificate-achievement {
                font-size: 18px;
                color: #666;
                margin: 20px 0 15px 0;
            }

            .certificate-course {
                font-size: 24px;
                font-weight: bold;
                color: #667eea;
                margin: 15px 0;
                font-family: 'Georgia', serif;
            }

            .certificate-date {
                font-size: 16px;
                color: #666;
                margin-top: 20px;
            }

            .certificate-stats {
                display: flex;
                justify-content: center;
                gap: 40px;
                margin: 30px 0;
                padding: 20px;
                background: rgba(102, 126, 234, 0.1);
                border-radius: 10px;
            }

            .cert-stat {
                text-align: center;
            }

            .cert-stat-value {
                display: block;
                font-size: 24px;
                font-weight: bold;
                color: #333;
                margin-bottom: 5px;
            }

            .cert-stat-label {
                font-size: 12px;
                color: #666;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .certificate-footer {
                display: flex;
                justify-content: space-between;
                align-items: end;
                margin-top: 40px;
            }

            .certificate-signature {
                text-align: center;
            }

            .signature-line {
                width: 200px;
                height: 2px;
                background: #333;
                margin-bottom: 10px;
            }

            .signature-text {
                font-size: 14px;
                color: #666;
                font-weight: bold;
            }

            .certificate-id {
                font-size: 10px;
                color: #999;
                font-family: monospace;
            }

            @media (max-width: 768px) {
                .certificate-container {
                    margin: 20px;
                    padding: 15px;
                }

                .certificate {
                    padding: 20px;
                }

                .certificate-border {
                    padding: 20px;
                }

                .certificate-title {
                    font-size: 24px;
                }

                .certificate-name {
                    font-size: 28px;
                }

                .certificate-course {
                    font-size: 20px;
                }

                .certificate-stats {
                    flex-direction: column;
                    gap: 20px;
                }

                .certificate-footer {
                    flex-direction: column;
                    gap: 20px;
                    text-align: center;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Download certificate as image
     */
    static downloadCertificate(certificateId) {
        // In a real implementation, this would use html2canvas or similar
        // For now, we'll create a simple text version
        const certificates = this.getUserCertificates(window.app.user.id);
        const certificate = certificates.find(c => c.id === certificateId);
        
        if (!certificate) return;

        const certificateText = `
CERTIFICADO DE FINALIZACIÓN
EduQuest - Plataforma de Aprendizaje

Se certifica que ${certificate.userName}
ha completado exitosamente el curso
"${certificate.courseTitle}"

Fecha de finalización: ${new Date(certificate.completionDate).toLocaleDateString('es-ES')}
Puntos obtenidos: ${certificate.pointsEarned}
Tiempo de estudio: ${Math.round((certificate.timeSpent || 0) / 60)} horas
Porcentaje completado: ${certificate.completionPercentage}%

Certificado ID: ${certificate.id}
        `;

        const blob = new Blob([certificateText], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `certificado-${certificate.courseTitle.replace(/\s+/g, '-')}.txt`;
        link.click();

        if (window.notificationSystem) {
            window.notificationSystem.showCustomNotification({
                type: 'info',
                icon: '📥',
                title: 'Certificado Descargado',
                message: 'Tu certificado ha sido descargado exitosamente'
            });
        }
    }

    /**
     * Share certificate
     */
    static shareCertificate(certificateId) {
        const certificates = this.getUserCertificates(window.app.user.id);
        const certificate = certificates.find(c => c.id === certificateId);
        
        if (!certificate) return;

        const shareText = `¡Acabo de completar el curso "${certificate.courseTitle}" en EduQuest! 🎓\n\nPuntos obtenidos: ${certificate.pointsEarned} ⭐\nTiempo de estudio: ${Math.round((certificate.timeSpent || 0) / 60)} horas ⏱️\n\n#EduQuest #Aprendizaje #Certificado`;

        if (navigator.share) {
            navigator.share({
                title: 'Certificado EduQuest',
                text: shareText
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                if (window.notificationSystem) {
                    window.notificationSystem.showCustomNotification({
                        type: 'info',
                        icon: '📋',
                        title: 'Copiado al Portapapeles',
                        message: 'El texto del certificado ha sido copiado'
                    });
                }
            });
        }
    }

    /**
     * Auto-generate certificate when course is completed
     */
    static checkAndGenerateCertificate(user, course, progress) {
        if (progress.completedAt && progress.completionPercentage === 100) {
            const existingCertificates = this.getUserCertificates(user.id);
            const alreadyExists = existingCertificates.some(cert => 
                cert.courseId === course.id && cert.userId === user.id
            );

            if (!alreadyExists) {
                const certificate = this.generateCertificate(user, course, progress);
                
                // Show certificate notification
                if (window.notificationSystem) {
                    setTimeout(() => {
                        window.notificationSystem.showCustomNotification({
                            type: 'achievement',
                            icon: '🎓',
                            title: '¡Certificado Obtenido!',
                            message: `Has obtenido el certificado para "${course.title}"`,
                            duration: 5000
                        });
                    }, 2000);
                }

                return certificate;
            }
        }
        return null;
    }
}

// Global certificate generator instance
window.certificateGenerator = CertificateGenerator;