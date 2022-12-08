import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';

const Register = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const {profileState: [myProfile, setMyProfile]} = useOutletContext()
    const {cartState: [myCart, setMyCart]} = useOutletContext()
    const navigate = useNavigate();

useEffect(() => {
    if(localStorage.getItem("token")) {
        navigate('/profile')
    }
})
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
            console.log("data token made",data.token)
            console.log("data made", data)
        
            const responseNewCart = await fetch(`https://backend-sweet-spot.onrender.com/api/cart/newusercart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    usersId: myProfile.id,
                    active: true
                })
        
            })
            console.log("new cart made")
            // console.log("response", response)

            const dataNewCart = await responseNewCart.json()
            console.log("this is create cart data",dataNewCart)
            setMyCart(dataNewCart)
            navigate("/profile")
        } catch (error) {
            console.log(error)
        }
    }
    
        // async function fetchingCart() {
        //     try {
                
        //         const response = await fetch(`https://backend-sweet-spot.onrender.com/api/cart/mycart`, {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 "Authorization": `Bearer ${localStorage.getItem("token")}`
        //             },
        //             body: JSON.stringify({
        //                 usersId: myProfile.id,
        //                 active: true
        //             })
            
        //         })
                
        //         // console.log("response", response)

        //         const data = await response.json()
        //         console.log("this is create cart data",data)
        //         setMyCart(data)
        //     } catch(error) {
        //         console.log(error)
        //     }
        //     fetchingCart()
        // };

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
            <div id="register-form">
                <h1 id="register">Register</h1>
                <form onSubmit={registerHandler} id="register2">
                    <label id="register-text">Enter New Username Here</label>
                    <input type="text" value={username} onChange={changeUsername} id="register-text"></input>
                    <br/><br/>
                    <label id="register-text">Enter New Password Here</label>
                    <input type="password" value={password} onChange={changePassword} id="register-text"></input>
                    <br/><br/>
                    <label id="register-text">Enter E-mail Here</label>
                    <input type="text" value={email} onChange={changeEmail} id="register-text"></input>
                    <br/><br/>
                    <button type='submit' id="register-button">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Register