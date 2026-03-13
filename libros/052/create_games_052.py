import os

base_path = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/052/juegos"
os.makedirs(base_path, exist_ok=True)

# Common CSS for games (Dark Theme with Choice Colors)
game_css = """
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #e0e0e0;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container {
            background: rgba(30, 30, 46, 0.95);
            border: 2px solid #00e5ff;
            border-radius: 15px;
            padding: 30px;
            max-width: 900px;
            width: 100%;
            box-shadow: 0 0 30px rgba(0, 229, 255, 0.3);
        }
        h1 {
            text-align: center;
            color: #00e5ff;
            margin-bottom: 10px;
            text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
        }
        .subtitle {
            text-align: center;
            color: #b388ff;
            margin-bottom: 30px;
            font-style: italic;
        }
        .btn {
            background: transparent;
            color: #00e5ff;
            border: 2px solid #00e5ff;
            padding: 12px 24px;
            cursor: pointer;
            font-family: inherit;
            font-weight: bold;
            transition: all 0.3s;
            margin: 5px;
            border-radius: 8px;
            font-size: 1em;
        }
        .btn:hover {
            background: #00e5ff;
            color: #1a1a2e;
            box-shadow: 0 0 15px rgba(0, 229, 255, 0.5);
            transform: translateY(-2px);
        }
        .card {
            background: rgba(26, 26, 46, 0.8);
            padding: 20px;
            border: 1px solid #b388ff;
            margin-bottom: 20px;
            border-radius: 10px;
        }
        input, select, textarea {
            width: 100%;
            padding: 12px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid #00e5ff;
            color: #fff;
            font-family: inherit;
            margin: 8px 0 15px 0;
            border-radius: 5px;
            box-sizing: border-box;
        }
        input:focus, select:focus, textarea:focus {
            border-color: #b388ff;
            outline: none;
            box-shadow: 0 0 10px rgba(179, 136, 255, 0.3);
        }
        .result-area {
            margin-top: 20px;
            padding: 20px;
            border: 2px dashed #00e5ff;
            display: none;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 10px;
        }
        .slider-container {
            margin: 15px 0;
        }
        label {
            display: block;
            color: #b388ff;
            margin-bottom: 8px;
            font-weight: 500;
        }
        .option-item {
            background: rgba(0, 229, 255, 0.1);
            padding: 15px;
            margin: 10px 0;
            border-left: 4px solid #00e5ff;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .option-item:hover {
            background: rgba(0, 229, 255, 0.2);
            transform: translateX(5px);
        }
        .option-item.selected {
            background: rgba(179, 136, 255, 0.3);
            border-left-color: #b388ff;
        }
    </style>
"""

games = [
    {
        "filename": "01_simulador_decision.html",
        "title": "Simulador de Decisión",
        "content": """
        <p class="subtitle">Experimenta cómo el número de opciones afecta tu proceso de decisión.</p>
        
        <div class="card">
            <label>Número de Opciones:</label>
            <select id="optionCount" onchange="generateOptions()">
                <option value="3">3 Opciones (Óptimo)</option>
                <option value="6">6 Opciones (Bueno)</option>
                <option value="12">12 Opciones (Muchas)</option>
                <option value="24">24 Opciones (Demasiadas)</option>
            </select>
            
            <label>Escenario:</label>
            <select id="scenario" onchange="generateOptions()">
                <option value="restaurant">Elegir un Restaurante</option>
                <option value="product">Comprar un Producto</option>
                <option value="career">Elegir una Carrera</option>
            </select>
        </div>
        
        <div id="options-container"></div>
        
        <button class="btn" onclick="makeDecision()">Tomar Decisión</button>
        <button class="btn" onclick="reset()">Reiniciar</button>
        
        <div id="result" class="result-area"></div>

        <script>
            let selectedOption = null;
            
            function generateOptions() {
                const count = parseInt(document.getElementById('optionCount').value);
                const scenario = document.getElementById('scenario').value;
                const container = document.getElementById('options-container');
                container.innerHTML = '';
                
                const scenarios = {
                    restaurant: ['Restaurante Italiano', 'Restaurante Mexicano', 'Restaurante Japonés', 'Restaurante Francés', 'Restaurante Tailandés', 'Restaurante Indio', 'Restaurante Griego', 'Restaurante Español', 'Restaurante Coreano', 'Restaurante Vietnamita', 'Restaurante Libanés', 'Restaurante Brasileño', 'Restaurante Argentino', 'Restaurante Peruano', 'Restaurante Marroquí', 'Restaurante Turco', 'Restaurante Alemán', 'Restaurante Británico', 'Restaurante Americano', 'Restaurante Mediterráneo', 'Restaurante Vegano', 'Restaurante Vegetariano', 'Restaurante de Mariscos', 'Restaurante de Carne'],
                    product: ['Producto A', 'Producto B', 'Producto C', 'Producto D', 'Producto E', 'Producto F', 'Producto G', 'Producto H', 'Producto I', 'Producto J', 'Producto K', 'Producto L', 'Producto M', 'Producto N', 'Producto O', 'Producto P', 'Producto Q', 'Producto R', 'Producto S', 'Producto T', 'Producto U', 'Producto V', 'Producto W', 'Producto X'],
                    career: ['Ingeniería', 'Medicina', 'Derecho', 'Educación', 'Arquitectura', 'Psicología', 'Negocios', 'Arte', 'Música', 'Periodismo', 'Marketing', 'Finanzas', 'Tecnología', 'Ciencias', 'Filosofía', 'Historia', 'Literatura', 'Diseño', 'Deportes', 'Gastronomía', 'Turismo', 'Medio Ambiente', 'Política', 'Investigación']
                };
                
                const options = scenarios[scenario].slice(0, count);
                
                options.forEach((opt, i) => {
                    const div = document.createElement('div');
                    div.className = 'option-item';
                    div.textContent = `${i + 1}. ${opt}`;
                    div.onclick = () => selectOption(i, div);
                    container.appendChild(div);
                });
                
                selectedOption = null;
            }
            
            function selectOption(index, element) {
                document.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
                element.classList.add('selected');
                selectedOption = index;
            }
            
            function makeDecision() {
                const count = parseInt(document.getElementById('optionCount').value);
                const timeSpent = count * 2; // minutos estimados
                const stressLevel = count > 12 ? 'Alto' : count > 6 ? 'Moderado' : 'Bajo';
                const satisfaction = count > 12 ? 'Baja' : count > 6 ? 'Moderada' : 'Alta';
                
                if (selectedOption === null) {
                    alert('Por favor selecciona una opción primero');
                    return;
                }
                
                document.getElementById('result').innerHTML = `
                    <h3>📊 Análisis de tu Decisión</h3>
                    <p><strong>Opciones consideradas:</strong> ${count}</p>
                    <p><strong>Tiempo estimado de decisión:</strong> ${timeSpent} minutos</p>
                    <p><strong>Nivel de estrés:</strong> ${stressLevel}</p>
                    <p><strong>Satisfacción esperada:</strong> ${satisfaction}</p>
                    <p style="margin-top: 15px; color: #b388ff;">
                        ${count > 12 ? '⚠️ Con tantas opciones, es probable que experimentes arrepentimiento y te preguntes si otra opción habría sido mejor.' : count > 6 ? '✓ Un número moderado de opciones te da flexibilidad sin sobrecarga.' : '✓ Este es el rango óptimo para la satisfacción y la toma de decisiones efectiva.'}
                    </p>
                `;
                document.getElementById('result').style.display = 'block';
            }
            
            function reset() {
                selectedOption = null;
                document.getElementById('result').style.display = 'none';
                generateOptions();
            }
            
            generateOptions();
        </script>
        """
    },
    {
        "filename": "02_maximizador_vs_satisfactor.html",
        "title": "Maximizador vs. Satisfactor",
        "content": """
        <p class="subtitle">Descubre tu estilo de toma de decisiones.</p>
        
        <div id="quiz-container"></div>
        
        <button class="btn" onclick="calculateResult()">Calcular Resultado</button>
        
        <div id="result" class="result-area"></div>

        <script>
            const questions = [
                {
                    q: "Cuando compras un producto, ¿qué haces?",
                    options: [
                        { text: "Investigo exhaustivamente todas las opciones disponibles", score: 2 },
                        { text: "Busco hasta encontrar algo que cumpla con mis criterios básicos", score: 0 },
                        { text: "Pido recomendaciones y elijo rápidamente", score: -1 }
                    ]
                },
                {
                    q: "Después de tomar una decisión importante, ¿qué sientes?",
                    options: [
                        { text: "Me pregunto constantemente si elegí bien", score: 2 },
                        { text: "Me siento satisfecho con mi elección", score: 0 },
                        { text: "Raramente pienso en ello después", score: -1 }
                    ]
                },
                {
                    q: "¿Cuánto tiempo dedicas a investigar antes de una compra importante?",
                    options: [
                        { text: "Varias horas o días", score: 2 },
                        { text: "Un tiempo moderado hasta encontrar algo adecuado", score: 0 },
                        { text: "Muy poco, confío en mi instinto", score: -1 }
                    ]
                },
                {
                    q: "Cuando ves que otros tienen algo diferente, ¿qué piensas?",
                    options: [
                        { text: "Me pregunto si debería haber elegido eso", score: 2 },
                        { text: "Me alegro por ellos, pero estoy contento con mi elección", score: 0 },
                        { text: "No me afecta", score: -1 }
                    ]
                },
                {
                    q: "¿Cómo te sientes cuando hay muchas opciones disponibles?",
                    options: [
                        { text: "Abrumado pero emocionado por encontrar lo mejor", score: 2 },
                        { text: "Buscas hasta encontrar algo que funcione", score: 0 },
                        { text: "Prefieres menos opciones", score: -1 }
                    ]
                }
            ];
            
            let answers = [];
            
            function loadQuiz() {
                const container = document.getElementById('quiz-container');
                let html = '';
                questions.forEach((item, qIndex) => {
                    html += `<div class="card"><p><strong>${item.q}</strong></p>`;
                    item.options.forEach((opt, oIndex) => {
                        html += `<div class="option-item" onclick="selectAnswer(${qIndex}, ${oIndex}, this)">${opt.text}</div>`;
                    });
                    html += '</div>';
                });
                container.innerHTML = html;
            }
            
            function selectAnswer(qIndex, oIndex, element) {
                const card = element.parentElement;
                card.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
                element.classList.add('selected');
                answers[qIndex] = questions[qIndex].options[oIndex].score;
            }
            
            function calculateResult() {
                if (answers.length < questions.length) {
                    alert('Por favor responde todas las preguntas');
                    return;
                }
                
                const total = answers.reduce((a, b) => a + b, 0);
                let type, description, advice;
                
                if (total >= 6) {
                    type = "Maximizador";
                    description = "Te esfuerzas por hacer solo las mejores elecciones. Investigas exhaustivamente y comparas constantemente.";
                    advice = "Considera adoptar un enfoque de 'suficientemente bueno'. Establece criterios claros y detente cuando encuentres algo que los cumpla. Esto puede reducir tu ansiedad y aumentar tu satisfacción.";
                } else if (total <= -3) {
                    type = "Satisfactor Extremo";
                    description = "Prefieres decisiones rápidas y raramente te preocupas por encontrar 'lo mejor'.";
                    advice = "Tu enfoque es eficiente, pero asegúrate de dedicar suficiente atención a decisiones realmente importantes.";
                } else {
                    type = "Satisfactor";
                    description = "Buscas lo que es 'suficientemente bueno'. Estableces criterios y te detienes cuando encuentras algo que los cumple.";
                    advice = "¡Excelente equilibrio! Este enfoque te ayuda a tomar decisiones efectivas sin la sobrecarga de los maximizadores.";
                }
                
                document.getElementById('result').innerHTML = `
                    <h3>🎯 Tu Tipo de Decisor</h3>
                    <h2 style="color: #00e5ff;">${type}</h2>
                    <p>${description}</p>
                    <div style="margin-top: 20px; padding: 15px; background: rgba(179, 136, 255, 0.1); border-radius: 8px;">
                        <strong style="color: #b388ff;">💡 Consejo:</strong> ${advice}
                    </div>
                `;
                document.getElementById('result').style.display = 'block';
            }
            
            loadQuiz();
        </script>
        """
    },
    {
        "filename": "03_calculadora_satisfaccion.html",
        "title": "Calculadora de Satisfacción",
        "content": """
        <p class="subtitle">Ve cómo el número de opciones afecta tu satisfacción esperada.</p>
        
        <div class="card">
            <div class="slider-container">
                <label>Número de Opciones Disponibles: <span id="optionsVal">6</span></label>
                <input type="range" min="2" max="30" value="6" oninput="updateCalc()">
            </div>
            
            <div class="slider-container">
                <label>Tiempo de Investigación (horas): <span id="timeVal">2</span></label>
                <input type="range" min="0" max="20" value="2" oninput="updateCalc()">
            </div>
            
            <div class="slider-container">
                <label>Importancia de la Decisión (1-10): <span id="importanceVal">5</span></label>
                <input type="range" min="1" max="10" value="5" oninput="updateCalc()">
            </div>
        </div>
        
        <div id="result" class="result-area" style="display:block;">
            <h3>📊 Proyección de Satisfacción</h3>
            <p><strong>Satisfacción Esperada:</strong> <span id="satisfaction" style="color: #00e5ff; font-size: 1.5em;">75%</span></p>
            <p><strong>Nivel de Estrés:</strong> <span id="stress">Moderado</span></p>
            <p><strong>Probabilidad de Arrepentimiento:</strong> <span id="regret">25%</span></p>
            <p><strong>Recomendación:</strong> <span id="recommendation" style="color: #b388ff;"></span></p>
        </div>

        <script>
            function updateCalc() {
                const options = parseInt(document.querySelector('input[type=range]:nth-of-type(1)').value);
                const time = parseInt(document.querySelector('input[type=range]:nth-of-type(2)').value);
                const importance = parseInt(document.querySelector('input[type=range]:nth-of-type(3)').value);
                
                document.getElementById('optionsVal').innerText = options;
                document.getElementById('timeVal').innerText = time;
                document.getElementById('importanceVal').innerText = importance;
                
                // Cálculo de satisfacción (óptimo alrededor de 3-6 opciones)
                let satisfaction = 100;
                if (options <= 6) {
                    satisfaction = 100 - (6 - options) * 5;
                } else {
                    satisfaction = 100 - (options - 6) * 3;
                }
                satisfaction = Math.max(30, Math.min(100, satisfaction));
                
                // Ajuste por tiempo (demasiado tiempo reduce satisfacción)
                if (time > options * 0.5) {
                    satisfaction -= (time - options * 0.5) * 2;
                }
                
                // Ajuste por importancia (decisiones importantes con muchas opciones = más estrés)
                if (importance > 7 && options > 10) {
                    satisfaction -= 10;
                }
                
                satisfaction = Math.max(20, Math.min(100, satisfaction));
                
                // Estrés
                let stress = 'Bajo';
                if (options > 15 || time > 10) stress = 'Alto';
                else if (options > 8 || time > 5) stress = 'Moderado';
                
                // Arrepentimiento
                let regret = Math.min(80, options * 2 + (time > 5 ? 10 : 0));
                
                // Recomendación
                let recommendation = '';
                if (options <= 6) {
                    recommendation = '✅ Rango óptimo. Tienes suficientes opciones sin sobrecarga.';
                } else if (options <= 12) {
                    recommendation = '⚠️ Considera limitar a las 6 mejores opciones para aumentar satisfacción.';
                } else {
                    recommendation = '❌ Demasiadas opciones. Limita activamente a 6-8 opciones más prometedoras.';
                }
                
                document.getElementById('satisfaction').innerText = Math.round(satisfaction) + '%';
                document.getElementById('stress').innerText = stress;
                document.getElementById('regret').innerText = Math.round(regret) + '%';
                document.getElementById('recommendation').innerText = recommendation;
            }
            
            updateCalc();
        </script>
        """
    },
    {
        "filename": "04_estudio_mermeladas.html",
        "title": "El Experimento de las Mermeladas",
        "content": """
        <p class="subtitle">Recrea el famoso estudio que demostró la paradoja de la elección.</p>
        
        <div class="card">
            <h3>Configuración del Experimento</h3>
            <label>Número de Mermeladas en la Mesa de Degustación:</label>
            <select id="jamCount" onchange="runExperiment()">
                <option value="6">6 Mermeladas (Grupo A)</option>
                <option value="24">24 Mermeladas (Grupo B)</option>
            </select>
        </div>
        
        <div id="experiment-area"></div>
        
        <button class="btn" onclick="runExperiment()">Iniciar Experimento</button>
        
        <div id="result" class="result-area"></div>

        <script>
            const jams = ['Fresa', 'Frambuesa', 'Arándano', 'Durazno', 'Albaricoque', 'Cereza', 'Mora', 'Manzana', 'Pera', 'Uva', 'Ciruela', 'Melocotón', 'Mango', 'Piña', 'Naranja', 'Limón', 'Kiwi', 'Maracuyá', 'Guayaba', 'Higo', 'Granada', 'Coco', 'Plátano', 'Fresa Silvestre'];
            
            function runExperiment() {
                const count = parseInt(document.getElementById('jamCount').value);
                const availableJams = jams.slice(0, count);
                const area = document.getElementById('experiment-area');
                
                area.innerHTML = `
                    <div class="card">
                        <h3>Mesa de Degustación</h3>
                        <p>Has probado estas mermeladas:</p>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; margin-top: 15px;">
                            ${availableJams.map(jam => `<div style="padding: 10px; background: rgba(0,229,255,0.1); border-radius: 5px; text-align: center;">🍯 ${jam}</div>`).join('')}
                        </div>
                        <p style="margin-top: 15px;">¿Cuál te gustaría comprar?</p>
                        <select id="selectedJam" style="margin-top: 10px;">
                            <option value="">-- Selecciona una --</option>
                            ${availableJams.map(jam => `<option value="${jam}">${jam}</option>`).join('')}
                        </select>
                    </div>
                `;
                
                document.getElementById('result').style.display = 'none';
            }
            
            document.addEventListener('change', function(e) {
                if (e.target.id === 'selectedJam' && e.target.value) {
                    const count = parseInt(document.getElementById('jamCount').value);
                    const buyRate = count === 6 ? 30 : 3; // 30% vs 3%
                    const bought = Math.random() * 100 < buyRate;
                    
                    document.getElementById('result').innerHTML = `
                        <h3>📊 Resultados del Experimento</h3>
                        <p><strong>Mermeladas disponibles:</strong> ${count}</strong></p>
                        <p><strong>Mermelada seleccionada:</strong> ${e.target.value}</p>
                        <p><strong>¿Compraste?</strong> ${bought ? 'Sí ✅' : 'No ❌'}</p>
                        <div style="margin-top: 20px; padding: 15px; background: rgba(179, 136, 255, 0.1); border-radius: 8px;">
                            <strong>📈 Estadísticas del Estudio Real:</strong><br>
                            Con 6 opciones: <strong>30%</strong> de las personas compraron<br>
                            Con 24 opciones: Solo <strong>3%</strong> de las personas compraron<br><br>
                            <em style="color: #b388ff;">Conclusión: Más opciones pueden desalentar la acción. El esfuerzo de decidir entre muchas opciones puede hacer que las personas decidan no decidir.</em>
                        </div>
                    `;
                    document.getElementById('result').style.display = 'block';
                }
            });
            
            runExperiment();
        </script>
        """
    },
    {
        "filename": "05_analizador_arrepentimiento.html",
        "title": "Analizador de Arrepentimiento",
        "content": """
        <p class="subtitle">Evalúa cómo las opciones no elegidas afectan tu satisfacción.</p>
        
        <div class="card">
            <h3>Escenario: Has Elegido un Restaurante</h3>
            <p>Has elegido: <strong id="chosen">Restaurante Italiano</strong></p>
            
            <label>Número de Opciones que Consideraste:</label>
            <input type="number" id="totalOptions" value="6" min="2" max="30" oninput="analyze()">
            
            <label>¿Cuántas de esas opciones eran atractivas?</label>
            <input type="number" id="attractiveOptions" value="4" min="1" max="30" oninput="analyze()">
        </div>
        
        <div id="result" class="result-area" style="display:block;">
            <h3>📊 Análisis de Arrepentimiento</h3>
            <p><strong>Probabilidad de Arrepentimiento:</strong> <span id="regretProb">40%</span></p>
            <p><strong>Nivel de Satisfacción:</strong> <span id="satisfaction">60%</span></p>
            <p><strong>Opciones Atractivas Rechazadas:</strong> <span id="rejected">3</span></p>
            <p id="insight" style="margin-top: 15px; color: #b388ff;"></p>
        </div>

        <script>
            function analyze() {
                const total = parseInt(document.getElementById('totalOptions').value) || 2;
                const attractive = parseInt(document.getElementById('attractiveOptions').value) || 1;
                const rejected = Math.max(0, attractive - 1);
                
                // Más opciones atractivas rechazadas = más arrepentimiento
                const regretProb = Math.min(90, rejected * 15 + (total > 10 ? 20 : 0));
                const satisfaction = Math.max(30, 100 - regretProb);
                
                let insight = '';
                if (total > 15) {
                    insight = '⚠️ Con tantas opciones, es difícil estar completamente satisfecho. Considera limitar a 6-8 opciones más prometedoras.';
                } else if (attractive > total * 0.7) {
                    insight = '💡 Muchas opciones atractivas pueden aumentar el arrepentimiento. Recuerda: no puedes tenerlo todo.';
                } else if (total <= 6) {
                    insight = '✅ Rango óptimo. Tienes suficientes opciones sin sobrecarga de arrepentimiento.';
                } else {
                    insight = '✓ Número moderado de opciones. Tu satisfacción debería ser buena.';
                }
                
                document.getElementById('regretProb').innerText = Math.round(regretProb) + '%';
                document.getElementById('satisfaction').innerText = Math.round(satisfaction) + '%';
                document.getElementById('rejected').innerText = rejected;
                document.getElementById('insight').innerText = insight;
            }
            
            analyze();
        </script>
        """
    },
    {
        "filename": "06_planificador_decisiones.html",
        "title": "Planificador de Decisiones",
        "content": """
        <p class="subtitle">Prioriza tus decisiones y decide cuánta energía dedicar a cada una.</p>
        
        <div class="card">
            <h3>Lista de Decisiones Pendientes</h3>
            <div id="decisions-list"></div>
            <button class="btn" onclick="addDecision()" style="margin-top: 10px;">+ Agregar Decisión</button>
        </div>
        
        <div id="result" class="result-area"></div>

        <script>
            let decisions = [
                { text: 'Elegir carrera universitaria', importance: 10, category: 'crítica' },
                { text: 'Comprar un auto', importance: 7, category: 'importante' },
                { text: 'Elegir qué ver en Netflix', importance: 2, category: 'trivial' }
            ];
            
            function renderDecisions() {
                const container = document.getElementById('decisions-list');
                container.innerHTML = '';
                
                decisions.forEach((dec, i) => {
                    const div = document.createElement('div');
                    div.className = 'card';
                    div.style.marginBottom = '10px';
                    div.innerHTML = `
                        <p><strong>${dec.text}</strong></p>
                        <label>Importancia (1-10):</label>
                        <input type="number" value="${dec.importance}" min="1" max="10" onchange="updateImportance(${i}, this.value)">
                        <label>Categoría:</label>
                        <select onchange="updateCategory(${i}, this.value)">
                            <option value="crítica" ${dec.category === 'crítica' ? 'selected' : ''}>Crítica</option>
                            <option value="importante" ${dec.category === 'importante' ? 'selected' : ''}>Importante</option>
                            <option value="trivial" ${dec.category === 'trivial' ? 'selected' : ''}>Trivial</option>
                        </select>
                        <button class="btn" onclick="removeDecision(${i})" style="margin-top: 10px; background: rgba(255,0,0,0.2); border-color: #ff3333; color: #ff3333;">Eliminar</button>
                    `;
                    container.appendChild(div);
                });
                
                calculateRecommendations();
            }
            
            function updateImportance(index, value) {
                decisions[index].importance = parseInt(value);
                calculateRecommendations();
            }
            
            function updateCategory(index, category) {
                decisions[index].category = category;
                calculateRecommendations();
            }
            
            function removeDecision(index) {
                decisions.splice(index, 1);
                renderDecisions();
            }
            
            function addDecision() {
                const text = prompt('Describe la decisión:');
                if (text) {
                    decisions.push({ text, importance: 5, category: 'importante' });
                    renderDecisions();
                }
            }
            
            function calculateRecommendations() {
                const result = document.getElementById('result');
                let html = '<h3>📋 Recomendaciones de Priorización</h3>';
                
                const critical = decisions.filter(d => d.category === 'crítica' || d.importance >= 8);
                const important = decisions.filter(d => d.category === 'importante' && d.importance < 8);
                const trivial = decisions.filter(d => d.category === 'trivial' || d.importance <= 3);
                
                html += '<div class="card"><h4 style="color: #ff3333;">🔴 Decisiones Críticas (Dedica más tiempo)</h4>';
                critical.forEach(d => {
                    html += `<p>• ${d.text} - Dedica ${d.importance * 2} horas de investigación</p>`;
                });
                html += '</div>';
                
                html += '<div class="card"><h4 style="color: #ffaa00;">🟡 Decisiones Importantes (Atención moderada)</h4>';
                important.forEach(d => {
                    html += `<p>• ${d.text} - Dedica ${d.importance} horas de investigación</p>`;
                });
                html += '</div>';
                
                html += '<div class="card"><h4 style="color: #00ff41;">🟢 Decisiones Triviales (Decisión rápida o rutina)</h4>';
                trivial.forEach(d => {
                    html += `<p>• ${d.text} - Toma una decisión rápida o establece una rutina</p>`;
                });
                html += '</div>';
                
                html += '<p style="margin-top: 15px; color: #b388ff;"><strong>💡 Consejo:</strong> Aplica la regla 80/20. El 20% de tus decisiones (las críticas) representan el 80% de tu satisfacción. Dedica la mayor parte de tu tiempo a esas.</p>';
                
                result.innerHTML = html;
                result.style.display = 'block';
            }
            
            renderDecisions();
        </script>
        """
    },
    {
        "filename": "07_filtro_opciones.html",
        "title": "Filtro de Opciones",
        "content": """
        <p class="subtitle">Aprende a limitar activamente el número de opciones que consideras.</p>
        
        <div class="card">
            <h3>Escenario: Comprar un Laptop</h3>
            <p>Opciones disponibles inicialmente: <strong>50</strong></p>
            
            <h4>Establece Criterios de Filtrado:</h4>
            <label>Precio Máximo ($):</label>
            <input type="number" id="maxPrice" value="1000" oninput="filter()">
            
            <label>RAM Mínima (GB):</label>
            <input type="number" id="minRAM" value="8" oninput="filter()">
            
            <label>Almacenamiento Mínimo (GB):</label>
            <input type="number" id="minStorage" value="256" oninput="filter()">
            
            <label>Marca Preferida:</label>
            <select id="brand" onchange="filter()">
                <option value="">Cualquiera</option>
                <option value="Apple">Apple</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
                <option value="Lenovo">Lenovo</option>
                <option value="Asus">Asus</option>
            </select>
        </div>
        
        <div id="filtered-options" class="card" style="display:none;">
            <h3>Opciones Filtradas</h3>
            <div id="options-list"></div>
        </div>
        
        <div id="result" class="result-area"></div>

        <script>
            // Simulación de 50 laptops
            const allLaptops = [];
            const brands = ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI', 'Razer'];
            for (let i = 0; i < 50; i++) {
                allLaptops.push({
                    brand: brands[Math.floor(Math.random() * brands.length)],
                    price: 500 + Math.random() * 2000,
                    ram: [4, 8, 16, 32][Math.floor(Math.random() * 4)],
                    storage: [128, 256, 512, 1024][Math.floor(Math.random() * 4)]
                });
            }
            
            function filter() {
                const maxPrice = parseFloat(document.getElementById('maxPrice').value) || 9999;
                const minRAM = parseInt(document.getElementById('minRAM').value) || 0;
                const minStorage = parseInt(document.getElementById('minStorage').value) || 0;
                const brand = document.getElementById('brand').value;
                
                let filtered = allLaptops.filter(l => 
                    l.price <= maxPrice &&
                    l.ram >= minRAM &&
                    l.storage >= minStorage &&
                    (brand === '' || l.brand === brand)
                );
                
                const listDiv = document.getElementById('options-list');
                const filterDiv = document.getElementById('filtered-options');
                
                if (filtered.length > 0) {
                    listDiv.innerHTML = filtered.slice(0, 10).map((l, i) => 
                        `<div style="padding: 10px; margin: 5px 0; background: rgba(0,229,255,0.1); border-radius: 5px;">
                            ${i+1}. ${l.brand} - $${Math.round(l.price)} - ${l.ram}GB RAM - ${l.storage}GB
                        </div>`
                    ).join('');
                    
                    if (filtered.length > 10) {
                        listDiv.innerHTML += `<p style="color: #b388ff;">... y ${filtered.length - 10} más</p>`;
                    }
                    
                    filterDiv.style.display = 'block';
                } else {
                    filterDiv.style.display = 'none';
                }
                
                const result = document.getElementById('result');
                let recommendation = '';
                if (filtered.length === 0) {
                    recommendation = '❌ No hay opciones que cumplan tus criterios. Considera relajar algunos filtros.';
                } else if (filtered.length <= 6) {
                    recommendation = '✅ Perfecto! Tienes un número óptimo de opciones para considerar.';
                } else if (filtered.length <= 12) {
                    recommendation = '⚠️ Aún tienes muchas opciones. Considera agregar un criterio más (ej: peso, batería, pantalla).';
                } else {
                    recommendation = '❌ Demasiadas opciones. Agrega más criterios de filtrado para reducir a 6-8 opciones.';
                }
                
                result.innerHTML = `
                    <h3>📊 Resultados del Filtrado</h3>
                    <p><strong>Opciones después del filtro:</strong> ${filtered.length}</strong></p>
                    <p style="margin-top: 15px; color: #b388ff;">${recommendation}</p>
                `;
                result.style.display = 'block';
            }
            
            filter();
        </script>
        """
    },
    {
        "filename": "08_simulador_adaptacion.html",
        "title": "Simulador de Adaptación Hedónica",
        "content": """
        <p class="subtitle">Observa cómo nos acostumbramos a las cosas buenas (y malas).</p>
        
        <div class="card">
            <h3>Escenario: Has Comprado Algo Nuevo</h3>
            <label>¿Qué compraste?</label>
            <select id="purchase" onchange="startSimulation()">
                <option value="car">Un Auto Nuevo</option>
                <option value="phone">Un Teléfono Nuevo</option>
                <option value="house">Una Casa Nueva</option>
                <option value="vacation">Unas Vacaciones</option>
            </select>
            
            <label>Nivel de Felicidad Inicial (1-10):</label>
            <input type="number" id="initialHappiness" value="9" min="1" max="10" onchange="startSimulation()">
        </div>
        
        <div id="simulation-area"></div>
        
        <button class="btn" onclick="startSimulation()">Iniciar Simulación</button>
        
        <div id="result" class="result-area"></div>

        <script>
            function startSimulation() {
                const purchase = document.getElementById('purchase').value;
                const initial = parseInt(document.getElementById('initialHappiness').value);
                const area = document.getElementById('simulation-area');
                
                const purchases = {
                    car: 'Auto Nuevo',
                    phone: 'Teléfono Nuevo',
                    house: 'Casa Nueva',
                    vacation: 'Vacaciones'
                };
                
                let html = '<div class="card"><h3>Evolución de tu Felicidad</h3>';
                html += '<div style="height: 200px; position: relative; border: 2px solid #00e5ff; border-radius: 8px; padding: 10px; margin: 15px 0;">';
                
                // Simular 12 meses
                const points = [];
                for (let month = 0; month <= 12; month++) {
                    // Adaptación hedónica: felicidad disminuye con el tiempo
                    const happiness = initial - (month * 0.6) + Math.random() * 0.5;
                    points.push(Math.max(3, Math.min(10, happiness)));
                }
                
                // Dibujar gráfico simple
                const maxH = 180;
                const maxW = 100;
                points.forEach((h, i) => {
                    const x = (i / 12) * maxW;
                    const y = maxH - ((h - 3) / 7) * maxH;
                    html += `<div style="position: absolute; left: ${x}%; bottom: ${y}px; width: 8px; height: 8px; background: #00e5ff; border-radius: 50%;"></div>`;
                    if (i > 0) {
                        const prevX = ((i-1) / 12) * maxW;
                        const prevY = maxH - ((points[i-1] - 3) / 7) * maxH;
                        html += `<div style="position: absolute; left: ${prevX}%; bottom: ${prevY}px; width: ${Math.sqrt(Math.pow(x-prevX,2) + Math.pow(y-prevY,2))}%; height: 2px; background: #00e5ff; transform-origin: left; transform: rotate(${Math.atan2(y-prevY, x-prevX) * 180 / Math.PI}deg);"></div>`;
                    }
                });
                
                html += '</div>';
                html += `<p><strong>Felicidad Inicial:</strong> ${initial}/10</p>`;
                html += `<p><strong>Felicidad Después de 12 Meses:</strong> ${Math.round(points[12] * 10) / 10}/10</p>`;
                html += '</div>';
                
                area.innerHTML = html;
                
                document.getElementById('result').innerHTML = `
                    <h3>📊 Análisis de Adaptación</h3>
                    <p>Has experimentado <strong>adaptación hedónica</strong>: el proceso por el cual nos acostumbramos a las cosas buenas y volvemos a nuestro nivel básico de felicidad.</p>
                    <div style="margin-top: 15px; padding: 15px; background: rgba(179, 136, 255, 0.1); border-radius: 8px;">
                        <strong>💡 Lección:</strong> Esto explica por qué buscar constantemente cosas nuevas para ser feliz puede ser una trampa. En lugar de buscar más cosas, practica la gratitud por lo que ya tienes.
                    </div>
                `;
                document.getElementById('result').style.display = 'block';
            }
            
            startSimulation();
        </script>
        """
    },
    {
        "filename": "09_comparador_social.html",
        "title": "Comparador Social",
        "content": """
        <p class="subtitle">Ve cómo la comparación social afecta tu satisfacción.</p>
        
        <div class="card">
            <h3>Tu Elección</h3>
            <p>Has elegido: <strong id="yourChoice">Restaurante A</strong></p>
            <p>Tu satisfacción inicial: <strong>8/10</strong></p>
        </div>
        
        <div class="card">
            <h3>Elecciones de Otros</h3>
            <div id="others-choices"></div>
            <button class="btn" onclick="addComparison()">Agregar Comparación</button>
        </div>
        
        <div id="result" class="result-area" style="display:block;">
            <h3>📊 Impacto de la Comparación</h3>
            <p><strong>Tu Satisfacción Actual:</strong> <span id="currentSatisfaction" style="color: #00e5ff; font-size: 1.5em;">8/10</span></p>
            <p id="insight" style="color: #b388ff;"></p>
        </div>

        <script>
            let comparisons = [];
            let baseSatisfaction = 8;
            
            function addComparison() {
                const options = ['Restaurante A', 'Restaurante B', 'Restaurante C', 'Restaurante D', 'Restaurante E'];
                const otherChoice = options[Math.floor(Math.random() * options.length)];
                const otherSatisfaction = 5 + Math.random() * 5;
                
                comparisons.push({ choice: otherChoice, satisfaction: otherSatisfaction });
                renderComparisons();
                updateSatisfaction();
            }
            
            function renderComparisons() {
                const container = document.getElementById('others-choices');
                container.innerHTML = comparisons.map((c, i) => 
                    `<div style="padding: 10px; margin: 5px 0; background: rgba(0,229,255,0.1); border-radius: 5px;">
                        ${c.choice} - Satisfacción: ${Math.round(c.satisfaction * 10) / 10}/10
                        <button class="btn" onclick="removeComparison(${i})" style="float: right; padding: 5px 10px; font-size: 0.8em;">X</button>
                    </div>`
                ).join('');
            }
            
            function removeComparison(index) {
                comparisons.splice(index, 1);
                renderComparisons();
                updateSatisfaction();
            }
            
            function updateSatisfaction() {
                let satisfaction = baseSatisfaction;
                let insight = '';
                
                if (comparisons.length === 0) {
                    insight = 'Sin comparaciones, tu satisfacción se mantiene en su nivel base.';
                } else {
                    const betterChoices = comparisons.filter(c => c.satisfaction > satisfaction).length;
                    const worseChoices = comparisons.length - betterChoices;
                    
                    // Cada comparación con algo "mejor" reduce satisfacción
                    satisfaction -= betterChoices * 0.5;
                    // Comparaciones con algo "peor" aumentan ligeramente
                    satisfaction += worseChoices * 0.2;
                    
                    satisfaction = Math.max(3, Math.min(10, satisfaction));
                    
                    if (betterChoices > worseChoices) {
                        insight = `⚠️ Estás comparando principalmente con opciones "mejores". Esto reduce tu satisfacción. Recuerda: tu elección cumple con tus propios objetivos y valores.`;
                    } else {
                        insight = `✓ Estás comparando con opciones similares o peores. Tu satisfacción se mantiene estable.`;
                    }
                }
                
                document.getElementById('currentSatisfaction').innerText = Math.round(satisfaction * 10) / 10 + '/10';
                document.getElementById('insight').innerText = insight;
            }
            
            renderComparisons();
            updateSatisfaction();
        </script>
        """
    },
    {
        "filename": "10_generador_rutinas.html",
        "title": "Generador de Rutinas",
        "content": """
        <p class="subtitle">Crea rutinas para decisiones triviales y libera tiempo mental.</p>
        
        <div class="card">
            <h3>Decisiones para Automatizar</h3>
            <div id="routines-list"></div>
            <button class="btn" onclick="addRoutine()">+ Agregar Rutina</button>
        </div>
        
        <div id="result" class="result-area"></div>

        <script>
            let routines = [
                { decision: 'Qué desayunar', routine: 'Avena con frutas', timeSaved: 10 },
                { decision: 'Qué café tomar', routine: 'Café negro', timeSaved: 5 },
                { decision: 'Dónde almorzar', routine: 'Los mismos 3 restaurantes rotando', timeSaved: 15 }
            ];
            
            function renderRoutines() {
                const container = document.getElementById('routines-list');
                container.innerHTML = '';
                
                routines.forEach((r, i) => {
                    const div = document.createElement('div');
                    div.className = 'card';
                    div.style.marginBottom = '10px';
                    div.innerHTML = `
                        <p><strong>Decisión:</strong> ${r.decision}</p>
                        <label>Rutina:</label>
                        <input type="text" value="${r.routine}" onchange="updateRoutine(${i}, this.value)">
                        <button class="btn" onclick="removeRoutine(${i})" style="margin-top: 10px; background: rgba(255,0,0,0.2); border-color: #ff3333; color: #ff3333;">Eliminar</button>
                    `;
                    container.appendChild(div);
                });
                
                calculateBenefits();
            }
            
            function updateRoutine(index, value) {
                routines[index].routine = value;
                calculateBenefits();
            }
            
            function removeRoutine(index) {
                routines.splice(index, 1);
                renderRoutines();
            }
            
            function addRoutine() {
                const decision = prompt('¿Qué decisión quieres automatizar?');
                if (decision) {
                    const routine = prompt('¿Cuál será tu rutina?');
                    if (routine) {
                        routines.push({ decision, routine, timeSaved: 10 });
                        renderRoutines();
                    }
                }
            }
            
            function calculateBenefits() {
                const totalTime = routines.reduce((sum, r) => sum + r.timeSaved, 0);
                const weeklyTime = totalTime * 7;
                const monthlyTime = weeklyTime * 4;
                
                document.getElementById('result').innerHTML = `
                    <h3>📊 Beneficios de tus Rutinas</h3>
                    <p><strong>Tiempo ahorrado por día:</strong> ${totalTime} minutos</p>
                    <p><strong>Tiempo ahorrado por semana:</strong> ${weeklyTime} minutos (${Math.round(weeklyTime/60 * 10)/10} horas)</p>
                    <p><strong>Tiempo ahorrado por mes:</strong> ${monthlyTime} minutos (${Math.round(monthlyTime/60 * 10)/10} horas)</p>
                    <div style="margin-top: 15px; padding: 15px; background: rgba(179, 136, 255, 0.1); border-radius: 8px;">
                        <strong>💡 Beneficios:</strong><br>
                        • Menos decisiones = menos estrés<br>
                        • Más tiempo mental para decisiones importantes<br>
                        • Mayor satisfacción al eliminar la sobrecarga de elección en áreas triviales<br>
                        • Las rutinas crean predictibilidad y reducen la ansiedad
                    </div>
                `;
                document.getElementById('result').style.display = 'block';
            }
            
            renderRoutines();
        </script>
        """
    },
    {
        "filename": "11_practica_gratitud.html",
        "title": "Práctica de Gratitud",
        "content": """
        <p class="subtitle">Aprende a apreciar lo que tienes en lugar de buscar constantemente algo mejor.</p>
        
        <div class="card">
            <h3>Ejercicio de Gratitud</h3>
            <p>Piensa en una decisión reciente que tomaste. En lugar de pensar en lo que podrías haber elegido, enfócate en lo positivo de tu elección.</p>
            
            <label>¿Qué decidiste?</label>
            <input type="text" id="decision" placeholder="Ej: Compré un auto usado">
            
            <label>¿Qué aspectos positivos tiene tu elección? (Lista al menos 3)</label>
            <textarea id="positives" rows="5" placeholder="1. Es confiable&#10;2. Está dentro de mi presupuesto&#10;3. Me encanta el color"></textarea>
            
            <button class="btn" onclick="practiceGratitude()">Practicar Gratitud</button>
        </div>
        
        <div id="result" class="result-area"></div>

        <script>
            function practiceGratitude() {
                const decision = document.getElementById('decision').value;
                const positives = document.getElementById('positives').value;
                
                if (!decision || !positives) {
                    alert('Por favor completa ambos campos');
                    return;
                }
                
                const positiveList = positives.split('\\n').filter(p => p.trim());
                
                if (positiveList.length < 3) {
                    alert('Por favor lista al menos 3 aspectos positivos');
                    return;
                }
                
                document.getElementById('result').innerHTML = `
                    <h3>🙏 Reflexión de Gratitud</h3>
                    <p><strong>Tu decisión:</strong> ${decision}</p>
                    <div class="card" style="margin-top: 15px;">
                        <h4 style="color: #00e5ff;">Aspectos Positivos:</h4>
                        <ul>
                            ${positiveList.map(p => `<li>${p.trim()}</li>`).join('')}
                        </ul>
                    </div>
                    <div style="margin-top: 20px; padding: 15px; background: rgba(179, 136, 255, 0.1); border-radius: 8px;">
                        <strong>💡 Lección:</strong> Al practicar la gratitud, cambias tu enfoque de lo que podrías tener a lo que ya tienes. Esto aumenta tu satisfacción con tus decisiones y reduce el arrepentimiento constante. La satisfacción no viene de tener más opciones o mejores opciones; viene de aprender a estar satisfecho con las opciones que tenemos.
                    </div>
                    <p style="margin-top: 15px; color: #b388ff;"><em>Intenta hacer este ejercicio regularmente, especialmente después de tomar decisiones importantes.</em></p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "12_maestro_eleccion.html",
        "title": "Maestro de la Elección",
        "content": """
        <p class="subtitle">Certificación Final: Aplica todos los principios aprendidos.</p>
        
        <div class="card" style="text-align: center;">
            <h3>¡Felicidades!</h3>
            <p>Has completado el recorrido por "La Paradoja de la Elección".</p>
            <p>Estás listo para tomar decisiones más inteligentes y vivir una vida más satisfactoria.</p>
            <div style="font-size: 50px; margin: 20px;">🎓</div>
            <p>Tu kit de herramientas ahora contiene:</p>
            <ul style="text-align: left; list-style: none;">
                <li>✅ Entendimiento de cómo las opciones afectan la satisfacción</li>
                <li>✅ Habilidades para priorizar decisiones</li>
                <li>✅ Estrategias para limitar opciones efectivamente</li>
                <li>✅ Técnicas de gratitud y satisfacción</li>
                <li>✅ Conocimiento de maximizadores vs. satisfactores</li>
            </ul>
        </div>
        
        <div class="card">
            <h3>Resumen de Principios Clave</h3>
            <ol style="text-align: left;">
                <li><strong>Elige cuándo elegir:</strong> No todas las decisiones merecen el mismo nivel de atención.</li>
                <li><strong>Sé un satisfactor:</strong> Busca lo "suficientemente bueno" en lugar de "lo mejor".</li>
                <li><strong>Reduce expectativas:</strong> Sé realista sobre lo que cualquier elección puede darte.</li>
                <li><strong>Haz decisiones irreversibles:</strong> Comprométete con tus elecciones.</li>
                <li><strong>Presta menos atención a los demás:</strong> Evalúa tus elecciones según tus propios valores.</li>
                <li><strong>Abraza restricciones voluntarias:</strong> Limita tus opciones para aumentar tu libertad.</li>
                <li><strong>Practica gratitud:</strong> Aprecia lo que tienes en lugar de buscar constantemente algo mejor.</li>
            </ol>
        </div>
        
        <button class="btn" onclick="claimCertificate()">Reclamar Certificado (Simulado)</button>
        
        <div id="result" class="result-area" style="text-align: center;"></div>
        
        <script>
            function claimCertificate() {
                document.getElementById('result').innerHTML = `
                    <h3>🏆 Certificado de Maestría en Toma de Decisiones</h3>
                    <p>Has demostrado comprensión de:</p>
                    <p style="color: #00e5ff; font-size: 1.2em;">La Paradoja de la Elección</p>
                    <p><em>Barry Schwartz</em></p>
                    <p style="margin-top: 20px; color: #b388ff;">Recuerda: La verdadera libertad viene de aprender a elegir sabiamente, no de tener opciones ilimitadas.</p>
                    <p style="margin-top: 15px;">¡Bienvenido al camino hacia una vida más satisfactoria y menos estresante!</p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    }
]

for game in games:
    html_content = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{game['title']}</title>
    {game_css}
</head>
<body>
    <div class="container">
        <h1>{game['title']}</h1>
        {game['content']}
    </div>
</body>
</html>"""
    
    with open(os.path.join(base_path, game['filename']), "w", encoding="utf-8") as f:
        f.write(html_content)

print("✅ 12 Juegos interactivos creados exitosamente para el libro 052 (The Paradox of Choice).")
