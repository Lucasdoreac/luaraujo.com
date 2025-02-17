<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simulador Educacional de Investimentos</title>
    
    <!-- CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/styles.css">
    <link rel="stylesheet" href="../assets/css/integrated-styles.css">
    
    <!-- Meta tags -->
    <meta name="description" content="Simulador educacional para planejamento financeiro e investimentos">
    <meta name="keywords" content="investimentos, simulador financeiro, educação financeira, PGBL, CDB">
</head>
<body data-calculator="investimentos">
    <?php include '../components/navbar/navbar.php'; ?>
    
    <div class="container">
        <!-- Loader -->
        <div id="loader" class="calculation-loader">
            <div class="loader-spinner"></div>
            <p>Calculando resultados...</p>
        </div>
        
        <!-- Container de mensagens -->
        <div id="messages-container" class="messages-container"></div>
        
        <!-- Dicas Educacionais -->
        <div class="educational-tips bg-dark p-4 rounded mb-4">
            <h3>
                <i class="fas fa-lightbulb text-warning"></i> 
                Conceitos Básicos
                <button type="button" class="btn btn-link float-end" data-bs-toggle="collapse" data-bs-target="#tipsContent">
                    <i class="fas fa-chevron-down"></i>
                </button>
            </h3>
            <div id="tipsContent" class="collapse">
                <div class="mt-3">
                    <ul class="list-unstyled">
                        <li class="mb-3">
                            <h5><i class="fas fa-chart-line text-primary"></i> Juros Compostos</h5>
                            <p>O efeito dos juros sobre juros, gerando crescimento exponencial do seu investimento.</p>
                        </li>
                        <li class="mb-3">
                            <h5><i class="fas fa-percentage text-success"></i> CDI</h5>
                            <p>Taxa de referência do mercado financeiro brasileiro, base para investimentos de renda fixa.</p>
                        </li>
                        <li class="mb-3">
                            <h5><i class="fas fa-balance-scale text-info"></i> Renda Fixa vs Variável</h5>
                            <p>Compare diferentes tipos de investimentos e seus riscos associados.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Formulário Principal -->
        <form id="calc-form" class="bg-dark p-4 rounded shadow">
            <!-- Metas -->
            <div class="card bg-gradient mb-4">
                <div class="card-header bg-primary text-white">
                    <h4 class="mb-0"><i class="fas fa-target"></i> Suas Metas</h4>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="goalAmount" class="form-label">Meta Financeira (R$)</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                                    <input type="number" class="form-control" id="goalAmount" min="0" step="100">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="goalYears" class="form-label">Prazo (anos)</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-calendar"></i></span>
                                    <input type="number" class="form-control" id="goalYears" min="1" max="50">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Valores Iniciais -->
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="valorInicial" class="form-label">Valor Inicial (R$)</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-money-bill"></i></span>
                            <input type="number" class="form-control" id="valorInicial" required min="0">
                            <button type="button" class="btn btn-info" data-bs-toggle="tooltip" title="Valor que você já possui para começar">
                                <i class="fas fa-info-circle"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="aporteMensal" class="form-label">Aporte Mensal (R$)</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-sync"></i></span>
                            <input type="number" class="form-control" id="aporteMensal" required min="0">
                            <button type="button" class="btn btn-info" data-bs-toggle="tooltip" title="Valor que você pode investir mensalmente">
                                <i class="fas fa-info-circle"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Rendimentos -->
            <div class="row mt-4">
                <div class="col-12">
                    <div class="form-group">
                        <label for="tipoRendimento" class="form-label">Tipo de Rendimento</label>
                        <select class="form-select" id="tipoRendimento" required>
                            <option value="fixa">Taxa Fixa</option>
                            <option value="cdi">Taxa CDI</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Taxa Fixa -->
            <div id="taxaFixaGroup" class="mt-3">
                <div class="form-group">
                    <label for="taxaFixa" class="form-label">Taxa Fixa Mensal (%)</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-percent"></i></span>
                        <input type="number" class="form-control" id="taxaFixa" step="0.01" min="0" max="100">
                    </div>
                </div>
            </div>

            <!-- CDI -->
            <div id="cdiGroup" class="mt-3" style="display: none;">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="taxaCDI" class="form-label">Taxa CDI Anual (%)</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-chart-line"></i></span>
                                <input type="number" class="form-control" id="taxaCDI" step="0.01" value="13.15">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="percentualCDIComImposto" class="form-label">% CDI - Com IR</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-percentage"></i></span>
                                <input type="number" class="form-control" id="percentualCDIComImposto" step="0.1" value="100">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="percentualCDISemImposto" class="form-label">% CDI - Sem IR</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-percentage"></i></span>
                                <input type="number" class="form-control" id="percentualCDISemImposto" step="0.1" value="93">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Prazo e Inflação -->
            <div class="row mt-4">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="prazo" class="form-label">Prazo (meses)</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-clock"></i></span>
                            <input type="number" class="form-control" id="prazo" required min="1">
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="inflacao" class="form-label">Inflação Anual (%)</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-fire"></i></span>
                            <input type="number" class="form-control" id="inflacao" step="0.1" value="4.5">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botões -->
            <div class="row mt-4">
                <div class="col-12">
                    <button type="submit" class="btn btn-primary btn-lg w-100">
                        <i class="fas fa-calculator"></i> Calcular Simulação
                    </button>
                </div>
            </div>
        </form>

        <!-- Resultados -->
        <div id="results-container" class="mt-4" style="display: none;">
            <!-- Tabs -->
            <ul class="nav nav-tabs nav-fill mb-3" role="tablist">
                <li class="nav-item">
                    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tabResultados">
                        <i class="fas fa-chart-bar"></i> Resultados
                    </button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tabComparacoes">
                        <i class="fas fa-balance-scale"></i> Comparações
                    </button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tabEducacional">
                        <i class="fas fa-book-open"></i> Material Educativo
                    </button>
                </li>
            </ul>

            <!-- Conteúdo das Tabs -->
            <div class="tab-content">
                <!-- Resultados -->
                <div class="tab-pane fade show active" id="tabResultados">
                    <div class="results-grid">
                        <!-- Cards de Resultado -->
                        <div class="result-card">
                            <h5>Valor Final</h5>
                            <p class="result-value" id="resultValorFinal">R$ 0,00</p>
                        </div>
                        <div class="result-card">
                            <h5>Ganho Total</h5>
                            <p class="result-value" id="resultGanhoTotal">R$ 0,00</p>
                        </div>
                        <div class="result-card">
                            <h5>Rentabilidade Real</h5>
                            <p class="result-value" id="resultRentabilidadeReal">0,00%</p>
                        </div>
                    </div>

                    <!-- Gráfico de Evolução -->
                    <div class="chart-container">
                        <canvas id="chartEvolucao"></canvas>
                    </div>
                </div>

                <!-- Comparações -->
                <div class="tab-pane fade" id="tabComparacoes">
                    <!-- Tabela Comparativa -->
                    <div class="table-responsive">
                        <table class="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>Investimento</th>
                                    <th class="text-end">Valor Final</th>
                                    <th class="text-end">Rentabilidade</th>
                                    <th class="text-end">IR</th>
                                </tr>
                            </thead>
                            <tbody id="tabelaComparacoes"></tbody>
                        </table>
                    </div>

                    <!-- Gráfico Comparativo -->
                    <div class="chart-container">
                        <canvas id="chartComparativo"></canvas>
                    </div>
                </div>

                <!-- Material Educativo -->
                <div class="tab-pane fade" id="tabEducacional" role="tabpanel">
                    <div id="conteudoEducacional"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <?php include '../components/footer/footer.php'; ?>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script type="module" src="../assets/js/main.js"></script>
</body>
</html>