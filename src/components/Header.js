import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <div>
        <h1>Expensify</h1>
        <NavLink exact to="/">
            Home
        </NavLink>
        <NavLink to="/create">Create Expense</NavLink>
        <NavLink to="/help">Help</NavLink>
    </div>
);

export default Header;
