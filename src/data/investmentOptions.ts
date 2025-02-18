import { IInvestmentOption } from '@/types/investment';

export const investmentOptions: IInvestmentOption[] = [
  {
    type: 'CDB',
    name: 'CDB Pós-fixado',
    riskLevel: 'Baixo',
    liquidity: 'Diária',
    minimumAmount: 1000,
    tax: 15,
    averageYearlyReturn: 13.5
  },
  {
    type: 'LCI',
    name: 'LCI',
    riskLevel: 'Baixo',
    liquidity: 'Mensal',
    minimumAmount: 5000,
    tax: 0,
    averageYearlyReturn: 12.5
  },
  {
    type: 'LCA',
    name: 'LCA',
    riskLevel: 'Baixo',
    liquidity: 'Mensal',
    minimumAmount: 5000,
    tax: 0,
    averageYearlyReturn: 12.3
  },
  {
    type: 'Tesouro',
    name: 'Tesouro IPCA+',
    riskLevel: 'Baixo',
    liquidity: 'Diária',
    minimumAmount: 100,
    tax: 15,
    averageYearlyReturn: 11.8
  },
  {
    type: 'Ações',
    name: 'Carteira de Ações',
    riskLevel: 'Alto',
    liquidity: 'Diária',
    minimumAmount: 100,
    tax: 15,
    averageYearlyReturn: 15.0
  },
  {
    type: 'FII',
    name: 'Fundos Imobiliários',
    riskLevel: 'Médio',
    liquidity: 'Diária',
    minimumAmount: 100,
    tax: 20,
    averageYearlyReturn: 14.2
  }
];