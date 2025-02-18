import { Card } from '@/components/ui/card';

export default function SimuladorEducacionalPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Simulador Educacional</h1>
        <p className="text-gray-600 mb-8">
          Aprenda sobre juros compostos, CDI e inflação de forma prática.
        </p>

        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Calculadora de Juros Compostos</h2>
            <p className="text-gray-600 mb-4">
              Entenda como seus investimentos crescem ao longo do tempo com o poder dos juros compostos.
            </p>
            {/* Componente da calculadora será adicionado aqui */}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Simulador CDI</h2>
            <p className="text-gray-600 mb-4">
              Simule investimentos atrelados ao CDI e entenda como a taxa básica afeta seus rendimentos.
            </p>
            {/* Componente do simulador será adicionado aqui */}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Calculadora de Inflação</h2>
            <p className="text-gray-600 mb-4">
              Descubra o impacto da inflação no seu dinheiro e como se proteger.
            </p>
            {/* Componente da calculadora será adicionado aqui */}
          </Card>
        </div>
      </div>
    </div>
  );
}