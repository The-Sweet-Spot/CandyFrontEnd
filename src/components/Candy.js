import { useEffect, useState } from "react";
import { useOutletContext, Link, useNavigate, Outlet } from "react-router-dom";

const Candy = () => {
    const [candy, setCandy] = useState ([]);
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchCandy(){
            try{
                const fetchedCandy = await fetch(`https://backend-sweet-spot.onrender.com/api/candy`,
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

    // Search Bar
    {/* <Searchbar /> */}

    return (

        candy ? candy.map((indivCandy, idx) => {
            return(

                <div key={idx}>

                    <img src={indivCandy.image}></img>

                    <h2>Name: {indivCandy.candyName}</h2>
                    <div>
                        <button>
                            <Link to={`/candy/${indivCandy.candyId}`}>View Item</Link>
                        </button>
                    </div>
                </div>
            )
        }) : "No Candy to View" 
    )
};

export default Candy;