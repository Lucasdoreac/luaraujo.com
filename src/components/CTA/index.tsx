import React from 'react';
import Link from 'next/link';

export function CTA() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para decolar rumo aos seus Objetivos? <i className="fas fa-chart-bar text-blue-600"></i>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Não espere mais! Comece a planejar seu futuro financeiro agora mesmo com nossas ferramentas.
          </p>
          <Link 
            href="/contato"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Entre em Contato <i className="fas fa-paper-plane ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}