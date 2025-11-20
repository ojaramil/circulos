// Script inteligente para poblar títulos de lecciones basado en archivos existentes
const fs = require('fs');
const path = require('path');

// Títulos de cursos y temas generales
const courseData = {
    '001': { title: 'Cómo Piensan los Ricos', theme: 'finanzas' },
    '002': { title: 'Factfulness - Pensamiento Basado en Hechos', theme: 'pensamiento_critico' },
    '003': { title: 'Piense y Hágase Rico', theme: 'exito_personal' },
    '004': { title: 'Inversión en Fondos Índice', theme: 'inversiones' },
    '005': { title: 'Empieza con el Porqué - Liderazgo', theme: 'liderazgo' },
    '006': { title: 'Gestión del Tiempo y Productividad', theme: 'productividad' },
    '007': { title: 'Comunicación Efectiva y Oratoria', theme: 'comunicacion' },
    '008': { title: 'Inteligencia Emocional', theme: 'desarrollo_personal' },
    '009': { title: 'Emprendimiento y Negocios', theme: 'negocios' },
    '010': { title: 'Atrévete a No Gustar - Psicología Adleriana', theme: 'psicologia' },
    '011': { title: 'Marketing Digital y Redes Sociales', theme: 'marketing' },
    '012': { title: 'Programación Web Básica', theme: 'tecnologia' },
    '013': { title: 'Diseño Gráfico y Creatividad', theme: 'diseño' },
    '014': { title: 'Mindfulness y Meditación', theme: 'bienestar' },
    '015': { title: 'Fotografía Digital', theme: 'arte' },
    '016': { title: 'Nutrición y Alimentación Saludable', theme: 'salud' },
    '017': { title: 'Análisis de Datos con Excel', theme: 'tecnologia' },
    '018': { title: 'Escritura Creativa y Storytelling', theme: 'comunicacion' },
    '019': { title: 'Gestión de Proyectos', theme: 'gestion' },
    '020': { title: 'De Buena a Grandiosa - Liderazgo Empresarial', theme: 'liderazgo' },
    '021': { title: 'Ventas y Negociación', theme: 'ventas' },
    '022': { title: 'Idiomas: Inglés Conversacional', theme: 'idiomas' },
    '023': { title: 'Finanzas Personales Avanzadas', theme: 'finanzas' },
    '024': { title: 'Desarrollo de Aplicaciones Móviles', theme: 'tecnologia' },
    '025': { title: 'Psicología Positiva y Felicidad', theme: 'desarrollo_personal' },
    '026': { title: 'Cocina Internacional', theme: 'gastronomia' },
    '027': { title: 'Yoga y Flexibilidad', theme: 'fitness' },
    '028': { title: 'Criptomonedas e Inversión Digital', theme: 'finanzas' },
    '029': { title: 'Jardinería y Plantas', theme: 'hogar' },
    '030': { title: 'Música y Composición', theme: 'arte' },
    '031': { title: 'E-commerce y Tienda Online', theme: 'negocios' },
    '032': { title: 'Sostenibilidad y Medio Ambiente', theme: 'medio_ambiente' },
    '033': { title: 'Inversión en Bienes Raíces', theme: 'inversiones' },
    '034': { title: 'Ciencia de Datos y Analytics', theme: 'tecnologia' },
    '035': { title: 'Arte y Pintura', theme: 'arte' },
    '036': { title: 'Mecánica Automotriz Básica', theme: 'tecnico' },
    '037': { title: 'Astronomía y Cosmos', theme: 'ciencia' },
    '038': { title: 'Carpintería y Trabajos en Madera', theme: 'manualidades' },
    '039': { title: 'Historia del Arte', theme: 'cultura' }
};

// Plantillas de títulos por tipo de archivo y tema
const titleTemplates = {
    '01_introduccion': {
        finanzas: 'Introducción a las Finanzas Inteligentes',
        pensamiento_critico: 'Introducción al Pensamiento Factual',
        exito_personal: 'El Poder del Pensamiento',
        inversiones: 'Introducción a las Inversiones',
        liderazgo: 'Fundamentos del Liderazgo',
        productividad: 'Fundamentos de la Productividad',
        comunicacion: 'Principios de Comunicación Efectiva',
        desarrollo_personal: 'Introducción al Desarrollo Personal',
        negocios: 'Mentalidad Emprendedora',
        psicologia: 'Fundamentos Psicológicos',
        marketing: 'Fundamentos del Marketing Digital',
        tecnologia: 'Introducción a la Tecnología',
        diseño: 'Principios del Diseño',
        bienestar: 'Introducción al Bienestar',
        arte: 'Fundamentos del Arte',
        salud: 'Principios de Salud',
        gestion: 'Fundamentos de Gestión',
        ventas: 'Fundamentos de las Ventas',
        idiomas: 'Fundamentos del Idioma',
        gastronomia: 'Fundamentos Culinarios',
        fitness: 'Introducción al Fitness',
        hogar: 'Fundamentos del Hogar',
        medio_ambiente: 'Introducción a la Sostenibilidad',
        ciencia: 'Fundamentos Científicos',
        tecnico: 'Fundamentos Técnicos',
        manualidades: 'Introducción a las Manualidades',
        cultura: 'Fundamentos Culturales'
    },
    '02_resumen_teorico': {
        finanzas: 'Teoría Financiera Esencial',
        pensamiento_critico: 'Los Sesgos del Pensamiento',
        exito_personal: 'Los Principios del Éxito',
        inversiones: 'Estrategias de Inversión',
        liderazgo: 'Teorías de Liderazgo',
        productividad: 'Técnicas de Productividad',
        comunicacion: 'Teoría de la Comunicación',
        desarrollo_personal: 'Psicología del Desarrollo',
        negocios: 'Teoría Empresarial',
        psicologia: 'Conceptos Psicológicos Clave',
        marketing: 'Estrategias de Marketing',
        tecnologia: 'Conceptos Tecnológicos',
        diseño: 'Teoría del Diseño',
        bienestar: 'Ciencia del Bienestar',
        arte: 'Teoría Artística',
        salud: 'Ciencia de la Salud',
        gestion: 'Teorías de Gestión',
        ventas: 'Psicología de Ventas',
        idiomas: 'Estructura del Idioma',
        gastronomia: 'Técnicas Culinarias',
        fitness: 'Ciencia del Ejercicio',
        hogar: 'Principios del Hogar',
        medio_ambiente: 'Ciencia Ambiental',
        ciencia: 'Teorías Científicas',
        tecnico: 'Principios Técnicos',
        manualidades: 'Técnicas Artesanales',
        cultura: 'Historia y Cultura'
    },
    '03_ejemplos_practicos': {
        finanzas: 'Casos de Éxito Financiero',
        pensamiento_critico: 'Casos Reales de Análisis',
        exito_personal: 'Historias de Éxito',
        inversiones: 'Casos de Inversión Exitosa',
        liderazgo: 'Líderes en Acción',
        productividad: 'Casos de Optimización',
        comunicacion: 'Grandes Comunicadores',
        desarrollo_personal: 'Transformaciones Reales',
        negocios: 'Casos de Empresas Exitosas',
        psicologia: 'Aplicaciones Prácticas',
        marketing: 'Campañas Exitosas',
        tecnologia: 'Proyectos Tecnológicos',
        diseño: 'Diseños Exitosos',
        bienestar: 'Casos de Bienestar',
        arte: 'Obras Maestras',
        salud: 'Casos de Salud',
        gestion: 'Proyectos Exitosos',
        ventas: 'Casos de Ventas Exitosas',
        idiomas: 'Conversaciones Reales',
        gastronomia: 'Recetas del Mundo',
        fitness: 'Rutinas Efectivas',
        hogar: 'Proyectos de Hogar',
        medio_ambiente: 'Casos de Sostenibilidad',
        ciencia: 'Descubrimientos Científicos',
        tecnico: 'Aplicaciones Técnicas',
        manualidades: 'Proyectos Artesanales',
        cultura: 'Manifestaciones Culturales'
    },
    '04_herramientas_tecnicas': {
        finanzas: 'Herramientas Financieras',
        pensamiento_critico: 'Herramientas de Análisis',
        exito_personal: 'Técnicas de Desarrollo',
        inversiones: 'Plataformas de Inversión',
        liderazgo: 'Herramientas de Liderazgo',
        productividad: 'Apps y Sistemas',
        comunicacion: 'Técnicas de Oratoria',
        desarrollo_personal: 'Herramientas de Crecimiento',
        negocios: 'Herramientas Empresariales',
        psicologia: 'Técnicas Psicológicas',
        marketing: 'Herramientas de Marketing',
        tecnologia: 'Herramientas Tecnológicas',
        diseño: 'Software de Diseño',
        bienestar: 'Herramientas de Bienestar',
        arte: 'Técnicas Artísticas',
        salud: 'Herramientas de Salud',
        gestion: 'Software de Gestión',
        ventas: 'Herramientas de Ventas',
        idiomas: 'Recursos de Aprendizaje',
        gastronomia: 'Utensilios de Cocina',
        fitness: 'Equipos de Ejercicio',
        hogar: 'Herramientas del Hogar',
        medio_ambiente: 'Herramientas Ecológicas',
        ciencia: 'Instrumentos Científicos',
        tecnico: 'Herramientas Técnicas',
        manualidades: 'Herramientas Artesanales',
        cultura: 'Recursos Culturales'
    },
    '05_conclusiones': {
        finanzas: 'Tu Plan Financiero Personal',
        pensamiento_critico: 'Aplicando el Pensamiento Crítico',
        exito_personal: 'Tu Camino al Éxito',
        inversiones: 'Tu Estrategia de Inversión',
        liderazgo: 'Desarrollando tu Liderazgo',
        productividad: 'Tu Sistema de Productividad',
        comunicacion: 'Desarrollando tu Comunicación',
        desarrollo_personal: 'Tu Plan de Desarrollo',
        negocios: 'Tu Plan de Negocio',
        psicologia: 'Aplicando la Psicología',
        marketing: 'Tu Estrategia de Marketing',
        tecnologia: 'Tu Proyecto Tecnológico',
        diseño: 'Desarrollando tu Estilo',
        bienestar: 'Tu Plan de Bienestar',
        arte: 'Desarrollando tu Arte',
        salud: 'Tu Plan de Salud',
        gestion: 'Tu Estilo de Gestión',
        ventas: 'Tu Estrategia de Ventas',
        idiomas: 'Tu Plan de Aprendizaje',
        gastronomia: 'Tu Cocina Personal',
        fitness: 'Tu Rutina de Ejercicio',
        hogar: 'Tu Hogar Ideal',
        medio_ambiente: 'Tu Vida Sostenible',
        ciencia: 'Tu Exploración Científica',
        tecnico: 'Tu Especialización Técnica',
        manualidades: 'Tus Proyectos Artesanales',
        cultura: 'Tu Apreciación Cultural'
    }
};

// Función para generar título basado en archivo y tema
function generateTitle(filename, theme) {
    // Extraer el patrón del nombre del archivo
    const patterns = Object.keys(titleTemplates);
    
    for (const pattern of patterns) {
        if (filename.includes(pattern.replace('_', '_'))) {
            return titleTemplates[pattern][theme] || `Lección: ${filename.replace('.html', '').replace(/_/g, ' ')}`;
        }
    }
    
    // Títulos por defecto para archivos especiales
    if (filename.includes('glosario')) return 'Glosario de Términos';
    if (filename.includes('enlaces')) return 'Enlaces de Interés';
    if (filename.includes('resumen')) return 'Resumen del Curso';
    if (filename.includes('evaluacion')) return 'Evaluación Final';
    
    // Título genérico
    return filename.replace('.html', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Función para actualizar el título de un archivo HTML
function updateLessonTitle(filePath, newTitle, courseTitle) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Buscar y reemplazar el título en la etiqueta <title>
        const titleRegex = /<title>(.*?)<\/title>/i;
        const newTitleTag = `<title>${newTitle} - ${courseTitle}</title>`;
        
        if (titleRegex.test(content)) {
            content = content.replace(titleRegex, newTitleTag);
        } else {
            // Si no hay etiqueta title, agregarla después del charset
            const headRegex = /(<meta charset="UTF-8">)/i;
            if (headRegex.test(content)) {
                content = content.replace(headRegex, `$1\n    ${newTitleTag}`);
            }
        }
        
        // También actualizar el h1 si existe y no tiene contenido específico
        const h1Regex = /<h1[^>]*>(.*?)<\/h1>/i;
        const currentH1 = content.match(h1Regex);
        if (currentH1 && (currentH1[1].trim().length < 10 || currentH1[1].includes('Introducción'))) {
            content = content.replace(h1Regex, `<h1>${newTitle}</h1>`);
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Función principal
function smartPopulateLessons() {
    let totalUpdated = 0;
    let totalErrors = 0;
    let coursesProcessed = 0;
    
    console.log('🚀 Iniciando población inteligente de títulos de lecciones...\n');
    
    Object.entries(courseData).forEach(([courseId, courseInfo]) => {
        const lessonsPath = path.join(courseId, 'lecciones');
        
        if (!fs.existsSync(lessonsPath)) {
            console.log(`📚 Curso ${courseId}: ${courseInfo.title} - ⚠️ Sin carpeta de lecciones`);
            return;
        }
        
        console.log(`📚 Curso ${courseId}: ${courseInfo.title}`);
        coursesProcessed++;
        
        // Leer todos los archivos HTML en la carpeta de lecciones
        const files = fs.readdirSync(lessonsPath).filter(file => file.endsWith('.html'));
        
        if (files.length === 0) {
            console.log(`   ⚠️ No se encontraron archivos HTML`);
            return;
        }
        
        files.forEach(filename => {
            const filePath = path.join(lessonsPath, filename);
            const lessonTitle = generateTitle(filename, courseInfo.theme);
            
            const success = updateLessonTitle(filePath, lessonTitle, courseInfo.title);
            if (success) {
                console.log(`   ✅ ${filename} → "${lessonTitle}"`);
                totalUpdated++;
            } else {
                console.log(`   ❌ Error actualizando ${filename}`);
                totalErrors++;
            }
        });
        
        console.log(''); // Línea en blanco entre cursos
    });
    
    console.log('📊 RESUMEN FINAL:');
    console.log(`✅ Lecciones actualizadas: ${totalUpdated}`);
    console.log(`❌ Errores: ${totalErrors}`);
    console.log(`📚 Cursos procesados: ${coursesProcessed}`);
    console.log(`📁 Total cursos disponibles: ${Object.keys(courseData).length}`);
    console.log('\n🎉 ¡Población inteligente completada!');
}

// Ejecutar el script
smartPopulateLessons();