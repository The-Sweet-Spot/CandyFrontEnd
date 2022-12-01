import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("token" || ""))
    
    
    useEffect(() => {
        if(isLogin) {
            navigate('/profile')
        }
    })

    function handleUsernameChange(event) {
        console.log(event.target.value);
        setUsername(event.target.value);
    }
    function handlePasswordChange(event) {
        console.log(event.target.value);
        setPassword(event.target.value);
    }

    useEffect(() => {
        if(localStorage.getItem("token")) {
            navigate('/profile')
        }
    })
    async function handleLoginInfo(event) {
        event.preventDefault()
        try {
            const response = await fetch(
                'https://backend-sweet-spot.onrender.com/api/users/login',
                {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify({
                       
                        username: username,
                        password: password
                        
                    })
                }
            )
            const data = await response.json();
            console.log("Request's returned promise: ", data.token);
            localStorage.setItem("token", data.token);
            const token = localStorage.getItem("token")
            if(token){
                setIsLogin(true)
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div> 
            <div id="login-form">
            <h1 id="login">Login</h1>
            <br/>
            <form onSubmit={handleLoginInfo} id="login2">
                <label id="login-text">Username:</label>
                <input type="text" value={username} onChange={handleUsernameChange} id="login-text"></input>
                <br/>
                <label id="login-text">Password:</label>
                <input type="text" value={password} onChange={handlePasswordChange} id="login-text"></input>
                <br/>
                <button type="submit" id="login-button">Login</button>
            </form>
            <p>Don't have a login? <Link to ="/register"> Register Here!</Link></p>
            </div>
        </div>
    )
}

export default Login