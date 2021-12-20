import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup Add Expense action object using provided values', () => {
    const mockData = {
        description: 'Rent',
        note: 'my note',
        amount: 100000,
        createdAt: 100,
    };
    const action = addExpense(mockData);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: { ...mockData, id: expect.any(String) },
    });
});

test('should setup Add Expense action object using defaults', () => {
    const action = addExpense();

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String),
        },
    });
});

test('should setup Remove Expense action object', () => {
    const action = removeExpense({ id: '123abc' });

    expect(action).toEqual({ type: 'REMOVE_EXPENSE', id: '123abc' });
});

test('should setup Edit Expense action object', () => {
    const action = editExpense('123abc', { note: 'New note' });

    expect(action).toEqual({ type: 'EDIT_EXPENSE', id: '123abc', updates: { note: 'New note' } });
});
