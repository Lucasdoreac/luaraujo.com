import React from 'react';

export function Features() {
  const features = [
    {
      icon: 'shield-alt',
      title: 'Segurança Reforçada',
      description: 'Suas informações permanecem seguras no seu navegador.'
    },
    {
      icon: 'stopwatch',
      title: 'Resultados Imediatos',
      description: 'Cálculos precisos, sem enrolação, para você agir agora.'
    },
    {
      icon: 'laptop-code',
      title: 'Acessibilidade Total',
      description: 'Use em qualquer dispositivo, com a mesma experiência.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Recursos que Impulsionam suas Decisões <i className="fas fa-rocket text-blue-600"></i>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="mb-6">
                <i className={`fas fa-${feature.icon} text-4xl text-blue-600`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}