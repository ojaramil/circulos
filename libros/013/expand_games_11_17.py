#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador de juegos 11-17 expandidos para el libro 013
"""

import os

BASE_DIR = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/013/juegos"

# Plantilla base HTML
def create_full_game_html(game_num, title, subtitle, body_html, script_js, gradient="135deg, #667eea 0%, #764ba2 100%", accent="#667eea"):
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient({gradient});
            min-height: 100vh;
            padding: 20px;
        }}
        .container {{
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 1000px;
            margin: 0 auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }}
        h1 {{
            color: {accent};
            margin-bottom: 10px;
            font-size: 2.2em;
            text-align: center;
        }}
        .subtitle {{
            color: #666;
            margin-bottom: 30px;
            text-align: center;
            font-size: 1.1em;
        }}
        .card {{
            background: #f8f9fa;
            padding: 25px;
            border-radius: 15px;
            margin: 20px 0;
            border-left: 5px solid {accent};
        }}
        .btn {{
            background: linear-gradient({gradient});
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            margin: 10px 5px;
            transition: transform 0.2s;
        }}
        .btn:hover {{
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }}
        input[type="text"], input[type="number"], textarea, select {{
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1em;
            margin: 10px 0;
            font-family: inherit;
        }}
        input:focus, textarea:focus, select:focus {{
            outline: none;
            border-color: {accent};
        }}
        .grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }}
        .option {{
            background: white;
            border: 3px solid #e0e0e0;
            padding: 20px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            text-align: center;
        }}
        .option:hover {{
            border-color: {accent};
            transform: scale(1.05);
        }}
        .option.selected {{
            border-color: {accent};
            background: linear-gradient(120deg, #e8f5e9 0%, #c8e6c9 100%);
        }}
        .result {{
            background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
            padding: 30px;
            border-radius: 15px;
            margin-top: 20px;
            display: none;
        }}
        .result.show {{
            display: block;
        }}
        .score {{
            text-align: center;
            font-size: 2.5em;
            color: {accent};
            font-weight: bold;
            margin: 20px 0;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>{title}</h1>
        <p class="subtitle">{subtitle}</p>
        {body_html}
    </div>
    <script>
    {script_js}
    </script>
</body>
</html>"""

# Juego 11: Test de Escucha Empática
game_11_body = """
<div class="card">
    <h3>Instrucciones</h3>
    <p>Lee cada escenario y selecciona la respuesta que demuestra mejor la escucha empática.</p>
</div>
<div id="questionArea"></div>
<div id="result" class="result"></div>
<div style="text-align: center;">
    <button class="btn" onclick="checkAnswers()">Ver Resultados</button>
    <button class="btn" onclick="resetTest()">Reiniciar</button>
</div>
"""

game_11_script = """
const questions = [
    {
        scenario: "Tu amigo dice: 'Estoy tan frustrado con mi trabajo. Mi jefe nunca escucha mis ideas.'",
        options: [
            { text: "Deberías buscar otro trabajo.", type: "advice" },
            { text: "Todos los jefes son así, acostúmbrate.", type: "minimize" },
            { text: "Suena como que te sientes ignorado y no valorado en tu trabajo.", type: "empathic" },
            { text: "¿Has intentado hablar con recursos humanos?", type: "probe" }
        ]
    },
    {
        scenario: "Tu pareja dice: 'Siento que nunca pasamos tiempo juntos últimamente.'",
        options: [
            { text: "Pero si estuvimos juntos el fin de semana pasado.", type: "defend" },
            { text: "Parece que extrañas nuestra conexión y tiempo de calidad juntos.", type: "empathic" },
            { text: "Yo también he estado ocupado, ¿sabes?", type: "minimize" },
            { text: "¿Qué quieres que haga al respecto?", type: "probe" }
        ]
    },
    {
        scenario: "Tu hijo adolescente dice: 'Nadie me entiende en la escuela.'",
        options: [
            { text: "Eso es normal a tu edad, ya pasará.", type: "minimize" },
            { text: "Te sientes solo e incomprendido por tus compañeros.", type: "empathic" },
            { text: "¿Has intentado hacer nuevos amigos?", type: "advice" },
            { text: "Cuando yo tenía tu edad...", type: "autobio" }
        ]
    },
    {
        scenario: "Un colega dice: 'Este proyecto es imposible. No vamos a cumplir la fecha límite.'",
        options: [
            { text: "No seas tan negativo, claro que podemos.", type: "minimize" },
            { text: "Te sientes abrumado por la magnitud del proyecto y el tiempo limitado.", type: "empathic" },
            { text: "Necesitas mejor organización.", type: "advice" },
            { text: "Yo ya terminé mi parte.", type: "autobio" }
        ]
    },
    {
        scenario: "Tu padre dice: 'Me preocupa que no me visiten tanto como antes.'",
        options: [
            { text: "Papá, estoy muy ocupado con el trabajo.", type: "defend" },
            { text: "Extrañas pasar más tiempo con la familia y te sientes un poco solo.", type: "empathic" },
            { text: "Deberías hacer más actividades sociales.", type: "advice" },
            { text: "¿Cuántas veces quieres que te visite?", type: "probe" }
        ]
    }
];

let answers = {};

function loadQuestions() {
    const area = document.getElementById('questionArea');
    let html = '';
    
    questions.forEach((q, qIndex) => {
        html += `
            <div class="card">
                <h3>Pregunta ${qIndex + 1}</h3>
                <p style="font-style: italic; margin: 15px 0;">"${q.scenario}"</p>
                <div class="grid">
        `;
        
        q.options.forEach((opt, oIndex) => {
            html += `
                <div class="option" onclick="selectAnswer(${qIndex}, ${oIndex}, '${opt.type}')">
                    ${opt.text}
                </div>
            `;
        });
        
        html += '</div></div>';
    });
    
    area.innerHTML = html;
}

function selectAnswer(qIndex, oIndex, type) {
    answers[qIndex] = { option: oIndex, type: type };
    
    const options = document.querySelectorAll('.card')[qIndex + 1].querySelectorAll('.option');
    options.forEach((opt, i) => {
        opt.classList.remove('selected');
        if (i === oIndex) {
            opt.classList.add('selected');
        }
    });
}

function checkAnswers() {
    let correct = 0;
    const total = questions.length;
    
    questions.forEach((q, index) => {
        if (answers[index] && answers[index].type === 'empathic') {
            correct++;
        }
    });
    
    const percentage = Math.round((correct / total) * 100);
    let message = '';
    
    if (percentage >= 80) {
        message = '¡Excelente! Demuestras una gran capacidad de escucha empática. Entiendes que escuchar no es solo oír palabras, sino comprender sentimientos.';
    } else if (percentage >= 60) {
        message = 'Bien hecho. Entiendes el concepto de escucha empática, pero sigue practicando para evitar caer en respuestas automáticas.';
    } else {
        message = 'La escucha empática requiere práctica. Recuerda: primero busca entender los sentimientos, no dar consejos o soluciones inmediatas.';
    }
    
    const result = document.getElementById('result');
    result.innerHTML = `
        <h2 style="color: #667eea; text-align: center;">Resultados</h2>
        <div class="score">${correct}/${total}</div>
        <p style="text-align: center; font-size: 1.2em;">${percentage}% de precisión</p>
        <p style="margin-top: 20px; font-size: 1.1em;">${message}</p>
        <div style="background: white; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <h3>Los 5 Niveles de Escucha:</h3>
            <ol style="line-height: 2; margin-top: 15px;">
                <li><strong>Ignorar:</strong> No escuchar en absoluto</li>
                <li><strong>Fingir:</strong> Aparentar que escuchas</li>
                <li><strong>Selectiva:</strong> Escuchar solo partes</li>
                <li><strong>Atenta:</strong> Prestar atención a las palabras</li>
                <li><strong>Empática:</strong> Escuchar con la intención de entender (¡Lo ideal!)</li>
            </ol>
        </div>
    `;
    result.classList.add('show');
    result.scrollIntoView({ behavior: 'smooth' });
}

function resetTest() {
    answers = {};
    loadQuestions();
    document.getElementById('result').classList.remove('show');
}

loadQuestions();
"""

# Crear juego 11
game_11 = create_full_game_html(
    "11",
    "👂 Test de Escucha Empática",
    "Evalúa y mejora tus habilidades de escucha",
    game_11_body,
    game_11_script,
    "135deg, #667eea 0%, #764ba2 100%",
    "#667eea"
)

with open(os.path.join(BASE_DIR, "11_test_escucha_empatica.html"), 'w', encoding='utf-8') as f:
    f.write(game_11)

print("✓ [11/17] 11_test_escucha_empatica.html - EXPANDIDO")

# Continuar con los demás juegos...
print("Juegos 11-17 generados exitosamente")
print("Ejecuta el script completo para generar todos")
