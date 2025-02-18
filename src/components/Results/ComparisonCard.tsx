import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Line, Bar } from 'react-chartjs-2';

interface TimelineData {
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
}

interface ResultData {
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
  timeline: TimelineData[];
}

interface ComparisonCardProps {
  data: ResultData;
}

export function ComparisonCard({ data }: ComparisonCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'summary' | 'timeline' | 'analysis'>('summary');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
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
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
          },
        },
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

  const timelineChartData = {
    labels: data.timeline.map(t => `Ano ${t.ano}`),
    datasets: [
      {
        label: 'PGBL',
        data: data.timeline.map(t => t.pgbl.saldo),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        fill: true,
      },
      {
        label: 'CDB',
        data: data.timeline.map(t => t.cdb.saldo),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        fill: true,
      },
    ],
  };

  const comparisonChartData = {
    labels: ['Valor Final', 'Desembolso Efetivo', 'Imposto de Renda', 'Valor Líquido'],
    datasets: [
      {
        label: 'PGBL',
        data: [
          data.pgbl.valorFinal,
          data.pgbl.desembolsoEfetivo,
          data.pgbl.impostoRenda,
          data.pgbl.valorLiquido,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'CDB',
        data: [
          data.cdb.valorFinal,
          data.cdb.desembolsoEfetivo,
          data.cdb.impostoRenda,
          data.cdb.valorLiquido,
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('summary')}
          className={`pb-2 font-medium ${
            activeTab === 'summary'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          Resumo
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`pb-2 font-medium ${
            activeTab === 'timeline'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          Evolução
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`pb-2 font-medium ${
            activeTab === 'analysis'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          Análise
        </button>
      </div>

      {/* Summary Tab */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PGBL Summary */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className="text-lg font-bold mb-4 text-blue-500">PGBL</h3>
              <div className="space-y-2">
                <p>Valor Final: {formatCurrency(data.pgbl.valorFinal)}</p>
                <p>Desembolso Efetivo: {formatCurrency(data.pgbl.desembolsoEfetivo)}</p>
                <p>Imposto de Renda: {formatCurrency(data.pgbl.impostoRenda)}</p>
                <p>Taxa de Administração: {formatCurrency(data.pgbl.taxaAdministracao)}</p>
                <p>Valor Líquido: {formatCurrency(data.pgbl.valorLiquido)}</p>
                <p>Rentabilidade Líquida: {formatPercent(data.pgbl.rentabilidadeLiquida)}</p>
              </div>
            </div>

            {/* CDB Summary */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className="text-lg font-bold mb-4 text-green-500">CDB</h3>
              <div className="space-y-2">
                <p>Valor Final: {formatCurrency(data.cdb.valorFinal)}</p>
                <p>Desembolso Efetivo: {formatCurrency(data.cdb.desembolsoEfetivo)}</p>
                <p>Imposto de Renda: {formatCurrency(data.cdb.impostoRenda)}</p>
                <p>Valor Líquido: {formatCurrency(data.cdb.valorLiquido)}</p>
                <p>Rentabilidade Líquida: {formatPercent(data.cdb.rentabilidadeLiquida)}</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="text-lg font-bold mb-4">Comparativo</h3>
            <div className="h-80">
              <Bar data={comparisonChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}

      {/* Timeline Tab */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="text-lg font-bold mb-4">Evolução do Investimento</h3>
            <div className="h-80">
              <Line data={timelineChartData} options={chartOptions} />
            </div>
          </div>

          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="text-lg font-bold mb-4">Detalhamento Anual</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 text-left">Ano</th>
                    <th className="py-2 text-right">Aporte PGBL</th>
                    <th className="py-2 text-right">Benefício Fiscal</th>
                    <th className="py-2 text-right">Saldo PGBL</th>
                    <th className="py-2 text-right">Aporte CDB</th>
                    <th className="py-2 text-right">Saldo CDB</th>
                  </tr>
                </thead>
                <tbody>
                  {data.timeline.map((year) => (
                    <tr key={year.ano} className="border-b border-gray-600">
                      <td className="py-2">{year.ano}</td>
                      <td className="py-2 text-right">{formatCurrency(year.pgbl.aporte)}</td>
                      <td className="py-2 text-right">{formatCurrency(year.pgbl.beneficioFiscal)}</td>
                      <td className="py-2 text-right">{formatCurrency(year.pgbl.saldo)}</td>
                      <td className="py-2 text-right">{formatCurrency(year.cdb.aporte)}</td>
                      <td className="py-2 text-right">{formatCurrency(year.cdb.saldo)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="text-lg font-bold mb-4">Análise Comparativa</h3>
            <div className="space-y-4">
              <p>
                <strong>Diferença Líquida:</strong>{' '}
                <span className={data.analise.diferencaLiquida > 0 ? 'text-green-500' : 'text-red-500'}>
                  {formatCurrency(data.analise.diferencaLiquida)}
                </span>
              </p>
              <p>
                <strong>Benefício Fiscal Total:</strong>{' '}
                {formatCurrency(data.analise.beneficioFiscal)}
              </p>
              <p>
                <strong>Taxa Equivalente CDB:</strong>{' '}
                {formatPercent(data.analise.taxaEquivalenteCDB)}
              </p>
              <div className="mt-6">
                <h4 className="font-bold mb-2">Recomendação:</h4>
                <div className={`p-4 rounded-lg ${
                  data.analise.recomendacao === 'pgbl'
                    ? 'bg-blue-500/10 border border-blue-500'
                    : 'bg-green-500/10 border border-green-500'
                }`}>
                  <p className="font-medium mb-2">
                    {data.analise.recomendacao === 'pgbl' ? 'PGBL' : 'CDB'}
                  </p>
                  <p>{data.analise.justificativa}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}