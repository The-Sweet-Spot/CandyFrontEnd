import React, { useEffect, useState }from "react";

const BakeryDetail = () => {
     const [BakeryDetail, setBakeryDetail] = useState ()

useEffect (() => {
    async function getAllBakedGoodsById() {
        const bakedDetailFetch = await fetch(``, {
            header:{
                'Content-Type' : 'application/json'
            }
        })
        const detailBakeryFetch = await bakedDetailFetch.json();
        console.log(detailBakeryFetch)
        setBakeryDetail(detailBakeryFetch)
    }
    getAllBakedGoodsById()
}, [])
return (
    BakeryDetail ? BakeryDetail.map((indivBakeryDetail, idx) => {
        console.log('bakeryDetail', indivBakeryDetail)
        return (
            <div>
                <h1>Bakery Detail</h1>
            
            <div>
                <p>Price: {indivBakeryDetail.price}</p>
            </div>

            <div>
                <p>Description: {indivBakeryDetail.bakedDescription}</p>
            </div>

            <div>
                <p>Stock: {indivBakeryDetail.stock}</p>
            </div>
        </div>
            )
        }):<p>No data to show</p>
    )
}

export default BakeryDetail