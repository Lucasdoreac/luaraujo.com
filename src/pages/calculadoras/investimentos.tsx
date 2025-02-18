import React, { useState } from 'react';
import Head from 'next/head';
import { useTheme } from '@/contexts/ThemeContext';
import { Tooltip } from '@/components/Tooltip';
import { ConceptCard } from '@/components/Education/ConceptCard';
import { concepts } from '@/data/educational-content';

// ... (mantém as interfaces e tipos)

export default function SimuladorInvestimentos() {
  const { theme } = useTheme();
  const [showTips, setShowTips] = useState(false);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'simulacao'>('portfolio');
  const [formData, setFormData] = useState<FormData>({
    perfilRisco: 'moderado',
    valorInicial: '',
    aporteMensal: '',
    prazo: '',
    objetivoFinanceiro: '',
    inflacao: '',
    investimentos: []
  });
  const [results, setResults] = useState<ResultData | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateResults = () => {
    // Implementação do cálculo dos resultados
  };

  return (
    <>
      <Head>
        <title>Simulador de Investimentos - Calculadoras Financeiras</title>
        <meta name="description" content="Planeje sua carteira de investimentos, simule cenários e avalie riscos e retornos." />
      </Head>

      <main className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              Simulador de Investimentos <i className="fas fa-chart-pie text-blue-500"></i>
            </h1>
            <button
              onClick={() => setShowTips(!showTips)}
              className={`px-4 py-2 rounded-lg transition-colors
                ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}
            >
              {showTips ? 'Ocultar Dicas' : 'Mostrar Dicas'} <i className="fas fa-lightbulb text-yellow-500 ml-2"></i>
            </button>
          </div>

          {/* Educational Content */}
          {showTips && (
            <div className="mb-8 space-y-6">
              <ConceptCard {...concepts.rendaFixa} />
            </div>
          )}

          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'portfolio'
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-white hover:bg-gray-100'
              }`}
            >
              Portfólio Atual
            </button>
            <button
              onClick={() => setActiveTab('simulacao')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'simulacao'
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-white hover:bg-gray-100'
              }`}
            >
              Simulação
            </button>
          </div>

          {/* Main Content */}
          <div className={`rounded-lg shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            {activeTab === 'portfolio' ? (
              // Portfólio Tab
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-6">Portfólio Atual</h2>
                
                {/* Adicionar Investimento */}
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className="text-lg font-semibold mb-4">Adicionar Investimento</h3>
                  {/* Form para adicionar investimento */}
                </div>

                {/* Lista de Investimentos */}
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className="text-lg font-semibold mb-4">Seus Investimentos</h3>
                  {/* Lista de investimentos */}
                </div>

                {/* Análise da Carteira */}
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className="text-lg font-semibold mb-4">Análise da Carteira</h3>
                  {/* Gráficos e análises */}
                </div>
              </div>
            ) : (
              // Simulação Tab
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-6">Simulação</h2>

                {/* Parâmetros da Simulação */}
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className="text-lg font-semibold mb-4">Parâmetros</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Valor Inicial */}
                    <div>
                      <label className="block font-medium mb-2">
                        Valor Inicial (R$)
                        <Tooltip content="Valor inicial para investimento" position="right">
                          <i className="fas fa-question-circle ml-2 text-blue-500"></i>
                        </Tooltip>
                      </label>
                      <input
                        type="number"
                        name="valorInicial"
                        value={formData.valorInicial}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border transition-colors
                          ${theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'}`}
                        placeholder="0,00"
                      />
                    </div>

                    {/* Aporte Mensal */}
                    <div>
                      <label className="block font-medium mb-2">
                        Aporte Mensal (R$)
                        <Tooltip content="Valor que você planeja investir mensalmente" position="right">
                          <i className="fas fa-question-circle ml-2 text-blue-500"></i>
                        </Tooltip>
                      </label>
                      <input
                        type="number"
                        name="aporteMensal"
                        value={formData.aporteMensal}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border transition-colors
                          ${theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'}`}
                        placeholder="0,00"
                      />
                    </div>

                    {/* Prazo */}
                    <div>
                      <label className="block font-medium mb-2">
                        Prazo (anos)
                        <Tooltip content="Horizonte de investimento planejado" position="right">
                          <i className="fas fa-question-circle ml-2 text-blue-500"></i>
                        </Tooltip>
                      </label>
                      <input
                        type="number"
                        name="prazo"
                        value={formData.prazo}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border transition-colors
                          ${theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'}`}
                        placeholder="0"
                        min="1"
                      />
                    </div>

                    {/* Objetivo Financeiro */}
                    <div>
                      <label className="block font-medium mb-2">
                        Objetivo Financeiro (R$)
                        <Tooltip content="Valor que você deseja atingir" position="right">
                          <i className="fas fa-question-circle ml-2 text-blue-500"></i>
                        </Tooltip>
                      </label>
                      <input
                        type="number"
                        name="objetivoFinanceiro"
                        value={formData.objetivoFinanceiro}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border transition-colors
                          ${theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'}`}
                        placeholder="0,00"
                      />
                    </div>

                    {/* Inflação */}
                    <div>
                      <label className="block font-medium mb-2">
                        Inflação Estimada (% a.a.)
                        <Tooltip content="Estimativa de inflação anual" position="right">
                          <i className="fas fa-question-circle ml-2 text-blue-500"></i>
                        </Tooltip>
                      </label>
                      <input
                        type="number"
                        name="inflacao"
                        value={formData.inflacao}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border transition-colors
                          ${theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'}`}
                        placeholder="0,00"
                        step="0.01"
                      />
                    </div>

                    {/* Perfil de Risco */}
                    <div>
                      <label className="block font-medium mb-2">
                        Perfil de Risco
                        <Tooltip content="Seu perfil de investidor" position="right">
                          <i className="fas fa-question-circle ml-2 text-blue-500"></i>
                        </Tooltip>
                      </label>
                      <select
                        name="perfilRisco"
                        value={formData.perfilRisco}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border transition-colors
                          ${theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'}`}
                      >
                        <option value="conservador">Conservador</option>
                        <option value="moderado">Moderado</option>
                        <option value="agressivo">Agressivo</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={calculateResults}
                  className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Simular <i className="fas fa-calculator ml-2"></i>
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          {results && (
            <div className={`mt-8 rounded-lg shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              {/* Resultados da simulação */}
            </div>
          )}
        </div>
      </main>
    </>
  );
}