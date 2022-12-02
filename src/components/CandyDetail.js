import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom"; 

const CandyDetail = () => {
    // const [candy, setCandy] = useState([]);
    const [candyDetail, setCandyDetail] = useState({});
    const navigate = useNavigate();
    const { candyId } = useParams()

    useEffect(() => {
        async function fetchCandy(){
            try{
                const fetchedCandy = await fetch(`https://backend-sweet-spot.onrender.com/api/candy/${candyId}`,
                {
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                })
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
                candyDetail.candyName ?
                <p id="candy-detail">{candyDetail.candyName}</p>:
                <p>Description can not be viewed</p>
            }
            {/* {
                <img src={indivCandy.image}></img>
            } */}
            {
                candyDetail.candyDescription ?
                <p id="candy-detail">{candyDetail.candyDescription}</p>:
                <p>Description can not be viewed</p>
            }
            {
                candyDetail.price ?
                <p id="candy-detail">${candyDetail.price}</p>:
                <p>Description can not be viewed</p>
            }
                {/* <Link to={`/reviews/${id}`}>Leave a Review</Link> */}
        </div>
    )
}
   
export default CandyDetail;