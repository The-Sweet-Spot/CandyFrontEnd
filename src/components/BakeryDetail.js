import React, { useState, useEffect} from "react"
import { useNavigate, useOutletContext, Link, useParams } from "react-router-dom"
import AddCartItemToCart from "./addCartItemToCart"

const BakeryDetail = () => {
    const {bakeryState: [bakery, setBakery]} = useOutletContext()
    const {profileState: [myProfile, setMyProfile]} = useOutletContext()
    const {cartState: [myCart, setMyCart]} = useOutletContext()
    const {cartItemsState: [myCartItems, setMyCartItems]} = useOutletContext()


    const [moreBakeryDetail, setMoreBakeryDetail] = useState({})
    const navigate = useNavigate()
    const {sweetsId} = useParams()

    console.log("My cart", myCart)

    console.log("sweets id:", sweetsId)
    // console.log("userId", usersId)
    // console.log("userId", price_bought_at)
    
    // console.log(bakery)

useEffect (() => {
    async function bakedDetailFetch(){
    const bakedDetailFetch = await fetch(`https://backend-sweet-spot.onrender.com/api/sweets/${sweetsId}`, {
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    const detailBakeryFetch = await bakedDetailFetch.json();
    console.log(detailBakeryFetch)
    setMoreBakeryDetail(detailBakeryFetch)
    }
    bakedDetailFetch()
}, [])

async function addToCart() {
    console.log("running at cart function:")
    try {

        console.log("Start of try")
        const addingItems = await fetch(`https://backend-sweet-spot.onrender.com/api/cartitems/add/${sweetsId}`,{
            method: "POST",
            headers:{
                'Content-Type' : 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                cartId: myCart.cartId,
                usersId: myProfile.id,
                price_bought_at: moreBakeryDetail.price
            })
        })
        const success = await addingItems.json()
        if(success) {
            try {
                const response = await fetch(`https://backend-sweet-spot.onrender.com/api/cart/myexsistingcart`, {
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
                const responseCartItems = await fetch(`https://backend-sweet-spot.onrender.com/api/cartitems/mycartitems`, {
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
                navigate("/bakery")
             
                
            }
            } catch (error) {
                console.log(error)
            }} else ({
                message: "No good imposter"
            })

        
            // console.log("adding items:", addingItems)
        // return addingItems;
    } catch (error) {
        console.log(error)
    }
}


    return (
        <div id="bakery-detail-container">
            {
                moreBakeryDetail.sweetsName ?
                <p id="bakery-details">{moreBakeryDetail.sweetsName}</p>:
                <p>Description can not be viewed</p>
            }
            {
                moreBakeryDetail.description ?
                <p id="bakery-details">{moreBakeryDetail.description}</p>:
                <p>Description can not be viewed</p>
            }
            {
                moreBakeryDetail.price ?
                <p id="bakery-details">${moreBakeryDetail.price}</p>:
                <p>Description can not be viewed</p>
            }
            {
                moreBakeryDetail.image ?
                <img src={moreBakeryDetail.image} id="bakery-detail-image" ></img>:
                <p>Description can not be viewed</p>
            }
            <button onClick={addToCart}>Add To Cart</button>
            {/* <button onClick={() => handleClick(sweetsId, moreBakeryDetail.sweetsName)}>Add to Cart</button> */}
            
        </div>
    )
}

export default BakeryDetail