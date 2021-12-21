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

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null,
    };
    render() {
        const { filters, setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } =
            this.props;

        const handleTextChange = (e) => {
            setTextFilter(e.target.value);
        };

        const handleFilterSelect = (value) => {
            if (value === 'amount') {
                sortByAmount();
            } else if (value === 'date') {
                sortByDate();
            }
        };

        const handleDatesChange = ({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
        };

        const handleFocusChange = (calendarFocused) => {
            this.setState(() => ({ calendarFocused }));
        };

        return (
            <div>
                <input type="text" value={filters.text} onChange={handleTextChange} />
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

const mapStateToProps = (state) => ({
    filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
