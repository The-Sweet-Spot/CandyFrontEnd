import React, { useState, useEffect} from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"

const BakeryDetail = () => {
    const {bakeryState: [bakery, setBakery]} = useOutletContext()
    const [moreBakeryDetail, setMoreBakeryDetail] = useState({})
    const navigate = useNavigate()
    const {sweetsId} = useParams()
    
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
                <img src={moreBakeryDetail.image} id="bakery-detail-image"></img>:
                <p>Description can not be viewed</p>
            }
        </div>
    )
}

export default BakeryDetail