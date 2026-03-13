import os

# Define the lessons data for Esencialismo (055) with deep content
lessons_data = {
    "01_introduccion.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Introducción al Esencialismo</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; font-size: 2.5em; }
        h2 { color: #82aaff; margin-top: 30px; }
        .quote { font-style: italic; color: #82aaff; text-align: center; font-size: 1.3em; margin: 40px 0; padding: 20px; border-top: 1px solid #34495E; border-bottom: 1px solid #34495E; }
        .highlight { background-color: #142b47; padding: 25px; border-left: 5px solid #FF6B35; margin: 30px 0; border-radius: 0 10px 10px 0; }
        strong { color: #fff; }
    </style>
</head>
<body>
    <h1>Esencialismo: Menos, pero mejor</h1>
    <p>El esencialismo no trata de cómo hacer más cosas; trata de cómo hacer las cosas <strong>correctas</strong>. No es una estrategia de gestión del tiempo o una técnica de productividad. Es una <strong>disciplina</strong> que aplicas cada vez que tienes que tomar una decisión.</p>
    
    <div class="quote">
        "Si no priorizas tu vida, alguien más lo hará por ti."
    </div>

    <h2>¿Qué es un Esencialista?</h2>
    <p>El esencialista rechaza la idea de que podemos "hacerlo todo". En lugar de avanzar un milímetro en un millón de direcciones, el esencialista elige avanzar un metro en unas pocas direcciones vitales.</p>

    <div class="highlight">
        <h3>La paradoja del éxito</h3>
        <p>A medida que tenemos más éxito, se nos abren más opciones y oportunidades. Esto se convierte en un distractor que nos aleja de lo que nos hizo exitosos en primer lugar. El éxito puede ser un catalizador del fracaso si no aplicamos el filtro del esencialismo.</p>
    </div>

    <p>En este módulo, aprenderás a distinguir lo "vital pocos" de lo "trivial muchos" y a recuperar el control de tus propias elecciones.</p>
</body>
</html>""",

    "02_elegir.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elegir: El Poder de la Elección</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; }
        h2 { color: #82aaff; }
        .concept-box { background: #1a3350; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #82aaff; }
        .accent { color: #FF6B35; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Elegir: El Poder Invencible</h1>
    <p>A menudo olvidamos que tenemos la capacidad de elegir. Hablamos como si no tuviéramos opción: "Tengo que hacer esto", "Debo ir a esa reunión". El primer paso para ser un esencialista es recuperar la conciencia de nuestra <strong>capacidad de elegir</strong>.</p>

    <div class="concept-box">
        <h3>La elección es una acción, no una cosa</h3>
        <p>Aunque las opciones pueden ser limitadas, nuestra capacidad de elegir siempre existe. Cuando renunciamos a nuestro derecho de elegir, estamos entregando nuestro poder a otros — ya sean jefes, colegas o las expectativas sociales.</p>
    </div>

    <h2>Indefensión Aprendida</h2>
    <p>Investigaciones muestran que cuando a los seres humanos se les quita la elección repetidamente, dejan de intentar elegir incluso cuando la oportunidad vuelve a presentarse. Los "no esencialistas" sufren de esta indefensión, sintiendo que están a merced de sus agendas.</p>

    <p>Para el esencialista, <span class="accent">"Elegir es un privilegio"</span>. Cada vez que dices "puedo elegir", refuerzas tu soberanía personal.</p>
</body>
</html>""",

    "03_discernir.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discernir lo Vital de lo Trivial</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
        .item { padding: 15px; border-radius: 8px; background: #142b47; }
        .item-head { font-weight: bold; color: #FF6B35; margin-bottom: 10px; }
    </style>
</head>
<body>
    <h1>Discernir: Lo Trivial vs. Lo Vital</h1>
    <p>Vivimos en un mundo que premia el "hacer mucho", pero la realidad es que casi todo es ruido. Solo unas pocas cosas tienen un valor real.</p>

    <h2>La Regla de Pareto (80/20) al Extremo</h2>
    <p>No se trata solo de que el 20% de tus esfuerzos generen el 80% de tus resultados. El esencialista va más allá: cree que el 99% de las actividades son triviales, y solo el 1% es realmente vital.</p>

    <div class="grid">
        <div class="item">
            <div class="item-head">El No Esencialista piensa...</div>
            Casi todo es importante. Siente que todas las oportunidades valen la pena explorarse por igual.
        </div>
        <div class="item">
            <div class="item-head">El Esencialista piensa...</div>
            Casi nada es importante. Se toma el tiempo para discernir las pocas cosas que realmente marcarán la diferencia.
        </div>
    </div>

    <h2>¿Cómo discernir?</h2>
    <p>Requiere espacio mental. Si tu vida está llena al 100%, no tienes margen para observar y ver qué es lo que realmente importa. El discernimiento requiere <strong>pausa</strong>.</p>
</body>
</html>""",

    "04_trade_off.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trade-off: El Dilema de la Elección</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; }
        .warning { background: #442b2b; border: 1px solid #ff4b4b; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .accent { color: #82aaff; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Trade-off: ¿Qué problemas quiero?</h1>
    <p>Un "trade-off" es un intercambio: para ganar algo, debo renunciar a otra cosa. El no esencialista intenta evitar esto pensando: "¿Cómo puedo hacer ambas?". El esencialista abraza el intercambio.</p>

    <div class="warning">
        <strong>Peligro:</strong> Cuando intentamos evitar los trade-offs, terminamos haciendo un trabajo mediocre en todo, sin destacar en nada.
    </div>

    <h2>No es "¿Qué tengo que sacrificar?", sino "¿En qué quiero ser grande?"</h2>
    <p>En lugar de ver la renuncia como algo negativo, el esencialista lo ve como una <strong>inversión</strong> estratégica de su recurso más preciado: la energía.</p>

    <p>La pregunta esencial ante un conflicto de prioridades es: <span class="accent">"¿Qué problema quiero resolver?"</span>. Cada elección conlleva un conjunto de problemas; elige los problemas que valgan la pena.</p>
</body>
</html>""",

    "05_escapar.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Escapar: El Espacio para Pensar</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; }
        .box { background: #142b47; padding: 25px; border-radius: 12px; border-top: 4px solid #82aaff; margin: 30px 0; }
    </style>
</head>
<body>
    <h1>Escapar: El Espacio para Explorar</h1>
    <p>Necesitamos espacio para escapar y poder pensar. Newton descubrió la gravedad en un jardín, no en una reunión de comité.</p>

    <div class="box">
        <h3>La paradoja de estar ocupado</h3>
        <p>Estar demasiado ocupado es una forma de pereza intelectual. Es la incapacidad de detenerse a evaluar si lo que estamos haciendo tiene sentido.</p>
    </div>

    <h2>Crear un Santuario de Pensamiento</h2>
    <p>El esencialista crea rutinas para desconectarse de los estímulos externos. Esto incluye:</p>
    <ul>
        <li><strong>Tiempo de lectura:</strong> Dedicar los primeros 20 minutos del día a leer algo que no sea noticias o trabajo.</li>
        <li><strong>Bloques de aburrimiento:</strong> Permitir que la mente divague sin mirar el móvil.</li>
        <li><strong>Retiros de diseño:</strong> Un día a la semana o al mes para revisar la estrategia general de vida.</li>
    </ul>

    <p>Para poder ver el bosque, hay que salir de entre los árboles.</p>
</body>
</html>""",

    "06_dormir.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dormir: Protege el Activo</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; }
        .stat-box { display: flex; align-items: center; background: #1a3350; padding: 15px; border-radius: 10px; margin-bottom: 15px; }
        .stat-num { font-size: 2em; font-weight: bold; color: #FF6B35; margin-right: 20px; }
    </style>
</head>
<body>
    <h1>Dormir: Protegiendo tu Mejor Activo</h1>
    <p>El activo más importante de un esencialista es <strong>él mismo</strong>. Si te quemas, el sistema falla.</p>

    <div class="stat-box">
        <div class="stat-num">1 h</div>
        <div>Una hora extra de sueño puede valer varias horas de productividad concentrada al día siguiente.</div>
    </div>

    <h2>El sueño es para los ganadores</h2>
    <p>Muchos lucen su falta de sueño como una medalla de honor. El esencialista lo ve como una señal de mala gestión personal. El sueño:</p>
    <ul>
        <li>Aumenta la capacidad de discernir lo vital de lo trivial.</li>
        <li>Mejora la memoria y la creatividad radicalmente.</li>
        <li>Nos permite tomar decisiones más precisas y evitar errores costosos.</li>
    </ul>

    <p>Debemos proteger nuestro cerebro con el mismo celo con el que un atleta profesional protege su cuerpo.</p>
</body>
</html>""",

    "07_seleccionar.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seleccionar: La Regla del 90%</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; }
        .rule-box { background: #000; color: #fff; padding: 30px; border-radius: 15px; border: 2px solid #FF6B35; text-align: center; font-size: 1.25em; margin: 30px 0; }
        .accent { color: #FF6B35; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Seleccionar: Criterios Estrictos</h1>
    <p>Si usamos criterios vagos para aceptar tareas u oportunidades, nuestra vida se llenará de cosas de nivel 7 (interesantes pero no vitales). El esencialista solo acepta el nivel 9 y 10.</p>

    <div class="rule-box">
        "Si no es un <span class="accent">'¡SÍ ROTUNDO!'</span>, entonces es un <span class="accent">'NO'</span>."
    </div>

    <h2>La Regla del 90%</h2>
    <p>Evalúa cada opción en una escala del 0 al 100. Si la opción no obtiene al menos un <strong>90</strong>, descártala. Esto evita caer en la trampa de los "síes tibios" que consumen nuestro tiempo.</p>

    <h2>Criterios de Oportunidad</h2>
    <p>Cuando te presenten una oportunidad, define 3 criterios mínimos y 3 criterios ideales. Si no cumple los 3 mínimos, descártala. Si no cumple al menos 2 de los ideales, probablemente también deberías descartarla.</p>
</body>
</html>""",

    "08_decir_no.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Decir No: Con Elegancia y Respeto</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; }
        .technique { background: #142b47; padding: 15px; margin-bottom: 10px; border-radius: 5px; border-left: 3px solid #82aaff; }
        .tech-name { font-weight: bold; color: #82aaff; }
    </style>
</head>
<body>
    <h1>Decir No: El Arte del Rechazo Elegante</h1>
    <p>La diferencia entre las personas exitosas y las personas <em>muy</em> exitosas es que las personas muy exitosas dicen "no" a casi todo.</p>

    <h2>¿Por qué nos cuesta decir No?</h2>
    <p>Por miedo social: no queremos ofender, decepcionar o parecer poco colaborativos. Sin embargo, un "no" valiente suele ganarse el respeto a largo plazo, mientras que un "sí" forzado genera resentimiento.</p>

    <h2>Técnicas del Esencialista</h2>
    <div class="technique"><span class="tech-name">La Pausa de 3 Segundos:</span> Antes de responder, espera. Deja que el silencio trabaje.</div>
    <div class="technique"><span class="tech-name">El "No, pero":</span> "No puedo hacer el informe ahora, pero puedo darte feedback rápido cuando lo termines".</div>
    <div class="technique"><span class="tech-name">Consultar la agenda:</span> "Déjame mirar mi calendario y te confirmo". Esto te da espacio para decidir sin presión.</div>
    <div class="technique"><span class="tech-name">El "No" diplomático:</span> "Me siento honrado de que hayas pensado en mí, pero tengo otros compromisos que me impiden darte el 100% ahora".</div>

    <p>Recuerda: Estás diciendo "no" a una <strong>petición</strong>, no a la <strong>persona</strong>.</p>
</body>
</html>"""
}

# Create directory
output_dir = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/055/lecciones"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Write files
for filename, content in lessons_data.items():
    filepath = os.path.join(output_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Actualizado 055 con contenido detallado: {filename}")
