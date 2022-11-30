import React, { useEffect, useState } from "react";

const Bakery = () => {
    const [Bakery, setBakery] = useState ()

useEffect(() => {
    async function getAllBakedGoods(){
        const bakedFetch = await fetch(``,{
            header: {
                'Content-Type' : 'application/json'
            }
        })
        const pleaseFetch = await bakedFetch.json();
        console.log(pleaseFetch)
        setBakery(pleaseFetch)
    }
    getAllBakedGoods()
},[])
return(
    Bakery ? Bakery.map((indivBakery, idx) => {
        console.log ('bakery', indivBakery)
        return (
            
            <div className="Bakery" key={idx}>
                <h1>Bakery</h1>
            
            <div>
                <p>Image: {indivBakery.image}</p>
            </div>
                
            <div>
                <p>Name: {indivBakery.bakedGoodsName}</p>
            </div>
            </div>
            )
        }):<p>No data to show</p>
    )
}

export default Bakery