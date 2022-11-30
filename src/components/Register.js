import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const navigate = useNavigate();

    async function registerHandler(event){
        event.preventDefault();
        try {
            const response = await fetch('https://backend-sweet-spot.onrender.com/api/users/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email
                })
            })
            const data = await response.json()
            localStorage.setItem("token", data.token)
            console.log(data.token)
            console.log(data)

            navigate("/profile")
        } catch (error) {
            console.log(error)
        }
    }

    const changeUsername = (event) => {
        setUsername(event.target.value)
    }
    const changePassword = (event) => {
        setPassword(event.target.value)
    }
    const changeEmail = (event) => {
        setEmail(event.target.value)
    }
    return (
        <div>
            <div>
                <h1>Register</h1>
                <form onSubmit={registerHandler}>
                    <label>Enter New Username Here</label>
                    <input type="text" value={username} onChange={changeUsername}></input>
                    <br/><br/>
                    <label>Enter New Password Here</label>
                    <input type="text" value={password} onChange={changePassword}></input>
                    <br/><br/>
                    <label>Enter E-mail Here</label>
                    <input type="text" value={email} onChange={changeEmail}></input>
                    <br/><br/>
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Register