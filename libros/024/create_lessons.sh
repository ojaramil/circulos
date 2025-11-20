#!/bin/bash

# Script para crear las lecciones 09-25 del libro 024 (David y Goliat)

cd "$(dirname "$0")/lecciones"

# Lección 09: Dislexia y Dificultades de Aprendizaje
cat > 09_dislexia_dificultades.html << 'EOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>09 Dislexia y Dificultades de Aprendizaje - David y Goliat</title>
    <link rel="stylesheet" href="../nuevo-style.css">
</head>
<body>
    <div class="container">
        <h1>📚 Dislexia y Dificultades de Aprendizaje</h1>
        
        <div class="quote">
            "La dislexia no es una discapacidad, es una diferencia que puede convertirse en una ventaja extraordinaria."
        </div>

        <h2>La Paradoja de la Dislexia</h2>
        
        <p>Malcolm Gladwell explora cómo las <strong>dificultades de aprendizaje</strong>, particularmente la dislexia, pueden convertirse en fuentes inesperadas de fortaleza y éxito.</p>

        <div class="highlight">
            <h3>Estadísticas Sorprendentes</h3>
            <ul>
                <li>Un tercio de los emprendedores exitosos tienen dislexia</li>
                <li>Muchos CEOs de Fortune 500 son disléxicos</li>
                <li>La tasa de dislexia entre emprendedores es el doble que en la población general</li>
            </ul>
        </div>

        <h2>Casos de Éxito</h2>

        <div class="case-study">
            <h4>David Boies - Abogado Legendario</h4>
            <p>Uno de los abogados más exitosos de Estados Unidos, Boies no podía leer hasta los 8 años y nunca aprendió a leer con fluidez.</p>
            <ul>
                <li><strong>Compensación:</strong> Desarrolló una memoria excepcional</li>
                <li><strong>Estrategia:</strong> Aprendió a escuchar con atención extrema</li>
                <li><strong>Resultado:</strong> Habilidades de litigio sin paralelo</li>
            </ul>
        </div>

        <div class="case-study">
            <h4>Brian Grazer - Productor de Hollywood</h4>
            <p>Productor ganador del Oscar, Grazer luchó con la dislexia toda su vida.</p>
            <ul>
                <li><strong>Desafío:</strong> Dificultad extrema para leer guiones</li>
                <li><strong>Adaptación:</strong> Desarrolló habilidades excepcionales de comunicación</li>
                <li><strong>Ventaja:</strong> Capacidad única para conectar con personas</li>
            </ul>
        </div>

        <h2>La Dificultad Deseable</h2>

        <div class="key-points">
            <h4>Concepto de Robert Bjork</h4>
            <p>Las "dificultades deseables" son obstáculos que, aunque hacen el aprendizaje más difícil a corto plazo, mejoran el rendimiento a largo plazo.</p>
            <ul>
                <li><strong>Compensación:</strong> Desarrollas habilidades alternativas</li>
                <li><strong>Resiliencia:</strong> Aprendes a perseverar</li>
                <li><strong>Creatividad:</strong> Encuentras soluciones no convencionales</li>
                <li><strong>Determinación:</strong> Trabajas más duro que los demás</li>
            </ul>
        </div>

        <h3>Habilidades Compensatorias</h3>

        <div class="step-by-step">
            <h4>Lo que Desarrollan los Disléxicos</h4>
            <ul>
                <li><strong>Memoria auditiva superior:</strong> Recuerdan lo que escuchan</li>
                <li><strong>Pensamiento visual:</strong> Ven patrones y conexiones</li>
                <li><strong>Habilidades interpersonales:</strong> Aprenden a delegar y colaborar</li>
                <li><strong>Determinación:</strong> No se rinden fácilmente</li>
                <li><strong>Creatividad:</strong> Piensan de manera diferente</li>
            </ul>
        </div>

        <h2>El Precio de la Compensación</h2>

        <div class="practice-tip">
            <h5>⚖️ El Balance</h5>
            <p>La compensación requiere:</p>
            <ul>
                <li>Esfuerzo extraordinario</li>
                <li>Disposición a pedir ayuda</li>
                <li>Aceptación de la diferencia</li>
                <li>Desarrollo de estrategias alternativas</li>
                <li>Resiliencia ante el fracaso</li>
            </ul>
        </div>

        <h3>Lecciones para Todos</h3>

        <div class="highlight">
            <h3>Aplicaciones Universales</h3>
            <p>Aunque no tengas dislexia, puedes aprender de esta experiencia:</p>
            <ul>
                <li>Las limitaciones pueden forzar la innovación</li>
                <li>Las dificultades desarrollan carácter</li>
                <li>Las debilidades pueden convertirse en fortalezas</li>
                <li>El camino difícil puede ser el mejor camino</li>
            </ul>
        </div>

        <div class="quote">
            "No es a pesar de sus dificultades que triunfan, sino en muchos casos, gracias a ellas."
        </div>

        <div class="reflection">
            <h4>Preguntas para Reflexionar</h4>
            <ul>
                <li>¿Qué dificultades has enfrentado que te hayan hecho más fuerte?</li>
                <li>¿Qué habilidades has desarrollado para compensar tus debilidades?</li>
                <li>¿Cómo puedes reinterpretar tus limitaciones como oportunidades?</li>
            </ul>
        </div>

        <div class="navigation">
            <a href="08_aplicacion_practica.html" class="nav-button">← Anterior</a>
            <a href="10_limites_poder.html" class="nav-button">Siguiente →</a>
        </div>
    </div>
</body>
</html>
EOF

echo "Creada lección 09: Dislexia y Dificultades de Aprendizaje"

# Continúa con las demás lecciones...
# (El script completo sería muy largo, así que crearé las lecciones individualmente)

chmod +x create_lessons.sh
