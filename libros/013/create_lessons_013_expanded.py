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
            line-height: 1.8;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 30px;
            background-color: #F0F8FF;
        }}
        h1 {{
            color: #005BAA;
            border-bottom: 3px solid #005BAA;
            padding-bottom: 15px;
            margin-bottom: 25px;
            font-size: 2.2em;
        }}
        h2 {{
            color: #142b47;
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 1.6em;
            border-left: 4px solid #005BAA;
            padding-left: 15px;
        }}
        h3 {{
            color: #005BAA;
            margin-top: 20px;
            font-size: 1.3em;
        }}
        p {{
            margin-bottom: 18px;
            text-align: justify;
        }}
        .highlight {{
            background-color: #e6f3ff;
            padding: 20px;
            border-left: 5px solid #005BAA;
            margin: 25px 0;
            border-radius: 6px;
        }}
        .quote {{
            background-color: #f8f9fa;
            border-left: 4px solid #142b47;
            padding: 15px 20px;
            margin: 20px 0;
            font-style: italic;
            color: #555;
        }}
        ul, ol {{
            margin-bottom: 20px;
            padding-left: 30px;
        }}
        li {{
            margin-bottom: 12px;
            line-height: 1.6;
        }}
        .key-concept {{
            font-weight: bold;
            color: #005BAA;
        }}
        .example {{
            background-color: #fff8e1;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #ffc107;
        }}
        .exercise {{
            background-color: #e8f5e9;
            padding: 20px;
            border-radius: 6px;
            margin: 25px 0;
            border-left: 4px solid #4caf50;
        }}
        .exercise h3 {{
            color: #2e7d32;
            margin-top: 0;
        }}
        strong {{
            color: #142b47;
        }}
    </style>
</head>
<body>
    <h1>{title}</h1>
    {content}
</body>
</html>"""

# Expanded Lesson Data
lessons = [
    {
        "filename": "01_introduccion.html",
        "title": "Introducción a los 7 Hábitos",
        "content": """
        <p>Bienvenidos al estudio profundo de "Los 7 Hábitos de la Gente Altamente Efectiva" de Stephen R. Covey. Este libro revolucionario, publicado en 1989, ha transformado la vida de millones de personas en todo el mundo. No es simplemente un manual de productividad o gestión del tiempo; es un enfoque holístico para desarrollar un carácter fuerte basado en principios universales.</p>
        
        <div class="highlight">
            <p><strong>Concepto Fundamental:</strong> Los hábitos son la intersección de tres elementos esenciales:</p>
            <ul>
                <li><strong>Conocimiento:</strong> Qué hacer y por qué hacerlo</li>
                <li><strong>Capacidad:</strong> Cómo hacerlo (habilidades)</li>
                <li><strong>Deseo:</strong> Querer hacerlo (motivación)</li>
            </ul>
            <p>Para crear un hábito efectivo, necesitamos los tres elementos trabajando juntos.</p>
        </div>

        <h2>El Enfoque de Adentro Hacia Afuera</h2>
        <p>Covey argumenta que para cambiar nuestra realidad externa, primero debemos cambiar nosotros mismos internamente. Y para cambiarnos a nosotros mismos de manera efectiva, primero debemos cambiar nuestras percepciones, nuestros paradigmas.</p>
        
        <p>Este enfoque contrasta radicalmente con la "Ética de la Personalidad" que dominó gran parte del siglo XX, la cual se enfocaba en técnicas superficiales de relaciones públicas, actitud mental positiva y trucos de comportamiento. En cambio, Covey nos invita a regresar a la "Ética del Carácter", que se basa en principios fundamentales como la integridad, la humildad, la fidelidad, la templanza, el coraje, la justicia, la paciencia y la diligencia.</p>

        <h2>El Continuo de Madurez</h2>
        <p>Los 7 Hábitos nos guían a través de un continuo de madurez que va desde la dependencia hasta la interdependencia:</p>
        
        <ul>
            <li><strong>Dependencia:</strong> El paradigma del "Tú". Tú cuidas de mí. Tú eres responsable de los resultados. Es la mentalidad de la víctima.</li>
            <li><strong>Independencia:</strong> El paradigma del "Yo". Yo puedo hacerlo. Yo soy responsable. Yo me basto a mí mismo. Los Hábitos 1, 2 y 3 nos llevan a la independencia.</li>
            <li><strong>Interdependencia:</strong> El paradigma del "Nosotros". Nosotros podemos hacerlo. Nosotros podemos cooperar. Nosotros podemos combinar nuestros talentos y habilidades para crear algo más grande. Los Hábitos 4, 5 y 6 nos llevan a la interdependencia.</li>
        </ul>

        <div class="quote">
            "La interdependencia es una elección que solo las personas independientes pueden hacer. Las personas dependientes no pueden elegir convertirse en interdependientes. No tienen el carácter para hacerlo."
        </div>

        <h2>El Hábito de la Renovación</h2>
        <p>El Hábito 7, "Afilar la Sierra", es el hábito de la renovación que rodea y alimenta a todos los demás. Es el hábito que hace posible todos los otros hábitos al renovar las cuatro dimensiones de nuestra naturaleza: física, espiritual, mental y social/emocional.</p>

        <div class="exercise">
            <h3>Reflexión Inicial</h3>
            <p>Antes de continuar, tómate un momento para reflexionar:</p>
            <ul>
                <li>¿En qué punto del continuo de madurez te encuentras actualmente?</li>
                <li>¿Qué áreas de tu vida están funcionando bien?</li>
                <li>¿Qué áreas necesitan mejora?</li>
                <li>¿Estás listo para comprometerte con un cambio real y duradero?</li>
            </ul>
        </div>

        <h2>El Poder del Cambio Basado en Principios</h2>
        <p>Los principios son leyes naturales que gobiernan las consecuencias humanas. Son parte de la condición humana, de la conciencia humana, del conocimiento humano. Son verdades profundas, fundamentales, de aplicación universal. Se aplican a los individuos, a las familias, a las organizaciones y a las civilizaciones.</p>
        
        <p>Cuando alineamos nuestros hábitos con estos principios universales, experimentamos un crecimiento real y sostenible. No estamos buscando soluciones rápidas o trucos superficiales, sino un cambio fundamental en nuestro carácter y en nuestra forma de ver el mundo.</p>

        <div class="highlight">
            <p><strong>Compromiso Personal:</strong> Este curso requiere más que lectura pasiva. Requiere introspección honesta, práctica diligente y paciencia con uno mismo. El cambio real toma tiempo, pero los resultados son transformadores y permanentes.</p>
        </div>
        """
    },
    {
        "filename": "02_paradigmas_principios.html",
        "title": "Paradigmas y Principios",
        "content": """
        <p>Un paradigma es la forma en que "vemos" el mundo, no en términos de nuestro sentido de la vista, sino en términos de percepción, comprensión e interpretación. Es como un mapa del territorio, una teoría, una explicación o un modelo de algo.</p>

        <h2>El Poder de un Cambio de Paradigma</h2>
        <p>Supongamos que estás en el metro de Nueva York. Es domingo por la mañana, hay poca gente, algunos están leyendo el periódico, otros descansando con los ojos cerrados. Es una escena tranquila y pacífica.</p>
        
        <p>De repente, un hombre y sus hijos suben al vagón. Los niños son tan ruidosos y revoltosos que instantáneamente cambia todo el clima. El hombre se sienta junto a ti y cierra los ojos, aparentemente ajeno a la situación. Los niños están gritando, arrojando cosas, incluso agarrando los periódicos de la gente. Es muy molesto.</p>
        
        <p>No puedes creer que pueda ser tan insensible como para dejar que sus hijos corran salvajemente sin hacer nada al respecto. Finalmente, con lo que sientes que es una paciencia y contención inusuales, te vuelves hacia él y dices: "Señor, sus hijos están molestando a mucha gente. Me pregunto si podría controlarlos un poco más".</p>
        
        <p>El hombre levanta la vista como si tomara conciencia de la situación por primera vez y dice suavemente: "Oh, tiene razón. Supongo que debería hacer algo al respecto. Acabamos de venir del hospital donde su madre murió hace aproximadamente una hora. No sé qué pensar, y supongo que ellos tampoco saben cómo manejarlo".</p>

        <div class="highlight">
            <p><strong>¿Puedes imaginar lo que sentiste en ese momento?</strong> Tu paradigma cambió. De repente ves las cosas de manera diferente, y porque ves las cosas de manera diferente, piensas de manera diferente, sientes de manera diferente, te comportas de manera diferente. Tu irritación desaparece. Ya no necesitas controlar tu actitud o tu comportamiento; tu corazón está lleno de compasión.</p>
        </div>

        <h2>Paradigmas y Principios</h2>
        <p>Los paradigmas son poderosos porque crean los lentes a través de los cuales vemos el mundo. Si quieres hacer cambios menores en tu vida, trabaja en tu comportamiento o actitud. Pero si quieres hacer cambios significativos, cuánticos, trabaja en tus paradigmas.</p>

        <h3>Principios Universales</h3>
        <p>A diferencia de los paradigmas, que pueden ser subjetivos y variar de persona a persona, los principios son objetivos y externos. Operan independientemente de nuestra conciencia de ellos o de nuestra aceptación de ellos.</p>

        <div class="example">
            <h3>Ejemplos de Principios Universales:</h3>
            <ul>
                <li><strong>Equidad:</strong> El sentido de justicia y equidad es universal</li>
                <li><strong>Integridad:</strong> La honestidad crea confianza</li>
                <li><strong>Dignidad humana:</strong> Todas las personas tienen valor inherente</li>
                <li><strong>Servicio:</strong> Contribuir es más satisfactorio que solo recibir</li>
                <li><strong>Calidad:</strong> La excelencia produce mejores resultados</li>
                <li><strong>Potencial:</strong> Los seres humanos tienen capacidad de crecimiento</li>
                <li><strong>Crecimiento:</strong> El desarrollo es un proceso continuo</li>
            </ul>
        </div>

        <h2>La Diferencia Entre Valores y Principios</h2>
        <p>Es importante distinguir entre valores y principios. Los valores son mapas; los principios son territorios. Podemos valorar cosas que no están alineadas con principios correctos, pero las consecuencias naturales seguirán operando.</p>
        
        <p>Por ejemplo, una persona puede valorar la riqueza material por encima de todo, pero si obtiene esa riqueza violando principios de honestidad e integridad, eventualmente enfrentará consecuencias negativas, ya sea en forma de problemas legales, relaciones rotas o falta de paz interior.</p>

        <h2>Paradigmas Correctos e Incorrectos</h2>
        <p>Nuestros paradigmas pueden estar correctos o incorrectos, completos o incompletos. Y en la medida en que nuestros mapas sean incorrectos, nuestros esfuerzos por llegar a donde queremos ir serán inefectivos.</p>

        <div class="quote">
            "Podemos pasar semanas, meses, incluso años culpando a nuestras circunstancias, a otras personas o a nuestra mala suerte. Pero hasta que no cambiemos nuestros paradigmas fundamentales, seguiremos experimentando los mismos problemas."
        </div>

        <h2>El Cambio de Paradigma y los 7 Hábitos</h2>
        <p>Los 7 Hábitos representan un cambio de paradigma completo. Nos invitan a ver:</p>
        
        <ul>
            <li>La efectividad no como una cuestión de técnicas, sino de principios</li>
            <li>El éxito no como algo externo, sino como algo que fluye desde adentro</li>
            <li>Las relaciones no como transacciones, sino como cuentas bancarias emocionales</li>
            <li>La comunicación no como hablar, sino como escuchar primero</li>
            <li>Las diferencias no como amenazas, sino como oportunidades para la sinergia</li>
            <li>El tiempo no como algo a administrar, sino como vida a vivir con propósito</li>
        </ul>

        <div class="exercise">
            <h3>Ejercicio de Reflexión</h3>
            <p>Identifica un área de tu vida donde estés experimentando frustración o falta de progreso:</p>
            <ol>
                <li>¿Cuál es tu paradigma actual sobre esta situación?</li>
                <li>¿Qué principios universales podrían estar en juego?</li>
                <li>¿Cómo cambiaría tu perspectiva si vieras la situación a través de un paradigma diferente?</li>
                <li>¿Qué acciones diferentes tomarías con este nuevo paradigma?</li>
            </ol>
        </div>

        <h2>La Importancia de la Humildad</h2>
        <p>Reconocer que nuestros paradigmas pueden estar equivocados requiere humildad. Requiere admitir que no lo sabemos todo, que nuestra forma de ver las cosas puede no ser la única forma correcta, o incluso puede estar completamente equivocada.</p>
        
        <p>Esta humildad es el primer paso hacia el crecimiento real. Cuando estamos abiertos a cuestionar nuestros paradigmas, estamos abiertos al aprendizaje, al cambio y a la mejora continua.</p>
        """
    },
    {
        "filename": "03_de_adentro_hacia_afuera.html",
        "title": "De Adentro Hacia Afuera",
        "content": """
        <p>El enfoque "de adentro hacia afuera" significa empezar por uno mismo. Más fundamentalmente, empezar con la parte más interior de uno mismo: con los paradigmas, el carácter y los motivos. Este es un cambio radical de perspectiva en una cultura que constantemente nos dice que busquemos soluciones externas a nuestros problemas internos.</p>

        <h2>La Ética del Carácter vs. La Ética de la Personalidad</h2>
        <p>Covey realizó un estudio exhaustivo de la literatura de éxito publicada en Estados Unidos desde 1776. Descubrió un patrón fascinante: durante los primeros 150 años, casi toda la literatura se centraba en lo que él llama la "Ética del Carácter" como fundamento del éxito.</p>

        <h3>La Ética del Carácter (1776-1926)</h3>
        <p>Esta literatura enseñaba que existen principios básicos de vida efectiva, y que las personas solo pueden experimentar el verdadero éxito y la felicidad duradera cuando aprenden e integran estos principios en su carácter básico.</p>

        <div class="example">
            <h3>Cualidades de la Ética del Carácter:</h3>
            <ul>
                <li><strong>Integridad:</strong> Ser honesto y tener principios morales fuertes</li>
                <li><strong>Humildad:</strong> Reconocer nuestras limitaciones y estar abiertos al aprendizaje</li>
                <li><strong>Fidelidad:</strong> Ser leal y cumplir nuestros compromisos</li>
                <li><strong>Templanza:</strong> Moderación y autocontrol</li>
                <li><strong>Coraje:</strong> Valentía para hacer lo correcto</li>
                <li><strong>Justicia:</strong> Tratar a todos con equidad</li>
                <li><strong>Paciencia:</strong> Tolerancia y perseverancia</li>
                <li><strong>Diligencia:</strong> Trabajo arduo y cuidadoso</li>
                <li><strong>Simplicidad:</strong> Vivir sin pretensiones</li>
                <li><strong>Modestia:</strong> No ser arrogante ni presumido</li>
            </ul>
        </div>

        <h3>La Ética de la Personalidad (1926-presente)</h3>
        <p>Poco después de la Primera Guerra Mundial, la forma básica de ver el éxito cambió de la Ética del Carácter a lo que Covey llama la "Ética de la Personalidad". El éxito se convirtió más en una función de la personalidad, de la imagen pública, de las actitudes y comportamientos, habilidades y técnicas que lubrican los procesos de la interacción humana.</p>

        <div class="highlight">
            <p><strong>El Problema con la Ética de la Personalidad:</strong> Aunque algunas de estas técnicas pueden producir resultados a corto plazo, son soluciones superficiales a problemas profundos y crónicos. Son como poner una curita en un cáncer. No abordan las causas fundamentales.</p>
        </div>

        <h2>Las Victorias Privadas Preceden a las Victorias Públicas</h2>
        <p>Uno de los conceptos más poderosos del enfoque de adentro hacia afuera es que no puedes tener éxito con otras personas si no has pagado el precio del éxito contigo mismo primero.</p>

        <div class="quote">
            "Si quiero mejorar mi matrimonio, debo trabajar en mí mismo. Si quiero ser un mejor padre, debo trabajar en mi propio carácter. Si quiero tener más libertad y autonomía en el trabajo, debo ser más responsable y digno de confianza."
        </div>

        <h2>El Concepto de "Adentro Hacia Afuera"</h2>
        <p>El enfoque de adentro hacia afuera dice que las victorias privadas preceden a las victorias públicas. Dice que hacer y cumplir promesas a nosotros mismos precede a hacer y cumplir promesas a otros. Dice que no podemos cambiar a otros; solo podemos cambiarnos a nosotros mismos.</p>

        <h3>¿Qué Significa en la Práctica?</h3>
        <ul>
            <li><strong>En las relaciones:</strong> En lugar de tratar de cambiar a tu cónyuge, trabaja en ser más amoroso, comprensivo y paciente tú mismo</li>
            <li><strong>En el trabajo:</strong> En lugar de culpar a tu jefe o a tus colegas, enfócate en ser más proactivo, responsable y efectivo</li>
            <li><strong>En la familia:</strong> En lugar de intentar controlar a tus hijos, modela el comportamiento que deseas ver en ellos</li>
            <li><strong>En la sociedad:</strong> En lugar de esperar que el mundo cambie, sé el cambio que quieres ver</li>
        </ul>

        <h2>El Espejo Social vs. El Espejo de los Principios</h2>
        <p>La Ética de la Personalidad nos hace mirar en el "espejo social" - las opiniones, percepciones y paradigmas de las personas que nos rodean. Este espejo es distorsionado y cambiante. Nos da una imagen fragmentada y desconectada de nosotros mismos.</p>

        <p>El enfoque de adentro hacia afuera nos invita a mirarnos en el "espejo de los principios" - verdades universales y atemporales que nos dan una imagen clara y precisa de quiénes somos realmente y quiénes podemos llegar a ser.</p>

        <div class="example">
            <h3>Ejemplo: El Hijo con Bajo Rendimiento</h3>
            <p>Imagina que tienes un hijo que no está rindiendo bien en la escuela. El enfoque de afuera hacia adentro diría: "¿Qué puedo hacer para arreglar a mi hijo? ¿Qué técnicas puedo usar? ¿Qué recompensas o castigos funcionarán?"</p>
            
            <p>El enfoque de adentro hacia afuera pregunta: "¿Qué hay en mí que contribuye a este problema? ¿Estoy siendo un buen modelo? ¿Estoy creando un ambiente en el hogar que fomente el aprendizaje? ¿Estoy realmente escuchando a mi hijo y entendiendo sus desafíos?"</p>
        </div>

        <h2>La Cuenta Bancaria Personal</h2>
        <p>Antes de poder hacer depósitos en las cuentas bancarias emocionales de otros (Hábitos 4, 5 y 6), necesitamos hacer depósitos en nuestra propia cuenta bancaria personal (Hábitos 1, 2 y 3).</p>

        <p>Estos depósitos incluyen:</p>
        <ul>
            <li>Cumplir promesas que nos hacemos a nosotros mismos</li>
            <li>Hacer pequeñas cosas amables por nosotros mismos</li>
            <li>Ser honestos con nosotros mismos</li>
            <li>Renovarnos en las cuatro dimensiones de nuestra naturaleza</li>
            <li>Vivir de acuerdo con nuestros valores más profundos</li>
        </ul>

        <div class="exercise">
            <h3>Autoevaluación: ¿Adentro Hacia Afuera o Afuera Hacia Adentro?</h3>
            <p>Para cada situación, identifica si tu respuesta típica es de adentro hacia afuera o de afuera hacia adentro:</p>
            <ol>
                <li>Cuando tienes un conflicto con alguien, ¿tu primer pensamiento es sobre lo que la otra persona hizo mal o sobre cómo podrías haber contribuido al problema?</li>
                <li>Cuando no logras un objetivo, ¿culpas a las circunstancias externas o examinas tus propias acciones y decisiones?</li>
                <li>Cuando quieres mejorar una relación, ¿esperas que la otra persona cambie primero o trabajas en ti mismo?</li>
                <li>Cuando enfrentas un desafío, ¿buscas soluciones rápidas externas o trabajas en desarrollar las capacidades internas necesarias?</li>
            </ol>
        </div>

        <h2>El Cambio Real Requiere Tiempo</h2>
        <p>El enfoque de adentro hacia afuera no ofrece soluciones rápidas. Requiere paciencia, persistencia y fe en el proceso. Pero los resultados son profundos y duraderos. Cuando cambiamos desde adentro, ese cambio se irradia hacia afuera, afectando todas nuestras relaciones y circunstancias.</p>

        <div class="highlight">
            <p><strong>Recuerda:</strong> No puedes hablar de lo que no tienes. No puedes dar lo que no posees. Las victorias privadas de carácter y competencia deben preceder a las victorias públicas de relaciones efectivas y contribución significativa.</p>
        </div>
        """
    },
    {
        "filename": "04_panorama_general.html",
        "title": "Panorama General de los 7 Hábitos",
        "content": """
        <p>Los 7 Hábitos no son una lista de tareas aisladas o técnicas independientes. Son un enfoque secuencial, integrado y sinérgico para el desarrollo de la efectividad personal e interpersonal. Cada hábito se construye sobre el anterior, creando un marco completo para vivir una vida equilibrada, integrada y poderosa.</p>

        <h2>La Secuencia del Desarrollo: El Continuo de Madurez</h2>
        <p>Los 7 Hábitos nos mueven progresivamente a través de tres niveles de madurez:</p>

        <h3>1. Dependencia: El Paradigma del "Tú"</h3>
        <p>Las personas dependientes necesitan que otros obtengan lo que quieren. El paradigma de la dependencia es "Tú": tú cuidas de mí; tú no lo lograste; te culpo a ti por los resultados.</p>

        <div class="example">
            <h3>Características de la Dependencia:</h3>
            <ul>
                <li>Mentalidad de víctima: "No es mi culpa"</li>
                <li>Necesidad de aprobación externa constante</li>
                <li>Culpar a otros por los problemas</li>
                <li>Esperar que otros resuelvan los problemas</li>
                <li>Falta de iniciativa personal</li>
                <li>Sentimientos de impotencia</li>
            </ul>
        </div>

        <h3>2. Independencia: El Paradigma del "Yo"</h3>
        <p>Las personas independientes obtienen lo que quieren a través de su propio esfuerzo. El paradigma de la independencia es "Yo": yo puedo hacerlo; yo soy responsable; yo me basto a mí mismo; yo puedo elegir.</p>

        <div class="highlight">
            <p><strong>Los Hábitos 1, 2 y 3 - La Victoria Privada:</strong> Estos tres primeros hábitos nos llevan de la dependencia a la independencia. Son las victorias privadas, los logros personales que nos hacen dueños de nosotros mismos.</p>
            <ul>
                <li><strong>Hábito 1: Ser Proactivo</strong> - Tú eres el creador</li>
                <li><strong>Hábito 2: Comenzar con el Fin en Mente</strong> - La primera creación mental</li>
                <li><strong>Hábito 3: Poner Primero lo Primero</strong> - La segunda creación física</li>
            </ul>
        </div>

        <h3>3. Interdependencia: El Paradigma del "Nosotros"</h3>
        <p>Las personas interdependientes combinan sus propios esfuerzos con los esfuerzos de otros para lograr su mayor éxito. El paradigma de la interdependencia es "Nosotros": nosotros podemos hacerlo; nosotros podemos cooperar; nosotros podemos combinar nuestros talentos y habilidades para crear algo más grande.</p>

        <div class="highlight">
            <p><strong>Los Hábitos 4, 5 y 6 - La Victoria Pública:</strong> Estos tres hábitos nos llevan de la independencia a la interdependencia. Son las victorias públicas, los logros en nuestras relaciones con otros.</p>
            <ul>
                <li><strong>Hábito 4: Pensar Ganar-Ganar</strong> - Beneficio mutuo</li>
                <li><strong>Hábito 5: Buscar Primero Entender, Luego Ser Entendido</strong> - Comunicación empática</li>
                <li><strong>Hábito 6: Sinergizar</strong> - Cooperación creativa</li>
            </ul>
        </div>

        <h2>El Hábito 7: La Renovación Continua</h2>
        <p>El Hábito 7, "Afilar la Sierra", rodea y sostiene todos los demás hábitos. Es el hábito de la renovación en las cuatro dimensiones de nuestra naturaleza: física, espiritual, mental y social/emocional.</p>

        <div class="quote">
            "El Hábito 7 es dedicar tiempo a afilar la sierra. Preserva y realza el mayor bien que posees: tú mismo. Renueva las cuatro dimensiones de tu naturaleza: física, espiritual, mental y social/emocional."
        </div>

        <h2>La Efectividad Definida</h2>
        <p>Covey define la efectividad como el equilibrio entre la producción (P) y la capacidad de producción (CP). Esta es la esencia de la fábula de Esopo sobre la gallina de los huevos de oro.</p>

        <div class="example">
            <h3>La Fábula de la Gallina de los Huevos de Oro</h3>
            <p>Un granjero pobre descubre un día que su gallina ha puesto un huevo de oro macizo. Al principio piensa que es una broma, pero decide llevarlo a un tasador y descubre que el huevo es oro puro. El granjero no puede creer su buena fortuna.</p>
            
            <p>Cada mañana, la gallina pone otro huevo de oro. El granjero se vuelve rico. Pero también se vuelve codicioso e impaciente. Incapaz de esperar día tras día los huevos de oro, decide matar a la gallina y obtener todos los huevos de una vez. Pero cuando abre la gallina, la encuentra vacía. No hay más huevos de oro, y ahora no hay forma de obtener más. El granjero ha destruido la gallina que producía los huevos de oro.</p>
        </div>

        <h3>Aplicando P/CP a los 7 Hábitos</h3>
        <ul>
            <li><strong>Hábito 1:</strong> Desarrolla tu capacidad de respuesta (CP) para producir resultados proactivos (P)</li>
            <li><strong>Hábito 2:</strong> Crea una visión clara (CP) que guíe tus acciones diarias (P)</li>
            <li><strong>Hábito 3:</strong> Desarrolla disciplina (CP) para ejecutar tus prioridades (P)</li>
            <li><strong>Hábito 4:</strong> Construye relaciones de confianza (CP) que producen resultados mutuamente beneficiosos (P)</li>
            <li><strong>Hábito 5:</strong> Desarrolla habilidades de comunicación empática (CP) que producen entendimiento mutuo (P)</li>
            <li><strong>Hábito 6:</strong> Cultiva la valoración de diferencias (CP) que produce soluciones creativas (P)</li>
            <li><strong>Hábito 7:</strong> Renueva tus cuatro dimensiones (CP) para mantener y mejorar todos los otros hábitos (P)</li>
        </ul>

        <h2>La Interdependencia es una Elección</h2>
        <p>Es importante entender que la interdependencia es una elección que solo las personas independientes pueden hacer. Si eres dependiente, no puedes elegir ser interdependiente. No tienes el carácter para hacerlo; no eres dueño de ti mismo.</p>

        <div class="highlight">
            <p><strong>Por eso la secuencia importa:</strong> Primero debes lograr la independencia (Hábitos 1-3) antes de poder lograr verdadera interdependencia (Hábitos 4-6). Intentar construir relaciones interdependientes desde una posición de dependencia solo crea codependencia, no interdependencia saludable.</p>
        </div>

        <h2>El Mapa Completo</h2>
        <p>Visualiza los 7 Hábitos como un mapa completo para la efectividad:</p>

        <div class="example">
            <h3>La Estructura Completa:</h3>
            <p><strong>FUNDAMENTO: Paradigmas y Principios</strong></p>
            <p><strong>VICTORIA PRIVADA (Independencia):</strong></p>
            <ul>
                <li>Hábito 1: Ser Proactivo (Autoconciencia, responsabilidad)</li>
                <li>Hábito 2: Comenzar con el Fin en Mente (Imaginación, conciencia moral)</li>
                <li>Hábito 3: Poner Primero lo Primero (Voluntad, disciplina)</li>
            </ul>
            
            <p><strong>VICTORIA PÚBLICA (Interdependencia):</strong></p>
            <ul>
                <li>Hábito 4: Pensar Ganar-Ganar (Mentalidad de abundancia)</li>
                <li>Hábito 5: Buscar Primero Entender (Empatía, escucha)</li>
                <li>Hábito 6: Sinergizar (Creatividad, cooperación)</li>
            </ul>
            
            <p><strong>RENOVACIÓN CONTINUA:</strong></p>
            <ul>
                <li>Hábito 7: Afilar la Sierra (Mejora continua en las 4 dimensiones)</li>
            </ul>
        </div>

        <div class="exercise">
            <h3>Autoevaluación: ¿Dónde Estás en el Continuo?</h3>
            <p>Evalúa honestamente dónde te encuentras actualmente:</p>
            <ol>
                <li><strong>Dependencia:</strong> ¿En qué áreas de tu vida todavía culpas a otros o esperas que otros resuelvan tus problemas?</li>
                <li><strong>Independencia:</strong> ¿En qué áreas has logrado autodominio y responsabilidad personal?</li>
                <li><strong>Interdependencia:</strong> ¿En qué áreas colaboras efectivamente con otros para crear resultados sinérgicos?</li>
            </ol>
            <p>Recuerda: El objetivo no es juzgarte, sino tener claridad sobre dónde estás para saber hacia dónde necesitas crecer.</p>
        </div>

        <h2>El Compromiso con el Proceso</h2>
        <p>Desarrollar los 7 Hábitos es un proceso de toda la vida. No es algo que haces una vez y terminas. Es un viaje continuo de crecimiento, aprendizaje y mejora. Requiere paciencia, persistencia y fe en el proceso.</p>

        <p>Pero los resultados valen la pena. Cuando vives los 7 Hábitos, experimentas:</p>
        <ul>
            <li>Mayor paz interior y confianza en ti mismo</li>
            <li>Relaciones más profundas y significativas</li>
            <li>Mayor efectividad en el logro de tus metas</li>
            <li>Un sentido de propósito y contribución</li>
            <li>Equilibrio en todas las áreas de tu vida</li>
            <li>La capacidad de influir positivamente en otros</li>
        </ul>
        """
    },
    {
        "filename": "05_habito_1_ser_proactivo.html",
        "title": "Hábito 1: Ser Proactivo - Conceptos Básicos",
        "content": """
        <p>Ser proactivo es más que simplemente tomar la iniciativa. Significa que, como seres humanos, somos responsables de nuestras propias vidas. Nuestra conducta es una función de nuestras decisiones, no de nuestras condiciones. Tenemos la iniciativa y la responsabilidad de hacer que las cosas sucedan.</p>

        <h2>El Concepto de Proactividad</h2>
        <p>La palabra "responsabilidad" puede dividirse en "respuesta" y "habilidad": la habilidad para elegir nuestra respuesta. Las personas altamente proactivas reconocen esa responsabilidad. No culpan a las circunstancias, las condiciones o el condicionamiento por su comportamiento. Su comportamiento es un producto de su propia elección consciente, basada en valores, en lugar de un producto de sus condiciones, basado en sentimientos.</p>

        <div class="highlight">
            <p><strong>El Principio Fundamental:</strong> Entre el estímulo y la respuesta, el ser humano tiene la libertad interior de elegir. Esta es la esencia de la proactividad y lo que nos distingue de los animales.</p>
        </div>

        <h2>Las Cuatro Dotaciones Humanas Únicas</h2>
        <p>Viktor Frankl, psiquiatra judío que sobrevivió a los campos de concentración nazis, descubrió un principio fundamental de la naturaleza humana: entre el estímulo y la respuesta, el ser humano tiene la libertad de elegir. Identificó cuatro dotaciones humanas únicas que nos dan esta libertad:</p>

        <div class="example">
            <h3>Las 4 Dotaciones Humanas:</h3>
            <ol>
                <li><strong>Autoconciencia:</strong> La capacidad de pensar sobre nuestros propios procesos de pensamiento. Podemos observarnos a nosotros mismos y evaluar nuestras experiencias.</li>
                <li><strong>Imaginación:</strong> La capacidad de crear en nuestras mentes más allá de nuestra realidad presente. Podemos visualizar futuros alternativos.</li>
                <li><strong>Conciencia Moral:</strong> Una profunda conciencia interior de lo correcto e incorrecto, de los principios que gobiernan nuestro comportamiento.</li>
                <li><strong>Voluntad Independiente:</strong> La capacidad de actuar basándonos en nuestra autoconciencia, libre de todas las demás influencias.</li>
            </ol>
        </div>

        <h2>Lenguaje Reactivo vs. Lenguaje Proactivo</h2>
        <p>Una de las formas más fáciles de determinar si somos proactivos o reactivos es observar nuestro lenguaje. El lenguaje reactivo nos absuelve de responsabilidad.</p>

        <div class="example">
            <h3>Comparación de Lenguajes:</h3>
            <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background-color: #142b47; color: white;">
                    <th style="padding: 10px; border: 1px solid #ddd;">Lenguaje Reactivo</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Lenguaje Proactivo</th>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">No puedo hacer nada</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Veamos nuestras alternativas</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                    <td style="padding: 10px; border: 1px solid #ddd;">Yo soy así</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Puedo elegir un enfoque diferente</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Me vuelve loco</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Controlo mis sentimientos</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                    <td style="padding: 10px; border: 1px solid #ddd;">No me dejan</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Puedo crear una presentación efectiva</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Tengo que hacer eso</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Elegiré una respuesta apropiada</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                    <td style="padding: 10px; border: 1px solid #ddd;">No puedo</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Elijo</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Debo</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Prefiero</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                    <td style="padding: 10px; border: 1px solid #ddd;">Si tan solo...</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Haré</td>
                </tr>
            </table>
        </div>

        <h2>Los Tres Determinismos</h2>
        <p>Muchas personas están profundamente condicionadas por tres mapas deterministas que les dicen que no son responsables, que no tienen control:</p>

        <h3>1. Determinismo Genético</h3>
        <p>Dice que tus abuelos lo hicieron a ti. Por eso tienes mal genio. Tus abuelos tenían mal genio y está en tu ADN. Pasó de generación en generación y tú lo heredaste. Además, eres irlandés, y eso es lo que hacen los irlandeses.</p>

        <h3>2. Determinismo Psíquico</h3>
        <p>Dice que tus padres lo hicieron a ti. Tu crianza, tus experiencias de infancia establecieron esencialmente tu tendencia personal y la estructura de tu carácter. Por eso tienes miedo de estar frente a un grupo. Así es como te criaron tus padres. Te sientes terriblemente culpable si cometes un error porque en lo profundo de tu memoria está el recuerdo emocional de la profunda vergüenza que experimentaste cuando eras muy vulnerable y tierno.</p>

        <h3>3. Determinismo Ambiental</h3>
        <p>Dice que tu jefe lo está haciendo a ti, o tu cónyuge, o ese hijo adolescente, o tu situación económica, o las políticas nacionales. Alguien o algo en tu entorno es responsable de tu situación.</p>

        <div class="highlight">
            <p><strong>La Verdad Proactiva:</strong> Aunque estos factores pueden influirnos, no nos determinan. Entre el estímulo y la respuesta está nuestra libertad de elegir. La proactividad dice: "Soy lo que soy hoy por las elecciones que hice ayer. Elijo cómo me afectarán las circunstancias."</p>
        </div>

        <h2>La Historia de Viktor Frankl</h2>
        <p>Viktor Frankl era un psiquiatra judío que sobrevivió a los campos de muerte nazis. Su esposa, su padre, su madre y su hermano murieron en los campos o en las cámaras de gas. Excepto por su hermana, toda su familia pereció.</p>

        <p>Frankl mismo sufrió torturas y numerosas indignidades, nunca sabiendo de un momento a otro si su camino lo llevaría a las cámaras de gas o si estaría entre los "salvados" que serían enviados a trabajar ese día.</p>

        <p>Un día, desnudo y solo en una pequeña habitación, comenzó a tomar conciencia de lo que más tarde llamaría "la última de las libertades humanas" - la libertad que sus captores nazis no podían quitarle. Ellos podían controlar todo su entorno, podían hacer lo que quisieran con su cuerpo, pero Viktor Frankl mismo era un ser autoconsciente capaz de observarse a sí mismo. Su identidad básica estaba intacta. Podía decidir dentro de sí mismo cómo todo aquello iba a afectarlo.</p>

        <div class="quote">
            "Entre el estímulo y la respuesta hay un espacio. En ese espacio está nuestro poder de elegir nuestra respuesta. En nuestra respuesta yace nuestro crecimiento y nuestra libertad." - Viktor Frankl
        </div>

        <h2>Tomar la Iniciativa</h2>
        <p>Nuestra naturaleza básica es actuar, no ser actuados. Esto nos capacita para elegir nuestra respuesta a circunstancias particulares. Tomar la iniciativa no significa ser insistente, molesto o agresivo. Significa reconocer nuestra responsabilidad de hacer que las cosas sucedan.</p>

        <div class="example">
            <h3>Ejemplo: El Estudiante Proactivo</h3>
            <p>Muchos esperan que algo suceda o que alguien cuide de ellos. Pero las personas que terminan con los buenos trabajos son las proactivas que son soluciones a problemas, no problemas ellos mismos, que aprovechan la oportunidad para hacer lo que sea necesario, consistente con principios correctos, para hacer el trabajo.</p>
            
            <p>Un estudiante proactivo no espera a que el profesor le diga exactamente qué hacer. Lee el programa, identifica los recursos necesarios, hace preguntas inteligentes y toma la iniciativa en su propio aprendizaje.</p>
        </div>

        <h2>Escuchando Nuestro Lenguaje</h2>
        <p>El lenguaje de las personas reactivas las absuelve de responsabilidad. "No soy responsable. No puedo elegir mi respuesta."</p>

        <div class="exercise">
            <h3>Ejercicio: Transforma Tu Lenguaje</h3>
            <p>Durante los próximos 30 días, presta atención a tu lenguaje y al lenguaje de las personas que te rodean. ¿Con qué frecuencia usas y escuchas frases reactivas?</p>
            
            <p>Cuando te descubras usando lenguaje reactivo, detente y reformula la afirmación en lenguaje proactivo:</p>
            <ul>
                <li>"Tengo que ir a trabajar" → "Elijo ir a trabajar porque valoro la seguridad financiera y el crecimiento profesional"</li>
                <li>"Mi jefe me hace enojar" → "Elijo cómo responder al comportamiento de mi jefe"</li>
                <li>"No tengo tiempo" → "Eso no es una prioridad para mí en este momento"</li>
            </ul>
        </div>

        <h2>El Poder de los Compromisos</h2>
        <p>Una de las formas más efectivas de desarrollar proactividad es hacer y cumplir compromisos. Cuando hacemos un compromiso con nosotros mismos o con otra persona y lo cumplimos, construimos nuestra integridad personal y nuestra capacidad de hacer y cumplir compromisos futuros.</p>

        <p>Por el contrario, cuando rompemos compromisos, especialmente los que nos hacemos a nosotros mismos, debilitamos nuestra integridad y nuestra confianza en nuestra capacidad de cumplir compromisos futuros.</p>

        <div class="highlight">
            <p><strong>Empieza Pequeño:</strong> Si quieres desarrollar proactividad, empieza haciendo y cumpliendo pequeños compromisos. "Voy a levantarme a las 6 AM mañana." "Voy a leer 10 páginas de este libro hoy." "Voy a hacer ejercicio durante 20 minutos."</p>
            
            <p>A medida que cumples estos pequeños compromisos, construyes la confianza y la capacidad para hacer y cumplir compromisos más grandes.</p>
        </div>

        <h2>La Proactividad en Acción</h2>
        <p>Ser proactivo significa:</p>
        <ul>
            <li>Tomar la iniciativa en lugar de esperar que otros actúen</li>
            <li>Asumir la responsabilidad de nuestras elecciones y sus consecuencias</li>
            <li>Enfocarnos en lo que podemos controlar en lugar de preocuparnos por lo que no podemos</li>
            <li>Elegir nuestras respuestas basadas en valores en lugar de reaccionar basados en emociones</li>
            <li>Hacer que las cosas sucedan en lugar de esperar que sucedan</li>
            <li>Ser parte de la solución en lugar de parte del problema</li>
        </ul>

        <p>En la próxima lección, exploraremos el concepto del Círculo de Influencia vs. el Círculo de Preocupación, una herramienta poderosa para aplicar la proactividad en nuestra vida diaria.</p>
        """
    }
]

# Continue with remaining lessons (06-25) - I'll add them in the next part due to length
# For now, let's create the first 5 lessons with expanded content

for lesson in lessons:
    file_path = os.path.join(base_dir, lesson["filename"])
    html_content = html_template.format(title=lesson["title"], content=lesson["content"])
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Created: {lesson['filename']}")

print(f"Created {len(lessons)} expanded lessons successfully.")
