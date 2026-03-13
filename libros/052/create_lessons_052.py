import os

base_path = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/052/lecciones"
os.makedirs(base_path, exist_ok=True)

lessons = [
    {
        "filename": "01_introduccion.html",
        "title": "1. Introducción: La Paradoja de la Elección",
        "content": """
        <p>Bienvenido a "La Paradoja de la Elección" de Barry Schwartz. Este libro revoluciona nuestra comprensión de la libertad y la felicidad, mostrando que más opciones no siempre significan más bienestar.</p>
        
        <h3>La Paradoja Fundamental</h3>
        <p>Cuando no tenemos elección, la vida es casi insoportable. A medida que aumenta el número de opciones disponibles, la autonomía y el control que esto trae son poderosos y positivos. Pero cuando las opciones siguen creciendo, aparecen aspectos negativos. Al llegar a cierto punto, la elección ya no libera, sino que debilita. Incluso podría decirse que tiraniza.</p>
        
        <div class="highlight-box">
            <strong>Concepto Clave:</strong> El hecho de que algo de elección sea bueno no significa necesariamente que más elección sea mejor. Hay un costo en tener una sobrecarga de opciones.
        </div>
        
        <p>Este libro explora cómo la abundancia de elecciones en nuestra cultura moderna contribuye a malas decisiones, ansiedad, estrés e insatisfacción, incluso a depresión clínica.</p>
        """
    },
    {
        "filename": "02_explosion_opciones.html",
        "title": "2. La Explosión de Opciones en el Consumo",
        "content": """
        <p>Un supermercado típico lleva más de 30,000 artículos. Más de 20,000 nuevos productos llegan a las estanterías cada año. Esta abundancia se extiende a casi todos los aspectos de nuestras vidas.</p>
        
        <h3>Ejemplos Cotidianos</h3>
        <ul>
            <li><strong>Supermercados:</strong> 85 variedades de galletas saladas, 285 tipos de cookies, 275 cereales diferentes.</li>
            <li><strong>Electrónicos:</strong> 45 sistemas de estéreo para auto, 42 computadoras, 110 televisores, 6.5 millones de combinaciones posibles de sistemas estéreo.</li>
            <li><strong>Ropa:</strong> Catálogos con cientos de combinaciones de colores y estilos.</li>
        </ul>
        
        <div class="highlight-box">
            <strong>Dato Impactante:</strong> Los estadounidenses pasan más tiempo comprando que los miembros de cualquier otra sociedad. Van a centros comerciales más a menudo que a lugares de culto.
        </div>
        
        <p>Pero aquí está el problema: las personas compran más ahora pero disfrutan menos. El 93% de las adolescentes dice que comprar es su actividad favorita, pero cuando se les pide que clasifiquen el placer de varias actividades, las compras de comestibles ocupan el penúltimo lugar.</p>
        """
    },
    {
        "filename": "03_estudio_mermeladas.html",
        "title": "3. El Estudio de las Mermeladas: Cuando la Elección Desmotiva",
        "content": """
        <p>Un estudio revelador en una tienda gourmet demostró el efecto paradójico de demasiadas opciones. Los investigadores establecieron una mesa de degustación de mermeladas exóticas de alta calidad.</p>
        
        <h3>Los Resultados</h3>
        <p>En una condición, había 6 variedades de mermeladas disponibles para degustar. En otra, había 24 variedades. En ambos casos, las 24 variedades estaban disponibles para compra.</p>
        
        <ul>
            <li>El gran surtido atrajo más personas a la mesa que el pequeño surtido.</li>
            <li>En ambos casos, las personas probaron aproximadamente el mismo número de mermeladas en promedio.</li>
            <li><strong>Pero aquí está la diferencia crucial:</strong> El 30% de las personas expuestas al pequeño surtido realmente compró un frasco. Solo el 3% de las expuestas al gran surtido lo hizo.</li>
        </ul>
        
        <div class="highlight-box">
            <strong>Conclusión:</strong> Un gran surtido de opciones puede desalentar a los consumidores porque fuerza un aumento en el esfuerzo que se requiere para tomar una decisión. Los consumidores deciden no decidir, y no compran el producto.
        </div>
        
        <p>Este fenómeno se repite en múltiples contextos: chocolates gourmet, planes de inversión, seguros de salud. Más opciones no siempre significan más satisfacción.</p>
        """
    },
    {
        "filename": "04_nuevas_areas_eleccion.html",
        "title": "4. Nuevas Áreas de Elección: Servicios Públicos y Salud",
        "content": """
        <p>La explosión de opciones no se limita a productos de consumo. Se ha extendido a áreas críticas de nuestras vidas que antes estaban reguladas o eran simples.</p>
        
        <h3>Servicios Públicos</h3>
        <p>Hace una generación, todos los servicios públicos eran monopolios regulados. Los consumidores no tenían que tomar decisiones sobre quién proporcionaría el servicio telefónico o eléctrico. Ahora enfrentamos:</p>
        <ul>
            <li>Múltiples proveedores de telefonía de larga distancia, cada uno ofreciendo muchos planes diferentes.</li>
            <li>Competencia en el suministro de energía eléctrica.</li>
            <li>La responsabilidad ha cambiado: "En el pasado confiábamos en que los reguladores estatales nos cuidaban. El nuevo modelo es: 'Descúbrelo tú mismo'."</li>
        </ul>
        
        <h3>Seguros de Salud</h3>
        <p>Los seguros de salud son un negocio serio, y las elecciones que hacemos pueden tener consecuencias devastadoras. Ahora las organizaciones presentan a sus empleados múltiples opciones: HMOs, PPOs, diferentes niveles de deducible, planes de medicamentos recetados, planes dentales, planes de visión.</p>
        
        <div class="highlight-box">
            <strong>El Problema:</strong> Incluso si la competencia beneficia a los consumidores, el hecho es que es otra elección que tenemos que hacer. Y en áreas de alto riesgo como la salud, una mala decisión puede traer ruina financiera completa.
        </div>
        """
    },
    {
        "filename": "05_planes_jubilacion.html",
        "title": "5. Planes de Jubilación: La Paradoja de las 156 Opciones",
        "content": """
        <p>Los planes de pensión presentan la misma dificultad. Los empleadores han cambiado de planes de "beneficio definido" (donde los jubilados obtienen lo que sus años de servicio y salarios finales les otorgan) a planes de "contribución definida" (donde el empleado y el empleador contribuyen a algún instrumento de inversión).</p>
        
        <h3>El Caso Extremo</h3>
        <p>Una firma de contadores ofrecía a sus empleados 14 opciones de pensión diferentes. Este año, varios socios decidieron que este conjunto de opciones era inadecuado, así que desarrollaron un plan de jubilación que tiene <strong>156 opciones</strong>. La opción número 156 es que los empleados que no les gusten las otras 155 pueden diseñar la suya propia.</p>
        
        <h3>El Problema de la División Equitativa</h3>
        <p>Un estudio encontró que cuando las personas se enfrentan a un gran número de opciones, típicamente adoptan una estrategia de dividir sus contribuciones equitativamente entre las opciones: 50-50 si hay dos; 25-25-25-25, si hay cuatro; y así sucesivamente.</p>
        
        <div class="highlight-box">
            <strong>Riesgo Oculto:</strong> Un empleador podría proporcionar una opción conservadora y cinco más especulativas. Un empleado típico, poniendo un sexto de su jubilación en cada fondo, podría no tener idea de que ha tomado una decisión extremadamente arriesgada, con el 83% de su dinero atado a las perturbaciones del mercado de valores.
        </div>
        """
    },
    {
        "filename": "06_eleccion_medica.html",
        "title": "6. Elección Médica: Cuando el Paciente Decide",
        "content": """
        <p>La responsabilidad por la atención médica ha caído sobre los hombros de los pacientes con un golpe resonante. El tono de la práctica médica ha cambiado de uno en el que el doctor paternalista y omnisciente le dice al paciente qué debe hacerse, a uno en el que el doctor presenta las posibilidades ante el paciente, junto con los probables pros y contras de cada una, y el paciente hace una elección.</p>
        
        <h3>La Paradoja de la Autonomía</h3>
        <p>Aunque hasta el 65% de las personas encuestadas dicen que si tuvieran cáncer, querrían elegir su propio tratamiento, en realidad, entre las personas que realmente tienen cáncer, solo el 12% realmente quiere hacerlo.</p>
        
        <div class="highlight-box">
            <strong>Lo que los Pacientes Realmente Quieren:</strong> Competencia y amabilidad. La amabilidad incluye respeto por la autonomía, pero no trata la autonomía como un fin inviolable en sí mismo.
        </div>
        
        <p>Además, la cantidad de fuentes de información ha explotado: guías enciclopédicas para laicos sobre salud, revistas de "mejor salud", y, más dramático de todo, Internet. Ahora la perspectiva de una decisión médica se ha convertido en la peor pesadilla de todos: una tarea de investigación con apuestas infinitamente más altas que una calificación en un curso.</p>
        """
    },
    {
        "filename": "07_educacion_universitaria.html",
        "title": "7. Educación Universitaria: El Centro Comercial Intelectual",
        "content": """
        <p>Hace un siglo, un currículo universitario implicaba un curso de estudio en gran parte fijo, con un objetivo principal de educar a las personas en sus tradiciones éticas y cívicas. La educación no era solo sobre aprender una disciplina; era una forma de criar ciudadanos con valores y aspiraciones comunes.</p>
        
        <h3>El Cambio Radical</h3>
        <p>Ya no hay un currículo fijo, y ningún curso único es requerido de todos los estudiantes. No hay intento de enseñar a las personas cómo deberían vivir, porque ¿quién puede decir qué es una buena vida?</p>
        
        <p>En Harvard, los estudiantes ahora toman al menos un curso en cada una de siete áreas diferentes de investigación. Entre esas áreas, hay un total de aproximadamente <strong>220 cursos</strong> entre los que elegir. "Culturas Extranjeras" tiene 32, "Estudio Histórico" tiene 44, "Literatura y las Artes" tiene 58, y así sucesivamente.</p>
        
        <div class="highlight-box">
            <strong>Pregunta Crítica:</strong> ¿Cuáles son las probabilidades de que dos estudiantes aleatorios que se encuentren tengan cursos en común? La experiencia intelectual compartida ha desaparecido.
        </div>
        
        <p>Los estudiantes ahora "muestrean" las clases en las primeras semanas, yendo y viniendo como navegadores en un centro comercial. "Tienes diez minutos", parecen decir los estudiantes, "para mostrarme lo que tienes. Así que dale tu mejor tiro."</p>
        """
    },
    {
        "filename": "08_proceso_decision.html",
        "title": "8. El Proceso de Decisión: Cómo Elegimos",
        "content": """
        <p>Elegir bien es difícil, y la mayoría de las decisiones tienen varias dimensiones diferentes. Cuando alquilas un apartamento, consideras ubicación, espaciosidad, condición, seguridad y alquiler. Cuando compras un auto, miras seguridad, confiabilidad, economía de combustible, estilo y precio.</p>
        
        <h3>Los Pasos de una Buena Decisión</h3>
        <ol>
            <li><strong>Descubre tu objetivo o objetivos.</strong></li>
            <li><strong>Evalúa la importancia de cada objetivo.</strong></li>
            <li><strong>Organiza las opciones.</strong></li>
            <li><strong>Evalúa qué tan probable es que cada una de las opciones cumpla con tus objetivos.</strong></li>
            <li><strong>Elige la opción ganadora.</strong></li>
            <li><strong>Usa las consecuencias de tu elección para modificar tus objetivos, la importancia que les asignas, y la forma en que evalúas futuras posibilidades.</strong></li>
        </ol>
        
        <div class="highlight-box">
            <strong>El Problema:</strong> Con demasiadas opciones, este proceso se vuelve abrumador. Cada paso requiere más tiempo, más energía y más investigación. El costo de oportunidad de investigar cada opción se vuelve prohibitivo.
        </div>
        
        <p>Además, cuando hay muchas opciones, es más probable que nos arrepintamos de nuestra elección, porque siempre habrá opciones no elegidas que podrían haber sido mejores.</p>
        """
    },
    {
        "filename": "09_maximizadores_vs_satisfactores.html",
        "title": "9. Maximizadores vs. Satisfactores",
        "content": """
        <p>Una distinción crucial es entre "maximizadores" y "satisfactores". Los maximizadores son personas que se esfuerzan por hacer solo las mejores elecciones. Los satisfactores son personas que buscan lo que es "suficientemente bueno".</p>
        
        <h3>Características de los Maximizadores</h3>
        <ul>
            <li>Investigan exhaustivamente todas las opciones antes de decidir.</li>
            <li>Comparan constantemente sus elecciones con las de otros.</li>
            <li>Experimentan más arrepentimiento después de decidir.</li>
            <li>Son menos felices con sus elecciones, incluso cuando son objetivamente mejores.</li>
            <li>Tienden a ser más perfeccionistas y ansiosos.</li>
        </ul>
        
        <h3>Características de los Satisfactores</h3>
        <ul>
            <li>Establecen criterios claros de lo que es "suficientemente bueno".</li>
            <li>Una vez que encuentran una opción que cumple con sus criterios, se detienen.</li>
            <li>Son más felices con sus elecciones.</li>
            <li>Experimentan menos estrés y ansiedad.</li>
        </ul>
        
        <div class="highlight-box">
            <strong>Insight Clave:</strong> En un mundo de opciones ilimitadas, ser un satisfactor es más adaptativo que ser un maximizador. Los satisfactores obtienen resultados que son casi tan buenos como los de los maximizadores, pero con mucho menos esfuerzo y ansiedad.
        </div>
        """
    },
    {
        "filename": "10_costo_eleccion.html",
        "title": "10. El Costo Oculto de la Elección",
        "content": """
        <p>Hay costos ocultos en tener demasiadas opciones que no siempre son evidentes. Estos costos son sutiles y acumulativos.</p>
        
        <h3>Costos Temporales</h3>
        <p>Investigar todas las opciones disponibles requiere tiempo. En un mundo con opciones ilimitadas, el tiempo que dedicamos a investigar puede volverse excesivo. El tiempo que pasamos eligiendo es tiempo que no pasamos disfrutando lo que hemos elegido.</p>
        
        <h3>Costos Emocionales</h3>
        <ul>
            <li><strong>Ansiedad:</strong> La preocupación constante de que podríamos estar tomando la decisión equivocada.</li>
            <li><strong>Arrepentimiento anticipado:</strong> La preocupación de que nos arrepentiremos de nuestra elección.</li>
            <li><strong>Parálisis por análisis:</strong> La incapacidad de decidir debido a la sobrecarga de información.</li>
        </ul>
        
        <h3>Costos de Oportunidad</h3>
        <p>Cada opción que consideramos pero no elegimos representa una oportunidad perdida. Cuantas más opciones consideramos, más oportunidades perdidas acumulamos, lo que puede generar insatisfacción.</p>
        
        <div class="highlight-box">
            <strong>La Paradoja:</strong> Cuanto más tiempo y esfuerzo invertimos en tomar una decisión, más altas son nuestras expectativas sobre el resultado. Y cuanto más altas son nuestras expectativas, más probable es que nos sintamos decepcionados, incluso si el resultado es objetivamente bueno.
        </div>
        """
    },
    {
        "filename": "11_eleccion_felicidad.html",
        "title": "11. Elección y Felicidad: ¿Más Opciones = Más Felicidad?",
        "content": """
        <p>La pregunta fundamental es: ¿Las mayores oportunidades de elección realmente hacen que las personas sean más felices? La respuesta, según la investigación, es: a menudo no.</p>
        
        <h3>La Curva de la Felicidad</h3>
        <p>La relación entre opciones y felicidad no es lineal. Hay un punto óptimo:</p>
        <ul>
            <li><strong>Pocas opciones:</strong> Baja felicidad (sentimiento de falta de control).</li>
            <li><strong>Opciones moderadas:</strong> Alta felicidad (autonomía sin sobrecarga).</li>
            <li><strong>Demasiadas opciones:</strong> Baja felicidad (sobrecarga, ansiedad, arrepentimiento).</li>
        </ul>
        
        <h3>La Paradoja de la Abundancia</h3>
        <p>Estamos viviendo en la cúspide de la posibilidad humana, inundados de abundancia material. Como sociedad, hemos logrado lo que nuestros antepasados solo podían soñar. Pero esto ha tenido un gran precio.</p>
        
        <div class="highlight-box">
            <strong>El Problema:</strong> Obtenemos lo que decimos que queremos, solo para descubrir que lo que queremos no nos satisface en el grado que esperamos. Estamos rodeados de dispositivos modernos que ahorran tiempo, pero nunca parecemos tener suficiente tiempo.
        </div>
        
        <p>El "éxito" de la modernidad resulta agridulce, y en todas partes miramos, parece que un factor contribuyente significativo es la sobreabundancia de elección.</p>
        """
    },
    {
        "filename": "12_oportunidades_perdidas.html",
        "title": "12. Oportunidades Perdidas: El Costo de las Opciones No Elegidas",
        "content": """
        <p>Cada elección que hacemos implica rechazar otras opciones. En un mundo de opciones limitadas, esto no es un problema. Pero cuando hay muchas opciones atractivas, cada elección se siente como una pérdida.</p>
        
        <h3>El Efecto de las Opciones Atractivas</h3>
        <p>Cuando hay muchas opciones atractivas disponibles, pensar en las atracciones de algunas de las opciones no elegidas resta placer de la elegida. Esto se conoce como el "costo de oportunidad" psicológico.</p>
        
        <h3>La Paradoja de la Elección Racional</h3>
        <p>Desde una perspectiva económica, tener más opciones debería hacernos mejor. Pero psicológicamente, cada opción adicional:</p>
        <ul>
            <li>Aumenta el número de opciones que debemos rechazar.</li>
            <li>Aumenta la probabilidad de que nos arrepintamos.</li>
            <li>Disminuye nuestra satisfacción con la opción elegida.</li>
        </ul>
        
        <div class="highlight-box">
            <strong>Ejemplo:</strong> Imagina elegir entre 3 restaurantes vs. 30 restaurantes. Con 3 opciones, es fácil estar satisfecho con tu elección. Con 30 opciones, siempre te preguntarás si uno de los otros 29 habría sido mejor.
        </div>
        
        <p>Este fenómeno explica por qué las personas pueden ser menos felices con decisiones objetivamente mejores cuando hay más opciones disponibles.</p>
        """
    },
    {
        "filename": "13_problema_arrepentimiento.html",
        "title": "13. El Problema del Arrepentimiento: 'Si Solo...'",
        "content": """
        <p>El arrepentimiento es una emoción poderosa que puede envenenar nuestra satisfacción con las decisiones que tomamos. En un mundo de opciones limitadas, el arrepentimiento es menor porque hay menos alternativas con las que comparar.</p>
        
        <h3>Arrepentimiento Anticipado vs. Arrepentimiento Retrospectivo</h3>
        <ul>
            <li><strong>Arrepentimiento Anticipado:</strong> La preocupación de que nos arrepentiremos de nuestra elección antes de tomarla. Esto puede paralizarnos y evitar que tomemos cualquier decisión.</li>
            <li><strong>Arrepentimiento Retrospectivo:</strong> El arrepentimiento que sentimos después de tomar una decisión cuando descubrimos que otra opción habría sido mejor.</li>
        </ul>
        
        <h3>El Efecto de la Reversibilidad</h3>
        <p>Muchas personas creen que es mejor tener la opción de revertir una decisión. Pero la investigación muestra que las decisiones irreversibles pueden hacernos más felices porque:</p>
        <ul>
            <li>Nos obligan a comprometernos con nuestra elección.</li>
            <li>Reducen el arrepentimiento porque no podemos cambiar de opinión.</li>
            <li>Nos ayudan a adaptarnos y encontrar satisfacción en lo que tenemos.</li>
        </ul>
        
        <div class="highlight-box">
            <strong>Contraintuitivo:</strong> Estaríamos mejor si las decisiones que tomamos fueran irreversibles. La capacidad de cambiar de opinión puede aumentar nuestra insatisfacción porque siempre estamos considerando si deberíamos haber elegido algo diferente.
        </div>
        """
    },
    {
        "filename": "14_adaptacion.html",
        "title": "14. Por Qué las Decisiones Decepcionan: El Problema de la Adaptación",
        "content": """
        <p>La adaptación hedónica es el proceso por el cual nos acostumbramos a las cosas buenas (y malas) que nos suceden, volviendo a nuestro nivel básico de felicidad. Esto explica por qué las cosas nuevas y emocionantes eventualmente se vuelven normales.</p>
        
        <h3>El Ciclo de la Adaptación</h3>
        <ol>
            <li><strong>Anticipación:</strong> Esperamos que algo nuevo nos haga muy felices.</li>
            <li><strong>Adquisición:</strong> Obtenemos la cosa nueva y experimentamos un aumento temporal de felicidad.</li>
            <li><strong>Adaptación:</strong> Nos acostumbramos a la cosa nueva y volvemos a nuestro nivel básico de felicidad.</li>
            <li><strong>Insatisfacción:</strong> Buscamos la siguiente cosa nueva que nos hará felices.</li>
        </ol>
        
        <h3>La Solución de Más Opciones</h3>
        <p>Cuando hay muchas opciones disponibles, podemos pensar que la solución es simplemente elegir algo mejor. Pero esto crea un ciclo vicioso:</p>
        <ul>
            <li>Elegimos algo nuevo.</li>
            <li>Nos adaptamos a ello.</li>
            <li>Vemos otras opciones que parecen mejores.</li>
            <li>Nos arrepentimos de nuestra elección.</li>
            <li>Buscamos algo mejor.</li>
        </ul>
        
        <div class="highlight-box">
            <strong>La Trampa:</strong> Cuantas más opciones tenemos, más probable es que encontremos algo que parece mejor que lo que elegimos, lo que aumenta nuestro arrepentimiento y disminuye nuestra satisfacción.
        </div>
        """
    },
    {
        "filename": "15_comparacion_social.html",
        "title": "15. Por Qué Todo Sufre de Comparación",
        "content": """
        <p>Una de las razones por las que más opciones no nos hacen más felices es que nos obligan a comparar constantemente nuestras elecciones con las de otros y con otras opciones disponibles.</p>
        
        <h3>Comparación Social</h3>
        <p>Tendemos a evaluar nuestras elecciones comparándolas con:</p>
        <ul>
            <li><strong>Las elecciones de otros:</strong> "¿Elegí mejor que mi vecino?"</li>
            <li><strong>Otras opciones disponibles:</strong> "¿Debería haber elegido la otra opción?"</li>
            <li><strong>Versiones idealizadas:</strong> "¿Podría haber encontrado algo perfecto si hubiera buscado más?"</li>
        </ul>
        
        <h3>El Efecto de las Redes Sociales</h3>
        <p>En la era de las redes sociales, la comparación social se ha intensificado. Vemos constantemente las elecciones de otros (vacaciones, compras, experiencias) y las comparamos con las nuestras. Esto puede hacer que incluso buenas elecciones se sientan insuficientes.</p>
        
        <div class="highlight-box">
            <strong>La Solución:</strong> Estaríamos mejor si prestáramos menos atención a lo que otros a nuestro alrededor están haciendo. Nuestras elecciones deberían evaluarse en función de si cumplen con nuestros propios objetivos y valores, no en función de cómo se comparan con las elecciones de otros.
        </div>
        
        <p>La comparación es inevitable, pero podemos elegir con quién y con qué compararnos. Compararnos con aquellos que tienen menos o con versiones idealizadas de nosotros mismos puede ser destructivo.</p>
        """
    },
    {
        "filename": "16_culpa_depresion.html",
        "title": "16. ¿De Quién es la Culpa? Elección, Decepción y Depresión",
        "content": """
        <p>Schwartz sugiere que el aumento de opciones puede estar contribuyendo a la epidemia reciente de depresión clínica que afecta a gran parte del mundo occidental.</p>
        
        <h3>La Conexión entre Elección y Depresión</h3>
        <p>Cuando hay muchas opciones disponibles y las cosas salen mal, tendemos a culparnos a nosotros mismos. Si solo hubiéramos elegido mejor, las cosas habrían sido diferentes. Esta autocrítica puede contribuir a la depresión.</p>
        
        <h3>El Peso de la Responsabilidad</h3>
        <p>En un mundo con opciones limitadas, cuando las cosas salen mal, podemos culpar a las circunstancias o a la falta de opciones. Pero en un mundo con opciones ilimitadas:</p>
        <ul>
            <li>Si elegimos mal, es nuestra culpa.</li>
            <li>Si no investigamos todas las opciones, es nuestra culpa.</li>
            <li>Si nos arrepentimos de nuestra elección, es nuestra culpa.</li>
        </ul>
        
        <div class="highlight-box">
            <strong>La Paradoja de la Autonomía:</strong> La autonomía es esencial para el bienestar, pero cuando hay demasiadas opciones, la autonomía se convierte en una carga. Cada decisión se siente como una prueba de nuestra competencia y juicio.
        </div>
        
        <p>Este peso de la responsabilidad, combinado con el arrepentimiento constante y la comparación social, puede crear un ciclo de autocrítica y depresión.</p>
        """
    },
    {
        "filename": "17_libertad_negativa_positiva.html",
        "title": "17. Libertad Negativa vs. Libertad Positiva",
        "content": """
        <p>El filósofo político Isaiah Berlin hizo una distinción importante entre "libertad negativa" y "libertad positiva" que es crucial para entender la paradoja de la elección.</p>
        
        <h3>Libertad Negativa</h3>
        <p>"Libertad de" - libertad de restricción, libertad de que otros nos digan qué hacer. Esta es la libertad que obtenemos cuando eliminamos las restricciones y aumentamos las opciones disponibles.</p>
        
        <h3>Libertad Positiva</h3>
        <p>"Libertad para" - la disponibilidad de oportunidades para ser el autor de tu vida y hacerla significativa e importante. Esta es la libertad que obtenemos cuando tenemos la capacidad y los recursos para vivir una vida que consideramos valiosa.</p>
        
        <h3>La Distinción Crítica</h3>
        <p>A menudo, estos dos tipos de libertad van juntos. Pero no siempre. A veces, demasiada libertad negativa (demasiadas opciones) puede impedir la libertad positiva (la capacidad de vivir una vida significativa).</p>
        
        <div class="highlight-box">
            <strong>El Problema:</strong> En lugar de ser fetichistas sobre la libertad de elección, deberíamos preguntarnos si nutre o nos priva, si nos hace móviles o nos limita, si mejora el respeto propio o lo disminuye, y si nos permite participar en nuestras comunidades o nos impide hacerlo.
        </div>
        
        <p>La libertad es esencial para el respeto propio, la participación pública, la movilidad y la nutrición, pero no toda elección mejora la libertad. En particular, el aumento de la elección entre bienes y servicios puede contribuir poco o nada al tipo de libertad que cuenta.</p>
        """
    },
    {
        "filename": "18_estrategias_individuales.html",
        "title": "18. Estrategias Individuales: Qué Podemos Hacer",
        "content": """
        <p>Hay pasos que podemos tomar para mitigar, incluso eliminar, muchas de estas fuentes de angustia. No son fáciles, pero cada uno traerá sus propias recompensas.</p>
        
        <h3>1. Elige Cuándo Elegir</h3>
        <p>No todas las decisiones merecen el mismo nivel de atención. Decide qué decisiones son realmente importantes para ti y dedica tu tiempo y energía a esas. Para las decisiones menos importantes, acepta lo "suficientemente bueno" o delega.</p>
        
        <h3>2. Sé un Satisfactor, No un Maximizador</h3>
        <p>En lugar de buscar siempre la mejor opción, busca una opción que sea "suficientemente buena". Establece criterios claros de lo que es aceptable y detente cuando encuentres algo que los cumpla.</p>
        
        <h3>3. Reduce las Expectativas</h3>
        <p>Cuanto más altas son tus expectativas, más probable es que te sientas decepcionado. Esto no significa que debas conformarte con menos, sino que debes ser realista sobre lo que cualquier elección puede darte.</p>
        
        <div class="highlight-box">
            <strong>4. Haz Decisiones Irreversibles:</strong> Una vez que hayas tomado una decisión, comprométete con ella. No revises constantemente si fue la correcta. La capacidad de cambiar de opinión puede aumentar la insatisfacción.
        </div>
        
        <h3>5. Presta Menos Atención a los Demás</h3>
        <p>Evalúa tus elecciones en función de si cumplen con tus propios objetivos y valores, no en función de cómo se comparan con las elecciones de otros.</p>
        """
    },
    {
        "filename": "19_restricciones_voluntarias.html",
        "title": "19. Abrazar Restricciones Voluntarias",
        "content": """
        <p>Contraintuitivamente, estaríamos mejor si abrazáramos ciertas restricciones voluntarias sobre nuestra libertad de elección, en lugar de rebelarnos contra ellas.</p>
        
        <h3>El Poder de las Restricciones</h3>
        <p>Las restricciones pueden ser liberadoras porque:</p>
        <ul>
            <li><strong>Reducen la carga de decisión:</strong> Menos opciones significa menos tiempo y energía gastados en elegir.</li>
            <li><strong>Aumentan el compromiso:</strong> Cuando no puedes cambiar de opinión, te comprometes más con tu elección.</li>
            <li><strong>Mejoran la satisfacción:</strong> Cuando no hay otras opciones disponibles, es más fácil estar satisfecho con lo que tienes.</li>
        </ul>
        
        <h3>Ejemplos de Restricciones Voluntarias</h3>
        <ul>
            <li><strong>Rutinas:</strong> Comer en los mismos restaurantes, comprar las mismas marcas, seguir los mismos horarios.</li>
            <li><strong>Reglas personales:</strong> "Nunca compro nada sin pensarlo durante una semana" o "Solo considero opciones dentro de un presupuesto específico".</li>
            <li><strong>Compromisos a largo plazo:</strong> Matrimonio, carreras, ubicaciones geográficas.</li>
        </ul>
        
        <div class="highlight-box">
            <strong>La Paradoja:</strong> Al limitar nuestras opciones voluntariamente, en realidad aumentamos nuestra libertad para concentrarnos en lo que realmente importa. La libertad no es la ausencia de restricciones, sino la capacidad de elegir las restricciones correctas.
        </div>
        """
    },
    {
        "filename": "20_suficientemente_bueno.html",
        "title": "20. La Filosofía de 'Suficientemente Bueno'",
        "content": """
        <p>La búsqueda constante de "lo mejor" puede ser agotadora e insatisfactoria. En su lugar, deberíamos buscar lo que es "suficientemente bueno".</p>
        
        <h3>¿Qué es 'Suficientemente Bueno'?</h3>
        <p>"Suficientemente bueno" no significa conformarse con menos. Significa:</p>
        <ul>
            <li>Establecer criterios claros de lo que es aceptable.</li>
            <li>Detenerse cuando encuentres algo que cumpla con esos criterios.</li>
            <li>No buscar más opciones una vez que hayas encontrado algo aceptable.</li>
        </ul>
        
        <h3>Los Beneficios</h3>
        <p>Buscar lo "suficientemente bueno" en lugar de "lo mejor":</p>
        <ul>
            <li>Ahorra tiempo y energía.</li>
            <li>Reduce la ansiedad y el estrés.</li>
            <li>Aumenta la satisfacción con las decisiones.</li>
            <li>Reduce el arrepentimiento.</li>
            <li>Permite concentrarse en decisiones más importantes.</li>
        </ul>
        
        <div class="highlight-box">
            <strong>Ejemplo:</strong> En lugar de pasar horas investigando el mejor restaurante, elige uno que tenga buenas reseñas y esté cerca. Es probable que disfrutes la comida tanto como si hubieras encontrado el "mejor" restaurante, y habrás ahorrado tiempo y energía.
        </div>
        
        <p>Recuerda: "¿Has oído alguna vez a un padre decir: 'Solo quiero lo suficientemente bueno para mis hijos'?" Probablemente no. Pero tal vez deberíamos.</p>
        """
    },
    {
        "filename": "21_gratitud_satisfaccion.html",
        "title": "21. Gratitud y Satisfacción con lo que Tenemos",
        "content": """
        <p>Una de las formas más efectivas de combatir la insatisfacción que viene con demasiadas opciones es practicar la gratitud y aprender a estar satisfecho con lo que tenemos.</p>
        
        <h3>El Problema de la Comparación Constante</h3>
        <p>Cuando hay muchas opciones disponibles, es fácil comparar constantemente lo que tenemos con lo que podríamos tener. Esta comparación constante puede hacer que incluso buenas elecciones se sientan insuficientes.</p>
        
        <h3>La Práctica de la Gratitud</h3>
        <p>La gratitud es el antídoto a la comparación constante. Cuando practicamos la gratitud:</p>
        <ul>
            <li>Nos enfocamos en lo que tenemos en lugar de lo que no tenemos.</li>
            <li>Apreciamos las cualidades positivas de nuestras elecciones.</li>
            <li>Reconocemos que muchas personas tienen menos opciones que nosotros.</li>
            <li>Reducimos el arrepentimiento y la insatisfacción.</li>
        </ul>
        
        <div class="highlight-box">
            <strong>Ejercicio:</strong> Antes de buscar nuevas opciones, tómate un momento para apreciar lo que ya tienes. Haz una lista de las cosas por las que estás agradecido. Esto puede ayudarte a ver que tus elecciones actuales son más que suficientes.
        </div>
        
        <p>La satisfacción no viene de tener más opciones o mejores opciones. Viene de aprender a estar satisfecho con las opciones que tenemos.</p>
        """
    },
    {
        "filename": "22_decisiones_importantes.html",
        "title": "22. Priorizar Decisiones Importantes",
        "content": """
        <p>No todas las decisiones son iguales. Algunas tienen consecuencias significativas para nuestras vidas, mientras que otras son relativamente triviales. Una estrategia clave es priorizar nuestras decisiones.</p>
        
        <h3>Clasificación de Decisiones</h3>
        <p>Clasifica tus decisiones en tres categorías:</p>
        <ul>
            <li><strong>Críticas:</strong> Decisiones que tienen consecuencias significativas a largo plazo (carrera, relaciones, salud, finanzas importantes). Dedica tiempo y energía a estas.</li>
            <li><strong>Importantes:</strong> Decisiones que importan pero no son críticas (dónde vivir, qué auto comprar). Dedica atención moderada.</li>
            <li><strong>Triviales:</strong> Decisiones que tienen poco impacto (qué comer, qué ver en TV). Toma decisiones rápidas o usa rutinas.</li>
        </ul>
        
        <h3>La Regla del 80/20</h3>
        <p>Aplica el principio de Pareto: el 20% de tus decisiones probablemente representan el 80% de tu satisfacción. Identifica ese 20% y dedica la mayor parte de tu tiempo y energía a esas decisiones.</p>
        
        <div class="highlight-box">
            <strong>Estrategia:</strong> Para decisiones triviales, establece reglas o rutinas. Por ejemplo, "Siempre compro la misma marca de leche" o "Solo como en estos tres restaurantes". Esto libera tiempo mental para decisiones más importantes.
        </div>
        
        <p>Al priorizar nuestras decisiones, podemos reducir la sobrecarga de elección sin sacrificar la calidad de nuestras decisiones importantes.</p>
        """
    },
    {
        "filename": "23_limitar_opciones.html",
        "title": "23. Limitar Opciones Activamente",
        "content": """
        <p>En lugar de considerar todas las opciones disponibles, podemos limitar activamente el número de opciones que consideramos.</p>
        
        <h3>Estrategias para Limitar Opciones</h3>
        <ul>
            <li><strong>Establece criterios de exclusión:</strong> Antes de buscar opciones, decide qué características son esenciales y elimina cualquier opción que no las tenga.</li>
            <li><strong>Usa límites artificiales:</strong> "Solo consideraré las primeras 5 opciones que encuentre" o "Solo buscaré durante 30 minutos".</li>
            <li><strong>Confía en recomendaciones:</strong> En lugar de investigar todo, pide recomendaciones a personas de confianza.</li>
            <li><strong>Usa filtros:</strong> Usa herramientas que filtren opciones según tus criterios.</li>
        </ul>
        
        <h3>El Poder de Decir "No"</h3>
        <p>Una de las habilidades más importantes en un mundo de opciones ilimitadas es la capacidad de decir "no" a opciones adicionales. Cada vez que consideras una nueva opción, estás agregando complejidad a tu decisión.</p>
        
        <div class="highlight-box">
            <strong>Regla de Oro:</strong> Si ya has encontrado una opción que cumple con tus criterios, detente. No busques más opciones solo porque están disponibles. Más opciones no siempre significan mejores resultados.
        </div>
        
        <p>Limitar opciones no es una limitación de tu libertad; es una forma de ejercer tu libertad de manera más efectiva.</p>
        """
    },
    {
        "filename": "24_cultura_eleccion.html",
        "title": "24. Cambiar Nuestra Cultura de Elección",
        "content": """
        <p>El problema de la sobrecarga de elección no es solo individual; es cultural. Como sociedad, necesitamos repensar nuestra relación con la elección.</p>
        
        <h3>El Mito de 'Más es Mejor'</h3>
        <p>Nuestra cultura ha santificado la libertad de elección tan profundamente que los beneficios de opciones infinitas parecen evidentes. Pero la investigación muestra que esto no es cierto.</p>
        
        <h3>El Papel de las Empresas</h3>
        <p>Las empresas pueden ayudar reduciendo opciones en lugar de aumentarlas:</p>
        <ul>
            <li>Ofrecer "curated selections" (selecciones curadas) en lugar de mostrar todo.</li>
            <li>Usar recomendaciones personalizadas para reducir opciones.</li>
            <li>Simplificar procesos de decisión.</li>
        </ul>
        
        <h3>El Papel de la Educación</h3>
        <p>La educación puede ayudar enseñando:</p>
        <ul>
            <li>Cómo tomar decisiones efectivas.</li>
            <li>Cuándo buscar más opciones y cuándo detenerse.</li>
            <li>Cómo ser satisfactores en lugar de maximizadores.</li>
            <li>El valor de las restricciones voluntarias.</li>
        </ul>
        
        <div class="highlight-box">
            <strong>Visión:</strong> Una cultura que valora la elección inteligente sobre la elección abundante, que reconoce que más opciones no siempre significan más felicidad, y que abraza el poder de las restricciones voluntarias.
        </div>
        """
    },
    {
        "filename": "25_conclusion.html",
        "title": "25. Conclusión: Hacer lo Mejor de Nuestras Libertades",
        "content": """
        <p>Hacemos lo mejor de nuestras libertades aprendiendo a hacer buenas elecciones sobre las cosas que importan, mientras al mismo tiempo nos liberamos de demasiada preocupación sobre las cosas que no importan.</p>
        
        <h3>Los Principios Clave</h3>
        <ol>
            <li><strong>Elige cuándo elegir:</strong> No todas las decisiones merecen el mismo nivel de atención.</li>
            <li><strong>Sé un satisfactor:</strong> Busca lo "suficientemente bueno" en lugar de "lo mejor".</li>
            <li><strong>Reduce expectativas:</strong> Sé realista sobre lo que cualquier elección puede darte.</li>
            <li><strong>Haz decisiones irreversibles:</strong> Comprométete con tus elecciones.</li>
            <li><strong>Presta menos atención a los demás:</strong> Evalúa tus elecciones según tus propios valores.</li>
            <li><strong>Abraza restricciones voluntarias:</strong> Limita tus opciones para aumentar tu libertad.</li>
            <li><strong>Practica gratitud:</strong> Aprecia lo que tienes en lugar de buscar constantemente algo mejor.</li>
        </ol>
        
        <div class="highlight-box">
            <strong>Mensaje Final:</strong> La libertad de elección es esencial para el bienestar, pero más elección no siempre significa más libertad. La verdadera libertad viene de aprender a elegir sabiamente, no de tener opciones ilimitadas.
        </div>
        
        <p>Al aplicar estos principios, podemos aprovechar lo positivo de nuestra libertad de elección moderna mientras evitamos lo negativo. Podemos vivir vidas más satisfactorias, menos estresantes y más significativas, incluso en un mundo de opciones aparentemente ilimitadas.</p>
        
        <p>Gracias por explorar la paradoja de la elección con este libro. Que encuentres el equilibrio perfecto entre autonomía y paz mental.</p>
        """
    }
]

# Common CSS for all files
css_style = """
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #e0e0e0;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #121212;
        }
        h1 {
            color: #00e5ff;
            text-align: center;
            margin-bottom: 30px;
            text-shadow: 0 0 10px rgba(0, 229, 255, 0.3);
        }
        h3 {
            color: #b388ff;
            border-bottom: 2px solid #b388ff;
            padding-bottom: 10px;
            margin-top: 30px;
        }
        p {
            margin-bottom: 15px;
            text-align: justify;
        }
        ul, ol {
            margin-bottom: 15px;
        }
        li {
            margin-bottom: 5px;
        }
        .highlight-box {
            background-color: #1e1e1e;
            border-left: 5px solid #00e5ff;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        }
        strong {
            color: #00e5ff;
        }
    </style>
"""

for lesson in lessons:
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

print("✅ 25 Lecciones creadas exitosamente para el libro 052 (The Paradox of Choice).")
