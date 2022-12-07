import React, { useState, useEffect } from "react"
import { useOutletContext, useParams, Link, useNavigate } from "react-router-dom"
import CartItems from "./CartItems"
// import { FaBeer } from "react-icons/fa"
import addCartItemsToCart from "./addCartItemToCart"


const Cart = () => {
    const { cartState: [myCart, setMyCart] } = useOutletContext()
    const { profileState: [myProfile, setMyProfile] } = useOutletContext()
    const { cartItemsState: [myCartItems, setMyCartItems] } = useOutletContext()
    const navigate = useNavigate()


    // useEffect(() => {
    //     async function fetchingCart() {
    //         try {
    //         const response = await fetch(`https://backend-sweet-spot.onrender.com/api/cartitems/mycart`, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${localStorage.getItem("token")}`
    //             }
            
    //         })
    //         console.log("this is the cart response", response)
    //         // console.log("response", response)

    //         const data = await response.json()
    //         console.log("this is the cart data",data)
    //         setMyCart(data)
    //     } catch(error) {
    //         console.error(error)
    //     }

    //     }
    //     fetchingCart()
    // }, []);
async function deleteCartItemsFromCart(cartItemsId) {
    try {
        const response = await fetch (`https://backend-sweet-spot.onrender.com/api/cartitems/${cartItemsId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        const data = await response.json()
        console.log("this is data for delete", data)
        setMyCartItems(myCartItems.filter((items) => {
            return items._cartItemsId != cartItemsId
        }))
        navigate(`/cart`)
    } catch (error) {
        console.error(error)
    }

}

    return (
        <div id="cartitems-container">
            <h1>Your Cart</h1>
            { 
            myCartItems.length ? myCartItems.map((cartItems, idx) =>{
                return <div key={idx} id="cart-items-list">
                    <p id="cart-items"> {cartItems.sweetsName}</p>
                    <p id="cart-items">${cartItems.price}</p>
                    <img src={cartItems.image} id="cart-image"></img>
                    <br/>
                    <button onClick={(e) => {
                        e.preventDefault()
                        deleteCartItemsFromCart(cartItems.cartItemsId)}} id="cart-items">Remove from cart</button>
                    </div>
            }): <p>There is an error loading your things, I'm sowwy</p>
            } 
            {/* Scratch */}
            <div>
            <button><Link to="/cartcheckout">Checkout</Link></button>
            </div>
        </div>
    )
        
    
}



export default Cart
{/* <button onClick={(e) => {
                        e.preventDefault()
                        deleteCartItemsFromCart(items.cartItemsId)}}>Remove from cart</button> */}