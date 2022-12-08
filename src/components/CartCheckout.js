import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { useNavigate, useOutletContext } from "react-router-dom"


const CartCheckout = () => {
    // Shipping Form
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");  
    const [address, setAddress] = useState("");  
    const [cardNumber, setCardNumber] = useState("");  
    const [expiration, setExpiration] = useState("");  
    const [securityCode, setSecurityCode] = useState("");  
    const [billingAddress, setBillingAddress] = useState("");  
    const {cartState: [mycart, setMyCart]} = useOutletContext()
    const {profileState: [myProfile, setMyProfile]} = useOutletContext();
    const {cartItemsState: [myCartItems, setMyCartItems]} = useOutletContext()
    const navigate = useNavigate()



    function handleInputChange(event,setter) {
        console.log(event.target.value)
        setter(event.target.value); 
    }

        async function checkOut(event) {
            event.preventDefault(); 
            console.log("checkOut function")
            console.log("new date and expiration", Date.now(), Date.parse(expiration))
            if(cardNumber.length  === 16 && securityCode.length === 3 && Date.now() < Date.parse(expiration)) {
                console.log("this is starting the check out process")
                try {
                    const responseForStatus = await fetch('http://localhost:3001/api/cart/updateCart', {
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
                    const statusData = await responseForStatus.json()
                    console.log("status update", statusData)
                    
                    
                    const responseForNewCart = await fetch(`http://localhost:3001/api/cart/newusercart`, {
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
        
                    const newCartData = await responseForNewCart.json()
                    console.log("new cart", newCartData)
                console.log("this was successfully checked out! but you are an imposter")
                setMyCart(newCartData)
                setMyCartItems([])
                    navigate("/")
            } catch (error) {
                console.log(error); 
            }
        }
    }

    return (
        <div id="checkout-form-container">
            {/* Shipping Form */}
            <form onSubmit={(event) => {checkOut(event, setMyCart)}} id="checkout-form">
            <h1>Verify Address Info</h1>
                <label id="checkout">First Name: </label>
                <input type="text" value={firstName} onChange={(event) => {handleInputChange(event, setFirstName)}} id="checkout"></input>

                <label id="checkout">Last Name: </label>
                <input type="text" value={lastName} onChange={(event) => {handleInputChange(event, setLastName)}} id="checkout"></input>

                <label id="checkout">Address: </label>
                <input type="text" value={address} onChange={(event) => {handleInputChange(event, setAddress)}} id="checkout"></input>
                
                


            {/* Payment Form */}
            <h1>Add Payment Info</h1>

                <label id="checkout">Card Number: </label>
                <input type="text" value={cardNumber} onChange={(event) => {handleInputChange(event, setCardNumber)}} id="checkout"></input>

                <label id="checkout">Expiration Date: </label>
                <input type="date" value={expiration} onChange={(event) => {handleInputChange(event, setExpiration)}} id="checkout"></input>

                <label id="checkout">Security Code: </label>
                <input type="text" value={securityCode} onChange={(event) => {handleInputChange(event, setSecurityCode)}} id="checkout"></input>

                <label id="checkout">Billing Address: </label>
                <input type="checkbox" value={billingAddress} onChange={(event) => {handleInputChange(event, setBillingAddress)}} id="checkout"></input>
                
                <button type="submit" id="checkout">Enter</button>

            </form>
        </div>
    )
}

export default CartCheckout;