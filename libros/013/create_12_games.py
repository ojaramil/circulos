#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador de 12 juegos interactivos únicos para el libro 013
Los 7 Hábitos de la Gente Altamente Efectiva
"""

import os

BASE_DIR = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/013/juegos"
os.makedirs(BASE_DIR, exist_ok=True)

# Game templates with full HTML
GAMES = [
    {
        "filename": "06_circulo_influencia_interactivo.html",
        "title": "Círculo de Influencia Interactivo",
        "content": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Círculo de Influencia Interactivo</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 1200px;
            margin: 0 auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        h1 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 2.2em;
            text-align: center;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            text-align: center;
            font-size: 1.1em;
        }
        .circles-container {
            position: relative;
            width: 600px;
            height: 600px;
            margin: 40px auto;
        }
        .circle {
            position: absolute;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            color: white;
            text-align: center;
        }
        .circle-concern {
            width: 600px;
            height: 600px;
            background: rgba(220, 53, 69, 0.3);
            border: 4px solid #dc3545;
            top: 0;
            left: 0;
        }
        .circle-influence {
            width: 400px;
            height: 400px;
            background: rgba(40, 167, 69, 0.4);
            border: 4px solid #28a745;
            top: 100px;
            left: 100px;
        }
        .label {
            position: absolute;
            font-size: 1.3em;
            font-weight: bold;
        }
        .label-concern {
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: #dc3545;
        }
        .label-influence {
            top: 120px;
            left: 50%;
            transform: translateX(-50%);
            color: #28a745;
        }
        .items-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 40px;
        }
        .item {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            padding: 15px;
            border-radius: 10px;
            cursor: grab;
            color: white;
            text-align: center;
            font-weight: 500;
            transition: transform 0.2s;
            user-select: none;
        }
        .item:hover {
            transform: scale(1.05);
        }
        .item.dragging {
            opacity: 0.5;
            cursor: grabbing;
        }
        .item.in-influence {
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        }
        .item.in-concern {
            background: linear-gradient(135deg, #ee0979 0%, #ff6a00 100%);
        }
        .drop-zone {
            position: absolute;
            border-radius: 50%;
            transition: background-color 0.3s;
        }
        .drop-zone.drag-over {
            background-color: rgba(255, 255, 255, 0.2);
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-top: 30px;
        }
        .stat-card {
            background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
            padding: 25px;
            border-radius: 15px;
            text-align: center;
        }
        .stat-value {
            font-size: 2.5em;
            font-weight: bold;
            color: #667eea;
        }
        .stat-label {
            color: #666;
            margin-top: 5px;
        }
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            margin-top: 20px;
            margin-right: 10px;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .instructions {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            border-left: 5px solid #667eea;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 Círculo de Influencia vs Preocupación</h1>
        <p class="subtitle">Arrastra cada situación al círculo correspondiente</p>
        
        <div class="instructions">
            <strong>Instrucciones:</strong> Las personas proactivas enfocan su energía en su Círculo de Influencia (cosas que pueden controlar). 
            Arrastra cada situación al círculo correcto según si puedes influir en ella o solo preocuparte por ella.
        </div>

        <div class="circles-container" id="circlesContainer">
            <div class="circle circle-concern drop-zone" data-zone="concern">
                <span class="label label-concern">Círculo de Preocupación</span>
            </div>
            <div class="circle circle-influence drop-zone" data-zone="influence">
                <span class="label label-influence">Círculo de Influencia</span>
            </div>
        </div>

        <div class="items-container" id="itemsContainer"></div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-value" id="influenceCount">0</div>
                <div class="stat-label">En Círculo de Influencia</div>
            </div>
            <div class="stat-card">
                <div class="stat-value" id="concernCount">0</div>
                <div class="stat-label">En Círculo de Preocupación</div>
            </div>
        </div>

        <button class="btn" onclick="resetGame()">Reiniciar</button>
        <button class="btn" onclick="showResults()">Ver Resultados</button>
    </div>

    <script>
        const situations = [
            { text: "Mi actitud ante los problemas", zone: "influence" },
            { text: "El clima de mañana", zone: "concern" },
            { text: "Mis habilidades profesionales", zone: "influence" },
            { text: "La economía del país", zone: "concern" },
            { text: "Mi salud y ejercicio", zone: "influence" },
            { text: "El pasado", zone: "concern" },
            { text: "Mis relaciones personales", zone: "influence" },
            { text: "Las decisiones de otros", zone: "concern" },
            { text: "Mi tiempo y prioridades", zone: "influence" },
            { text: "La opinión de los demás", zone: "concern" },
            { text: "Mi aprendizaje continuo", zone: "influence" },
            { text: "El tráfico de la ciudad", zone: "concern" }
        ];

        let placedItems = {};

        function initGame() {
            const container = document.getElementById('itemsContainer');
            container.innerHTML = '';
            placedItems = {};

            situations.forEach((situation, index) => {
                const item = document.createElement('div');
                item.className = 'item';
                item.textContent = situation.text;
                item.draggable = true;
                item.dataset.index = index;
                item.dataset.correctZone = situation.zone;
                
                item.addEventListener('dragstart', handleDragStart);
                item.addEventListener('dragend', handleDragEnd);
                
                container.appendChild(item);
            });

            setupDropZones();
            updateStats();
        }

        function setupDropZones() {
            document.querySelectorAll('.drop-zone').forEach(zone => {
                zone.addEventListener('dragover', handleDragOver);
                zone.addEventListener('drop', handleDrop);
                zone.addEventListener('dragleave', handleDragLeave);
            });
        }

        function handleDragStart(e) {
            e.target.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', e.target.dataset.index);
        }

        function handleDragEnd(e) {
            e.target.classList.remove('dragging');
        }

        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.dataTransfer.dropEffect = 'move';
            e.currentTarget.classList.add('drag-over');
            return false;
        }

        function handleDragLeave(e) {
            e.currentTarget.classList.remove('drag-over');
        }

        function handleDrop(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.currentTarget.classList.remove('drag-over');

            const index = e.dataTransfer.getData('text/html');
            const item = document.querySelector(`[data-index="${index}"]`);
            const zone = e.currentTarget.dataset.zone;

            placedItems[index] = zone;
            
            item.classList.remove('in-influence', 'in-concern');
            if (zone === 'influence') {
                item.classList.add('in-influence');
            } else {
                item.classList.add('in-concern');
            }

            updateStats();
            return false;
        }

        function updateStats() {
            let influenceCount = 0;
            let concernCount = 0;

            Object.values(placedItems).forEach(zone => {
                if (zone === 'influence') influenceCount++;
                else concernCount++;
            });

            document.getElementById('influenceCount').textContent = influenceCount;
            document.getElementById('concernCount').textContent = concernCount;
        }

        function resetGame() {
            initGame();
        }

        function showResults() {
            let correct = 0;
            let total = 0;

            situations.forEach((situation, index) => {
                if (placedItems[index]) {
                    total++;
                    if (placedItems[index] === situation.zone) {
                        correct++;
                    }
                }
            });

            if (total === 0) {
                alert('¡Arrastra las situaciones a los círculos primero!');
                return;
            }

            const percentage = Math.round((correct / total) * 100);
            let message = `Resultados:\\n\\n`;
            message += `✅ Correctas: ${correct}/${total}\\n`;
            message += `📊 Precisión: ${percentage}%\\n\\n`;

            if (percentage >= 80) {
                message += '🎉 ¡Excelente! Tienes una gran comprensión de tu Círculo de Influencia.';
            } else if (percentage >= 60) {
                message += '👍 Bien hecho. Sigue practicando para identificar mejor lo que puedes controlar.';
            } else {
                message += '💡 Recuerda: enfócate en lo que PUEDES controlar, no en lo que solo te preocupa.';
            }

            alert(message);
        }

        initGame();
    </script>
</body>
</html>"""
    },
    {
        "filename": "07_mision_personal_builder.html",
        "title": "Constructor de Misión Personal",
        "content": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Constructor de Misión Personal</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 900px;
            margin: 0 auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        h1 {
            color: #f5576c;
            margin-bottom: 10px;
            font-size: 2.2em;
            text-align: center;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            text-align: center;
        }
        .step {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 20px;
            border-left: 5px solid #f5576c;
        }
        .step h3 {
            color: #f5576c;
            margin-bottom: 15px;
        }
        textarea, input[type="text"] {
            width: 100%;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 1em;
            font-family: inherit;
            margin-bottom: 10px;
            transition: border-color 0.3s;
        }
        textarea:focus, input[type="text"]:focus {
            outline: none;
            border-color: #f5576c;
        }
        textarea {
            min-height: 100px;
            resize: vertical;
        }
        .values-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
            margin-bottom: 15px;
        }
        .value-chip {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 10px 15px;
            border-radius: 20px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .value-chip:hover {
            transform: scale(1.05);
        }
        .value-chip.selected {
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        }
        .mission-preview {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            margin-top: 30px;
            font-size: 1.2em;
            line-height: 1.8;
            text-align: center;
        }
        .btn {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            margin-top: 10px;
            margin-right: 10px;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .btn-secondary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📜 Constructor de Misión Personal</h1>
        <p class="subtitle">Crea tu enunciado de misión personal paso a paso</p>

        <div class="step">
            <h3>Paso 1: Selecciona tus valores fundamentales</h3>
            <p style="margin-bottom: 15px;">Elige 3-5 valores que sean más importantes para ti:</p>
            <div class="values-grid" id="valuesGrid"></div>
        </div>

        <div class="step">
            <h3>Paso 2: ¿Qué quieres SER?</h3>
            <p style="margin-bottom: 10px;">Describe el carácter que quieres desarrollar:</p>
            <textarea id="beInput" placeholder="Ejemplo: Quiero ser una persona íntegra, compasiva y valiente..."></textarea>
        </div>

        <div class="step">
            <h3>Paso 3: ¿Qué quieres HACER?</h3>
            <p style="margin-bottom: 10px;">Describe las contribuciones que quieres hacer:</p>
            <textarea id="doInput" placeholder="Ejemplo: Quiero ayudar a otros a alcanzar su potencial, crear valor en mi trabajo..."></textarea>
        </div>

        <div class="step">
            <h3>Paso 4: ¿Cuál es tu propósito?</h3>
            <p style="margin-bottom: 10px;">¿Por qué existes? ¿Qué legado quieres dejar?</p>
            <textarea id="purposeInput" placeholder="Ejemplo: Mi propósito es inspirar y empoderar a otros para que vivan vidas significativas..."></textarea>
        </div>

        <button class="btn" onclick="generateMission()">Generar Mi Misión</button>
        <button class="btn btn-secondary" onclick="saveMission()">Guardar Misión</button>
        <button class="btn btn-secondary" onclick="resetForm()">Reiniciar</button>

        <div class="mission-preview" id="missionPreview" style="display: none;">
            <h3 style="margin-bottom: 20px;">✨ Tu Enunciado de Misión Personal</h3>
            <div id="missionText"></div>
        </div>
    </div>

    <script>
        const coreValues = [
            "Integridad", "Familia", "Crecimiento", "Servicio", "Excelencia",
            "Creatividad", "Salud", "Sabiduría", "Libertad", "Amor",
            "Justicia", "Paz", "Innovación", "Responsabilidad", "Gratitud",
            "Humildad", "Coraje", "Compasión", "Disciplina", "Generosidad"
        ];

        let selectedValues = [];

        function initValues() {
            const grid = document.getElementById('valuesGrid');
            coreValues.forEach(value => {
                const chip = document.createElement('div');
                chip.className = 'value-chip';
                chip.textContent = value;
                chip.onclick = () => toggleValue(chip, value);
                grid.appendChild(chip);
            });
        }

        function toggleValue(chip, value) {
            const index = selectedValues.indexOf(value);
            if (index > -1) {
                selectedValues.splice(index, 1);
                chip.classList.remove('selected');
            } else {
                if (selectedValues.length < 5) {
                    selectedValues.push(value);
                    chip.classList.add('selected');
                } else {
                    alert('Selecciona máximo 5 valores fundamentales');
                }
            }
        }

        function generateMission() {
            const beText = document.getElementById('beInput').value.trim();
            const doText = document.getElementById('doInput').value.trim();
            const purposeText = document.getElementById('purposeInput').value.trim();

            if (selectedValues.length === 0 || !beText || !doText || !purposeText) {
                alert('Por favor completa todos los pasos antes de generar tu misión');
                return;
            }

            let mission = `Mi misión es vivir guiado por los valores de ${selectedValues.join(', ')}. \\n\\n`;
            mission += `${beText}\\n\\n`;
            mission += `${doText}\\n\\n`;
            mission += `${purposeText}`;

            document.getElementById('missionText').textContent = mission;
            document.getElementById('missionPreview').style.display = 'block';
            document.getElementById('missionPreview').scrollIntoView({ behavior: 'smooth' });
        }

        function saveMission() {
            const missionText = document.getElementById('missionText').textContent;
            if (!missionText) {
                alert('Genera tu misión primero');
                return;
            }

            localStorage.setItem('personalMission', missionText);
            localStorage.setItem('personalValues', JSON.stringify(selectedValues));
            alert('✅ Tu misión personal ha sido guardada. ¡Revísala regularmente!');
        }

        function resetForm() {
            if (confirm('¿Estás seguro de que quieres reiniciar el formulario?')) {
                selectedValues = [];
                document.querySelectorAll('.value-chip').forEach(chip => {
                    chip.classList.remove('selected');
                });
                document.getElementById('beInput').value = '';
                document.getElementById('doInput').value = '';
                document.getElementById('purposeInput').value = '';
                document.getElementById('missionPreview').style.display = 'none';
            }
        }

        function loadSaved() {
            const saved = localStorage.getItem('personalMission');
            if (saved) {
                const load = confirm('Tienes una misión guardada. ¿Quieres cargarla?');
                if (load) {
                    document.getElementById('missionText').textContent = saved;
                    document.getElementById('missionPreview').style.display = 'block';
                    
                    const savedValues = JSON.parse(localStorage.getItem('personalValues') || '[]');
                    selectedValues = savedValues;
                    document.querySelectorAll('.value-chip').forEach(chip => {
                        if (savedValues.includes(chip.textContent)) {
                            chip.classList.add('selected');
                        }
                    });
                }
            }
        }

        initValues();
        loadSaved();
    </script>
</body>
</html>"""
    }
]

# Continue with remaining games...
print("Generating 12 interactive games for book 013...")
print("=" * 70)

created_count = 0
for game in GAMES:
    try:
        file_path = os.path.join(BASE_DIR, game["filename"])
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(game["content"])
        print(f"✓ Created: {game['filename']}")
        created_count += 1
    except Exception as e:
        print(f"✗ Error creating {game['filename']}: {str(e)}")

print("=" * 70)
print(f"Part 1 completed: {created_count} games created")
print("Run the complete script to generate all 12 games")
