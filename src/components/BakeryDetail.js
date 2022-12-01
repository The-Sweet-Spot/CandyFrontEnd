import React, { useState, useEffect} from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"

const BakeryDetail = () => {
    const [bakery, setBakery] = useOutletContext()
    const [moreBakeryDetail, setMoreBakeryDetail] = useState({})
    const navigate = useNavigate()
    const {bakedId} = useParams()
    console.log(bakedId)
    console.log(bakery)

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
        <div>
            {
                moreBakeryDetail.bakedGoodsName ?
                <p id ="description">{moreBakeryDetail.bakedGoodsName}</p>:
                <p>Description can not be viewed</p>
            }
            {
                moreBakeryDetail.bakedDescription ?
                <p id="description">{moreBakeryDetail.bakedDescription}</p>:
                <p>Description can not be viewed</p>
            }
            {
                moreBakeryDetail.price ?
                <p id="description">{moreBakeryDetail.price}</p>:
                <p>Description can not be viewed</p>
            }
        </div>
    )
}

export default BakeryDetail