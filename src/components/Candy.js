import { useEffect, useState } from "react";
import { useOutletContext, Link, useNavigate, Outlet } from "react-router-dom";

const Candy = () => {
    const { candyState: [candy, setCandy] } = useOutletContext()
    const navigate = useNavigate();


    // useEffect(() => {
    //     async function fetchCandy(){
    //         try{
    //             const fetchedCandy = await fetch(`https://backend-sweet-spot.onrender.com/api/candy`,
    //             {
    //                 headers: {
    //                     'Content-Type' : 'application/json'
    //                 }
    //             })
    //             const candyData = await fetchedCandy.json();
    //                 console.log("Here's the translated candy", candyData)

    //             setCandy(candyData);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //         fetchCandy();
    // },[])

    // Search Bar
    {/* <Searchbar /> */}

    return (

        candy ? candy.map((indivCandy, idx) => {
            return(

                <div key={idx} id="candy-container">
                    <div>
                        <button id="candy-button">
                            <Link to={`/candy/${indivCandy.sweetsId}`}>View Item</Link>
                        </button>
                    </div>

                    <img src={indivCandy.image} id="candy-image"></img>

                    <h2 id="candy-name">{indivCandy.sweetsName}</h2>
                    {/* <div>
                        <button id="candy-button">
                            <Link to={`/candy/${indivCandy.candyId}`}>View Item</Link>
                        </button>
                    </div> */}
                </div>
            )
        }) : "No Candy to View" 
    )
};

export default Candy;