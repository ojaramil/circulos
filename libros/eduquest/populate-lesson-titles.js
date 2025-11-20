// Script para poblar títulos descriptivos de lecciones en todos los cursos
const fs = require('fs');
const path = require('path');

// Definición de cursos con sus títulos y temas de lecciones
const courseData = {
    '001': {
        title: 'Cómo Piensan los Ricos',
        lessons: {
            '01_resumen_teorico': 'Mentalidad Millonaria - Fundamentos',
            '02_ejemplos_practicos': 'Casos de Éxito - Estrategias Reales',
            '03_herramientas_tecnicas': 'Herramientas de Inversión',
            '04_conclusiones': 'Plan de Acción Financiera'
        }
    },
    '002': {
        title: 'Factfulness - Pensamiento Basado en Hechos',
        lessons: {
            '01_introduccion': 'Introducción al Pensamiento Factual',
            '02_resumen_teorico': 'Los 10 Instintos que Distorsionan la Realidad',
            '03_ejemplos_practicos': 'Casos Reales de Sesgos Cognitivos',
            '04_herramientas_tecnicas': 'Herramientas para Pensar con Datos',
            '05_conclusiones': 'Aplicando Factfulness en la Vida Diaria'
        }
    },
    '003': {
        title: 'Piense y Hágase Rico',
        lessons: {
            '01_introduccion': 'El Poder del Pensamiento',
            '02_resumen_teorico': 'Los 13 Principios del Éxito',
            '03_ejemplos_practicos': 'Historias de Millonarios Exitosos',
            '04_herramientas_tecnicas': 'Técnicas de Visualización y Autosugestión',
            '05_conclusiones': 'Tu Plan Personal hacia la Riqueza'
        }
    },
    '004': {
        title: 'Inversión en Fondos Índice',
        lessons: {
            '01_introduccion': 'Introducción a los Fondos Índice',
            '02_resumen_teorico': 'Ventajas de la Inversión Pasiva',
            '03_ejemplos_practicos': 'Comparativa de Rendimientos',
            '04_herramientas_tecnicas': 'Plataformas y Brokers Recomendados',
            '05_conclusiones': 'Estrategia de Inversión a Largo Plazo'
        }
    },
    '005': {
        title: 'Empieza con el Porqué - Liderazgo',
        lessons: {
            '01_introduccion': 'El Círculo Dorado del Liderazgo',
            '02_resumen_teorico': 'Por Qué, Cómo y Qué',
            '03_ejemplos_practicos': 'Líderes Inspiradores en Acción',
            '04_herramientas_tecnicas': 'Definiendo tu Propósito Personal',
            '05_conclusiones': 'Comunicando tu Visión'
        }
    },
    '006': {
        title: 'Gestión del Tiempo y Productividad',
        lessons: {
            '01_introduccion': 'Fundamentos de la Productividad',
            '02_resumen_teorico': 'Técnicas de Gestión del Tiempo',
            '03_ejemplos_practicos': 'Casos de Optimización Personal',
            '04_herramientas_tecnicas': 'Apps y Sistemas de Organización',
            '05_conclusiones': 'Tu Sistema Personal de Productividad'
        }
    },
    '007': {
        title: 'Comunicación Efectiva y Oratoria',
        lessons: {
            '01_introduccion': 'Principios de Comunicación Efectiva',
            '02_resumen_teorico': 'Técnicas de Oratoria y Persuasión',
            '03_ejemplos_practicos': 'Análisis de Grandes Oradores',
            '04_herramientas_tecnicas': 'Ejercicios de Dicción y Presencia',
            '05_conclusiones': 'Desarrollando tu Estilo Personal'
        }
    },
    '008': {
        title: 'Inteligencia Emocional',
        lessons: {
            '01_introduccion': 'Qué es la Inteligencia Emocional',
            '02_resumen_teorico': 'Los 4 Dominios de la IE',
            '03_ejemplos_practicos': 'Situaciones Reales de Aplicación',
            '04_herramientas_tecnicas': 'Técnicas de Autorregulación',
            '05_conclusiones': 'Plan de Desarrollo Emocional'
        }
    },
    '009': {
        title: 'Emprendimiento y Negocios',
        lessons: {
            '01_introduccion': 'Mentalidad Emprendedora',
            '02_resumen_teorico': 'Fundamentos del Emprendimiento',
            '03_ejemplos_practicos': 'Casos de Startups Exitosas',
            '04_herramientas_tecnicas': 'Herramientas para Emprendedores',
            '05_conclusiones': 'Tu Plan de Negocio'
        }
    },
    '010': {
        title: 'Atrévete a No Gustar - Psicología Adleriana',
        lessons: {
            '01_introduccion': 'Introducción a la Psicología Adleriana',
            '02_resumen_teorico': 'Separación de Tareas y Libertad',
            '03_ejemplos_practicos': 'Aplicando la Filosofía Adleriana',
            '04_herramientas_tecnicas': 'Técnicas de Autoafirmación',
            '05_conclusiones': 'Viviendo sin Buscar Aprobación'
        }
    },
    '011': {
        title: 'Marketing Digital y Redes Sociales',
        lessons: {
            '01_introduccion': 'Fundamentos del Marketing Digital',
            '02_resumen_teorico': 'Estrategias de Redes Sociales',
            '03_ejemplos_practicos': 'Campañas Exitosas Analizadas',
            '04_herramientas_tecnicas': 'Herramientas de Marketing Digital',
            '05_conclusiones': 'Tu Estrategia Digital Personal'
        }
    },
    '012': {
        title: 'Programación Web Básica',
        lessons: {
            '01_introduccion': 'Introducción al Desarrollo Web',
            '02_resumen_teorico': 'HTML, CSS y JavaScript',
            '03_ejemplos_practicos': 'Proyectos Web Paso a Paso',
            '04_herramientas_tecnicas': 'Editores y Frameworks',
            '05_conclusiones': 'Tu Primera Página Web'
        }
    },
    '013': {
        title: 'Diseño Gráfico y Creatividad',
        lessons: {
            '01_introduccion': 'Principios del Diseño Gráfico',
            '02_resumen_teorico': 'Teoría del Color y Composición',
            '03_ejemplos_practicos': 'Análisis de Diseños Exitosos',
            '04_herramientas_tecnicas': 'Software de Diseño Profesional',
            '05_conclusiones': 'Desarrollando tu Estilo Visual'
        }
    },
    '014': {
        title: 'Mindfulness y Meditación',
        lessons: {
            '01_introduccion': 'Introducción al Mindfulness',
            '02_resumen_teorico': 'Técnicas de Meditación',
            '03_ejemplos_practicos': 'Ejercicios de Atención Plena',
            '04_herramientas_tecnicas': 'Apps y Recursos de Meditación',
            '05_conclusiones': 'Integrando Mindfulness en tu Vida'
        }
    },
    '015': {
        title: 'Fotografía Digital',
        lessons: {
            '01_introduccion': 'Fundamentos de la Fotografía',
            '02_resumen_teorico': 'Composición e Iluminación',
            '03_ejemplos_practicos': 'Análisis de Fotografías Maestras',
            '04_herramientas_tecnicas': 'Equipos y Software de Edición',
            '05_conclusiones': 'Desarrollando tu Ojo Fotográfico'
        }
    },
    '016': {
        title: 'Nutrición y Alimentación Saludable',
        lessons: {
            '01_introduccion': 'Principios de Nutrición',
            '02_resumen_teorico': 'Macronutrientes y Micronutrientes',
            '03_ejemplos_practicos': 'Planes de Alimentación Saludable',
            '04_herramientas_tecnicas': 'Apps de Seguimiento Nutricional',
            '05_conclusiones': 'Tu Plan Nutricional Personalizado'
        }
    },
    '017': {
        title: 'Análisis de Datos con Excel',
        lessons: {
            '01_introduccion': 'Excel para Análisis de Datos',
            '02_resumen_teorico': 'Funciones y Fórmulas Avanzadas',
            '03_ejemplos_practicos': 'Casos de Análisis Empresarial',
            '04_herramientas_tecnicas': 'Tablas Dinámicas y Dashboards',
            '05_conclusiones': 'Automatizando Reportes'
        }
    },
    '018': {
        title: 'Escritura Creativa y Storytelling',
        lessons: {
            '01_introduccion': 'Fundamentos de la Escritura Creativa',
            '02_resumen_teorico': 'Estructura Narrativa y Personajes',
            '03_ejemplos_practicos': 'Análisis de Historias Exitosas',
            '04_herramientas_tecnicas': 'Herramientas del Escritor',
            '05_conclusiones': 'Desarrollando tu Voz Narrativa'
        }
    },
    '019': {
        title: 'Gestión de Proyectos',
        lessons: {
            '01_introduccion': 'Fundamentos de Gestión de Proyectos',
            '02_resumen_teorico': 'Metodologías Ágiles y Tradicionales',
            '03_ejemplos_practicos': 'Casos de Proyectos Exitosos',
            '04_herramientas_tecnicas': 'Software de Gestión de Proyectos',
            '05_conclusiones': 'Liderando tu Primer Proyecto'
        }
    },
    '020': {
        title: 'De Buena a Grandiosa - Liderazgo Empresarial',
        lessons: {
            '01_introduccion': 'Conceptos de Grandeza Empresarial',
            '02_resumen_teorico': 'Los Principios de las Empresas Grandiosas',
            '03_ejemplos_practicos': 'Casos de Transformación Empresarial',
            '04_herramientas_tecnicas': 'Herramientas de Liderazgo',
            '05_conclusiones': 'Aplicando la Grandeza en tu Organización'
        }
    },
    '021': {
        title: 'Ventas y Negociación',
        lessons: {
            '01_introduccion': 'Fundamentos de las Ventas',
            '02_resumen_teorico': 'Técnicas de Negociación Efectiva',
            '03_ejemplos_practicos': 'Casos de Ventas Exitosas',
            '04_herramientas_tecnicas': 'CRM y Herramientas de Ventas',
            '05_conclusiones': 'Desarrollando tu Estilo de Venta'
        }
    },
    '022': {
        title: 'Idiomas: Inglés Conversacional',
        lessons: {
            '01_introduccion': 'Fundamentos del Inglés Conversacional',
            '02_resumen_teorico': 'Gramática Esencial y Vocabulario',
            '03_ejemplos_practicos': 'Diálogos y Situaciones Reales',
            '04_herramientas_tecnicas': 'Apps y Recursos de Aprendizaje',
            '05_conclusiones': 'Plan de Práctica Conversacional'
        }
    },
    '023': {
        title: 'Finanzas Personales Avanzadas',
        lessons: {
            '01_introduccion': 'Estrategias Financieras Avanzadas',
            '02_resumen_teorico': 'Inversiones Complejas y Diversificación',
            '03_ejemplos_practicos': 'Casos de Planificación Patrimonial',
            '04_herramientas_tecnicas': 'Herramientas de Análisis Financiero',
            '05_conclusiones': 'Tu Estrategia de Riqueza a Largo Plazo'
        }
    },
    '024': {
        title: 'Desarrollo de Aplicaciones Móviles',
        lessons: {
            '01_introduccion': 'Introducción al Desarrollo Móvil',
            '02_resumen_teorico': 'Plataformas iOS y Android',
            '03_ejemplos_practicos': 'Análisis de Apps Exitosas',
            '04_herramientas_tecnicas': 'Frameworks y Herramientas de Desarrollo',
            '05_conclusiones': 'Publicando tu Primera App'
        }
    },
    '025': {
        title: 'Psicología Positiva y Felicidad',
        lessons: {
            '01_introduccion': 'Fundamentos de la Psicología Positiva',
            '02_resumen_teorico': 'Los Pilares del Bienestar',
            '03_ejemplos_practicos': 'Ejercicios de Felicidad',
            '04_herramientas_tecnicas': 'Herramientas de Bienestar',
            '05_conclusiones': 'Tu Plan de Vida Plena'
        }
    },
    '026': {
        title: 'Cocina Internacional',
        lessons: {
            '01_introduccion': 'Fundamentos de la Cocina Internacional',
            '02_resumen_teorico': 'Técnicas Culinarias Básicas',
            '03_ejemplos_practicos': 'Recetas de Diferentes Culturas',
            '04_herramientas_tecnicas': 'Utensilios y Equipos de Cocina',
            '05_conclusiones': 'Creando tu Menú Internacional'
        }
    },
    '027': {
        title: 'Yoga y Flexibilidad',
        lessons: {
            '01_introduccion': 'Introducción al Yoga',
            '02_resumen_teorico': 'Posturas Básicas y Respiración',
            '03_ejemplos_practicos': 'Secuencias de Yoga para Principiantes',
            '04_herramientas_tecnicas': 'Equipos y Accesorios de Yoga',
            '05_conclusiones': 'Tu Rutina Personal de Yoga'
        }
    },
    '028': {
        title: 'Criptomonedas e Inversión Digital',
        lessons: {
            '01_introduccion': 'Introducción a las Criptomonedas',
            '02_resumen_teorico': 'Blockchain y Tecnología DeFi',
            '03_ejemplos_practicos': 'Casos de Inversión en Crypto',
            '04_herramientas_tecnicas': 'Wallets y Exchanges',
            '05_conclusiones': 'Estrategia de Inversión en Criptomonedas'
        }
    },
    '029': {
        title: 'Jardinería y Plantas',
        lessons: {
            '01_introduccion': 'Fundamentos de la Jardinería',
            '02_resumen_teorico': 'Cuidado de Plantas y Suelos',
            '03_ejemplos_practicos': 'Jardines Exitosos Paso a Paso',
            '04_herramientas_tecnicas': 'Herramientas de Jardinería',
            '05_conclusiones': 'Diseñando tu Jardín Personal'
        }
    },
    '030': {
        title: 'Música y Composición',
        lessons: {
            '01_introduccion': 'Fundamentos de la Música',
            '02_resumen_teorico': 'Teoría Musical y Armonía',
            '03_ejemplos_practicos': 'Análisis de Composiciones Famosas',
            '04_herramientas_tecnicas': 'Software de Composición Musical',
            '05_conclusiones': 'Creando tu Primera Composición'
        }
    },
    '031': {
        title: 'E-commerce y Tienda Online',
        lessons: {
            '01_introduccion': 'Fundamentos del E-commerce',
            '02_resumen_teorico': 'Estrategias de Venta Online',
            '03_ejemplos_practicos': 'Casos de Tiendas Exitosas',
            '04_herramientas_tecnicas': 'Plataformas de E-commerce',
            '05_conclusiones': 'Lanzando tu Tienda Online'
        }
    },
    '032': {
        title: 'Sostenibilidad y Medio Ambiente',
        lessons: {
            '01_introduccion': 'Introducción a la Sostenibilidad',
            '02_resumen_teorico': 'Cambio Climático y Soluciones',
            '03_ejemplos_practicos': 'Casos de Vida Sostenible',
            '04_herramientas_tecnicas': 'Herramientas de Sostenibilidad',
            '05_conclusiones': 'Tu Plan de Vida Ecológica'
        }
    },
    '033': {
        title: 'Inversión en Bienes Raíces',
        lessons: {
            '01_introduccion': 'Fundamentos de Inversión Inmobiliaria',
            '02_resumen_teorico': 'Análisis de Propiedades',
            '03_ejemplos_practicos': 'Casos de Inversión Exitosa',
            '04_herramientas_tecnicas': 'Herramientas de Análisis Inmobiliario',
            '05_conclusiones': 'Tu Estrategia de Inversión Inmobiliaria'
        }
    },
    '034': {
        title: 'Ciencia de Datos y Analytics',
        lessons: {
            '01_introduccion': 'Introducción a la Ciencia de Datos',
            '02_resumen_teorico': 'Estadística y Machine Learning',
            '03_ejemplos_practicos': 'Proyectos de Análisis de Datos',
            '04_herramientas_tecnicas': 'Python, R y Herramientas de Análisis',
            '05_conclusiones': 'Tu Primer Proyecto de Data Science'
        }
    },
    '035': {
        title: 'Arte y Pintura',
        lessons: {
            '01_introduccion': 'Fundamentos del Arte y la Pintura',
            '02_resumen_teorico': 'Técnicas y Estilos Artísticos',
            '03_ejemplos_practicos': 'Análisis de Obras Maestras',
            '04_herramientas_tecnicas': 'Materiales y Técnicas de Pintura',
            '05_conclusiones': 'Desarrollando tu Estilo Artístico'
        }
    },
    '036': {
        title: 'Mecánica Automotriz Básica',
        lessons: {
            '01_introduccion': 'Fundamentos de Mecánica Automotriz',
            '02_resumen_teorico': 'Sistemas del Automóvil',
            '03_ejemplos_practicos': 'Diagnóstico y Reparaciones Básicas',
            '04_herramientas_tecnicas': 'Herramientas de Mecánica',
            '05_conclusiones': 'Mantenimiento Preventivo'
        }
    },
    '037': {
        title: 'Astronomía y Cosmos',
        lessons: {
            '01_introduccion': 'Introducción a la Astronomía',
            '02_resumen_teorico': 'El Sistema Solar y las Galaxias',
            '03_ejemplos_practicos': 'Observación del Cielo Nocturno',
            '04_herramientas_tecnicas': 'Telescopios y Apps de Astronomía',
            '05_conclusiones': 'Tu Viaje por el Cosmos'
        }
    },
    '038': {
        title: 'Carpintería y Trabajos en Madera',
        lessons: {
            '01_introduccion': 'Fundamentos de la Carpintería',
            '02_resumen_teorico': 'Tipos de Madera y Técnicas',
            '03_ejemplos_practicos': 'Proyectos de Carpintería Paso a Paso',
            '04_herramientas_tecnicas': 'Herramientas de Carpintería',
            '05_conclusiones': 'Tu Primer Proyecto de Madera'
        }
    },
    '039': {
        title: 'Historia del Arte',
        lessons: {
            '01_introduccion': 'Introducción a la Historia del Arte',
            '02_resumen_teorico': 'Movimientos Artísticos a través del Tiempo',
            '03_ejemplos_practicos': 'Análisis de Obras Representativas',
            '04_herramientas_tecnicas': 'Recursos para Estudiar Arte',
            '05_conclusiones': 'Apreciando el Arte en tu Vida'
        }
    }
};

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
        
        // También actualizar el h1 si existe
        const h1Regex = /<h1[^>]*>(.*?)<\/h1>/i;
        if (h1Regex.test(content)) {
            content = content.replace(h1Regex, `<h1>${newTitle}</h1>`);
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Función principal para procesar todos los cursos
function populateAllLessonTitles() {
    let totalUpdated = 0;
    let totalErrors = 0;
    
    console.log('🚀 Iniciando población de títulos de lecciones...\n');
    
    Object.entries(courseData).forEach(([courseId, courseInfo]) => {
        const coursePath = courseId;
        const lessonsPath = path.join(coursePath, 'lecciones');
        
        console.log(`📚 Procesando Curso ${courseId}: ${courseInfo.title}`);
        
        if (!fs.existsSync(lessonsPath)) {
            console.log(`   ⚠️  Carpeta de lecciones no encontrada: ${lessonsPath}`);
            return;
        }
        
        // Procesar cada lección definida
        Object.entries(courseInfo.lessons).forEach(([lessonFile, lessonTitle]) => {
            const lessonPath = path.join(lessonsPath, `${lessonFile}.html`);
            
            if (fs.existsSync(lessonPath)) {
                const success = updateLessonTitle(lessonPath, lessonTitle, courseInfo.title);
                if (success) {
                    console.log(`   ✅ ${lessonFile}.html → "${lessonTitle}"`);
                    totalUpdated++;
                } else {
                    console.log(`   ❌ Error actualizando ${lessonFile}.html`);
                    totalErrors++;
                }
            } else {
                console.log(`   ⚠️  Archivo no encontrado: ${lessonFile}.html`);
            }
        });
        
        console.log(''); // Línea en blanco entre cursos
    });
    
    console.log('📊 RESUMEN FINAL:');
    console.log(`✅ Lecciones actualizadas: ${totalUpdated}`);
    console.log(`❌ Errores: ${totalErrors}`);
    console.log(`📚 Cursos procesados: ${Object.keys(courseData).length}`);
    console.log('\n🎉 ¡Población de títulos completada!');
}

// Ejecutar el script
populateAllLessonTitles();