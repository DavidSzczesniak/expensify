import moment from 'moment';
import {
    setEndDate,
    setStartDate,
    setTextFilter,
    sortByAmount,
    sortByDate,
} from '../../actions/filters';

test('should setup Set Text Filter action object using provided values', () => {
    const text = 'something';
    const action = setTextFilter(text);
    expect(action).toEqual({ type: 'SET_TEXT_FILTER', text });
});

test('should setup Set Text Filter action object using defaults', () => {
    expect(setTextFilter()).toEqual({ type: 'SET_TEXT_FILTER', text: '' });
});

test('should setup Sort By Amount action object', () => {
    expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });
});

test('should setup Sort By Date action object', () => {
    expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
});

test('should setup Set Start Date action object', () => {
    const action = setStartDate(moment(0));

    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0),
    });
});

test('should setup Set End Date action object', () => {
    const action = setEndDate(moment(0));

    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0),
    });
});
