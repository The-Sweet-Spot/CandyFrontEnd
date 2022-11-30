import React from "react";
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleUsernameChange(event) {
        console.log(event.target.value);
        setUsername(event.target.value);
    }
    function handlePasswordChange(event) {
        console.log(event.target.value);
        setPassword(event.target.value);
    }

    async function setRegisterInfo(event) {
        event.preventDefault()
        try {
            const response = await fetch(
                '',
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
            navigate("/Homepage")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div> 
            <div>
            <h1>Login</h1>
            <br/>
            <form onSubmit={setRegisterInfo}>
                <label>Username:</label><br/>
                <label>Password:</label>
                <Button type="submit">Login</Button>
            </form>
            <p>Don't have a login? <Link to ="Register"> Register Here!</Link></p>
            </div>
        </div>
    )
}

export default Login