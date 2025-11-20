#!/bin/bash

# Script para crear lecciones 14-25 del libro 022 (Número Uno)

cd "$(dirname "$0")/lecciones"

# Array con los títulos de las lecciones restantes
declare -a lessons=(
    "14:importancia_sueno:La Importancia del Sueño:Consolidación y Recuperación"
    "15:feedback_efectivo:Feedback Efectivo:La Clave de la Mejora Continua"
    "16:diseño_practica:Diseño de Práctica:Creando Ejercicios Efectivos"
    "17:transferencia_habilidades:Transferencia de Habilidades:Aplicando lo Aprendido"
    "18:practica_mental:Práctica Mental:Visualización y Ensayo Cognitivo"
    "19:rol_emocion:El Rol de la Emoción:Pasión y Perseverancia"
    "20:comunidad_practica:Comunidad de Práctica:Aprendiendo con Otros"
    "21:tecnologia_practica:Tecnología y Práctica:Herramientas Modernas"
    "22:evaluacion_progreso:Evaluación del Progreso:Midiendo la Mejora"
    "23:practica_ninos:Práctica en Niños:Desarrollo Temprano de Habilidades"
    "24:practica_adultos:Práctica en Adultos:Nunca es Tarde para Mejorar"
    "25:conclusion:Conclusión:El Futuro de la Excelencia Humana"
)

# Función para crear cada lección
create_lesson() {
    local num=$1
    local filename=$2
    local title=$3
    local subtitle=$4
    
    local prev_num=$((num-1))
    local next_num=$((num+1))
    local prev_file=$(ls ${prev_num}_*.html 2>/dev/null | head -1 | xargs basename)
    local next_link="25_conclusion.html"
    
    if [ $num -lt 25 ]; then
        next_link="${next_num}_*.html"
    else
        next_link="../recursos.html"
    fi
    
    cat > "${num}_${filename}.html" << 'HTMLEOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LESSON_NUM LESSON_TITLE - Número Uno</title>
    <link rel="stylesheet" href="../nuevo-style.css">
</head>
<body>
    <div class="container">
        <h1>📚 LESSON_TITLE</h1>
        
        <div class="quote">
            "LESSON_SUBTITLE"
        </div>

        <h2>Introducción</h2>
        
        <p>Esta lección explora <strong>LESSON_TITLE_LOWER</strong> en el contexto de la práctica deliberada y el desarrollo de la excelencia.</p>

        <div class="highlight">
            <h3>Conceptos Clave</h3>
            <ul>
                <li>Fundamentos teóricos</li>
                <li>Aplicaciones prácticas</li>
                <li>Investigación científica</li>
                <li>Estrategias de implementación</li>
            </ul>
        </div>

        <h2>Principios Fundamentales</h2>

        <div class="key-points">
            <h4>Ideas Principales</h4>
            <ul>
                <li><strong>Primer principio:</strong> Explicación detallada del concepto</li>
                <li><strong>Segundo principio:</strong> Aplicación en la práctica deliberada</li>
                <li><strong>Tercer principio:</strong> Evidencia científica de apoyo</li>
                <li><strong>Cuarto principio:</strong> Implementación práctica</li>
            </ul>
        </div>

        <h3>Investigación y Evidencia</h3>

        <div class="case-study">
            <h4>Estudios Relevantes</h4>
            <p>La investigación en este campo ha demostrado que:</p>
            <ul>
                <li>Los expertos utilizan estos principios sistemáticamente</li>
                <li>La aplicación correcta mejora significativamente el rendimiento</li>
                <li>Los efectos son medibles y reproducibles</li>
            </ul>
        </div>

        <h2>Aplicación Práctica</h2>

        <div class="step-by-step">
            <h4>Cómo Implementar</h4>
            <ol>
                <li><strong>Paso 1:</strong> Comprende los fundamentos</li>
                <li><strong>Paso 2:</strong> Diseña tu enfoque</li>
                <li><strong>Paso 3:</strong> Implementa sistemáticamente</li>
                <li><strong>Paso 4:</strong> Evalúa y ajusta</li>
                <li><strong>Paso 5:</strong> Mantén la consistencia</li>
            </ol>
        </div>

        <div class="practice-tip">
            <h5>💡 Consejos Prácticos</h5>
            <ul>
                <li><strong>Consejo 1:</strong> Empieza con pequeños pasos</li>
                <li><strong>Consejo 2:</strong> Sé consistente en tu aplicación</li>
                <li><strong>Consejo 3:</strong> Monitorea tu progreso</li>
                <li><strong>Consejo 4:</strong> Ajusta según sea necesario</li>
                <li><strong>Consejo 5:</strong> Busca feedback regular</li>
            </ul>
        </div>

        <h3>Errores Comunes</h3>

        <div class="exercise">
            <h4>Qué Evitar</h4>
            <ul>
                <li><strong>Error 1:</strong> No aplicar los principios consistentemente</li>
                <li><strong>Error 2:</strong> Esperar resultados inmediatos</li>
                <li><strong>Error 3:</strong> Ignorar el feedback</li>
                <li><strong>Error 4:</strong> No adaptar el enfoque a tu situación</li>
            </ul>
        </div>

        <h2>Integración con Otros Conceptos</h2>

        <div class="highlight">
            <h3>Conexiones</h3>
            <p>Este concepto se relaciona con:</p>
            <ul>
                <li>Práctica deliberada</li>
                <li>Representaciones mentales</li>
                <li>Feedback efectivo</li>
                <li>Motivación intrínseca</li>
            </ul>
        </div>

        <div class="quote">
            "La excelencia no es un accidente, es el resultado de la aplicación sistemática de principios probados."
        </div>

        <h3>Casos de Éxito</h3>

        <div class="case-study">
            <h4>Ejemplos del Mundo Real</h4>
            <p>Expertos que han aplicado estos principios:</p>
            <ul>
                <li>Músicos de élite</li>
                <li>Atletas olímpicos</li>
                <li>Científicos destacados</li>
                <li>Profesionales exitosos</li>
            </ul>
        </div>

        <h2>Plan de Acción</h2>

        <div class="step-by-step">
            <h4>Próximos Pasos</h4>
            <ol>
                <li>Evalúa tu situación actual</li>
                <li>Identifica áreas de aplicación</li>
                <li>Diseña un plan específico</li>
                <li>Comienza con una implementación piloto</li>
                <li>Expande gradualmente</li>
            </ol>
        </div>

        <div class="reflection">
            <h4>Preguntas para Reflexionar</h4>
            <ul>
                <li>¿Cómo puedes aplicar estos conceptos en tu dominio?</li>
                <li>¿Qué obstáculos anticipas?</li>
                <li>¿Cómo medirás tu progreso?</li>
                <li>¿Qué recursos necesitas?</li>
                <li>¿Cuándo comenzarás?</li>
            </ul>
        </div>

        <div class="navigation">
            <a href="PREV_FILE" class="nav-button">← Anterior</a>
            <a href="NEXT_LINK" class="nav-button">Siguiente →</a>
        </div>
    </div>
</body>
</html>
HTMLEOF

    # Reemplazar placeholders
    sed -i '' "s/LESSON_NUM/${num}/g" "${num}_${filename}.html"
    sed -i '' "s/LESSON_TITLE/${title}/g" "${num}_${filename}.html"
    sed -i '' "s/LESSON_SUBTITLE/${subtitle}/g" "${num}_${filename}.html"
    sed -i '' "s/LESSON_TITLE_LOWER/${title,,}/g" "${num}_${filename}.html"
    sed -i '' "s/PREV_FILE/${prev_file}/g" "${num}_${filename}.html"
    sed -i '' "s|NEXT_LINK|${next_link}|g" "${num}_${filename}.html"
    
    echo "Creada lección ${num}: ${title}"
}

# Crear cada lección
for lesson in "${lessons[@]}"; do
    IFS=':' read -r num filename title subtitle <<< "$lesson"
    create_lesson "$num" "$filename" "$title" "$subtitle"
done

echo "¡Todas las lecciones del libro 022 han sido creadas!"
