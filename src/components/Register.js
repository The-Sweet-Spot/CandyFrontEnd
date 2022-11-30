import React from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = userNavigate();

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
                    password: password
                })
            })
            const data = await response.json()
            localStorage.setItem("token", data.token)
            console.log(data.token)
            console.log(data)

            navigate("/Homepage")
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
    return (
        <div>
            <div>
            <h1>Register</h1>
            </div>
        </div>
    )
}

export default Register