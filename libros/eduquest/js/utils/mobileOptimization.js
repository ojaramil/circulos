/**
 * Mobile Optimization - Touch interactions and mobile-specific features
 */
class MobileOptimization {
    constructor() {
        this.isMobile = this.detectMobile();
        this.isTouch = this.detectTouch();
        this.orientation = this.getOrientation();
        this.viewport = this.getViewport();
        
        this.init();
    }

    /**
     * Initialize mobile optimizations
     */
    init() {
        console.log('📱 Initializing mobile optimizations...');
        
        // Set up touch interactions
        this.setupTouchInteractions();
        
        // Optimize for mobile devices
        if (this.isMobile) {
            this.setupMobileOptimizations();
        }
        
        // Handle orientation changes
        this.setupOrientationHandling();
        
        // Optimize viewport
        this.setupViewportOptimization();
        
        // Setup gesture recognition
        this.setupGestureRecognition();
        
        // Optimize performance for mobile
        this.setupPerformanceOptimizations();
        
        console.log('✅ Mobile optimizations initialized');
    }

    /**
     * Detect if device is mobile
     */
    detectMobile() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Check for mobile user agents
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        const isMobileUA = mobileRegex.test(userAgent);
        
        // Check for touch capability and screen size
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        
        return isMobileUA || (isTouchDevice && isSmallScreen);
    }

    /**
     * Detect touch capability
     */
    detectTouch() {
        return 'ontouchstart' in window || 
               navigator.maxTouchPoints > 0 || 
               navigator.msMaxTouchPoints > 0;
    }

    /**
     * Get device orientation
     */
    getOrientation() {
        if (screen.orientation) {
            return screen.orientation.angle;
        } else if (window.orientation !== undefined) {
            return window.orientation;
        }
        return window.innerWidth > window.innerHeight ? 90 : 0;
    }

    /**
     * Get viewport information
     */
    getViewport() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            ratio: window.devicePixelRatio || 1
        };
    }

    /**
     * Setup touch interactions
     */
    setupTouchInteractions() {
        if (!this.isTouch) return;

        // Add touch-friendly classes
        document.body.classList.add('touch-device');
        
        // Improve touch targets
        this.improveTouchTargets();
        
        // Setup swipe gestures
        this.setupSwipeGestures();
        
        // Setup long press
        this.setupLongPress();
        
        // Prevent zoom on double tap for specific elements
        this.preventDoubleZoom();
    }

    /**
     * Improve touch targets
     */
    improveTouchTargets() {
        const minTouchSize = 44; // 44px minimum touch target
        
        const touchElements = document.querySelectorAll('button, .btn, .clickable, .nav-btn, .tab-btn');
        
        touchElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            
            if (rect.width < minTouchSize || rect.height < minTouchSize) {
                element.style.minWidth = `${minTouchSize}px`;
                element.style.minHeight = `${minTouchSize}px`;
                element.style.display = 'flex';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';
            }
        });
    }

    /**
     * Setup swipe gestures
     */
    setupSwipeGestures() {
        let startX, startY, startTime;
        const minSwipeDistance = 50;
        const maxSwipeTime = 300;

        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = Date.now();
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const touch = e.changedTouches[0];
            const endX = touch.clientX;
            const endY = touch.clientY;
            const endTime = Date.now();

            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const deltaTime = endTime - startTime;

            // Check if it's a valid swipe
            if (deltaTime > maxSwipeTime) return;
            if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) return;

            // Determine swipe direction
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (deltaX > 0) {
                    this.handleSwipe('right', e.target);
                } else {
                    this.handleSwipe('left', e.target);
                }
            } else {
                // Vertical swipe
                if (deltaY > 0) {
                    this.handleSwipe('down', e.target);
                } else {
                    this.handleSwipe('up', e.target);
                }
            }

            startX = startY = null;
        }, { passive: true });
    }

    /**
     * Handle swipe gestures
     */
    handleSwipe(direction, target) {
        // Check if we're in a modal or specific component
        const modal = target.closest('.modal, .leaderboard-modal, .profile-modal');
        const courseViewer = target.closest('.course-viewer');
        const tabContainer = target.closest('.tabs, .profile-tabs');

        if (modal) {
            // Swipe down to close modal
            if (direction === 'down') {
                const closeBtn = modal.querySelector('.close-btn');
                if (closeBtn) closeBtn.click();
            }
        } else if (courseViewer) {
            // Swipe left/right to navigate content
            if (direction === 'left') {
                this.navigateContent('next');
            } else if (direction === 'right') {
                this.navigateContent('prev');
            }
        } else if (tabContainer) {
            // Swipe left/right to change tabs
            if (direction === 'left') {
                this.switchTab('next');
            } else if (direction === 'right') {
                this.switchTab('prev');
            }
        }

        // Dispatch custom swipe event
        const swipeEvent = new CustomEvent('swipe', {
            detail: { direction, target }
        });
        document.dispatchEvent(swipeEvent);
    }

    /**
     * Setup long press
     */
    setupLongPress() {
        let pressTimer;
        const longPressDelay = 500;

        document.addEventListener('touchstart', (e) => {
            pressTimer = setTimeout(() => {
                this.handleLongPress(e.target);
            }, longPressDelay);
        }, { passive: true });

        document.addEventListener('touchend', () => {
            clearTimeout(pressTimer);
        }, { passive: true });

        document.addEventListener('touchmove', () => {
            clearTimeout(pressTimer);
        }, { passive: true });
    }

    /**
     * Handle long press
     */
    handleLongPress(target) {
        // Add haptic feedback if available
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        // Check for specific long press actions
        if (target.classList.contains('course-card')) {
            this.showCourseContextMenu(target);
        } else if (target.classList.contains('ranking-item')) {
            this.showUserContextMenu(target);
        }

        // Dispatch custom long press event
        const longPressEvent = new CustomEvent('longpress', {
            detail: { target }
        });
        target.dispatchEvent(longPressEvent);
    }

    /**
     * Prevent double tap zoom on specific elements
     */
    preventDoubleZoom() {
        const elements = document.querySelectorAll('.btn, .course-card, .ranking-item');
        
        elements.forEach(element => {
            element.addEventListener('touchend', (e) => {
                e.preventDefault();
                element.click();
            });
        });
    }

    /**
     * Setup mobile-specific optimizations
     */
    setupMobileOptimizations() {
        // Add mobile class to body
        document.body.classList.add('mobile-device');
        
        // Optimize scrolling
        this.optimizeScrolling();
        
        // Setup pull-to-refresh
        this.setupPullToRefresh();
        
        // Optimize input handling
        this.optimizeInputs();
        
        // Setup mobile navigation
        this.setupMobileNavigation();
    }

    /**
     * Optimize scrolling for mobile
     */
    optimizeScrolling() {
        // Enable momentum scrolling on iOS
        document.body.style.webkitOverflowScrolling = 'touch';
        
        // Optimize scroll containers
        const scrollContainers = document.querySelectorAll('.modal-body, .leaderboard-body, .profile-body, .content-list');
        
        scrollContainers.forEach(container => {
            container.style.webkitOverflowScrolling = 'touch';
            container.style.overflowScrolling = 'touch';
        });
    }

    /**
     * Setup pull-to-refresh
     */
    setupPullToRefresh() {
        let startY = 0;
        let pullDistance = 0;
        const pullThreshold = 100;
        let isPulling = false;

        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].clientY;
                isPulling = true;
            }
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!isPulling) return;

            pullDistance = e.touches[0].clientY - startY;
            
            if (pullDistance > 0 && window.scrollY === 0) {
                // Show pull indicator
                this.showPullIndicator(pullDistance, pullThreshold);
            }
        }, { passive: true });

        document.addEventListener('touchend', () => {
            if (isPulling && pullDistance > pullThreshold) {
                this.triggerRefresh();
            }
            
            this.hidePullIndicator();
            isPulling = false;
            pullDistance = 0;
        }, { passive: true });
    }

    /**
     * Show pull-to-refresh indicator
     */
    showPullIndicator(distance, threshold) {
        let indicator = document.getElementById('pull-indicator');
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'pull-indicator';
            indicator.innerHTML = '🔄 Desliza para actualizar';
            indicator.style.cssText = `
                position: fixed;
                top: -50px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                font-size: 14px;
                z-index: 10000;
                transition: top 0.3s ease;
            `;
            document.body.appendChild(indicator);
        }

        const progress = Math.min(distance / threshold, 1);
        indicator.style.top = `${-50 + (progress * 70)}px`;
        
        if (progress >= 1) {
            indicator.innerHTML = '🔄 Suelta para actualizar';
            indicator.style.background = 'rgba(76, 175, 80, 0.9)';
        } else {
            indicator.innerHTML = '🔄 Desliza para actualizar';
            indicator.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    }

    /**
     * Hide pull-to-refresh indicator
     */
    hidePullIndicator() {
        const indicator = document.getElementById('pull-indicator');
        if (indicator) {
            indicator.style.top = '-50px';
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 300);
        }
    }

    /**
     * Trigger refresh
     */
    triggerRefresh() {
        console.log('🔄 Pull-to-refresh triggered');
        
        // Add haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }

        // Trigger app refresh
        if (window.app && window.app.refreshData) {
            window.app.refreshData();
        } else {
            location.reload();
        }
    }

    /**
     * Optimize inputs for mobile
     */
    optimizeInputs() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Prevent zoom on focus (iOS)
            if (input.type !== 'file') {
                input.style.fontSize = '16px';
            }
            
            // Add mobile-friendly attributes
            if (input.type === 'search') {
                input.setAttribute('autocomplete', 'off');
                input.setAttribute('autocorrect', 'off');
                input.setAttribute('autocapitalize', 'off');
                input.setAttribute('spellcheck', 'false');
            }
        });
    }

    /**
     * Setup mobile navigation
     */
    setupMobileNavigation() {
        // Add mobile navigation helpers
        const navButtons = document.querySelectorAll('.nav-btn');
        
        navButtons.forEach(btn => {
            btn.addEventListener('touchstart', () => {
                btn.classList.add('touch-active');
            }, { passive: true });
            
            btn.addEventListener('touchend', () => {
                setTimeout(() => {
                    btn.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
        });
    }

    /**
     * Setup orientation handling
     */
    setupOrientationHandling() {
        const handleOrientationChange = () => {
            setTimeout(() => {
                this.orientation = this.getOrientation();
                this.viewport = this.getViewport();
                
                // Dispatch orientation change event
                const orientationEvent = new CustomEvent('orientationchange', {
                    detail: { 
                        orientation: this.orientation,
                        viewport: this.viewport
                    }
                });
                window.dispatchEvent(orientationEvent);
                
                // Adjust layout for orientation
                this.adjustForOrientation();
            }, 100);
        };

        window.addEventListener('orientationchange', handleOrientationChange);
        window.addEventListener('resize', handleOrientationChange);
    }

    /**
     * Adjust layout for orientation
     */
    adjustForOrientation() {
        const isLandscape = Math.abs(this.orientation) === 90;
        
        document.body.classList.toggle('landscape', isLandscape);
        document.body.classList.toggle('portrait', !isLandscape);
        
        // Adjust course viewer for landscape
        const courseViewer = document.querySelector('.course-viewer');
        if (courseViewer && isLandscape) {
            courseViewer.classList.add('landscape-mode');
        } else if (courseViewer) {
            courseViewer.classList.remove('landscape-mode');
        }
    }

    /**
     * Setup viewport optimization
     */
    setupViewportOptimization() {
        // Set viewport meta tag if not present
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
        
        // Handle safe areas (iPhone X+)
        this.handleSafeAreas();
    }

    /**
     * Handle safe areas for devices with notches
     */
    handleSafeAreas() {
        // Add CSS custom properties for safe areas
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --safe-area-inset-top: env(safe-area-inset-top);
                --safe-area-inset-right: env(safe-area-inset-right);
                --safe-area-inset-bottom: env(safe-area-inset-bottom);
                --safe-area-inset-left: env(safe-area-inset-left);
            }
            
            .safe-area-top {
                padding-top: var(--safe-area-inset-top);
            }
            
            .safe-area-bottom {
                padding-bottom: var(--safe-area-inset-bottom);
            }
        `;
        document.head.appendChild(style);
        
        // Apply safe area classes
        const header = document.querySelector('.dashboard-header, .course-header');
        if (header) {
            header.classList.add('safe-area-top');
        }
        
        const footer = document.querySelector('.content-controls');
        if (footer) {
            footer.classList.add('safe-area-bottom');
        }
    }

    /**
     * Setup gesture recognition
     */
    setupGestureRecognition() {
        // Pinch to zoom prevention on specific elements
        const preventZoomElements = document.querySelectorAll('.course-card, .modal-content');
        
        preventZoomElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                if (e.touches.length > 1) {
                    e.preventDefault();
                }
            });
        });
    }

    /**
     * Setup performance optimizations
     */
    setupPerformanceOptimizations() {
        // Lazy load images
        this.setupLazyLoading();
        
        // Optimize animations for mobile
        this.optimizeAnimations();
        
        // Setup intersection observer for performance
        this.setupIntersectionObserver();
    }

    /**
     * Setup lazy loading for images
     */
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    /**
     * Optimize animations for mobile
     */
    optimizeAnimations() {
        // Reduce animations on low-end devices
        if (this.isLowEndDevice()) {
            document.body.classList.add('reduced-motion');
        }
        
        // Use transform instead of changing layout properties
        const animatedElements = document.querySelectorAll('.course-card, .btn');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform';
        });
    }

    /**
     * Check if device is low-end
     */
    isLowEndDevice() {
        // Simple heuristic based on available features
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        
        return memory < 2 || cores < 4;
    }

    /**
     * Setup intersection observer for performance
     */
    setupIntersectionObserver() {
        // Observe course cards for performance optimizations
        const courseCards = document.querySelectorAll('.course-card');
        
        if ('IntersectionObserver' in window && courseCards.length > 0) {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    } else {
                        entry.target.classList.remove('in-view');
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            courseCards.forEach(card => cardObserver.observe(card));
        }
    }

    /**
     * Navigate content (for swipe gestures)
     */
    navigateContent(direction) {
        const currentItem = document.querySelector('.content-item.active');
        if (!currentItem) return;
        
        const allItems = Array.from(document.querySelectorAll('.content-item'));
        const currentIndex = allItems.indexOf(currentItem);
        
        let nextIndex;
        if (direction === 'next') {
            nextIndex = (currentIndex + 1) % allItems.length;
        } else {
            nextIndex = (currentIndex - 1 + allItems.length) % allItems.length;
        }
        
        const nextItem = allItems[nextIndex];
        if (nextItem) {
            nextItem.click();
        }
    }

    /**
     * Switch tabs (for swipe gestures)
     */
    switchTab(direction) {
        const activeTab = document.querySelector('.tab-btn.active, .profile-tab-btn.active');
        if (!activeTab) return;
        
        const allTabs = Array.from(activeTab.parentNode.querySelectorAll('.tab-btn, .profile-tab-btn'));
        const currentIndex = allTabs.indexOf(activeTab);
        
        let nextIndex;
        if (direction === 'next') {
            nextIndex = (currentIndex + 1) % allTabs.length;
        } else {
            nextIndex = (currentIndex - 1 + allTabs.length) % allTabs.length;
        }
        
        const nextTab = allTabs[nextIndex];
        if (nextTab) {
            nextTab.click();
        }
    }

    /**
     * Show course context menu
     */
    showCourseContextMenu(courseCard) {
        // Implementation for course context menu
        console.log('📱 Long press on course card');
    }

    /**
     * Show user context menu
     */
    showUserContextMenu(userItem) {
        // Implementation for user context menu
        console.log('📱 Long press on user item');
    }

    /**
     * Get device information
     */
    getDeviceInfo() {
        return {
            isMobile: this.isMobile,
            isTouch: this.isTouch,
            orientation: this.orientation,
            viewport: this.viewport,
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            memory: navigator.deviceMemory,
            cores: navigator.hardwareConcurrency
        };
    }
}

// Initialize mobile optimization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.mobileOptimization = new MobileOptimization();
});

// Export for use in other modules
window.MobileOptimization = MobileOptimization;