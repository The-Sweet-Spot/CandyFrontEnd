//this is where the Outlet and Navbar go
//this is where all outlet context go
import React, { useState, useEffect} from "react";
import Navbar from "./Navbar";
import { Outlet, useOutletContext} from "react-router-dom"


const Homepage = () => {
    const [bakery, setBakery] = useState ([])
    const [candy, setCandy] = useState ([])

    useEffect(() => {
        async function getAllBakedGoods(){
            const bakedFetch = await fetch(`https://backend-sweet-spot.onrender.com/api/bakery`,{
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            const pleaseFetch = await bakedFetch.json();
            console.log(pleaseFetch)
            setBakery(pleaseFetch)
        }
        getAllBakedGoods()
    },[])

    // useEffect(() => {
    //     async function getAllCandy(){
    //         const candyFetch = await fetch(`https://backend-sweet-spot.onrender.com/api/candy`,{
    //             headers: {
    //                 'Content-Type' : 'application/json'
    //             }
    //         })
    //         const pleaseFetchCandy = await candyFetch.json();
    //         console.log(pleaseFetchCandy)
    //         setCandy(pleaseFetchCandy)
    //     }
    //     getAllCandy()
    // },[])

    return (
        <div>
            
            <Navbar />
            <Outlet context={[bakery, setBakery, candy, setCandy]} />
        </div>
    )
}



export default Homepage;