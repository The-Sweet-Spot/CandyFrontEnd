//this is where the Outlet and Navbar go
//this is where all outlet context go
import React, { useState, useEffect} from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom"


const Homepage = () => {
    return (
        <div>
            <h2>Welcome</h2>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Homepage;