import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { useNavigate, useOutletContext } from "react-router-dom"


const CartCheckout = () => {
    // Shipping Form
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");  
    const [address, setAddress] = useState("");  

    function handleFirstName (event) {
        console.log(event.target.value)
        setFirstName(event.target.value); 
    }

    function handleLastName (event) {
        console.log(event.target.value)
        setLastName(event.target.value); 
    }

    function handleAddress (event) {
        console.log(event.target.value)
        setAddress(event.target.value); 
    }

    // Payment Form
    const [cardNumber, setCardNumber] = useState(0);  
    const [expiration, setExpiration] = useState("");  
    const [securityCode, setSecurityCode] = useState("");  
    const [billingAddress, setBillingAddress] = useState("");  

    const {profileState: [myProfile, setMyProfile]} = useOutletContext();

    function handleCardNumber(event) {
        
        console.log(event.target.value)
        setCardNumber(event.target.value)
    }

    function handleExpiration (event) {
        console.log(event.target.value)
        setExpiration(event.target.value); 
    }

    function handleSecurityCode (event) {
        console.log(event.target.value)
        setSecurityCode(event.target.value); 
    }

    function handleBillingAddress (event) {
        console.log(event.target.value)
        setBillingAddress(event.target.value); 
    }

        async function checkOut() {
            // event.preventDefault(); 
            if(cardNumber.length  === 16 && securityCode.length === 3 && new Date() < expiration) {
                try {
                    const responseForStatus = await fetch('https://backend-sweet-spot.onrender.com/api/cart/updateCart', {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify({
                            usersId: myProfile.id,
                            active: false
                        })
                    });
                    const responseForNewCart = await fetch(`https://backend-sweet-spot.onrender.com/api/cart/mycart`, {
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
            
                console.log("this was successfully checked out! but you are an imposter")
                
            } catch (error) {
                console.log(error); 
            }
        }
    }

    return (
        <div>
            {/* Shipping Form */}
            <h1>Verify Address Info</h1>
            <form onSubmit={checkOut}>
                <label>First Name: </label>
                <input type="text" value={firstName} onChange={handleFirstName}></input>

                <label>Last Name: </label>
                <input type="text" value={lastName} onChange={handleLastName}></input>

                <label>Address: </label>
                <input type="text" value={address} onChange={handleAddress}></input>
                
                <button type="submit">Next</button>

            </form>

            {/* Payment Form */}
            <h1>Add Payment Info</h1>
            <form onSubmit={checkOut}>
                <label>Card Number: </label>
                <input type="number" value={cardNumber} onChange={handleCardNumber}></input>

                <label>Expiration Date: </label>
                <input type="date" value={expiration} onChange={handleExpiration}></input>

                <label>Security Code: </label>
                <input type="number" value={securityCode} onChange={handleSecurityCode}></input>

                <label>Billing Address: </label>
                <input type="checkbox" value={billingAddress} onChange={handleBillingAddress}></input>
                
                <button type="submit">Next</button>

            </form>
        </div>
    )
}

export default CartCheckout;