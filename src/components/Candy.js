import { useEffect, useState } from "react";
import { useOutletContext, Link, NavLink } from "react-router-dom";
import CandyDetail from "./CandyDetail";

const Candy = () => {
    const [candy, setCandy] = useState ([])

    useEffect(() => {
        async function fetchCandy(){
            try{
                const fetchedCandy = await fetch(`https://backend-sweet-spot.onrender.com/api/candy`,
                {
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                })
                const translatedCandy = await fetchedCandy.json();
                    // console.log("Here's the translated json", translatedCandy)
                setCandy(translatedCandy);
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
                    <h4>Price: {indivCandy.price}</h4>
                    <Link to="CandyDetail"><button>View Item</button></Link>
                    <button><NavLink to="/candy:/id">View Item</NavLink></button>
                </div>
            )
        }) : <p>"We're all sold out of Candy, Whoopsy! "
                <br></br><br></br> NEW INVENTORY COMES IN DAILY... </p>
    )
};

export default Candy;