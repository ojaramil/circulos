/**
 * Thumbnail Generator - Creates dynamic course thumbnails
 */
class ThumbnailGenerator {
    /**
     * Generate a canvas-based thumbnail for a course
     */
    static generateCanvasThumbnail(course, width = 300, height = 200) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        const metadata = CourseMetadata.getMetadata(course.id);
        const thumbnail = metadata.thumbnail;

        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        const colors = this.parseGradient(thumbnail.gradient);
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Add overlay pattern
        this.addPattern(ctx, width, height);

        // Add icon
        ctx.font = `${width * 0.15}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(thumbnail.icon, width * 0.5, height * 0.35);

        // Add initials
        ctx.font = `bold ${width * 0.12}px Arial`;
        ctx.fillStyle = 'white';
        ctx.fillText(thumbnail.initials, width * 0.5, height * 0.65);

        // Add difficulty indicator
        this.addDifficultyIndicator(ctx, metadata.difficulty, width, height);

        return canvas.toDataURL();
    }

    /**
     * Parse gradient string to extract colors
     */
    static parseGradient(gradientString) {
        const matches = gradientString.match(/#[0-9A-Fa-f]{6}/g);
        return matches || ['#6C757D', '#ADB5BD'];
    }

    /**
     * Add subtle pattern overlay
     */
    static addPattern(ctx, width, height) {
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;

        // Draw diagonal lines
        for (let i = -height; i < width; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i + height, height);
            ctx.stroke();
        }

        ctx.globalAlpha = 1;
    }

    /**
     * Add difficulty indicator
     */
    static addDifficultyIndicator(ctx, difficulty, width, height) {
        const colors = {
            'Básico': '#28A745',
            'Intermedio': '#FFC107',
            'Avanzado': '#DC3545'
        };

        const color = colors[difficulty] || colors['Intermedio'];
        const radius = width * 0.03;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(width - radius * 2, radius * 2, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    /**
     * Generate CSS-based thumbnail
     */
    static generateCSSThumbnail(course) {
        const metadata = CourseMetadata.getMetadata(course.id);
        const thumbnail = metadata.thumbnail;

        return `
            <div class="css-thumbnail" style="
                background: ${thumbnail.gradient};
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
            ">
                <div class="thumbnail-pattern"></div>
                <div class="thumbnail-icon" style="
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                    opacity: 0.9;
                ">${thumbnail.icon}</div>
                <div class="thumbnail-initials" style="
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: white;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                ">${thumbnail.initials}</div>
                <div class="difficulty-dot difficulty-${metadata.difficulty?.toLowerCase()}" style="
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background-color: ${this.getDifficultyColor(metadata.difficulty)};
                "></div>
            </div>
        `;
    }

    /**
     * Get difficulty color
     */
    static getDifficultyColor(difficulty) {
        const colors = {
            'Básico': '#28A745',
            'Intermedio': '#FFC107',
            'Avanzado': '#DC3545'
        };
        return colors[difficulty] || colors['Intermedio'];
    }

    /**
     * Generate thumbnail with progress overlay
     */
    static generateProgressThumbnail(course, progress) {
        const metadata = CourseMetadata.getMetadata(course.id);
        const thumbnail = metadata.thumbnail;
        const completionPercentage = course.getCompletionPercentage(progress);

        return `
            <div class="progress-thumbnail" style="
                background: ${thumbnail.gradient};
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
            ">
                <div class="progress-overlay" style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: ${completionPercentage}%;
                    height: 4px;
                    background: linear-gradient(90deg, #28A745, #20C997);
                    transition: width 0.6s ease;
                "></div>
                <div class="thumbnail-icon" style="
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                    opacity: 0.9;
                ">${thumbnail.icon}</div>
                <div class="thumbnail-initials" style="
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: white;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                ">${thumbnail.initials}</div>
                ${completionPercentage === 100 ? `
                <div class="completion-overlay" style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(40, 167, 69, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <div style="
                        font-size: 3rem;
                        color: white;
                        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
                    ">✓</div>
                </div>
                ` : ''}
            </div>
        `;
    }

    /**
     * Generate animated thumbnail for featured courses
     */
    static generateAnimatedThumbnail(course) {
        const metadata = CourseMetadata.getMetadata(course.id);
        const thumbnail = metadata.thumbnail;

        return `
            <div class="animated-thumbnail" style="
                background: ${thumbnail.gradient};
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
                animation: thumbnailPulse 3s ease-in-out infinite;
            ">
                <div class="floating-particles">
                    ${this.generateParticles(5)}
                </div>
                <div class="thumbnail-icon" style="
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                    opacity: 0.9;
                    animation: iconFloat 2s ease-in-out infinite;
                ">${thumbnail.icon}</div>
                <div class="thumbnail-initials" style="
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: white;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                ">${thumbnail.initials}</div>
            </div>
        `;
    }

    /**
     * Generate floating particles for animation
     */
    static generateParticles(count) {
        let particles = '';
        for (let i = 0; i < count; i++) {
            const delay = Math.random() * 3;
            const duration = 3 + Math.random() * 2;
            const size = 2 + Math.random() * 4;
            const left = Math.random() * 100;
            
            particles += `
                <div class="particle" style="
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    left: ${left}%;
                    animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
                "></div>
            `;
        }
        return particles;
    }

    /**
     * Add CSS animations for thumbnails
     */
    static addThumbnailAnimations() {
        if (document.getElementById('thumbnail-animations')) return;

        const style = document.createElement('style');
        style.id = 'thumbnail-animations';
        style.textContent = `
            @keyframes thumbnailPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }

            @keyframes iconFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }

            @keyframes particleFloat {
                0% { 
                    transform: translateY(100px) rotate(0deg);
                    opacity: 0;
                }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { 
                    transform: translateY(-20px) rotate(360deg);
                    opacity: 0;
                }
            }

            .thumbnail-pattern::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: 
                    linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%);
                background-size: 20px 20px;
                background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
                opacity: 0.3;
            }
        `;
        document.head.appendChild(style);
    }
}