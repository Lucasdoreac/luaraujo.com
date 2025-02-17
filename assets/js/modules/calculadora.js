const Calculadora = {
    formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    },

    formatarPorcentagem(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(valor / 100);
    },

    calcularJurosCompostos(principal, aporteMensal, taxa, prazo) {
        let montante = principal;
        for (let i = 0; i < prazo; i++) {
            montante = montante * (1 + taxa) + aporteMensal;
        }
        return montante;
    },

    calcularRentabilidadeReal(rentabilidadeNominal, inflacao) {
        return ((1 + rentabilidadeNominal) / (1 + inflacao) - 1);
    },

    calcularAliquotaIR(prazoMeses) {
        if (prazoMeses <= 6) return 0.225;
        if (prazoMeses <= 12) return 0.20;
        if (prazoMeses <= 24) return 0.175;
        return 0.15;
    },

    calcularImpostoRenda(rendimento, prazoMeses) {
        const aliquota = this.calcularAliquotaIR(prazoMeses);
        return rendimento * aliquota;
    },

    calcularBeneficioFiscalPGBL(rendaTributavel, aportePGBL) {
        const limiteDeducao = rendaTributavel * 0.12;
        const valorDedutivel = Math.min(aportePGBL, limiteDeducao);
        return valorDedutivel * 0.275; // Considerando alíquota máxima de 27.5%
    },

    calcularRendimentoAcumulado(aportes, taxas, prazo) {
        let saldo = 0;
        let rendimentoTotal = 0;

        for (let i = 0; i < prazo; i++) {
            const rendimentoMes = saldo * taxas[i];
            saldo = (saldo + rendimentoMes + aportes[i]);
            rendimentoTotal += rendimentoMes;
        }

        return {
            saldoFinal: saldo,
            rendimentoTotal: rendimentoTotal
        };
    },

    calcularMetaMensal(valorMeta, prazo, taxaMensal) {
        // PMT = VF / ((1 + i)^n - 1) / i
        const taxaDecimal = taxaMensal / 100;
        const denominador = (Math.pow(1 + taxaDecimal, prazo) - 1) / taxaDecimal;
        return valorMeta / denominador;
    }
};

const Validacao = {
    validarEntradas(dados) {
        const erros = [];

        if (dados.valorInicial < 0) {
            erros.push('O valor inicial não pode ser negativo');
        }

        if (dados.aporteMensal < 0) {
            erros.push('O aporte mensal não pode ser negativo');
        }

        if (dados.prazo <= 0) {
            erros.push('O prazo deve ser maior que zero');
        }

        if (dados.taxaMensal < 0) {
            erros.push('A taxa mensal não pode ser negativa');
        }

        return erros;
    },

    validarPGBL(dados) {
        const erros = [];

        if (dados.rendaTributavel <= 0) {
            erros.push('A renda tributável deve ser maior que zero');
        }

        if (dados.aportePGBL < 0) {
            erros.push('O aporte PGBL não pode ser negativo');
        }

        if (dados.prazoAnos <= 0) {
            erros.push('O prazo deve ser maior que zero');
        }

        return erros;
    }
};

const Interface = {
    exibirErros(erros) {
        const container = document.getElementById('mensagens-erro') || 
            this.criarContainerErros();

        container.innerHTML = '';
        
        erros.forEach(erro => {
            const alert = document.createElement('div');
            alert.className = 'alert alert-danger alert-dismissible fade show';
            alert.innerHTML = `
                ${erro}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            container.appendChild(alert);
        });
    },

    criarContainerErros() {
        const container = document.createElement('div');
        container.id = 'mensagens-erro';
        document.querySelector('form').prepend(container);
        return container;
    },

    limparErros() {
        const container = document.getElementById('mensagens-erro');
        if (container) {
            container.innerHTML = '';
        }
    },

    atualizarResultado(elemento, valor, formatador) {
        const el = document.getElementById(elemento);
        if (el) {
            el.textContent = formatador(valor);
            el.classList.add('updated');
            setTimeout(() => el.classList.remove('updated'), 1000);
        }
    }
};

// Exportar módulos
export { Calculadora, Validacao, Interface };