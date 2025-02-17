class ConteudoEducacional {
    constructor() {
        this.dicas = {
            investimentos: {
                basico: [
                    {
                        titulo: 'Juros Compostos',
                        descricao: 'O poder dos juros sobre juros é um dos princípios mais importantes para o crescimento do seu patrimônio a longo prazo.',
                        exemplo: 'Um investimento de R$ 1.000 a 10% ao ano rende R$ 100 no primeiro ano. No segundo ano, você ganha juros também sobre esses R$ 100.',
                        nivel: 1
                    },
                    {
                        titulo: 'Diversificação',
                        descricao: 'Distribuir seus investimentos em diferentes tipos de aplicações ajuda a reduzir riscos.',
                        exemplo: 'Combine renda fixa (CDBs, Tesouro Direto) com renda variável (ações, fundos imobiliários).',
                        nivel: 1
                    }
                ],
                intermediario: [
                    {
                        titulo: 'Imposto de Renda',
                        descricao: 'Entenda como a tributação afeta seus investimentos ao longo do tempo.',
                        exemplo: 'Tabela Regressiva de IR:\n- Até 180 dias: 22,5%\n- 181 a 360 dias: 20%\n- 361 a 720 dias: 17,5%\n- Acima de 720 dias: 15%',
                        nivel: 2
                    },
                    {
                        titulo: 'Rentabilidade Real',
                        descricao: 'A rentabilidade real considera o impacto da inflação nos seus rendimentos.',
                        exemplo: 'Se seu investimento rende 10% ao ano e a inflação é 4%, sua rentabilidade real é de aproximadamente 5,77% [(1,10/1,04) - 1].',
                        nivel: 2
                    }
                ]
            },
            previdencia: {
                basico: [
                    {
                        titulo: 'PGBL vs VGBL',
                        descricao: 'A escolha entre PGBL e VGBL depende do seu perfil tributário.',
                        exemplo: 'PGBL: dedução de até 12% da renda bruta no IR (declaração completa)\nVGBL: mais adequado para declaração simplificada',
                        nivel: 1
                    },
                    {
                        titulo: 'Benefício Fiscal PGBL',
                        descricao: 'Entenda como funciona a dedução fiscal do PGBL.',
                        exemplo: 'Com renda anual de R$ 120.000, você pode deduzir até R$ 14.400 (12%), gerando economia de até R$ 3.960 no IR.',
                        nivel: 1
                    }
                ]
            }
        };
        
        this.tooltips = {
            valorInicial: "O valor que você já tem disponível para começar a investir.",
            aporteMensal: "Quanto você pretende investir todo mês de forma regular.",
            prazo: "Por quanto tempo você planeja manter o investimento.",
            rentabilidade: "A taxa de rendimento esperada para o investimento.",
            taxaCDI: "Taxa básica de referência para investimentos de renda fixa.",
            aliquotaIR: "Percentual de imposto que incide sobre os rendimentos."
        };
    }

    gerarDicaContextual(campo, valor, contexto) {
        const dicas = [];

        switch (campo) {
            case 'valorInicial':
                if (valor > 100000) {
                    dicas.push({
                        tipo: 'warning',
                        mensagem: 'Com este valor, considere diversificar seus investimentos em diferentes produtos.'
                    });
                } else if (valor < 1000) {
                    dicas.push({
                        tipo: 'info',
                        mensagem: 'Mesmo começando com pouco, o importante é manter a regularidade nos investimentos.'
                    });
                }
                break;

            case 'prazo':
                if (valor < 24) {
                    dicas.push({
                        tipo: 'warning',
                        mensagem: 'Investimentos de curto prazo têm maior incidência de IR (22,5% a 20%).'
                    });
                } else if (valor > 60) {
                    dicas.push({
                        tipo: 'success',
                        mensagem: 'Excellent! Investimentos de longo prazo se beneficiam da menor alíquota de IR (15%).'
                    });
                }
                break;

            case 'aporteMensal':
                if (contexto && contexto.rendaMensal) {
                    const percentualRenda = (valor / contexto.rendaMensal) * 100;
                    if (percentualRenda > 30) {
                        dicas.push({
                            tipo: 'warning',
                            mensagem: 'O aporte representa mais de 30% da sua renda. Mantenha uma reserva de emergência.'
                        });
                    }
                }
                break;
        }

        return dicas;
    }

    mostrarTooltip(campo) {
        if (this.tooltips[campo]) {
            return `
                <div class="tooltip-content">
                    <p>${this.tooltips[campo]}</p>
                </div>
            `;
        }
        return '';
    }

    renderizarDicaInvestimento(nivel = 'basico') {
        const dicasNivel = this.dicas.investimentos[nivel];
        if (!dicasNivel) return '';

        const dicaAleatoria = dicasNivel[Math.floor(Math.random() * dicasNivel.length)];

        return `
            <div class="dica-investimento nivel-${dicaAleatoria.nivel}">
                <h4>${dicaAleatoria.titulo}</h4>
                <p>${dicaAleatoria.descricao}</p>
                <div class="exemplo">
                    <strong>Exemplo:</strong>
                    <p>${dicaAleatoria.exemplo}</p>
                </div>
            </div>
        `;
    }

    renderizarConteudoEducacional(tipo, nivel) {
        const conteudo = this.dicas[tipo]?.[nivel];
        if (!conteudo) return '';

        return `
            <div class="conteudo-educacional">
                ${conteudo.map(item => `
                    <div class="item-educacional">
                        <h3>${item.titulo}</h3>
                        <p>${item.descricao}</p>
                        <div class="exemplo-box">
                            <strong>Exemplo Prático:</strong>
                            <p>${item.exemplo}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

export default ConteudoEducacional;