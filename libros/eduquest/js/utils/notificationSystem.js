/**
 * Notification System - Handles point notifications and celebration animations
 */
class NotificationSystem {
    constructor() {
        this.notificationQueue = [];
        this.isShowing = false;
        this.container = null;
        this.init();
    }

    /**
     * Initialize notification system
     */
    init() {
        // Create notification container
        this.container = document.createElement('div');
        this.container.id = 'notification-container';
        this.container.className = 'notification-container';
        document.body.appendChild(this.container);

        // Add CSS styles
        this.addStyles();
    }

    /**
     * Add notification styles
     */
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                pointer-events: none;
            }

            .notification {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                margin-bottom: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                transform: translateX(400px);
                opacity: 0;
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                pointer-events: auto;
                min-width: 280px;
                backdrop-filter: blur(10px);
            }

            .notification.show {
                transform: translateX(0);
                opacity: 1;
            }

            .notification.hide {
                transform: translateX(400px);
                opacity: 0;
            }

            .notification-header {
                display: flex;
                align-items: center;
                margin-bottom: 8px;
            }

            .notification-icon {
                font-size: 24px;
                margin-right: 12px;
                animation: bounce 0.6s ease-in-out;
            }

            .notification-title {
                font-weight: bold;
                font-size: 16px;
            }

            .notification-message {
                font-size: 14px;
                opacity: 0.9;
                line-height: 1.4;
            }

            .notification-points {
                display: inline-block;
                background: rgba(255, 255, 255, 0.2);
                padding: 4px 8px;
                border-radius: 6px;
                font-weight: bold;
                margin-left: 8px;
            }

            .notification.achievement {
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            }

            .notification.points {
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            }

            .notification.streak {
                background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
            }

            .notification.completion {
                background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
                color: #333;
            }

            @keyframes bounce {
                0%, 20%, 60%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                80% { transform: translateY(-5px); }
            }

            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }

            .celebration-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9999;
            }

            .confetti {
                position: absolute;
                width: 10px;
                height: 10px;
                background: #f0f;
                animation: confetti-fall 3s linear forwards;
            }

            @keyframes confetti-fall {
                0% {
                    transform: translateY(-100vh) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }

            .floating-points {
                position: fixed;
                font-size: 24px;
                font-weight: bold;
                color: #4facfe;
                pointer-events: none;
                z-index: 9998;
                animation: float-up 2s ease-out forwards;
            }

            @keyframes float-up {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                50% {
                    opacity: 1;
                    transform: translateY(-30px) scale(1.2);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-60px) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Show point notification
     */
    showPointNotification(points, reason = 'Actividad completada') {
        const notification = {
            type: 'points',
            icon: '💰',
            title: `+${points} puntos`,
            message: reason,
            duration: 3000
        };

        this.queueNotification(notification);
        this.showFloatingPoints(points);
    }

    /**
     * Show achievement notification
     */
    showAchievementNotification(achievement) {
        const notification = {
            type: 'achievement',
            icon: achievement.icon,
            title: '¡Logro Desbloqueado!',
            message: `${achievement.name} - ${achievement.description}`,
            points: achievement.points,
            duration: 5000
        };

        this.queueNotification(notification);
        this.triggerCelebration();
    }

    /**
     * Show streak notification
     */
    showStreakNotification(streakDays) {
        const notification = {
            type: 'streak',
            icon: '🔥',
            title: `¡Racha de ${streakDays} días!`,
            message: 'Mantén el momentum y sigue aprendiendo',
            duration: 4000
        };

        this.queueNotification(notification);
    }

    /**
     * Show course completion notification
     */
    showCourseCompletionNotification(courseTitle, bonusPoints) {
        const notification = {
            type: 'completion',
            icon: '🎓',
            title: '¡Curso Completado!',
            message: `Has terminado "${courseTitle}"`,
            points: bonusPoints,
            duration: 5000
        };

        this.queueNotification(notification);
        this.triggerCelebration();
    }

    /**
     * Queue notification for display
     */
    queueNotification(notification) {
        this.notificationQueue.push(notification);
        if (!this.isShowing) {
            this.processQueue();
        }
    }

    /**
     * Process notification queue
     */
    async processQueue() {
        if (this.notificationQueue.length === 0) {
            this.isShowing = false;
            return;
        }

        this.isShowing = true;
        const notification = this.notificationQueue.shift();
        await this.displayNotification(notification);
        
        // Process next notification after a short delay
        setTimeout(() => {
            this.processQueue();
        }, 500);
    }

    /**
     * Display individual notification
     */
    displayNotification(notification) {
        return new Promise((resolve) => {
            const element = this.createNotificationElement(notification);
            this.container.appendChild(element);

            // Trigger show animation
            setTimeout(() => {
                element.classList.add('show');
            }, 100);

            // Auto-hide after duration
            setTimeout(() => {
                element.classList.add('hide');
                setTimeout(() => {
                    if (element.parentNode) {
                        element.parentNode.removeChild(element);
                    }
                    resolve();
                }, 400);
            }, notification.duration);
        });
    }

    /**
     * Create notification DOM element
     */
    createNotificationElement(notification) {
        const element = document.createElement('div');
        element.className = `notification ${notification.type}`;

        const header = document.createElement('div');
        header.className = 'notification-header';

        const icon = document.createElement('span');
        icon.className = 'notification-icon';
        icon.textContent = notification.icon;

        const title = document.createElement('span');
        title.className = 'notification-title';
        title.textContent = notification.title;

        if (notification.points) {
            const points = document.createElement('span');
            points.className = 'notification-points';
            points.textContent = `+${notification.points}`;
            title.appendChild(points);
        }

        header.appendChild(icon);
        header.appendChild(title);

        const message = document.createElement('div');
        message.className = 'notification-message';
        message.textContent = notification.message;

        element.appendChild(header);
        element.appendChild(message);

        return element;
    }

    /**
     * Show floating points animation
     */
    showFloatingPoints(points, x = null, y = null) {
        const element = document.createElement('div');
        element.className = 'floating-points';
        element.textContent = `+${points}`;

        // Position at cursor or center of screen
        if (x !== null && y !== null) {
            element.style.left = x + 'px';
            element.style.top = y + 'px';
        } else {
            element.style.left = '50%';
            element.style.top = '50%';
            element.style.transform = 'translateX(-50%)';
        }

        document.body.appendChild(element);

        // Remove after animation
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 2000);
    }

    /**
     * Trigger celebration animation
     */
    triggerCelebration() {
        this.createConfetti();
        this.playSound('celebration');
    }

    /**
     * Create confetti animation
     */
    createConfetti() {
        const overlay = document.createElement('div');
        overlay.className = 'celebration-overlay';
        document.body.appendChild(overlay);

        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 2 + 's';
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                
                overlay.appendChild(confetti);
            }, i * 50);
        }

        // Remove overlay after animation
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 5000);
    }

    /**
     * Play sound effect
     */
    playSound(type) {
        // Check if sound effects are enabled
        const user = User.load();
        if (!user.settings.soundEffects) {
            return;
        }

        // Create audio context for sound generation
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            if (type === 'points') {
                this.playPointsSound(audioContext);
            } else if (type === 'achievement') {
                this.playAchievementSound(audioContext);
            } else if (type === 'celebration') {
                this.playCelebrationSound(audioContext);
            }
        } catch (error) {
            console.log('Audio not supported');
        }
    }

    /**
     * Play points sound
     */
    playPointsSound(audioContext) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }

    /**
     * Play achievement sound
     */
    playAchievementSound(audioContext) {
        const frequencies = [523, 659, 784, 1047]; // C, E, G, C
        
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            }, index * 100);
        });
    }

    /**
     * Play celebration sound
     */
    playCelebrationSound(audioContext) {
        // Play a more elaborate celebration sound
        const notes = [
            { freq: 523, time: 0 },    // C
            { freq: 659, time: 0.1 },  // E
            { freq: 784, time: 0.2 },  // G
            { freq: 1047, time: 0.3 }, // C
            { freq: 784, time: 0.4 },  // G
            { freq: 1047, time: 0.5 }  // C
        ];
        
        notes.forEach(note => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
            }, note.time * 1000);
        });
    }

    /**
     * Show custom notification
     */
    showCustomNotification(options) {
        const notification = {
            type: options.type || 'info',
            icon: options.icon || 'ℹ️',
            title: options.title || 'Notificación',
            message: options.message || '',
            points: options.points,
            duration: options.duration || 3000
        };

        this.queueNotification(notification);
    }

    /**
     * Clear all notifications
     */
    clearAll() {
        this.notificationQueue = [];
        const notifications = this.container.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.classList.add('hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        });
        this.isShowing = false;
    }
}

// Global notification system instance
window.notificationSystem = new NotificationSystem();