# -*- coding: utf-8 -*-
"""Genera las 25 lecciones del libro 053 - High Performance Habits (Brendon Burchard)."""
import os

base_path = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/053/lecciones"
os.makedirs(base_path, exist_ok=True)

css_style = """
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f9;
        }
        h1 { color: #2c3e50; text-align: center; margin-bottom: 30px; }
        h3 { color: #e67e22; border-bottom: 2px solid #e67e22; padding-bottom: 10px; margin-top: 30px; }
        p { margin-bottom: 15px; text-align: justify; }
        .highlight-box {
            background-color: #e8f6f3;
            border-left: 5px solid #1abc9c;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
    </style>
"""

lessons = [
    {"filename": "01_introduccion.html", "title": "1. Introducción: Más allá de lo natural",
     "content": """
        <p>Bienvenido a "High Performance Habits" de Brendon Burchard. Este libro no es sobre trucos motivacionales, sino sobre seis hábitos deliberados que la investigación ha demostrado que distinguen a quienes alcanzan y sostienen el éxito a largo plazo. No se trata de ser superhumano: se trata de prácticas precisas, repetibles y medibles.</p>
        <h3>Más allá de lo natural</h3>
        <p>La excelencia no es un acto, es un hábito (Aristóteles). Burchard plantea que el alto rendimiento no depende de tu personalidad, fortalezas innatas o suerte, sino de hábitos que cualquiera puede aprender y aplicar en cualquier ámbito.</p>
        <div class="highlight-box">
            <strong>Concepto clave:</strong> Los high performers no nacen así. Despliegan seis hábitos de forma más consistente que sus pares. Esa es la diferencia.
        </div>
        <p>Prepárate para conocer los HP6: Claridad, Energía, Necesidad, Productividad, Influencia y Coraje. Son el sistema operativo mental que necesitas para rendir al máximo de forma sostenida.</p>
     """},
    {"filename": "02_por_que_ahora.html", "title": "2. Por qué este libro, por qué ahora",
     "content": """
        <p>Vivimos en una época de incertidumbre. La línea base del éxito se ha movido: ya no basta con trabajar duro y seguir las reglas. Todo cambia rápido, las expectativas suben y muchas personas se sienten agotadas sin avanzar.</p>
        <h3>El problema actual</h3>
        <p>La gente trabaja mucho pero no rompe barreras. Está motivada pero no sabe exactamente qué quiere. Quiere perseguir sus sueños pero teme ser juzgada o fracasar. Burchard escribió este libro para dar dirección y hábitos concretos ante ese vacío.</p>
        <div class="highlight-box">
            <strong>Reflexión:</strong> No necesitas más trucos para sentirte bien; necesitas habilidades y métodos reales para avanzar en tu vida y carrera de forma integral.
        </div>
        <p>El libro reúne veinte años de investigación, diez años de coaching de élite y un amplio conjunto de datos sobre high performers en el mundo. Su objetivo: que sepas exactamente cómo rendir al máximo cuando empieces un nuevo proyecto o persigas un sueño ambicioso.</p>
     """},
    {"filename": "03_que_es_alto_rendimiento.html", "title": "3. Qué es el alto rendimiento",
     "content": """
        <p>Para este libro, <em>alto rendimiento</em> significa tener éxito por encima de las normas estándar, de forma consistente y a largo plazo. No es solo mejorar un poco; es superar de manera sostenida las expectativas y los resultados habituales.</p>
        <h3>Consistencia y largo plazo</h3>
        <p>Los high performers no "terminan" teniendo éxito en el último minuto de una década de esfuerzo. Son constantes: superan expectativas de forma regular. Además, el alto rendimiento incluye bienestar: no se trata de triunfar a cualquier costo, sino de formar hábitos que te permitan destacar y enriquecer todas las áreas de tu vida.</p>
        <div class="highlight-box">
            <strong>Definición práctica:</strong> Alto rendimiento = crear niveles cada vez mayores de bienestar y éxito externo a largo plazo, en múltiples dominios.
        </div>
        <p>No es solo expertise en una habilidad; es un conjunto de competencias y meta-hábitos que permiten tener éxito una y otra vez y liderar a otros.</p>
     """},
    {"filename": "04_high_performers.html", "title": "4. Lo que sabemos de los high performers",
     "content": """
        <p>La investigación del High Performance Institute revela patrones claros. Los high performers tienen más éxito que sus pares y, sin embargo, están menos estresados. Aman los desafíos y son más seguros de que lograrán sus metas a pesar de la adversidad.</p>
        <h3>Características clave</h3>
        <p>Son más saludables (comen mejor, hacen más ejercicio). Son más felices: cada hábito HP6 correlaciona con mayor felicidad. Son admirados por sus pares porque el ego cede ante el servicio. Obtienen mejores calificaciones y llegan a posiciones más altas. Son más productivos en lo que importa (Prolific Quality Output). Son líderes adaptativos que sirven a otros.</p>
        <div class="highlight-box">
            <strong>Dato:</strong> Los high performers no son de otro planeta. No hay superhumanos en la mezcla. La diferencia está en desplegar los seis hábitos de forma más consistente.
        </div>
        <p>Ninguno de estos resultados depende fuertemente de edad, educación, ingresos, raza o género. Las excusas que usamos para no rendir al máximo suelen ser incorrectas.</p>
     """},
    {"filename": "05_los_seis_habitos.html", "title": "5. Los seis hábitos (HP6)",
     "content": """
        <p>Los HP6 son: Buscar claridad, Generar energía, Elevar la necesidad, Aumentar productividad, Desarrollar influencia y Demostrar coraje. Son hábitos <em>deliberados</em>: hay que elegirlos, practicarlos con atención y revisitarlos una y otra vez.</p>
        <h3>Los seis en una frase</h3>
        <p><strong>Claridad:</strong> Saber quién quieres ser, cómo tratar a los demás, qué quieres y qué te da significado. <strong>Energía:</strong> Mantener enfoque, esfuerzo y bienestar. <strong>Necesidad:</strong> Conectar con las razones por las que debes rendir excepcionalmente. <strong>Productividad:</strong> Enfocarte en el output de calidad prolífico (PQO) en tu área principal. <strong>Influencia:</strong> Que los demás crean en ti y te apoyen. <strong>Coraje:</strong> Expresar ideas, actuar con audacia y defenderte a ti y a otros.</p>
        <div class="highlight-box">
            <strong>Regla de oro:</strong> Sin los HP6, incluso la persona más talentosa puede sentirse perdida, cansada, desmotivada, improductiva, sola o temerosa.
        </div>
        <p>Estos hábitos son aprendibles, mejorables y aplicables en todos los contextos. Puedes empezar a usarlos hoy.</p>
     """},
    {"filename": "06_fortalezas_no_bastan.html", "title": "6. Las fortalezas no bastan",
     "content": """
        <p>En la lista de los HP6 no aparece "enfócate en tus fortalezas innatas". Burchard argumenta que, en un mundo complejo y cambiante, llegar a la cima no le sale "natural" a nadie. Tienes que ir más allá de lo que te resulta fácil o natural.</p>
        <h3>Servir a la misión</h3>
        <p>Como dijo un cliente: "No se trata de que la misión se adapte a mis fortalezas limitadas; se trata de que yo me eleve para servir a la misión." Conocer tu tipo de personalidad o tus fortalezas no es tan útil como saber qué prácticas funcionan independientemente de la personalidad.</p>
        <div class="highlight-box">
            <strong>Conclusión:</strong> Si quieres dejar huella, tendrás que crecer más para dar más, y eso no siempre se sentirá fácil o natural. Las fortalezas solas nunca bastan.
        </div>
        <p>La buena noticia: nadie carece "innatamente" de los HP6. Los high performers simplemente los despliegan con más consistencia.</p>
     """},
    {"filename": "07_habitos_deliberados.html", "title": "7. Hábitos deliberados",
     "content": """
        <p>Este libro no habla de hábitos automáticos (como atarse los zapatos). Los hábitos de alto rendimiento son <em>deliberados</em>: requieren atención consciente, especialmente cuando el entorno cambia. No se vuelven fáciles por inercia; el mundo se vuelve más complejo según escalas.</p>
        <h3>Checklist mental</h3>
        <p>Cada vez que te sientas atascado, que empieces un proyecto nuevo o que midas tu progreso, debes pensar deliberadamente en los HP6. Usarlos como checklist, igual que un piloto antes del despegue. Quien llama a la puerta de la oportunidad no se sorprende de que sea el Trabajo quien abre.</p>
        <div class="highlight-box">
            <strong>Mensaje:</strong> Habrá mucho trabajo por delante. La facilidad no es el objetivo; el crecimiento sí. Los seis hábitos marcan una diferencia significativa aunque exigen atención y esfuerzo constantes.
        </div>
        <p>Así como los atletas no dejan de entrenar, los high performers no dejan de condicionar y fortalecer estos hábitos.</p>
     """},
    {"filename": "08_habito_claridad.html", "title": "8. Hábito 1: Buscar claridad",
     "content": """
        <p>Buscar claridad significa saber quién quieres ser, cómo quieres interactuar con otros, qué quieres y qué te dará mayor significado. No se "tiene" claridad; se genera. Se genera haciendo preguntas, probando cosas y refinando tu perspectiva una y otra vez.</p>
        <h3>Las cuatro preguntas del futuro</h3>
        <p>Burchard habla del "Future Four": (1) ¿Qué experiencia o sentimiento buscas? (2) ¿Cómo quieres relacionarte con los demás? (3) ¿Qué resultados quieres? (4) ¿Qué aportará significado a tu vida? Los high performers tienen más claridad que sus pares en quiénes son, qué quieren y qué les resulta significativo.</p>
        <div class="highlight-box">
            <strong>Práctica:</strong> No esperes un fogonazo de inspiración. Genera claridad preguntando, investigando y experimentando. La claridad es hija del pensamiento cuidadoso y la experimentación consciente.
        </div>
        <p>Cuando estas preguntas quedan sin respuesta demasiado tiempo, la motivación y el rendimiento empiezan a deshilacharse.</p>
     """},
    {"filename": "09_claridad_practicas.html", "title": "9. Claridad: prácticas",
     "content": """
        <p>La claridad se construye con prácticas concretas: escribir tus valores, definir el sentimiento que buscas, revisar tus objetivos y tu plan con regularidad. Tener un plan específico (cuándo y dónde harás algo) puede más que duplicar la probabilidad de lograr una meta difícil.</p>
        <h3>Automonitoreo</h3>
        <p>Una característica de los high performers es el automonitoreo rutinario: preguntarse una y otra vez si están en el camino correcto. No se limitan a fijar una misión una vez; buscan claridad una y otra vez según cambian los tiempos y los proyectos.</p>
        <div class="highlight-box">
            <strong>Herramienta:</strong> Diario de claridad. Dedica unos minutos a la semana a responder: ¿Quién quiero ser en este proyecto? ¿Qué sentimiento busco? ¿Qué es lo más importante ahora?
        </div>
        <p>Mayor claridad se asocia a mayor confianza, felicidad y asertividad en los estudios del High Performance Indicator.</p>
     """},
    {"filename": "10_habito_energia.html", "title": "10. Hábito 2: Generar energía",
     "content": """
        <p>Generar energía es mantener tu resistencia mental, tu energía física y tus emociones positivas de formas muy concretas. Sin energía, la claridad y la productividad se resienten. Los high performers cuidan activamente su bienestar: comen mejor, hacen más ejercicio y gestionan el estrés.</p>
        <h3>Energía física, emocional y mental</h3>
        <p>No es solo "dormir bien". Incluye movimiento, nutrición, recuperación, gestión del estrés y prácticas que generen emociones positivas (engagement, alegría, confianza). El 40% más de los high performers del top 5% hace ejercicio al menos tres veces por semana.</p>
        <div class="highlight-box">
            <strong>Principio:</strong> No puedes vencer las normas si te has llevado al límite. El éxito sostenido depende en gran parte de un enfoque saludable de la vida.
        </div>
        <p>La energía es el combustible que permite desplegar el resto de los hábitos. Sin ella, incluso el plan más claro se queda en papel.</p>
     """},
    {"filename": "11_energia_practicas.html", "title": "11. Energía: prácticas",
     "content": """
        <p>Prácticas concretas para generar energía: bloques de movimiento (caminar, estirar), pausas de recuperación, hidratación, límites con la tecnología, rituales matutinos que eleven el estado de ánimo y conexión social positiva. También importa cómo manejas el estrés y las emociones negativas.</p>
        <h3>Rutinas que recargan</h3>
        <p>Los high performers no esperan a estar agotados para descansar. Programan descanso, ejercicio y momentos de alegría. La idea es "generar" energía, no solo conservarla: actividades que te den más combustible mental y físico.</p>
        <div class="highlight-box">
            <strong>Acción:</strong> Identifica tres actividades que te recargan (física, emocional y mentalmente) e intégralas en tu semana de forma no negociable.
        </div>
        <p>Pequeños rituales diarios (respiración, gratitud, movimiento) pueden marcar una gran diferencia en tu nivel de energía sostenida.</p>
     """},
    {"filename": "12_habito_necesidad.html", "title": "12. Hábito 3: Elevar la necesidad",
     "content": """
        <p>Elevar la necesidad es activar las razones por las que <em>tienes</em> que rendir excepcionalmente. Esa necesidad surge de estándares internos (identidad, valores, expectativas de excelencia) y demandas externas (obligaciones sociales, competencia, compromisos públicos, plazos). Se trata de conocer tu "por qué" y avivar ese fuego.</p>
        <h3>Presión positiva</h3>
        <p>Los high performers no trabajan solo por dinero o trofeos; trabajan por significado. Sienten que "deben" aportar, que otros cuentan con ellos, que su identidad está en juego. Esa necesidad bien canalizada genera impulso y persistencia.</p>
        <div class="highlight-box">
            <strong>Pregunta:</strong> ¿Quién depende de que rindas al máximo? ¿Qué pasaría si no dieras lo mejor de ti? Conectar con esas respuestas eleva la necesidad de forma sana.
        </div>
        <p>La necesidad mal gestionada puede volverse ansiedad; bien gestionada, es el motor que te mantiene en acción.</p>
     """},
    {"filename": "13_necesidad_practicas.html", "title": "13. Necesidad: prácticas",
     "content": """
        <p>Prácticas para elevar la necesidad: definir identidad ("soy alguien que…"), hacer compromisos públicos con plazos, conectar tu trabajo con personas concretas que se benefician, revisar tus valores y estándares, y usar competencia sana como estímulo. La clave es que la necesidad esté alineada con lo que te importa, no con el miedo puro.</p>
        <h3>Comunidad y accountability</h3>
        <p>Contar con otras personas que esperan tu mejor versión (equipo, mentor, familia) aumenta la necesidad de forma positiva. Los high performers rodean su necesidad de significado, no solo de presión externa.</p>
        <div class="highlight-box">
            <strong>Ejercicio:</strong> Escribe tres razones por las que "debes" rendir bien en tu proyecto actual. Que sean razones que te inspiren, no que te aplasten.
        </div>
        <p>Cuando la necesidad está clara y es significativa, la procrastinación y la dispersión pierden fuerza.</p>
     """},
    {"filename": "14_habito_productividad.html", "title": "14. Hábito 4: Aumentar productividad",
     "content": """
        <p>Aumentar productividad no significa hacer más tareas; significa enfocarte en el <em>Prolific Quality Output</em> (PQO): producir más resultado de calidad que importe en tu área principal. Los high performers hacen más de lo que realmente importa en su campo; no necesariamente más cosas en general.</p>
        <h3>Lo principal es lo principal</h3>
        <p>"The main thing is to keep the main thing the main thing." Hay que minimizar distracciones (incluidas "oportunidades" que te desvían) y maximizar el tiempo y la atención en aquello que genera impacto en tu área de interés.</p>
        <div class="highlight-box">
            <strong>Definición:</strong> PQO = output prolífico y de calidad en el ámbito en el que quieres ser conocido y generar impacto.
        </div>
        <p>Productividad de alto rendimiento es elegir bien qué hacer y luego ejecutar con enfoque en eso.</p>
     """},
    {"filename": "15_productividad_practicas.html", "title": "15. Productividad PQO: prácticas",
     "content": """
        <p>Prácticas: definir tu "main thing" por temporada o proyecto, bloquear tiempo para PQO, decir no a lo que no es esencial, usar listas y sistemas que prioricen por impacto, revisar semanalmente si tu tiempo refleja tus prioridades. La productividad no es velocidad; es dirección correcta con consistencia.</p>
        <h3>Menos es más</h3>
        <p>Mucha gente hace muchas tareas y no avanza en lo que importa. Los high performers hacen menos cosas "genéricas" y más trabajo que cuenta en su área. Eso requiere claridad (saber qué es lo principal) y coraje (decir no al resto).</p>
        <div class="highlight-box">
            <strong>Pregunta semanal:</strong> ¿Qué tres resultados de calidad en mi área principal debo lograr esta semana? Todo lo demás sirve a eso o se pospone.
        </div>
        <p>La consistencia en el PQO es lo que separa a los que sobresalen a largo plazo de los que solo tienen picos ocasionales.</p>
     """},
    {"filename": "16_habito_influencia.html", "title": "16. Hábito 5: Desarrollar influencia",
     "content": """
        <p>Desarrollar influencia es conseguir que los demás crean en ti y apoyen tus esfuerzos y ambiciones. Sin una red de apoyo positiva, los logros grandes a largo plazo son casi imposibles. Los high performers son admirados incluso por quienes compiten con ellos porque el ego cede ante el servicio.</p>
        <h3>Influir sin manipular</h3>
        <p>La influencia de alto rendimiento hace que los demás se sientan respetados, valorados y apreciados. No se trata de imponer ni de convencer a cualquier costo; se trata de sumar valor, escuchar y hacer que otros quieran apoyarte. Los datos muestran que los high performers defienden a otros y apoyan las ideas de los demás con frecuencia.</p>
        <div class="highlight-box">
            <strong>Principio:</strong> Para llegar lejos necesitas que otros crean en ti. Eso se construye con integridad, generosidad y consistencia en el trato.
        </div>
        <p>La influencia es un hábito social: se desarrolla con práctica deliberada en cómo te comunicas, cómo apoyas y cómo generas confianza.</p>
     """},
    {"filename": "17_influencia_practicas.html", "title": "17. Influencia: prácticas",
     "content": """
        <p>Prácticas: escucha activa, reconocimiento genuino, cumplir promesas, dar crédito a otros, ser claro en expectativas, ofrecer ayuda antes de pedirla, construir relaciones a largo plazo. La influencia crece cuando la otra persona siente que gana algo (respeto, crecimiento, apoyo) al estar cerca de ti.</p>
        <h3>Liderazgo inclusivo</h3>
        <p>Los high performers suelen ser líderes directos e inclusivos: dicen lo que piensan y al mismo tiempo hacen espacio para las ideas de los demás. Hablan por otros y defienden iniciativas que no son suyas. Eso genera lealtad y colaboración.</p>
        <div class="highlight-box">
            <strong>Acción:</strong> Esta semana, identifica a una persona clave con la que quieres fortalecer la relación. Haz algo concreto que la valore o la ayude, sin pedir nada a cambio.
        </div>
        <p>La influencia no es popularidad; es credibilidad y conexión que se traduce en apoyo cuando más lo necesitas.</p>
     """},
    {"filename": "18_habito_coraje.html", "title": "18. Hábito 6: Demostrar coraje",
     "content": """
        <p>Demostrar coraje es expresar tus ideas, tomar acción audaz y defenderte a ti y a otros, incluso ante miedo, incertidumbre, amenaza o cambio. El coraje no es un acto ocasional; es un rasgo de elección y voluntad. Los high performers son asertivos por las razones correctas: para contribuir, no para dominar.</p>
        <h3>Coraje en lo cotidiano</h3>
        <p>No se trata solo de gestas heroicas. Se trata de hablar en reuniones, dar feedback difícil, probar algo nuevo, defender a un compañero o decir no cuando hace falta. El coraje es lo que permite que la claridad y la influencia se traduzcan en acción real.</p>
        <div class="highlight-box">
            <strong>Cita:</strong> "El coraje es la virtud que hace posibles todas las demás." Sin coraje, la productividad y la influencia se quedan en zona cómoda.
        </div>
        <p>Los high performers no carecen de miedo; actúan a pesar del miedo porque su propósito y su necesidad son mayores.</p>
     """},
    {"filename": "19_coraje_practicas.html", "title": "19. Coraje: prácticas",
     "content": """
        <p>Prácticas: identificar una conversación difícil que estés evitando y programarla, practicar decir tu opinión en contextos seguros, defender a alguien cuando sea justo, asumir un proyecto que te estire, revisar qué te detiene (miedo al rechazo, al fracaso) y cuestionar si ese costo es mayor que el de no actuar.</p>
        <h3>Pequeños actos de coraje</h3>
        <p>El coraje se construye con pequeños actos: hacer una pregunta en una reunión, pedir un aumento, dar una disculpa, intentar algo nuevo. Cada acto fortalece el siguiente. La clave es no esperar a "sentir" coraje; actuar y dejar que el sentimiento siga.</p>
        <div class="highlight-box">
            <strong>Pregunta:</strong> ¿Qué haría hoy si no tuviera miedo? Elige una acción concreta y hazla antes de que termine el día.
        </div>
        <p>El coraje deliberado es lo que convierte los otros cinco hábitos en resultados visibles en el mundo.</p>
     """},
    {"filename": "20_tres_trampas.html", "title": "20. Las tres trampas",
     "content": """
        <p>Burchard advierte sobre trampas que pueden hacer que te estanques o fracases incluso con buenos hábitos: (1) La trampa del ego: creer que ya lo tienes todo resuelto y dejar de aprender. (2) La trampa del éxito a cualquier costo: sacrificar salud y relaciones. (3) La trampa de la comodidad: dejar de estirarte cuando las cosas van bien.</p>
        <h3>Prevención</h3>
        <p>La certeza es enemiga del crecimiento. Quien está seguro de todo es quien más se cierra al aprendizaje y más vulnerable es a ser superado. Mantener humildad, equilibrio y voluntad de seguir desafiándote es parte del juego a largo plazo.</p>
        <div class="highlight-box">
            <strong>Recuerdo:</strong> El alto rendimiento no es un destino; es un camino. Las trampas aparecen cuando confundes un buen momento con "ya llegué".
        </div>
        <p>Revisar periódicamente si estás cayendo en alguna de estas trampas te mantiene en la pista correcta.</p>
     """},
    {"filename": "21_la_cosa_importante.html", "title": "21. La cosa más importante",
     "content": """
        <p>En todo el libro reaparece una idea: "The main thing is to keep the main thing the main thing." La cosa más importante es mantener lo más importante como lo más importante. En tu día, tu semana y tu vida, eso significa definir qué es "lo principal" y protegerlo de distracciones y de la urgencia.</p>
        <h3>Aplicación práctica</h3>
        <p>Sin claridad sobre tu "main thing", es fácil llenar el tiempo de tareas que no llevan a ningún lado. Con claridad, puedes decir no a lo secundario y sí a lo que realmente mueve la aguja. Los high performers toman decisiones (incluso dolorosas) para mantener el foco en lo principal.</p>
        <div class="highlight-box">
            <strong>Práctica:</strong> Cada mañana o cada lunes, escribe la única cosa que, si la logras, hará que el resto sea más fácil o irrelevante. Diseña tu día/semana alrededor de eso.
        </div>
        <p>Esta disciplina es lo que permite que la productividad sea verdaderamente de alto impacto.</p>
     """},
    {"filename": "22_un_habito_levanta.html", "title": "22. Un hábito levanta a los demás",
     "content": """
        <p>Los HP6 funcionan como meta-hábitos: cuando mejoras uno, sueles mejorar los demás. Si buscas más claridad, tomas mejores decisiones sobre energía y prioridades. Si generas más energía, tienes más capacidad para ser productivo y valiente. Si elevas la necesidad, te resulta más fácil mantener el foco y la influencia.</p>
        <h3>Efecto dominó</h3>
        <p>La investigación muestra que cada hábito predice la felicidad global: a mayor puntuación en cualquier hábito, mayores probabilidades de reportar felicidad. No tienes que ser perfecto en los seis a la vez; mejorar en uno ya empuja el resto.</p>
        <div class="highlight-box">
            <strong>Estrategia:</strong> Si no sabes por dónde empezar, haz el High Performance Indicator (HPI). El hábito en el que puntúes más bajo suele ser el mejor punto de partida.
        </div>
        <p>Un solo hábito mejorado puede cambiar tu trayectoria. No subestimes el poder de dominar uno primero.</p>
     """},
    {"filename": "23_permiso_crecer.html", "title": "23. Permiso para crecer",
     "content": """
        <p>Muchas personas no persiguen más éxito porque no se sienten merecedoras o esperan validación externa (ascenso, certificación, premio). Burchard es claro: no necesitas el permiso de nadie para jugar un juego más grande. Mereces un éxito extraordinario tanto como cualquier otro. Solo necesitas un plan, y ese plan está en este libro.</p>
        <h3>No minimices tus sueños</h3>
        <p>Puedes estar muy feliz con lo que tienes y aun así esforzarte por crecer y contribuir. No dejes que nadie te desanime con frases como "¿por qué no te conformas?". Está bien querer más. Lo importante es perseguirlo con más foco, elegancia y satisfacción que la última vez.</p>
        <div class="highlight-box">
            <strong>Mensaje:</strong> No esperes a sentirte "listo". La preparación viene del camino. Da permiso a ti mismo para crecer y contribuir al máximo.
        </div>
        <p>El permiso para crecer es algo que te das tú; no depende de que otros te lo otorguen.</p>
     """},
    {"filename": "24_resumen_guia.html", "title": "24. Resumen y guía",
     "content": """
        <p>Resumen ejecutivo de los HP6: (1) Busca claridad sobre quién ser, cómo relacionarte, qué quieres y qué te da significado. (2) Genera energía para mantener enfoque, esfuerzo y bienestar. (3) Eleva la necesidad conectando con tu "por qué" y con quienes dependen de ti. (4) Aumenta la productividad con PQO en tu área principal. (5) Desarrolla influencia para que otros crean en ti y te apoyen. (6) Demuestra coraje expresando ideas y actuando con audacia.</p>
        <h3>Siguiente paso</h3>
        <p>Haz el assessment en HighPerformanceIndicator.com si aún no lo has hecho. Luego elige un hábito para trabajar esta semana. Usa los juegos y actividades de este módulo para practicar. Vuelve al libro cuando necesites profundizar en un hábito concreto.</p>
        <div class="highlight-box">
            <strong>Recuerdo final:</strong> El alto rendimiento es tuyo si lo quieres. Una vida extraordinaria te espera. Solo tienes que aplicar los hábitos con intención y disciplina.
        </div>
        <p>Este resumen es tu guía rápida; el libro completo es tu mapa detallado para el largo plazo.</p>
     """},
    {"filename": "25_conclusion.html", "title": "25. Conclusión",
     "content": """
        <p>Has recorrido los seis hábitos de alto rendimiento y las ideas que los sostienen. Ya no tienes que preguntarte qué hace falta para rendir al máximo de forma sostenida: son claridad, energía, necesidad, productividad, influencia y coraje, desplegados de forma deliberada y constante.</p>
        <h3>Tu compromiso</h3>
        <p>Al final de este libro deberías poder decirte: "Por fin sé exactamente cómo estar consistentemente en mi mejor versión. Tengo confianza en mi capacidad para resolver las cosas y soy capaz de superar la adversidad en el camino al éxito, para el resto de mi vida." Eso es lo que ofrecen los HP6: un sistema mental estándar y un conjunto de hábitos probados.</p>
        <div class="highlight-box">
            <strong>Mensaje final:</strong> Con los hábitos correctos, cualquiera puede aumentar drásticamente sus resultados y convertirse en high performer en casi cualquier ámbito. La diferencia no es el talento; es la práctica. Sigue el camino de este libro y entra en una etapa muy transformadora de tu vida y carrera.
        </div>
        <p>Gracias por elegir crecer. El mundo necesita más personas que rindan al máximo, cuiden su bienestar e inspiren a otros a hacer lo mismo.</p>
     """},
]

for lesson in lessons:
    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{lesson['title']}</title>
    {css_style}
</head>
<body>
    <h1>{lesson['title']}</h1>
    {lesson['content']}
</body>
</html>"""
    with open(os.path.join(base_path, lesson['filename']), "w", encoding="utf-8") as f:
        f.write(html)

print("✅ 25 lecciones creadas para el libro 053 (High Performance Habits).")
