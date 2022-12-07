import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom"; 

const CandyDetail = () => {
    // const [candy, setCandy] = useState([]);
    const [candyDetail, setCandyDetail] = useState({});
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


    return (
        <div id="candy-detail-container">
            {
                candyDetail.sweetsName ?
                <p id="candy-detail">{candyDetail.sweetsName}</p>:
                <p>Description can not be viewed</p>
            }
            {/* {
                <img src={indivCandy.image}></img>
            } */}
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
                {/* add to order button
                then refetch cart & order items*/}
        </div>
    )
}
   
export default CandyDetail;