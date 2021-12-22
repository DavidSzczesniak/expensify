import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render component correctly with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={9434} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render component correctly with 2 expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={2} expensesTotal={12343} />);
    expect(wrapper).toMatchSnapshot();
});
