class ExibicaoResultados {
    constructor() {
        this.graficos = {};
        this.opcoesPadrao = {
            moeda: {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            },
            porcentagem: {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        };
        this.cores = {
            primaria: '#3498db',
            secundaria: '#2ecc71',
            terciaria: '#e74c3c',
            neutra: '#95a5a6'
        };
    }

    criarGraficoEvolucao(evolucaoMensal) {
        const ctx = document.getElementById('grafico-evolucao');
        if (!ctx) return;

        const data = {
            labels: evolucaoMensal.map(d => `Mês ${d.mes}`),
            datasets: [
                {
                    label: 'Patrimônio Total',
                    data: evolucaoMensal.map(d => d.valorFinal),
                    borderColor: this.cores.primaria,
                    backgroundColor: this.gerarGradiente(this.cores.primaria),
                    fill: true
                },
                {
                    label: 'Total Investido',
                    data: evolucaoMensal.map(d => d.valorInicial + d.aporte),
                    borderColor: this.cores.secundaria,
                    borderDash: [5, 5],
                    fill: false
                }
            ]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#fff' }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: (context) => {
                            return `${context.dataset.label}: ${this.formatarValor(context.raw, 'moeda')}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: { color: '#fff' }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#fff',
                        callback: (value) => this.formatarValor(value, 'moeda')
                    }
                }
            }
        };

        this.graficos.evolucao = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });
    }

    criarGraficoComparativo(comparativos) {
        const ctx = document.getElementById('grafico-comparativo');
        if (!ctx) return;

        const data = {
            labels: comparativos.map(c => c.nome),
            datasets: [{
                label: 'Valor Final',
                data: comparativos.map(c => c.dados.valorFinal),
                backgroundColor: [
                    this.cores.primaria,
                    this.cores.secundaria,
                    this.cores.terciaria
                ]
            }]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return `Valor Final: ${this.formatarValor(context.raw, 'moeda')}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => this.formatarValor(value, 'moeda')
                    }
                }
            }
        };

        this.graficos.comparativo = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    }

    criarGraficoComposicao(resultados) {
        const ctx = document.getElementById('grafico-composicao');
        if (!ctx) return;

        const totalInvestido = resultados.totalInvestido;
        const rendimento = resultados.rendimentoTotal;

        const data = {
            labels: ['Total Investido', 'Rendimentos'],
            datasets: [{
                data: [totalInvestido, rendimento],
                backgroundColor: [this.cores.secundaria, this.cores.primaria]
            }]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: '#fff' }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const valor = this.formatarValor(context.raw, 'moeda');
                            const percentual = (context.raw / (totalInvestido + rendimento) * 100).toFixed(1);
                            return `${context.label}: ${valor} (${percentual}%)`;
                        }
                    }
                }
            }
        };

        this.graficos.composicao = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });
    }

    exibirTabelas(resultados) {
        this.exibirTabelaComparativa(resultados.comparativos);
        this.exibirTabelaEvolucao(resultados.evolucaoMensal);
    }

    exibirTabelaComparativa(comparativos) {
        const tabela = document.getElementById('tabela-comparativa');
        if (!tabela) return;

        const html = `
            <table class="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>Investimento</th>
                        <th class="text-end">Valor Final</th>
                        <th class="text-end">Rendimento</th>
                        <th class="text-end">Rentabilidade</th>
                    </tr>
                </thead>
                <tbody>
                    ${comparativos.map(comp => `
                        <tr>
                            <td>${comp.nome}</td>
                            <td class="text-end">${this.formatarValor(comp.dados.valorFinal, 'moeda')}</td>
                            <td class="text-end">${this.formatarValor(comp.dados.rendimentoTotal, 'moeda')}</td>
                            <td class="text-end">${this.formatarValor(comp.dados.rentabilidade/100, 'porcentagem')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        tabela.innerHTML = html;
    }

    exibirAnalises(resultados) {
        const container = document.getElementById('analise-resultados');
        if (!container) return;

        // Adicionar recomendações baseadas nos resultados
        const recomendacoes = this.gerarRecomendacoes(resultados);
        
        container.innerHTML = `
            <div class="card bg-dark">
                <div class="card-header">
                    <h5 class="mb-0">Análise dos Resultados</h5>
                </div>
                <div class="card-body">
                    ${recomendacoes.map(rec => `
                        <div class="alert alert-${rec.tipo}">
                            <i class="${rec.icone}"></i>
                            ${rec.mensagem}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    gerarRecomendacoes(resultados) {
        const recomendacoes = [];

        // Análise de rentabilidade
        if (resultados.rentabilidade > resultados.inflacao) {
            recomendacoes.push({
                tipo: 'success',
                icone: 'fas fa-check-circle',
                mensagem: 'Seu investimento está superando a inflação'
            });
        } else {
            recomendacoes.push({
                tipo: 'warning',
                icone: 'fas fa-exclamation-triangle',
                mensagem: 'Considere alternativas com maior rentabilidade para superar a inflação'
            });
        }

        // Análise de diversificação
        if (resultados.valorFinal > 100000) {
            recomendacoes.push({
                tipo: 'info',
                icone: 'fas fa-info-circle',
                mensagem: 'Com este valor, considere diversificar seus investimentos para reduzir riscos'
            });
        }

        return recomendacoes;
    }

    formatarValor(valor, tipo) {
        if (typeof valor !== 'number') return '-';

        try {
            return new Intl.NumberFormat('pt-BR', this.opcoesPadrao[tipo]).format(valor);
        } catch (error) {
            console.error('Erro ao formatar valor:', error);
            return valor.toString();
        }
    }

    gerarGradiente(cor) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        
        gradient.addColorStop(0, `${cor}99`);
        gradient.addColorStop(1, `${cor}00`);
        
        return gradient;
    }
}

export default ExibicaoResultados;