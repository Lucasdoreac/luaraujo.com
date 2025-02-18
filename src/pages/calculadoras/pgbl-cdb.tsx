import React, { useState } from 'react';
import Head from 'next/head';
import { useTheme } from '@/contexts/ThemeContext';
import { Tooltip } from '@/components/Tooltip';
import { ConceptCard } from '@/components/Education/ConceptCard';
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
    // Basic validation
    if (!formData.rendaTributavel || !formData.prazo || !formData.taxaCDI) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const {
      rendaTributavel,
      contribuicaoAnual,
      aporteInicial,
      prazo,
      taxaCDI,
      taxaAdministracao,
      faixaIR
    } = formData;

    // Convert values to numbers
    const rendaAnual = parseFloat(rendaTributavel);
    const contribuicao = parseFloat(contribuicaoAnual) || rendaAnual * 0.12; // 12% da renda se não especificado
    const aporteIni = parseFloat(aporteInicial) || 0;
    const anos = parseInt(prazo);
    const cdiAnual = parseFloat(taxaCDI) / 100;
    const taxaAdmin = parseFloat(taxaAdministracao) / 100;
    const aliquotaIR = parseInt(faixaIR) / 100;

    // Initialize timeline
    let timeline: ResultData['timeline'] = [];
    let pgblSaldo = aporteIni;
    let cdbSaldo = aporteIni;
    let totalBeneficioFiscal = 0;

    // Calculate year by year
    for (let ano = 1; ano <= anos; ano++) {
      const beneficioFiscal = contribuicao * 0.275; // 27.5% IR
      totalBeneficioFiscal += beneficioFiscal;

      pgblSaldo = (pgblSaldo + contribuicao) * (1 + cdiAnual - taxaAdmin);
      cdbSaldo = (cdbSaldo + contribuicao) * (1 + cdiAnual);

      timeline.push({
        ano,
        pgbl: {
          aporte: contribuicao,
          saldo: pgblSaldo,
          beneficioFiscal
        },
        cdb: {
          aporte: contribuicao,
          saldo: cdbSaldo
        }
      });
    }

    // Calculate final values
    const pgblIR = pgblSaldo * aliquotaIR;
    const pgblLiquido = pgblSaldo - pgblIR;
    const pgblTaxaAdmin = pgblSaldo * taxaAdmin * anos;

    const cdbRendimentos = cdbSaldo - aporteIni - (contribuicao * anos);
    const cdbIR = cdbRendimentos * (anos > 2 ? 0.15 : 0.225); // 15% após 2 anos
    const cdbLiquido = cdbSaldo - cdbIR;

    setResults({
      pgbl: {
        valorFinal: pgblSaldo,
        desembolsoEfetivo: aporteIni + (contribuicao * anos) - totalBeneficioFiscal,
        impostoRenda: pgblIR,
        valorLiquido: pgblLiquido,
        taxaAdministracao: pgblTaxaAdmin,
        rentabilidadeLiquida: (pgblLiquido / (aporteIni + contribuicao * anos) - 1) * 100
      },
      cdb: {
        valorFinal: cdbSaldo,
        desembolsoEfetivo: aporteIni + (contribuicao * anos),
        impostoRenda: cdbIR,
        valorLiquido: cdbLiquido,
        rentabilidadeLiquida: (cdbLiquido / (aporteIni + contribuicao * anos) - 1) * 100
      },
      analise: {
        diferencaLiquida: pgblLiquido - cdbLiquido,
        beneficioFiscal: totalBeneficioFiscal,
        taxaEquivalenteCDB: (cdbSaldo / pgblSaldo - 1) * 100,
        recomendacao: pgblLiquido > cdbLiquido ? 'pgbl' : 'cdb',
        justificativa: pgblLiquido > cdbLiquido
          ? 'O PGBL apresenta melhor resultado líquido, principalmente devido ao benefício fiscal.'
          : 'O CDB apresenta melhor resultado líquido, principalmente devido à menor tributação dos rendimentos.'
      },
      timeline
    });
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
            {/* Form fields will go here */}
          </div>

          {/* Results */}
          {results && (
            <div className={`rounded-lg shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              {/* Results display will go here */}
            </div>
          )}
        </div>
      </main>
    </>
  );
}