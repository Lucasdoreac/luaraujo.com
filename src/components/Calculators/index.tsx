import React from 'react';
import Link from 'next/link';

export function Calculators() {
  const calculators = [
    {
      title: 'Simulador Educacional',
      description: 'Desvende os mistérios da renda fixa e CDI, com juros compostos e inflação na prática.',
      icon: 'chart-line',
      link: '/calculadoras/educacional',
      action: 'Acessar',
      footer: 'Entenda o Futuro'
    },
    {
      title: 'PGBL vs CDB',
      description: 'Compare PGBL e CDB e encontre o investimento perfeito para você, sem complicações.',
      icon: 'piggy-bank',
      link: '/calculadoras/pgbl-cdb',
      action: 'Comparar',
      footer: 'Compare e Decida'
    },
    {
      title: 'Simulador de Investimentos',
      description: 'Veja seu patrimônio crescer com aportes e juros. Planejar nunca foi tão fácil e estimulante.',
      icon: 'coins',
      link: '/calculadoras/investimentos',
      action: 'Simular',
      footer: 'Visualize seu Crescimento'
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Escolha seu Portal de Simulação <i className="fas fa-space-shuttle text-blue-600"></i>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {calculators.map((calc, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg transition-transform hover:scale-105">
              <div className="p-6">
                <div className="text-center mb-4">
                  <i className={`fas fa-${calc.icon} text-4xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">{calc.title}</h3>
                <p className="text-gray-600 mb-6">{calc.description}</p>
                <div className="text-center">
                  <Link 
                    href={calc.link}
                    className="inline-block px-6 py-2 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    {calc.action} <i className="fas fa-arrow-circle-right ml-2"></i>
                  </Link>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 rounded-b-lg">
                <p className="text-sm text-gray-500 text-center">{calc.footer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}