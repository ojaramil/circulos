# -*- coding: utf-8 -*-
"""Genera los 12 juegos del libro 053 - High Performance Habits (Brendon Burchard)."""
import os

base_path = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/053/juegos"
os.makedirs(base_path, exist_ok=True)

game_css = """
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a3a5c, #2d5a87, #e67e22);
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
        h1 { color: #1a3a5c; text-align: center; margin-bottom: 10px; }
        .subtitle { text-align: center; color: #666; margin-bottom: 30px; font-style: italic; }
        .btn {
            background: linear-gradient(to right, #1a3a5c, #e67e22);
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
        .btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
        .card {
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            margin-bottom: 20px;
            border-left: 5px solid #1a3a5c;
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
        input:focus, textarea:focus, select:focus { border-color: #e67e22; outline: none; }
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
        "filename": "01_test_hp6.html",
        "title": "Test HP6: Autoevaluación de los seis hábitos",
        "content": """
        <p class="subtitle">Valora del 1 al 5 cada hábito según tu práctica actual.</p>
        <div id="quiz"></div>
        <button class="btn" onclick="calculateHP6()">Ver mi perfil HP6</button>
        <div id="result" class="result-area"></div>
        <script>
            const habits = [
                { name: "Claridad", desc: "Sé quién quiero ser, qué quiero y qué me da significado." },
                { name: "Energía", desc: "Cuido mi energía física, mental y emocional." },
                { name: "Necesidad", desc: "Siento una razón fuerte por la que debo rendir al máximo." },
                { name: "Productividad", desc: "Me enfoco en resultados de calidad en mi área principal (PQO)." },
                { name: "Influencia", desc: "Los demás creen en mí y me apoyan; yo los valoro." },
                { name: "Coraje", desc: "Expreso mis ideas y actúo con audacia a pesar del miedo." }
            ];
            const quizDiv = document.getElementById('quiz');
            habits.forEach((h, i) => {
                quizDiv.innerHTML += `<div class="card">
                    <p><strong>${h.name}:</strong> ${h.desc}</p>
                    <label>1 (casi nunca) — 5 (siempre): </label>
                    <select id="h${i}">
                        <option value="1">1</option><option value="2">2</option><option value="3">3</option>
                        <option value="4">4</option><option value="5">5</option>
                    </select>
                </div>`;
            });
            function calculateHP6() {
                let scores = [];
                let total = 0;
                habits.forEach((h, i) => {
                    let v = parseInt(document.getElementById('h'+i).value);
                    scores.push({ name: h.name, score: v });
                    total += v;
                });
                let avg = (total / 6).toFixed(1);
                let weak = scores.filter(s => s.score <= 2).map(s => s.name).join(", ") || "Ninguno";
                let strong = scores.filter(s => s.score >= 4).map(s => s.name).join(", ") || "Ninguno";
                document.getElementById('result').innerHTML = `
                    <h3>📊 Tu perfil HP6</h3>
                    <p><strong>Puntuación media:</strong> ${avg}/5</p>
                    <p><strong>Fortalezas (4-5):</strong> ${strong}</p>
                    <p><strong>Áreas a mejorar (1-2):</strong> ${weak}</p>
                    <p><em>Recomendación: Trabaja primero el hábito con menor puntuación. Un hábito mejorado levanta a los demás.</em></p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "02_buscador_claridad.html",
        "title": "Buscador de claridad",
        "content": """
        <p class="subtitle">Responde al "Future Four" para tu proyecto o etapa actual.</p>
        <div class="card">
            <p><strong>1. ¿Qué sentimiento o experiencia buscas?</strong></p>
            <textarea id="q1" placeholder="Ej: Sentirme en flujo, útil, en paz..."></textarea>
            <p><strong>2. ¿Cómo quieres relacionarte con los demás?</strong></p>
            <textarea id="q2" placeholder="Ej: Con respeto, escuchando, inspirando..."></textarea>
            <p><strong>3. ¿Qué resultados concretos quieres?</strong></p>
            <textarea id="q3" placeholder="Ej: Lanzar X, lograr Y..."></textarea>
            <p><strong>4. ¿Qué le dará significado a esto?</strong></p>
            <textarea id="q4" placeholder="Ej: Ayudar a otros, crecer, dejar huella..."></textarea>
        </div>
        <button class="btn" onclick="showSummary()">Generar resumen de claridad</button>
        <div id="result" class="result-area"></div>
        <script>
            function showSummary() {
                const a = document.getElementById('q1').value || "—";
                const b = document.getElementById('q2').value || "—";
                const c = document.getElementById('q3').value || "—";
                const d = document.getElementById('q4').value || "—";
                document.getElementById('result').innerHTML = `
                    <h3>🔍 Tu claridad actual</h3>
                    <p><strong>Sentimiento buscado:</strong> ${a}</p>
                    <p><strong>Relación con otros:</strong> ${b}</p>
                    <p><strong>Resultados:</strong> ${c}</p>
                    <p><strong>Significado:</strong> ${d}</p>
                    <p><em>Guarda este resumen y revísalo cada semana. La claridad se genera preguntando una y otra vez.</em></p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "03_generador_energia.html",
        "title": "Generador de energía",
        "content": """
        <p class="subtitle">Planifica tres actividades que te recargan (física, emocional y mentalmente).</p>
        <div class="card">
            <label>Actividad que recarga tu energía FÍSICA (ej. caminar, gym, estirar):</label>
            <input type="text" id="phys" placeholder="¿Qué harás y cuándo?">
            <label>Actividad que recarga tu energía EMOCIONAL (ej. hablar con un amigo, música, gratitud):</label>
            <input type="text" id="emo" placeholder="¿Qué harás y cuándo?">
            <label>Actividad que recarga tu energía MENTAL (ej. leer, silencio, naturaleza):</label>
            <input type="text" id="ment" placeholder="¿Qué harás y cuándo?">
        </div>
        <button class="btn" onclick="commitEnergy()">Comprometerme esta semana</button>
        <div id="result" class="result-area"></div>
        <script>
            function commitEnergy() {
                const p = document.getElementById('phys').value || "—";
                const e = document.getElementById('emo').value || "—";
                const m = document.getElementById('ment').value || "—";
                document.getElementById('result').innerHTML = `
                    <h3>⚡ Plan de energía</h3>
                    <p><strong>Física:</strong> ${p}</p>
                    <p><strong>Emocional:</strong> ${e}</p>
                    <p><strong>Mental:</strong> ${m}</p>
                    <p><em>Bloquea estos momentos en tu agenda como no negociables. Sin energía, el resto de los hábitos se resienten.</em></p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "04_elevador_necesidad.html",
        "title": "Elevador de necesidad",
        "content": """
        <p class="subtitle">Conecta con las razones por las que DEBES rendir al máximo.</p>
        <div class="card">
            <label>¿Quién depende de que des lo mejor de ti? (personas concretas o grupos):</label>
            <textarea id="who" placeholder="Ej: Mi equipo, mi familia, mis clientes..."></textarea>
            <label>¿Qué pasaría si no dieras lo mejor de ti?</label>
            <textarea id="what" placeholder="Consecuencias que te importan..."></textarea>
            <label>Una frase que te recuerde tu "por qué" cuando flaquees:</label>
            <input type="text" id="phrase" placeholder="Ej: Ellos cuentan conmigo. Yo soy quien...">
        </div>
        <button class="btn" onclick="raiseNecessity()">Elevar mi necesidad</button>
        <div id="result" class="result-area"></div>
        <script>
            function raiseNecessity() {
                const who = document.getElementById('who').value || "—";
                const what = document.getElementById('what').value || "—";
                const phrase = document.getElementById('phrase').value || "—";
                document.getElementById('result').innerHTML = `
                    <h3>🔥 Tu necesidad elevada</h3>
                    <p><strong>Quién depende de ti:</strong> ${who}</p>
                    <p><strong>Qué pasa si no das el máximo:</strong> ${what}</p>
                    <p><strong>Frase de anclaje:</strong> "${phrase}"</p>
                    <p><em>Escribe esta frase en un post-it o en tu teléfono. Úsala cuando la motivación baje.</em></p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "05_aumentador_productividad.html",
        "title": "Aumentador de productividad (PQO)",
        "content": """
        <p class="subtitle">Define tu "main thing" y tus 3 resultados de calidad esta semana.</p>
        <div class="card">
            <label>Mi área principal de impacto (donde quiero ser conocido y generar resultados):</label>
            <input type="text" id="area" placeholder="Ej: Liderazgo, ventas, contenido, producto...">
            <label>La ÚNICA cosa que, si la logro esta semana, hará que el resto sea más fácil o irrelevante:</label>
            <input type="text" id="main" placeholder="Tu main thing de la semana">
            <label>Tres resultados de calidad (PQO) que debo lograr esta semana:</label>
            <textarea id="pqo" placeholder="1. ... 2. ... 3. ..." rows="4"></textarea>
        </div>
        <button class="btn" onclick="setPQO()">Fijar mi PQO</button>
        <div id="result" class="result-area"></div>
        <script>
            function setPQO() {
                const area = document.getElementById('area').value || "—";
                const main = document.getElementById('main').value || "—";
                const pqo = document.getElementById('pqo').value || "—";
                document.getElementById('result').innerHTML = `
                    <h3>📊 Mi plan PQO</h3>
                    <p><strong>Área principal:</strong> ${area}</p>
                    <p><strong>Main thing esta semana:</strong> ${main}</p>
                    <p><strong>Tres resultados de calidad:</strong></p>
                    <p>${pqo.replace(/\\n/g, '<br>')}</p>
                    <p><em>Todo lo que no sirva a esto se pospone o se dice no. The main thing is to keep the main thing the main thing.</em></p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "06_desarrollador_influencia.html",
        "title": "Desarrollador de influencia",
        "content": """
        <p class="subtitle">Una acción concreta para fortalecer tu influencia con alguien clave.</p>
        <div class="card">
            <label>Persona clave con la que quiero fortalecer la relación (jefe, cliente, colega, familiar):</label>
            <input type="text" id="person" placeholder="Nombre o rol">
            <label>¿Qué podría hacer esta semana para valorarla o ayudarla sin pedir nada a cambio?</label>
            <textarea id="action" placeholder="Ej: Reconocer su trabajo en público, enviar un recurso útil, escuchar su idea..."></textarea>
        </div>
        <button class="btn" onclick="planInfluence()">Planear mi acción</button>
        <div id="result" class="result-area"></div>
        <script>
            function planInfluence() {
                const person = document.getElementById('person').value || "—";
                const action = document.getElementById('action').value || "—";
                document.getElementById('result').innerHTML = `
                    <h3>🤝 Plan de influencia</h3>
                    <p><strong>Persona:</strong> ${person}</p>
                    <p><strong>Acción que haré:</strong> ${action}</p>
                    <p><em>La influencia crece cuando el otro siente que gana algo al estar cerca de ti. Cumple esta acción esta semana.</em></p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "07_demostrador_coraje.html",
        "title": "Demostrador de coraje",
        "content": """
        <p class="subtitle">¿Qué harías hoy si no tuvieras miedo?</p>
        <div class="card">
            <label>Una conversación o acción que estás evitando por miedo (rechazo, fracaso, juicio):</label>
            <textarea id="avoid" placeholder="Ej: Pedir un aumento, dar feedback a un compañero, lanzar un proyecto..."></textarea>
            <label>Si no tuvieras miedo, ¿qué harías exactamente? (acción concreta y fecha):</label>
            <input type="text" id="action" placeholder="Ej: Mañana a las 10 le escribo a X para...">
        </div>
        <button class="btn" onclick="commitCourage()">Comprometerme a actuar</button>
        <div id="result" class="result-area"></div>
        <script>
            function commitCourage() {
                const avoid = document.getElementById('avoid').value || "—";
                const action = document.getElementById('action').value || "—";
                document.getElementById('result').innerHTML = `
                    <h3>🦁 Compromiso de coraje</h3>
                    <p><strong>Lo que evito:</strong> ${avoid}</p>
                    <p><strong>Mi acción comprometida:</strong> ${action}</p>
                    <p><em>El coraje no es la ausencia de miedo; es actuar a pesar del miedo. Programa esta acción en tu agenda ahora.</em></p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "08_planificador_habitos.html",
        "title": "Planificador de hábitos deliberados",
        "content": """
        <p class="subtitle">Elige un hábito HP6 para trabajar esta semana y planifica cuándo lo practicarás.</p>
        <div class="card">
            <label>Hábito que voy a priorizar esta semana:</label>
            <select id="habit">
                <option value="Claridad">Claridad</option>
                <option value="Energía">Energía</option>
                <option value="Necesidad">Necesidad</option>
                <option value="Productividad">Productividad</option>
                <option value="Influencia">Influencia</option>
                <option value="Coraje">Coraje</option>
            </select>
            <label>¿Qué práctica concreta haré? (ej. 10 min de diario de claridad cada mañana):</label>
            <textarea id="practice" placeholder="Describe la práctica y la frecuencia"></textarea>
            <label>¿Cuándo y dónde? (día, hora, lugar):</label>
            <input type="text" id="when" placeholder="Ej: Lunes a viernes 7:00, en mi escritorio">
        </div>
        <button class="btn" onclick="savePlan()">Guardar mi plan</button>
        <div id="result" class="result-area"></div>
        <script>
            function savePlan() {
                const habit = document.getElementById('habit').value;
                const practice = document.getElementById('practice').value || "—";
                const when = document.getElementById('when').value || "—";
                document.getElementById('result').innerHTML = `
                    <h3>📅 Plan de hábito deliberado</h3>
                    <p><strong>Hábito:</strong> ${habit}</p>
                    <p><strong>Práctica:</strong> ${practice}</p>
                    <p><strong>Cuándo y dónde:</strong> ${when}</p>
                    <p><em>Los hábitos deliberados requieren atención consciente. Pon una alarma o bloquea el tiempo en tu calendario.</em></p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "09_detector_trampas.html",
        "title": "Detector de trampas",
        "content": """
        <p class="subtitle">¿Estás cayendo en alguna de las tres trampas?</p>
        <div id="quiz"></div>
        <button class="btn" onclick="detectTraps()">Analizar</button>
        <div id="result" class="result-area"></div>
        <script>
            const traps = [
                { name: "Ego", q: "¿Crees que ya lo tienes todo resuelto y evitas feedback o aprendizaje nuevo?" },
                { name: "Éxito a cualquier costo", q: "¿Estás sacrificando salud, sueño o relaciones por el trabajo?" },
                { name: "Comodidad", q: "¿Evitas proyectos o retos nuevos porque 'las cosas ya van bien'?" }
            ];
            const quizDiv = document.getElementById('quiz');
            traps.forEach((t, i) => {
                quizDiv.innerHTML += `<div class="card">
                    <p>${t.q}</p>
                    <select id="t${i}">
                        <option value="0">No / Casi nunca</option>
                        <option value="1">A veces</option>
                        <option value="2">Sí / Frecuentemente</option>
                    </select>
                </div>`;
            });
            function detectTraps() {
                let msg = "<h3>⚠️ Resultado del detector de trampas</h3>";
                let found = [];
                traps.forEach((t, i) => {
                    let v = parseInt(document.getElementById('t'+i).value);
                    if (v >= 1) found.push(t.name);
                });
                if (found.length === 0) {
                    msg += "<p>No detectamos señales fuertes de las tres trampas. Sigue con humildad, equilibrio y disposición a desafiarte.</p>";
                } else {
                    msg += "<p><strong>Posibles trampas:</strong> " + found.join(", ") + "</p>";
                    msg += "<p><em>Recomendación: La certeza es enemiga del crecimiento. Revisa si estás cerrado al aprendizaje, descuidando bienestar o evitando nuevos retos.</em></p>";
                }
                document.getElementById('result').innerHTML = msg;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "10_priorizador_main_thing.html",
        "title": "Priorizador: la cosa más importante",
        "content": """
        <p class="subtitle">The main thing is to keep the main thing the main thing.</p>
        <div class="card">
            <label>¿Cuál es la ÚNICA cosa que, si la logras hoy (o esta semana), hará que el resto sea más fácil o irrelevante?</label>
            <textarea id="main" placeholder="Sé específico"></textarea>
            <label>¿Qué vas a decir "no" o posponer para proteger esta cosa?</label>
            <textarea id="no" placeholder="Lista de distracciones o tareas que no son lo principal"></textarea>
        </div>
        <button class="btn" onclick="setMainThing()">Fijar mi main thing</button>
        <div id="result" class="result-area"></div>
        <script>
            function setMainThing() {
                const main = document.getElementById('main').value || "—";
                const no = document.getElementById('no').value || "—";
                document.getElementById('result').innerHTML = `
                    <h3>🎯 Mi main thing</h3>
                    <p><strong>La cosa más importante:</strong> ${main}</p>
                    <p><strong>Voy a decir no o posponer:</strong></p>
                    <p>${no.replace(/\\n/g, '<br>')}</p>
                    <p><em>Diseña tu día/semana alrededor de tu main thing. Todo lo demás sirve a esto o espera.</em></p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "11_simulador_alto_rendimiento.html",
        "title": "Simulador de alto rendimiento",
        "content": """
        <p class="subtitle">Simula una situación donde debes desplegar los HP6.</p>
        <div class="card">
            <label>Describe una situación próxima que importe (reunión, presentación, conversación difícil, proyecto nuevo):</label>
            <textarea id="situation" placeholder="Ej: Reunión con mi jefe para pedir un nuevo rol..."></textarea>
            <p>Para esta situación, ¿cómo aplicarías cada hábito?</p>
            <p><strong>Claridad:</strong> ¿Qué quieres lograr y qué sentimiento buscas?</p>
            <input type="text" id="c" placeholder="Breve">
            <p><strong>Energía:</strong> ¿Cómo te prepararás (descanso, movimiento, estado de ánimo)?</p>
            <input type="text" id="e" placeholder="Breve">
            <p><strong>Necesidad:</strong> ¿Quién depende de que rindas bien aquí?</p>
            <input type="text" id="n" placeholder="Breve">
            <p><strong>Productividad:</strong> ¿Cuál es el resultado de calidad que debes lograr?</p>
            <input type="text" id="p" placeholder="Breve">
            <p><strong>Influencia:</strong> ¿Cómo harás que la otra persona se sienta valorada?</p>
            <input type="text" id="i" placeholder="Breve">
            <p><strong>Coraje:</strong> ¿Qué dirás o harás que te da miedo pero es necesario?</p>
            <input type="text" id="co" placeholder="Breve">
        </div>
        <button class="btn" onclick="simulate()">Ver mi plan HP6</button>
        <div id="result" class="result-area"></div>
        <script>
            function simulate() {
                const sit = document.getElementById('situation').value || "—";
                const labels = ["Claridad", "Energía", "Necesidad", "Productividad", "Influencia", "Coraje"];
                const ids = ["c", "e", "n", "p", "i", "co"];
                let list = "<ul>";
                labels.forEach((l, i) => {
                    let v = document.getElementById(ids[i]).value || "—";
                    list += `<li><strong>${l}:</strong> ${v}</li>`;
                });
                list += "</ul>";
                document.getElementById('result').innerHTML = `
                    <h3>🔄 Plan HP6 para tu situación</h3>
                    <p><strong>Situación:</strong> ${sit}</p>
                    ${list}
                    <p><em>Usa este plan como checklist antes de entrar en la situación. Los HP6 son tu sistema operativo.</em></p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "12_maestro_alto_rendimiento.html",
        "title": "Maestro de alto rendimiento",
        "content": """
        <p class="subtitle">Quiz final sobre los HP6.</p>
        <div id="quiz-container"></div>
        <div id="score-area" class="result-area" style="text-align: center;"></div>
        <script>
            const quizData = [
                { q: "¿Qué son los HP6?", a: ["Seis tipos de personalidad", "Seis hábitos deliberados que distinguen a los high performers", "Seis fortalezas innatas"], correct: 1 },
                { q: "¿Cuál es el primer hábito?", a: ["Generar energía", "Buscar claridad", "Aumentar productividad"], correct: 1 },
                { q: "¿Qué significa PQO?", a: ["Plan Quincenal de Objetivos", "Prolific Quality Output (output prolífico de calidad)", "Productividad Quick Option"], correct: 1 },
                { q: "¿Por qué las fortalezas solas no bastan?", a: ["Porque son innatas", "Porque llegar a la cima requiere ir más allá de lo natural y desplegar los HP6", "Porque hay que enfocarse solo en debilidades"], correct: 1 },
                { q: "¿Qué es 'the main thing'?", a: ["La primera tarea del día", "La cosa más importante que debes mantener como prioridad", "El jefe"], correct: 1 }
            ];
            function loadQuiz() {
                const container = document.getElementById('quiz-container');
                let html = '';
                quizData.forEach((item, index) => {
                    html += `<div class="card">
                        <p><strong>${index + 1}. ${item.q}</strong></p>
                        ${item.a.map((opt, i) => `<button class="btn" style="background:#f0f0f0; color:#333; width:100%; text-align:left; margin:5px 0;" onclick="checkAnswer(this, ${index}, ${i})">${opt}</button>`).join('')}
                    </div>`;
                });
                container.innerHTML = html;
            }
            let answered = 0;
            let score = 0;
            function checkAnswer(btn, qIndex, aIndex) {
                if (btn.parentElement.classList.contains('answered')) return;
                btn.parentElement.classList.add('answered');
                answered++;
                if (aIndex === quizData[qIndex].correct) {
                    btn.style.background = '#1abc9c';
                    btn.style.color = 'white';
                    score++;
                } else {
                    btn.style.background = '#e74c3c';
                    btn.style.color = 'white';
                }
                if (answered === quizData.length) {
                    document.getElementById('score-area').innerHTML = `
                        <h3>Resultado: ${score}/${quizData.length}</h3>
                        <p>${score === quizData.length ? '¡Eres un maestro de los HP6! Sigue aplicando los hábitos con intención.' : 'Sigue repasando los seis hábitos y practicando con los juegos.'}</p>
                    `;
                    document.getElementById('score-area').style.display = 'block';
                }
            }
            loadQuiz();
        </script>
        """
    },
]

for game in games:
    html = f"""<!DOCTYPE html>
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
        f.write(html)

print("✅ 12 juegos creados para el libro 053 (High Performance Habits).")
