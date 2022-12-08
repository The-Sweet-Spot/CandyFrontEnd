//all links go here to make a SPA application
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({context}) => {
    return (
        <nav id="navbar">
            <Link to="/" id="navbar-text">Home</Link>
            <Link to="/profile" id="navbar-text">Profile</Link>
            <Link to="/bakery" id="navbar-text">Bakery</Link>
            <Link to="/candy" id="navbar-text">Candy</Link>
            <Link to="/login" id="navbar-text">Login</Link>
            <Link to ="/cart/:userId"><img src="https://www.creativefabrica.com/wp-content/uploads/2018/11/Shopping-bag-vector-logo-by-hartgraphic-580x386.jpg" id="cart-icon"></img></Link>
                {/* - Possibly make a "Products" page with pages for both categories
                - also make a product link on the navbar with a dropdown bar showing candy/bakery */}

        </nav>
    )
};

export default Navbar;