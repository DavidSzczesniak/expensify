export default (expenses) => {
    if (!expenses || !expenses.length) {
        return 0;
    }
    return expenses.map((expense) => expense.amount).reduce((a, b) => a + b);
};
