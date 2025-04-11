<?php
$page_title = "Simulador PGBL vs CDB";
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
    <link rel="stylesheet" href="../assets/css/styles.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <?php include '../components/navbar/navbar.php'; ?>
    <div class="container">
        <h1>Simulador PGBL vs CDB <i class="fas fa-piggy-bank"></i></h1>
        
        <!-- Explicação inicial -->
        <div class="educational-tips mb-4">
            <h3>Comparativo PGBL vs CDB <span class="help-icon" onclick="toggleTips()">?</span></h3>
            <div id="tipsContent" class="concept-explanation">
                <h4><i>O que você precisa saber:</i></h4>
                <ul>
                    <li><strong>PGBL (Plano Gerador de Benefício Livre):</strong> Permite deduzir até <i>12% da renda tributável</i> no Imposto de Renda, mas a tributação incide sobre <strong>todo o valor resgatado</strong>.</li>
                    <li><strong>CDB (Certificado de Depósito Bancário):</strong> Não oferece benefício fiscal imediato, mas a tributação incide <i>apenas sobre o rendimento</i>.</li>
                    <li><strong>Tabela Regressiva:</strong> Quanto maior o tempo de investimento, menor a alíquota do IR. No PGBL, vai de 35% a 10%, enquanto no CDB, de 22,5% a 15%.</li>
                    <li><strong>Perfil Ideal:</strong> PGBL tende a ser mais vantajoso para quem faz declaração completa do IR, tem rendimentos elevados e planeja investir por prazos longos.</li>
                </ul>
            </div>
        </div>
         
        <form id="simulador">
            <div class="form-group">
                <label for="rendaTributavel">Renda Anual Tributável (R$):</label>
                <input type="number" id="rendaTributavel" step="0.01" required>
                <span class="help-icon" onclick="showConcept('rendaTributavel')">?</span>
                <div id="rendaTributavelConcept" class="concept-explanation">
                    <p>Este é o valor sobre o qual você paga imposto de renda (salários, aluguéis, etc). O benefício fiscal do PGBL permite deduzir até 12% deste valor.</p>
                </div>
           </div>
           <div class="form-group">
                <label for="aporteInicial">Aporte Inicial (opcional) - R$:</label>
                <input type="number" id="aporteInicial" step="0.01" value="0">
                <span class="help-icon" onclick="showConcept('aporteInicial')">?</span>
                <div id="aporteInicialConcept" class="concept-explanation">
                    <p>Valor inicial para começar o investimento. Pode ser zero caso você queira apenas fazer aportes anuais.</p>
                </div>
           </div>
           <div class="form-group">
               <label for="anos">Período de Investimento (em anos):</label>
                <input type="number" id="anos" required min="1">
                <span class="help-icon" onclick="showConcept('anos')">?</span>
                <div id="anosConcept" class="concept-explanation">
                    <p>Quanto maior o prazo, menores as alíquotas de Imposto de Renda tanto no PGBL quanto no CDB. No PGBL, as alíquotas vão de 35% (até 2 anos) a 10% (acima de 10 anos).</p>
                </div>
            </div>
            <div class="form-group">
                <label for="cdi">Taxa do CDI Anual (%):</label>
                <input type="number" id="cdi" step="0.01" value="10" required min="0">
                <span class="help-icon" onclick="showConcept('cdi')">?</span>
                <div id="cdiConcept" class="concept-explanation">
                    <p>Taxa de referência para os rendimentos de ambos os investimentos. Atualmente em torno de 10-13% ao ano.</p>
                </div>
           </div>
           <div class="form-group">
                <label for="taxaAdministracaoPGBL">Taxa de Administração PGBL (% a.a.):</label>
                <input type="number" id="taxaAdministracaoPGBL" step="0.01" value="1.5" required min="0">
                <span class="help-icon" onclick="showConcept('taxaAdministracaoPGBL')">?</span>
                <div id="taxaAdministracaoPGBLConcept" class="concept-explanation">
                    <p>Taxa cobrada pela instituição que administra o PGBL. Geralmente varia entre 0,5% e 3% ao ano e incide sobre todo o patrimônio.</p>
                </div>
           </div>
            <button type="button" onclick="calcular()" class="btn btn-primary">Simular <i class="fas fa-calculator"></i></button>
        </form>
       
        <div class="results" id="resultados" style="display: none;">
             <h2>Resultados <i class="fas fa-poll-h"></i></h2>
             
             <!-- Cards de resumo -->
             <div class="row mt-4 mb-4">
                <div class="col-md-6">
                    <div class="card bg-dark border-primary">
                        <div class="card-header bg-primary bg-opacity-25">
                            <h5 class="card-title mb-0">PGBL</h5>
                        </div>
                        <div class="card-body">
                            <p><strong>Valor Total Acumulado:</strong> R$ <span id="pgblAcumulado"></span></p>
                            <p><strong>Desembolso Efetivo:</strong> R$ <span id="pgblDesembolso"></span></p>
                            <p><strong>IR no Resgate:</strong> R$ <span id="pgblIR"></span></p>
                            <p><strong>Taxa de Administração Total:</strong> R$ <span id="pgblTaxaAdmin"></span></p>
                            <p><strong>Valor Líquido:</strong> R$ <span id="pgblLiquido" class="text-primary"></span></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card bg-dark border-success">
                        <div class="card-header bg-success bg-opacity-25">
                            <h5 class="card-title mb-0">CDB</h5>
                        </div>
                        <div class="card-body">
                            <p><strong>Valor Total Acumulado:</strong> R$ <span id="cdbAcumulado"></span></p>
                            <p><strong>Desembolso Efetivo:</strong> R$ <span id="cdbDesembolso"></span></p>
                            <p><strong>IR no Resgate:</strong> R$ <span id="cdbIR"></span></p>
                            <p><strong>Valor Líquido:</strong> R$ <span id="cdbLiquido" class="text-success"></span></p>
                        </div>
                    </div>
                </div>
             </div>
            
            <!-- Gráfico -->
            <div class="chart-container mb-4">
                <h3>Evolução do Investimento <i class="fas fa-chart-line"></i></h3>
                <canvas id="chartEvolucao" height="300"></canvas>
            </div>
            
            <h3>Detalhamento Anual <i class="fas fa-table"></i></h3>
            <div class="table-responsive">
                <table id="tabelaDetalhes" class="table table-dark table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Ano</th>
                            <th>Aporte PGBL (R$)</th>
                            <th>Restituição PGBL (R$)</th>
                            <th>Saldo PGBL (R$)</th>
                            <th>Aporte CDB (R$)</th>
                            <th>Saldo CDB (R$)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- As linhas serão preenchidas pelo JavaScript -->
                    </tbody>
                </table>
            </div>
            
            <div class="analise mt-4">
                <h3>Análise Comparativa <i class="fas fa-balance-scale"></i></h3>
                <div class="card bg-dark">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Diferença Líquida (PGBL - CDB):</strong> <span id="diferencaLiquida"></span></p>
                                <p><strong>Valor Total Restituído (PGBL):</strong> <span id="totalRestituido"></span></p>
                                <p><strong>Resultado Final Ajustado:</strong> <span id="resultadoFinalAjustado"></span></p>
                            </div>
                            <div class="col-md-6">
                                <p><strong>Rentabilidade Líquida PGBL:</strong> <span id="rentabilidadePGBL"></span></p>
                                <p><strong>Rentabilidade Líquida CDB:</strong> <span id="rentabilidadeCDB"></span></p>
                                <p><strong>Vantagem:</strong> <span id="vantagem" class="fw-bold"></span></p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="alert alert-info mt-4" id="conclusao">
                    <!-- Preenchido via JavaScript -->
                </div>
            </div>
        </div>
    </div>
    <?php include '../components/footer/footer.php'; ?>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../assets/js/modules/calculadora.js"></script>
    <script>
        // Funções de UI
        function toggleTips() {
            const tipsContent = document.getElementById('tipsContent');
            tipsContent.style.display = tipsContent.style.display === 'block' ? 'none' : 'block';
        }
        
        function showConcept(concept) {
            const conceptElement = document.getElementById(concept + 'Concept');
            conceptElement.style.display = conceptElement.style.display === 'block' ? 'none' : 'block';
        }
        
        // Função para formatar valores monetários
        function formatarMoeda(valor) {
            return valor.toLocaleString('pt-BR', { 
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
        
        // Função para calcular a alíquota de IR do PGBL com base no período
        function calcularAliquotaIRPGBL(anos) {
            if (anos <= 2) return 0.35;
            if (anos <= 4) return 0.30;
            if (anos <= 6) return 0.25;
            if (anos <= 8) return 0.20;
            if (anos <= 10) return 0.15;
            return 0.10; // Acima de 10 anos
        }
        
        // Função para calcular a alíquota de IR do CDB com base no período
        function calcularAliquotaIRCDB(meses) {
            if (meses <= 6) return 0.225; // 22,5%
            if (meses <= 12) return 0.20; // 20%
            if (meses <= 24) return 0.175; // 17,5%
            return 0.15; // 15% (acima de 24 meses)
        }
        
        // Função principal de cálculo
        function calcular() {
            // Obter valores dos inputs
            const rendaTributavel = parseFloat(document.getElementById('rendaTributavel').value);
            const aporteInicial = parseFloat(document.getElementById('aporteInicial').value) || 0;
            const anos = parseInt(document.getElementById('anos').value);
            const cdi = parseFloat(document.getElementById('cdi').value) / 100;
            const taxaAdminPGBL = parseFloat(document.getElementById('taxaAdministracaoPGBL').value) / 100;
            
            // Validar entradas
            if (isNaN(rendaTributavel) || rendaTributavel <= 0) {
                alert("Por favor, insira uma renda anual tributável válida.");
                return;
            }
            if (isNaN(anos) || anos <= 0) {
                alert("Por favor, insira um período de investimento válido.");
                return;
            }
            if (isNaN(cdi) || cdi <= 0) {
                alert("Por favor, insira uma taxa do CDI válida.");
                return;
            }
            if (isNaN(taxaAdminPGBL) || taxaAdminPGBL < 0) {
                alert("Por favor, insira uma taxa de administração válida.");
                return;
            }
            
            // Constantes
            const aliquotaIR = 0.275; // 27,5% - alíquota máxima
            const aporteAnual = rendaTributavel * 0.12; // 12% da renda tributável
            
            // Inicializar variáveis
            let pgblSaldo = aporteInicial;
            let pgblDesembolso = aporteInicial;
            let cdbSaldo = aporteInicial;
            let cdbDesembolso = aporteInicial;
            let totalTaxaAdmin = 0;
            
            // Arrays para gráfico
            const dadosPGBL = [];
            const dadosCDB = [];
            const labels = [];
            
            // Limpar tabela de detalhes
            const tabelaDetalhes = document.getElementById('tabelaDetalhes').getElementsByTagName('tbody')[0];
            tabelaDetalhes.innerHTML = "";
            
            // Calcular acumulação ao longo dos anos
            for (let i = 1; i <= anos; i++) {
                // PGBL: No primeiro ano, não há restituição
                const restituicao = i === 1 ? 0 : aporteAnual * aliquotaIR;
                const aporteEfetivo = i === 1 ? aporteAnual : aporteAnual - restituicao;
                
                // Aplicar taxa de administração ao saldo do PGBL
                const taxaAdminValor = pgblSaldo * taxaAdminPGBL;
                totalTaxaAdmin += taxaAdminValor;
                
                pgblDesembolso += aporteEfetivo;
                pgblSaldo = (pgblSaldo + aporteEfetivo + restituicao - taxaAdminValor) * (1 + cdi);
                
                // CDB: Aporte fixo anual (não há restituição)
                cdbDesembolso += aporteAnual;
                cdbSaldo = (cdbSaldo + aporteAnual) * (1 + cdi);
                
                // Armazenar para o gráfico
                labels.push(`Ano ${i}`);
                dadosPGBL.push(pgblSaldo);
                dadosCDB.push(cdbSaldo);
                
                // Adicionar linha na tabela de detalhes
                const row = tabelaDetalhes.insertRow();
                row.insertCell().innerText = i;
                row.insertCell().innerText = formatarMoeda(aporteEfetivo);
                row.insertCell().innerText = formatarMoeda(restituicao);
                row.insertCell().innerText = formatarMoeda(pgblSaldo);
                row.insertCell().innerText = formatarMoeda(aporteAnual);
                row.insertCell().innerText = formatarMoeda(cdbSaldo);
            }
           
            // Adicionar linha de totalização
            const rowTotal = tabelaDetalhes.insertRow();
            rowTotal.classList.add('table-active');
            rowTotal.insertCell().innerText = "Total";
            rowTotal.insertCell().innerText = formatarMoeda(pgblDesembolso - aporteInicial);
            rowTotal.insertCell().innerText = formatarMoeda(pgblDesembolso - aporteInicial - aporteAnual * anos);
            rowTotal.insertCell().innerText = formatarMoeda(pgblSaldo);
            rowTotal.insertCell().innerText = formatarMoeda(cdbDesembolso - aporteInicial);
            rowTotal.insertCell().innerText = formatarMoeda(cdbSaldo);
             
            // Calcular IR no resgate
            const aliquotaPGBL = calcularAliquotaIRPGBL(anos);
            const pgblIR = pgblSaldo * aliquotaPGBL;
            const pgblLiquido = pgblSaldo - pgblIR;
            
            const meses = anos * 12; // Converter anos em meses
            const aliquotaCDB = calcularAliquotaIRCDB(meses);
            const cdbRendimentos = cdbSaldo - cdbDesembolso; // Rendimentos = Saldo - Aportes
            const cdbIR = cdbRendimentos * aliquotaCDB; // IR sobre os rendimentos
            const cdbLiquido = cdbSaldo - cdbIR; // Valor líquido após IR
            
            // Exibir resultados
            document.getElementById('pgblAcumulado').innerText = formatarMoeda(pgblSaldo);
            document.getElementById('pgblDesembolso').innerText = formatarMoeda(pgblDesembolso);
            document.getElementById('pgblIR').innerText = formatarMoeda(pgblIR);
            document.getElementById('pgblTaxaAdmin').innerText = formatarMoeda(totalTaxaAdmin);
            document.getElementById('pgblLiquido').innerText = formatarMoeda(pgblLiquido);
            
            document.getElementById('cdbAcumulado').innerText = formatarMoeda(cdbSaldo);
            document.getElementById('cdbDesembolso').innerText = formatarMoeda(cdbDesembolso);
            document.getElementById('cdbIR').innerText = formatarMoeda(cdbIR);
            document.getElementById('cdbLiquido').innerText = formatarMoeda(cdbLiquido);
            
            // Análise comparativa
            const diferencaLiquida = pgblLiquido - cdbLiquido;
            const totalRestituido = pgblDesembolso - aporteInicial - (aporteAnual * anos);
            const resultadoFinalAjustado = diferencaLiquida - totalRestituido;
            const rentabilidadePGBL = ((pgblLiquido - pgblDesembolso) / pgblDesembolso) * 100;
            const rentabilidadeCDB = ((cdbLiquido - cdbDesembolso) / cdbDesembolso) * 100;
            
            document.getElementById('diferencaLiquida').innerText = formatarMoeda(diferencaLiquida) + 
                (diferencaLiquida > 0 ? ' (favorável ao PGBL)' : ' (favorável ao CDB)');
            document.getElementById('totalRestituido').innerText = formatarMoeda(totalRestituido);
            document.getElementById('resultadoFinalAjustado').innerText = formatarMoeda(resultadoFinalAjustado);
            document.getElementById('rentabilidadePGBL').innerText = rentabilidadePGBL.toFixed(2) + "%";
            document.getElementById('rentabilidadeCDB').innerText = rentabilidadeCDB.toFixed(2) + "%";
            
            // Definir qual é mais vantajoso
            let vantagemTexto;
            if (diferencaLiquida > 100) { // Diferença de pelo menos R$ 100
                vantagemTexto = `<span class="text-primary">PGBL</span>`;
                document.getElementById('conclusao').innerHTML = `
                    <strong>Conclusão:</strong> O PGBL é mais vantajoso nesse cenário, resultando em um patrimônio 
                    ${formatarMoeda(diferencaLiquida)} maior após ${anos} anos. O benefício fiscal no IR gerou uma 
                    economia de ${formatarMoeda(totalRestituido)} durante o período de acumulação.
                `;
            } else if (diferencaLiquida < -100) { // Diferença de pelo menos R$ 100
                vantagemTexto = `<span class="text-success">CDB</span>`;
                document.getElementById('conclusao').innerHTML = `
                    <strong>Conclusão:</strong> O CDB é mais vantajoso nesse cenário, resultando em um patrimônio 
                    ${formatarMoeda(-diferencaLiquida)} maior após ${anos} anos. A ausência de taxa de administração 
                    e a tributação apenas sobre o rendimento tornaram o CDB mais atrativo nesse caso.
                `;
            } else {
                vantagemTexto = `<span class="text-warning">Equivalentes</span>`;
                document.getElementById('conclusao').innerHTML = `
                    <strong>Conclusão:</strong> Ambos os investimentos apresentam resultados muito próximos nesse cenário.
                    A diferença de apenas ${formatarMoeda(Math.abs(diferencaLiquida))} após ${anos} anos torna a escolha 
                    mais uma questão de preferência e objetivos pessoais.
                `;
            }
            document.getElementById('vantagem').innerHTML = vantagemTexto;
            
            // Criar gráfico de evolução
            criarGraficoEvolucao(labels, dadosPGBL, dadosCDB);
            
            // Mostrar resultados
            document.getElementById('resultados').style.display = 'block';
            
            // Scroll para os resultados
            document.getElementById('resultados').scrollIntoView({behavior: 'smooth'});
        }
        
        // Função para criar gráfico de evolução
        function criarGraficoEvolucao(labels, dadosPGBL, dadosCDB) {
            const ctxEvolucao = document.getElementById('chartEvolucao').getContext('2d');
            
            // Destruir gráfico existente se houver
            if (window.chartEvolucao) {
                window.chartEvolucao.destroy();
            }
            
            window.chartEvolucao = new Chart(ctxEvolucao, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'PGBL',
                            data: dadosPGBL,
                            borderColor: '#3498db', // Azul
                            backgroundColor: 'rgba(52, 152, 219, 0.1)',
                            fill: true,
                            tension: 0.1
                        },
                        {
                            label: 'CDB',
                            data: dadosCDB,
                            borderColor: '#2ecc71', // Verde
                            backgroundColor: 'rgba(46, 204, 113, 0.1)',
                            fill: true,
                            tension: 0.1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: '#ffffff'
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': R$ ' + 
                                        context.raw.toLocaleString('pt-BR', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        });
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#ffffff',
                                callback: function(value) {
                                    if (value >= 1000000) {
                                        return 'R$ ' + (value / 1000000).toFixed(1) + 'M';
                                    } else if (value >= 1000) {
                                        return 'R$ ' + (value / 1000).toFixed(0) + 'K';
                                    }
                                    return 'R$ ' + value;
                                }
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                        x: {
                            ticks: {
                                color: '#ffffff'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        }
                    }
                }
            });
        }
    </script>
</body>
</html>