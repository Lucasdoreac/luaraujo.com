const TourGuide = {
    steps: {
        'calc-1': [
            {
                element: '#valorInicial',
                title: 'Valor Inicial',
                content: 'Digite aqui quanto você tem disponível para começar a investir.',
                position: 'bottom'
            },
            {
                element: '#aporteMensal',
                title: 'Aporte Mensal',
                content: 'Defina quanto você pode investir mensalmente.',
                position: 'right'
            },
            {
                element: '#tipoRendimento',
                title: 'Tipo de Rendimento',
                content: 'Escolha entre taxa fixa ou CDI.',
                position: 'left'
            },
            {
                element: '#prazo',
                title: 'Prazo',
                content: 'Define por quanto tempo você pretende manter o investimento.',
                position: 'right'
            }
        ],
        'calc-2': [
            {
                element: '#rendaTributavel',
                title: 'Renda Tributável',
                content: 'Informe sua renda anual tributável para calcular o benefício fiscal do PGBL.',
                position: 'bottom'
            },
            {
                element: '#aporteInicial',
                title: 'Aporte Inicial',
                content: 'Valor inicial que você tem disponível para investir.',
                position: 'right'
            },
            {
                element: '#anos',
                title: 'Período',
                content: 'Tempo planejado para manter o investimento.',
                position: 'left'
            }
        ],
        'calc-3': [
            {
                element: '#aporteMensal',
                title: 'Aporte Mensal',
                content: 'Quanto você planeja investir por mês.',
                position: 'bottom'
            },
            {
                element: '#taxaMensal',
                title: 'Taxa Mensal',
                content: 'Taxa de rendimento mensal esperada.',
                position: 'right'
            }
        ]
    },

    init() {
        if (!localStorage.getItem('tourCompleted')) {
            this.addTourButton();
        }
        this.setupEventListeners();
    },

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tour-btn')) {
                this.startTour(this.getCurrentCalculator());
            }
            if (e.target.classList.contains('tour-next')) {
                this.nextStep();
            }
            if (e.target.classList.contains('tour-prev')) {
                this.prevStep();
            }
        });
    },

    getCurrentCalculator() {
        const path = window.location.pathname;
        if (path.includes('calc-1')) return 'calc-1';
        if (path.includes('calc-2')) return 'calc-2';
        if (path.includes('calc-3')) return 'calc-3';
        return 'calc-1'; // default
    },

    addTourButton() {
        const container = document.querySelector('.container');
        if (!container) return;

        const btn = document.createElement('button');
        btn.className = 'tour-btn btn btn-info mb-3';
        btn.innerHTML = '<i class="fas fa-question-circle"></i> Tour Guiado';
        container.insertBefore(btn, container.firstChild);
    },

    startTour(calculatorType) {
        this.currentCalculator = calculatorType;
        this.currentStep = 0;
        this.clearHighlights();
        this.showStep();
    },

    showStep() {
        const steps = this.steps[this.currentCalculator];
        if (!steps || this.currentStep >= steps.length) {
            this.endTour();
            return;
        }

        const step = steps[this.currentStep];
        const element = document.querySelector(step.element);
        
        if (!element) {
            this.nextStep();
            return;
        }

        this.clearHighlights();
        this.highlightElement(element);
        this.showTooltip(element, step);
    },

    highlightElement(element) {
        element.classList.add('tour-highlight');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },

    showTooltip(element, step) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tour-tooltip';
        tooltip.innerHTML = `
            <h4>${step.title}</h4>
            <p>${step.content}</p>
            <div class="tour-actions">
                ${this.currentStep > 0 ? '<button class="tour-prev btn btn-secondary btn-sm">Anterior</button>' : ''}
                <button class="tour-next btn btn-primary btn-sm">
                    ${this.currentStep < this.steps[this.currentCalculator].length - 1 ? 'Próximo' : 'Finalizar'}
                </button>
            </div>
        `;

        document.body.appendChild(tooltip);
        this.positionTooltip(tooltip, element, step.position);
    },

    positionTooltip(tooltip, element, position) {
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let top, left;

        switch (position) {
            case 'top':
                top = rect.top - tooltipRect.height - 10;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = rect.bottom + 10;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.left - tooltipRect.width - 10;
                break;
            case 'right':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.right + 10;
                break;
        }

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    },

    clearHighlights() {
        document.querySelectorAll('.tour-highlight').forEach(el => {
            el.classList.remove('tour-highlight');
        });
        document.querySelectorAll('.tour-tooltip').forEach(el => {
            el.remove();
        });
    },

    nextStep() {
        this.currentStep++;
        this.showStep();
    },

    prevStep() {
        this.currentStep--;
        this.showStep();
    },

    endTour() {
        this.clearHighlights();
        localStorage.setItem('tourCompleted', 'true');
        alert('Tour concluído! Você pode reiniciá-lo a qualquer momento clicando no botão Tour Guiado.');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    TourGuide.init();
});