import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const Bakery = () => {
    const { bakeryState: [bakery, setBakery] } = useOutletContext();

// useEffect(() => {
//     async function getAllBakedGoods(){
//         const bakedFetch = await fetch(`https://backend-sweet-spot.onrender.com/api/bakery`,{
//             headers: {
//                 'Content-Type' : 'application/json'
//             }
//         })
//         const pleaseFetch = await bakedFetch.json();
//         console.log(pleaseFetch)
//         setBakery(pleaseFetch)
//     }
//     getAllBakedGoods()
// },[])
return(
    
    bakery ? bakery.map((indivBakery,idx) => {
        return (
            
            <div key={idx} id="bakery-container">
            <h2 id="bakery-name">
                {indivBakery.bakedGoodsName}
            </h2>
            
            <div>
                <img src={indivBakery.image} id="bakery-image"></img>
            </div>
                
            <div>
                <button id="bakery-button">
                    <Link className="BakeryButton link" to={`/bakery/${indivBakery.bakedId}`}>View Item</Link>
                </button>
            </div>
            </div>
            
        )
    }) : "No bakery goods to display"
    
    )
}

export default Bakery