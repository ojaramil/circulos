import os

games_data = {
    "01_esencial_vs_ruido.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>¿Esencial o Ruido?</title>
    <style>
        body { font-family: 'Helvetica Neue', sans-serif; background: #222; color: #eee; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .card { background: #333; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width: 500px; width: 90%; }
        h1 { font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 40px; }
        .item { font-size: 1.8em; margin-bottom: 40px; font-weight: bold; min-height: 60px; }
        .buttons { display: flex; gap: 20px; justify-content: center; }
        button { padding: 15px 40px; font-size: 1.2em; border: 2px solid #fff; background: transparent; color: white; cursor: pointer; transition: 0.2s; border-radius: 50px; }
        button:hover { background: white; color: #222; }
        .essential-btn { border-color: #4CAF50; color: #4CAF50; }
        .essential-btn:hover { background: #4CAF50; color: white; }
        .noise-btn { border-color: #F44336; color: #F44336; }
        .noise-btn:hover { background: #F44336; color: white; }
        #feedback { margin-top: 20px; height: 30px; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Discriminador</h1>
        <div id="game-area">
            <div class="item" id="item-text"></div>
            <div class="buttons">
                <button class="noise-btn" onclick="guess('ruido')">Ruido</button>
                <button class="essential-btn" onclick="guess('esencial')">Esencial</button>
            </div>
            <div id="feedback"></div>
        </div>
        <div id="end" style="display:none">
            <h2>Fin de la sesión</h2>
            <p>Recuerda: Si no es un SÍ absoluto, es un NO.</p>
            <button onclick="location.reload()">Reiniciar</button>
        </div>
    </div>

    <script>
        const items = [
            { text: "Revisar email cada 5 minutos", type: "ruido" },
            { text: "Dormir 8 horas", type: "esencial" },
            { text: "Decir sí a todo para agradar", type: "ruido" },
            { text: "Tiempo para pensar a solas", type: "esencial" },
            { text: "Comprar un auto de lujo innecesario", type: "ruido" },
            { text: "Pasar tiempo con la familia", type: "esencial" },
            { text: "Reuniones sin agenda", type: "ruido" }
        ];

        let idx = 0;

        function load() {
            if (idx >= items.length) {
                document.getElementById('game-area').style.display = 'none';
                document.getElementById('end').style.display = 'block';
                return;
            }
            document.getElementById('item-text').innerText = items[idx].text;
            document.getElementById('feedback').innerText = "";
        }

        function guess(type) {
            const item = items[idx];
            const feedback = document.getElementById('feedback');
            if (item.type === type) {
                feedback.style.color = "#4CAF50";
                feedback.innerText = "¡Correcto!";
                setTimeout(() => {
                    idx++;
                    load();
                }, 800);
            } else {
                feedback.style.color = "#F44336";
                feedback.innerText = "Error. Piénsalo de nuevo.";
            }
        }
        load();
    </script>
</body>
</html>""",

    "02_regla_90.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>La Regla del 90%</title>
    <style>
        body { font-family: 'Helvetica Neue', sans-serif; background: #fffcf5; color: #333; text-align: center; padding: 40px; }
        .container { max-width: 600px; margin: 0 auto; }
        input[type=range] { width: 100%; margin: 30px 0; }
        .score-display { font-size: 3em; font-weight: bold; color: #333; }
        .decision { font-size: 2em; margin-top: 20px; font-weight: bold; padding: 20px; border-radius: 10px; transition: 0.3s; }
        .yes { background: #4CAF50; color: white; }
        .no { background: #eee; color: #aaa; text-decoration: line-through; }
        h1 { font-weight: 300; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #333; display: inline-block; padding-bottom: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Evaluador de Opciones</h1>
        <p>Piensa en una oportunidad actual (un proyecto, invitación, compra).</p>
        <p>Evalúala del 0 al 100.</p>
        
        <input type="range" id="slider" min="0" max="100" value="50" oninput="update()">
        
        <div class="score-display" id="val">50</div>
        
        <div class="decision" id="decision">NO</div>
        
        <p style="margin-top: 40px; font-style: italic;">"Si no es un 90 o más, es un 0."</p>
    </div>

    <script>
        function update() {
            const val = document.getElementById('slider').value;
            document.getElementById('val').innerText = val;
            const dec = document.getElementById('decision');
            
            if (val >= 90) {
                dec.innerText = "SÍ ESENCIAL";
                dec.className = "decision yes";
            } else {
                dec.innerText = "NO (Eliminar)";
                dec.className = "decision no";
            }
        }
        update();
    </script>
</body>
</html>""",

    "03_arte_decir_no.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Entrenador de "No" 🚫</title>
    <style>
        body { font-family: 'Helvetica Neue', sans-serif; background: #333; color: white; padding: 20px; display: flex; justify-content: center; }
        .chat-container { width: 100%; max-width: 500px; background: #444; border-radius: 15px; overflow: hidden; display: flex; flex-direction: column; height: 80vh; }
        .header { background: #222; padding: 15px; text-align: center; font-weight: bold; letter-spacing: 1px; }
        .messages { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; }
        .msg { padding: 10px 15px; border-radius: 15px; max-width: 80%; }
        .incoming { background: #555; align-self: flex-start; border-bottom-left-radius: 2px; }
        .outgoing { background: #795548; align-self: flex-end; border-bottom-right-radius: 2px; }
        .options { padding: 15px; background: #222; display: flex; flex-direction: column; gap: 10px; }
        button { padding: 12px; background: #5D4037; border: none; color: white; border-radius: 8px; cursor: pointer; text-align: left; transition: 0.2s; }
        button:hover { background: #4E342E; }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="header">Simulador de Rechazo Elegante</div>
        <div class="messages" id="msgs">
            <div class="msg incoming">Oye, necesito que te encargues de organizar la fiesta de fin de año de la oficina. Sé que estás ocupado, ¡pero eres el mejor en esto!</div>
        </div>
        <div class="options" id="opts">
            <button onclick="reply(0)">¡Claro! Veré cómo hago tiempo. (Ceder)</button>
            <button onclick="reply(1)">No puedo, estoy muy ocupado. (Brusco)</button>
            <button onclick="reply(2)">Me siento halagado de que pensaras en mí, pero dada mi carga de trabajo actual, no podría darle la dedicación que merece. Tengo que declinar. (Elegante)</button>
        </div>
    </div>

    <script>
        function reply(option) {
            const msgs = document.getElementById('msgs');
            const opts = document.getElementById('opts');
            
            let text = "";
            let feedback = "";
            let color = "";

            if (option === 0) {
                text = "¡Claro! Veré cómo hago tiempo.";
                feedback = "❌ Error: Has sacrificado tu esencial por lo trivial de otro.";
                color = "#FFCDD2";
            } else if (option === 1) {
                text = "No puedo, estoy muy ocupado.";
                feedback = "⚠️ Regular: Es un 'no', pero puede dañar la relación.";
                color = "#FFF9C4";
            } else {
                text = "Me siento halagado de que pensaras en mí, pero dada mi carga de trabajo actual, no podría darle la dedicación que merece. Tengo que declinar.";
                feedback = "✅ Perfecto: Un 'no' elegante que respeta tu tiempo y a la otra persona.";
                color = "#C8E6C9";
            }

            msgs.innerHTML += `<div class="msg outgoing">${text}</div>`;
            setTimeout(() => {
                msgs.innerHTML += `<div style="background:${color}; color:#333; padding:10px; border-radius:5px; text-align:center; font-size:0.9em; margin-top:10px;">${feedback}</div>`;
                if(option === 2) {
                    opts.innerHTML = '<button onclick="location.reload()" style="text-align:center">Volver a intentar</button>';
                }
                msgs.scrollTop = msgs.scrollHeight;
            }, 500);
        }
    </script>
</body>
</html>"""
}

# Create directory
output_dir = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/055/juegos"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Write files
for filename, content in games_data.items():
    filepath = os.path.join(output_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Creado: {filename}")
