import uuid from 'uuid';
import database from '../firebase/firebase';

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense: expense,
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
        const newExpense = {
            description,
            note,
            amount,
            createdAt,
        };

        return database
            .ref(`users/${uid}/expenses`)
            .push(newExpense)
            .then((ref) => {
                dispatch(addExpense({ id: ref.key, ...newExpense }));
            });
    };
};

export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id,
});

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database
            .ref(`users/${uid}/expenses/${id}`)
            .remove()
            .then(() => {
                dispatch(removeExpense({ id }));
            });
    };
};

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates,
});

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database
            .ref(`users/${uid}/expenses/${id}`)
            .update(updates)
            .then(() => {
                dispatch(editExpense(id, updates));
            });
    };
};

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses,
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database
            .ref(`users/${uid}/expenses`)
            .once('value')
            .then((data) => {
                const dbExpenses = [];
                data.forEach((item) => {
                    dbExpenses.push({
                        id: item.key,
                        ...item.val(),
                    });
                });
                dispatch(setExpenses(dbExpenses));
            });
    };
};
