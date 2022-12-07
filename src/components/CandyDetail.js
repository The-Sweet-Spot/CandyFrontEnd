import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom"; 

const CandyDetail = () => {
    // const [candy, setCandy] = useState([]);
    const [candyDetail, setCandyDetail] = useState({});
    const {cartState: [myCart, setMyCart]} = useOutletContext()
    const {profileState: [myProfile, setMyProfile]} = useOutletContext()
    const navigate = useNavigate();
    const { sweetsId } = useParams()
console.log("sweets id", sweetsId)
    useEffect(() => {
        async function fetchCandy(){
            try{
                const fetchedCandy = await fetch(`https://backend-sweet-spot.onrender.com/api/sweets/${sweetsId}`,
                {
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                })
                console.log("fetching candy", fetchedCandy)
                const translatedCandy = await fetchedCandy.json();
                    console.log("Here's the translated candy", translatedCandy)

                setCandyDetail(translatedCandy);
            } catch (error) {
                console.log(error);
            }
        }
            fetchCandy();
    },[])
    // const moreDetailedPost = postsOutletContext[0][candyId]
    // console.log(candy)
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
                    price_bought_at: candyDetail.price
                })
            })
    
            console.log ("DATATATAT 1", myProfile.id )
            console.log ("DATATATAT 2", myProfile.price )
            console.log ("DATATATAT 3", myCart )
    
            
            const translatedItemData = await addingItems.json();
            console.log("translated item data:", translatedItemData)
                // console.log("adding items:", addingItems)
            // return addingItems;
        } catch (error) {
            console.log(error)
                
        }
    }

    return (
        <div id="candy-detail-container">
            {
                candyDetail.sweetsName ?
                <p id="candy-detail">{candyDetail.sweetsName}</p>:
                <p>Description can not be viewed</p>
            }
            {
                candyDetail.description ?
                <p id="candy-detail">{candyDetail.description}</p>:
                <p>Description can not be viewed</p>
            }
            {
                candyDetail.price ?
                <p id="candy-detail">${candyDetail.price}</p>:
                <p>Description can not be viewed</p>
            }
            {
                candyDetail.image ?
                <img src={candyDetail.image} id="candy-detail-image"></img>:
                <p>Description can not be viewed</p>
            }
            <button onClick={addToCart}>Add To Cart</button>
        </div>
    )
}

export default CandyDetail;