import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../mocks/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render component correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render component with alt data correctly', () => {
    wrapper.setProps({ filters: altFilters });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const value = 'bread';
    wrapper.find('input').simulate('change', {
        target: {
            value,
        },
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should handle sort by date', () => {
    wrapper.setProps({ filters: altFilters });
    wrapper.find('select').simulate('change', {
        target: { value: 'date' },
    });
    expect(sortByDate).toHaveBeenCalled();
});

test('should handle sort by amount', () => {
    wrapper.setProps({ filters: altFilters });
    wrapper.find('select').simulate('change', {
        target: { value: 'amount' },
    });
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
    const startDate = altFilters.startDate;
    const endDate = altFilters.endDate;
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
    const focused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toEqual({ focused });
});
