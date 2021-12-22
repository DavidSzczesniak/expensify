import React from 'react';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import { connect } from 'react-redux';
import numeral from 'numeral';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
    const countWord = expenseCount === 1 ? 'expense' : 'expenses';
    const total = numeral(expensesTotal / 100).format('$0,0.00');

    return (
        <div>
            <p>
                Viewing {expenseCount} {countWord} totalling {total}
            </p>
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
