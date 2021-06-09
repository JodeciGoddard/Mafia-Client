import React from 'react';
import '../css/Navbar.css';
import { HiMenuAlt2 } from 'react-icons/hi';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
    return (
        <div className="nav-container">
            <div className="nav-begin">
                <HiMenuAlt2 />
            </div>
            <div className="nav-end">
                <a href="#">Leader</a>
                <a href="#">Stats</a>
                <a href="#">Account</a>
                <FaUser />
            </div>
        </div>
    );
}

export default Navbar;