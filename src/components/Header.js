import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import './Header.sass';

const Header = () => {
    const [isHamburgerActive, setHeaderActive] = useState(false);

    return (
        <header data-active={isHamburgerActive} className='header'>
            <Link to="/"><h3>geek-game</h3></Link>
            <div className="hamgurger" onClick={() => setHeaderActive(!isHamburgerActive)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav>
                <NavHashLink to="/#game"><p>Gra</p></NavHashLink>
                <NavHashLink to="/#about"><p>O autorach</p></NavHashLink>
                <NavHashLink to="/#contact"><p>Kontakt</p></NavHashLink>
                <Link to="/auth"><p className='btn'>Panel</p></Link>
            </nav>
        </header>
    );
};

export default Header;
