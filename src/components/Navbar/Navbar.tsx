import React from 'react';
import { NavLink } from 'react-router-dom';
import n from './Navbar.module.css';

const Navbar = () => {
    return (
    <nav className={n.nav}>
        <div className={n.item}>
            <NavLink to="/users" activeClassName={n.activeLink}>Users</NavLink>
        </div>
    </nav>

    )
}

export default Navbar;