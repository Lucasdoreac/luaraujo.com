import { InvestmentCalculator } from '../investmentCalculator';
import { IInvestmentInput } from '@/types/investment';

describe('InvestmentCalculator', () => {
  const mockInput: IInvestmentInput = {
    initialAmount: 1000,
    monthlyContribution: 100,
    period: 12,
    yearlyInterestRate: 10,
    tax: 15
  };

  describe('calculate', () => {
    it('should calculate investment results correctly', () => {
      const results = InvestmentCalculator.calculate(mockInput);

      // Verifica se todos os campos esperados estão presentes
      expect(results).toHaveProperty('totalInvested');
      expect(results).toHaveProperty('grossAmount');
      expect(results).toHaveProperty('netAmount');
      expect(results).toHaveProperty('tax');
      expect(results).toHaveProperty('monthlyResults');

      // Verifica se o valor total investido está correto
      expect(results.totalInvested).toBe(2200); // 1000 + (100 * 12)

      // Verifica se os resultados mensais foram calculados corretamente
      expect(results.monthlyResults).toHaveLength(12);
      results.monthlyResults.forEach(result => {
        expect(result).toHaveProperty('month');
        expect(result).toHaveProperty('investedAmount');
        expect(result).toHaveProperty('grossAmount');
        expect(result).toHaveProperty('netAmount');
        expect(result).toHaveProperty('profit');
      });
    });

    it('should handle zero initial amount correctly', () => {
      const input = { ...mockInput, initialAmount: 0 };
      const results = InvestmentCalculator.calculate(input);

      expect(results.totalInvested).toBe(1200); // 0 + (100 * 12)
      expect(results.grossAmount).toBeGreaterThan(1200); // Deve ter algum rendimento
    });

    it('should handle zero monthly contribution correctly', () => {
      const input = { ...mockInput, monthlyContribution: 0 };
      const results = InvestmentCalculator.calculate(input);

      expect(results.totalInvested).toBe(1000); // Apenas o valor inicial
      expect(results.grossAmount).toBeGreaterThan(1000); // Deve ter algum rendimento
    });

    it('should handle zero interest rate correctly', () => {
      const input = { ...mockInput, yearlyInterestRate: 0 };
      const results = InvestmentCalculator.calculate(input);

      expect(results.totalInvested).toBe(2200);
      expect(results.grossAmount).toBe(2200); // Sem rendimentos
      expect(results.tax).toBe(0); // Sem imposto pois não houve lucro
    });

    it('should handle single month period correctly', () => {
      const input = { ...mockInput, period: 1 };
      const results = InvestmentCalculator.calculate(input);

      expect(results.monthlyResults).toHaveLength(1);
      expect(results.totalInvested).toBe(1100); // 1000 + 100
    });

    it('should calculate taxes correctly', () => {
      const results = InvestmentCalculator.calculate(mockInput);
      const profit = results.grossAmount - results.totalInvested;
      const expectedTax = profit * (mockInput.tax / 100);

      expect(results.tax).toBeCloseTo(expectedTax, 2);
      expect(results.netAmount).toBe(results.grossAmount - results.tax);
    });

    it('should handle large numbers correctly', () => {
      const input = {
        ...mockInput,
        initialAmount: 1000000,
        monthlyContribution: 10000,
        period: 120 // 10 anos
      };

      const results = InvestmentCalculator.calculate(input);
      
      expect(results.totalInvested).toBe(2200000); // 1000000 + (10000 * 120)
      expect(results.grossAmount).toBeGreaterThan(results.totalInvested);
      expect(results.netAmount).toBeLessThan(results.grossAmount);
    });
  });
});