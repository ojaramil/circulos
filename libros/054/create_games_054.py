import os

games_data = {
    "01_inbox_zero.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Simulador Inbox Zero 📥</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #f5f7fa; display: flex; flex-direction: column; align-items: center; padding: 20px; }
        .game-container { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); max-width: 600px; width: 100%; text-align: center; }
        .inbox-item { background: #34495E; color: white; padding: 20px; margin: 20px 0; border-radius: 10px; font-size: 1.2em; min-height: 60px; display: flex; align-items: center; justify-content: center; }
        .buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; }
        button { padding: 15px; border: none; border-radius: 8px; cursor: pointer; font-size: 1em; transition: 0.2s; color: white; }
        .btn-do { background: #2ECC71; } 
        .btn-defer { background: #F39C12; }
        .btn-delegate { background: #9B59B6; }
        .btn-delete { background: #E74C3C; }
        button:hover { opacity: 0.9; transform: translateY(-2px); }
        .score-board { margin-bottom: 20px; font-weight: bold; color: #2C3E50; }
        .feedback { margin-top: 15px; font-weight: bold; min-height: 24px; }
    </style>
</head>
<body>
    <div class="game-container">
        <h1>📥 Inbox Zero Challenge</h1>
        <p>Decide qué hacer con cada ítem según GTD.</p>
        <div class="score-board">Bandeja de Entrada: <span id="count">5</span> | Puntuación: <span id="score">0</span></div>
        
        <div id="game-area">
            <div class="inbox-item" id="current-item">Cargando...</div>
            <div class="buttons">
                <button class="btn-do" onclick="process('do')">Hacer (< 2 min)</button>
                <button class="btn-delegate" onclick="process('delegate')">Delegar</button>
                <button class="btn-defer" onclick="process('defer')">Diferir (> 2 min)</button>
                <button class="btn-delete" onclick="process('delete')">Eliminar/Archivar</button>
            </div>
            <div class="feedback" id="feedback"></div>
        </div>
        <div id="result" style="display:none">
            <h2>¡Bandeja Vacía! 🎉</h2>
            <p>Has procesado todo tu inbox.</p>
            <button onclick="location.reload()" style="background:#3498DB; width:100%">Jugar de nuevo</button>
        </div>
    </div>

    <script>
        const items = [
            { text: "Spam de tarjeta de crédito", type: "delete", reason: "Es basura." },
            { text: "Responder email rápido de confirmación", type: "do", reason: "Tarda menos de 2 minutos." },
            { text: "Preparar presentación anual (1 hora)", type: "defer", reason: "Es un proyecto/tarea larga. Va a la lista de tareas." },
            { text: "Pedir a Juan el reporte mensual", type: "delegate", reason: "Es responsabilidad de Juan. Va a 'En Espera'." },
            { text: "Leer artículo interesante pero no urgente", type: "defer", reason: "Va a 'Algún día / Tal vez' o lista de lectura." },
            { text: "Pagar factura de luz online (1 min)", type: "do", reason: "Regla de los 2 minutos." }
        ];

        let currentIndex = 0;
        let score = 0;

        function loadItem() {
            if (currentIndex >= items.length) {
                document.getElementById('game-area').style.display = 'none';
                document.getElementById('result').style.display = 'block';
                return;
            }
            document.getElementById('current-item').innerText = items[currentIndex].text;
            document.getElementById('count').innerText = items.length - currentIndex;
            document.getElementById('feedback').innerText = "";
        }

        function process(action) {
            const item = items[currentIndex];
            const feedback = document.getElementById('feedback');
            
            if (item.type === action) {
                score += 10;
                feedback.style.color = "green";
                feedback.innerText = "¡Correcto! " + item.reason;
            } else {
                score -= 5;
                feedback.style.color = "red";
                feedback.innerText = "Incorrecto. " + item.reason;
            }
            
            document.getElementById('score').innerText = score;
            currentIndex++;
            setTimeout(loadItem, 1500);
        }

        loadItem();
    </script>
</body>
</html>""",

    "02_regla_2_minutos.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Regla de los 2 Minutos ⏱️</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #2C3E50; color: white; text-align: center; padding: 40px; }
        .card { background: #ECF0F1; color: #2C3E50; max-width: 500px; margin: 0 auto; padding: 40px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        h1 { color: #E74C3C; }
        .task { font-size: 1.5em; margin: 30px 0; font-weight: bold; }
        .controls { display: flex; justify-content: center; gap: 20px; }
        button { padding: 15px 30px; font-size: 1.2em; border: none; border-radius: 50px; cursor: pointer; transition: 0.3s; }
        .btn-now { background: #2ECC71; color: white; }
        .btn-later { background: #3498DB; color: white; }
        button:hover { transform: scale(1.1); }
    </style>
</head>
<body>
    <div class="card">
        <h1>⏱️ ¿2 Minutos o Más?</h1>
        <p>¿Hacerlo YA o ponerlo en la lista?</p>
        
        <div id="game">
            <div class="task" id="task-text">Cargando...</div>
            <div class="controls">
                <button class="btn-now" onclick="check(true)">¡Hacer AHORA!</button>
                <button class="btn-later" onclick="check(false)">Planificar</button>
            </div>
            <p id="msg" style="margin-top:20px; height:20px;"></p>
        </div>
    </div>

    <script>
        const tasks = [
            { text: "Enviar ese archivo adjunto", now: true },
            { text: "Escribir un libro", now: false },
            { text: "Llamar para confirmar cita", now: true },
            { text: "Diseñar la web completa", now: false },
            { text: "Regar la planta", now: true },
            { text: "Aprender alemán", now: false }
        ];
        
        let idx = 0;

        function load() {
            if (idx >= tasks.length) {
                document.getElementById('game').innerHTML = "<h2>¡Terminado!</h2><p>Has dominado la regla de oro de la productividad instantánea.</p><button class='btn-later' onclick='location.reload()'>Reiniciar</button>";
                return;
            }
            document.getElementById('task-text').innerText = tasks[idx].text;
            document.getElementById('msg').innerText = "";
        }

        function check(chosenNow) {
            const correct = tasks[idx].now === chosenNow;
            const msg = document.getElementById('msg');
            
            if (correct) {
                msg.style.color = "green";
                msg.innerText = "¡Bien! " + (tasks[idx].now ? "Es rápido, hazlo ya." : "Eso toma tiempo, planifícalo.");
                setTimeout(() => {
                    idx++;
                    load();
                }, 1000);
            } else {
                msg.style.color = "red";
                msg.innerText = "¡Ups! " + (tasks[idx].now ? "Esto es rápido, no lo pospongas." : "Esto es muy largo para hacerlo ahora.");
            }
        }

        load();
    </script>
</body>
</html>""",

    "03_organizador_tareas.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>El Organizador GTD 🗂️</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #DAE4E8; padding: 20px; }
        .container { max-width: 900px; margin: 0 auto; }
        h1 { text-align: center; color: #2C3E50; }
        .lists-container { display: flex; justify-content: space-between; gap: 10px; margin-top: 30px; }
        .list { background: white; flex: 1; min-height: 300px; padding: 10px; border-radius: 8px; border-top: 5px solid #ccc; }
        .list h3 { text-align: center; margin-top: 0; }
        
        #inbox { border-color: #34495E; }
        #projects { border-color: #E67E22; }
        #next-actions { border-color: #2ECC71; }
        #waiting { border-color: #F1C40F; }
        #someday { border-color: #95A5A6; }

        .card { background: #ECF0F1; padding: 10px; margin: 10px 0; border-radius: 4px; border: 1px solid #BDC3C7; cursor: move; }
        .card:hover { background: #D6DBDF; }

        .success-msg { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: #27AE60; color: white; padding: 15px 30px; border-radius: 30px; display: none; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
    </style>
</head>
<body>
    <div class="container">
        <h1>🗂️ Organiza tu Mundo</h1>
        <p style="text-align:center">Arrastra las tareas de la BANDEJA DE ENTRADA a la lista correcta.</p>

        <div class="lists-container">
            <div class="list" id="inbox-list" ondrop="drop(event)" ondragover="allowDrop(event)">
                <h3>📥 Bandeja Entrada</h3>
                <div class="card" draggable="true" ondragstart="drag(event)" id="t1" data-target="projects">Planear vacaciones a Italia</div>
                <div class="card" draggable="true" ondragstart="drag(event)" id="t2" data-target="next-actions">Comprar leche</div>
                <div class="card" draggable="true" ondragstart="drag(event)" id="t3" data-target="waiting">Esperar respuesta de cliente</div>
                <div class="card" draggable="true" ondragstart="drag(event)" id="t4" data-target="someday">Aprender a tocar piano</div>
                <div class="card" draggable="true" ondragstart="drag(event)" id="t5" data-target="projects">Rediseñar jardín</div>
                <div class="card" draggable="true" ondragstart="drag(event)" id="t6" data-target="next-actions">Llamar a mamá</div>
            </div>
            
            <div class="list" id="projects" ondrop="drop(event)" ondragover="allowDrop(event)">
                <h3>Proyectos</h3>
            </div>
            <div class="list" id="next-actions" ondrop="drop(event)" ondragover="allowDrop(event)">
                <h3>Próximas Acciones</h3>
            </div>
            <div class="list" id="waiting" ondrop="drop(event)" ondragover="allowDrop(event)">
                <h3>En Espera</h3>
            </div>
            <div class="list" id="someday" ondrop="drop(event)" ondragover="allowDrop(event)">
                <h3>Algún día</h3>
            </div>
        </div>
    </div>
    <div id="success" class="success-msg">🎉 ¡Organización Perfecta!</div>

    <script>
        function allowDrop(ev) {
            ev.preventDefault();
        }

        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }

        function drop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            var element = document.getElementById(data);
            var targetList = ev.target.closest('.list');
            
            if (targetList && targetList.id !== 'inbox-list') {
                if (targetList.id === element.dataset.target) {
                    targetList.appendChild(element);
                    element.style.borderColor = "green";
                    element.style.background = "#D5F5E3";
                    checkWin();
                } else {
                    alert("¡Esa no es la lista correcta! Piénsalo bien.");
                }
            }
        }

        function checkWin() {
            const inbox = document.getElementById('inbox-list');
            if (inbox.children.length === 1) { // Only H3 remains
                document.getElementById('success').style.display = 'block';
            }
        }
    </script>
</body>
</html>""",

     "04_revision_semanal.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Checklist Revisión Semanal ✅</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #FFF9E6; color: #5D4037; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        h1 { text-align: center; color: #F39C12; border-bottom: 2px solid #F39C12; padding-bottom: 15px; }
        .item { display: flex; align-items: center; margin: 15px 0; padding: 15px; background: #FFF3E0; border-radius: 8px; transition: 0.3s; cursor: pointer; }
        .item:hover { background: #FFE0B2; }
        .item.checked { background: #E8F5E9; text-decoration: line-through; color: #888; }
        .checkbox { width: 25px; height: 25px; border: 2px solid #F39C12; border-radius: 50%; margin-right: 15px; display: flex; align-items: center; justify-content: center; background: white; }
        .checked .checkbox { background: #4CAF50; border-color: #4CAF50; color: white; }
        .progress-bar { height: 10px; background: #eee; border-radius: 5px; margin-top: 30px; overflow: hidden; }
        .fill { height: 100%; background: #2ECC71; width: 0%; transition: 0.5s; }
    </style>
</head>
<body>
    <div class="container">
        <h1>✅ Tu Revisión Semanal</h1>
        <p>Marca cada paso a medida que "limpias" tu mente:</p>

        <div class="item" onclick="toggle(this)">
            <div class="checkbox"></div> Vaciar la cabeza (braindump)
        </div>
        <div class="item" onclick="toggle(this)">
            <div class="checkbox"></div> Procesar bandeja de entrada física
        </div>
        <div class="item" onclick="toggle(this)">
            <div class="checkbox"></div> Procesar Email a cero
        </div>
        <div class="item" onclick="toggle(this)">
            <div class="checkbox"></div> Revisar calendario (pasado y futuro)
        </div>
        <div class="item" onclick="toggle(this)">
            <div class="checkbox"></div> Revisar lista "En Espera"
        </div>
        <div class="item" onclick="toggle(this)">
            <div class="checkbox"></div> Revisar lista de "Proyectos" (¿activos?)
        </div>
        <div class="item" onclick="toggle(this)">
            <div class="checkbox"></div> Revisar "Algún día / Tal vez"
        </div>

        <div class="progress-bar"><div class="fill" id="fill"></div></div>
        <p style="text-align:center; font-weight:bold" id="msg"></p>
    </div>

    <script>
        function toggle(el) {
            el.classList.toggle('checked');
            if(el.classList.contains('checked')){
                el.querySelector('.checkbox').innerHTML = '✓';
            } else {
                el.querySelector('.checkbox').innerHTML = '';
            }
            updateProgress();
        }

        function updateProgress() {
            const total = document.querySelectorAll('.item').length;
            const checked = document.querySelectorAll('.item.checked').length;
            const pct = (checked / total) * 100;
            document.getElementById('fill').style.width = pct + "%";
            
            if (pct === 100) {
                document.getElementById('msg').innerText = "¡Mente clara como el agua! Listo para la semana.";
                document.getElementById('msg').style.color = "#27AE60";
            } else {
                document.getElementById('msg').innerText = checked + " de " + total + " completados";
            }
        }
    </script>
</body>
</html>"""
}

# Create directory
output_dir = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/054/juegos"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Write files
for filename, content in games_data.items():
    filepath = os.path.join(output_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Creado: {filename}")
