import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom"; 

const CandyDetail = () => {
    const [candy, setCandy] = useOutletContext();
    const [candyDetail, setCandyDetail] = useState([]);
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
                const candyData = await fetchedCandy.json();
                    console.log("Here's the translated candy", candyData)

                setCandy(candyData);
            } catch (error) {
                console.log(error);
            }
        }
            fetchCandy();
    },[])
    // const moreDetailedPost = postsOutletContext[0][candyId]
    console.log(candy)


    return (
        <div>
            {
                candy[0].map((information, idx) => {
                    return
                    <div key={idx}>
                        <p>{information.name}</p>
                        <p>{information.candyDescription}</p>
                        <p>{information.price}</p>
                        <p>{information.image}</p>
                    </div>
                })

            }
            <Link to={`/reviews/${id}`}>Leave a Review</Link>
        </div>
    )
}

export default CandyDetail;