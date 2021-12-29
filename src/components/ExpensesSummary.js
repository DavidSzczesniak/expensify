import React from 'react';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
    const countWord = expenseCount === 1 ? 'expense' : 'expenses';
    const total = numeral(expensesTotal / 100).format('$0,0.00');

    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">
                    Viewing <span>{expenseCount}</span> {countWord} totalling <span>{total}</span>
                </h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">
                        Add Expense
                    </Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const selectedExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expenseCount: selectedExpenses.length,
        expensesTotal: getExpensesTotal(selectedExpenses),
    };
};

export default connect(mapStateToProps)(ExpensesSummary);
