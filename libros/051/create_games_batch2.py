import os

games_data = {
    "05_generador_aprecio.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Generador de Aprecio 💝</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #E91E63, #880E4F); color: #333; padding: 20px; min-height: 100vh; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        h1 { color: #880E4F; text-align: center; }
        .scenario { background: #FCE4EC; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #E91E63; }
        .input-area { margin-top: 20px; }
        textarea { width: 100%; height: 100px; padding: 10px; border-radius: 8px; border: 2px solid #ddd; margin-bottom: 10px; font-family: inherit; }
        button { background: #E91E63; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 1.1em; transition: transform 0.2s; }
        button:hover { transform: scale(1.05); background: #C2185B; }
        .feedback { margin-top: 20px; padding: 15px; border-radius: 8px; display: none; }
        .feedback.good { background: #E8F5E9; color: #2E7D32; border: 1px solid #A5D6A7; }
        .feedback.bad { background: #FFEBEE; color: #C62828; border: 1px solid #FFCDD2; }
    </style>
</head>
<body>
    <div class="container">
        <h1>💝 Generador de Aprecio Sincero</h1>
        <p>Transforma observaciones cotidianas en elogios genuinos y específicos.</p>
        
        <div id="game-area"></div>
    </div>

    <script>
        const scenarios = [
            {
                context: "Tu colega entregó un informe a tiempo, aunque tuvo poco tiempo.",
                bad: "Buen trabajo.",
                hint: "Sé específico sobre el esfuerzo y la calidad bajo presión."
            },
            {
                context: "Tu pareja preparó una cena especial un martes cualquiera.",
                bad: "Gracias por la cena.",
                hint: "Menciona el detalle, el sabor y cómo te hace sentir su consideración."
            },
            {
                context: "Un empleado se quedó tarde para ayudar a un cliente difícil.",
                bad: "Bien hecho con ese cliente.",
                hint: "Reconoce su paciencia, profesionalismo y el impacto en la imagen de la empresa."
            }
        ];
        
        let current = 0;

        function loadScenario() {
            if (current >= scenarios.length) {
                document.getElementById('game-area').innerHTML = '<div style="text-align:center"><h2>¡Excelente! 🎉</h2><p>Has practicado el arte del aprecio específico.</p><button onclick="location.reload()">Volver a empezar</button></div>';
                return;
            }
            const s = scenarios[current];
            document.getElementById('game-area').innerHTML = `
                <div class="scenario">
                    <h3>Situación ${current + 1}:</h3>
                    <p>${s.context}</p>
                    <p><strong>Elogio genérico (a evitar):</strong> "${s.bad}"</p>
                </div>
                <div class="input-area">
                    <label>Escribe un elogio específico y sincero:</label>
                    <textarea id="user-input" placeholder="Ej: Realmente admiro cómo..."></textarea>
                    <button onclick="checkAnswer()">Enviar Elogio</button>
                </div>
                <div id="feedback" class="feedback"></div>
            `;
        }

        function checkAnswer() {
            const input = document.getElementById('user-input').value;
            const feedback = document.getElementById('feedback');
            
            if (input.length < 20) {
                feedback.className = 'feedback bad';
                feedback.innerHTML = '⚠️ Tu elogio es muy corto. Intenta ser más específico y detallado.';
                feedback.style.display = 'block';
                return;
            }

            feedback.className = 'feedback good';
            feedback.innerHTML = `
                <strong>¡Muy bien!</strong> 🌟<br>
                Los elogios específicos como el tuyo tienen mucho más impacto que los genéricos.<br>
                <button onclick="next()" style="margin-top:10px; background:#2E7D32">Siguiente</button>
            `;
            feedback.style.display = 'block';
        }

        function next() {
            current++;
            loadScenario();
        }

        loadScenario();
    </script>
</body>
</html>""",

    "06_analizador_lenguaje.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Analizador de Lenguaje 🔍</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        h1 { text-align: center; color: #3F51B5; }
        .phrase-box { background: #E8EAF6; padding: 20px; margin: 20px 0; border-radius: 8px; font-size: 1.2em; text-align: center; }
        .options { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .option { padding: 15px; border: 2px solid #ddd; border-radius: 8px; cursor: pointer; transition: all 0.2s; text-align: center; }
        .option:hover { background: #f5f5f5; border-color: #3F51B5; }
        .option.correct { background: #C8E6C9; border-color: #4CAF50; }
        .option.wrong { background: #FFCDD2; border-color: #F44336; }
        .score { text-align: center; font-weight: bold; margin-bottom: 20px; color: #555; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Analizador de Lenguaje</h1>
        <p style="text-align:center">Selecciona la frase que mejor aplica los principios de Carnegie (evita críticas, despierta deseo, muestra interés).</p>
        <div class="score">Puntuación: <span id="score">0</span></div>
        <div id="game-content"></div>
    </div>

    <script>
        const questions = [
            {
                bad: "¡Estás equivocado! Esos datos no son correctos.",
                good: "Yo pensaba diferente, pero puedo estar equivocado. Revisemos los hechos juntos.",
                explanation: "Admitir que puedes estar equivocado desarma la defensiva del otro."
            },
            {
                bad: "Necesito que termines esto para mañana sin falta.",
                good: "Si logramos terminar esto para mañana, el cliente estará encantado y será un gran logro para el equipo.",
                explanation: "Despierta un deseo en la otra persona mostrando el beneficio."
            },
            {
                bad: "Tu idea no va a funcionar.",
                good: "¿Cómo crees que podríamos implementar esa idea para resolver el problema X?",
                explanation: "Haz preguntas en lugar de dar órdenes o críticas directas."
            },
            {
                bad: "Hablas demasiado de ti mismo.",
                good: "¡Qué historia tan interesante! Cuéntame más sobre cómo lograste eso.",
                explanation: "Muestra interés genuino y anima a los demás a hablar de sí mismos."
            }
        ];

        let current = 0;
        let score = 0;

        function loadQuestion() {
            if (current >= questions.length) {
                document.getElementById('game-content').innerHTML = `<div style="text-align:center"><h2>Fin del juego</h2><p>Puntuación final: ${score}/${questions.length}</p><button onclick="location.reload()" style="padding:10px 20px; cursor:pointer;">Jugar de nuevo</button></div>`;
                return;
            }
            
            const q = questions[current];
            const isFirstGood = Math.random() > 0.5;
            
            document.getElementById('game-content').innerHTML = `
                <div class="phrase-box">¿Cuál frase es más efectiva?</div>
                <div class="options">
                    <div class="option" onclick="check(this, ${isFirstGood}, '${q.explanation}')">${isFirstGood ? q.good : q.bad}</div>
                    <div class="option" onclick="check(this, ${!isFirstGood}, '${q.explanation}')">${isFirstGood ? q.bad : q.good}</div>
                </div>
                <div id="result" style="margin-top:20px; text-align:center;"></div>
            `;
        }

        function check(el, isCorrect, explanation) {
            if (document.querySelector('.option.clicked')) return; 
            el.classList.add('clicked');
            
            if (isCorrect) {
                el.classList.add('correct');
                score++;
                document.getElementById('result').innerHTML = `<p style="color:green"><strong>¡Correcto!</strong> ${explanation}</p><button onclick="next()">Siguiente</button>`;
            } else {
                el.classList.add('wrong');
                document.getElementById('result').innerHTML = `<p style="color:red"><strong>Mejorable.</strong> La otra opción es mejor porque: ${explanation}</p><button onclick="next()">Siguiente</button>`;
            }
            document.getElementById('score').innerText = score;
        }

        function next() {
            current++;
            loadQuestion();
        }

        loadQuestion();
    </script>
</body>
</html>""",

    "07_practica_sonrisa.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Práctica de Sonrisa 😊</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #FFF3E0; text-align: center; padding: 50px; }
        .container { background: white; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        .emoji { font-size: 8em; margin: 20px 0; transition: all 0.3s; cursor: pointer; }
        .emoji:hover { transform: scale(1.1); }
        button { background: #FF9800; color: white; border: none; padding: 15px 30px; font-size: 1.2em; border-radius: 50px; cursor: pointer; margin-top: 20px; }
        button:hover { background: #F57C00; }
        p { font-size: 1.2em; color: #555; line-height: 1.6; }
        .hidden { display: none; }
    </style>
</head>
<body>
    <div class="container">
        <h1>😊 El Poder de la Sonrisa</h1>
        <div id="step1">
            <div class="emoji">😐</div>
            <p>¿Sabías que el acto físico de sonreír puede cambiar tu estado de ánimo real?</p>
            <button onclick="startPractice()">Comenzar Experimento</button>
        </div>

        <div id="step2" class="hidden">
            <div class="emoji">😌</div>
            <p>Cierra los ojos por un momento. Piensa en algo por lo que estés agradecido hoy.</p>
            <button onclick="nextStep(3)">Listo</button>
        </div>

        <div id="step3" class="hidden">
            <div class="emoji">😊</div>
            <p>Ahora, fuerza una sonrisa suave. Manténla durante 10 segundos.</p>
            <div style="font-size: 2em; font-weight: bold; color: #FF9800; margin: 20px;" id="timer">10</div>
        </div>

        <div id="step4" class="hidden">
            <div class="emoji">😁</div>
            <p>¡Excelente! ¿Notaste un pequeño cambio en tu energía?</p>
            <p><strong>Reto del día:</strong> Sonríe a las próximas 3 personas que veas, aunque sea por teléfono.</p>
            <button onclick="location.reload()">Repetir Ejercicio</button>
        </div>
    </div>

    <script>
        function startPractice() {
            document.getElementById('step1').classList.add('hidden');
            document.getElementById('step2').classList.remove('hidden');
        }

        function nextStep(step) {
            document.getElementById('step2').classList.add('hidden');
            document.getElementById('step3').classList.remove('hidden');
            
            let time = 10;
            const timer = setInterval(() => {
                time--;
                document.getElementById('timer').innerText = time;
                if (time <= 0) {
                    clearInterval(timer);
                    document.getElementById('step3').classList.add('hidden');
                    document.getElementById('step4').classList.remove('hidden');
                }
            }, 1000);
        }
    </script>
</body>
</html>""",

    "08_escucha_activa.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Escucha Activa 👂</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #E1F5FE; padding: 20px; }
        .container { max-width: 700px; margin: 0 auto; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        h1 { color: #0277BD; text-align: center; }
        .chat-box { border: 2px solid #B3E5FC; padding: 20px; border-radius: 10px; height: 300px; overflow-y: auto; margin-bottom: 20px; background: #FAFAFA; }
        .msg { margin-bottom: 15px; padding: 10px 15px; border-radius: 15px; max-width: 80%; }
        .msg.bot { background: #E1F5FE; color: #01579B; float: left; clear: both; }
        .msg.user { background: #0277BD; color: white; float: right; clear: both; text-align: right; }
        .controls { clear: both; display: flex; flex-direction: column; gap: 10px; }
        .option-btn { padding: 12px; border: 1px solid #0277BD; background: white; color: #0277BD; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .option-btn:hover { background: #0277BD; color: white; }
    </style>
</head>
<body>
    <div class="container">
        <h1>👂 Simulador de Escucha Activa</h1>
        <p>Tu objetivo: Hacer que la otra persona se sienta comprendida sin juzgar ni dar consejos prematuros.</p>
        
        <div class="chat-box" id="chat">
            <div class="msg bot">Estoy muy estresado con el nuevo proyecto. Siento que mi jefe no valora mi esfuerzo.</div>
        </div>

        <div class="controls" id="options">
            <!-- Options will appear here -->
        </div>
    </div>

    <script>
        const levels = [
            {
                options: [
                    { text: "No te preocupes, seguro se le pasa.", score: 0, feedback: "Minimizaste sus sentimientos." },
                    { text: "Deberías hablar con él directamente.", score: 1, feedback: "Consejo prematuro. Primero escucha." },
                    { text: "Suena frustrante sentir que te esfuerzas y no lo notan. ¿Qué pasó exactamente?", score: 2, feedback: "¡Bien! Validaste y preguntaste para entender más." }
                ],
                nextMsg: "Bueno, ayer me quedé hasta tarde terminando el informe y hoy ni siquiera lo miró."
            },
            {
                options: [
                    { text: "Al menos tienes trabajo.", score: 0, feedback: "Eso invalida su frustración." },
                    { text: "¿Y no le dijiste nada?", score: 1, feedback: "Un poco agresivo." },
                    { text: "Vaya, quedarse hasta tarde y ser ignorado duele. ¿Cómo te hizo sentir eso?", score: 2, feedback: "Excelente empatía." }
                ],
                nextMsg: "Me sentí invisible. Como si mi tiempo no valiera nada."
            },
            {
                options: [
                    { text: "Entiendo perfectamente que te sientas invisible. Es una necesidad humana querer ser apreciado.", score: 2, feedback: "Perfecto cierre con validación profunda." },
                    { text: "Bueno, ya pasará.", score: 0, feedback: "Cierre frío." }
                ],
                end: true
            }
        ];

        let currentLevel = 0;

        function renderOptions() {
            const container = document.getElementById('options');
            container.innerHTML = '';
            levels[currentLevel].options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerText = opt.text;
                btn.onclick = () => selectOption(opt);
                container.appendChild(btn);
            });
        }

        function selectOption(opt) {
            const chat = document.getElementById('chat');
            
            // User msg
            chat.innerHTML += `<div class="msg user">${opt.text}</div>`;
            
            // Feedback msg (system)
            setTimeout(() => {
                chat.innerHTML += `<div style="clear:both; text-align:center; font-size:0.8em; color:#888; margin:5px;">Feedback: ${opt.feedback}</div>`;
                chat.scrollTop = chat.scrollHeight;

                if (opt.score === 2) {
                    setTimeout(() => {
                        if (levels[currentLevel].end) {
                             chat.innerHTML += `<div class="msg bot">Gracias por escucharme. Me siento mucho mejor hablándolo contigo.</div>`;
                             document.getElementById('options').innerHTML = '<h3>¡Misión Cumplida! 🎉</h3><button class="option-btn" onclick="location.reload()">Reiniciar</button>';
                        } else {
                            chat.innerHTML += `<div class="msg bot">${levels[currentLevel].nextMsg}</div>`;
                            currentLevel++;
                            renderOptions();
                        }
                        chat.scrollTop = chat.scrollHeight;
                    }, 1000);
                } else {
                    // Try again
                    chat.innerHTML += `<div style="clear:both; text-align:center; color:red; font-size:0.9em;">Intenta una respuesta más empática.</div>`;
                }
            }, 500);
        }

        renderOptions();
    </script>
</body>
</html>""",

    "09_resolucion_conflictos.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Resolución de Conflictos 🤝</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #F3E5F5; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 15px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        h1 { color: #7B1FA2; text-align: center; }
        .step { margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
        .step h3 { color: #4A148C; }
        .principle-card { background: #E1BEE7; padding: 15px; border-radius: 8px; margin: 10px 0; font-weight: bold; color: #4A148C; }
        button { background: #9C27B0; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-right: 10px; }
        button:hover { background: #7B1FA2; }
        .hidden { display: none; }
        .result { margin-top: 10px; padding: 10px; border-radius: 5px; }
        .success { background: #C8E6C9; color: #2E7D32; }
        .fail { background: #FFCDD2; color: #C62828; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🤝 Laboratorio de Conflictos</h1>
        <p>Aplica los principios para desactivar una situación tensa.</p>
        
        <div class="principle-card">Situación: Un vecino está furioso porque tu perro ladró toda la noche.</div>

        <div id="step1" class="step">
            <h3>Paso 1: La Reacción Inicial</h3>
            <p>El vecino grita: "¡Ese perro no me dejó dormir! ¡Es un desastre!"</p>
            <button onclick="check(1, false)">"¡Usted también hace ruido!"</button>
            <button onclick="check(1, true)">"Lo siento mucho, debe estar agotado."</button>
            <div id="res1" class="result hidden"></div>
        </div>

        <div id="step2" class="step hidden">
            <h3>Paso 2: Admitir Errores</h3>
            <p>Vecino: "¡Sí, estoy agotado! Tengo que trabajar hoy."</p>
            <button onclick="check(2, true)">"Tiene toda la razón en estar molesto. Fue mi responsabilidad y fallé."</button>
            <button onclick="check(2, false)">"Bueno, los perros ladran, es natural."</button>
            <div id="res2" class="result hidden"></div>
        </div>

        <div id="step3" class="step hidden">
            <h3>Paso 3: Solución Cooperativa</h3>
            <p>Vecino (más calmado): "Bueno, solo asegúrese de que no pase otra vez."</p>
            <button onclick="check(3, false)">"Lo intentaré."</button>
            <button onclick="check(3, true)">"Absolutamente. Lo meteré dentro de casa a partir de las 8pm. ¿Le parece bien?"</button>
            <div id="res3" class="result hidden"></div>
        </div>

        <div id="final" class="hidden" style="text-align:center">
            <h2>¡Conflicto Resuelto! 🎉</h2>
            <p>Has convertido a un vecino enojado en un aliado usando empatía y admitiendo errores.</p>
            <button onclick="location.reload()">Reiniciar</button>
        </div>
    </div>

    <script>
        function check(step, isCorrect) {
            const res = document.getElementById('res' + step);
            res.classList.remove('hidden');
            
            if (isCorrect) {
                res.className = 'result success';
                res.innerHTML = '✅ <strong>Correcto:</strong> Desarmaste la tensión.';
                setTimeout(() => {
                    if (step < 3) {
                        document.getElementById('step' + (step + 1)).classList.remove('hidden');
                    } else {
                        document.getElementById('final').classList.remove('hidden');
                    }
                }, 1000);
            } else {
                res.className = 'result fail';
                res.innerHTML = '❌ <strong>Incorrecto:</strong> Eso aumentó la defensiva. Intenta la otra opción.';
            }
        }
    </script>
</body>
</html>""",

    "10_liderazgo_positivo.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Liderazgo Positivo 👑</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #FFF8E1; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        h1 { color: #FF6F00; text-align: center; }
        .card { border: 2px solid #FFECB3; padding: 20px; margin: 15px 0; border-radius: 10px; cursor: pointer; transition: 0.3s; }
        .card:hover { background: #FFF8E1; border-color: #FF6F00; }
        .card h3 { margin-top: 0; color: #F57C00; }
        .feedback-modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 15px; box-shadow: 0 0 50px rgba(0,0,0,0.5); display: none; width: 80%; max-width: 500px; text-align: center; }
        .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: none; }
    </style>
</head>
<body>
    <div class="container">
        <h1>👑 Retos de Liderazgo</h1>
        <p>Elige la mejor forma de liderar en cada situación para inspirar sin ofender.</p>

        <div class="card" onclick="showScenario(1)">
            <h3>Caso 1: El empleado impuntual</h3>
            <p>Juan ha llegado tarde 3 veces esta semana.</p>
        </div>

        <div class="card" onclick="showScenario(2)">
            <h3>Caso 2: Error en el informe</h3>
            <p>María cometió un error de cálculo en el reporte final.</p>
        </div>

        <div class="card" onclick="showScenario(3)">
            <h3>Caso 3: Baja motivación</h3>
            <p>El equipo está desanimado por un proyecto difícil.</p>
        </div>
    </div>

    <div class="overlay" id="overlay"></div>
    <div class="feedback-modal" id="modal">
        <h2 id="modal-title"></h2>
        <div id="modal-options"></div>
        <div id="modal-feedback" style="margin-top:15px; font-weight:bold;"></div>
        <button onclick="closeModal()" style="margin-top:20px; padding:10px 20px; background:#FF6F00; color:white; border:none; border-radius:5px; cursor:pointer;">Cerrar</button>
    </div>

    <script>
        const scenarios = {
            1: {
                title: "El empleado impuntual",
                options: [
                    { text: "Juan, llegas tarde siempre. ¡Basta ya!", correct: false, feedback: "La crítica directa genera resentimiento." },
                    { text: "Juan, siempre has sido muy comprometido. Me preocupa que estos retrasos afecten tu excelente récord. ¿Todo bien?", correct: true, feedback: "¡Bien! Elogiaste primero (reputación a mantener) y mostraste preocupación genuina." }
                ]
            },
            2: {
                title: "Error en el informe",
                options: [
                    { text: "María, hay un error aquí. Pero no te preocupes, yo cometí uno peor al principio. Vamos a arreglarlo.", correct: true, feedback: "¡Excelente! Hablar de tus propios errores primero suaviza la corrección." },
                    { text: "¿Cómo pudiste equivocarte en esto? Es básico.", correct: false, feedback: "Humillar a alguien destruye su confianza." }
                ]
            },
            3: {
                title: "Baja motivación",
                options: [
                    { text: "Tienen que trabajar más duro o fracasaremos.", correct: false, feedback: "Las amenazas no inspiran." },
                    { text: "Sé que es un reto enorme, pero confío plenamente en su capacidad para superarlo. Miren lo que lograron el mes pasado...", correct: true, feedback: "¡Perfecto! El estímulo y la confianza motivan a las personas a superarse." }
                ]
            }
        };

        function showScenario(id) {
            const s = scenarios[id];
            document.getElementById('modal-title').innerText = s.title;
            const optsDiv = document.getElementById('modal-options');
            optsDiv.innerHTML = '';
            document.getElementById('modal-feedback').innerText = '';
            
            s.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.style = "display:block; width:100%; margin:10px 0; padding:10px; border:1px solid #ddd; background:#f9f9f9; cursor:pointer; border-radius:5px;";
                btn.innerText = opt.text;
                btn.onclick = () => {
                    document.getElementById('modal-feedback').style.color = opt.correct ? 'green' : 'red';
                    document.getElementById('modal-feedback').innerText = (opt.correct ? "✅ " : "❌ ") + opt.feedback;
                };
                optsDiv.appendChild(btn);
            });

            document.getElementById('overlay').style.display = 'block';
            document.getElementById('modal').style.display = 'block';
        }

        function closeModal() {
            document.getElementById('overlay').style.display = 'none';
            document.getElementById('modal').style.display = 'none';
        }
    </script>
</body>
</html>""",

    "11_influencia_etica.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Influencia Ética ⚖️</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #E0F2F1; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        h1 { color: #00695C; text-align: center; }
        .scenario-box { border: 2px solid #80CBC4; padding: 20px; border-radius: 10px; margin-bottom: 20px; background: #F0F4C3; }
        .drag-container { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
        .draggable { background: #009688; color: white; padding: 10px 20px; border-radius: 20px; cursor: grab; }
        .drop-zone { border: 2px dashed #00695C; padding: 20px; min-height: 100px; border-radius: 10px; background: #E0F2F1; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: center; }
        .success-msg { text-align: center; color: #2E7D32; font-weight: bold; font-size: 1.2em; margin-top: 20px; display: none; }
    </style>
</head>
<body>
    <div class="container">
        <h1>⚖️ Constructor de Influencia Ética</h1>
        <p>Arrastra los elementos correctos para construir una petición persuasiva y ética.</p>
        
        <div class="scenario-box">
            <strong>Objetivo:</strong> Convencer a tu equipo de adoptar un nuevo software difícil de aprender.
        </div>

        <div class="drag-container" id="source">
            <div class="draggable" draggable="true">Amenazar con despidos</div>
            <div class="draggable" draggable="true">Elogiar su adaptabilidad pasada</div>
            <div class="draggable" draggable="true">Explicar beneficios para ellos</div>
            <div class="draggable" draggable="true">Mentir sobre la facilidad</div>
            <div class="draggable" draggable="true">Pedir su opinión</div>
            <div class="draggable" draggable="true">Imponer la orden</div>
        </div>

        <h3>Arrastra aquí los 3 componentes éticos:</h3>
        <div class="drop-zone" id="target"></div>
        
        <div id="success" class="success-msg">🎉 ¡Perfecto! Has construido una influencia basada en respeto y beneficio mutuo.</div>
        <button onclick="check()" style="margin-top:20px; padding:10px 20px; background:#00695C; color:white; border:none; border-radius:5px; cursor:pointer; display:block; margin: 20px auto;">Verificar</button>
    </div>

    <script>
        const draggables = document.querySelectorAll('.draggable');
        const dropZone = document.getElementById('target');
        const sourceZone = document.getElementById('source');

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging');
            });

            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging');
            });
        });

        dropZone.addEventListener('dragover', e => {
            e.preventDefault();
        });

        dropZone.addEventListener('drop', e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            if (draggable) dropZone.appendChild(draggable);
        });

        sourceZone.addEventListener('dragover', e => {
            e.preventDefault();
        });

        sourceZone.addEventListener('drop', e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            if (draggable) sourceZone.appendChild(draggable);
        });

        function check() {
            const items = dropZone.querySelectorAll('.draggable');
            const correctItems = ["Elogiar su adaptabilidad pasada", "Explicar beneficios para ellos", "Pedir su opinión"];
            let correctCount = 0;
            let wrongCount = 0;

            items.forEach(item => {
                if (correctItems.includes(item.innerText)) correctCount++;
                else wrongCount++;
            });

            if (correctCount === 3 && wrongCount === 0) {
                document.getElementById('success').style.display = 'block';
                dropZone.style.borderColor = '#4CAF50';
                dropZone.style.background = '#C8E6C9';
            } else {
                alert("Mmm... algo no está bien. Asegúrate de elegir solo estrategias éticas y positivas (sin amenazas, mentiras ni imposiciones).");
            }
        }
    </script>
</body>
</html>""",

    "12_maestro_relaciones.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Maestro de Relaciones 🤝</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #263238; color: white; padding: 20px; text-align: center; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { color: #4DB6AC; font-size: 3em; margin-bottom: 10px; }
        .badge-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-top: 40px; }
        .badge { background: #37474F; padding: 20px; border-radius: 15px; border: 2px solid #546E7A; transition: 0.3s; opacity: 0.5; filter: grayscale(100%); }
        .badge.earned { opacity: 1; filter: grayscale(0%); border-color: #4DB6AC; box-shadow: 0 0 15px #4DB6AC; transform: scale(1.05); }
        .badge-icon { font-size: 3em; margin-bottom: 10px; }
        .badge h3 { margin: 0; color: #B2DFDB; }
        .btn { background: #009688; color: white; border: none; padding: 15px 30px; font-size: 1.2em; border-radius: 50px; cursor: pointer; margin-top: 30px; }
        .btn:hover { background: #00796B; }
        .congrats { display: none; margin-top: 30px; animation: popIn 0.5s; }
        @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏆 Maestro de Relaciones</h1>
        <p>Tu tablero de logros final. ¿Has dominado los principios?</p>

        <div class="badge-grid">
            <div class="badge" id="b1">
                <div class="badge-icon">🚫</div>
                <h3>Sin Críticas</h3>
            </div>
            <div class="badge" id="b2">
                <div class="badge-icon">💝</div>
                <h3>Aprecio Sincero</h3>
            </div>
            <div class="badge" id="b3">
                <div class="badge-icon">😊</div>
                <h3>Sonrisa Eterna</h3>
            </div>
            <div class="badge" id="b4">
                <div class="badge-icon">👂</div>
                <h3>Gran Oyente</h3>
            </div>
            <div class="badge" id="b5">
                <div class="badge-icon">👑</div>
                <h3>Líder Nato</h3>
            </div>
            <div class="badge" id="b6">
                <div class="badge-icon">🤝</div>
                <h3>Amigo de Todos</h3>
            </div>
        </div>

        <button class="btn" onclick="unlockAll()">Reclamar Certificado Mental</button>
        
        <div class="congrats" id="congrats">
            <h2>🎉 ¡Felicidades! 🎉</h2>
            <p>Has completado el viaje. Ahora tienes las herramientas para cambiar tu vida y la de los demás.</p>
            <p><em>"El conocimiento no es poder hasta que se aplica."</em> - Dale Carnegie</p>
        </div>
    </div>

    <script>
        function unlockAll() {
            const badges = document.querySelectorAll('.badge');
            let delay = 0;
            
            badges.forEach(badge => {
                setTimeout(() => {
                    badge.classList.add('earned');
                }, delay);
                delay += 300;
            });

            setTimeout(() => {
                document.getElementById('congrats').style.display = 'block';
                confettiEffect();
            }, delay + 500);
        }

        function confettiEffect() {
            // Simple visual effect simulation
            document.body.style.background = "radial-gradient(circle, #37474F 0%, #263238 100%)";
        }
    </script>
</body>
</html>"""
}

output_dir = "juegos"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for filename, content in games_data.items():
    filepath = os.path.join(output_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Creado: {filename}")
