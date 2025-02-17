import AppIntegrator from './modules/app-integrator.js';
import CalculoInvestimentos from './modules/calculo-investimentos.js';
import ExibicaoResultados from './modules/exibicao-resultados.js';
import ConteudoEducacional from './modules/educational-content.js';

document.addEventListener('DOMContentLoaded', () => {
    // Identificar tipo de calculadora
    const calculatorType = document.body.dataset.calculator;
    
    // Inicializar módulos
    const calculator = new CalculoInvestimentos();
    const display = new ExibicaoResultados();
    const education = new ConteudoEducacional();
    
    // Configurar integrador
    const app = new AppIntegrator();
    app.init(calculatorType, {calculator, display, education})
        .then(() => {
            console.log('Aplicação inicializada com sucesso');
            
            // Carregar último estado se existir
            const lastState = localStorage.getItem('lastCalculation');
            if (lastState) {
                try {
                    const state = JSON.parse(lastState);
                    app.loadState(state);
                } catch (error) {
                    console.error('Erro ao carregar último estado:', error);
                }
            }
            
            // Verificar parâmetros da URL
            const urlParams = new URLSearchParams(window.location.search);
            const simulationId = urlParams.get('simulation');
            if (simulationId) {
                app.loadSimulation(simulationId);
            }
        })
        .catch(error => {
            console.error('Erro ao inicializar aplicação:', error);
            showError('Erro ao inicializar o simulador. Por favor, recarregue a página.');
        });
});

function showError(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.querySelector('.messages-container')?.appendChild(alertDiv);
}