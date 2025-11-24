import os

base_path = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/050/lecciones"
os.makedirs(base_path, exist_ok=True)

lessons = [
    {
        "filename": "01_introduccion.html",
        "title": "1. Introducción a la Economía de Tokens",
        "content": """
        <p>Bienvenido a la Economía de Tokens. Shermin Voshmgir nos guía a través de la revolución de la Web3, donde el valor se programa y se transfiere tan fácilmente como la información. No se trata solo de Bitcoin o dinero digital, sino de reinventar cómo nos organizamos, colaboramos y creamos valor en internet.</p>
        
        <h3>¿Por qué importa esto?</h3>
        <p>La Web actual (Web2) está dominada por intermediarios centralizados (Google, Facebook, bancos) que controlan nuestros datos y transacciones. La Web3 promete una internet descentralizada, donde los usuarios son dueños de sus datos y activos.</p>
        
        <div class="highlight-box">
            <strong>Concepto Clave:</strong> Un "Token" no es solo una moneda; es una unidad de valor programable que puede representar cualquier cosa: dinero, derechos de voto, propiedad, identidad o acceso a servicios.
        </div>
        
        <p>Este libro es un mapa para entender cómo esta nueva infraestructura tecnológica está creando una nueva capa económica sobre internet.</p>
        """
    },
    {
        "filename": "02_web3_stateful.html",
        "title": "2. Web3: La Web con Estado",
        "content": """
        <p>La Web original (Web1) era estática (solo lectura). La Web2 es interactiva (lectura-escritura) pero "sin estado" (stateless): el protocolo HTTP no recuerda quién eres ni qué tienes; esa información la guardan servidores privados centralizados.</p>
        
        <h3>El Cambio de Paradigma</h3>
        <p>La Web3 introduce una "capa de estado" universal y compartida. Gracias a la blockchain, la red misma recuerda quién posee qué (dinero, identidad, contenido) sin necesidad de un intermediario central. Es una "máquina de estado" global.</p>
        
        <div class="highlight-box">
            <strong>Diferencia:</strong> En la Web2, confías en el banco para saber tu saldo. En la Web3, confías en el código y en la red descentralizada para verificar tu saldo.
        </div>
        
        <p>Esto permite transacciones peer-to-peer (P2P) verdaderas, eliminando la necesidad de "hombres de confianza" en el medio.</p>
        """
    },
    {
        "filename": "03_que_es_blockchain.html",
        "title": "3. ¿Qué es Blockchain?",
        "content": """
        <p>Blockchain es la tecnología subyacente de Bitcoin y la Web3. Es un libro de contabilidad (ledger) distribuido, inmutable y transparente. Imagina una hoja de cálculo de Google compartida que nadie puede borrar ni modificar unilateralmente, pero todos pueden verificar.</p>
        
        <h3>Bloques y Cadenas</h3>
        <p>Las transacciones se agrupan en "bloques". Cada bloque contiene una huella digital (hash) del bloque anterior, formando una "cadena". Si intentas cambiar un registro antiguo, tendrías que reescribir toda la cadena subsiguiente, lo cual es computacionalmente imposible en una red segura.</p>
        
        <div class="highlight-box">
            <strong>Propiedades:</strong> Descentralización (nadie manda), Inmutabilidad (no se puede borrar), Transparencia (auditable por todos) y Seguridad (criptografía).
        </div>
        
        <p>Blockchain no es solo una base de datos lenta; es una máquina de confianza automatizada.</p>
        """
    },
    {
        "filename": "04_bitcoin_dlt.html",
        "title": "4. Bitcoin y DLT",
        "content": """
        <p>Bitcoin fue la primera aplicación exitosa de la tecnología blockchain. Resolvió el problema del "doble gasto" en dinero digital sin necesidad de un banco central. Sin embargo, Blockchain es solo un tipo de Tecnología de Libro Mayor Distribuido (DLT).</p>
        
        <h3>Más allá de Blockchain</h3>
        <p>Existen otras formas de DLT, como los Grafos Acíclicos Dirigidos (DAG) usados por IOTA. Mientras que blockchain ordena transacciones en bloques lineales, los DAGs permiten transacciones paralelas.</p>
        
        <div class="highlight-box">
            <strong>Hito:</strong> El paper de Satoshi Nakamoto (2008) combinó criptografía, redes P2P y teoría de juegos para crear un sistema económico autónomo y resistente a la censura.
        </div>
        
        <p>Entender Bitcoin es el primer paso para entender la economía de tokens, ya que estableció los principios básicos de escasez digital y consenso descentralizado.</p>
        """
    },
    {
        "filename": "05_mecanismos_consenso.html",
        "title": "5. Mecanismos de Consenso: PoW",
        "content": """
        <p>En una red sin jefe, ¿cómo nos ponemos de acuerdo sobre la verdad? Aquí entran los mecanismos de consenso. El más famoso es Proof of Work (PoW), usado por Bitcoin.</p>
        
        <h3>Prueba de Trabajo (Mining)</h3>
        <p>Los "mineros" compiten para resolver un acertijo matemático complejo. El primero que lo resuelve gana el derecho a escribir el siguiente bloque y recibe bitcoins como recompensa. Este gasto de energía hace que atacar la red sea extremadamente costoso.</p>
        
        <div class="highlight-box">
            <strong>Crítica y Evolución:</strong> PoW es muy seguro pero consume mucha energía. Nuevos sistemas como Proof of Stake (PoS) buscan lograr el mismo consenso sin el gasto energético masivo.
        </div>
        
        <p>El consenso es el corazón de la blockchain: garantiza que todos vean la misma realidad sin confiar unos en otros.</p>
        """
    },
    {
        "filename": "06_nodos_red.html",
        "title": "6. Nodos de Red y Seguridad",
        "content": """
        <p>Una blockchain vive en una red de computadoras llamadas "nodos". Cada nodo guarda una copia completa o parcial del historial de transacciones. Cuantos más nodos haya, más descentralizada y segura es la red.</p>
        
        <h3>Tipos de Nodos</h3>
        <ul>
            <li><strong>Nodos Completos:</strong> Guardan toda la blockchain y validan todas las reglas. Son los guardianes de la red.</li>
            <li><strong>Nodos Mineros:</strong> Crean nuevos bloques.</li>
            <li><strong>Nodos Ligeros:</strong> Solo guardan cabeceras de bloques, útiles para móviles.</li>
        </ul>
        
        <div class="highlight-box">
            <strong>Resiliencia:</strong> Si una bomba nuclear destruye la mitad del planeta, la red Bitcoin seguiría funcionando mientras quede un solo nodo con internet.
        </div>
        
        <p>Ejecutar un nodo es un acto de soberanía: verificas tus propias transacciones sin confiar en terceros.</p>
        """
    },
    {
        "filename": "07_ataques_red.html",
        "title": "7. Ataques a la Red",
        "content": """
        <p>Aunque las blockchains son seguras, no son invulnerables. Entender los vectores de ataque es crucial para diseñar sistemas robustos.</p>
        
        <h3>Ataque del 51%</h3>
        <p>Si una sola entidad controla más del 50% del poder de computación (hashrate) de la red, puede reescribir el historial reciente y gastar monedas dos veces. En redes grandes como Bitcoin es casi imposible por el costo, pero en redes pequeñas es un riesgo real.</p>
        
        <h3>Ataque Sybil</h3>
        <p>Un atacante crea miles de identidades falsas (nodos) para influir en la red. Los mecanismos de consenso (PoW, PoS) previenen esto exigiendo un costo (energía o dinero) para participar.</p>
        
        <div class="highlight-box">
            <strong>Lección:</strong> La seguridad en blockchain es económica. Cuesta dinero atacar la red. Si el beneficio del ataque es menor que el costo, la red es segura.
        </div>
        """
    },
    {
        "filename": "08_forks.html",
        "title": "8. Forks y Divisiones",
        "content": """
        <p>El software de blockchain es de código abierto y evoluciona. Cuando hay un desacuerdo sobre cómo actualizar el protocolo, puede ocurrir un "Fork" (bifurcación).</p>
        
        <h3>Soft Fork vs. Hard Fork</h3>
        <ul>
            <li><strong>Soft Fork:</strong> Actualización compatible hacia atrás. Los nodos viejos siguen funcionando.</li>
            <li><strong>Hard Fork:</strong> Cambio radical incompatible. La cadena se divide en dos. Ejemplo: Bitcoin (BTC) y Bitcoin Cash (BCH).</li>
        </ul>
        
        <div class="highlight-box">
            <strong>Gobernanza:</strong> Los forks son el mecanismo de resolución de disputas definitivo. Si no te gusta el rumbo del proyecto, puedes copiar el código y crear tu propia versión.
        </div>
        
        <p>Los forks demuestran que el poder final reside en los usuarios y mineros, que deciden qué versión del software ejecutar.</p>
        """
    },
    {
        "filename": "09_smart_contracts.html",
        "title": "9. Contratos Inteligentes",
        "content": """
        <p>Un Smart Contract no es ni inteligente ni un contrato legal. Es un programa informático que se ejecuta en la blockchain. Contiene reglas "Si X, entonces Y" que se ejecutan automáticamente sin intermediarios.</p>
        
        <h3>Código es Ley</h3>
        <p>Ejemplo: Una máquina expendedora es un contrato inteligente primitivo. Si pones dinero y seleccionas A1, te da una soda. No necesitas un vendedor. En blockchain, esto permite crear acuerdos complejos (préstamos, seguros, votaciones) inmutables.</p>
        
        <div class="highlight-box">
            <strong>Ventaja:</strong> Automatización, transparencia y reducción de costos de confianza.
            <strong>Riesgo:</strong> Si el código tiene un error (bug), puede ser explotado y no hay "atención al cliente" para revertirlo.
        </div>
        
        <p>Los Smart Contracts son los ladrillos con los que se construyen las aplicaciones descentralizadas (DApps).</p>
        """
    },
    {
        "filename": "10_ethereum.html",
        "title": "10. Ethereum: Computadora Mundial",
        "content": """
        <p>Mientras Bitcoin es una calculadora (solo maneja transacciones), Ethereum es un ordenador completo. Vitalik Buterin propuso Ethereum para permitir a los desarrolladores escribir cualquier tipo de programa (Smart Contract) sobre blockchain.</p>
        
        <h3>EVM (Ethereum Virtual Machine)</h3>
        <p>Es el entorno donde viven los contratos inteligentes. Para ejecutar código, pagas una tarifa llamada "Gas" (en Ether). Esto evita bucles infinitos y spam en la red.</p>
        
        <div class="highlight-box">
            <strong>Innovación:</strong> Ethereum permitió la creación de tokens propios (ERC-20), NFTs (ERC-721) y todo el ecosistema DeFi. Fue el nacimiento real de la economía de tokens programable.
        </div>
        
        <p>Ethereum transformó la blockchain de un sistema de pagos a una plataforma de desarrollo global.</p>
        """
    },
    {
        "filename": "11_que_es_token.html",
        "title": "11. ¿Qué es un Token?",
        "content": """
        <p>Un token es la representación digital de un valor en una blockchain. A diferencia de una criptomoneda nativa (como BTC o ETH) que sirve para incentivar la red, un token se crea SOBRE una red existente (como Ethereum) mediante un contrato inteligente.</p>
        
        <h3>Capas de Valor</h3>
        <p>Los tokens pueden representar:</p>
        <ul>
            <li>Activos nativos digitales (monedas de juegos, reputación).</li>
            <li>Activos del mundo real (oro, acciones, bienes raíces).</li>
            <li>Derechos de acceso (licencias de software, entradas a eventos).</li>
        </ul>
        
        <div class="highlight-box">
            <strong>Tokenización:</strong> Es el proceso de convertir derechos de un activo en un token digital. Esto aumenta la liquidez y permite la propiedad fraccionada.
        </div>
        
        <p>En la Web3, casi cualquier cosa puede ser tokenizada.</p>
        """
    },
    {
        "filename": "12_fungible_vs_nft.html",
        "title": "12. Fungible vs. No Fungible (NFT)",
        "content": """
        <p>La distinción más básica en tokens es la fungibilidad.</p>
        
        <h3>Tokens Fungibles (ERC-20)</h3>
        <p>Son intercambiables e idénticos. Un Bitcoin vale lo mismo que otro Bitcoin. Un billete de $10 es igual a otro. Sirven como moneda, acciones o puntos de fidelidad.</p>
        
        <h3>Tokens No Fungibles (ERC-721)</h3>
        <p>Son únicos e irrepetibles. Representan cosas singulares: una obra de arte, una casa, un personaje de videojuego o un certificado de identidad. No puedes cambiar uno por otro equitativamente.</p>
        
        <div class="highlight-box">
            <strong>Revolución NFT:</strong> Introdujeron la escasez digital verificable para el arte y los coleccionables, permitiendo a los creadores monetizar su trabajo directamente.
        </div>
        """
    },
    {
        "filename": "13_utility_vs_security.html",
        "title": "13. Utility vs. Security Tokens",
        "content": """
        <p>Esta es una distinción legal crucial. Dependiendo de su diseño, un token puede caer en diferentes categorías regulatorias.</p>
        
        <h3>Utility Tokens (Fichas de Uso)</h3>
        <p>Dan acceso a un producto o servicio futuro. Son como fichas de casino o cupones de preventa. No están diseñados como inversión (aunque la gente especule).</p>
        
        <h3>Security Tokens (Valores)</h3>
        <p>Representan una inversión financiera con expectativa de beneficio (dividendos, apreciación) derivado del esfuerzo de terceros. Son análogos a las acciones y están fuertemente regulados (SEC).</p>
        
        <div class="highlight-box">
            <strong>Test de Howey:</strong> Es la prueba legal usada en EE.UU. para determinar si un activo es un "security". Muchos proyectos crypto intentan evitar esta clasificación para esquivar regulaciones estrictas.
        </div>
        """
    },
    {
        "filename": "14_stablecoins.html",
        "title": "14. Stablecoins",
        "content": """
        <p>La volatilidad de las criptomonedas (Bitcoin puede subir o bajar 20% en un día) dificulta su uso como medio de pago diario. Las Stablecoins solucionan esto vinculando su valor a un activo estable (generalmente el Dólar).</p>
        
        <h3>Tipos de Stablecoins</h3>
        <ul>
            <li><strong>Respaldadas por Fiat (USDT, USDC):</strong> Una empresa guarda dólares en el banco y emite tokens 1:1. Centralizadas.</li>
            <li><strong>Respaldadas por Crypto (DAI):</strong> Usan colaterales en crypto y algoritmos para mantener la estabilidad. Descentralizadas.</li>
            <li><strong>Algorítmicas:</strong> Sin respaldo, usan incentivos de oferta/demanda (riesgosas).</li>
        </ul>
        
        <div class="highlight-box">
            <strong>Importancia:</strong> Son el puente entre el mundo fiat y el mundo crypto, permitiendo a los traders refugiarse de la volatilidad sin salir del ecosistema blockchain.
        </div>
        """
    },
    {
        "filename": "15_privacy_tokens.html",
        "title": "15. Privacy Tokens",
        "content": """
        <p>Bitcoin es pseudónimo, no anónimo. Todas las transacciones son públicas y rastreables. Los Privacy Tokens (como Monero o Zcash) utilizan criptografía avanzada para ocultar el remitente, el destinatario y el monto.</p>
        
        <h3>Tecnología Zero-Knowledge Proofs (ZKP)</h3>
        <p>Permite probar que sabes algo (o que tienes fondos suficientes) sin revelar la información en sí. Es magia matemática para la privacidad.</p>
        
        <div class="highlight-box">
            <strong>Debate:</strong> La privacidad es un derecho humano fundamental, pero también facilita actividades ilícitas. Los reguladores suelen ser hostiles hacia los privacy tokens.
        </div>
        
        <p>En un mundo de vigilancia digital, estas herramientas son esenciales para preservar la libertad financiera.</p>
        """
    },
    {
        "filename": "16_token_engineering.html",
        "title": "16. Token Engineering",
        "content": """
        <p>Crear un token no es solo escribir código; es diseñar una economía. Token Engineering es una disciplina emergente que combina ingeniería de sistemas, teoría de juegos, economía y derecho.</p>
        
        <h3>Incentivos</h3>
        <p>El objetivo es alinear los incentivos de todos los participantes (usuarios, desarrolladores, inversores) para que, al actuar en su propio interés, beneficien a la red. Si los incentivos están mal diseñados, el sistema colapsará (como Terra/Luna).</p>
        
        <div class="highlight-box">
            <strong>Diseño:</strong> Se definen la política monetaria (emisión, quema), los mecanismos de gobernanza y los bucles de retroalimentación. Se usan simulaciones para probar la robustez del sistema antes de lanzarlo.
        </div>
        """
    },
    {
        "filename": "17_daos.html",
        "title": "17. Gobernanza Descentralizada (DAOs)",
        "content": """
        <p>Una DAO (Organización Autónoma Descentralizada) es una empresa sin CEO ni oficinas, gestionada por código y votaciones de los poseedores de tokens.</p>
        
        <h3>Democracia Líquida</h3>
        <p>Los miembros proponen y votan sobre cómo usar los fondos de la tesorería o cómo actualizar el protocolo. Las reglas están escritas en smart contracts, garantizando que se cumplan los resultados de las votaciones.</p>
        
        <div class="highlight-box">
            <strong>Futuro del Trabajo:</strong> Las DAOs permiten la colaboración global y flexible. Puedes trabajar para varias DAOs a la vez, recibiendo tokens por tus contribuciones específicas.
        </div>
        
        <p>Sin embargo, las DAOs enfrentan retos de eficiencia, participación y legalidad que aún se están resolviendo.</p>
        """
    },
    {
        "filename": "18_identidad_soberana.html",
        "title": "18. Identidad Soberana (SSI)",
        "content": """
        <p>En la Web2, tu identidad digital (Google, Facebook) pertenece a corporaciones. En la Web3, surge la Identidad Soberana (Self-Sovereign Identity).</p>
        
        <h3>Tú eres el dueño</h3>
        <p>Creas tu identidad en la blockchain (DID - Decentralized Identifier). Tú controlas tus credenciales (título universitario, pasaporte, historial crediticio) y decides quién puede verlas y por cuánto tiempo. No dependes de un proveedor centralizado.</p>
        
        <div class="highlight-box">
            <strong>Beneficio:</strong> Portabilidad y privacidad. No tienes que rellenar formularios una y otra vez. Te logueas con tu wallet, no con un correo y contraseña.
        </div>
        
        <p>Es la base para una reputación digital que te pertenece verdaderamente.</p>
        """
    },
    {
        "filename": "19_defi.html",
        "title": "19. Finanzas Descentralizadas (DeFi)",
        "content": """
        <p>DeFi reconstruye el sistema financiero tradicional (bancos, bolsas, seguros) sobre blockchain, eliminando intermediarios.</p>
        
        <h3>Legos de Dinero</h3>
        <p>Puedes prestar dinero y ganar intereses (Lending), intercambiar monedas (DEXs como Uniswap), o comprar seguros, todo mediante smart contracts y sin permiso de nadie (permissionless).</p>
        
        <div class="highlight-box">
            <strong>Innovación:</strong> "Yield Farming" y "Liquidity Mining" son formas de ganar tokens proveyendo liquidez a estos protocolos. Es un sistema financiero abierto, global y que funciona 24/7.
        </div>
        
        <p>DeFi democratiza el acceso a servicios financieros complejos que antes eran exclusivos de grandes inversores.</p>
        """
    },
    {
        "filename": "20_oraculos.html",
        "title": "20. Oráculos",
        "content": """
        <p>Las blockchains son sistemas cerrados; no saben qué precio tiene el dólar, quién ganó el partido de fútbol o qué temperatura hace. Los Oráculos son los puentes que traen datos del mundo real a la blockchain.</p>
        
        <h3>El Problema del Oráculo</h3>
        <p>Si un smart contract depende de un solo oráculo centralizado, se pierde la descentralización. Si el oráculo miente, el contrato falla. Proyectos como Chainlink buscan crear redes de oráculos descentralizados para garantizar la veracidad de los datos.</p>
        
        <div class="highlight-box">
            <strong>Uso:</strong> Imprescindibles para DeFi (precios de activos), seguros (datos climáticos) y apuestas. Sin oráculos, la utilidad de los smart contracts es muy limitada.
        </div>
        """
    },
    {
        "filename": "21_escalabilidad.html",
        "title": "21. Escalabilidad: L1 y L2",
        "content": """
        <p>El trilema de la blockchain dice que es difícil lograr Descentralización, Seguridad y Escalabilidad al mismo tiempo. Ethereum, por ejemplo, se congestiona y las tarifas suben.</p>
        
        <h3>Soluciones</h3>
        <ul>
            <li><strong>Layer 1 (Capa Base):</strong> Mejorar la blockchain principal (ej: Ethereum 2.0, Solana) para procesar más transacciones.</li>
            <li><strong>Layer 2 (Segunda Capa):</strong> Construir redes rápidas encima de la blockchain principal (ej: Lightning Network para Bitcoin, Optimism/Arbitrum para Ethereum). Procesan miles de transacciones fuera y luego asientan el resultado final en la cadena principal.</li>
        </ul>
        
        <div class="highlight-box">
            <strong>Meta:</strong> Lograr la velocidad de Visa con la seguridad de Bitcoin.
        </div>
        """
    },
    {
        "filename": "22_interoperabilidad.html",
        "title": "22. Interoperabilidad",
        "content": """
        <p>Actualmente, hay muchas blockchains aisladas (silos). Bitcoin no habla con Ethereum. La interoperabilidad busca conectar estas redes para que los activos y datos fluyan libremente entre ellas.</p>
        
        <h3>Puentes (Bridges) y Polkadot/Cosmos</h3>
        <p>Tecnologías como los "Bridges" permiten mover tokens de una cadena a otra. Proyectos como Polkadot y Cosmos están diseñados específicamente como "internet de blockchains", permitiendo que diferentes cadenas se comuniquen de forma nativa.</p>
        
        <div class="highlight-box">
            <strong>Futuro Multi-Chain:</strong> No habrá una sola blockchain ganadora, sino un ecosistema de muchas cadenas especializadas conectadas entre sí.
        </div>
        """
    },
    {
        "filename": "23_regulacion.html",
        "title": "23. Regulación y Cumplimiento",
        "content": """
        <p>La tecnología avanza más rápido que la ley. Los gobiernos están luchando por entender y regular la Web3. Los temas clave son impuestos, lavado de dinero (AML/KYC) y protección al inversor.</p>
        
        <h3>El Choque Cultural</h3>
        <p>La filosofía cypherpunk de "código es ley" choca con la jurisdicción estatal. Sin embargo, para la adopción masiva institucional, se necesita claridad regulatoria.</p>
        
        <div class="highlight-box">
            <strong>Tendencia:</strong> Regulación de los puntos de entrada/salida (Exchanges centralizados) mientras se intenta regular (con dificultad) los protocolos DeFi descentralizados.
        </div>
        
        <p>La regulación inteligente puede fomentar la innovación; la prohibición solo la empuja a la clandestinidad o a otros países.</p>
        """
    },
    {
        "filename": "24_futuro_web3.html",
        "title": "24. El Futuro de la Web3",
        "content": """
        <p>Estamos en la fase de "dial-up" de la Web3. La experiencia de usuario (UX) aún es compleja y técnica. El futuro implica abstracción: usar Web3 sin saber que usas Web3.</p>
        
        <h3>Tendencias Emergentes</h3>
        <ul>
            <li><strong>Social Tokens:</strong> Monetización directa de comunidades.</li>
            <li><strong>Metaverso:</strong> Economías virtuales completas basadas en NFTs.</li>
            <li><strong>ReFi (Regenerative Finance):</strong> Usar crypto para financiar bienes públicos y acción climática.</li>
        </ul>
        
        <div class="highlight-box">
            <strong>Visión:</strong> Una internet más justa, donde el valor fluye hacia quienes lo crean, no hacia quienes controlan las plataformas.
        </div>
        """
    },
    {
        "filename": "25_conclusion.html",
        "title": "25. Conclusión: Nueva Economía",
        "content": """
        <p>La "Token Economy" no es solo una actualización tecnológica; es una actualización socioeconómica. Estamos pasando de instituciones jerárquicas centralizadas a redes distribuidas y colaborativas.</p>
        
        <h3>Tu Rol en la Web3</h3>
        <p>Ya no eres solo un usuario o consumidor. Eres un participante, un propietario y un gobernante de las redes que utilizas. La barrera de entrada para crear instrumentos financieros u organizaciones globales ha desaparecido.</p>
        
        <div class="highlight-box">
            <strong>Mensaje Final:</strong> La tecnología es neutral. Depende de nosotros diseñar estos nuevos sistemas para que sean inclusivos, justos y sostenibles. La revolución apenas comienza.
        </div>
        
        <p>Gracias por explorar el futuro de internet con este libro.</p>
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
        ul {
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
        /* No navigation buttons inside lessons as requested */
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

print("✅ 25 Lecciones creadas exitosamente para el libro 050 (Token Economy).")
