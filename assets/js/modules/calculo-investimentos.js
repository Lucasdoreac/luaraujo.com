class CalculoInvestimentos {
    constructor() {
        this.constantes = {
            IR_FAIXAS: [
                { limite: 180, aliquota: 0.225 },  // 22.5% até 180 dias
                { limite: 360, aliquota: 0.20 },   // 20% até 360 dias
                { limite: 720, aliquota: 0.175 },  // 17.5% até 720 dias
                { limite: Infinity, aliquota: 0.15 }  // 15% acima de 720 dias
            ],
            POUPANCA_MENSAL: 0.005, // 0.5% ao mês
            LIMITE_PGBL: 0.12,      // 12% da renda tributável
            IR_MAXIMO: 0.275        // 27.5% alíquota máxima IR
        };
    }

    calcularRentabilidade(dados) {
        try {
            const {
                valorInicial = 0,
                aporteMensal = 0,
                prazo = 0,
                taxaMensal = 0,
                inflacao = 0
            } = dados;

            let evolucaoMensal = [];
            let valorAtual = valorInicial;

            // Cálculo mês a mês
            for (let mes = 1; mes <= prazo; mes++) {
                const rendimento = valorAtual * taxaMensal;
                valorAtual = valorAtual + rendimento + aporteMensal;

                evolucaoMensal.push({
                    mes,
                    valorInicial: valorAtual - rendimento - aporteMensal,
                    rendimento,
                    aporte: aporteMensal,
                    valorFinal: valorAtual
                });
            }

            // Cálculos finais
            const totalInvestido = valorInicial + (aporteMensal * prazo);
            const rendimentoTotal = valorAtual - totalInvestido;
            const inflacaoAcumulada = Math.pow(1 + inflacao, prazo/12) - 1;
            const valorRealFinal = valorAtual / (1 + inflacaoAcumulada);

            return {
                evolucaoMensal,
                valorFinal: valorAtual,
                rendimentoTotal,
                inflacaoAcumulada,
                valorRealFinal,
                totalInvestido
            };
        } catch (error) {
            console.error('Erro no cálculo de rentabilidade:', error);
            throw new Error('Erro ao calcular rentabilidade');
        }
    }

    calcularComparativos(dadosBase) {
        const comparativos = [
            {
                nome: 'Seu Investimento',
                dados: this.calcularRentabilidade(dadosBase)
            },
            {
                nome: 'Poupança',
                dados: this.calcularRentabilidade({
                    ...dadosBase,
                    taxaMensal: this.constantes.POUPANCA_MENSAL
                })
            },
            {
                nome: 'CDB 100% CDI',
                dados: this.calcularInvestimentoCDB(dadosBase)
            },
            {
                nome: 'LCI/LCA',
                dados: this.calcularInvestimentoLCI_LCA(dadosBase)
            }
        ];

        return this.analisarComparativos(comparativos);
    }

    calcularInvestimentoCDB(dados) {
        const { prazo } = dados;
        const aliquotaIR = this.determinarAliquotaIR(prazo);
        
        // Cálculo com IR no rendimento
        const resultadoBruto = this.calcularRentabilidade(dados);
        const rendimentoLiquido = resultadoBruto.rendimentoTotal * (1 - aliquotaIR);
        
        return {
            ...resultadoBruto,
            valorFinal: dados.valorInicial + 
                       (dados.aporteMensal * prazo) + 
                       rendimentoLiquido,
            rendimentoTotal: rendimentoLiquido
        };
    }

    calcularInvestimentoLCI_LCA(dados) {
        // LCI/LCA são isentos de IR
        return this.calcularRentabilidade(dados);
    }

    determinarAliquotaIR(prazoMeses) {
        const faixa = this.constantes.IR_FAIXAS.find(f => prazoMeses <= f.limite);
        return faixa ? faixa.aliquota : this.constantes.IR_FAIXAS[0].aliquota;
    }

    analisarComparativos(comparativos) {
        const melhorOpcao = comparativos.reduce((melhor, atual) => 
            atual.dados.rendimentoTotal > melhor.dados.rendimentoTotal ? atual : melhor
        );

        const analise = {
            resultados: comparativos,
            melhorOpcao: melhorOpcao.nome,
            recomendacoes: this.gerarRecomendacoes(comparativos)
        };

        return analise;
    }

    gerarRecomendacoes(comparativos) {
        const recomendacoes = [];
        const principal = comparativos[0].dados;
        const melhorOpcao = comparativos.reduce((a, b) => 
            b.dados.rendimentoTotal > a.dados.rendimentoTotal ? b : a
        );

        // Recomendações baseadas na análise
        if (melhorOpcao.nome !== 'Seu Investimento') {
            recomendacoes.push({
                tipo: 'otimizacao',
                mensagem: `Considere migrar para ${melhorOpcao.nome} que oferece melhor rentabilidade.`
            });
        }

        // Análise de diversificação
        if (principal.valorFinal > 100000) {
            recomendacoes.push({
                tipo: 'diversificacao',
                mensagem: 'Com este valor, considere diversificar entre diferentes tipos de investimentos.'
            });
        }

        return recomendacoes;
    }

    calcularMetaInvestimento(dados) {
        const {
            valorMeta,
            prazoAnos,
            taxaMensal,
            inflacaoAnual
        } = dados;

        // Conversão de taxas
        const prazoMeses = prazoAnos * 12;
        const inflacaoMensal = Math.pow(1 + inflacaoAnual, 1/12) - 1;

        // Valor futuro considerando inflação
        const valorMetaAjustado = valorMeta * Math.pow(1 + inflacaoAnual, prazoAnos);

        // Cálculo do aporte necessário
        const aporteMensal = (valorMetaAjustado * taxaMensal) / 
            (Math.pow(1 + taxaMensal, prazoMeses) - 1);

        return {
            aporteMensal,
            valorMetaAjustado,
            prazoMeses,
            taxaEquivalenteMensal: taxaMensal
        };
    }

    gerarRelatorio(dados, resultados) {
        return {
            parametros: {
                ...dados,
                dataSimulacao: new Date().toISOString()
            },
            resultados: {
                ...resultados,
                indicadores: this.calcularIndicadores(resultados)
            },
            analise: {
                recomendacoes: this.gerarRecomendacoes(resultados.comparativos),
                riscos: this.avaliarRiscos(dados, resultados)
            }
        };
    }

    calcularIndicadores(resultados) {
        const {
            valorFinal,
            totalInvestido,
            prazo,
            inflacaoAcumulada
        } = resultados;

        // ROI
        const roi = ((valorFinal - totalInvestido) / totalInvestido) * 100;

        // Taxa Interna de Retorno (TIR)
        const tir = this.calcularTIR(resultados.evolucaoMensal);

        // Retorno Real (descontando inflação)
        const retornoReal = (1 + (roi/100))/(1 + inflacaoAcumulada) - 1;

        return {
            roi,
            tir,
            retornoReal,
            payback: this.calcularPayback(resultados.evolucaoMensal)
        };
    }

    calcularTIR(evolucaoMensal) {
        // Implementação do cálculo da TIR usando o método de Newton-Raphson
        const fluxoCaixa = evolucaoMensal.map(m => m.rendimento - m.aporte);
        let guess = 0.1; // Taxa inicial
        const maxIteracoes = 100;
        const precisao = 0.0001;

        for (let i = 0; i < maxIteracoes; i++) {
            const npv = this.calcularVPL(fluxoCaixa, guess);
            const derivative = this.calcularDerivadaVPL(fluxoCaixa, guess);
            
            const novaTaxa = guess - npv / derivative;
            
            if (Math.abs(novaTaxa - guess) < precisao) {
                return novaTaxa * 12; // Converter para taxa anual
            }
            
            guess = novaTaxa;
        }

        return null; // Não convergiu
    }

    calcularVPL(fluxoCaixa, taxa) {
        return fluxoCaixa.reduce((vpv, fluxo, t) => 
            vpv + fluxo / Math.pow(1 + taxa, t), 0
        );
    }

    calcularDerivadaVPL(fluxoCaixa, taxa) {
        return fluxoCaixa.reduce((sum, fluxo, t) => 
            sum - t * fluxo / Math.pow(1 + taxa, t + 1), 0
        );
    }

    calcularPayback(evolucaoMensal) {
        let investimentoAcumulado = 0;
        let rendimentoAcumulado = 0;

        for (let i = 0; i < evolucaoMensal.length; i++) {
            investimentoAcumulado += evolucaoMensal[i].aporte;
            rendimentoAcumulado += evolucaoMensal[i].rendimento;

            if (rendimentoAcumulado >= investimentoAcumulado) {
                return i + 1; // Mês do payback
            }
        }

        return null; // Não atingiu payback no período
    }

    avaliarRiscos(dados, resultados) {
        const riscos = [];

        // Risco de concentração
        if (resultados.valorFinal > 100000) {
            riscos.push({
                tipo: 'concentracao',
                nivel: 'medio',
                descricao: 'Alto valor concentrado em um único investimento'
            });
        }

        // Risco de inflação
        if (resultados.retornoReal < dados.inflacao) {
            riscos.push({
                tipo: 'inflacao',
                nivel: 'alto',
                descricao: 'Retorno real abaixo da inflação'
            });
        }

        // Risco de liquidez
        if (dados.prazo > 36) {
            riscos.push({
                tipo: 'liquidez',
                nivel: 'baixo',
                descricao: 'Investimento de longo prazo pode ter restrições de resgate'
            });
        }

        return riscos;
    }
}

export default CalculoInvestimentos;