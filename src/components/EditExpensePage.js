import React from 'react';
import { connect } from 'react-redux';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export const EditExpensePage = ({ expense, history, startEditExpense, startRemoveExpense }) => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Edit Expense</h1>
            </div>
        </div>
        <div className="content-container">
            <ExpenseForm
                onSubmit={(editedExpense) => {
                    startEditExpense(expense.id, editedExpense);
                    history.push('/');
                }}
                expense={expense}
            />
            <button
                className="button button--secondary"
                onClick={() => {
                    startRemoveExpense({ id: expense.id });
                    history.push('/');
                }}>
                Remove Expense
            </button>
        </div>
    </div>
);

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
