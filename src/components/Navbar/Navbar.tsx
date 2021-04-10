import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import n from './Navbar.module.css';
import {Button} from "@material-ui/core";

type PropsType = {
    setModal: (modal: boolean) => void
}

const Navbar = (props: PropsType) => {

    interface LocationState {
        from: {
            pathname: string;
        };
    }

    const location = useLocation<LocationState>();

    return (
        <nav className={n.nav}>
            <div className={n.item}>
                <NavLink to="/users" activeClassName={n.activeLink}>Users</NavLink>
                {
                    location.pathname === "/users" &&
                    <Button color="secondary"
                            onClick={() => {
                                props.setModal(true)
                            }}>Add User</Button>
                }
            </div>
        </nav>
    )
}

export default Navbar;