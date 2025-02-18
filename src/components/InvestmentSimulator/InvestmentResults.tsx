import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IInvestmentResult } from '@/types/investment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface InvestmentResultsProps {
  results: IInvestmentResult;
}

export function InvestmentResults({ results }: InvestmentResultsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const resultCards = [
    {
      title: 'Total Investido',
      value: formatCurrency(results.totalInvested)
    },
    {
      title: 'Valor Bruto Final',
      value: formatCurrency(results.grossAmount)
    },
    {
      title: 'Valor Líquido Final',
      value: formatCurrency(results.netAmount)
    },
    {
      title: 'Imposto Total',
      value: formatCurrency(results.tax)
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {resultCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução do Investimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={results.monthlyResults}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  label={{ value: 'Meses', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  tickFormatter={(value) => formatCurrency(value)}
                  label={{
                    value: 'Valor (R$)',
                    angle: -90,
                    position: 'insideLeft',
                    offset: -5
                  }}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value)]}
                  labelFormatter={(label) => `Mês ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="investedAmount"
                  name="Valor Investido"
                  stroke="#8884d8"
                />
                <Line
                  type="monotone"
                  dataKey="grossAmount"
                  name="Valor Bruto"
                  stroke="#82ca9d"
                />
                <Line
                  type="monotone"
                  dataKey="netAmount"
                  name="Valor Líquido"
                  stroke="#ffc658"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}