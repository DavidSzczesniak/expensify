import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import mockExpenses from '../mocks/expenses';
import moment from 'moment';

test('should render component correctly', () => {
    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();
});

test('should render with given data', () => {
    const wrapper = shallow(<ExpenseForm expense={mockExpenses[0]} />);

    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('input').at(0).simulate('change', {
        target: {
            value,
        },
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set amount if valid input', () => {
    const value = '23.5';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('input').at(1).simulate('change', {
        target: {
            value,
        },
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
    const value = '42.699';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('input').at(1).simulate('change', {
        target: {
            value,
        },
    });
    expect(wrapper.state('amount')).toBe('');
});

test('should set note on textarea change', () => {
    const value = 'New note';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('textarea').at(0).simulate('change', {
        target: {
            value,
        },
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should call onSubmit prop on valid form submission', () => {
    const submitMock = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={mockExpenses[0]} onSubmit={submitMock} />);

    wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
    });
    expect(wrapper.state('error')).toBe('');
    expect(submitMock).toHaveBeenLastCalledWith({
        description: mockExpenses[0].description,
        amount: mockExpenses[0].amount,
        note: mockExpenses[0].note,
        createdAt: mockExpenses[0].createdAt,
    });
});

test('should set new date on date change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const now = moment();

    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toEqual(focused);
});
