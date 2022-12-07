import React, { useState, useEffect} from "react"
import { useNavigate, useOutletContext, Link, useParams } from "react-router-dom"
import AddCartItemToCart from "./addCartItemToCart"

const BakeryDetail = () => {
    const {bakeryState: [bakery, setBakery]} = useOutletContext()
    const {profileState: [myProfile, setMyProfile]} = useOutletContext()
    const {cartState: [myCart, setMyCart]} = useOutletContext()


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
        header:{
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
            body: {
                cartId: myCart.cartId,
                usersId: myProfile.id,
                price_bought_at: moreBakeryDetail.price
            }
        })
        console.log ("DATATATAT 1", myProfile )
        console.log ("DATATATAT 2", myProfile.id )
        console.log ("DATATATAT 3", moreBakeryDetail.price )
        console.log ("DATATATAT 4", myCart )
        console.log("Hi")
        
        const translatedItemData = await addingItems.json();
        console.log("translated item data:", translatedItemData)
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
            <button onClick={addToCart }>Add To Cart</button>
            {/* <button onClick={() => handleClick(sweetsId, moreBakeryDetail.sweetsName)}>Add to Cart</button> */}
            
        </div>
    )
}

export default BakeryDetail