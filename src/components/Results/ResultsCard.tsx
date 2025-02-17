import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Line, Bar } from 'react-chartjs-2';

interface ResultsData {
  valorFinal: number;
  ganhoTotal: number;
  inflacaoAcumulada: number;
  valorFinalAjustado: number;
  comparacoes: {
    poupanca: { valorFinal: number; ganhoTotal: number };
    cdb: { valorFinal: number; ganhoTotal: number };
    lciLca: { valorFinal: number; ganhoTotal: number };
  };
}

interface ResultsCardProps {
  data: ResultsData;
  initialValues: {
    valorInicial: string;
    aporteMensal: string;
    prazo: string;
  };
}

export function ResultsCard({ data, initialValues }: ResultsCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? '#fff' : '#000',
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        ticks: {
          color: isDark ? '#fff' : '#000',
          callback: (value: number) => formatCurrency(value),
        },
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: isDark ? '#fff' : '#000',
        },
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const generateTimelineData = () => {
    const labels = Array.from({ length: parseInt(initialValues.prazo) }, (_, i) => `Mês ${i + 1}`);
    const valorInicial = parseFloat(initialValues.valorInicial);
    const aporteMensal = parseFloat(initialValues.aporteMensal);
    const taxaMensal = Math.pow(data.valorFinal / (valorInicial + aporteMensal * labels.length), 1 / labels.length) - 1;

    const investmentData = labels.map((_, i) => {
      let valor = valorInicial;
      for (let j = 0; j <= i; j++) {
        valor = valor * (1 + taxaMensal) + aporteMensal;
      }
      return valor;
    });

    return {
      labels,
      datasets: [
        {
          label: 'Valor Acumulado',
          data: investmentData,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          fill: true,
        },
      ],
    };
  };

  const generateComparisonData = () => {
    return {
      labels: ['Seu Investimento', 'Poupança', 'CDB', 'LCI/LCA'],
      datasets: [
        {
          label: 'Valor Final',
          data: [
            data.valorFinal,
            data.comparacoes.poupanca.valorFinal,
            data.comparacoes.cdb.valorFinal,
            data.comparacoes.lciLca.valorFinal,
          ],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(234, 179, 8, 0.8)',
            'rgba(239, 68, 68, 0.8)',
          ],
        },
      ],
    };
  };

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`rounded-lg p-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h4 className="text-sm font-medium mb-2">Valor Final</h4>
          <p className="text-2xl font-bold text-blue-500">{formatCurrency(data.valorFinal)}</p>
        </div>
        <div className={`rounded-lg p-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h4 className="text-sm font-medium mb-2">Ganho Total</h4>
          <p className="text-2xl font-bold text-green-500">{formatCurrency(data.ganhoTotal)}</p>
        </div>
        <div className={`rounded-lg p-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h4 className="text-sm font-medium mb-2">Inflação Acumulada</h4>
          <p className="text-2xl font-bold text-red-500">{data.inflacaoAcumulada.toFixed(2)}%</p>
        </div>
        <div className={`rounded-lg p-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h4 className="text-sm font-medium mb-2">Valor Final Ajustado</h4>
          <p className="text-2xl font-bold text-purple-500">{formatCurrency(data.valorFinalAjustado)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
          <h4 className="text-lg font-medium mb-4">Evolução do Investimento</h4>
          <Line data={generateTimelineData()} options={chartOptions} />
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
          <h4 className="text-lg font-medium mb-4">Comparativo</h4>
          <Bar data={generateComparisonData()} options={chartOptions} />
        </div>
      </div>

      {/* Analysis */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
        <h4 className="text-lg font-medium mb-4">Análise dos Resultados</h4>
        <div className="space-y-4">
          <p>
            Com um investimento inicial de {formatCurrency(parseFloat(initialValues.valorInicial))} e aportes mensais de {formatCurrency(parseFloat(initialValues.aporteMensal))}, seu patrimônio atingiu {formatCurrency(data.valorFinal)} em {initialValues.prazo} meses.
          </p>
          <p>
            Considerando a inflação de {data.inflacaoAcumulada.toFixed(2)}% no período, seu ganho real foi de {formatCurrency(data.valorFinalAjustado - parseFloat(initialValues.valorInicial))}.
          </p>
          <div className="mt-4">
            <h5 className="font-medium mb-2">Comparação com outros investimentos:</h5>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Poupança: {formatCurrency(data.comparacoes.poupanca.valorFinal)} ({((data.comparacoes.poupanca.valorFinal / data.valorFinal - 1) * 100).toFixed(2)}% em relação ao seu investimento)
              </li>
              <li>
                CDB: {formatCurrency(data.comparacoes.cdb.valorFinal)} ({((data.comparacoes.cdb.valorFinal / data.valorFinal - 1) * 100).toFixed(2)}% em relação ao seu investimento)
              </li>
              <li>
                LCI/LCA: {formatCurrency(data.comparacoes.lciLca.valorFinal)} ({((data.comparacoes.lciLca.valorFinal / data.valorFinal - 1) * 100).toFixed(2)}% em relação ao seu investimento)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}