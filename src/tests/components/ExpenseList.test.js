import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import mockExpenses from '../mocks/expenses';

test('should render with mock expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={mockExpenses} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render with empty array', () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />);
    expect(wrapper).toMatchSnapshot();
});
