import React from 'react';
import h from './Header.module.css';

const Header = () => {
    return <header className={h.header}>
        <img src="" alt=""/>
        <div className={h.loginBlock}>
            <button>log out</button>
        </div>
        <div>Login</div>
    </header>
}
export default Header;