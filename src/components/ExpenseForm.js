import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: '',
        };
    }
    render() {
        const { description, note, amount, createdAt, calendarFocused, error } = this.state;

        const handleDescriptionChange = (description) => {
            this.setState(() => ({ description }));
        };

        const handleNoteChange = (note) => {
            this.setState(() => ({ note }));
        };

        const handleDateChange = (createdAt) => {
            createdAt && this.setState(() => ({ createdAt }));
        };

        const handleFocusChange = ({ focused }) => {
            this.setState(() => ({ calendarFocused: focused }));
        };

        const handleAmountChange = (amount) => {
            if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
                this.setState(() => ({ amount }));
            }
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            if (!description || !amount) {
                this.setState(() => ({ error: 'Please provide a description and amount' }));
            } else {
                this.setState(() => ({ error: '' }));
                this.props.onSubmit({
                    description,
                    amount: parseFloat(amount, 10) * 100,
                    createdAt: createdAt.valueOf(),
                    note,
                });
            }
        };

        return (
            <div>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={description}
                        onChange={(e) => handleDescriptionChange(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                    />
                    <SingleDatePicker
                        date={createdAt}
                        onDateChange={handleDateChange}
                        focused={calendarFocused}
                        onFocusChange={handleFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        placeholder="Add a note (optional)"
                        value={note}
                        onChange={(e) => handleNoteChange(e.target.value)}
                    />
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}
