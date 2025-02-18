import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InvestmentForm } from './InvestmentForm';
import { InvestmentResults } from './InvestmentResults';
import { IInvestmentInput, IInvestmentResult } from '@/types/investment';
import { InvestmentCalculator } from '@/utils/investmentCalculator';

export function InvestmentSimulator() {
  const [results, setResults] = useState<IInvestmentResult | null>(null);

  const handleCalculate = (input: IInvestmentInput) => {
    const calculatedResults = InvestmentCalculator.calculate(input);
    setResults(calculatedResults);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Simulador de Investimentos</CardTitle>
        <CardDescription>
          Calcule o retorno dos seus investimentos com base em diferentes parâmetros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <InvestmentForm onCalculate={handleCalculate} />
          {results && <InvestmentResults results={results} />}
        </div>
      </CardContent>
    </Card>
  );
}
