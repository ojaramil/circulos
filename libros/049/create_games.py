import os

base_path = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/049/juegos"
os.makedirs(base_path, exist_ok=True)

# Common CSS for games
game_css = """
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 40px;
            max-width: 900px;
            width: 100%;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }
        h1 {
            color: #1a2a6c;
            text-align: center;
            margin-bottom: 10px;
        }
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
            font-style: italic;
        }
        .btn {
            background: linear-gradient(to right, #1a2a6c, #b21f1f);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 1em;
            transition: transform 0.2s, box-shadow 0.2s;
            display: inline-block;
            margin: 10px 5px;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .card {
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            margin-bottom: 20px;
            border-left: 5px solid #1a2a6c;
        }
        input, textarea, select {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 2px solid #eee;
            border-radius: 10px;
            font-family: inherit;
            transition: border-color 0.3s;
        }
        input:focus, textarea:focus, select:focus {
            border-color: #b21f1f;
            outline: none;
        }
        .result-area {
            margin-top: 20px;
            padding: 20px;
            background: #f0f4f8;
            border-radius: 10px;
            display: none;
        }
    </style>
"""

games = [
    {
        "filename": "01_detector_patrones.html",
        "title": "Detector de Patrones: Ego vs. Esencia",
        "content": """
        <p class="subtitle">Identifica desde dónde estás actuando en este momento.</p>
        
        <div class="card">
            <h3>Analiza una situación reciente</h3>
            <p>Piensa en un conflicto o situación que te haya perturbado recientemente.</p>
            <textarea id="situation" placeholder="Describe brevemente la situación..."></textarea>
            
            <p>¿Qué sentiste? (Selecciona todas las que apliquen)</p>
            <div id="feelings" style="display: flex; flex-wrap: wrap; gap: 10px;">
                <button class="btn" style="background: #ddd; color: #333;" onclick="toggleFeeling(this, 'ego')">Miedo</button>
                <button class="btn" style="background: #ddd; color: #333;" onclick="toggleFeeling(this, 'ego')">Ira</button>
                <button class="btn" style="background: #ddd; color: #333;" onclick="toggleFeeling(this, 'ego')">Culpa</button>
                <button class="btn" style="background: #ddd; color: #333;" onclick="toggleFeeling(this, 'esencia')">Comprensión</button>
                <button class="btn" style="background: #ddd; color: #333;" onclick="toggleFeeling(this, 'ego')">Necesidad de tener razón</button>
                <button class="btn" style="background: #ddd; color: #333;" onclick="toggleFeeling(this, 'esencia')">Paz</button>
                <button class="btn" style="background: #ddd; color: #333;" onclick="toggleFeeling(this, 'ego')">Juicio</button>
                <button class="btn" style="background: #ddd; color: #333;" onclick="toggleFeeling(this, 'esencia')">Aceptación</button>
            </div>
        </div>
        
        <button class="btn" onclick="analyze()">Analizar Origen</button>
        
        <div id="result" class="result-area"></div>

        <script>
            let egoCount = 0;
            let essenceCount = 0;

            function toggleFeeling(btn, type) {
                if (btn.style.background === 'rgb(221, 221, 221)') {
                    btn.style.background = type === 'ego' ? '#ff6b6b' : '#4ecdc4';
                    btn.style.color = 'white';
                    if (type === 'ego') egoCount++; else essenceCount++;
                } else {
                    btn.style.background = '#ddd';
                    btn.style.color = '#333';
                    if (type === 'ego') egoCount--; else essenceCount--;
                }
            }

            function analyze() {
                const resultDiv = document.getElementById('result');
                let message = "";
                
                if (egoCount > essenceCount) {
                    message = "<h3>🚨 Detectado: Reacción del EGO</h3><p>Estás operando desde el miedo, la defensa o el ataque. Tu interpretación de la realidad está distorsionada por tus creencias limitantes. <strong>Consejo:</strong> Detente, respira y pregúntate: '¿Prefiero tener razón o ser feliz?'.</p>";
                } else if (essenceCount > egoCount) {
                    message = "<h3>✨ Detectado: Respuesta de la ESENCIA</h3><p>Estás conectado con tu sabiduría interior. Actúas desde la paz y la aceptación. ¡Sigue así!</p>";
                } else {
                    message = "<h3>⚖️ Zona Neutral</h3><p>Hay una mezcla de emociones. Estás en el proceso de observar. Da un paso atrás y observa la situación como si fueras un espectador en el cine.</p>";
                }
                
                resultDiv.innerHTML = message;
                resultDiv.style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "02_mapa_creencias.html",
        "title": "Mapa de Creencias Limitantes",
        "content": """
        <p class="subtitle">Cuestiona las 'verdades' que te impiden crecer.</p>
        
        <div class="card">
            <label>Escribe una creencia que te limite (ej: "No soy suficiente", "El dinero es malo"):</label>
            <input type="text" id="belief" placeholder="Tu creencia limitante...">
        </div>
        
        <div class="card" id="questions" style="display:none;">
            <h3>El Trabajo de Indagación (The Work)</h3>
            <div id="q1">
                <p>1. ¿Es verdad esta creencia?</p>
                <button class="btn" onclick="nextQ(2)">Sí</button> <button class="btn" onclick="nextQ(2)">No</button>
            </div>
            <div id="q2" style="display:none;">
                <p>2. ¿Puedes saber con absoluta certeza que es verdad?</p>
                <button class="btn" onclick="nextQ(3)">Sí</button> <button class="btn" onclick="nextQ(3)">No</button>
            </div>
            <div id="q3" style="display:none;">
                <p>3. ¿Cómo reaccionas cuando crees ese pensamiento?</p>
                <textarea placeholder="Me siento... Actúo..."></textarea>
                <button class="btn" onclick="nextQ(4)">Siguiente</button>
            </div>
            <div id="q4" style="display:none;">
                <p>4. ¿Quién serías sin ese pensamiento?</p>
                <textarea placeholder="Me sentiría..."></textarea>
                <button class="btn" onclick="showInversion()">Ver Inversión</button>
            </div>
        </div>
        
        <button class="btn" id="startBtn" onclick="startProcess()">Iniciar Cuestionamiento</button>
        
        <div id="result" class="result-area"></div>

        <script>
            function startProcess() {
                if(document.getElementById('belief').value.trim() === "") return alert("Escribe una creencia primero.");
                document.getElementById('questions').style.display = 'block';
                document.getElementById('startBtn').style.display = 'none';
            }
            
            function nextQ(num) {
                document.querySelectorAll('[id^="q"]').forEach(el => el.style.display = 'none');
                document.getElementById('q'+num).style.display = 'block';
            }
            
            function showInversion() {
                const belief = document.getElementById('belief').value;
                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = `<h3>🔄 La Inversión</h3><p>Prueba a invertir tu creencia original: <strong>"${belief}"</strong>.</p>
                <ul>
                    <li>Hacia ti mismo.</li>
                    <li>Hacia el otro.</li>
                    <li>Al opuesto.</li>
                </ul>
                <p>A menudo, la inversión es tan o más verdadera que la creencia original. ¡Has roto el hechizo!</p>`;
                resultDiv.style.display = 'block';
                document.getElementById('questions').style.display = 'none';
            }
        </script>
        """
    },
    {
        "filename": "03_diario_sincronicidades.html",
        "title": "Diario de Sincronicidades",
        "content": """
        <p class="subtitle">Registra los guiños del universo.</p>
        
        <div class="card">
            <label>¿Qué "casualidad" significativa ocurrió hoy?</label>
            <textarea id="syncEvent" placeholder="Ej: Pensé en Juan y me llamó al instante..."></textarea>
            
            <label>¿Qué estabas pensando o sintiendo justo antes?</label>
            <input type="text" id="context" placeholder="Estado mental/emocional...">
            
            <label>¿Qué mensaje crees que trae para ti?</label>
            <textarea id="message" placeholder="Interpretación..."></textarea>
        </div>
        
        <button class="btn" onclick="saveEntry()">Guardar Entrada</button>
        
        <div id="log" class="result-area" style="display:block; margin-top:30px;">
            <h3>📖 Tu Historial de Magia</h3>
            <div id="entries"></div>
        </div>

        <script>
            function saveEntry() {
                const event = document.getElementById('syncEvent').value;
                const msg = document.getElementById('message').value;
                
                if(!event) return;
                
                const entryHTML = `<div style="background:white; padding:15px; margin-bottom:10px; border-radius:8px; border-left:4px solid #fdbb2d;">
                    <strong>Evento:</strong> ${event}<br>
                    <strong>Mensaje:</strong> ${msg}
                    <div style="font-size:0.8em; color:#999; margin-top:5px;">${new Date().toLocaleDateString()}</div>
                </div>`;
                
                document.getElementById('entries').insertAdjacentHTML('afterbegin', entryHTML);
                
                // Clear inputs
                document.getElementById('syncEvent').value = '';
                document.getElementById('context').value = '';
                document.getElementById('message').value = '';
            }
        </script>
        """
    },
    {
        "filename": "04_evaluador_responsabilidad.html",
        "title": "Evaluador de Responsabilidad",
        "content": """
        <p class="subtitle">¿Víctima o Protagonista? Mide tu nivel de poder personal.</p>
        
        <div id="quiz"></div>
        <button class="btn" onclick="calculateScore()">Calcular Resultado</button>
        <div id="result" class="result-area"></div>

        <script>
            const questions = [
                "Cuando algo sale mal, ¿buscas a quién culpar?",
                "¿Te quejas frecuentemente del clima, el tráfico o la política?",
                "¿Crees que tu felicidad depende de cómo te tratan los demás?",
                "¿Esperas que otros cambien para tú sentirte bien?",
                "¿Usas frases como 'me hacen enfadar' o 'no tengo opción'?"
            ];
            
            const quizDiv = document.getElementById('quiz');
            questions.forEach((q, i) => {
                quizDiv.innerHTML += `
                    <div class="card">
                        <p>${q}</p>
                        <select id="q${i}">
                            <option value="0">Nunca</option>
                            <option value="1">A veces</option>
                            <option value="2">Frecuentemente</option>
                            <option value="3">Siempre</option>
                        </select>
                    </div>
                `;
            });

            function calculateScore() {
                let score = 0;
                questions.forEach((_, i) => {
                    score += parseInt(document.getElementById('q'+i).value);
                });
                
                const resultDiv = document.getElementById('result');
                let feedback = "";
                
                if (score < 5) {
                    feedback = "<h3>👑 Protagonista Total</h3><p>Asumes plena responsabilidad de tu vida. Sabes que eres el creador de tu experiencia. ¡Felicidades!</p>";
                } else if (score < 10) {
                    feedback = "<h3>🚧 En Proceso</h3><p>A veces caes en el victimismo, pero estás despertando. Observa tus quejas y transfórmalas en acciones.</p>";
                } else {
                    feedback = "<h3>⚠️ Modo Víctima Activado</h3><p>Estás cediendo tu poder. Crees que la vida te sucede a ti. Recuerda: nadie puede hacerte sentir nada sin tu consentimiento.</p>";
                }
                
                resultDiv.innerHTML = feedback;
                resultDiv.style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "05_explorador_proposito.html",
        "title": "Explorador de Propósito (Ikigai)",
        "content": """
        <p class="subtitle">Encuentra la intersección mágica de tu vida.</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="card">
                <h3>❤️ Lo que AMAS</h3>
                <textarea id="love" placeholder="¿Qué harías gratis? ¿Qué te hace perder la noción del tiempo?"></textarea>
            </div>
            <div class="card">
                <h3>✨ En lo que eres BUENO</h3>
                <textarea id="good" placeholder="¿Qué se te da bien naturalmente? ¿Por qué te piden ayuda?"></textarea>
            </div>
            <div class="card">
                <h3>🌍 Lo que el mundo NECESITA</h3>
                <textarea id="need" placeholder="¿Qué problemas te duele ver en el mundo? ¿Qué falta?"></textarea>
            </div>
            <div class="card">
                <h3>💰 Por lo que te pueden PAGAR</h3>
                <textarea id="paid" placeholder="¿Qué servicios o valor puedes monetizar?"></textarea>
            </div>
        </div>
        
        <button class="btn" onclick="synthesize()">Sintetizar mi Ikigai</button>
        
        <div id="result" class="result-area"></div>

        <script>
            function synthesize() {
                const love = document.getElementById('love').value;
                const good = document.getElementById('good').value;
                const need = document.getElementById('need').value;
                const paid = document.getElementById('paid').value;
                
                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = `
                    <h3>🌟 Tu Propuesta de Propósito</h3>
                    <p>Tu misión podría ser usar tu talento para <strong>${good}</strong> en actividades que amas como <strong>${love}</strong>, resolviendo la necesidad de <strong>${need}</strong> a través de un modelo donde <strong>${paid}</strong>.</p>
                    <p><em>Recuerda: El propósito no se encuentra, se construye día a día.</em></p>
                `;
                resultDiv.style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "06_transformador_ego.html",
        "title": "Transformador del Ego",
        "content": """
        <p class="subtitle">Reescribe tu guion interno.</p>
        
        <div class="card">
            <h3>Situación: Alguien te critica injustamente</h3>
            <p><strong>Reacción del Ego (Automática):</strong></p>
            <div style="background: #ffe6e6; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                "¡Qué se cree! Es un idiota. Voy a demostrarle que se equivoca y a atacarle donde más le duele."
            </div>
            
            <p><strong>Respuesta de la Esencia (Consciente):</strong></p>
            <textarea id="response" placeholder="Escribe cómo respondería tu mejor versión..."></textarea>
        </div>
        
        <button class="btn" onclick="checkResponse()">Transformar</button>
        
        <div id="result" class="result-area"></div>

        <script>
            function checkResponse() {
                const resp = document.getElementById('response').value.toLowerCase();
                const resultDiv = document.getElementById('result');
                
                if (resp.includes("gracias") || resp.includes("entiendo") || resp.includes("acepto") || resp.includes("tranquil") || resp.includes("escuch")) {
                    resultDiv.innerHTML = "<h3>✨ ¡Excelente!</h3><p>Has elegido la paz en lugar del conflicto. Has visto la crítica como información, no como ataque.</p>";
                } else {
                    resultDiv.innerHTML = "<h3>🤔 Sigue intentando</h3><p>Intenta buscar una respuesta que no incluya defensa ni contraataque. Busca la comprensión y la calma.</p>";
                }
                resultDiv.style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "07_ejercicio_perdon.html",
        "title": "Ejercicio de Perdón Radical",
        "content": """
        <p class="subtitle">Libérate del veneno del rencor.</p>
        
        <div class="card">
            <label>Persona o situación a perdonar:</label>
            <input type="text" id="target">
            
            <label>¿Qué te hizo? (Hechos objetivos, sin juicios):</label>
            <textarea id="facts"></textarea>
            
            <label>¿Cómo te hizo sentir? (Tus emociones son tu responsabilidad):</label>
            <textarea id="feelings"></textarea>
            
            <label>¿Qué aprendiste de esto? (El regalo oculto):</label>
            <textarea id="learning"></textarea>
        </div>
        
        <button class="btn" onclick="forgive()">Declarar Perdón</button>
        
        <div id="result" class="result-area" style="text-align: center;"></div>

        <script>
            function forgive() {
                const target = document.getElementById('target').value;
                const resultDiv = document.getElementById('result');
                
                resultDiv.innerHTML = `
                    <h3>🕊️ Decreto de Liberación</h3>
                    <p>Yo decido perdonar a <strong>${target}</strong>.</p>
                    <p>No porque justifique sus acciones, sino porque merezco vivir en paz.</p>
                    <p>Suelto el pasado, tomo el aprendizaje y recupero mi energía.</p>
                    <p><strong>Soy libre.</strong></p>
                `;
                resultDiv.style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "08_practica_gratitud.html",
        "title": "Práctica de Gratitud",
        "content": """
        <p class="subtitle">Eleva tu vibración enfocándote en la abundancia.</p>
        
        <div class="card" style="text-align: center;">
            <h3 id="prompt">Haz clic para recibir un tema...</h3>
            <button class="btn" onclick="newPrompt()">🎲 Nuevo Tema</button>
        </div>
        
        <div class="card">
            <textarea id="gratitudeList" placeholder="Escribe 3 cosas por las que agradeces sobre este tema..." rows="5"></textarea>
        </div>
        
        <div id="counter" style="text-align: center; font-size: 1.2em; color: #1a2a6c;"></div>

        <script>
            const prompts = [
                "Tu cuerpo y salud",
                "Un desafío difícil que superaste",
                "Personas que te han ayudado",
                "Comodidades modernas (luz, agua, internet)",
                "Talentos o habilidades que posees",
                "La naturaleza y el entorno",
                "Lecciones aprendidas este año"
            ];
            
            function newPrompt() {
                const random = prompts[Math.floor(Math.random() * prompts.length)];
                document.getElementById('prompt').innerText = "Agradece por: " + random;
                document.getElementById('gratitudeList').value = "";
            }
            
            // Initialize
            newPrompt();
        </script>
        """
    },
    {
        "filename": "09_analizador_relaciones.html",
        "title": "Analizador de Relaciones (Ley del Espejo)",
        "content": """
        <p class="subtitle">Lo que te molesta del otro, vive en ti.</p>
        
        <div class="card">
            <label>¿Qué rasgo te molesta de alguien?</label>
            <input type="text" id="trait" placeholder="Ej: Es muy egoísta">
            
            <label>¿Quién es esa persona?</label>
            <input type="text" id="person" placeholder="Ej: Mi jefe">
        </div>
        
        <button class="btn" onclick="reflect()">Ver el Espejo</button>
        
        <div id="result" class="result-area"></div>

        <script>
            function reflect() {
                const trait = document.getElementById('trait').value;
                const resultDiv = document.getElementById('result');
                
                resultDiv.innerHTML = `
                    <h3>🪞 El Espejo te dice:</h3>
                    <p>Si te molesta <strong>"${trait}"</strong>, investiga:</p>
                    <ol>
                        <li><strong>Espejo Directo:</strong> ¿En qué áreas de tu vida eres tú "${trait}"?</li>
                        <li><strong>Espejo Opuesto:</strong> ¿Eres tan rígido en NO ser "${trait}" que te has polarizado?</li>
                        <li><strong>Espejo de Expectativas:</strong> ¿Tienes una expectativa irreal de que los demás no deberían ser así?</li>
                    </ol>
                    <p>Agradece a esa persona. Te está mostrando una sombra que necesitas integrar.</p>
                `;
                resultDiv.style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "10_meditacion_presente.html",
        "title": "Meditación del Presente",
        "content": """
        <p class="subtitle">Vuelve al Aquí y Ahora.</p>
        
        <div class="card" style="text-align: center;">
            <div id="circle" style="width: 150px; height: 150px; border-radius: 50%; background: #4ecdc4; margin: 0 auto; transition: transform 4s ease-in-out;"></div>
            <h2 id="breathText" style="margin-top: 20px;">Presiona Iniciar</h2>
            <div id="timer" style="font-size: 2em; margin: 10px;">00:00</div>
        </div>
        
        <div style="text-align: center;">
            <button class="btn" onclick="startMeditation()">Iniciar (1 min)</button>
            <button class="btn" onclick="stopMeditation()" style="background: #ff6b6b;">Detener</button>
        </div>

        <script>
            let interval;
            let breathInterval;
            
            function startMeditation() {
                clearInterval(interval);
                clearInterval(breathInterval);
                
                let timeLeft = 60;
                const circle = document.getElementById('circle');
                const text = document.getElementById('breathText');
                
                // Breath animation
                function breathe() {
                    text.innerText = "Inhala...";
                    circle.style.transform = "scale(1.5)";
                    setTimeout(() => {
                        text.innerText = "Exhala...";
                        circle.style.transform = "scale(1)";
                    }, 4000);
                }
                
                breathe();
                breathInterval = setInterval(breathe, 8000);
                
                interval = setInterval(() => {
                    timeLeft--;
                    let m = Math.floor(timeLeft / 60);
                    let s = timeLeft % 60;
                    document.getElementById('timer').innerText = `${m}:${s < 10 ? '0'+s : s}`;
                    
                    if (timeLeft <= 0) {
                        stopMeditation();
                        text.innerText = "¡Completado!";
                    }
                }, 1000);
            }
            
            function stopMeditation() {
                clearInterval(interval);
                clearInterval(breathInterval);
                document.getElementById('circle').style.transform = "scale(1)";
                document.getElementById('breathText').innerText = "Listo";
            }
        </script>
        """
    },
    {
        "filename": "11_visualizacion_creativa.html",
        "title": "Visualización Creativa",
        "content": """
        <p class="subtitle">Crea la realidad desde adentro.</p>
        
        <div class="card">
            <h3>Diseña tu Día Ideal</h3>
            <p>Describe con detalle sensorial cómo sería un día perfecto en tu vida ideal.</p>
            
            <label>¿Qué ves al despertar?</label>
            <input type="text" placeholder="Luz del sol, mi pareja, el mar...">
            
            <label>¿Cómo te sientes?</label>
            <input type="text" placeholder="Lleno de energía, en paz, agradecido...">
            
            <label>¿A qué dedicas tu tiempo?</label>
            <textarea placeholder="Trabajo en mi proyecto, paseo por el bosque..."></textarea>
        </div>
        
        <button class="btn" onclick="visualize()">Generar Visión</button>
        
        <div id="result" class="result-area">
            <h3>👁️ Tu Realidad Potencial</h3>
            <p>Cierra los ojos. Imagina que esto YA está sucediendo. Siente la emoción de vivirlo. El cerebro no distingue entre lo que imaginas vívidamente y la realidad.</p>
            <p><em>"Creer es crear."</em></p>
        </div>

        <script>
            function visualize() {
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "12_maestro_conciencia.html",
        "title": "Maestro de Conciencia",
        "content": """
        <p class="subtitle">Demuestra tu despertar.</p>
        
        <div id="quiz-container"></div>
        <div id="score-area" class="result-area" style="text-align: center;"></div>

        <script>
            const quizData = [
                {
                    q: "¿Qué es el Ego?",
                    a: ["Tu verdadera identidad", "Una máscara social y mental", "Tu alma"],
                    correct: 1
                },
                {
                    q: "¿Qué dice la Ley del Espejo?",
                    a: ["Debes mirarte mucho al espejo", "Lo que ves fuera es un reflejo de dentro", "Los espejos traen mala suerte"],
                    correct: 1
                },
                {
                    q: "¿Cuál es la causa del sufrimiento?",
                    a: ["La mala suerte", "Los demás", "La resistencia a aceptar la realidad"],
                    correct: 2
                },
                {
                    q: "¿Qué son las casualidades?",
                    a: ["Eventos aleatorios", "No existen, son sincronicidades", "Errores de la matrix"],
                    correct: 1
                }
            ];
            
            function loadQuiz() {
                const container = document.getElementById('quiz-container');
                let html = '';
                quizData.forEach((item, index) => {
                    html += `<div class="card">
                        <p><strong>${index + 1}. ${item.q}</strong></p>
                        ${item.a.map((opt, i) => `<button class="btn" style="background:#f0f0f0; color:#333; width:100%; text-align:left;" onclick="checkAnswer(this, ${index}, ${i})">${opt}</button>`).join('')}
                    </div>`;
                });
                container.innerHTML = html;
            }
            
            let score = 0;
            let answered = 0;
            
            function checkAnswer(btn, qIndex, aIndex) {
                if (btn.parentElement.classList.contains('answered')) return;
                
                btn.parentElement.classList.add('answered');
                answered++;
                
                if (aIndex === quizData[qIndex].correct) {
                    btn.style.background = '#4ecdc4';
                    btn.style.color = 'white';
                    score++;
                } else {
                    btn.style.background = '#ff6b6b';
                    btn.style.color = 'white';
                }
                
                if (answered === quizData.length) {
                    const resultDiv = document.getElementById('score-area');
                    resultDiv.innerHTML = `<h3>Resultado Final: ${score}/${quizData.length}</h3>
                    <p>${score === 4 ? '¡Eres un Maestro Jedi de la Conciencia!' : 'Sigue practicando, joven padawan.'}</p>`;
                    resultDiv.style.display = 'block';
                }
            }
            
            loadQuiz();
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

print("✅ 12 Juegos interactivos creados exitosamente para el libro 049.")
