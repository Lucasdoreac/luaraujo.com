import React, { useState } from 'react';
import Head from 'next/head';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
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
  Tooltip,
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
  const [showTips, setShowTips] = useState(false);
  const [activeTab, setActiveTab] = useState('resultados');
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

  const calculateResults = () => {
    const {
      valorInicial,
      aporteMensal,
      tipoRendimento,
      taxaFixa,
      taxaCDI,
      percentualCDIComImposto,
      percentualCDISemImposto,
      prazo,
      inflacao,
    } = formData;

    // Convert string inputs to numbers
    const initialValue = parseFloat(valorInicial);
    const monthlyDeposit = parseFloat(aporteMensal);
    const period = parseInt(prazo);
    const inflationRate = parseFloat(inflacao) / 100;
    let monthlyRate;

    if (tipoRendimento === 'fixa') {
      monthlyRate = parseFloat(taxaFixa) / 100;
    } else {
      const annualCDI = parseFloat(taxaCDI) / 100;
      const cdiPercentage = parseFloat(percentualCDIComImposto) / 100;
      monthlyRate = (annualCDI / 12) * cdiPercentage;
    }

    // Calculate final value with compound interest
    let finalValue = initialValue;
    for (let i = 0; i < period; i++) {
      finalValue = finalValue * (1 + monthlyRate) + monthlyDeposit;
    }

    const totalGain = finalValue - initialValue - (monthlyDeposit * period);
    const accumulatedInflation = Math.pow(1 + inflationRate, period / 12) - 1;
    const adjustedFinalValue = finalValue / (1 + accumulatedInflation);

    // Calculate comparison values
    const savingsRate = 0.005; // 0.5% monthly
    const cdbRate = (parseFloat(taxaCDI) / 12) * (parseFloat(percentualCDIComImposto) / 100);
    const lciLcaRate = (parseFloat(taxaCDI) / 12) * (parseFloat(percentualCDISemImposto) / 100);

    let savingsFinal = initialValue;
    let cdbFinal = initialValue;
    let lciLcaFinal = initialValue;

    for (let i = 0; i < period; i++) {
      savingsFinal = savingsFinal * (1 + savingsRate) + monthlyDeposit;
      cdbFinal = cdbFinal * (1 + cdbRate) + monthlyDeposit;
      lciLcaFinal = lciLcaFinal * (1 + lciLcaRate) + monthlyDeposit;
    }

    setResults({
      valorFinal: finalValue,
      ganhoTotal: totalGain,
      inflacaoAcumulada: accumulatedInflation * 100,
      valorFinalAjustado: adjustedFinalValue,
      comparacoes: {
        poupanca: {
          valorFinal: savingsFinal,
          ganhoTotal: savingsFinal - initialValue - (monthlyDeposit * period),
        },
        cdb: {
          valorFinal: cdbFinal,
          ganhoTotal: cdbFinal - initialValue - (monthlyDeposit * period),
        },
        lciLca: {
          valorFinal: lciLcaFinal,
          ganhoTotal: lciLcaFinal - initialValue - (monthlyDeposit * period),
        },
      },
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <>
      <Head>
        <title>Simulador Educacional - Calculadoras Financeiras</title>
        <meta name="description" content="Desvende os mistérios da renda fixa e CDI, com juros compostos e inflação na prática." />
      </Head>

      <main className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">
            Simulador Educacional <i className="fas fa-chart-line text-blue-600"></i>
          </h1>

          {/* Educational Tips */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                Conceitos Básicos de Investimentos
              </h3>
              <button
                onClick={() => setShowTips(!showTips)}
                className="text-blue-600 hover:text-blue-700"
              >
                <i className={`fas fa-chevron-${showTips ? 'up' : 'down'}`}></i>
              </button>
            </div>

            {showTips && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Juros Compostos</h4>
                  <p className="text-gray-600">
                    São os juros que incidem não apenas sobre o capital inicial, mas também
                    sobre os juros acumulados em períodos anteriores.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">CDI</h4>
                  <p className="text-gray-600">
                    É uma taxa de referência no mercado financeiro brasileiro, muito
                    utilizada para remunerar investimentos de renda fixa.
                  </p>
                </div>
                {/* Add more educational content */}
              </div>
            )}
          </div>

          {/* Simulation Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-6">Simulação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor Inicial (R$)
                </label>
                <input
                  type="number"
                  value={formData.valorInicial}
                  onChange={(e) =>
                    setFormData({ ...formData, valorInicial: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0,00"
                />
              </div>
              {/* Add more form fields */}
            </div>

            <button
              onClick={calculateResults}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Calcular <i className="fas fa-calculator ml-2"></i>
            </button>
          </div>

          {/* Results Tabs */}
          {results && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('resultados')}
                    className={`pb-4 font-medium ${
                      activeTab === 'resultados'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Resultados <i className="fas fa-chart-bar ml-2"></i>
                  </button>
                  {/* Add more tabs */}
                </nav>
              </div>

              {activeTab === 'resultados' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="font-semibold mb-4">Valores Finais</h4>
                      <div className="space-y-2">
                        <p>
                          <strong>Valor Final:</strong>{' '}
                          {formatCurrency(results.valorFinal)}
                        </p>
                        <p>
                          <strong>Ganho Total:</strong>{' '}
                          {formatCurrency(results.ganhoTotal)}
                        </p>
                        {/* Add more results */}
                      </div>
                    </div>
                    {/* Add comparison results */}
                  </div>

                  {/* Add charts */}
                </div>
              )}
              {/* Add more tab content */}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
