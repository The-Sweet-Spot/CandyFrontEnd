import React, { useState, useEffect } from "react"
import { useOutletContext, useParams, Link, useNavigate } from "react-router-dom"
import CartItems from "./CartItems"
// import { FaBeer } from "react-icons/fa"
import addCartItemsToCart from "./addCartItemToCart"


const Cart = () => {
    const { cartState: [myCart, setMyCart] } = useOutletContext()
    const { profileState: [myProfile, setMyProfile] } = useOutletContext()
    const { cartItemsState: [myCartItems, setMyCartItems] } = useOutletContext()
    const [total, setTotal] = useState(0)
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
    function totalPriceOfYourCart(array) {
        let bucket = 0
        console.log("array", array)
        for(let i = 0; i < array.length; i++) {
            if(array[i].price_bought_at >= 0) {
                let priceNum = Number(array[i].price_bought_at)
                bucket += priceNum
                console.log(bucket)
            }
        }
        return bucket
    }
    useEffect(() => {
        let totalSum = totalPriceOfYourCart(myCartItems)
        setTotal(totalSum)
    }, [])

async function deleteCartItemsFromCart(cartItemsId) {
    try {
        const response = await fetch (`http://localhost:3001/api/cartitems/${cartItemsId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        const {success: [deletedItem, isDeleted]} = await response.json()
        if(isDeleted) {
            try {
                const response = await fetch(`http://localhost:3001/api/cart/myexsistingcart`, {
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
                
                    console.log("Start of my cart try blcok")
                const responseCartItems = await fetch(`http://localhost:3001/api/cartitems/mycartitems`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                
                })
                console.log("this is the cartitems response", responseCartItems)
                // console.log("response", response)
        
                const cartItemsData = await responseCartItems.json()
                console.log("this is the cart data",cartItemsData)
                setMyCartItems(cartItemsData)

                const cartData = await response.json()
                if(cartData) {
                setMyCart(cartData)
                navigate("/cart")
                }
            } catch (error) {
                console.log(error)
            }
        } else ({
            message: "Was no good, your an imposter"
        })
    

    } catch (error) {
        console.error(error)
    }

}

    return (
        <div id="cartitems-container">
            <h1 id="title">Cart</h1>
            { 
            myCartItems.length ? myCartItems.map((cartItems, idx) =>{
                return <div key={idx} id="cart-items-list">
                    <p id="cart-items"> {cartItems.sweetsName}</p>
                    <p id="cart-items">${cartItems.price}</p>
                    <img src={cartItems.image} id="cart-image"></img>
                    <br/>
                    <button onClick={(e) => {
                        e.preventDefault()
                        deleteCartItemsFromCart(cartItems.cartItemsId)}} id="cart-items-remove">Remove</button>
                    </div>
            }): <p>There is nothing in your Bag</p>
            } 
            <div id="cart-items2">Total: {total}</div>
            <div>
            <button id="checkout-button"><Link to="/cartcheckout">Checkout</Link></button>
            </div>
        </div>
    )
        
    
}



export default Cart
{/* <button onClick={(e) => {
                        e.preventDefault()
                        deleteCartItemsFromCart(items.cartItemsId)}}>Remove from cart</button> */}