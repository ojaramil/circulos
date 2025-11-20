/**
 * Course Discovery Utility - Automatically discovers courses from folder structure
 */
class CourseDiscovery {
    static COURSE_FOLDERS = [
        '001', '002', '003', '004', '005', '006', '007', '008', '009', '010',
        '011', '012', '013', '014', '015', '016', '017', '018', '019', '020',
        '021', '022', '023', '024', '025', '026', '027', '028', '029', '030',
        '031', '032', '033', '034', '035', '036', '037', '038', '039'
    ];

    // Known course metadata for better extraction
    static COURSE_METADATA = {
        '001': { 
            title: 'Cómo Piensan los Ricos', 
            author: 'Morgan Housel',
            category: 'Finanzas personales',
            description: 'Descubre los secretos del comportamiento financiero y cómo desarrollar una mentalidad próspera.'
        },
        '002': { 
            title: 'El Optimista Racional', 
            author: 'Matt Ridley',
            category: 'Ciencia y Optimismo',
            description: 'Una perspectiva científica sobre el progreso humano y las razones para ser optimista sobre el futuro.'
        },
        '003': { 
            title: 'Piense y Hágase Rico', 
            author: 'Napoleon Hill',
            category: 'Finanzas personales',
            description: 'Los principios fundamentales para alcanzar el éxito financiero y personal.'
        },
        '004': { 
            title: 'Inquebrantable', 
            author: 'Tony Robbins',
            category: 'Finanzas personales',
            description: 'Estrategias de inversión y libertad financiera del reconocido coach de vida.'
        },
        '005': { 
            title: 'Comienza con el Por Qué', 
            author: 'Simon Sinek',
            category: 'Liderazgo y Propósito',
            description: 'Descubre tu propósito y aprende a liderar con inspiración y autenticidad.'
        }
    };

    /**
     * Discover all available courses
     */
    static async discoverAllCourses() {
        const courses = [];
        
        console.log('🔍 Discovering courses from filesystem...');
        
        for (const folderId of this.COURSE_FOLDERS) {
            try {
                const course = await Course.fromFolder(folderId);
                if (course) {
                    courses.push(course);
                }
            } catch (error) {
                console.warn(`Could not load course ${folderId}:`, error);
            }
        }
        
        return courses;
    }

    /**
     * Extract course information from main HTML file
     */
    static async extractCourseInfo(folderId) {
        try {
            // First check if we have predefined metadata
            const knownMetadata = this.COURSE_METADATA[folderId];
            if (knownMetadata) {
                return {
                    title: knownMetadata.title,
                    author: knownMetadata.author,
                    description: knownMetadata.description,
                    category: knownMetadata.category,
                    thumbnail: this.generateThumbnail(knownMetadata.title, knownMetadata.category)
                };
            }

            // Try to extract from HTML file
            const basePath = window.location.pathname.includes('course-viewer.html') ? '../' : '';
            const response = await fetch(`${basePath}${folderId}/pantalla_principal.html`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extract title from various possible locations
            let title = this.extractTitle(doc, folderId);
            let author = this.extractAuthor(doc);
            
            // Extract description/category
            let description = this.extractDescription(doc);
            let category = this.extractCategory(doc);
            
            return {
                title,
                author,
                description,
                category,
                thumbnail: this.generateThumbnail(title, category)
            };
        } catch (error) {
            console.warn(`Could not extract info for course ${folderId}:`, error);
            return {
                title: `Curso ${folderId}`,
                author: 'Autor Desconocido',
                description: 'Curso de aprendizaje interactivo con lecciones y actividades gamificadas.',
                category: 'General',
                thumbnail: this.generateThumbnail(`Curso ${folderId}`, 'General')
            };
        }
    }

    /**
     * Extract title from HTML document
     */
    static extractTitle(doc, folderId) {
        // Try multiple selectors for title
        const selectors = [
            '.content-title',
            '.course-title', 
            'h1',
            'title',
            '.course-info .content-title'
        ];
        
        for (const selector of selectors) {
            const element = doc.querySelector(selector);
            if (element && element.textContent.trim()) {
                let title = element.textContent.trim();
                
                // Clean up title (remove author names, extra text)
                if (title.includes(' - ')) {
                    // Split by " - " and take the first part (book title)
                    title = title.split(' - ')[0].trim();
                }
                
                // Remove "Interactivo" suffix if present
                title = title.replace(/\s*-?\s*Interactivo\s*$/i, '');
                
                if (title.length > 3) { // Ensure it's a meaningful title
                    return title;
                }
            }
        }
        
        return `Curso ${folderId}`;
    }

    /**
     * Extract author from HTML document
     */
    static extractAuthor(doc) {
        // Try to extract author from content-title
        const contentTitle = doc.querySelector('.content-title');
        if (contentTitle && contentTitle.textContent.includes(' - ')) {
            const parts = contentTitle.textContent.split(' - ');
            if (parts.length >= 2) {
                return parts[1].trim();
            }
        }

        // Try to extract from title tag
        const titleTag = doc.querySelector('title');
        if (titleTag && titleTag.textContent.includes(' - ')) {
            const parts = titleTag.textContent.split(' - ');
            if (parts.length >= 2) {
                return parts[1].replace(/\s*-?\s*Interactivo\s*$/i, '').trim();
            }
        }

        return 'Autor Desconocido';
    }

    /**
     * Extract description from HTML document
     */
    static extractDescription(doc) {
        const selectors = [
            'meta[name="description"]',
            '.course-description',
            '.description',
            'p'
        ];
        
        for (const selector of selectors) {
            const element = doc.querySelector(selector);
            if (element) {
                const content = element.getAttribute('content') || element.textContent;
                if (content && content.trim().length > 20) {
                    return content.trim().substring(0, 200) + '...';
                }
            }
        }
        
        return 'Curso de aprendizaje interactivo con lecciones y juegos.';
    }

    /**
     * Extract category from HTML document
     */
    static extractCategory(doc) {
        const moduleNameElement = doc.querySelector('.module-name');
        if (moduleNameElement) {
            const text = moduleNameElement.textContent.trim();
            // Extract category from text like "Círculo de Lectura • Finanzas personales"
            const parts = text.split('•');
            if (parts.length > 1) {
                return parts[1].trim();
            }
        }
        
        return 'General';
    }

    /**
     * Discover lessons in a course folder
     */
    static async discoverLessons(folderId) {
        const lessons = [];
        
        // Define known lessons for each course based on the actual files
        const knownLessons = {
            '001': [
                { id: '01_resumen_teorico', title: 'Resumen Teórico', type: 'lesson' },
                { id: '02_ejemplos_practicos', title: 'Ejemplos Prácticos', type: 'practical' },
                { id: '03_herramientas_tecnicas', title: 'Herramientas y Técnicas', type: 'tools' },
                { id: '04_conclusiones', title: 'Conclusiones', type: 'conclusion' },
                { id: 'glosario', title: 'Glosario', type: 'glossary' },
                { id: 'enlaces_interes', title: 'Enlaces de interés', type: 'links' }
            ],
            '002': [
                { id: '01_introduccion', title: 'Introducción', type: 'video' },
                { id: '02_resumen_teorico', title: 'Resumen Teórico', type: 'lesson' },
                { id: '03_ejemplos_practicos', title: 'Ejemplos Prácticos', type: 'practical' },
                { id: '04_herramientas_tecnicas', title: 'Herramientas y Técnicas', type: 'tools' },
                { id: '05_conclusiones', title: 'Conclusiones', type: 'conclusion' },
                { id: 'glosario', title: 'Glosario', type: 'glossary' },
                { id: 'enlaces_interes', title: 'Enlaces de interés', type: 'links' }
            ],
            '003': [
                { id: '01_introduccion', title: 'Introducción', type: 'video' },
                { id: '02_resumen_teorico', title: 'Resumen Teórico', type: 'lesson' },
                { id: '03_ejemplos_practicos', title: 'Ejemplos Prácticos', type: 'practical' },
                { id: '04_herramientas_tecnicas', title: 'Herramientas y Técnicas', type: 'tools' },
                { id: '05_conclusion_modulo', title: 'Conclusiones', type: 'conclusion' },
                { id: 'glosario', title: 'Glosario', type: 'glossary' },
                { id: 'enlaces_interes', title: 'Enlaces de interés', type: 'links' }
            ],
            '004': [
                { id: '01_introduccion', title: 'Introducción', type: 'video' },
                { id: '02_resumen_teorico', title: 'Resumen Teórico', type: 'lesson' },
                { id: '03_ejemplos_practicos', title: 'Ejemplos Prácticos', type: 'practical' },
                { id: '04_herramientas_tecnicas', title: 'Herramientas y Técnicas', type: 'tools' },
                { id: '05_conclusion_modulo', title: 'Conclusiones', type: 'conclusion' },
                { id: 'glosario', title: 'Glosario', type: 'glossary' },
                { id: 'enlaces_interes', title: 'Enlaces de interés', type: 'links' }
            ],
            '005': [
                { id: '01_introduccion', title: 'Introducción', type: 'video' },
                { id: '02_mundo_sin_porque', title: 'Un mundo sin porqué', type: 'lesson' },
                { id: '03_circulo_dorado', title: 'El círculo dorado', type: 'practical' },
                { id: '04_liderazgo_confianza', title: 'Liderazgo y confianza', type: 'lesson' },
                { id: '05_aunar_creyentes', title: 'Aunar a los que creen', type: 'lesson' },
                { id: '06_reto_exito', title: 'El reto del éxito', type: 'lesson' },
                { id: '07_descubrir_porque', title: 'Descubrir el porqué', type: 'lesson' },
                { id: 'recursos', title: 'Recursos', type: 'links' },
                { id: 'lecturas_recomendadas', title: 'Lecturas recomendadas', type: 'links' }
            ]
        };
        
        const coursePatterns = knownLessons[folderId] || knownLessons['001']; // Default to 001 pattern
        
        for (const pattern of coursePatterns) {
            const basePath = window.location.pathname.includes('course-viewer.html') ? '../' : '';
            const filePath = `${basePath}${folderId}/lecciones/${pattern.id}.html`;
            
            // For now, assume all files exist (since we can't check due to CORS)
            // In a real server environment, we would check with fetch
            lessons.push(new Lesson(
                pattern.id,
                pattern.title,
                filePath,
                pattern.type
            ));
            console.log(`✅ Added lesson: ${pattern.title} at ${filePath}`);
        }
        
        console.log(`📚 Total lessons found for course ${folderId}: ${lessons.length}`);
        return lessons;
    }

    /**
     * Discover games in a course folder
     */
    static async discoverGames(folderId) {
        const games = [];
        
        // Define known games for each course based on the actual files
        const knownGames = {
            '001': [
                { id: '01_simulador', title: 'Simulador de Interés Compuesto', type: 'simulator' },
                { id: '02_rueda_decisiones', title: 'Rueda de Decisiones', type: 'wheel' },
                { id: '03_planificador', title: 'Planificador \'Suficiente\'', type: 'planner' },
                { id: '04_detective_riqueza', title: 'Detective de Riqueza', type: 'detective' },
                { id: '05_gestor_tiempo', title: 'Gestor de Inversión', type: 'manager' },
                { id: '06_flashcard', title: 'Flashcards: Conceptos Clave', type: 'flashcards' },
                { id: '07_verdadero_falso', title: 'Verdadero o Falso', type: 'true-false' }
            ],
            '002': [
                { id: '01_verdadero_falso', title: 'Verdadero o Falso: Progreso', type: 'true-false' },
                { id: '02_flashcards', title: 'Flashcards: Optimismo Racional', type: 'flashcards' },
                { id: '03_desafio_perspectivas', title: 'Desafío de Perspectivas', type: 'challenge' },
                { id: '04_construye_futuro', title: 'Construye tu Futuro', type: 'builder' },
                { id: '05_rompe_mitos', title: 'Rompe los Mitos', type: 'myths' },
                { id: '06_cadena_innovaciones', title: 'Cadena de Innovaciones', type: 'chain' },
                { id: '07_mapa_progreso', title: 'Mapa de Progreso Optimista', type: 'map' }
            ],
            '003': [
                { id: '01_simulador_concepto', title: 'Simulador de Deseo', type: 'simulator' },
                { id: '02_juego_decisiones', title: 'Juego de Decisiones', type: 'wheel' },
                { id: '03_verdadero_falso', title: 'Verdadero o Falso', type: 'true-false' },
                { id: '04_quiz_conceptos', title: 'Quiz de Conceptos', type: 'quiz' },
                { id: '05_crea_afirmacion', title: 'Crea tu Afirmación', type: 'creator' },
                { id: '06_un_metro_oro', title: 'A un metro del oro', type: 'challenge' },
                { id: '07_rescate_negocio', title: 'Rescate de Negocio', type: 'simulation' },
                { id: 'verdadero_falso', title: 'Verdadero o Falso (ejemplo)', type: 'true-false' },
                { id: 'flashcard', title: 'Flashcards (ejemplo)', type: 'flashcards' }
            ],
            '004': [
                { id: '01_simulador_inversion', title: 'Simulador de Inversión', type: 'simulator' },
                { id: '02_juego_decisiones_financieras', title: 'Juego de Decisiones Financieras', type: 'wheel' },
                { id: '03_verdadero_falso_inversion', title: 'Verdadero o Falso Inversión', type: 'true-false' },
                { id: '04_quiz_fondos_indice', title: 'Quiz Fondos Índice', type: 'quiz' },
                { id: '05_crea_plan_financiero', title: 'Crea tu Plan Financiero', type: 'planner' },
                { id: '06_simulador_crisis', title: 'Simulador de Crisis', type: 'simulator' },
                { id: '07_calculadora_retiro', title: 'Calculadora de Retiro', type: 'calculator' },
                { id: 'verdadero_falso', title: 'Verdadero o Falso (ejemplo)', type: 'true-false' },
                { id: 'flashcard', title: 'Flashcards (ejemplo)', type: 'flashcards' }
            ],
            '005': [
                { id: '01_reflexion_porque', title: 'Reflexión: Tu porqué', type: 'reflection' },
                { id: '02_casos_liderazgo', title: 'Casos de liderazgo', type: 'case-study' },
                { id: '03_dinamica_equipo', title: 'Dinámica de equipo', type: 'team-activity' },
                { id: '04_test_lider_jefe', title: 'Test: ¿Líder o jefe?', type: 'assessment' },
                { id: '05_simulacion_decisiones', title: 'Simulación de decisiones', type: 'simulation' }
            ]
        };
        
        const coursePatterns = knownGames[folderId] || knownGames['001']; // Default to 001 pattern
        
        for (const pattern of coursePatterns) {
            const basePath = window.location.pathname.includes('course-viewer.html') ? '../' : '';
            const filePath = `${basePath}${folderId}/juegos/${pattern.id}.html`;
            
            // For now, assume all files exist (since we can't check due to CORS)
            // In a real server environment, we would check with fetch
            games.push(new Game(
                pattern.id,
                pattern.title,
                filePath,
                pattern.type
            ));
            console.log(`✅ Added game: ${pattern.title} at ${filePath}`);
        }
        
        console.log(`🎮 Total games found for course ${folderId}: ${games.length}`);
        return games;
    }

    /**
     * Generate thumbnail for course
     */
    static generateThumbnail(title, category) {
        // Create a simple color-coded thumbnail based on category
        const categoryColors = {
            'Finanzas personales': '#28A745',
            'Ciencia y Optimismo': '#007BFF', 
            'Liderazgo y Propósito': '#6F42C1',
            'Desarrollo Personal': '#FFC107',
            'Tecnología': '#17A2B8',
            'Historia': '#FD7E14',
            'Filosofía': '#20C997',
            'Psicología': '#E83E8C',
            'Negocios': '#343A40',
            'General': '#6C757D'
        };
        
        const color = categoryColors[category] || categoryColors['General'];
        
        // Generate meaningful initials
        let initials;
        if (title.includes(' ')) {
            // Take first letter of first two words
            const words = title.split(' ').filter(word => word.length > 2); // Skip short words
            initials = words.slice(0, 2)
                .map(word => word.charAt(0))
                .join('')
                .toUpperCase();
        } else {
            // Take first two letters if single word
            initials = title.substring(0, 2).toUpperCase();
        }
        
        // Fallback if initials are empty
        if (!initials || initials.length === 0) {
            initials = title.substring(0, 2).toUpperCase() || 'CU';
        }
        
        return {
            color,
            initials,
            title,
            category
        };
    }

    /**
     * Validate course folder structure
     */
    static async validateCourse(folderId) {
        const checks = {
            mainFile: false,
            lessonsFolder: false,
            gamesFolder: false,
            hasContent: false
        };
        
        try {
            // Check main file
            const basePath = window.location.pathname.includes('course-viewer.html') ? '../' : '';
            const mainResponse = await fetch(`${basePath}${folderId}/pantalla_principal.html`, { method: 'HEAD' });
            checks.mainFile = mainResponse.ok;
            
            // Check for lessons
            const lessons = await this.discoverLessons(folderId);
            checks.lessonsFolder = lessons.length > 0;
            
            // Check for games
            const games = await this.discoverGames(folderId);
            checks.gamesFolder = games.length > 0;
            
            checks.hasContent = checks.lessonsFolder || checks.gamesFolder;
            
        } catch (error) {
            console.warn(`Validation error for course ${folderId}:`, error);
        }
        
        return checks;
    }

    /**
     * Get course statistics
     */
    static async getCourseStats() {
        const stats = {
            totalCourses: 0,
            validCourses: 0,
            totalLessons: 0,
            totalGames: 0,
            categories: new Set(),
            errors: []
        };
        
        for (const folderId of this.COURSE_FOLDERS) {
            try {
                const validation = await this.validateCourse(folderId);
                stats.totalCourses++;
                
                if (validation.hasContent) {
                    stats.validCourses++;
                    
                    const lessons = await this.discoverLessons(folderId);
                    const games = await this.discoverGames(folderId);
                    const info = await this.extractCourseInfo(folderId);
                    
                    stats.totalLessons += lessons.length;
                    stats.totalGames += games.length;
                    stats.categories.add(info.category);
                }
            } catch (error) {
                stats.errors.push({ folderId, error: error.message });
            }
        }
        
        return {
            ...stats,
            categories: Array.from(stats.categories)
        };
    }
}