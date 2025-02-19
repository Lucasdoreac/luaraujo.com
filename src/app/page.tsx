import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Hub Financeiro</h1>
        <p className="text-lg mb-8">
          Explore nossas ferramentas de simulação financeira.
        </p>
        
        <div className="grid gap-4">
          <Link 
            href="/simulador"
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            Ir para Simulador
          </Link>
          
          <Link 
            href="/simulador/educacional"
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            Simulador Educacional
          </Link>
        </div>
      </div>
    </div>
  );
}