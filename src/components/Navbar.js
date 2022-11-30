//all links go here to make a SPA application
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav id="navbar">
            <Link to="/" id="navbar-text">Home</Link>
            <Link to="/profile" id="navbar-text">Profile</Link>
            <Link to="/bakery" id="navbar-text">Bakery</Link>
            <Link to="/candy" id="navbar-text">Candy</Link>
            <Link to="/login" id="navbar-text">Login</Link>
                {/* - Possibly make a "Products" page with pages for both categories
                - also make a product link on the navbar with a dropdown bar showing candy/bakery */}

        </nav>
    )
};

export default Navbar;