import React from 'react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="hero-section py-5 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center lg:text-left lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Desvende o Potencial do Seu Dinheiro
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Explore ferramentas avançadas para simular investimentos, planejar seus objetivos financeiros e dominar o mundo das finanças.
            </p>
            <Link 
              href="/calculadoras/educacional" 
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Iniciar Simulação <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
          <div className="lg:w-1/2 hidden lg:block">
            <img 
              src="/images/finance-hero.svg" 
              alt="Finanças" 
              className="w-full max-w-xl mx-auto"
            />
          </div>
        </div>
      </div>
    </header>
  );
}