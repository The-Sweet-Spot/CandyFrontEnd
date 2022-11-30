import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

const CandyDetail = () => {
    const [candyDetails, setCandyDetails] = useState ([])
    const {id} = useParams ()

    useEffect(() => {
        async function fetchCandyId(){
            try{
                const fetchedCandy = await fetch(`https://backend-sweet-spot.onrender.com/api/candy/${id}`,
                {
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                })
                const translatedCandyId = await fetchedCandy.json();
                    // console.log("Here's the translated json", translatedCandyId)
                setCandy(translatedCandyId);
            } catch (error) {
                console.log(error);
            }
        }
            fetchCandyId();
    },[])

    
    return (

        candyDetails ? candyDetails.map((indivCandyDetail, idx) => {
            return(

                <div key={idx}>

                    <img src={indivCandyDetail.image}></img>

                    <h2>Name: {indivCandyDetail.candyName}</h2>
                    <h4>Price: {indivCandyDetail.price}</h4>
                </div>
            )
        }) : "We're all sold out of Candy, Whoopsy! "
    )
};


export default CandyDetail