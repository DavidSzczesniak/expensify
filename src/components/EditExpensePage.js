import React from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export const EditExpensePage = ({ expense, history, editExpense, removeExpense }) => (
    <div>
        <ExpenseForm
            onSubmit={(editedExpense) => {
                editExpense(expense.id, editedExpense);
                history.push('/');
            }}
            expense={expense}
        />
        <button
            onClick={() => {
                removeExpense({ id: expense.id });
                history.push('/');
            }}>
            Remove
        </button>
    </div>
);

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense: (data) => dispatch(removeExpense(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
