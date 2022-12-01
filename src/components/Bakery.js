import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const Bakery = () => {
    const [bakery, setBakery] = useOutletContext()

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
            
            <div key={idx}>
                <h1>Bakery</h1>
            
           <div>
            <img src={indivBakery.image}></img>
           </div>
                
            <h3>
               Name: {indivBakery.bakedGoodsName}
            </h3>
            <div>
                <button>
                    <Link className="BakeryButton link" to={`/bakery/${indivBakery.bakedId}`}>Details</Link>
                </button>
            </div>
            </div>
        )
        }) : "No bakery goods to display"
    
    )
}

export default Bakery