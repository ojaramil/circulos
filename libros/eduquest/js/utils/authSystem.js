/**
 * Authentication System - Simple user registration and login
 */
class AuthSystem {
    static STORAGE_KEY = 'eduquest_users';
    static CURRENT_USER_KEY = 'eduquest_session';
    static SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

    /**
     * Initialize authentication system
     */
    static init() {
        console.log('🔐 Initializing authentication system...');
        
        // Check for existing session
        this.checkSession();
        
        // Setup session timeout
        this.setupSessionTimeout();
        
        console.log('✅ Authentication system initialized');
    }

    /**
     * Register new user
     */
    static async register(userData) {
        try {
            // Handle both object and individual parameters for backward compatibility
            let username, email, password, fullName;
            
            if (typeof userData === 'object' && userData !== null) {
                // New format: object with userData
                username = userData.username;
                email = userData.email;
                password = userData.password;
                fullName = userData.fullName;
            } else {
                // Old format: individual parameters
                username = arguments[0];
                email = arguments[1];
                password = arguments[2];
                fullName = username;
            }

            // Validate input
            const validation = this.validateRegistration(username, email, password);
            if (!validation.valid) {
                return { success: false, error: validation.error };
            }

            // Check if user already exists
            const existingUser = this.getUserByEmail(email) || this.getUserByUsername(username);
            if (existingUser) {
                return { success: false, error: 'El usuario o email ya está registrado' };
            }

            // Create new user
            const userId = this.generateUserId();
            const hashedPassword = await this.hashPassword(password);
            
            const newUser = {
                id: userId,
                username: username.trim(),
                email: email.toLowerCase().trim(),
                fullName: fullName || username.trim(),
                passwordHash: hashedPassword,
                createdAt: new Date().toISOString(),
                lastLoginAt: null,
                isActive: true,
                role: 'student',
                settings: {
                    theme: 'light',
                    notifications: true,
                    soundEffects: true,
                    language: 'es',
                    privacy: {
                        showInLeaderboard: true,
                        shareProgress: true
                    }
                },
                profile: {
                    avatar: null,
                    bio: '',
                    preferences: {
                        theme: 'light',
                        notifications: true,
                        soundEffects: true,
                        language: 'es'
                    }
                },
                stats: {
                    totalPoints: 0,
                    coursesCompleted: 0,
                    currentStreak: 0,
                    achievements: [],
                    totalTimeSpent: 0
                }
            };

            // Save user to database
            this.saveUser(newUser);
            
            // Create session
            this.createSession(newUser);
            
            console.log('✅ User registered successfully:', username);
            
            return { 
                success: true, 
                user: this.sanitizeUser(newUser),
                message: 'Usuario registrado exitosamente'
            };

        } catch (error) {
            console.error('❌ Registration failed:', error);
            return { success: false, error: 'Error interno del servidor' };
        }
    }

    /**
     * Login user
     */
    static async login(usernameOrEmail, password, rememberMe = false) {
        try {
            // Validate input
            if (!usernameOrEmail || !password) {
                return { success: false, error: 'Usuario/Email y contraseña son requeridos' };
            }

            // Find user by email or username
            let user = this.getUserByEmail(usernameOrEmail);
            if (!user) {
                user = this.getUserByUsername(usernameOrEmail);
            }
            
            if (!user) {
                return { success: false, error: 'Usuario no encontrado' };
            }

            // Verify password
            const passwordValid = await this.verifyPassword(password, user.passwordHash);
            if (!passwordValid) {
                return { success: false, error: 'Contraseña incorrecta' };
            }

            // Check if user is active
            if (!user.isActive) {
                return { success: false, error: 'Cuenta desactivada' };
            }

            // Update last login
            user.lastLoginAt = new Date().toISOString();
            this.saveUser(user);

            // Create session
            this.createSession(user);
            
            console.log('✅ User logged in successfully:', user.username);
            
            return { 
                success: true, 
                user: this.sanitizeUser(user),
                message: 'Inicio de sesión exitoso'
            };

        } catch (error) {
            console.error('❌ Login failed:', error);
            return { success: false, error: 'Error interno del servidor' };
        }
    }

    /**
     * Logout user
     */
    static logout() {
        try {
            // Clear session
            localStorage.removeItem(this.CURRENT_USER_KEY);
            
            // Clear user data from memory
            if (window.app) {
                window.app.user = null;
            }
            
            console.log('✅ User logged out successfully');
            
            return { success: true, message: 'Sesión cerrada exitosamente' };

        } catch (error) {
            console.error('❌ Logout failed:', error);
            return { success: false, error: 'Error al cerrar sesión' };
        }
    }

    /**
     * Get current user
     */
    static getCurrentUser() {
        try {
            const sessionData = localStorage.getItem(this.CURRENT_USER_KEY);
            if (!sessionData) return null;

            const session = JSON.parse(sessionData);
            
            // Check if session is expired
            if (this.isSessionExpired(session)) {
                this.logout();
                return null;
            }

            // Get full user data
            const user = this.getUserById(session.userId);
            return user ? this.sanitizeUser(user) : null;

        } catch (error) {
            console.error('❌ Error getting current user:', error);
            return null;
        }
    }

    /**
     * Validate registration data
     */
    static validateRegistration(username, email, password) {
        if (!username || username.trim().length < 2) {
            return { valid: false, error: 'El nombre de usuario debe tener al menos 2 caracteres' };
        }

        if (!email || !this.isValidEmail(email)) {
            return { valid: false, error: 'Email inválido' };
        }

        if (!password || password.length < 6) {
            return { valid: false, error: 'La contraseña debe tener al menos 6 caracteres' };
        }

        if (username.trim().length > 50) {
            return { valid: false, error: 'El nombre de usuario es demasiado largo' };
        }

        return { valid: true };
    }

    /**
     * Validate email format
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Hash password (simple implementation)
     */
    static async hashPassword(password) {
        // In a real app, use bcrypt or similar
        // For demo purposes, using a simple hash
        const encoder = new TextEncoder();
        const data = encoder.encode(password + 'eduquest_salt');
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Verify password
     */
    static async verifyPassword(password, hash) {
        // Try new hash format first
        const passwordHash = await this.hashPassword(password);
        if (passwordHash === hash) {
            return true;
        }
        
        // Try old hash format for backward compatibility
        const oldHash = this.hashPasswordSync(password);
        return oldHash === hash;
    }

    /**
     * Generate unique user ID
     */
    static generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Save user to database
     */
    static saveUser(user) {
        const users = this.getAllUsers();
        const existingIndex = users.findIndex(u => u.id === user.id);
        
        if (existingIndex >= 0) {
            users[existingIndex] = user;
        } else {
            users.push(user);
        }
        
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    }

    /**
     * Get all users
     */
    static getAllUsers() {
        try {
            // First try the new format
            const usersData = localStorage.getItem(this.STORAGE_KEY);
            if (usersData) {
                return JSON.parse(usersData);
            }
            
            // If no users in new format, try to migrate from old format
            const migratedUsers = this.migrateOldUsers();
            if (migratedUsers.length > 0) {
                console.log(`🔄 Migrated ${migratedUsers.length} users to new format`);
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(migratedUsers));
                return migratedUsers;
            }
            
            return [];
        } catch (error) {
            console.error('❌ Error loading users:', error);
            return [];
        }
    }

    /**
     * Migrate users from old individual storage format
     */
    static migrateOldUsers() {
        const users = [];
        const keys = Object.keys(localStorage);
        
        keys.forEach(key => {
            if (key.startsWith('eduquest_user_') && !key.includes('_progress_') && !key.includes('_sessions_')) {
                try {
                    const userData = JSON.parse(localStorage.getItem(key));
                    if (userData && userData.username) {
                        // Convert old format to new format
                        const user = {
                            id: userData.id || key.replace('eduquest_user_', ''),
                            username: userData.username,
                            email: userData.email || `${userData.username}@example.com`,
                            fullName: userData.fullName || userData.username,
                            passwordHash: userData.passwordHash || this.hashPasswordSync('123456'), // Default password
                            createdAt: userData.createdAt || new Date().toISOString(),
                            lastLoginAt: userData.lastLoginAt || null,
                            isActive: userData.isActive !== false,
                            role: userData.role || 'student',
                            settings: userData.settings || {
                                theme: 'light',
                                notifications: true,
                                soundEffects: true,
                                language: 'es'
                            },
                            profile: userData.profile || {
                                avatar: null,
                                bio: '',
                                preferences: userData.settings || {}
                            },
                            stats: userData.stats || {
                                totalPoints: userData.totalPoints || 0,
                                coursesCompleted: userData.coursesCompleted || 0,
                                currentStreak: userData.currentStreak || 0,
                                achievements: userData.achievements || [],
                                totalTimeSpent: 0
                            }
                        };
                        users.push(user);
                    }
                } catch (error) {
                    console.warn(`⚠️ Could not migrate user from key ${key}:`, error);
                }
            }
        });
        
        return users;
    }

    /**
     * Synchronous password hashing for migration
     */
    static hashPasswordSync(password) {
        // Simple hash for migration purposes
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    /**
     * Get user by email
     */
    static getUserByEmail(email) {
        const users = this.getAllUsers();
        return users.find(user => user.email === email.toLowerCase().trim());
    }

    /**
     * Get user by username
     */
    static getUserByUsername(username) {
        const users = this.getAllUsers();
        return users.find(user => user.username === username.trim());
    }

    /**
     * Get user by ID
     */
    static getUserById(userId) {
        const users = this.getAllUsers();
        return users.find(user => user.id === userId);
    }

    /**
     * Create user session
     */
    static createSession(user) {
        const session = {
            userId: user.id,
            username: user.username,
            email: user.email,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + this.SESSION_TIMEOUT).toISOString()
        };
        
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(session));
        
        // Update last login
        user.lastLoginAt = session.createdAt;
        this.saveUser(user);
    }

    /**
     * Check if session is expired
     */
    static isSessionExpired(session) {
        if (!session.expiresAt) return true;
        return new Date() > new Date(session.expiresAt);
    }

    /**
     * Check current session
     */
    static checkSession() {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
            console.log('✅ Valid session found for:', currentUser.username);
            return true;
        } else {
            console.log('ℹ️ No valid session found');
            return false;
        }
    }

    /**
     * Setup session timeout
     */
    static setupSessionTimeout() {
        // Check session validity every 5 minutes
        setInterval(() => {
            const sessionData = localStorage.getItem(this.CURRENT_USER_KEY);
            if (sessionData) {
                const session = JSON.parse(sessionData);
                if (this.isSessionExpired(session)) {
                    console.log('⏰ Session expired, logging out');
                    this.logout();
                    
                    // Show session expired notification
                    if (window.notificationSystem) {
                        window.notificationSystem.showCustomNotification({
                            type: 'info',
                            icon: '⏰',
                            title: 'Sesión Expirada',
                            message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
                        });
                    }
                }
            }
        }, 5 * 60 * 1000); // 5 minutes
    }

    /**
     * Update user profile
     */
    static updateUserProfile(userId, profileData) {
        try {
            const user = this.getUserById(userId);
            if (!user) {
                return { success: false, error: 'Usuario no encontrado' };
            }

            // Update profile data
            user.profile = { ...user.profile, ...profileData };
            user.updatedAt = new Date().toISOString();
            
            this.saveUser(user);
            
            return { success: true, user: this.sanitizeUser(user) };

        } catch (error) {
            console.error('❌ Error updating profile:', error);
            return { success: false, error: 'Error al actualizar perfil' };
        }
    }

    /**
     * Update user settings
     */
    static updateUserSettings(userId, settings) {
        try {
            const user = this.getUserById(userId);
            if (!user) {
                return { success: false, error: 'Usuario no encontrado' };
            }

            // Update settings
            user.settings = { ...user.settings, ...settings };
            user.updatedAt = new Date().toISOString();
            
            this.saveUser(user);
            
            return { success: true, settings: user.settings };

        } catch (error) {
            console.error('❌ Error updating settings:', error);
            return { success: false, error: 'Error al actualizar configuración' };
        }
    }

    /**
     * Change password
     */
    static async changePassword(userId, currentPassword, newPassword) {
        try {
            const user = this.getUserById(userId);
            if (!user) {
                return { success: false, error: 'Usuario no encontrado' };
            }

            // Verify current password
            const passwordValid = await this.verifyPassword(currentPassword, user.passwordHash);
            if (!passwordValid) {
                return { success: false, error: 'Contraseña actual incorrecta' };
            }

            // Validate new password
            if (newPassword.length < 6) {
                return { success: false, error: 'La nueva contraseña debe tener al menos 6 caracteres' };
            }

            // Hash new password
            user.passwordHash = await this.hashPassword(newPassword);
            user.updatedAt = new Date().toISOString();
            
            this.saveUser(user);
            
            return { success: true, message: 'Contraseña actualizada exitosamente' };

        } catch (error) {
            console.error('❌ Error changing password:', error);
            return { success: false, error: 'Error al cambiar contraseña' };
        }
    }

    /**
     * Delete user account
     */
    static deleteAccount(userId, password) {
        try {
            const user = this.getUserById(userId);
            if (!user) {
                return { success: false, error: 'Usuario no encontrado' };
            }

            // Verify password before deletion
            this.verifyPassword(password, user.passwordHash).then(valid => {
                if (!valid) {
                    return { success: false, error: 'Contraseña incorrecta' };
                }

                // Remove user from database
                const users = this.getAllUsers();
                const filteredUsers = users.filter(u => u.id !== userId);
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredUsers));

                // Clear session
                this.logout();

                // Clear user data
                this.clearUserData(userId);

                return { success: true, message: 'Cuenta eliminada exitosamente' };
            });

        } catch (error) {
            console.error('❌ Error deleting account:', error);
            return { success: false, error: 'Error al eliminar cuenta' };
        }
    }

    /**
     * Clear all user data
     */
    static clearUserData(userId) {
        // Remove progress data
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key.includes(userId)) {
                localStorage.removeItem(key);
            }
        }
        
        console.log(`🗑️ Cleared all data for user: ${userId}`);
    }

    /**
     * Sanitize user data (remove sensitive information)
     */
    static sanitizeUser(user) {
        const { passwordHash, ...sanitizedUser } = user;
        return sanitizedUser;
    }

    /**
     * Get user statistics
     */
    static getUserStats() {
        const users = this.getAllUsers();
        const activeUsers = users.filter(user => user.isActive);
        const recentUsers = users.filter(user => {
            if (!user.lastLoginAt) return false;
            const lastLogin = new Date(user.lastLoginAt);
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return lastLogin >= weekAgo;
        });

        return {
            totalUsers: users.length,
            activeUsers: activeUsers.length,
            recentUsers: recentUsers.length,
            registrationsToday: users.filter(user => {
                const created = new Date(user.createdAt);
                const today = new Date();
                return created.toDateString() === today.toDateString();
            }).length
        };
    }

    /**
     * Export user data (GDPR compliance)
     */
    static exportUserData(userId) {
        try {
            const user = this.getUserById(userId);
            if (!user) {
                return { success: false, error: 'Usuario no encontrado' };
            }

            // Collect all user data
            const userData = {
                profile: this.sanitizeUser(user),
                progress: {},
                sessions: [],
                certificates: [],
                exportDate: new Date().toISOString(),
                version: '1.0.0'
            };

            // Get progress data
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(`eduquest_progress_${userId}_`)) {
                    const courseId = key.replace(`eduquest_progress_${userId}_`, '');
                    userData.progress[courseId] = JSON.parse(localStorage.getItem(key));
                }
            }

            // Get session data
            const sessionsKey = `eduquest_time_sessions_${userId}`;
            userData.sessions = JSON.parse(localStorage.getItem(sessionsKey) || '[]');

            // Get certificates
            const certificatesKey = `eduquest_certificates_${userId}`;
            userData.certificates = JSON.parse(localStorage.getItem(certificatesKey) || '[]');

            return { success: true, data: userData };

        } catch (error) {
            console.error('❌ Error exporting user data:', error);
            return { success: false, error: 'Error al exportar datos' };
        }
    }

    /**
     * Import user data
     */
    static importUserData(importData, userId) {
        try {
            if (!importData.profile || !importData.version) {
                return { success: false, error: 'Formato de datos inválido' };
            }

            const user = this.getUserById(userId);
            if (!user) {
                return { success: false, error: 'Usuario no encontrado' };
            }

            // Import profile data (excluding sensitive fields)
            const { passwordHash, ...profileData } = importData.profile;
            Object.assign(user.profile, profileData.profile || {});
            Object.assign(user.settings, profileData.settings || {});

            // Import progress data
            if (importData.progress) {
                Object.entries(importData.progress).forEach(([courseId, progressData]) => {
                    const key = `eduquest_progress_${userId}_${courseId}`;
                    localStorage.setItem(key, JSON.stringify(progressData));
                });
            }

            // Import sessions
            if (importData.sessions) {
                const sessionsKey = `eduquest_time_sessions_${userId}`;
                localStorage.setItem(sessionsKey, JSON.stringify(importData.sessions));
            }

            // Import certificates
            if (importData.certificates) {
                const certificatesKey = `eduquest_certificates_${userId}`;
                localStorage.setItem(certificatesKey, JSON.stringify(importData.certificates));
            }

            // Save updated user
            this.saveUser(user);

            return { success: true, message: 'Datos importados exitosamente' };

        } catch (error) {
            console.error('❌ Error importing user data:', error);
            return { success: false, error: 'Error al importar datos' };
        }
    }

    /**
     * Check if user is authenticated
     */
    static isAuthenticated() {
        return this.getCurrentUser() !== null;
    }

    /**
     * Require authentication (redirect if not authenticated)
     */
    static requireAuth() {
        if (!this.isAuthenticated()) {
            this.showLoginModal();
            return false;
        }
        return true;
    }

    /**
     * Show login modal
     */
    static showLoginModal() {
        // This will be implemented in the AuthUI component
        if (window.authUI) {
            window.authUI.showLoginModal();
        } else {
            console.warn('⚠️ AuthUI not available');
        }
    }
}

// Initialize auth system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AuthSystem !== 'undefined') {
        AuthSystem.init();
        console.log('🔐 AuthSystem initialized on DOM ready');
    }
});

// Make AuthSystem available globally
if (typeof window !== 'undefined') {
    window.AuthSystem = AuthSystem;
}