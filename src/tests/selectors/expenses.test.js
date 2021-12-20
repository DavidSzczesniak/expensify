import moment from 'moment';
import selectExpenses from '../../selectors/expenses';
import mockExpenses from '../mocks/expenses';

test('should filter by text value', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined,
    };
    const result = selectExpenses(mockExpenses, filters);

    expect(result).toEqual([mockExpenses[2], mockExpenses[1]]);
});

test('should filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined,
    };
    const result = selectExpenses(mockExpenses, filters);

    expect(result).toEqual([mockExpenses[2], mockExpenses[0]]);
});

test('should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0),
    };
    const result = selectExpenses(mockExpenses, filters);

    expect(result).toEqual([mockExpenses[0], mockExpenses[1]]);
});

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined,
    };
    const result = selectExpenses(mockExpenses, filters);

    expect(result).toEqual([mockExpenses[2], mockExpenses[0], mockExpenses[1]]);
});

test('should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined,
    };
    const result = selectExpenses(mockExpenses, filters);

    expect(result).toEqual([mockExpenses[1], mockExpenses[2], mockExpenses[0]]);
});
