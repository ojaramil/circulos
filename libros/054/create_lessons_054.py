import os

# Define the lessons data with much more content
lessons_data = {
    "01_introduccion.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Introducción Detailada a GTD</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; font-size: 2.5em; }
        h2 { color: #82aaff; margin-top: 30px; }
        p { margin-bottom: 20px; font-size: 1.1em; }
        .highlight { background-color: #142b47; padding: 25px; border-left: 5px solid #FF6B35; margin: 30px 0; border-radius: 0 10px 10px 0; }
        ul { margin-bottom: 20px; }
        li { margin-bottom: 10px; }
        strong { color: #fff; }
    </style>
</head>
<body>
    <h1>Introducción: El Arte de Organizarse con Eficacia</h1>
    <p>David Allen revolucionó el mundo de la productividad personal con el método <strong>Getting Things Done (GTD)</strong>. Este sistema no se trata simplemente de gestionar el tiempo, sino de <strong>gestionar nuestra atención y energía</strong>.</p>
    
    <div class="highlight">
        <h3>La Mente es un Procesador, no un Almacén</h3>
        <p>"Tu mente es para tener ideas, no para mantenerlas". Cuando intentas recordar todo lo que tienes que hacer, tu cerebro consume valiosos recursos en un ciclo infinito de recordatorios ineficaces.</p>
    </div>

    <h2>El Problema de los "Bucles Abiertos"</h2>
    <p>Un bucle abierto es cualquier compromiso personal o profesional que no ha sido procesado o cerrado. Estos bucles generan ansiedad y estrés de bajo nivel porque el subconsciente siente que estamos fallando en algo.</p>
    
    <h2>Los Dos Objetivos de GTD</h2>
    <ul>
        <li><strong>Capturar</strong> todas las cosas que necesitan ser hechas en un sistema confiable fuera de tu cabeza.</li>
        <li><strong>Disciplinarte</strong> para tomar decisiones inmediatas sobre todas las "entradas" que dejas entrar en tu vida.</li>
    </ul>

    <p>A lo largo de este curso interactivo, aprenderás a transformar el caos de las tareas diarias en un sistema que te permita tener "la mente como el agua": calmada, pero lista para reaccionar ante cualquier estímulo.</p>
</body>
</html>""",

    "02_capturar.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paso 1: Capturar</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; }
        h2 { color: #82aaff; }
        .highlight { background-color: #142b47; padding: 25px; border-left: 5px solid #FF6B35; margin: 30px 0; }
        .box { background: #1a3350; padding: 20px; border-radius: 8px; margin: 15px 0; }
    </style>
</head>
<body>
    <h1>Paso 1: Capturar (Recopilar)</h1>
    <p>El primer paso crítico es recolectar todo lo que está en tu radar. Si no está en tu sistema, está en tu cabeza, y si está en tu cabeza, te está robando energía.</p>

    <div class="box">
        <h3>¿Qué debemos capturar?</h3>
        <p>Cualquier cosa que sientas que "deberías", "podrías" o "tienes que" hacer. Desde comprar leche hasta planear el retiro de la empresa a 5 años vista.</p>
    </div>

    <h2>Herramientas de Captura Eficientes</h2>
    <p>Para que la captura funcione, tus herramientas deben ser fáciles de usar y estar siempre a mano:</p>
    <ul>
        <li><strong>Bandeja física:</strong> Para papeles, cartas, tarjetas de visita.</li>
        <li><strong>Bloc de notas o Post-its:</strong> Para ideas rápidas.</li>
        <li><strong>Aplicación de captura:</strong> (Todoist, Apple Notes, Obsidian) para movilidad.</li>
        <li><strong>Grabadora de voz:</strong> Ideal mientras conduces o caminas.</li>
    </ul>

    <div class="highlight">
        <h3>Reglas de Oro de la Captura</h3>
        <ol>
            <li><strong>Saca todo:</strong> No juzgues la importancia inicial, solo capta el ítem.</li>
            <li><strong>Vacía tus bandejas:</strong> No dejes que las notas se acumulen eternamente sin procesar.</li>
            <li><strong>Confianza absoluta:</strong> Debes saber que el sistema no perderá lo que has capturado.</li>
        </ol>
    </div>
    
    <h2>El Ejercicio del Braindump</h2>
    <p>Allen recomienda dedicar periódicamente una hora solo a escribir cada mínima cosa que te pase por la cabeza. Te sorprenderá el alivio mental inmediato que produce este ejercicio.</p>
</body>
</html>""",

    "03_clarificar.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paso 2: Clarificar</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; }
        .step-box { border: 1px solid #82aaff; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .accent { color: #FF6B35; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Paso 2: Clarificar (Procesar)</h1>
    <p>Vaciamos la bandeja de entrada, pero <span class="accent">no</span> para hacer el trabajo necesario, sino para decidir qué es cada cosa.</p>

    <h2>La Pregunta Fundamental: ¿Es accionable?</h2>
    <p>Toma cada ítem de tu bandeja y pregúntate si requiere una acción física inmediata o futura.</p>

    <div class="step-box">
        <h3>Si NO es accionable:</h3>
        <ul>
            <li><strong>Basura:</strong> Elimínalo inmediatamente.</li>
            <li><strong>Algún día / Tal vez:</strong> Guárdalo para el futuro (sin compromiso ahora).</li>
            <li><strong>Referencia:</strong> Guárdalo como información que podrías necesitar después.</li>
        </ul>
    </div>

    <div class="step-box">
        <h3>Si SÍ es accionable:</h3>
        <p>¿Cuál es la <strong>Próxima Acción</strong> física? No pongas "Coche", pon "Llamar al taller para cita".</p>
        <ul>
            <li><strong>¿Toma menos de 2 minutos?</strong> Hazlo ya.</li>
            <li><strong>¿No es para ti?</strong> Delégalo (y anótalo en 'En Espera').</li>
            <li><strong>¿Toma más de 2 minutos?</strong> Difirelo (ponlo en tu lista de 'Próximas Acciones').</li>
        </ul>
    </div>
    
    <p>Un error común es intentar "organizar" antes de "clarificar". Debes saber exactamente qué es el ítem antes de saber dónde guardarlo.</p>
</body>
</html>""",

    "04_organizar.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paso 3: Organizar</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; }
        .list-card { background: #142b47; padding: 15px; margin-bottom: 15px; border-radius: 10px; }
        .list-card h3 { color: #FF6B35; margin-top: 0; }
    </style>
</head>
<body>
    <h1>Paso 3: Organizar</h1>
    <p>Organizar en GTD no es "poner etiquetas de colores", es poner los recordatorios de tus acciones y proyectos en los <span style="color:#82aaff">contenedores correctos</span>.</p>

    <div class="list-card">
        <h3>1. Proyectos</h3>
        <p>Cualquier resultado que requiera 2 o más pasos. No pones "Arreglar habitación" en tareas, lo pones en Proyectos. El proyecto en sí no se "hace", se hacen sus próximas acciones.</p>
    </div>

    <div class="list-card">
        <h3>2. Calendario</h3>
        <p>El "territorio sagrado". Solo van cosas que <strong>tienen</strong> que ocurrir en una fecha o hora específica. No pongas tu lista de deseos en el calendario.</p>
    </div>

    <div class="list-card">
        <h3>3. Próximas Acciones</h3>
        <p>El núcleo de tu día a día. Lista de tareas concretas organizadas por <span style="color:#82aaff">contexto</span> (En la oficina, En casa, Con el jefe, Al teléfono).</p>
    </div>

    <div class="list-card">
        <h3>4. En Espera</h3>
        <p>Cosas que has delegado y de las que esperas respuesta. Es vital para que nada se pierda en el limbo de la delegación.</p>
    </div>

    <div class="list-card">
        <h3>5. Algún día / Tal vez</h3>
        <p>Ideas que te gustaría explorar algún día pero que no quieres ver hoy. Libera tu lista de tareas de la presión de lo innecesario.</p>
    </div>
</body>
</html>""",

    "05_reflexionar.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paso 4: Reflexionar</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; }
        .quote { font-style: italic; color: #82aaff; text-align: center; font-size: 1.2em; margin: 30px 0; }
        .box { border: 2px dashed #FF6B35; padding: 25px; border-radius: 15px; }
    </style>
</head>
<body>
    <h1>Paso 4: Reflexionar (Revisión)</h1>
    <p>De nada sirve tener listas perfectas si no las miras. El sistema se cae si dejas de confiar en él.</p>

    <div class="quote">
        "El secreto de la productividad no es hacer cosas, es saber qué NO estás haciendo."
    </div>

    <h2>La Revisión Semanal: El Componente Maestro</h2>
    <p>Sin la revisión semanal, GTD durará 2 semanas en tu vida. Debes apartar un bloque de tiempo (normalmente el viernes tarde o domingo tarde) para:</p>

    <div class="box">
        <ul>
            <li><strong>Procesar todo:</strong> Limpiar bandejas, capturar nuevas ideas.</li>
            <li><strong>Revisar proyectos:</strong> Asegurarte de que TODOS los proyectos activos tengan al menos una próxima acción real.</li>
            <li><strong>Mirar el calendario:</strong> ¿Qué viene la semana que viene? ¿Qué reuniones se pueden cancelar o preparar?</li>
            <li><strong>Limpiar listas:</strong> Eliminar lo que ya no es relevante y mover cosas a 'Algún día'.</li>
        </ul>
    </div>

    <p>Esta revisión te devuelve la perspectiva y el control. Te permite pasar de "bombero que apaga fuegos" a "piloto que dirige el avión".</p>
</body>
</html>""",

    "06_ejecutar.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paso 5: Ejecutar</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; }
        .criteria { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
        .criterion { background: #142b47; padding: 15px; border-radius: 8px; border: 1px solid #34495E; }
        .criterion span { color: #FF6B35; font-size: 1.5em; display: block; margin-bottom: 5px; }
    </style>
</head>
<body>
    <h1>Paso 5: Ejecutar (Hacer)</h1>
    <p>Finalmente, llega el momento de la verdad. ¿Cómo elijo qué hacer ahora mismo entre las 50 tareas de mi lista?</p>

    <h2>Los 4 Criterios de Selección Instantánea</h2>
    
    <div class="criteria">
        <div class="criterion">
            <span>1. Contexto</span>
            ¿Dónde estoy? Si estoy en el aeropuerto, solo puedo hacer cosas de mi lista 'Teléfono' o 'Solo lectura'. El contexto limita tus opciones de forma útil.
        </div>
        <div class="criterion">
            <span>2. Tiempo</span>
            ¿Cuánto tengo antes de la siguiente reunión? Si tengo 10 minutos, no empiezo el informe trimestral.
        </div>
        <div class="criterion">
            <span>3. Energía</span>
            ¿Cómo está mi cerebro? Si estoy agotado después de un día intenso, no hago trabajo creativo. Es el momento de archivar facturas o limpiar el buzón.
        </div>
        <div class="criterion">
            <span>4. Prioridad</span>
            Dados los límites de contexto, tiempo y energía, ¿qué es lo que me dará mayor retorno emocional o profesional?
        </div>
    </div>

    <p>Al aplicar este filtro, la decisión de "qué hacer" se vuelve casi automática, eliminando la fatiga de decisión.</p>
</body>
</html>""",

    "07_regla_2_minutos.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>La Regla de los 2 Minutos</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; }
        .big-rule { font-size: 2em; text-align: center; color: #82aaff; padding: 40px; border: 4px double #FF6B35; border-radius: 20px; margin: 30px 0; line-height: 1.2; }
    </style>
</head>
<body>
    <h1>La Regla de los 2 Minutos</h1>
    <p>Esta es quizás la técnica más famosa de GTD debido a su simplicidad y potencia inmediata.</p>

    <div class="big-rule">
        "Si una acción requiere menos de dos minutos, hazla directamente en el momento en que la procesas."
    </div>

    <h2>¿Por qué 2 minutos?</h2>
    <p>Porque tardarías más tiempo en capturarla, clarificarla y organizarla en tu sistema que en hacerla. Al ejecutarla inmediatamente:</p>
    <ul>
        <li>Previenes la acumulación de pequeñas tareas molestas.</li>
        <li>Mantienes el flujo de procesamiento de tu bandeja de entrada.</li>
        <li>Liberas espacio mental de forma instantánea.</li>
    </ul>

    <h2>Precaución: No es para "hacer todo"</h2>
    <p>La regla de los 2 minutos es para la fase de <strong>Procesamiento (Clarificar)</strong>, no para la fase de Ejecución general. Si usas esta regla para interrumpir tu trabajo concentrado cada vez que llega un email nuevo, estarás destruyendo tu productividad.</p>
</body>
</html>""",

    "08_proyectos.html": """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Definiendo Proyectos</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; color: #E0E7EF; background-color: #0D1F33; max-width: 900px; margin: 0 auto; padding: 40px; }
        h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; }
        .example-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 30px; }
        .ex-item { background: #142b47; padding: 10px; border-radius: 5px; }
        .ex-title { font-weight: bold; color: #82aaff; }
    </style>
</head>
<body>
    <h1>Maestría en Proyectos</h1>
    <p>En el mundo de David Allen, "un proyecto" no es necesariamente algo grande como construir un puente. Es cualquier resultado que deseas y que no se puede terminar de un solo golpe.</p>

    <h2>La Diferencia entre Proyecto y Tarea</h2>
    <p>Un error masivo en la productividad es poner proyectos en la lista de tareas. El cerebro se bloquea ante un comando como "Escribir presentación" porque es demasiado vago y grande.</p>

    <div class="example-grid">
        <div class="ex-item">
            <span class="ex-title">Nombre del Proyecto:</span><br>
            Organizar cena de aniversario
        </div>
        <div class="ex-item">
            <span class="ex-title">Próxima Acción (Hacer):</span><br>
            Llamar al restaurante 'El Mirador' para consultar disponibilidad.
        </div>
        <div class="ex-item">
            <span class="ex-title">Nombre del Proyecto:</span><br>
            Aprender Python
        </div>
        <div class="ex-item">
            <span class="ex-title">Próxima Acción (Hacer):</span><br>
            Descargar e instalar VS Code en el portátil.
        </div>
    </div>

    <h2>Modelo de Planificación Natural</h2>
    <p>Cuando planifiques un proyecto, sigue estos pasos:</p>
    <ol>
        <li><strong>Propósito:</strong> ¿Por qué hacemos esto?</li>
        <li><strong>Visión:</strong> ¿Cómo se ve el éxito?</li>
        <li><strong>Lluvia de ideas:</strong> ¿Qué partes lo componen?</li>
        <li><strong>Organización:</strong> Priorizar esas partes.</li>
        <li><strong>Identificar Próxima Acción:</strong> ¿Qué puedo mover AHORA?</li>
    </ol>
</body>
</html>"""
}

# Create directory
output_dir = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/054/lecciones"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Write files
for filename, content in lessons_data.items():
    filepath = os.path.join(output_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Actualizado con más contenido: {filename}")
