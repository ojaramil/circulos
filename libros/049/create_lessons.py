import os

base_path = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/049/lecciones"
os.makedirs(base_path, exist_ok=True)

lessons = [
    {
        "filename": "01_introduccion.html",
        "title": "1. Las Casualidades No Existen",
        "content": """
        <p>Bienvenido al viaje de "Las casualidades no existen". Este libro no es una colección de teorías abstractas, sino una invitación a la experiencia directa. Borja Vilaseca nos plantea una premisa fundamental: todo lo que sucede en tu vida tiene un propósito, un sentido y una razón de ser, aunque tu mente racional no pueda comprenderlo en este momento.</p>
        
        <h3>La Espiritualidad Laica</h3>
        <p>Vilaseca introduce el concepto de espiritualidad laica, alejándose de dogmas religiosos y creencias ciegas. No se trata de creer en algo externo, sino de experimentar tu propia naturaleza interna. Es un camino de autodescubrimiento que requiere valentía y honestidad radical.</p>
        
        <div class="highlight-box">
            <strong>Concepto Clave:</strong> La vida no te sucede a ti, sucede <em>para</em> ti. Cada evento, cada persona y cada circunstancia es una oportunidad diseñada para tu evolución.
        </div>
        
        <p>Para aprovechar este libro, necesitas una mente abierta, como un paracaídas. Si te aferras a tus viejas creencias, no habrá espacio para lo nuevo. Prepárate para cuestionar todo lo que creías saber sobre ti mismo y sobre el mundo.</p>
        """
    },
    {
        "filename": "02_pecera_conceptual.html",
        "title": "2. La Pecera Conceptual",
        "content": """
        <p>Todos nacemos libres, pero pronto somos condicionados. Vilaseca utiliza la metáfora de la "pecera conceptual" para describir el conjunto de creencias, normas y valores que heredamos de nuestra familia y sociedad. Vivimos dentro de esta pecera pensando que es todo el océano, limitando nuestra percepción de la realidad.</p>
        
        <h3>El Condicionamiento Social</h3>
        <p>Desde pequeños nos dicen qué es bueno y qué es malo, qué es el éxito y qué es el fracaso. Adoptamos estas ideas sin cuestionarlas, construyendo una identidad falsa basada en expectativas ajenas. Este condicionamiento es la raíz de gran parte de nuestro sufrimiento.</p>
        
        <div class="highlight-box">
            <strong>Reflexión:</strong> ¿Cuántas de tus "verdades" son realmente tuyas y cuántas son prestadas? ¿Vives la vida que quieres o la que te dijeron que debías vivir?
        </div>
        
        <p>Salir de la pecera requiere coraje. Implica ser el "raro", el que cuestiona, el que no sigue al rebaño. Pero fuera de la pecera está la inmensidad del océano: la libertad de ser quien realmente eres.</p>
        """
    },
    {
        "filename": "03_creencia_vs_experiencia.html",
        "title": "3. Creencia vs. Experiencia",
        "content": """
        <p>Existe una diferencia abismal entre creer y saber. La creencia es mental, es aceptar una idea como verdadera sin haberla comprobado. La experiencia, en cambio, es vivencial, es sentir la verdad en tu propia piel. Este libro aboga por abandonar las creencias para abrazar la experiencia directa.</p>
        
        <h3>El Mapa no es el Territorio</h3>
        <p>Podemos leer mil libros sobre el amor, pero eso no es lo mismo que amar. Podemos estudiar teología, pero eso no es conocer a Dios (o a la Vida). Vilaseca nos insta a dejar de ser teóricos de la vida y convertirnos en practicantes.</p>
        
        <div class="highlight-box">
            <strong>Práctica:</strong> No creas nada de lo que leas aquí. Verifícalo. Ponlo a prueba en tu laboratorio personal: tu vida diaria.
        </div>
        
        <p>La espiritualidad real no se piensa, se vive. Se manifiesta en cómo tratas al camarero, cómo reaccionas ante un atasco y cómo te relacionas contigo mismo en soledad.</p>
        """
    },
    {
        "filename": "04_arrogancia_vs_humildad.html",
        "title": "4. Arrogancia vs. Humildad",
        "content": """
        <p>El mayor obstáculo para el aprendizaje es creer que ya se sabe. La arrogancia intelectual es una defensa del ego para no sentirse vulnerable. El arrogante se cierra a lo nuevo, juzga lo diferente y defiende su pequeña parcela de "verdad" con uñas y dientes.</p>
        
        <h3>La Humildad del Aprendiz</h3>
        <p>La verdadera sabiduría comienza con la humildad socrática: "Solo sé que no sé nada". Reconocer nuestra ignorancia es el primer paso para abrirnos a una comprensión superior. La humildad no es debilidad, es la fortaleza de mantenerse flexible y abierto.</p>
        
        <div class="highlight-box">
            <strong>Actitud Clave:</strong> Adopta la "mente de principiante". Mira el mundo con asombro, como si fuera la primera vez. Deja de etiquetar y empieza a observar.
        </div>
        
        <p>Cuando sueltas la necesidad de tener razón, ganas algo mucho más valioso: la paz mental y la capacidad de seguir creciendo.</p>
        """
    },
    {
        "filename": "05_sufrimiento_maestro.html",
        "title": "5. El Sufrimiento como Maestro",
        "content": """
        <p>Solemos huir del dolor, anestesiarlo o negarlo. Sin embargo, Vilaseca nos propone una visión revolucionaria: el sufrimiento es un mensajero. No es un castigo divino ni mala suerte; es una señal de que algo en nuestra forma de ver la vida no está alineado con la realidad.</p>
        
        <h3>Dolor vs. Sufrimiento</h3>
        <p>El dolor es inevitable (una pérdida, una enfermedad). El sufrimiento es opcional: es la resistencia mental a ese dolor. Sufrimos cuando peleamos contra lo que es, cuando deseamos que la realidad sea diferente a como es.</p>
        
        <div class="highlight-box">
            <strong>Lección:</strong> El sufrimiento tiene una función evolutiva: empujarnos a cambiar. Cuando el dolor de permanecer igual es mayor que el dolor de cambiar, cambiamos.
        </div>
        
        <p>Abraza tu sufrimiento. Pregúntale: "¿Qué has venido a enseñarme?". Detrás de cada crisis hay una oportunidad de transformación oculta.</p>
        """
    },
    {
        "filename": "06_noche_oscura.html",
        "title": "6. La Noche Oscura del Alma",
        "content": """
        <p>En el camino del despertar, a menudo atravesamos un periodo de profunda crisis y desolación conocido como "la noche oscura del alma". Es el momento en que nuestras viejas estructuras se derrumban y las nuevas aún no han nacido. Nos sentimos perdidos, vacíos y sin sentido.</p>
        
        <h3>El Colapso del Ego</h3>
        <p>Aunque se siente como una muerte, es en realidad un renacimiento. Lo que muere es el ego, la falsa identidad, las máscaras que hemos llevado durante años. Es un proceso de purificación necesario para que emerja nuestra verdadera esencia.</p>
        
        <div class="highlight-box">
            <strong>Consejo:</strong> Si estás atravesando una noche oscura, no te desesperes. Confía en el proceso. Estás en la crisálida, disolviéndote para convertirte en mariposa.
        </div>
        
        <p>No busques parches temporales. Permítete sentir el vacío. Es en ese vacío fértil donde germinará la semilla de tu nuevo ser.</p>
        """
    },
    {
        "filename": "07_despertar_consciencia.html",
        "title": "7. El Despertar de la Consciencia",
        "content": """
        <p>Despertar es darse cuenta de que has estado dormido. Es salir de Matrix. Es comprender que no eres la voz en tu cabeza, sino el observador que escucha esa voz. Este despertar no es un evento místico reservado para unos pocos, sino el siguiente paso evolutivo de la humanidad.</p>
        
        <h3>De la Inconsciencia a la Consciencia</h3>
        <p>La mayoría de las personas viven en piloto automático, reaccionando mecánicamente a los estímulos. Despertar implica tomar el mando, vivir con intencionalidad y presencia. Es pasar del victimismo a la responsabilidad.</p>
        
        <div class="highlight-box">
            <strong>Síntoma de Despertar:</strong> Empiezas a sentir una paz que no depende de las circunstancias externas. Dejas de buscar la felicidad fuera y la encuentras dentro.
        </div>
        
        <p>El despertar no es el final del camino, es el comienzo de una vida auténtica, libre de las cadenas del condicionamiento.</p>
        """
    },
    {
        "filename": "08_el_ego.html",
        "title": "8. El Ego: La Máscara",
        "content": """
        <p>El ego es el personaje que interpretamos en el teatro de la vida. Es nuestra autoimagen construida a base de recuerdos, creencias, roles y etiquetas. El problema no es tener ego, sino creer que <em>somos</em> el ego. Cuando nos identificamos con él, vivimos desde el miedo, la carencia y la separación.</p>
        
        <h3>Mecanismos del Ego</h3>
        <p>El ego siempre quiere más: más dinero, más fama, más razón. Se alimenta del conflicto, la comparación y el juicio. Siempre está en el pasado (culpa) o en el futuro (preocupación), nunca en el presente.</p>
        
        <div class="highlight-box">
            <strong>Identificación:</strong> Observa tu necesidad de tener razón, de defenderte, de ser especial. Eso es tu ego, no tú. Tú eres la consciencia que lo observa.
        </div>
        
        <p>No intentes matar al ego; simplemente obsérvalo. Al observarlo sin juzgarlo, pierde su poder sobre ti. Se convierte en una herramienta en lugar de ser tu amo.</p>
        """
    },
    {
        "filename": "09_la_esencia.html",
        "title": "9. La Esencia: Quién Eres Realmente",
        "content": """
        <p>Si no eres tu ego, ¿quién eres? Eres la Esencia, el Ser, la Consciencia. Vilaseca describe la Esencia como nuestra naturaleza original, aquello que éramos antes de ser condicionados y lo que queda cuando nos despojamos de las máscaras.</p>
        
        <h3>Cualidades de la Esencia</h3>
        <p>Tu Esencia es paz, amor, alegría y creatividad. No necesitas "conseguir" estas cualidades; ya son lo que eres. Solo necesitas despejar las nubes del ego para que brille el sol de tu Esencia.</p>
        
        <div class="highlight-box">
            <strong>Metáfora:</strong> El ego es como las olas en la superficie del mar, agitadas y cambiantes. La Esencia es la profundidad del océano, siempre en calma y silencio.
        </div>
        
        <p>Conectar con tu Esencia es volver a casa. Es sentirte completo y suficiente tal como eres, sin necesidad de demostrar nada a nadie.</p>
        """
    },
    {
        "filename": "10_ley_espejo.html",
        "title": "10. La Ley del Espejo",
        "content": """
        <p>La realidad es un espejo neutro que refleja nuestro estado interno. Lo que te molesta de los demás es algo que no has aceptado en ti mismo. Lo que admiras en otros es algo que tienes en potencia. Esta es la Ley del Espejo: el mundo exterior es un reflejo de tu mundo interior.</p>
        
        <h3>Proyección Psicológica</h3>
        <p>Proyectamos nuestra sombra (lo que negamos de nosotros) en los demás. Si te irrita la arrogancia de alguien, revisa tu propia arrogancia (quizás oculta). Si te molesta el egoísmo, revisa tu relación con el dar y recibir.</p>
        
        <div class="highlight-box">
            <strong>Herramienta:</strong> Cada vez que señales con un dedo hacia afuera, recuerda que tres dedos señalan hacia ti. Usa cada conflicto como una oportunidad de autoconocimiento.
        </div>
        
        <p>Deja de intentar limpiar el espejo (cambiar a los demás) y empieza a limpiar tu cara (cambiarte a ti mismo). Cuando tú cambias, tu reflejo en el mundo cambia.</p>
        """
    },
    {
        "filename": "11_aceptacion_radical.html",
        "title": "11. Aceptación Radical",
        "content": """
        <p>La aceptación es la puerta a la paz interior. Aceptar no significa resignarse ni estar de acuerdo; significa dejar de pelear contra la realidad. Es reconocer que lo que está sucediendo, está sucediendo, y que resistirse solo genera sufrimiento innecesario.</p>
        
        <h3>Rendirse al "Lo Que Es"</h3>
        <p>Vilaseca nos invita a practicar la rendición: soltar el control y fluir con la vida. Cuando aceptas el momento presente tal como es, liberas una enorme cantidad de energía que antes gastabas en la resistencia.</p>
        
        <div class="highlight-box">
            <strong>Mantra:</strong> "Hágase tu voluntad y no la mía". Entendiendo "tu voluntad" como la inteligencia de la Vida/Universo, que sabe mejor que tu ego lo que necesitas.
        </div>
        
        <p>La paradoja del cambio es que solo podemos transformar aquello que primero hemos aceptado completamente.</p>
        """
    },
    {
        "filename": "12_responsabilidad_total.html",
        "title": "12. Responsabilidad Total",
        "content": """
        <p>Madurar espiritualmente implica asumir el 100% de responsabilidad sobre tu vida. Dejas de culpar a tus padres, al gobierno, a tu jefe o a tu pareja por tu infelicidad. Comprendes que eres el único creador de tu experiencia interna.</p>
        
        <h3>Víctima vs. Creador</h3>
        <p>La víctima pregunta "¿Por qué a mí?". El creador pregunta "¿Para qué me sirve esto?". La víctima busca culpables; el creador busca soluciones y aprendizajes. La responsabilidad te empodera; la culpa te debilita.</p>
        
        <div class="highlight-box">
            <strong>Poder Personal:</strong> No puedes controlar lo que te sucede (los eventos), pero tienes control absoluto sobre cómo respondes a lo que te sucede (tu actitud).
        </div>
        
        <p>Asumir responsabilidad es un acto de libertad. Es declarar que nadie tiene el poder de perturbar tu paz interior sin tu permiso.</p>
        """
    },
    {
        "filename": "13_proposito_vida.html",
        "title": "13. El Propósito de Vida",
        "content": """
        <p>Muchos buscan su propósito como si fuera un tesoro escondido. Vilaseca sugiere que el propósito no se encuentra, se crea. Y el propósito fundamental de todo ser humano es el mismo: aprender a ser feliz por sí mismo y compartir esa felicidad con los demás.</p>
        
        <h3>Talento y Servicio</h3>
        <p>Tu propósito específico (Ikigai) surge de la intersección entre lo que amas, lo que se te da bien, lo que el mundo necesita y por lo que te pueden pagar. Es poner tus dones al servicio de algo más grande que tú.</p>
        
        <div class="highlight-box">
            <strong>Pregunta Guía:</strong> No te preguntes qué quieres obtener de la vida. Pregúntate qué tiene la vida para ofrecer a través de ti. ¿Cómo puedes ser útil hoy?
        </div>
        
        <p>Cuando vives con propósito, el trabajo deja de ser una carga y se convierte en una expresión de amor y creatividad.</p>
        """
    },
    {
        "filename": "14_desapego.html",
        "title": "14. Desapego y Libertad",
        "content": """
        <p>El apego es la raíz del sufrimiento. Nos apegamos a personas, cosas, ideas y resultados porque creemos que nuestra felicidad depende de ellos. El desapego no es indiferencia; es la capacidad de disfrutar de todo sin necesitar nada.</p>
        
        <h3>La Ilusión de la Posesión</h3>
        <p>Nada nos pertenece realmente. Todo es prestado: nuestro cuerpo, nuestro dinero, nuestras relaciones. Vivir con desapego es vivir con las manos abiertas: permitiendo que las cosas lleguen y se vayan libremente.</p>
        
        <div class="highlight-box">
            <strong>Verdad:</strong> Solo eres verdaderamente libre cuando no necesitas nada externo para estar en paz. La felicidad es un estado interno, no una adquisición externa.
        </div>
        
        <p>Practica el desapego soltando la necesidad de controlar. Confía en que la vida te dará lo que necesitas y te quitará lo que ya no te sirve para tu evolución.</p>
        """
    },
    {
        "filename": "15_amor_incondicional.html",
        "title": "15. Amor Incondicional",
        "content": """
        <p>Confundimos el amor con el querer. Querer es egoísta: "te quiero porque me haces sentir bien". Es una transacción. El amor real es incondicional: "te amo por quien eres, independientemente de lo que hagas". El amor no pide nada a cambio.</p>
        
        <h3>Amar es Dar</h3>
        <p>El amor no es una emoción pasajera, es un estado de consciencia. Es la decisión de buscar el bien del otro. No puedes amar al otro si lo necesitas para llenar tus vacíos. Solo dos personas completas pueden compartir un amor sano.</p>
        
        <div class="highlight-box">
            <strong>Práctica:</strong> Ama sin esperar recompensa. Ama incluso a quienes te desafían (son tus mejores maestros de paciencia). El amor es lo único que crece cuando se reparte.
        </div>
        
        <p>El amor incondicional empieza por uno mismo. Si no te aceptas y amas con tus luces y sombras, no podrás amar verdaderamente a nadie más.</p>
        """
    },
    {
        "filename": "16_muerte_ego.html",
        "title": "16. La Muerte del Ego",
        "content": """
        <p>La transformación espiritual culmina en lo que se llama metafóricamente "la muerte del ego". No es una muerte física, sino el fin de la identificación con la falsa identidad. Es el momento en que la oruga deja de existir para que nazca la mariposa.</p>
        
        <h3>Trascendencia</h3>
        <p>Al trascender el ego, dejas de vivir desde el miedo y empiezas a vivir desde el amor. Dejas de sentirte separado del universo y experimentas la unidad con todo lo que existe. Es el estado de "flujo" constante.</p>
        
        <div class="highlight-box">
            <strong>Experiencia:</strong> En este estado, la vida se vuelve simple. Haces lo que tienes que hacer, sin drama, sin resistencia. Eres un canal a través del cual la vida se expresa.
        </div>
        
        <p>Esta "muerte" es en realidad el despertar a la Vida Eterna, a la dimensión de ti que nunca nació y nunca morirá.</p>
        """
    },
    {
        "filename": "17_sincronicidad.html",
        "title": "17. Sincronicidad",
        "content": """
        <p>Cuando te alineas con tu propósito y fluyes con la vida, empiezan a ocurrir "casualidades" significativas. Jung las llamó sincronicidades. Son guiños del universo confirmando que estás en el camino correcto. Las casualidades no existen; son causalidades no lineales.</p>
        
        <h3>El Lenguaje del Universo</h3>
        <p>Aparece el libro justo que necesitabas, te llama la persona en la que pensabas, encuentras la oportunidad perfecta sin buscarla. Estas no son coincidencias aleatorias, son la respuesta del campo cuántico a tu vibración.</p>
        
        <div class="highlight-box">
            <strong>Atención:</strong> Presta atención a las señales. El universo te habla constantemente, pero necesitas estar en silencio y atento para escucharlo.
        </div>
        
        <p>Confía en la inteligencia de la vida. Todo está orquestado con una precisión matemática para tu mayor bien.</p>
        """
    },
    {
        "filename": "18_intuicion.html",
        "title": "18. Intuición: La Voz del Alma",
        "content": """
        <p>Tenemos dos sistemas de guía: la razón (lógica, lenta, basada en el pasado) y la intuición (instántanea, holística, conectada a la sabiduría universal). La sociedad sobrevalora la razón e infravalora la intuición. Vilaseca nos anima a reconectar con nuestro "GPS interior".</p>
        
        <h3>Sentir vs. Pensar</h3>
        <p>La intuición no se piensa, se siente. Es esa "corazonada", esa certeza inexplicable que te dice qué camino tomar. A menudo contradice a la lógica, pero rara vez se equivoca.</p>
        
        <div class="highlight-box">
            <strong>Desarrollo:</strong> Para escuchar tu intuición, necesitas bajar el volumen del ruido mental. La meditación y el silencio son claves para sintonizar esta frecuencia.
        </div>
        
        <p>Aprende a confiar en lo que sientes más que en lo que piensas. Tu alma sabe el camino antes que tu mente.</p>
        """
    },
    {
        "filename": "19_meditacion_mindfulness.html",
        "title": "19. Meditación y Mindfulness",
        "content": """
        <p>La meditación no es poner la mente en blanco ni levitar. Es el entrenamiento de la atención. Es observar la mente sin identificarse con sus contenidos. Es la herramienta fundamental para el autoconocimiento y la gestión emocional.</p>
        
        <h3>El Gimnasio de la Consciencia</h3>
        <p>Al igual que entrenas tu cuerpo, necesitas entrenar tu mente. La práctica diaria de mindfulness (atención plena) te ayuda a crear un espacio entre el estímulo y tu respuesta, dándote la libertad de elegir cómo actuar.</p>
        
        <div class="highlight-box">
            <strong>Hábito:</strong> No necesitas horas. Empieza con 10 minutos al día de sentarte en silencio y observar tu respiración. La constancia es más importante que la duración.
        </div>
        
        <p>La meditación te ancla en el presente, el único lugar donde la vida sucede realmente.</p>
        """
    },
    {
        "filename": "20_relaciones_conscientes.html",
        "title": "20. Relaciones Conscientes",
        "content": """
        <p>Nuestras relaciones son el espejo más potente. En una relación consciente, el objetivo no es solo "ser felices y comer perdices", sino crecer juntos. La pareja se convierte en un compañero de evolución, ayudándote a ver tus sombras y a sanar tus heridas.</p>
        
        <h3>De la Necesidad a la Preferencia</h3>
        <p>Las relaciones tóxicas nacen de la necesidad ("te necesito para ser feliz"). Las relaciones conscientes nacen de la preferencia ("soy feliz solo, pero prefiero compartir mi felicidad contigo"). Es la unión de dos naranjas enteras, no de dos medias naranjas.</p>
        
        <div class="highlight-box">
            <strong>Clave:</strong> Deja de intentar cambiar a tu pareja. Acéptala tal como es. Tu trabajo es hacerte cargo de tus propias reacciones emocionales.
        </div>
        
        <p>La calidad de tus relaciones es un reflejo directo de la calidad de la relación que tienes contigo mismo.</p>
        """
    },
    {
        "filename": "21_abundancia_dinero.html",
        "title": "21. Abundancia y Dinero",
        "content": """
        <p>La espiritualidad no está reñida con el dinero. El dinero es energía neutra; es un amplificador de lo que ya eres. La verdadera abundancia es un estado de consciencia: sentir que no te falta nada. Desde esa plenitud, la riqueza material fluye naturalmente.</p>
        
        <h3>Mentalidad de Escasez vs. Abundancia</h3>
        <p>La escasez dice "no hay suficiente para todos", generando miedo y competencia. La abundancia dice "hay ilimitado para todos", generando generosidad y colaboración. Tu cuenta bancaria refleja tus creencias sobre el merecimiento y el valor.</p>
        
        <div class="highlight-box">
            <strong>Principio:</strong> Para recibir, primero tienes que dar. Aporta valor masivo al mundo y el dinero vendrá como consecuencia inevitable.
        </div>
        
        <p>Sana tu relación con el dinero. Véelo como una herramienta para expandir tu servicio y hacer el bien, no como un fin en sí mismo.</p>
        """
    },
    {
        "filename": "22_salud_holistica.html",
        "title": "22. Salud Holística",
        "content": """
        <p>No somos solo una mente; somos un sistema integrado cuerpo-mente-espíritu. Lo que piensas afecta a tu cuerpo (psicosomática) y cómo tratas a tu cuerpo afecta a tu mente. El cuidado del templo físico es esencial para el desarrollo espiritual.</p>
        
        <h3>Mens sana in corpore sano</h3>
        <p>Alimentación consciente, ejercicio, descanso y contacto con la naturaleza no son lujos, son necesidades básicas. Escucha a tu cuerpo; tiene una sabiduría ancestral que tu mente ignora.</p>
        
        <div class="highlight-box">
            <strong>Señales:</strong> La enfermedad a menudo es un grito del alma a través del cuerpo, pidiendo un cambio de rumbo o de actitud.
        </div>
        
        <p>Honra tu cuerpo. Es el vehículo que te permite experimentar esta realidad y cumplir tu propósito.</p>
        """
    },
    {
        "filename": "23_servicio_demas.html",
        "title": "23. Servicio a los Demás",
        "content": """
        <p>El ego quiere recibir; el Ser quiere dar. La culminación del camino espiritual es el servicio. Cuando te llenas de amor y sabiduría, naturalmente se desborda hacia los demás. Servir no es un deber moral, es una necesidad del alma.</p>
        
        <h3>El Gozo de Dar</h3>
        <p>Ayudar a otros es la forma más rápida de salir de tu propio drama ególatra. Pero el servicio real no busca reconocimiento. Es dar por el puro placer de ver al otro florecer.</p>
        
        <div class="highlight-box">
            <strong>Paradoja:</strong> Cuanto más das, más tienes. Al vaciarte en los demás, la vida te rellena con más energía y recursos.
        </div>
        
        <p>No necesitas ser Teresa de Calcuta. Puedes servir con una sonrisa, una escucha atenta o haciendo tu trabajo con excelencia y amor.</p>
        """
    },
    {
        "filename": "24_vivir_ahora.html",
        "title": "24. Vivir en el Ahora",
        "content": """
        <p>El pasado es memoria; el futuro es imaginación. Solo existe el Ahora. La vida es una sucesión de momentos presentes. Sufrimos porque nuestra mente escapa constantemente del Ahora. La plenitud solo se encuentra aquí y ahora.</p>
        
        <h3>El Poder del Presente</h3>
        <p>Cuando estás totalmente presente, el miedo desaparece (el miedo siempre es futurista). La culpa desaparece (siempre es pasada). En el Ahora, todo está bien. Tienes los recursos para lidiar con este instante preciso.</p>
        
        <div class="highlight-box">
            <strong>Práctica:</strong> Vuelve a tus sentidos. Siente tus pies en el suelo, escucha los sonidos, observa los colores. Sal de tu mente y entra en tu vida.
        </div>
        
        <p>No esperes a que llegue el fin de semana o las vacaciones para vivir. La vida es lo que está pasando mientras lees esta frase.</p>
        """
    },
    {
        "filename": "25_conclusion.html",
        "title": "25. Conclusión: El Viaje Continúa",
        "content": """
        <p>Hemos recorrido 25 lecciones sobre el despertar de la consciencia. Pero cerrar este libro no es el final, es el verdadero comienzo. Ahora te toca a ti. El mapa no es el territorio. Saber esto intelectualmente no sirve de nada si no lo aplicas.</p>
        
        <h3>Tu Compromiso</h3>
        <p>No me creas. No creas a Borja Vilaseca. Créete a ti mismo a través de tu propia experiencia. Sé un científico de tu propia vida. Experimenta, falla, levántate y sigue caminando.</p>
        
        <div class="highlight-box">
            <strong>Mensaje Final:</strong> Las casualidades no existen. Que este libro haya llegado a tus manos no es un accidente. Es una invitación de la Vida para que despiertes a tu grandeza.
        </div>
        
        <p>Gracias por la valentía de mirar hacia adentro. El mundo necesita más personas despiertas, conscientes y felices. Tu transformación es el mayor regalo que puedes hacerle a la humanidad.</p>
        """
    }
]

# Common CSS for all files
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
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
        }
        h3 {
            color: #e67e22;
            border-bottom: 2px solid #e67e22;
            padding-bottom: 10px;
            margin-top: 30px;
        }
        p {
            margin-bottom: 15px;
            text-align: justify;
        }
        .highlight-box {
            background-color: #e8f6f3;
            border-left: 5px solid #1abc9c;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        /* Navigation buttons removed as per request */
    </style>
"""

for i, lesson in enumerate(lessons):
    html_content = f"""<!DOCTYPE html>
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
        f.write(html_content)

print("✅ 25 Lecciones creadas exitosamente para el libro 049 (SIN botones de navegación).")
