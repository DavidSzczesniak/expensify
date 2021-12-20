import React from 'react';
import { DateRangePicker } from 'react-dates';
import { connect } from 'react-redux';
import {
    setEndDate,
    setStartDate,
    setTextFilter,
    sortByAmount,
    sortByDate,
} from '../actions/filters';

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null,
    };
    render() {
        const { filters, dispatch } = this.props;

        const handleFilterSelect = (value) => {
            if (value === 'amount') {
                dispatch(sortByAmount());
            } else if (value === 'date') {
                dispatch(sortByDate());
            }
        };

        const handleDatesChange = ({ startDate, endDate }) => {
            dispatch(setStartDate(startDate));
            dispatch(setEndDate(endDate));
        };

        const handleFocusChange = (calendarFocused) => {
            this.setState(() => ({ calendarFocused }));
        };

        return (
            <div>
                <input
                    type="text"
                    value={filters.text}
                    onChange={(e) => dispatch(setTextFilter(e.target.value))}
                />
                <select value={filters.sortBy} onChange={(e) => handleFilterSelect(e.target.value)}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={filters.startDate}
                    endDate={filters.endDate}
                    onDatesChange={handleDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={handleFocusChange}
                    showClearDates
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);
