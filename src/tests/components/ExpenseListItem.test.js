import React from 'react';
import { shallow } from 'enzyme';
import mockExpenses from '../mocks/expenses';
import ExpenseListItem from '../../components/ExpenseListItem';

test('should render with mock expenses', () => {
    const wrapper = shallow(<ExpenseListItem {...mockExpenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});
