import React, { useState, useEffect } from "react"
import { useOutletContext, useParams, Link } from "react-router-dom"
import CartItems from "./CartItems"
// import { FaBeer } from "react-icons/fa"
import addCartItemsToCart from "./addCartItemToCart"


const Cart = () => {
    const { cartState: [myCart, setMyCart] } = useOutletContext()
    const { profileState: [myProfile, setMyProfile] } = useOutletContext()
    const { cartItemsState: [myCartItems, setMyCartItems] } = useOutletContext()


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
// async function deleteCartItemsFromCart(cartItemsId) {
//     try {
//         const response = await fetch (`https://backend-sweet-spot.onrender.com/api/cartitems/${cartItemsId}`, {
//             method: "DELETE",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem("token")}`
//             }
//         })
//         const data = await response.json()
//         setMyCartItems(myCartItems.filter((items) => {
//             return items.cartItemsId != cartItemsId
//         }))
//     } catch (error) {
//         console.error(error)
//     }

// }

    return (
        <div>
            <h1>Your Cart</h1>
            { 
            myCartItems.length ? myCartItems.map((cartItems, idx) =>{
                return <div key={idx}>
                    <p>Your items: {cartItems.cartItemsId}</p>
                    
                    </div>
            }): <p>There is an error loading your things, I'm sowwy</p>
            } 

            {/* Scratch */}
            <div>
            </div>


          
           

        </div>
    )
        
    
}



export default Cart
{/* <button onClick={(e) => {
                        e.preventDefault()
                        deleteCartItemsFromCart(items.cartItemsId)}}>Remove from cart</button> */}