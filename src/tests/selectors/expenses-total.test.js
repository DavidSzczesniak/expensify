import getExpensesTotal from '../../selectors/expenses-total';
import mockExpenses from '../mocks/expenses';

test('should return 0 if no expenses', () => {
    const result = getExpensesTotal([]);
    expect(result).toBe(0);
});

test('should correctly add up single expense', () => {
    const result = getExpensesTotal([mockExpenses[0]]);
    expect(result).toBe(mockExpenses[0].amount);
});

test('should correctly add up multiple expenses', () => {
    const result = getExpensesTotal(mockExpenses);
    expect(result).toBe(mockExpenses[0].amount + mockExpenses[1].amount + mockExpenses[2].amount);
});
