import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const Bakery = () => {
    const { sweetsState: [sweets, setSweets] } = useOutletContext();
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
    
    bakery ? bakery.map((indivSweets,idx) => {
        return (
            
            <div key={idx} id="bakery-container">
            <h2 id="bakery-name">
                {indivSweets.sweetsName}
            </h2>
            
            <div>
                <img src={indivSweets.image} id="bakery-image"></img>
            </div>
                
            <div>
                <button id="bakery-button">
                    <Link className="BakeryButton link" to={`/bakery/${indivSweets.sweetsId}`}>View Item</Link>
                </button>
            </div>
            </div>
            
        )
    }) : "No bakery goods to display"
    
    )
}

export default Bakery