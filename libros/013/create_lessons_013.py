import os

# Base directory
base_dir = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/013/lecciones"

# Ensure directory exists
os.makedirs(base_dir, exist_ok=True)

# HTML Template
html_template = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <style>
        body {{
            font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #F0F8FF;
        }}
        h1 {{
            color: #005BAA;
            border-bottom: 2px solid #005BAA;
            padding-bottom: 10px;
        }}
        h2 {{
            color: #142b47;
            margin-top: 20px;
        }}
        p {{
            margin-bottom: 15px;
        }}
        .highlight {{
            background-color: #e6f3ff;
            padding: 15px;
            border-left: 5px solid #005BAA;
            margin: 20px 0;
            border-radius: 4px;
        }}
        ul {{
            margin-bottom: 15px;
        }}
        li {{
            margin-bottom: 8px;
        }}
        .key-concept {{
            font-weight: bold;
            color: #005BAA;
        }}
    </style>
</head>
<body>
    <h1>{title}</h1>
    {content}
</body>
</html>"""

# Lesson Data
lessons = [
    {
        "filename": "01_introduccion.html",
        "title": "Introducción a los 7 Hábitos",
        "content": """
        <p>Bienvenidos al estudio de "Los 7 Hábitos de la Gente Altamente Efectiva" de Stephen R. Covey. Este libro no es solo sobre productividad; es sobre desarrollar un carácter fuerte y principios sólidos.</p>
        <div class="highlight">
            <p><strong>Concepto Clave:</strong> Los hábitos son la intersección de conocimiento (qué hacer), capacidad (cómo hacerlo) y deseo (querer hacerlo).</p>
        </div>
        <h2>El Enfoque de Adentro Hacia Afuera</h2>
        <p>Covey argumenta que para cambiar nuestra realidad, primero debemos cambiar nosotros mismos; y para cambiarnos a nosotros mismos de manera efectiva, primero debemos cambiar nuestras percepciones.</p>
        <p>En este curso exploraremos cómo pasar de la dependencia a la independencia, y finalmente a la interdependencia.</p>
        """
    },
    {
        "filename": "02_paradigmas_principios.html",
        "title": "Paradigmas y Principios",
        "content": """
        <p>Un paradigma es como un mapa. No es el territorio en sí, sino una explicación o modelo de algo. Si tienes el mapa equivocado, no importa cuánto te esfuerces, nunca llegarás a tu destino.</p>
        <h2>El Poder de un Cambio de Paradigma</h2>
        <p>A veces, necesitamos un "cambio de paradigma" — un momento de "¡ajá!" donde vemos el mundo de una manera nueva. Los 7 Hábitos se basan en principios, leyes naturales que gobiernan la efectividad humana.</p>
        <div class="highlight">
            <p>Los principios son universales, atemporales y evidentes por sí mismos. Alinear nuestros paradigmas con estos principios es la clave del éxito duradero.</p>
        </div>
        """
    },
    {
        "filename": "03_de_adentro_hacia_afuera.html",
        "title": "De Adentro Hacia Afuera",
        "content": """
        <p>El enfoque "de adentro hacia afuera" significa empezar por uno mismo. Más fundamentalmente, empezar con la parte más interior de uno mismo: con los paradigmas, el carácter y los motivos.</p>
        <h2>Carácter vs. Personalidad</h2>
        <p>Covey distingue entre la "Ética del Carácter" (integridad, humildad, fidelidad) y la "Ética de la Personalidad" (técnicas de relaciones públicas, actitud mental positiva). La efectividad verdadera se basa en el carácter.</p>
        <div class="highlight">
            <p>No puedes tener éxito con otras personas si no has pagado el precio del éxito contigo mismo primero. Las victorias privadas preceden a las victorias públicas.</p>
        </div>
        """
    },
    {
        "filename": "04_panorama_general.html",
        "title": "Panorama General de los 7 Hábitos",
        "content": """
        <p>Los 7 Hábitos no son una lista de tareas aisladas, sino un enfoque secuencial e integrado para el desarrollo de la efectividad personal e interpersonal.</p>
        <h2>La Secuencia del Desarrollo</h2>
        <ul>
            <li><strong>Dependencia:</strong> El paradigma del "Tú". Tú cuidas de mí.</li>
            <li><strong>Independencia:</strong> El paradigma del "Yo". Yo puedo hacerlo. (Hábitos 1, 2 y 3)</li>
            <li><strong>Interdependencia:</strong> El paradigma del "Nosotros". Nosotros podemos hacerlo. (Hábitos 4, 5 y 6)</li>
        </ul>
        <p>El Hábito 7 es el hábito de la renovación, que rodea y alimenta a todos los demás.</p>
        """
    },
    {
        "filename": "05_habito_1_ser_proactivo.html",
        "title": "Hábito 1: Ser Proactivo - Conceptos Básicos",
        "content": """
        <p>Ser proactivo significa más que simplemente tomar la iniciativa. Significa que, como seres humanos, somos responsables de nuestras propias vidas. Nuestra conducta es una función de nuestras decisiones, no de nuestras condiciones.</p>
        <h2>Responsabilidad</h2>
        <p>La palabra responsabilidad se puede dividir en "respuesta" y "habilidad": la habilidad para elegir nuestra respuesta. Las personas proactivas reconocen esa responsabilidad.</p>
        <div class="highlight">
            <p>Entre el estímulo y la respuesta, el ser humano tiene la libertad interior de elegir.</p>
        </div>
        """
    },
    {
        "filename": "06_circulo_influencia.html",
        "title": "Hábito 1: Círculo de Influencia vs Preocupación",
        "content": """
        <p>Una excelente manera de tomar conciencia de nuestro propio grado de proactividad consiste en examinar en qué invertimos nuestro tiempo y nuestra energía.</p>
        <h2>Dos Círculos</h2>
        <ul>
            <li><strong>Círculo de Preocupación:</strong> Cosas sobre las que no tenemos control real (clima, economía, debilidades de otros).</li>
            <li><strong>Círculo de Influencia:</strong> Cosas sobre las que podemos hacer algo (nuestra actitud, nuestra educación, nuestras habilidades).</li>
        </ul>
        <p>Las personas proactivas centran sus esfuerzos en el Círculo de Influencia. Trabajan en las cosas sobre las que pueden hacer algo.</p>
        """
    },
    {
        "filename": "07_habito_2_fin_en_mente.html",
        "title": "Hábito 2: Comenzar con el Fin en Mente",
        "content": """
        <p>"Comenzar con el fin en mente" significa comenzar con una clara comprensión de su destino. Significa saber a dónde se está yendo, de modo que se pueda comprender mejor dónde se está, y dar siempre los pasos adecuados en la dirección correcta.</p>
        <h2>Dos Creaciones</h2>
        <p>Todas las cosas se crean dos veces. Hay una creación mental o primera creación, y una creación física o segunda creación. El Hábito 2 es la primera creación.</p>
        <div class="highlight">
            <p>Si no te haces cargo de tu primera creación, dejas que otras personas y circunstancias den forma a tu vida por defecto.</p>
        </div>
        """
    },
    {
        "filename": "08_mision_personal.html",
        "title": "Hábito 2: Enunciado de Misión Personal",
        "content": """
        <p>El modo más efectivo de empezar con el fin en mente consiste en elaborar un enunciado de la misión, filosofía o credo personales. Se centra en lo que uno quiere ser (carácter) y hacer (aportaciones y logros).</p>
        <h2>Tu Constitución Personal</h2>
        <p>Un enunciado de misión personal se convierte en tu constitución, una base sólida para tomar decisiones importantes en la vida y decisiones diarias en medio de las circunstancias y emociones que nos afectan.</p>
        <p>Para escribirlo, debemos centrarnos en nuestros principios fundamentales.</p>
        """
    },
    {
        "filename": "09_habito_3_primero_lo_primero.html",
        "title": "Hábito 3: Poner Primero lo Primero",
        "content": """
        <p>El Hábito 3 es el fruto personal, la realización práctica de los Hábitos 1 y 2. El Hábito 1 dice: "Tú eres el creador". El Hábito 2 es la primera creación mental. El Hábito 3 es la segunda creación, la física.</p>
        <h2>Administración vs. Liderazgo</h2>
        <p>El liderazgo decide qué es "lo primero". La administración es la disciplina de ponerlo en práctica día a día. El Hábito 3 es la disciplina de priorizar.</p>
        <div class="highlight">
            <p>Lo que importa más nunca debe estar a merced de lo que importa menos.</p>
        </div>
        """
    },
    {
        "filename": "10_matriz_tiempo.html",
        "title": "Hábito 3: La Matriz de Administración del Tiempo",
        "content": """
        <p>Podemos pasar el tiempo en uno de cuatro cuadrantes, definidos por dos factores: Urgente e Importante.</p>
        <h2>Los 4 Cuadrantes</h2>
        <ul>
            <li><strong>Cuadrante I:</strong> Urgente e Importante (Crisis, problemas apremiantes).</li>
            <li><strong>Cuadrante II:</strong> No Urgente pero Importante (Prevención, construcción de relaciones, planificación).</li>
            <li><strong>Cuadrante III:</strong> Urgente pero No Importante (Interrupciones, algunas reuniones).</li>
            <li><strong>Cuadrante IV:</strong> No Urgente y No Importante (Trivialidades, pérdida de tiempo).</li>
        </ul>
        <p>La gente efectiva se mantiene fuera de los Cuadrantes III y IV, y reduce el Cuadrante I pasando más tiempo en el <strong>Cuadrante II</strong>.</p>
        """
    },
    {
        "filename": "11_cuenta_bancaria_emocional.html",
        "title": "La Cuenta Bancaria Emocional",
        "content": """
        <p>La Cuenta Bancaria Emocional es una metáfora de la confianza incorporada en una relación. Es el sentimiento de seguridad que tenemos con otro ser humano.</p>
        <h2>Depósitos y Retiros</h2>
        <p>Hacemos depósitos mediante la cortesía, la bondad, la honestidad y el cumplimiento de compromisos. Hacemos retiros cuando somos descorteses, irrespetuosos o rompemos promesas.</p>
        <div class="highlight">
            <p>Si hago depósitos constantes, construyo una reserva. Si cometo un error, esa reserva lo compensa. Pero si la cuenta está en descubierto, no hay confianza.</p>
        </div>
        """
    },
    {
        "filename": "12_habito_4_ganar_ganar.html",
        "title": "Hábito 4: Pensar Ganar-Ganar",
        "content": """
        <p>Pensar Ganar-Ganar no es una técnica; es una filosofía total de la interacción humana. Es un marco de referencia de la mente y el corazón que busca constantemente el beneficio mutuo en todas las interacciones.</p>
        <h2>Paradigmas de Interacción</h2>
        <ul>
            <li><strong>Ganar-Ganar:</strong> Busquemos una solución que nos beneficie a ambos.</li>
            <li><strong>Ganar-Perder:</strong> Yo gano, tú pierdes (autoritarismo).</li>
            <li><strong>Perder-Ganar:</strong> Yo pierdo, tú ganas (ser el "buen chico", felpudo).</li>
            <li><strong>Perder-Perder:</strong> Si yo caigo, tú caes conmigo.</li>
        </ul>
        <p>Ganar-Ganar ve la vida como un escenario cooperativo, no competitivo.</p>
        """
    },
    {
        "filename": "13_dimensiones_ganar_ganar.html",
        "title": "Hábito 4: Cinco Dimensiones de Ganar-Ganar",
        "content": """
        <p>El principio de Ganar-Ganar es fundamental para el éxito en todas nuestras interacciones y abarca cinco dimensiones interdependientes de la vida.</p>
        <h2>Las 5 Dimensiones</h2>
        <ol>
            <li><strong>Carácter:</strong> La base (Integridad, Madurez, Mentalidad de Abundancia).</li>
            <li><strong>Relaciones:</strong> La cuenta bancaria emocional.</li>
            <li><strong>Acuerdos:</strong> Definición de expectativas y resultados.</li>
            <li><strong>Sistemas:</strong> Deben apoyar el Ganar-Ganar (recompensas, comunicación).</li>
            <li><strong>Procesos:</strong> El camino para llegar a soluciones Ganar-Ganar.</li>
        </ol>
        """
    },
    {
        "filename": "14_habito_5_entender.html",
        "title": "Hábito 5: Buscar Primero Entender",
        "content": """
        <p>"Buscar primero entender, luego ser entendido". Este es el principio clave de la comunicación interpersonal efectiva.</p>
        <h2>El Diagnóstico antes de la Prescripción</h2>
        <p>La mayoría de las personas no escuchan con la intención de entender; escuchan con la intención de responder. Están hablando o preparándose para hablar.</p>
        <div class="highlight">
            <p>Si quieres interactuar efectivamente con alguien, primero debes comprenderlo. Debes tener la empatía necesaria para ver el mundo a través de sus ojos.</p>
        </div>
        """
    },
    {
        "filename": "15_escucha_empatica.html",
        "title": "Hábito 5: Escucha Empática",
        "content": """
        <p>La escucha empática es escuchar con la intención de comprender. Es entrar en el marco de referencia de la otra persona. Ves el mundo como ella lo ve, comprendes su paradigma, comprendes lo que siente.</p>
        <h2>Más allá de las palabras</h2>
        <p>La escucha empática no es solo registrar, reflejar o incluso comprender las palabras que se pronuncian. Los expertos en comunicación estiman que solo el 10% de nuestra comunicación está representada por palabras.</p>
        <p>Escuchas con tus oídos, pero también (y más importante) con tus ojos y tu corazón.</p>
        """
    },
    {
        "filename": "16_habito_6_sinergizar.html",
        "title": "Hábito 6: Sinergizar",
        "content": """
        <p>La sinergia es la esencia del liderazgo transformador. Es la catalizadora, unificadora y liberadora de las más grandes energías dentro de las personas.</p>
        <h2>¿Qué es la Sinergia?</h2>
        <p>Sinergia significa que el todo es más que la suma de sus partes. Uno más uno es igual a tres o más. La esencia de la sinergia es valorar las diferencias: respetarlas, construir sobre ellas, compensar las debilidades.</p>
        <div class="highlight">
            <p>La sinergia no es lo mismo que el compromiso. En un compromiso, 1+1=1.5. En la sinergia, 1+1=3.</p>
        </div>
        """
    },
    {
        "filename": "17_valorar_diferencias.html",
        "title": "Hábito 6: Valorar las Diferencias",
        "content": """
        <p>La valoración de las diferencias (mentales, emocionales, psicológicas) es la esencia de la sinergia. Y la clave para valorar esas diferencias consiste en comprender que todas las personas ven el mundo no como es, sino como son ellas mismas.</p>
        <h2>La Tercera Alternativa</h2>
        <p>Cuando vemos las cosas de manera diferente, no significa que uno tenga razón y el otro no. Significa que necesitamos encontrar una Tercera Alternativa: una solución que sea mejor que lo que cualquiera de los dos propuso originalmente.</p>
        """
    },
    {
        "filename": "18_habito_7_afilar_sierra.html",
        "title": "Hábito 7: Afilar la Sierra",
        "content": """
        <p>Suponga que se encuentra con alguien que trabaja febrilmente en el bosque cortando un árbol con una sierra. "¿Qué está haciendo?", le pregunta. "No lo ve?", responde él con impaciencia. "Estoy cortando este árbol". "Se le ve exhausto", dice usted. "¿Por qué no descansa un poco y afila la sierra?". "No tengo tiempo para afilar la sierra", dice el hombre. "Estoy demasiado ocupado aserrando".</p>
        <h2>Renovación</h2>
        <p>El Hábito 7 es dedicar tiempo a afilar la sierra. Es preservar y realzar el mayor bien que usted posee: usted mismo.</p>
        """
    },
    {
        "filename": "19_cuatro_dimensiones.html",
        "title": "Hábito 7: Las Cuatro Dimensiones",
        "content": """
        <p>La renovación efectiva debe ser equilibrada en las cuatro dimensiones de nuestra naturaleza:</p>
        <ul>
            <li><strong>Física:</strong> Ejercicio, nutrición, control del estrés.</li>
            <li><strong>Espiritual:</strong> Clarificación de valores, compromiso, estudio, meditación.</li>
            <li><strong>Mental:</strong> Lectura, visualización, planificación, escritura.</li>
            <li><strong>Social/Emocional:</strong> Servicio, empatía, sinergia, seguridad intrínseca.</li>
        </ul>
        <div class="highlight">
            <p>Afilar la sierra significa ejercer las cuatro dimensiones de nuestra naturaleza, regular y congruentemente, de manera sabia y equilibrada.</p>
        </div>
        """
    },
    {
        "filename": "20_espiral_ascendente.html",
        "title": "La Espiral Ascendente",
        "content": """
        <p>La renovación es el principio y el proceso que nos permite ascender en una espiral de crecimiento y cambio, de perfeccionamiento continuo.</p>
        <h2>Aprender, Comprometerse, Actuar</h2>
        <p>Para movernos a lo largo de esta espiral ascendente, debemos aprender, comprometernos y actuar; aprender, comprometernos y actuar; y aprender, comprometernos y actuar de nuevo.</p>
        <p>Nuestra conciencia moral es la que nos impulsa en esta espiral. Educar y obedecer a nuestra conciencia es clave para el crecimiento continuo.</p>
        """
    },
    {
        "filename": "21_inteligencia_emocional.html",
        "title": "Inteligencia Emocional y los 7 Hábitos",
        "content": """
        <p>Aunque el término "Inteligencia Emocional" se popularizó después de este libro, los 7 Hábitos son esencialmente un marco para desarrollar una alta inteligencia emocional.</p>
        <h2>Conexiones</h2>
        <ul>
            <li><strong>Autoconciencia:</strong> Hábito 1 (Ser Proactivo).</li>
            <li><strong>Autorregulación:</strong> Hábito 1 y 2.</li>
            <li><strong>Motivación:</strong> Hábito 3 (Poner Primero lo Primero).</li>
            <li><strong>Empatía:</strong> Hábito 5 (Buscar Primero Entender).</li>
            <li><strong>Habilidades Sociales:</strong> Hábitos 4 y 6 (Ganar-Ganar y Sinergizar).</li>
        </ul>
        """
    },
    {
        "filename": "22_aplicacion_familia.html",
        "title": "Aplicación en la Familia",
        "content": """
        <p>La familia es donde pasamos la mayor parte de nuestro tiempo y donde nuestras relaciones son más profundas. Los 7 Hábitos son inmensamente poderosos cuando se aplican en el hogar.</p>
        <h2>Creando una Cultura Familiar</h2>
        <p>Crear un enunciado de misión familiar, tener reuniones familiares semanales y practicar la escucha empática con cónyuges e hijos puede transformar la dinámica familiar de la dependencia o independencia a una interdependencia amorosa y solidaria.</p>
        """
    },
    {
        "filename": "23_aplicacion_trabajo.html",
        "title": "Aplicación en el Trabajo",
        "content": """
        <p>En el entorno laboral, los 7 Hábitos transforman la gestión en liderazgo. Permiten pasar de la supervisión y el control a la autonomía y el empoderamiento.</p>
        <h2>Organizaciones Efectivas</h2>
        <p>Una organización que practica los 7 Hábitos fomenta la proactividad en sus empleados, tiene una misión clara compartida por todos, prioriza lo importante, busca acuerdos ganar-ganar con clientes y proveedores, y valora la diversidad de opiniones para crear soluciones sinérgicas.</p>
        """
    },
    {
        "filename": "24_de_adentro_hacia_afuera_2.html",
        "title": "De Adentro Hacia Afuera Nuevamente",
        "content": """
        <p>Volvemos al principio: el cambio real viene de adentro. No podemos cambiar a los demás; solo podemos cambiarnos a nosotros mismos. Pero al cambiarnos a nosotros mismos, cambiamos nuestro entorno.</p>
        <h2>El Legado</h2>
        <p>Vivir los 7 Hábitos es un proceso constante. Habrá momentos en los que fallaremos, pero la clave es volver al camino. Al hacerlo, nos convertimos en "figuras de transición", deteniendo patrones negativos y transmitiendo hábitos efectivos a las generaciones futuras.</p>
        """
    },
    {
        "filename": "25_conclusion.html",
        "title": "Conclusión y Resumen",
        "content": """
        <p>Hemos recorrido un largo camino a través de los 7 Hábitos. Desde la Victoria Privada hasta la Victoria Pública y la Renovación.</p>
        <h2>Resumen Final</h2>
        <ol>
            <li>Sé Proactivo.</li>
            <li>Empieza con un Fin en Mente.</li>
            <li>Pon Primero lo Primero.</li>
            <li>Piensa Ganar-Ganar.</li>
            <li>Busca Primero Entender, Luego Ser Entendido.</li>
            <li>Sinergiza.</li>
            <li>Afila la Sierra.</li>
        </ol>
        <p>La puerta del cambio se abre desde adentro. ¡Empieza hoy!</p>
        """
    }
]

# Generate Files
for lesson in lessons:
    file_path = os.path.join(base_dir, lesson["filename"])
    html_content = html_template.format(title=lesson["title"], content=lesson["content"])
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Created: {lesson['filename']}")

print("All 25 lessons created successfully.")
