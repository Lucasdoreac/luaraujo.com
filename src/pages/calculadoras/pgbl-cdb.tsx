import React, { useState } from 'react';
import Head from 'next/head';
import { useTheme } from '@/contexts/ThemeContext';
import { Tooltip } from '@/components/Tooltip';
import { ConceptCard } from '@/components/Education/ConceptCard';
import { ComparisonCard } from '@/components/Results/ComparisonCard';
import { concepts } from '@/data/educational-content';

type FormData = {
  rendaTributavel: string;
  contribuicaoAnual: string;
  aporteInicial: string;
  prazo: string;
  taxaCDI: string;
  taxaAdministracao: string;
  faixaIR: '35' | '30' | '25' | '20' | '15' | '10';
};

type ResultData = {
  pgbl: {
    valorFinal: number;
    desembolsoEfetivo: number;
    impostoRenda: number;
    valorLiquido: number;
    taxaAdministracao: number;
    rentabilidadeLiquida: number;
  };
  cdb: {
    valorFinal: number;
    desembolsoEfetivo: number;
    impostoRenda: number;
    valorLiquido: number;
    rentabilidadeLiquida: number;
  };
  analise: {
    diferencaLiquida: number;
    beneficioFiscal: number;
    taxaEquivalenteCDB: number;
    recomendacao: 'pgbl' | 'cdb';
    justificativa: string;
  };
  timeline: Array<{
    ano: number;
    pgbl: {
      aporte: number;
      saldo: number;
      beneficioFiscal: number;
    };
    cdb: {
      aporte: number;
      saldo: number;
    };
  }>;
};

export default function SimuladorPGBLvsCDB() {
  const { theme } = useTheme();
  const [showTips, setShowTips] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    rendaTributavel: '',
    contribuicaoAnual: '',
    aporteInicial: '',
    prazo: '',
    taxaCDI: '',
    taxaAdministracao: '',
    faixaIR: '35'
  });
  const [results, setResults] = useState<ResultData | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateResults = () => {
    // ... (mantendo a mesma lógica de cálculo que já definimos)
  };

  return (
    <>
      <Head>
        <title>Simulador PGBL vs CDB - Calculadoras Financeiras</title>
        <meta name="description" content="Compare investimentos em PGBL e CDB, considerando benefícios fiscais, tributação e rentabilidade." />
      </Head>

      <main className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              PGBL vs CDB <i className="fas fa-balance-scale text-blue-500"></i>
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
            <div className="mb-8">
              <ConceptCard {...concepts.impostoRenda} />
            </div>
          )}

          {/* Simulation Form */}
          <div className={`rounded-lg shadow-lg p-6 mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-bold mb-6">Simulação</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Renda Tributável */}
              <div>
                <label className="block font-medium mb-2">
                  Renda Tributável Anual (R$)
                  <Tooltip content="Sua renda anual sujeita a imposto de renda" position="right">
                    <i className="fas fa-question-circle ml-2 text-blue-500"></i>
                  </Tooltip>
                </label>
                <input
                  type="number"
                  name="rendaTributavel"
                  value={formData.rendaTributavel}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'}`}
                  placeholder="0,00"
                />
              </div>

              {/* Contribuição Anual */}
              <div>
                <label className="block font-medium mb-2">
                  Contribuição Anual (R$)
                  <Tooltip content="Valor que você pretende investir por ano (máximo 12% da renda para PGBL)" position="right">
                    <i className="fas fa-question-circle ml-2 text-blue-500"></i>
                  </Tooltip>
                </label>
                <input
                  type="number"
                  name="contribuicaoAnual"
                  value={formData.contribuicaoAnual}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'}`}
                  placeholder="0,00"
                />
              </div>

              {/* Aporte Inicial */}
              <div>
                <label className="block font-medium mb-2">
                  Aporte Inicial (R$)
                  <Tooltip content="Valor inicial do investimento (opcional)" position="right">
                    <i className="fas fa-question-circle ml-2 text-blue-500"></i>
                  </Tooltip>
                </label>
                <input
                  type="number"
                  name="aporteInicial"
                  value={formData.aporteInicial}
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
                  <Tooltip content="Por quanto tempo você pretende manter o investimento" position="right">
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

              {/* Taxa CDI */}
              <div>
                <label className="block font-medium mb-2">
                  Taxa CDI Anual (%)
                  <Tooltip content="Taxa do CDI atual (ex: 13.75)" position="right">
                    <i className="fas fa-question-circle ml-2 text-blue-500"></i>
                  </Tooltip>
                </label>
                <input
                  type="number"
                  name="taxaCDI"
                  value={formData.taxaCDI}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'}`}
                  placeholder="0,00"
                  step="0.01"
                />
              </div>

              {/* Taxa de Administração */}
              <div>
                <label className="block font-medium mb-2">
                  Taxa de Administração PGBL (%)
                  <Tooltip content="Taxa cobrada pelo administrador do PGBL" position="right">
                    <i className="fas fa-question-circle ml-2 text-blue-500"></i>
                  </Tooltip>
                </label>
                <input
                  type="number"
                  name="taxaAdministracao"
                  value={formData.taxaAdministracao}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'}`}
                  placeholder="0,00"
                  step="0.01"
                />
              </div>

              {/* Faixa IR */}
              <div>
                <label className="block font-medium mb-2">
                  Faixa IR PGBL
                  <Tooltip content="Alíquota de IR que será aplicada no resgate do PGBL" position="right">
                    <i className="fas fa-question-circle ml-2 text-blue-500"></i>
                  </Tooltip>
                </label>
                <select
                  name="faixaIR"
                  value={formData.faixaIR}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'}`}
                >
                  <option value="35">35% (até 2 anos)</option>
                  <option value="30">30% (2 a 4 anos)</option>
                  <option value="25">25% (4 a 6 anos)</option>
                  <option value="20">20% (6 a 8 anos)</option>
                  <option value="15">15% (8 a 10 anos)</option>
                  <option value="10">10% (acima de 10 anos)</option>
                </select>
              </div>
            </div>

            <button
              onClick={calculateResults}
              className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Calcular <i className="fas fa-calculator ml-2"></i>
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className={`rounded-lg shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <ComparisonCard data={results} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}