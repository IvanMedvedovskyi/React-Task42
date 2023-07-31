import {NavLink} from "react-router-dom";

const navLinks = ['Home', 'Popular', 'Battle'];

const Nav = () => (
        <ul className='nav'>
            {navLinks.map((navLink, index) => (
                <li key={index}>
                    <NavLink to={navLink === 'Home' ? '/' : navLink.toLowerCase()}>{navLink}</NavLink>
                </li>
            ))}
        </ul>
);


export default Nav;