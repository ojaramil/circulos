import os

base_path = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/050/juegos"
os.makedirs(base_path, exist_ok=True)

# Common CSS for games (Dark Tech Theme)
game_css = """
    <style>
        body {
            font-family: 'Courier New', Courier, monospace;
            background-color: #0a0a12;
            color: #00ff41;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container {
            background: #111;
            border: 1px solid #333;
            border-radius: 5px;
            padding: 30px;
            max-width: 900px;
            width: 100%;
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.1);
        }
        h1 {
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 10px;
            color: #fff;
            border-bottom: 2px solid #00ff41;
            padding-bottom: 10px;
        }
        .subtitle {
            text-align: center;
            color: #888;
            margin-bottom: 30px;
        }
        .btn {
            background: transparent;
            color: #00ff41;
            border: 1px solid #00ff41;
            padding: 10px 20px;
            cursor: pointer;
            font-family: inherit;
            font-weight: bold;
            transition: all 0.3s;
            margin: 5px;
            text-transform: uppercase;
        }
        .btn:hover {
            background: #00ff41;
            color: #000;
            box-shadow: 0 0 10px #00ff41;
        }
        .card {
            background: #1a1a1a;
            padding: 20px;
            border: 1px solid #444;
            margin-bottom: 20px;
        }
        input, select, textarea {
            width: 100%;
            padding: 10px;
            background: #000;
            border: 1px solid #333;
            color: #fff;
            font-family: inherit;
            margin: 5px 0 15px 0;
        }
        input:focus, select:focus, textarea:focus {
            border-color: #00ff41;
            outline: none;
        }
        .result-area {
            margin-top: 20px;
            padding: 15px;
            border: 1px dashed #00ff41;
            display: none;
            background: #050505;
        }
        .slider-container {
            margin: 15px 0;
        }
        label {
            display: block;
            color: #aaa;
            margin-bottom: 5px;
        }
        .hash {
            word-break: break-all;
            font-size: 0.8em;
            color: #555;
        }
    </style>
"""

games = [
    {
        "filename": "01_simulador_blockchain.html",
        "title": "Simulador de Blockchain",
        "content": """
        <p class="subtitle">Entiende cómo se encadenan los bloques mediante hash.</p>
        
        <div id="chain"></div>
        
        <button class="btn" onclick="addBlock()">Minar Nuevo Bloque</button>
        <button class="btn" onclick="resetChain()" style="border-color: #ff3333; color: #ff3333;">Reiniciar Cadena</button>

        <script>
            let chain = [];
            
            function simpleHash(str) {
                let hash = 0;
                for (let i = 0; i < str.length; i++) {
                    const char = str.charCodeAt(i);
                    hash = (hash << 5) - hash + char;
                    hash = hash & hash;
                }
                return Math.abs(hash).toString(16).padStart(64, '0');
            }

            function createBlock(index, previousHash, data) {
                const timestamp = new Date().toLocaleTimeString();
                const hash = simpleHash(index + previousHash + timestamp + data);
                return { index, timestamp, data, previousHash, hash };
            }

            function renderChain() {
                const container = document.getElementById('chain');
                container.innerHTML = '';
                
                chain.forEach((block, i) => {
                    container.innerHTML += `
                        <div class="card" style="border-left: 5px solid ${i===0 ? '#00ff41' : '#0088ff'};">
                            <h3>Bloque #${block.index} ${i===0 ? '(Génesis)' : ''}</h3>
                            <p><strong>Timestamp:</strong> ${block.timestamp}</p>
                            <p><strong>Data:</strong> <input type="text" value="${block.data}" oninput="updateData(${i}, this.value)" style="width: 200px; display:inline-block;"></p>
                            <p><strong>Prev Hash:</strong> <span class="hash">${block.previousHash}</span></p>
                            <p><strong>Hash:</strong> <span class="hash" id="hash-${i}" style="color: ${isValid(i) ? '#00ff41' : '#ff3333'}">${block.hash}</span></p>
                        </div>
                        ${i < chain.length - 1 ? '<div style="text-align:center; font-size:20px;">⬇️</div>' : ''}
                    `;
                });
            }
            
            function isValid(index) {
                if (index === 0) return true; // Genesis always valid for simplicity here
                const current = chain[index];
                const prev = chain[index-1];
                return current.previousHash === prev.hash;
            }

            function addBlock() {
                const prevBlock = chain[chain.length - 1];
                const newBlock = createBlock(chain.length, prevBlock.hash, "Transacción " + chain.length);
                chain.push(newBlock);
                renderChain();
            }
            
            function updateData(index, newData) {
                chain[index].data = newData;
                // Re-calculate hash for this block
                chain[index].hash = simpleHash(chain[index].index + chain[index].previousHash + chain[index].timestamp + newData);
                
                // Propagate changes (avalanche effect simulation)
                for(let i = index + 1; i < chain.length; i++) {
                    chain[i].previousHash = chain[i-1].hash;
                    chain[i].hash = simpleHash(chain[i].index + chain[i].previousHash + chain[i].timestamp + chain[i].data);
                }
                
                renderChain();
            }

            function resetChain() {
                chain = [createBlock(0, "0".repeat(64), "Bloque Génesis")];
                renderChain();
            }
            
            // Init
            resetChain();
        </script>
        """
    },
    {
        "filename": "02_creador_tokens.html",
        "title": "Creador de Tokens ERC-20",
        "content": """
        <p class="subtitle">Diseña tu propio activo digital.</p>
        
        <div class="card">
            <label>Nombre del Token:</label>
            <input type="text" id="name" placeholder="Ej: Bitcoin">
            
            <label>Símbolo (Ticker):</label>
            <input type="text" id="symbol" placeholder="Ej: BTC" maxlength="5" style="text-transform: uppercase;">
            
            <label>Suministro Total (Total Supply):</label>
            <input type="number" id="supply" placeholder="Ej: 21000000">
            
            <label>Tipo de Token:</label>
            <select id="type">
                <option value="Utility">Utility Token (Acceso/Uso)</option>
                <option value="Security">Security Token (Inversión/Acciones)</option>
                <option value="Governance">Governance Token (Voto)</option>
            </select>
        </div>
        
        <button class="btn" onclick="deployToken()">Desplegar Token (Simulado)</button>
        
        <div id="result" class="result-area"></div>

        <script>
            function deployToken() {
                const name = document.getElementById('name').value;
                const symbol = document.getElementById('symbol').value;
                const supply = document.getElementById('supply').value;
                const type = document.getElementById('type').value;
                
                if(!name || !symbol || !supply) return alert("Completa todos los campos");
                
                const contractAddress = "0x" + Math.random().toString(16).substr(2, 40);
                
                document.getElementById('result').innerHTML = `
                    <h3>🚀 Token Desplegado Exitosamente</h3>
                    <p><strong>Contrato:</strong> <span class="hash">${contractAddress}</span></p>
                    <p>Has creado <strong>${parseInt(supply).toLocaleString()} ${symbol}</strong>.</p>
                    <p>Este es un token de tipo <strong>${type}</strong>.</p>
                    <div style="margin-top:15px; border-top:1px solid #333; padding-top:10px;">
                        <code>
                        // Código Solidity generado:<br>
                        contract ${name.replace(/\s/g,'')} is ERC20 {<br>
                        &nbsp;&nbsp;constructor() ERC20("${name}", "${symbol}") {<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;_mint(msg.sender, ${supply} * 10**decimals());<br>
                        &nbsp;&nbsp;}<br>
                        }
                        </code>
                    </div>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "03_diseñador_smart_contracts.html",
        "title": "Diseñador de Smart Contracts",
        "content": """
        <p class="subtitle">Programa lógica "If-This-Then-That" descentralizada.</p>
        
        <div class="card">
            <h3>Definir Reglas del Contrato</h3>
            
            <div style="margin-bottom: 20px;">
                <label>CONDICIÓN (Si ocurre esto...):</label>
                <select id="condition">
                    <option value="payment">Si recibo un pago de > 1 ETH</option>
                    <option value="date">Si la fecha es después del 01/01/2025</option>
                    <option value="vote">Si el 51% vota 'Sí'</option>
                </select>
            </div>
            
            <div style="margin-bottom: 20px;">
                <label>ACCIÓN (Ejecutar esto...):</label>
                <select id="action">
                    <option value="transfer">Transferir propiedad del activo digital</option>
                    <option value="mint">Emitir nuevos tokens de recompensa</option>
                    <option value="unlock">Desbloquear fondos de la tesorería</option>
                </select>
            </div>
            
            <label>Beneficiario (Wallet Address):</label>
            <input type="text" id="beneficiary" value="0x123..." disabled>
        </div>
        
        <button class="btn" onclick="compileContract()">Compilar Contrato</button>
        
        <div id="result" class="result-area"></div>

        <script>
            function compileContract() {
                const condition = document.getElementById('condition').options[document.getElementById('condition').selectedIndex].text;
                const action = document.getElementById('action').options[document.getElementById('action').selectedIndex].text;
                
                document.getElementById('result').innerHTML = `
                    <h3>📜 Contrato Inteligente Compilado</h3>
                    <p>Este código inmutable garantiza que:</p>
                    <p style="color: #fff; font-size: 1.1em;">"<strong>${condition}</strong>, entonces el sistema procederá automáticamente a <strong>${action}</strong>."</p>
                    <p><em>Sin intermediarios. Sin abogados. Código es Ley.</em></p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "04_constructor_dao.html",
        "title": "Constructor de DAO",
        "content": """
        <p class="subtitle">Organización Autónoma Descentralizada.</p>
        
        <div class="card">
            <label>Nombre de la Organización:</label>
            <input type="text" id="daoName" placeholder="Ej: ConstitutionDAO">
            
            <label>Token de Gobernanza:</label>
            <input type="text" id="govToken" placeholder="Ej: PEOPLE">
            
            <div class="slider-container">
                <label>Quórum Mínimo (% de participación necesaria): <span id="quorumVal">50</span>%</label>
                <input type="range" min="1" max="100" value="50" oninput="document.getElementById('quorumVal').innerText=this.value">
            </div>
            
            <div class="slider-container">
                <label>Umbral de Aprobación (% de votos 'Sí'): <span id="passVal">51</span>%</label>
                <input type="range" min="51" max="100" value="51" oninput="document.getElementById('passVal').innerText=this.value">
            </div>
            
            <label>Duración de Votación (Días):</label>
            <input type="number" value="3">
        </div>
        
        <button class="btn" onclick="launchDAO()">Lanzar DAO</button>
        
        <div id="result" class="result-area"></div>

        <script>
            function launchDAO() {
                const name = document.getElementById('daoName').value;
                if(!name) return alert("Ponle nombre a tu DAO");
                
                document.getElementById('result').innerHTML = `
                    <h3>🏛️ ${name} está viva</h3>
                    <p>Has creado una estructura organizativa digital.</p>
                    <ul>
                        <li>Cualquier poseedor de <strong>${document.getElementById('govToken').value}</strong> puede proponer cambios.</li>
                        <li>Las decisiones se ejecutan automáticamente si se cumple el quórum.</li>
                        <li>La tesorería está protegida por Multi-Sig.</li>
                    </ul>
                    <p>¡Bienvenido al futuro del trabajo!</p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "05_calculadora_tokenomics.html",
        "title": "Calculadora de Tokenomics",
        "content": """
        <p class="subtitle">Equilibra la oferta y la demanda.</p>
        
        <div class="card">
            <div class="slider-container">
                <label>Suministro Inicial (Millones): <span id="supplyVal">10</span>M</label>
                <input type="range" min="1" max="100" value="10" oninput="updateCalc()">
            </div>
            
            <div class="slider-container">
                <label>Tasa de Inflación Anual (%): <span id="inflationVal">5</span>%</label>
                <input type="range" min="0" max="50" value="5" oninput="updateCalc()">
            </div>
            
            <div class="slider-container">
                <label>Mecanismo de Quema (Burn Rate %): <span id="burnVal">2</span>%</label>
                <input type="range" min="0" max="20" value="2" oninput="updateCalc()">
            </div>
            
            <div class="slider-container">
                <label>Demanda Estimada (Usuarios): <span id="usersVal">1000</span></label>
                <input type="range" min="100" max="100000" value="1000" step="100" oninput="updateCalc()">
            </div>
        </div>
        
        <div id="result" class="result-area" style="display:block;">
            <h3>Proyección a 5 Años</h3>
            <p>Suministro Proyectado: <strong id="projSupply">0</strong> Millones</p>
            <p>Precio Estimado del Token: $<strong id="projPrice">0.00</strong></p>
            <p>Estado de la Economía: <span id="ecoStatus">--</span></p>
        </div>

        <script>
            function updateCalc() {
                const supply = parseInt(document.querySelector('input[type=range]:nth-of-type(1)').value);
                const inflation = parseInt(document.querySelector('input[type=range]:nth-of-type(2)').value);
                const burn = parseInt(document.querySelector('input[type=range]:nth-of-type(3)').value);
                const users = parseInt(document.querySelector('input[type=range]:nth-of-type(4)').value);
                
                // Update labels
                document.getElementById('supplyVal').innerText = supply;
                document.getElementById('inflationVal').innerText = inflation;
                document.getElementById('burnVal').innerText = burn;
                document.getElementById('usersVal').innerText = users;
                
                // Simple calculation logic
                const netChange = inflation - burn;
                let finalSupply = supply * Math.pow(1 + (netChange/100), 5);
                
                // Price model: Price = (Users * ValuePerUser) / Supply
                // Assuming constant ValuePerUser for simplicity
                const price = (users * 100) / (finalSupply * 1000000);
                
                document.getElementById('projSupply').innerText = finalSupply.toFixed(2);
                document.getElementById('projPrice').innerText = price.toFixed(2);
                
                let status = "";
                if (netChange > 10) status = "⚠️ Hiperinflación (El valor se diluye)";
                else if (netChange < 0) status = "🔥 Deflacionario (Escasez aumenta valor)";
                else status = "⚖️ Estable";
                
                document.getElementById('ecoStatus').innerText = status;
                document.getElementById('ecoStatus').style.color = netChange < 0 ? '#00ff41' : (netChange > 10 ? '#ff3333' : '#fff');
            }
            
            updateCalc();
        </script>
        """
    },
    {
        "filename": "06_galeria_nft.html",
        "title": "Minteador de NFT",
        "content": """
        <p class="subtitle">Tokeniza arte digital único.</p>
        
        <div class="card">
            <div style="width: 100%; height: 200px; background: #222; border: 2px dashed #444; display: flex; justify-content: center; align-items: center; color: #666; margin-bottom: 20px;">
                [Área de Imagen Simulada]
            </div>
            
            <label>Nombre de la Obra:</label>
            <input type="text" id="nftName" placeholder="Ej: CyberPunk #2077">
            
            <label>Descripción:</label>
            <textarea placeholder="Historia detrás del arte..."></textarea>
            
            <label>Atributos (Metadata):</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <input type="text" placeholder="Rareza: Legendaria">
                <input type="text" placeholder="Fondo: Neón">
            </div>
        </div>
        
        <button class="btn" onclick="mintNFT()">Mint NFT (Gas Fee: 0.001 ETH)</button>
        
        <div id="result" class="result-area"></div>

        <script>
            function mintNFT() {
                const name = document.getElementById('nftName').value;
                if(!name) return alert("Ponle nombre a tu obra");
                
                const tokenId = Math.floor(Math.random() * 10000);
                
                document.getElementById('result').innerHTML = `
                    <h3>🎨 NFT Acuñado en la Blockchain</h3>
                    <p><strong>Token ID:</strong> #${tokenId}</p>
                    <p><strong>Standard:</strong> ERC-721</p>
                    <p><strong>Owner:</strong> Tú (0xYourWallet...)</p>
                    <p>Ahora eres el único propietario verificable de esta obra digital en todo el mundo.</p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "07_simulador_defi.html",
        "title": "Simulador DeFi (Liquidity Pool)",
        "content": """
        <p class="subtitle">Provee liquidez y gana comisiones.</p>
        
        <div class="card">
            <h3>Pool: ETH / USDC</h3>
            <p>Precio actual: 1 ETH = 2000 USDC</p>
            
            <label>Depositar ETH:</label>
            <input type="number" id="ethAmount" value="1" oninput="updateUSDC()">
            
            <label>Depositar USDC (Automático 50/50):</label>
            <input type="number" id="usdcAmount" value="2000" disabled>
            
            <p>Tu participación en el Pool: <span id="share">0.1</span>%</p>
        </div>
        
        <button class="btn" onclick="addLiquidity()">Añadir Liquidez</button>
        
        <div id="result" class="result-area"></div>

        <script>
            function updateUSDC() {
                const eth = parseFloat(document.getElementById('ethAmount').value);
                document.getElementById('usdcAmount').value = eth * 2000;
                document.getElementById('share').innerText = (eth / 1000).toFixed(4); // Simulated total pool size
            }
            
            function addLiquidity() {
                document.getElementById('result').innerHTML = `
                    <h3>💧 Liquidez Añadida</h3>
                    <p>Has recibido <strong>LP Tokens</strong> que representan tu depósito.</p>
                    <p>Ganarás el 0.3% de todas las transacciones que ocurran en este par.</p>
                    <p style="color: #ff3333; font-size: 0.9em;">⚠️ Cuidado con el Impermanent Loss si el precio de ETH cambia drásticamente.</p>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "08_analizador_gobernanza.html",
        "title": "Analizador de Gobernanza",
        "content": """
        <p class="subtitle">1 Persona 1 Voto vs. 1 Token 1 Voto.</p>
        
        <div class="card">
            <h3>Escenario: Propuesta Polémica</h3>
            <p>Votantes:</p>
            <ul>
                <li>Ballena (Posee 1,000 tokens) - Vota NO</li>
                <li>Usuario A (Posee 10 tokens) - Vota SÍ</li>
                <li>Usuario B (Posee 10 tokens) - Vota SÍ</li>
                <li>Usuario C (Posee 10 tokens) - Vota SÍ</li>
            </ul>
        </div>
        
        <button class="btn" onclick="analyzeVote()">Analizar Resultados</button>
        
        <div id="result" class="result-area"></div>

        <script>
            function analyzeVote() {
                document.getElementById('result').innerHTML = `
                    <h3>Resultados por Modelo</h3>
                    
                    <div style="margin-bottom: 15px;">
                        <strong>Modelo Tradicional (1 Token = 1 Voto):</strong><br>
                        NO: 1,000 votos<br>
                        SÍ: 30 votos<br>
                        <span style="color: #ff3333;">Gana la Ballena (Centralización)</span>
                    </div>
                    
                    <div>
                        <strong>Votación Cuadrática (Costo = Votos²):</strong><br>
                        Reduce el poder de las ballenas.<br>
                        <span style="color: #00ff41;">Resultado más democrático posible.</span>
                    </div>
                `;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "09_evaluador_casos_uso.html",
        "title": "Evaluador: ¿Necesitas Blockchain?",
        "content": """
        <p class="subtitle">No todo necesita ser descentralizado.</p>
        
        <div id="quiz"></div>
        <button class="btn" onclick="evaluate()">Evaluar Proyecto</button>
        <div id="result" class="result-area"></div>

        <script>
            const questions = [
                "¿Necesitas una base de datos compartida?",
                "¿Hay múltiples partes que escriben datos?",
                "¿Confían esas partes unas en otras?",
                "¿Quieres eliminar intermediarios?",
                "¿Importa la privacidad absoluta de los datos?"
            ];
            
            const quizDiv = document.getElementById('quiz');
            questions.forEach((q, i) => {
                quizDiv.innerHTML += `
                    <div class="card">
                        <p>${q}</p>
                        <select id="q${i}">
                            <option value="yes">Sí</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                `;
            });

            function evaluate() {
                const q1 = document.getElementById('q0').value;
                const q2 = document.getElementById('q1').value;
                const q3 = document.getElementById('q2').value;
                const q4 = document.getElementById('q3').value;
                
                let verdict = "";
                
                if (q1 === 'no') verdict = "❌ No necesitas Blockchain. Usa Excel o SQL.";
                else if (q3 === 'yes') verdict = "❌ No necesitas Blockchain. Usa una base de datos centralizada.";
                else if (q1 === 'yes' && q2 === 'yes' && q3 === 'no' && q4 === 'yes') verdict = "✅ ¡Candidato Perfecto! Blockchain aporta valor aquí.";
                else verdict = "🤔 Quizás una Blockchain Privada o Híbrida.";
                
                document.getElementById('result').innerHTML = `<h3>Veredicto:</h3><h2>${verdict}</h2>`;
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "10_planificador_proyecto.html",
        "title": "Planificador Web3 Stack",
        "content": """
        <p class="subtitle">Arma tu arquitectura descentralizada.</p>
        
        <div class="card">
            <label>Layer 1 (Blockchain Base):</label>
            <select>
                <option>Ethereum (Seguridad máxima)</option>
                <option>Solana (Velocidad)</option>
                <option>Polkadot (Interoperabilidad)</option>
            </select>
            
            <label>Almacenamiento (Storage):</label>
            <select>
                <option>IPFS (Descentralizado)</option>
                <option>Arweave (Permanente)</option>
                <option>AWS S3 (Centralizado - No recomendado)</option>
            </select>
            
            <label>Oráculo (Datos):</label>
            <select>
                <option>Chainlink</option>
                <option>API3</option>
                <option>Ninguno</option>
            </select>
            
            <label>Frontend:</label>
            <select>
                <option>React + Ethers.js</option>
                <option>Vue + Web3.js</option>
            </select>
        </div>
        
        <button class="btn" onclick="generatePlan()">Generar Arquitectura</button>
        
        <div id="result" class="result-area"></div>
        
        <script>
            function generatePlan() {
                document.getElementById('result').innerHTML = "<h3>🏗️ Stack Definido</h3><p>Tu aplicación es resistente a la censura y verdaderamente descentralizada. ¡A programar!</p>";
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    },
    {
        "filename": "11_quiz_web3.html",
        "title": "Quiz Técnico Web3",
        "content": """
        <p class="subtitle">Demuestra tu conocimiento.</p>
        <div id="quiz-container"></div>
        <div id="score-area" class="result-area"></div>

        <script>
            const quizData = [
                { q: "¿Qué significa 'Gas' en Ethereum?", a: ["Combustible real", "Tarifa de transacción", "Un token de juego"], correct: 1 },
                { q: "¿Cuál NO es un mecanismo de consenso?", a: ["Proof of Work", "Proof of Stake", "Proof of Excel"], correct: 2 },
                { q: "¿Qué es un 'Fork'?", a: ["Un tenedor digital", "Una división de la red", "Un tipo de token"], correct: 1 },
                { q: "¿Dónde se guardan tus criptomonedas?", a: ["En tu billetera física", "En la Blockchain", "En tu disco duro"], correct: 1 }
            ];
            
            function loadQuiz() {
                const container = document.getElementById('quiz-container');
                let html = '';
                quizData.forEach((item, index) => {
                    html += `<div class="card"><p><strong>${item.q}</strong></p>${item.a.map((opt, i) => `<button class="btn" onclick="check(${index}, ${i}, this)">${opt}</button>`).join('')}</div>`;
                });
                container.innerHTML = html;
            }
            
            let score = 0;
            function check(qIndex, aIndex, btn) {
                if(btn.parentNode.classList.contains('answered')) return;
                btn.parentNode.classList.add('answered');
                if(aIndex === quizData[qIndex].correct) {
                    btn.style.background = '#00ff41';
                    btn.style.color = 'black';
                    score++;
                } else {
                    btn.style.borderColor = 'red';
                    btn.style.color = 'red';
                }
                document.getElementById('score-area').innerHTML = `<h3>Puntuación: ${score}/${quizData.length}</h3>`;
                document.getElementById('score-area').style.display = 'block';
            }
            loadQuiz();
        </script>
        """
    },
    {
        "filename": "12_maestro_token_economy.html",
        "title": "Maestro de Token Economy",
        "content": """
        <p class="subtitle">Certificación Final.</p>
        
        <div class="card" style="text-align: center;">
            <h3>¡Felicidades!</h3>
            <p>Has completado el recorrido por la Economía de Tokens.</p>
            <p>Estás listo para participar en la próxima revolución de Internet.</p>
            <div style="font-size: 50px; margin: 20px;">🎓</div>
            <p>Tu Wallet Mental ahora contiene:</p>
            <ul style="text-align: left; list-style: none;">
                <li>✅ Conocimiento de Blockchain</li>
                <li>✅ Entendimiento de DeFi</li>
                <li>✅ Capacidad de Análisis de Tokens</li>
            </ul>
        </div>
        
        <button class="btn" onclick="claim()">Reclamar Certificado NFT (Simulado)</button>
        
        <div id="result" class="result-area" style="text-align: center;"></div>
        
        <script>
            function claim() {
                document.getElementById('result').innerHTML = "<h3>🏆 Certificado Acuñado</h3><p>Hash: 0xabc...123</p><p>Bienvenido al club Web3.</p>";
                document.getElementById('result').style.display = 'block';
            }
        </script>
        """
    }
]

for game in games:
    html_content = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{game['title']}</title>
    {game_css}
</head>
<body>
    <div class="container">
        <h1>{game['title']}</h1>
        {game['content']}
    </div>
</body>
</html>"""
    
    with open(os.path.join(base_path, game['filename']), "w", encoding="utf-8") as f:
        f.write(html_content)

print("✅ 12 Juegos Web3 creados exitosamente para el libro 050.")
