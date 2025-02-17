import React, { useState } from 'react';
import Head from 'next/head';
import { useTheme } from '@/contexts/ThemeContext';
import { Tooltip } from '@/components/Tooltip';
import { ConceptCard } from '@/components/Education/ConceptCard';
import { concepts } from '@/data/educational-content';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

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
    // ... (mantém a mesma lógica de cálculo que tínhamos antes)
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              Simulador Educacional <i className="fas fa-chart-line text-blue-500"></i>
            </h1>
            <button
              onClick={() => setShowTips(!showTips)}
              className={`px-4 py-2 rounded-lg transition-colors
                ${theme === 'dark' 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:bg-gray-100'}`}
            >
              {showTips ? 'Ocultar Dicas' : 'Mostrar Dicas'} <i className="fas fa-lightbulb text-yellow-500 ml-2"></i>
            </button>
          </div>

          {/* Educational Content */}
          {showTips && (
            <div className="mb-8 space-y-6">
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {conceptsList.map(([key, concept], index) => (
                  <button
                    key={key}
                    onClick={() => setActiveConceptIndex(index)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors
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
              </div>
              <ConceptCard {...conceptsList[activeConceptIndex][1]} />
            </div>
          )}

          {/* Simulation Form */}
          <div className={`rounded-lg shadow-lg p-6 mb-8
            ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className="text-xl font-semibold mb-6">Simulação</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Valor Inicial (R$)
                  <Tooltip content="Informe o valor inicial que você tem para investir." position="right">
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
                      : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  placeholder="0,00"
                />
              </div>
              {/* Add other form fields similarly */}
            </div>

            <button
              onClick={calculateResults}
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Calcular <i className="fas fa-calculator ml-2"></i>
            </button>
          </div>

          {/* Results and Charts */}
          {results && (
            <div className={`rounded-lg shadow-lg p-6
              ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
            >
              {/* Add results display and charts */}
            </div>
          )}
        </div>
      </main>
    </>
  );
}