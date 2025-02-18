import { IInvestmentInput, IInvestmentResult, IMonthlyResult } from '../types/investment';

export class InvestmentCalculator {
  private static calculateMonthlyInterestRate(yearlyRate: number): number {
    return Math.pow(1 + yearlyRate / 100, 1/12) - 1;
  }

  public static calculate(input: IInvestmentInput): IInvestmentResult {
    const monthlyRate = this.calculateMonthlyInterestRate(input.yearlyInterestRate);
    const monthlyResults: IMonthlyResult[] = [];
    let currentAmount = input.initialAmount;

    for (let month = 1; month <= input.period; month++) {
      currentAmount = (currentAmount + input.monthlyContribution) * (1 + monthlyRate);
      const investedAmount = input.initialAmount + (input.monthlyContribution * month);
      const profit = currentAmount - investedAmount;
      const taxAmount = profit * (input.tax / 100);

      monthlyResults.push({
        month,
        investedAmount,
        grossAmount: currentAmount,
        netAmount: currentAmount - taxAmount,
        profit
      });
    }

    const lastResult = monthlyResults[monthlyResults.length - 1];
    const totalProfit = lastResult.grossAmount - lastResult.investedAmount;
    const taxAmount = totalProfit * (input.tax / 100);

    return {
      totalInvested: lastResult.investedAmount,
      grossAmount: lastResult.grossAmount,
      netAmount: lastResult.grossAmount - taxAmount,
      tax: taxAmount,
      monthlyResults
    };
  }
}