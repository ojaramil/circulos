#!/bin/bash

# Script para crear lecciones 11-25 del libro 024

cd "$(dirname "$0")/lecciones"

# Array con los títulos y contenidos de las lecciones
declare -a lessons=(
    "11:educacion_privilegio:Educación y Privilegio:El Dilema del Pez Grande en Estanque Pequeño"
    "12:teoria_relativa_privacion:Teoría de la Privación Relativa:Por Qué Importa el Contexto"
    "13:wyatt_walker:Wyatt Walker y los Derechos Civiles:El Arte de la Protesta Estratégica"
    "14:tres_reglas_legitimidad:Las Tres Reglas de la Legitimidad:Voz, Predecibilidad y Justicia"
    "15:perdon_venganza:Perdón vs Venganza:El Precio de la Retaliación"
    "16:wilma_derksen:Wilma Derksen:La Fortaleza del Perdón"
    "17:andre_trocme:André Trocmé:Resistencia No Violenta"
    "18:pueblo_le_chambon:El Pueblo de Le Chambon:Desobediencia Civil Efectiva"
    "19:jay_freireich:Jay Freireich:Innovación Contra Pronóstico"
    "20:cancer_infantil:Investigación del Cáncer Infantil:Perseverancia Ante la Adversidad"
    "21:liderazgo_desventaja:Liderazgo Desde la Desventaja:Cuando Menos es Más"
    "22:estrategias_no_convencionales:Estrategias No Convencionales:Cambiando las Reglas del Juego"
    "23:resiliencia_trauma:Resiliencia y Trauma:Crecimiento Post-Traumático"
    "24:aplicacion_negocios:Aplicación en Negocios:Disrumpiendo a los Gigantes"
    "25:conclusion:Conclusión:Reinterpretando el Poder y la Debilidad"
)

# Función para crear cada lección
create_lesson() {
    local num=$1
    local filename=$2
    local title=$3
    local subtitle=$4
    
    cat > "${num}_${filename}.html" << EOF
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${num} ${title} - David y Goliat</title>
    <link rel="stylesheet" href="../nuevo-style.css">
</head>
<body>
    <div class="container">
        <h1>📖 ${title}</h1>
        
        <div class="quote">
            "${subtitle}"
        </div>

        <h2>Contenido Principal</h2>
        
        <p>Esta lección explora conceptos clave de <strong>${title}</strong> en el contexto de David y Goliat.</p>

        <div class="highlight">
            <h3>Puntos Clave</h3>
            <ul>
                <li>Concepto fundamental del tema</li>
                <li>Aplicaciones prácticas</li>
                <li>Ejemplos del libro</li>
                <li>Lecciones para la vida moderna</li>
            </ul>
        </div>

        <h2>Desarrollo del Tema</h2>

        <div class="key-points">
            <h4>Ideas Principales</h4>
            <ul>
                <li><strong>Primera idea:</strong> Explicación detallada</li>
                <li><strong>Segunda idea:</strong> Contexto y aplicación</li>
                <li><strong>Tercera idea:</strong> Implicaciones prácticas</li>
            </ul>
        </div>

        <div class="case-study">
            <h4>Caso de Estudio</h4>
            <p>Ejemplo relevante del libro que ilustra estos conceptos.</p>
        </div>

        <div class="practice-tip">
            <h5>💡 Aplicación Práctica</h5>
            <p>Cómo aplicar estas lecciones en tu vida:</p>
            <ul>
                <li>Estrategia 1</li>
                <li>Estrategia 2</li>
                <li>Estrategia 3</li>
            </ul>
        </div>

        <div class="quote">
            "Cita relevante del libro o concepto clave."
        </div>

        <div class="reflection">
            <h4>Preguntas para Reflexionar</h4>
            <ul>
                <li>¿Cómo se aplica esto a tu situación?</li>
                <li>¿Qué puedes aprender de este concepto?</li>
                <li>¿Cómo cambiaría tu perspectiva?</li>
            </ul>
        </div>

        <div class="navigation">
            <a href="$(printf "%02d" $((num-1)))_*.html" class="nav-button">← Anterior</a>
            <a href="$(printf "%02d" $((num+1)))_*.html" class="nav-button">Siguiente →</a>
        </div>
    </div>
</body>
</html>
EOF
    
    echo "Creada lección ${num}: ${title}"
}

# Crear cada lección
for lesson in "${lessons[@]}"; do
    IFS=':' read -r num filename title subtitle <<< "$lesson"
    create_lesson "$num" "$filename" "$title" "$subtitle"
done

echo "¡Todas las lecciones han sido creadas!"
