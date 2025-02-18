export interface IInvestmentInput {
  initialAmount: number;
  monthlyContribution: number;
  period: number; // em meses
  yearlyInterestRate: number;
  tax: number; // em porcentagem
}

export interface IInvestmentResult {
  totalInvested: number;
  grossAmount: number;
  netAmount: number;
  tax: number;
  monthlyResults: IMonthlyResult[];
}

export interface IMonthlyResult {
  month: number;
  investedAmount: number;
  grossAmount: number;
  netAmount: number;
  profit: number;
}

export type InvestmentType = 'CDB' | 'LCI' | 'LCA' | 'Tesouro' | 'Ações' | 'FII';

export interface IInvestmentOption {
  type: InvestmentType;
  name: string;
  riskLevel: 'Baixo' | 'Médio' | 'Alto';
  liquidity: 'Diária' | 'Mensal' | 'Anual';
  minimumAmount: number;
  tax: number;
  averageYearlyReturn: number;
}