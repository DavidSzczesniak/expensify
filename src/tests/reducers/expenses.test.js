import expensesReducer from '../../reducers/expenses';
import mockExpenses from '../mocks/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual([]);
});

test('should add new expense', () => {
    const expense = {
        id: '123abc',
        description: 'bread',
        note: '',
        amount: 200,
        createdAt: 10000,
    };
    const state = expensesReducer(mockExpenses, { type: 'ADD_EXPENSE', expense });

    expect(state).toEqual([...mockExpenses, expense]);
});

test('should remove expense by id', () => {
    const state = expensesReducer(mockExpenses, { type: 'REMOVE_EXPENSE', id: mockExpenses[0].id });

    expect(state).toEqual([mockExpenses[1], mockExpenses[2]]);
});

test('should not remove if id is not found', () => {
    const state = expensesReducer(mockExpenses, { type: 'REMOVE_EXPENSE', id: '-1' });

    expect(state).toEqual(mockExpenses);
});

test('should edit expense by id', () => {
    const amount = 250;
    const state = expensesReducer(mockExpenses, {
        type: 'EDIT_EXPENSE',
        id: mockExpenses[0].id,
        updates: {
            amount,
        },
    });

    expect(state[0].amount).toEqual(amount);
});

test('should not edit if id is not found', () => {
    const updates = {
        ...mockExpenses,
        description: 'Coffee',
    };
    const state = expensesReducer(mockExpenses, {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates,
    });

    expect(state).toEqual(mockExpenses);
});

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [mockExpenses[0]],
    };
    const state = expensesReducer(mockExpenses, action);

    expect(state).toEqual(action.expenses);
});
