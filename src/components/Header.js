import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <div>
        <h1>Expensify</h1>
        <NavLink exact to="/dashboard">
            Dashboard
        </NavLink>
        <NavLink to="/create">Create Expense</NavLink>
        <NavLink to="/help">Help</NavLink>
        <button onClick={startLogout}>Logout</button>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
