import React from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = ({ expense, dispatch, history, match }) => (
    <div>
        <ExpenseForm
            onSubmit={(expense) => {
                dispatch(editExpense(match.params.id, expense));
                history.push('/');
            }}
            expense={expense}
        />
        <button
            onClick={() => {
                dispatch(removeExpense({ id: match.params.id }));
                history.push('/');
            }}>
            Remove
        </button>
    </div>
);

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id),
    };
};

export default connect(mapStateToProps)(EditExpensePage);
