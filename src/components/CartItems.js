import React, {useState, useEffect} from "react"
import { useOutletContext, useParams } from "react-router-dom"

const CartItems = () => {
    const { cartState: [myCart, setMyCart] } = useOutletContext()
    const { candyState: [candy, setCandy] } = useOutletContext()
    const { bakeryState: [bakery, setBakery] } = useOutletContext()
    const [cartItems, setCartItems] = useState({})
    const { cartId } = useParams()

    useEffect(() => {
        async function fetchCartItemsForCandy() {
            try {
            const response = await fetch(`https://backend-sweet-spot.onrender.com/api/cart/${cartId}/candy`, {
                method: POST,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    candyName: candy
                })
            })
            const data = response.json()
            setCartItems(data)
        } catch(error) {
            console.error(error)
        }
        }
        fetchCartItemsForCandy()
    }, [])
    useEffect(() => {
        async function fetchCartItemsForBakery() {
            try {
            const response = await fetch(`https://backend-sweet-spot.onrender.com/api/cart/${cartId}/baked`, {
                method: POST,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    bakedGoodsName: bakery
                })
            })
            const data = response.json()
            setCartItems(data)
        } catch (error) {
            console.error(error)
        }
        }
        fetchCartItemsForBakery()
    }, [])

    return (
        <div>
            <h1>Cart Items</h1>
            {
                cartItems.cartItemsId ? 
                <p>{cartId.cartItemsId.candy}</p>:
                <p>No items to show</p>
            },
            {
                cartItems.cartItemsId ? 
                <p>{cartId.cartItemsId.baked}</p>:
                <p>No items to show</p>
            }
        </div>
    )
}

export default CartItems
