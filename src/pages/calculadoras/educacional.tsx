import React, { useState } from 'react';
import Head from 'next/head';
import { useTheme } from '@/contexts/ThemeContext';
import { Tooltip } from '@/components/Tooltip';
import { ConceptCard } from '@/components/Education/ConceptCard';
import { ResultsCard } from '@/components/Results/ResultsCard';
import { concepts } from '@/data/educational-content';

type FormData = {
  valorInicial: string;
  aporteMensal: string;
  tipoRendimento: 'fixa' | 'cdi';
  taxaFixa: string;
  taxaCDI: string;
  percentualCDIComImposto: string;
  percentualCDISemImposto: string;
  prazo: string;
  inflacao: string;
  goalAmount: string;
  goalYears: string;
};

type ResultData = {
  valorFinal: number;
  ganhoTotal: number;
  inflacaoAcumulada: number;
  valorFinalAjustado: number;
  comparacoes: {
    poupanca: { valorFinal: number; ganhoTotal: number };
    cdb: { valorFinal: number; ganhoTotal: number };
    lciLca: { valorFinal: number; ganhoTotal: number };
  };
};

export default function SimuladorEducacional() {
  const { theme } = useTheme();
  const [showTips, setShowTips] = useState(false);
  const [activeTab, setActiveTab] = useState('resultados');
  const [activeConceptIndex, setActiveConceptIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    valorInicial: '',
    aporteMensal: '',
    tipoRendimento: 'fixa',
    taxaFixa: '',
    taxaCDI: '',
    percentualCDIComImposto: '',
    percentualCDISemImposto: '',
    prazo: '',
    inflacao: '',
    goalAmount: '',
    goalYears: '',
  });
  const [results, setResults] = useState<ResultData | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateResults = () => {
    // ... (mantemos a lógica de cálculo como estava)
  };

  const conceptsList = Object.entries(concepts);

  return (
    <>
      <Head>
        <title>Simulador Educacional - Calculadoras Financeiras</title>
        <meta name="description" content="Desvende os mistérios da renda fixa e CDI, com juros compostos e inflação na prática." />
      </Head>

      <main className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              Simulador Educacional <i className="fas fa-chart-line text-blue-500"></i>
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
              <nav className="flex flex-wrap gap-4 mb-6">
                {conceptsList.map(([key, concept], index) => (
                  <button
                    key={key}
                    onClick={() => setActiveConceptIndex(index)}
                    className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap
                      ${activeConceptIndex === index
                        ? 'bg-blue-500 text-white'
                        : theme === 'dark'
                          ? 'bg-gray-800 hover:bg-gray-700'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                  >
                    {concept.title}
                  </button>
                ))}
              </nav>
              <ConceptCard {...conceptsList[activeConceptIndex][1]} />
            </div>
          )}

          {/* Calculator Form */}
          <div className={`rounded-lg shadow-lg p-6 mb-8
            ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className="text-xl font-bold mb-6">Simulação</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Basic Inputs */}
              <div>
                <label className="block font-medium mb-2">
                  Valor Inicial (R$)
                  <Tooltip content="Valor inicial que você tem para investir" position="right">
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

              {/* More form fields... */}
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
            <div className={`rounded-lg shadow-lg p-6
              ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
            >
              <ResultsCard 
                data={results}
                initialValues={{
                  valorInicial: formData.valorInicial,
                  aporteMensal: formData.aporteMensal,
                  prazo: formData.prazo
                }}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}