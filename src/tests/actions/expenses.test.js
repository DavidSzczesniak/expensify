import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, editExpense, removeExpense, startAddExpense } from '../../actions/expenses';
import mockExpenses from '../mocks/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should setup Add Expense action object using provided values', () => {
    const action = addExpense(mockExpenses[0]);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: mockExpenses[0],
    });
});

test('should add expense to database and redux store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Cola',
        amount: 2000,
        note: '',
        createdAt: 1000,
    };

    store
        .dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData,
                },
            });
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
});

test('should add expense with defaults to database and redux store', (done) => {
    const store = createMockStore({});
    const defaultData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0,
    };

    store
        .dispatch(startAddExpense({}))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...defaultData,
                },
            });
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(defaultData);
            done();
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
