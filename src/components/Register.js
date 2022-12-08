import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, redirect } from 'react-router-dom';

const Register = () => {
    const {profileState: [myProfile, setMyProfile]} = useOutletContext()
    const {cartState: [myCart, setMyCart]} = useOutletContext()
    const {cartItemsState: [myCartItems, setMyCartItems]} = useOutletContext()
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    

// useEffect(() => {
//     if(localStorage.getItem("token")) {
//         navigate('/profile')
//     }
// }, [])

async function registerHandler(event){
        event.preventDefault();
        async function registering() {
            
            try {
                const response = await fetch('http://localhost:3001/api/users/register', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        email: email
                    })
                })
                const data = await response.json()
                localStorage.setItem("token", data.token)
                console.log("data.token",data.token)
                console.log("data",data.newUserData.id)
                await setMyProfile(data.newUserData)
                console.log("this is my profile", myProfile)
        
                console.log("start of new cart function")
                console.log("this is token for new cart", localStorage.getItem("token"))
            const responseForNewCart = await fetch(`http://localhost:3001/api/cart/newusercart`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${data.token}`
                    },
                    body: JSON.stringify({
                        usersId: data.newUserData.id,
                        active: true
                    })
            
                })
                const dataForNewCart = await responseForNewCart.json()
                console.log("data for new cart", dataForNewCart )

                setMyCart(dataForNewCart)
            } catch (error) {
                console.log(error)
            }
        }  
        registering()
                    
        setMyCartItems([])
        navigate("/")

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