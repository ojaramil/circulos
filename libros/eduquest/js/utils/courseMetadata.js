/**
 * Course Metadata Manager - Handles course information and caching
 */
class CourseMetadata {
    static CACHE_VERSION = '1.0.0';
    static CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

    /**
     * Extended course metadata database
     */
    static EXTENDED_METADATA = {
        '001': {
            title: 'Cómo Piensan los Ricos',
            author: 'Morgan Housel',
            category: 'Finanzas Personales',
            description: 'Descubre los secretos del comportamiento financiero y cómo desarrollar una mentalidad próspera para alcanzar la libertad financiera.',
            difficulty: 'Intermedio',
            estimatedHours: 3,
            tags: ['finanzas', 'inversión', 'psicología', 'dinero'],
            isbn: '9788423432165',
            publishYear: 2020
        },
        '002': {
            title: 'El Optimista Racional',
            author: 'Matt Ridley',
            category: 'Ciencia y Progreso',
            description: 'Una perspectiva científica sobre el progreso humano y las razones fundamentadas para ser optimista sobre nuestro futuro.',
            difficulty: 'Avanzado',
            estimatedHours: 4,
            tags: ['ciencia', 'progreso', 'optimismo', 'futuro'],
            isbn: '9788430608267',
            publishYear: 2010
        },
        '003': {
            title: 'Piense y Hágase Rico',
            author: 'Napoleon Hill',
            category: 'Desarrollo Personal',
            description: 'Los principios fundamentales y atemporales para alcanzar el éxito financiero y personal a través del poder del pensamiento.',
            difficulty: 'Básico',
            estimatedHours: 3.5,
            tags: ['éxito', 'mentalidad', 'riqueza', 'motivación'],
            isbn: '9788497774574',
            publishYear: 1937
        },
        '004': {
            title: 'Inquebrantable',
            author: 'Tony Robbins',
            category: 'Finanzas Personales',
            description: 'Estrategias probadas de inversión y libertad financiera del reconocido coach de vida y experto en desarrollo personal.',
            difficulty: 'Intermedio',
            estimatedHours: 4.5,
            tags: ['inversión', 'libertad financiera', 'estrategias', 'coaching'],
            isbn: '9788416029471',
            publishYear: 2017
        },
        '005': {
            title: 'Comienza con el Por Qué',
            author: 'Simon Sinek',
            category: 'Liderazgo',
            description: 'Descubre tu propósito profundo y aprende a liderar con inspiración, autenticidad y un sentido claro de dirección.',
            difficulty: 'Intermedio',
            estimatedHours: 3,
            tags: ['liderazgo', 'propósito', 'inspiración', 'motivación'],
            isbn: '9788492921935',
            publishYear: 2009
        },
        '006': {
            title: 'Los 7 Hábitos de la Gente Altamente Efectiva',
            author: 'Stephen R. Covey',
            category: 'Desarrollo Personal',
            description: 'Principios fundamentales para el desarrollo del carácter y la efectividad personal y profesional.',
            difficulty: 'Intermedio',
            estimatedHours: 5,
            tags: ['hábitos', 'efectividad', 'carácter', 'liderazgo'],
            isbn: '9788449334818',
            publishYear: 1989
        },
        '007': {
            title: 'Padre Rico, Padre Pobre',
            author: 'Robert Kiyosaki',
            category: 'Finanzas Personales',
            description: 'Lecciones sobre dinero e inversión que no enseñan en la escuela, contrastando dos filosofías financieras.',
            difficulty: 'Básico',
            estimatedHours: 3,
            tags: ['educación financiera', 'inversión', 'activos', 'pasivos'],
            isbn: '9788466318204',
            publishYear: 1997
        },
        '008': {
            title: 'El Millonario de la Puerta de al Lado',
            author: 'Thomas J. Stanley',
            category: 'Finanzas Personales',
            description: 'Descubre los verdaderos hábitos y características de los millonarios estadounidenses.',
            difficulty: 'Intermedio',
            estimatedHours: 4,
            tags: ['millonarios', 'ahorro', 'frugalidad', 'riqueza'],
            isbn: '9788497774574',
            publishYear: 1996
        },
        '009': {
            title: 'Hábitos Atómicos',
            author: 'James Clear',
            category: 'Desarrollo Personal',
            description: 'Cambios pequeños que generan resultados extraordinarios a través del poder de los hábitos.',
            difficulty: 'Básico',
            estimatedHours: 3.5,
            tags: ['hábitos', 'productividad', 'cambio', 'mejora continua'],
            isbn: '9788418118036',
            publishYear: 2018
        },
        '010': {
            title: 'Atrévete a No Gustar',
            author: 'Ichiro Kishimi',
            category: 'Psicología',
            description: 'Libérate de tus miedos y alcanza la verdadera felicidad a través de la psicología adleriana.',
            difficulty: 'Avanzado',
            estimatedHours: 4,
            tags: ['psicología', 'autoestima', 'felicidad', 'libertad'],
            isbn: '9788408234517',
            publishYear: 2013
        },
        '011': {
            title: 'El Arte de No Amargarse la Vida',
            author: 'Rafael Santandreu',
            category: 'Psicología',
            description: 'Técnicas de terapia cognitiva para superar la ansiedad, la depresión y desarrollar fortaleza mental.',
            difficulty: 'Intermedio',
            estimatedHours: 3,
            tags: ['terapia cognitiva', 'ansiedad', 'fortaleza mental', 'bienestar'],
            isbn: '9788425352973',
            publishYear: 2014
        },
        '012': {
            title: 'Mindset: La Actitud del Éxito',
            author: 'Carol S. Dweck',
            category: 'Psicología',
            description: 'Cómo la mentalidad de crecimiento puede transformar tu vida personal y profesional.',
            difficulty: 'Intermedio',
            estimatedHours: 3.5,
            tags: ['mentalidad', 'crecimiento', 'aprendizaje', 'éxito'],
            isbn: '9788416883448',
            publishYear: 2006
        },
        '013': {
            title: 'El Poder del Ahora',
            author: 'Eckhart Tolle',
            category: 'Espiritualidad',
            description: 'Una guía hacia la iluminación espiritual a través de la presencia y la conciencia plena.',
            difficulty: 'Avanzado',
            estimatedHours: 4,
            tags: ['mindfulness', 'presente', 'conciencia', 'espiritualidad'],
            isbn: '9788484452065',
            publishYear: 1997
        },
        '014': {
            title: 'Fluir (Flow)',
            author: 'Mihaly Csikszentmihalyi',
            category: 'Psicología',
            description: 'La psicología de la experiencia óptima y cómo alcanzar el estado de flujo en la vida.',
            difficulty: 'Avanzado',
            estimatedHours: 4.5,
            tags: ['flow', 'experiencia óptima', 'concentración', 'felicidad'],
            isbn: '9788472453722',
            publishYear: 1990
        },
        '015': {
            title: 'El Hombre en Busca de Sentido',
            author: 'Viktor E. Frankl',
            category: 'Filosofía',
            description: 'Reflexiones sobre el sentido de la vida desde la experiencia en los campos de concentración.',
            difficulty: 'Avanzado',
            estimatedHours: 3,
            tags: ['sentido', 'logoterapia', 'supervivencia', 'propósito'],
            isbn: '9788425432026',
            publishYear: 1946
        },
        '016': {
            title: 'Inteligencia Emocional',
            author: 'Daniel Goleman',
            category: 'Psicología',
            description: 'Por qué es más importante que el cociente intelectual para el éxito en la vida.',
            difficulty: 'Intermedio',
            estimatedHours: 4,
            tags: ['emociones', 'inteligencia', 'relaciones', 'liderazgo'],
            isbn: '9788472453715',
            publishYear: 1995
        },
        '017': {
            title: 'El Monje que Vendió su Ferrari',
            author: 'Robin Sharma',
            category: 'Desarrollo Personal',
            description: 'Una fábula espiritual sobre cómo cumplir los sueños y alcanzar el destino.',
            difficulty: 'Básico',
            estimatedHours: 3,
            tags: ['espiritualidad', 'propósito', 'sabiduría', 'transformación'],
            isbn: '9788466318198',
            publishYear: 1997
        },
        '018': {
            title: 'Cómo Ganar Amigos e Influir sobre las Personas',
            author: 'Dale Carnegie',
            category: 'Habilidades Sociales',
            description: 'Técnicas fundamentales para tratar con las personas y ser un líder más efectivo.',
            difficulty: 'Básico',
            estimatedHours: 3.5,
            tags: ['relaciones', 'comunicación', 'liderazgo', 'influencia'],
            isbn: '9788496829657',
            publishYear: 1936
        },
        '019': {
            title: 'El Cuadrante del Flujo de Dinero',
            author: 'Robert Kiyosaki',
            category: 'Finanzas Personales',
            description: 'Guía para la libertad financiera a través de los cuatro cuadrantes del flujo de dinero.',
            difficulty: 'Intermedio',
            estimatedHours: 4,
            tags: ['libertad financiera', 'inversión', 'negocios', 'pasivos'],
            isbn: '9788466318211',
            publishYear: 1998
        },
        '020': {
            title: 'Empresas que Sobresalen',
            author: 'Jim Collins',
            category: 'Negocios',
            description: 'Por qué unas empresas dan el salto y otras no, basado en investigación de 5 años.',
            difficulty: 'Avanzado',
            estimatedHours: 5,
            tags: ['liderazgo', 'empresas', 'excelencia', 'transformación'],
            isbn: '9788498750041',
            publishYear: 2001
        },
        '021': {
            title: 'El Inversor Inteligente',
            author: 'Benjamin Graham',
            category: 'Finanzas e Inversión',
            description: 'El libro definitivo sobre inversión en valor y los principios fundamentales del mercado.',
            difficulty: 'Avanzado',
            estimatedHours: 6,
            tags: ['inversión', 'valor', 'mercado', 'análisis'],
            isbn: '9788423425952',
            publishYear: 1949
        },
        '022': {
            title: 'Pensar Rápido, Pensar Despacio',
            author: 'Daniel Kahneman',
            category: 'Psicología',
            description: 'Los dos sistemas que rigen cómo pensamos y tomamos decisiones.',
            difficulty: 'Avanzado',
            estimatedHours: 5.5,
            tags: ['psicología cognitiva', 'decisiones', 'sesgos', 'pensamiento'],
            isbn: '9788499924243',
            publishYear: 2011
        },
        '023': {
            title: 'El Arte de la Guerra',
            author: 'Sun Tzu',
            category: 'Estrategia',
            description: 'Tratado militar clásico sobre estrategia y táctica aplicable a los negocios y la vida.',
            difficulty: 'Intermedio',
            estimatedHours: 2.5,
            tags: ['estrategia', 'táctica', 'liderazgo', 'competencia'],
            isbn: '9788497774581',
            publishYear: -500
        },
        '024': {
            title: 'La Semana Laboral de 4 Horas',
            author: 'Timothy Ferriss',
            category: 'Productividad',
            description: 'Escapa de la rutina de 9-5, vive en cualquier lugar y únete a los nuevos ricos.',
            difficulty: 'Intermedio',
            estimatedHours: 4,
            tags: ['productividad', 'automatización', 'libertad', 'emprendimiento'],
            isbn: '9788498750058',
            publishYear: 2007
        },
        '025': {
            title: 'El Método Lean Startup',
            author: 'Eric Ries',
            category: 'Emprendimiento',
            description: 'Cómo crear empresas de éxito utilizando la innovación continua.',
            difficulty: 'Intermedio',
            estimatedHours: 4,
            tags: ['startup', 'innovación', 'emprendimiento', 'metodología'],
            isbn: '9788423413959',
            publishYear: 2011
        },
        '026': {
            title: 'De Cero a Uno',
            author: 'Peter Thiel',
            category: 'Emprendimiento',
            description: 'Notas sobre startups o cómo construir el futuro.',
            difficulty: 'Avanzado',
            estimatedHours: 3.5,
            tags: ['startups', 'innovación', 'monopolio', 'tecnología'],
            isbn: '9788423419463',
            publishYear: 2014
        },
        '027': {
            title: 'El Cisne Negro',
            author: 'Nassim Nicholas Taleb',
            category: 'Filosofía',
            description: 'El impacto de lo altamente improbable en nuestras vidas y decisiones.',
            difficulty: 'Avanzado',
            estimatedHours: 5,
            tags: ['incertidumbre', 'probabilidad', 'riesgo', 'filosofía'],
            isbn: '9788449320781',
            publishYear: 2007
        },
        '028': {
            title: 'Antifrágil',
            author: 'Nassim Nicholas Taleb',
            category: 'Filosofía',
            description: 'Las cosas que se benefician del desorden y cómo prosperar en un mundo incierto.',
            difficulty: 'Avanzado',
            estimatedHours: 5.5,
            tags: ['antifragilidad', 'incertidumbre', 'adaptación', 'resiliencia'],
            isbn: '9788449329357',
            publishYear: 2012
        },
        '029': {
            title: 'El Dilema de la Innovación',
            author: 'Clayton M. Christensen',
            category: 'Negocios',
            description: 'Cuando las nuevas tecnologías hacen fracasar a las grandes empresas.',
            difficulty: 'Avanzado',
            estimatedHours: 4.5,
            tags: ['innovación', 'tecnología', 'disrupción', 'estrategia'],
            isbn: '9788423425969',
            publishYear: 1997
        },
        '030': {
            title: 'Nudge: Un Pequeño Empujón',
            author: 'Richard H. Thaler',
            category: 'Economía Conductual',
            description: 'Cómo mejorar nuestras decisiones sobre salud, dinero y felicidad.',
            difficulty: 'Intermedio',
            estimatedHours: 4,
            tags: ['economía conductual', 'decisiones', 'sesgos', 'política'],
            isbn: '9788430608270',
            publishYear: 2008
        },
        '031': {
            title: 'El Mundo es Plano',
            author: 'Thomas L. Friedman',
            category: 'Globalización',
            description: 'Breve historia del mundo globalizado en el siglo XXI.',
            difficulty: 'Intermedio',
            estimatedHours: 5,
            tags: ['globalización', 'tecnología', 'economía', 'futuro'],
            isbn: '9788497593748',
            publishYear: 2005
        },
        '032': {
            title: 'Freakonomics',
            author: 'Steven D. Levitt',
            category: 'Economía',
            description: 'Un economista políticamente incorrecto explora el lado oculto de lo que nos afecta.',
            difficulty: 'Intermedio',
            estimatedHours: 3.5,
            tags: ['economía', 'estadística', 'sociedad', 'incentivos'],
            isbn: '9788498750065',
            publishYear: 2005
        },
        '033': {
            title: 'El Largo Camino hacia la Libertad',
            author: 'Nelson Mandela',
            category: 'Biografía',
            description: 'La autobiografía del líder sudafricano y su lucha contra el apartheid.',
            difficulty: 'Intermedio',
            estimatedHours: 6,
            tags: ['biografía', 'liderazgo', 'justicia', 'perseverancia'],
            isbn: '9788403012943',
            publishYear: 1994
        },
        '034': {
            title: 'Steve Jobs',
            author: 'Walter Isaacson',
            category: 'Biografía',
            description: 'La biografía autorizada del cofundador de Apple y visionario tecnológico.',
            difficulty: 'Intermedio',
            estimatedHours: 7,
            tags: ['biografía', 'tecnología', 'innovación', 'liderazgo'],
            isbn: '9788499921846',
            publishYear: 2011
        },
        '035': {
            title: 'El Gen Egoísta',
            author: 'Richard Dawkins',
            category: 'Ciencia',
            description: 'Una nueva visión de la teoría de la evolución desde la perspectiva de los genes.',
            difficulty: 'Avanzado',
            estimatedHours: 5,
            tags: ['evolución', 'genética', 'biología', 'ciencia'],
            isbn: '9788434589339',
            publishYear: 1976
        },
        '036': {
            title: 'Sapiens: De Animales a Dioses',
            author: 'Yuval Noah Harari',
            category: 'Historia',
            description: 'Una breve historia de la humanidad desde la revolución cognitiva hasta el presente.',
            difficulty: 'Intermedio',
            estimatedHours: 5.5,
            tags: ['historia', 'humanidad', 'evolución', 'sociedad'],
            isbn: '9788499926223',
            publishYear: 2011
        },
        '037': {
            title: 'Homo Deus: Breve Historia del Mañana',
            author: 'Yuval Noah Harari',
            category: 'Futurismo',
            description: 'Qué pasará con la humanidad cuando los algoritmos nos conozcan mejor que nosotros mismos.',
            difficulty: 'Avanzado',
            estimatedHours: 5,
            tags: ['futuro', 'tecnología', 'inteligencia artificial', 'humanidad'],
            isbn: '9788499926841',
            publishYear: 2015
        },
        '038': {
            title: '21 Lecciones para el Siglo XXI',
            author: 'Yuval Noah Harari',
            category: 'Filosofía Contemporánea',
            description: 'Cómo sobrevivir en un mundo de fake news, inteligencia artificial y incertidumbre.',
            difficulty: 'Avanzado',
            estimatedHours: 4.5,
            tags: ['siglo XXI', 'tecnología', 'sociedad', 'futuro'],
            isbn: '9788499927541',
            publishYear: 2018
        },
        '039': {
            title: 'El Algoritmo del Éxito',
            author: 'Albert-László Barabási',
            category: 'Ciencia del Éxito',
            description: 'Las cinco leyes universales que rigen el éxito en cualquier campo.',
            difficulty: 'Avanzado',
            estimatedHours: 4,
            tags: ['éxito', 'redes', 'ciencia', 'algoritmos'],
            isbn: '9788408206057',
            publishYear: 2018
        }
    };

    /**
     * Get enhanced metadata for a course
     */
    static getMetadata(courseId) {
        const metadata = this.EXTENDED_METADATA[courseId];
        if (metadata) {
            return {
                ...metadata,
                id: courseId,
                thumbnail: this.generateThumbnail(metadata.title, metadata.category),
                slug: this.generateSlug(metadata.title)
            };
        }

        return {
            id: courseId,
            title: `Curso ${courseId}`,
            author: 'Autor Desconocido',
            category: 'General',
            description: 'Curso de aprendizaje interactivo con lecciones y actividades gamificadas.',
            difficulty: 'Intermedio',
            estimatedHours: 2,
            tags: ['aprendizaje', 'interactivo'],
            thumbnail: this.generateThumbnail(`Curso ${courseId}`, 'General'),
            slug: `curso-${courseId}`
        };
    }

    /**
     * Generate course slug for URLs
     */
    static generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[áàäâ]/g, 'a')
            .replace(/[éèëê]/g, 'e')
            .replace(/[íìïî]/g, 'i')
            .replace(/[óòöô]/g, 'o')
            .replace(/[úùüû]/g, 'u')
            .replace(/[ñ]/g, 'n')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    }

    /**
     * Generate thumbnail with improved design
     */
    static generateThumbnail(title, category) {
        const categoryConfig = {
            'Finanzas personales': {
                color: '#28A745',
                gradient: 'linear-gradient(135deg, #28A745, #20C997)',
                icon: '💰'
            },
            'Ciencia y Optimismo': {
                color: '#007BFF',
                gradient: 'linear-gradient(135deg, #007BFF, #6610F2)',
                icon: '🔬'
            },
            'Liderazgo y Propósito': {
                color: '#6F42C1',
                gradient: 'linear-gradient(135deg, #6F42C1, #E83E8C)',
                icon: '🎯'
            },
            'Desarrollo Personal': {
                color: '#FFC107',
                gradient: 'linear-gradient(135deg, #FFC107, #FD7E14)',
                icon: '🌟'
            },
            'Tecnología': {
                color: '#17A2B8',
                gradient: 'linear-gradient(135deg, #17A2B8, #6F42C1)',
                icon: '💻'
            },
            'Historia': {
                color: '#FD7E14',
                gradient: 'linear-gradient(135deg, #FD7E14, #DC3545)',
                icon: '📚'
            },
            'Filosofía': {
                color: '#20C997',
                gradient: 'linear-gradient(135deg, #20C997, #007BFF)',
                icon: '🤔'
            },
            'Psicología': {
                color: '#E83E8C',
                gradient: 'linear-gradient(135deg, #E83E8C, #6F42C1)',
                icon: '🧠'
            },
            'Negocios': {
                color: '#343A40',
                gradient: 'linear-gradient(135deg, #343A40, #6C757D)',
                icon: '💼'
            },
            'General': {
                color: '#6C757D',
                gradient: 'linear-gradient(135deg, #6C757D, #ADB5BD)',
                icon: '📖'
            }
        };

        const config = categoryConfig[category] || categoryConfig['General'];
        
        // Generate meaningful initials
        let initials;
        if (title.includes(' ')) {
            const words = title.split(' ').filter(word => word.length > 2);
            initials = words.slice(0, 2)
                .map(word => word.charAt(0))
                .join('')
                .toUpperCase();
        } else {
            initials = title.substring(0, 2).toUpperCase();
        }

        if (!initials || initials.length === 0) {
            initials = title.substring(0, 2).toUpperCase() || 'CU';
        }

        return {
            color: config.color,
            gradient: config.gradient,
            initials,
            icon: config.icon,
            title,
            category
        };
    }

    /**
     * Cache course metadata
     */
    static cacheMetadata(courseId, metadata) {
        try {
            const cacheKey = `eduquest_course_meta_${courseId}`;
            const cacheData = {
                version: this.CACHE_VERSION,
                timestamp: Date.now(),
                metadata
            };
            
            StorageManager.save(cacheKey, cacheData);
            return true;
        } catch (error) {
            console.warn('Failed to cache metadata:', error);
            return false;
        }
    }

    /**
     * Load cached metadata
     */
    static loadCachedMetadata(courseId) {
        try {
            const cacheKey = `eduquest_course_meta_${courseId}`;
            const cacheData = StorageManager.load(cacheKey);
            
            if (!cacheData || cacheData.version !== this.CACHE_VERSION) {
                return null;
            }

            const age = Date.now() - cacheData.timestamp;
            if (age > this.CACHE_DURATION) {
                return null;
            }

            return cacheData.metadata;
        } catch (error) {
            console.warn('Failed to load cached metadata:', error);
            return null;
        }
    }

    /**
     * Get all available categories
     */
    static getAllCategories() {
        const categories = new Set();
        Object.values(this.EXTENDED_METADATA).forEach(meta => {
            categories.add(meta.category);
        });
        return Array.from(categories).sort();
    }

    /**
     * Get all available tags
     */
    static getAllTags() {
        const tags = new Set();
        Object.values(this.EXTENDED_METADATA).forEach(meta => {
            meta.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }

    /**
     * Search courses by query
     */
    static searchCourses(query, courses) {
        if (!query || query.trim() === '') {
            return Array.from(courses.values());
        }

        const searchTerm = query.toLowerCase().trim();
        
        return Array.from(courses.values()).filter(course => {
            const metadata = this.getMetadata(course.id);
            
            return (
                course.title.toLowerCase().includes(searchTerm) ||
                metadata.author.toLowerCase().includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm) ||
                course.category.toLowerCase().includes(searchTerm) ||
                metadata.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        });
    }

    /**
     * Filter courses by category
     */
    static filterByCategory(category, courses) {
        if (!category || category === 'all') {
            return Array.from(courses.values());
        }

        return Array.from(courses.values()).filter(course => 
            course.category === category
        );
    }

    /**
     * Sort courses by criteria
     */
    static sortCourses(courses, sortBy, progressMap) {
        const courseArray = Array.isArray(courses) ? courses : Array.from(courses.values());
        
        return courseArray.sort((a, b) => {
            switch (sortBy) {
                case 'progress':
                    const progressA = progressMap.get(a.id)?.completionPercentage || 0;
                    const progressB = progressMap.get(b.id)?.completionPercentage || 0;
                    return progressB - progressA;
                
                case 'recent':
                    const lastAccessA = progressMap.get(a.id)?.lastAccessedAt || '0';
                    const lastAccessB = progressMap.get(b.id)?.lastAccessedAt || '0';
                    return new Date(lastAccessB) - new Date(lastAccessA);
                
                case 'difficulty':
                    const difficultyOrder = { 'Básico': 1, 'Intermedio': 2, 'Avanzado': 3 };
                    const metaA = this.getMetadata(a.id);
                    const metaB = this.getMetadata(b.id);
                    return (difficultyOrder[metaA.difficulty] || 2) - (difficultyOrder[metaB.difficulty] || 2);
                
                case 'duration':
                    const metaA2 = this.getMetadata(a.id);
                    const metaB2 = this.getMetadata(b.id);
                    return metaA2.estimatedHours - metaB2.estimatedHours;
                
                default: // title
                    return a.title.localeCompare(b.title, 'es', { sensitivity: 'base' });
            }
        });
    }

    /**
     * Get course recommendations based on user progress
     */
    static getRecommendations(userId, courses, progressMap, limit = 3) {
        const completedCourses = new Set();
        const userCategories = new Set();
        
        // Analyze user's completed courses and preferences
        progressMap.forEach((progress, courseId) => {
            if (progress.completedAt) {
                completedCourses.add(courseId);
                const course = courses.get(courseId);
                if (course) {
                    userCategories.add(course.category);
                }
            }
        });

        // Get uncompleted courses
        const availableCourses = Array.from(courses.values())
            .filter(course => !completedCourses.has(course.id));

        // Score courses based on user preferences
        const scoredCourses = availableCourses.map(course => {
            let score = 0;
            
            // Prefer categories user has shown interest in
            if (userCategories.has(course.category)) {
                score += 3;
            }
            
            // Prefer courses with some progress
            const progress = progressMap.get(course.id);
            if (progress && progress.completionPercentage > 0) {
                score += 2;
            }
            
            // Prefer intermediate difficulty
            const metadata = this.getMetadata(course.id);
            if (metadata.difficulty === 'Intermedio') {
                score += 1;
            }
            
            return { course, score };
        });

        // Sort by score and return top recommendations
        return scoredCourses
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.course);
    }
}