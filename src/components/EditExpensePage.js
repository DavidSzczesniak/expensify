import React from 'react';
import { connect } from 'react-redux';
import { editExpense, startRemoveExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export const EditExpensePage = ({ expense, history, editExpense, startRemoveExpense }) => (
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
                startRemoveExpense({ id: expense.id });
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
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
