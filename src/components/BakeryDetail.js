import React, { useState, useEffect} from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"

const BakeryDetail = () => {
    const {bakeryState: [bakery, setBakery]} = useOutletContext()
    const [moreBakeryDetail, setMoreBakeryDetail] = useState({})
    const navigate = useNavigate()
    const {bakedId} = useParams()
    console.log(bakedId)
    // console.log(bakery)

useEffect (() => {
        async function bakedDetailFetch(){
    const bakedDetailFetch = await fetch(`https://backend-sweet-spot.onrender.com/api/bakery/${bakedId}`, {
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

    return (
        <div id="bakery-detail-container">
            {
                moreBakeryDetail.bakedGoodsName ?
                <p id="bakery-details">{moreBakeryDetail.bakedGoodsName}</p>:
                <p>Description can not be viewed</p>
            }
            {
                moreBakeryDetail.bakedDescription ?
                <p id="bakery-details">{moreBakeryDetail.bakedDescription}</p>:
                <p>Description can not be viewed</p>
            }
            {
                moreBakeryDetail.price ?
                <p id="bakery-details">${moreBakeryDetail.price}</p>:
                <p>Description can not be viewed</p>
            }
        </div>
    )
}

export default BakeryDetail