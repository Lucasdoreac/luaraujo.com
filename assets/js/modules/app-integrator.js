class AppIntegrator {
    constructor() {
        this.modules = {
            calculator: null,
            charts: null,
            validation: null,
            educational: null
        };
        this.state = {
            currentCalculator: '',
            lastResults: null,
            isSimulating: false
        };
    }

    async init(calculatorType) {
        this.state.currentCalculator = calculatorType;
        
        // Carregar módulos
        await this.loadModules();
        
        // Inicializar listeners
        this.setupEventListeners();
        
        // Carregar último estado se existir
        this.loadLastState();
        
        // Iniciar tour se for primeira visita
        this.checkFirstVisit();
    }

    async loadModules() {
        try {
            // Importar módulos dinamicamente
            const [Calculator, Charts, Validation, Educational] = await Promise.all([
                import('./calculadora.js'),
                import('./graficos.js'),
                import('./validation.js'),
                import('./educational-content.js')
            ]);

            // Instanciar módulos
            this.modules.calculator = new Calculator.default();
            this.modules.charts = new Charts.default('chart-container');
            this.modules.validation = new Validation.default();
            this.modules.educational = new Educational.default();

            console.log('Módulos carregados com sucesso');
        } catch (error) {
            console.error('Erro ao carregar módulos:', error);
            this.showError('Erro ao inicializar calculadora. Por favor, recarregue a página.');
        }
    }

    setupEventListeners() {
        // Form principal
        document.getElementById('calc-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCalculation();
        });

        // Inputs numéricos
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('input', (e) => this.handleInputChange(e));
            input.addEventListener('blur', (e) => this.handleInputBlur(e));
        });

        // Botões de exportação
        document.querySelectorAll('.export-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleExport(e));
        });

        // Tooltips educacionais
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseover', (e) => this.showTooltip(e));
            element.addEventListener('mouseout', (e) => this.hideTooltip(e));
        });
    }

    async handleCalculation() {
        if (this.state.isSimulating) return;
        
        this.state.isSimulating = true;
        this.showLoader();

        try {
            // Coletar dados do formulário
            const formData = this.collectFormData();

            // Validar dados
            const validationResult = this.modules.validation.validarFormulario(formData);
            if (!validationResult.valido) {
                this.showValidationErrors(validationResult.erros);
                return;
            }

            // Realizar cálculos
            const results = await this.modules.calculator.calcular(formData);
            this.state.lastResults = results;

            // Atualizar UI
            this.updateResults(results);
            
            // Gerar gráficos
            this.updateCharts(results);
            
            // Mostrar dicas educacionais
            this.showEducationalTips(results);
            
            // Salvar no histórico
            this.saveToHistory(formData, results);

        } catch (error) {
            console.error('Erro ao calcular:', error);
            this.showError('Erro ao realizar os cálculos. Por favor, tente novamente.');
        } finally {
            this.state.isSimulating = false;
            this.hideLoader();
        }
    }

    collectFormData() {
        const form = document.getElementById('calc-form');
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value.includes('.') ? parseFloat(value) : parseInt(value, 10);
        }

        return data;
    }

    updateResults(results) {
        Object.entries(results).forEach(([key, value]) => {
            const element = document.getElementById(`result-${key}`);
            if (element) {
                if (typeof value === 'number') {
                    element.textContent = this.formatValue(value, key);
                } else {
                    element.textContent = value;
                }
                element.classList.add('updated');
                setTimeout(() => element.classList.remove('updated'), 1000);
            }
        });
    }

    updateCharts(results) {
        // Gráfico de evolução
        this.modules.charts.criarGraficoEvolucaoPatrimonio({
            labels: results.evolucaoMensal.map((_, i) => `Mês ${i + 1}`),
            valores: results.evolucaoMensal.map(m => m.valorFinal)
        });

        // Gráfico comparativo
        if (results.comparativo) {
            this.modules.charts.criarGraficoComparativo({
                labels: results.comparativo.map(c => c.nome),
                valores: results.comparativo.map(c => c.valorFinal)
            });
        }
    }

    showEducationalTips(results) {
        const tipsContainer = document.getElementById('educational-tips');
        if (!tipsContainer) return;

        const tips = this.modules.educational.gerarDicasContextuais(results);
        tipsContainer.innerHTML = tips;
        tipsContainer.style.display = 'block';
    }

    async saveToHistory(formData, results) {
        try {
            const data = {
                data: new Date().toISOString(),
                tipo: this.state.currentCalculator,
                entrada: formData,
                resultados: results
            };

            await fetch('includes/save-history.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error('Erro ao salvar no histórico:', error);
        }
    }

    formatValue(value, type) {
        switch (type) {
            case 'moeda':
                return new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(value);
            case 'percentual':
                return new Intl.NumberFormat('pt-BR', {
                    style: 'percent',
                    minimumFractionDigits: 2
                }).format(value / 100);
            default:
                return value.toLocaleString('pt-BR');
        }
    }

    showLoader() {
        const loader = document.querySelector('.calculation-loader');
        if (loader) loader.classList.add('active');
    }

    hideLoader() {
        const loader = document.querySelector('.calculation-loader');
        if (loader) loader.classList.remove('active');
    }

    showError(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('.messages-container')?.appendChild(alertDiv);
    }

    showValidationErrors(errors) {
        errors.forEach(error => {
            const input = document.getElementById(error.campo);
            if (input) {
                input.classList.add('is-invalid');
                const feedback = document.createElement('div');
                feedback.className = 'invalid-feedback';
                feedback.textContent = error.mensagem;
                input.parentElement.appendChild(feedback);
            }
        });
    }

    checkFirstVisit() {
        if (!localStorage.getItem('visitado')) {
            this.startTour();
            localStorage.setItem('visitado', 'true');
        }
    }

    startTour() {
        // Iniciar tour guiado usando o módulo TourGuide
        const tour = new TourGuide(this.state.currentCalculator);
        tour.start();
    }
}

export default AppIntegrator;