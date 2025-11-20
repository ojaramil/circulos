/**
 * Authentication Modal Component - Handles login and registration UI
 */
class AuthModal {
    constructor() {
        this.isVisible = false;
        this.currentMode = 'login'; // 'login' or 'register'
        this.modal = null;
        this.authSystem = window.authSystem || AuthSystem; // Support both instance and static class
        
        this.init();
    }

    /**
     * Initialize authentication modal
     */
    init() {
        console.log('🔐 Initializing Auth Modal...');
        
        this.createModal();
        this.setupEventListeners();
        
        console.log('✅ Auth Modal initialized');
    }

    /**
     * Create modal HTML structure
     */
    createModal() {
        const modalHTML = `
            <div id="authModal" class="auth-modal" style="display: none;">
                <div class="auth-modal-overlay"></div>
                <div class="auth-modal-content">
                    <div class="auth-modal-header">
                        <h2 id="authModalTitle">Iniciar Sesión</h2>
                        <button class="auth-modal-close" id="authModalClose">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="auth-modal-body">
                        <!-- Login Form -->
                        <form id="loginForm" class="auth-form" style="display: block;">
                            <div class="form-group">
                                <label for="loginUsername">Usuario o Email</label>
                                <input type="text" id="loginUsername" name="username" required 
                                       placeholder="Ingresa tu usuario o email">
                                <i class="fas fa-user form-icon"></i>
                            </div>
                            
                            <div class="form-group">
                                <label for="loginPassword">Contraseña</label>
                                <input type="password" id="loginPassword" name="password" required 
                                       placeholder="Ingresa tu contraseña">
                                <i class="fas fa-lock form-icon"></i>
                                <button type="button" class="password-toggle" id="loginPasswordToggle">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                            
                            <div class="form-group checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="rememberMe" name="rememberMe">
                                    <span class="checkmark"></span>
                                    Recordarme
                                </label>
                            </div>
                            
                            <button type="submit" class="auth-btn primary" id="loginBtn">
                                <i class="fas fa-sign-in-alt"></i>
                                Iniciar Sesión
                            </button>
                            
                            <div class="auth-divider">
                                <span>o</span>
                            </div>
                            
                            <div class="auth-social">
                                <button type="button" class="auth-btn social google" disabled>
                                    <i class="fab fa-google"></i>
                                    Continuar con Google
                                </button>
                                <button type="button" class="auth-btn social github" disabled>
                                    <i class="fab fa-github"></i>
                                    Continuar con GitHub
                                </button>
                            </div>
                            
                            <div class="auth-links">
                                <a href="#" id="showRegister">¿No tienes cuenta? Regístrate</a>
                                <a href="#" id="forgotPassword">¿Olvidaste tu contraseña?</a>
                            </div>
                        </form>
                        
                        <!-- Register Form -->
                        <form id="registerForm" class="auth-form" style="display: none;">
                            <div class="form-group">
                                <label for="registerFullName">Nombre Completo</label>
                                <input type="text" id="registerFullName" name="fullName" required 
                                       placeholder="Ingresa tu nombre completo">
                                <i class="fas fa-user form-icon"></i>
                            </div>
                            
                            <div class="form-group">
                                <label for="registerUsername">Usuario</label>
                                <input type="text" id="registerUsername" name="username" required 
                                       placeholder="Elige un nombre de usuario">
                                <i class="fas fa-at form-icon"></i>
                            </div>
                            
                            <div class="form-group">
                                <label for="registerEmail">Email</label>
                                <input type="email" id="registerEmail" name="email" required 
                                       placeholder="Ingresa tu email">
                                <i class="fas fa-envelope form-icon"></i>
                            </div>
                            
                            <div class="form-group">
                                <label for="registerPassword">Contraseña</label>
                                <input type="password" id="registerPassword" name="password" required 
                                       placeholder="Crea una contraseña segura">
                                <i class="fas fa-lock form-icon"></i>
                                <button type="button" class="password-toggle" id="registerPasswordToggle">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                            
                            <div class="form-group">
                                <label for="confirmPassword">Confirmar Contraseña</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" required 
                                       placeholder="Confirma tu contraseña">
                                <i class="fas fa-lock form-icon"></i>
                                <button type="button" class="password-toggle" id="confirmPasswordToggle">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                            
                            <div class="form-group checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="acceptTerms" name="acceptTerms" required>
                                    <span class="checkmark"></span>
                                    Acepto los <a href="#" target="_blank">términos y condiciones</a>
                                </label>
                            </div>
                            
                            <button type="submit" class="auth-btn primary" id="registerBtn">
                                <i class="fas fa-user-plus"></i>
                                Crear Cuenta
                            </button>
                            
                            <div class="auth-links">
                                <a href="#" id="showLogin">¿Ya tienes cuenta? Inicia sesión</a>
                            </div>
                        </form>
                        
                        <!-- Loading State -->
                        <div id="authLoading" class="auth-loading" style="display: none;">
                            <div class="loading-spinner"></div>
                            <p>Procesando...</p>
                        </div>
                        
                        <!-- Error Message -->
                        <div id="authError" class="auth-error" style="display: none;">
                            <i class="fas fa-exclamation-triangle"></i>
                            <span id="authErrorMessage"></span>
                        </div>
                        
                        <!-- Success Message -->
                        <div id="authSuccess" class="auth-success" style="display: none;">
                            <i class="fas fa-check-circle"></i>
                            <span id="authSuccessMessage"></span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('authModal');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Modal close events
        document.getElementById('authModalClose').addEventListener('click', () => this.hide());
        document.querySelector('.auth-modal-overlay').addEventListener('click', () => this.hide());

        // Form switching
        document.getElementById('showRegister').addEventListener('click', (e) => {
            e.preventDefault();
            this.switchMode('register');
        });

        document.getElementById('showLogin').addEventListener('click', (e) => {
            e.preventDefault();
            this.switchMode('login');
        });

        // Password toggles
        this.setupPasswordToggles();

        // Form submissions
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerForm').addEventListener('submit', (e) => this.handleRegister(e));

        // Forgot password
        document.getElementById('forgotPassword').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleForgotPassword();
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });

        // Real-time validation
        this.setupRealTimeValidation();
    }

    /**
     * Setup password toggle functionality
     */
    setupPasswordToggles() {
        const toggles = [
            { toggle: 'loginPasswordToggle', input: 'loginPassword' },
            { toggle: 'registerPasswordToggle', input: 'registerPassword' },
            { toggle: 'confirmPasswordToggle', input: 'confirmPassword' }
        ];

        toggles.forEach(({ toggle, input }) => {
            const toggleBtn = document.getElementById(toggle);
            const inputField = document.getElementById(input);

            if (toggleBtn && inputField) {
                toggleBtn.addEventListener('click', () => {
                    const isPassword = inputField.type === 'password';
                    inputField.type = isPassword ? 'text' : 'password';
                    toggleBtn.querySelector('i').className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
                });
            }
        });
    }

    /**
     * Setup real-time validation
     */
    setupRealTimeValidation() {
        // Username validation
        document.getElementById('registerUsername').addEventListener('input', (e) => {
            this.validateUsername(e.target);
        });

        // Email validation
        document.getElementById('registerEmail').addEventListener('input', (e) => {
            this.validateEmail(e.target);
        });

        // Password validation
        document.getElementById('registerPassword').addEventListener('input', (e) => {
            this.validatePassword(e.target);
            this.validatePasswordMatch();
        });

        // Confirm password validation
        document.getElementById('confirmPassword').addEventListener('input', () => {
            this.validatePasswordMatch();
        });
    }

    /**
     * Show modal
     */
    show(mode = 'login') {
        this.currentMode = mode;
        this.switchMode(mode);
        this.modal.style.display = 'flex';
        this.isVisible = true;
        
        // Focus first input
        setTimeout(() => {
            const firstInput = this.modal.querySelector('.auth-form:not([style*="display: none"]) input');
            if (firstInput) firstInput.focus();
        }, 100);

        // Add body class to prevent scrolling
        document.body.classList.add('modal-open');
    }

    /**
     * Hide modal
     */
    hide() {
        this.modal.style.display = 'none';
        this.isVisible = false;
        this.clearMessages();
        this.resetForms();
        
        // Remove body class
        document.body.classList.remove('modal-open');
    }

    /**
     * Switch between login and register modes
     */
    switchMode(mode) {
        this.currentMode = mode;
        
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const title = document.getElementById('authModalTitle');

        if (mode === 'login') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            title.textContent = 'Iniciar Sesión';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            title.textContent = 'Crear Cuenta';
        }

        this.clearMessages();
    }

    /**
     * Handle login form submission
     */
    async handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const username = formData.get('username').trim();
        const password = formData.get('password');
        const rememberMe = formData.get('rememberMe') === 'on';

        this.showLoading(true);
        this.clearMessages();

        try {
            const result = await this.authSystem.login(username, password, rememberMe);
            
            if (result.success) {
                this.showSuccess('¡Bienvenido de vuelta! Redirigiendo...');
                
                setTimeout(() => {
                    this.hide();
                    // Dispatch login success event
                    window.dispatchEvent(new CustomEvent('auth:loginSuccess', {
                        detail: { user: result.user }
                    }));
                }, 1500);
            } else {
                this.showError(result.error);
            }
        } catch (error) {
            this.showError('Error inesperado. Por favor intenta de nuevo.');
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * Handle register form submission
     */
    async handleRegister(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = {
            fullName: formData.get('fullName').trim(),
            username: formData.get('username').trim(),
            email: formData.get('email').trim(),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        this.showLoading(true);
        this.clearMessages();

        try {
            const result = await this.authSystem.register(userData);
            
            if (result.success) {
                this.showSuccess('¡Cuenta creada exitosamente! Bienvenido a EduQuest.');
                
                setTimeout(() => {
                    this.hide();
                    // Dispatch registration success event
                    window.dispatchEvent(new CustomEvent('auth:registerSuccess', {
                        detail: { user: result.user }
                    }));
                }, 1500);
            } else {
                this.showError(result.error);
            }
        } catch (error) {
            this.showError('Error inesperado. Por favor intenta de nuevo.');
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * Handle forgot password
     */
    handleForgotPassword() {
        // For demo purposes, show a simple alert
        // In a real app, this would open a password reset form
        alert('Funcionalidad de recuperación de contraseña estará disponible próximamente.');
    }

    /**
     * Validation methods
     */
    validateUsername(input) {
        const username = input.value.trim();
        const isValid = username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
        
        this.setFieldValidation(input, isValid, 
            isValid ? '' : 'El usuario debe tener al menos 3 caracteres y solo contener letras, números y guiones bajos');
        
        return isValid;
    }

    validateEmail(input) {
        const email = input.value.trim();
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        
        this.setFieldValidation(input, isValid, 
            isValid ? '' : 'Por favor ingresa un email válido');
        
        return isValid;
    }

    validatePassword(input) {
        const password = input.value;
        const isValid = password.length >= 6;
        
        this.setFieldValidation(input, isValid, 
            isValid ? '' : 'La contraseña debe tener al menos 6 caracteres');
        
        return isValid;
    }

    validatePasswordMatch() {
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const isValid = password === confirmPassword && confirmPassword.length > 0;
        
        this.setFieldValidation(document.getElementById('confirmPassword'), isValid, 
            isValid ? '' : 'Las contraseñas no coinciden');
        
        return isValid;
    }

    setFieldValidation(input, isValid, message) {
        const formGroup = input.closest('.form-group');
        
        // Remove existing validation classes
        formGroup.classList.remove('valid', 'invalid');
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        if (input.value.trim() !== '') {
            if (isValid) {
                formGroup.classList.add('valid');
            } else {
                formGroup.classList.add('invalid');
                
                if (message) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'field-error';
                    errorDiv.textContent = message;
                    formGroup.appendChild(errorDiv);
                }
            }
        }
    }

    /**
     * UI state methods
     */
    showLoading(show) {
        const loading = document.getElementById('authLoading');
        const forms = document.querySelectorAll('.auth-form');
        
        if (show) {
            loading.style.display = 'block';
            forms.forEach(form => form.style.display = 'none');
        } else {
            loading.style.display = 'none';
            this.switchMode(this.currentMode); // Restore current form
        }
    }

    showError(message) {
        const errorDiv = document.getElementById('authError');
        const messageSpan = document.getElementById('authErrorMessage');
        
        messageSpan.textContent = message;
        errorDiv.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }

    showSuccess(message) {
        const successDiv = document.getElementById('authSuccess');
        const messageSpan = document.getElementById('authSuccessMessage');
        
        messageSpan.textContent = message;
        successDiv.style.display = 'block';
    }

    clearMessages() {
        document.getElementById('authError').style.display = 'none';
        document.getElementById('authSuccess').style.display = 'none';
        
        // Clear field validation
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('valid', 'invalid');
            const error = group.querySelector('.field-error');
            if (error) error.remove();
        });
    }

    resetForms() {
        document.getElementById('loginForm').reset();
        document.getElementById('registerForm').reset();
        this.clearMessages();
    }
}

// Global auth modal instance
window.authModal = new AuthModal();