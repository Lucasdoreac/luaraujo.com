import { InvestmentSimulator } from '@/components/InvestmentSimulator';

export const metadata = {
  title: 'Simulador de Investimentos | L.U. Araujo',
  description: 'Calcule o retorno dos seus investimentos com diferentes cenários e tipos de aplicações financeiras.',
};

export default function SimuladorPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Simulador de Investimentos</h1>
          <p className="text-lg text-muted-foreground">
            Descubra o potencial dos seus investimentos usando nossa calculadora interativa
          </p>
        </div>

        <InvestmentSimulator />

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Como usar o simulador</h2>
          <div className="space-y-4">
            <p>
              1. Selecione o tipo de investimento desejado (CDB, LCI, etc.)
            </p>
            <p>
              2. Informe o valor inicial que você pretende investir
            </p>
            <p>
              3. Defina o valor das contribuições mensais (aportes)
            </p>
            <p>
              4. Escolha o período do investimento em meses
            </p>
            <p>
              5. A taxa de juros será preenchida automaticamente com base no tipo de investimento, mas você pode ajustá-la
            </p>
            <p>
              6. Clique em "Calcular" para ver os resultados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}