//this is where the Outlet and Navbar go
//this is where all outlet context go
import React, { useState, useEffect} from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate, useOutletContext} from "react-router-dom"


const Homepage = () => {
    const [bakery, setBakery] = useState ([])
    const [candy, setCandy] = useState ([])
    const [myProfile, setMyProfile] = useState({})
    const contextObject = {
        bakeryState: [bakery, setBakery],
        candyState:[candy, setCandy],
        profileState: [myProfile, setMyProfile]
    }
    const navigate = useNavigate()

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
    //     if(!localStorage.getItem("token")) {
    //         navigate('/login')
    //     }
    //         async function fetchProfileData() {
    //             try {
    //                 const response = await fetch('https://backend-sweet-spot.onrender.com/api/users/me',
    //                 {
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         "Authorization": `Bearer ${localStorage.getItem("token")}`
    //                     }
    //                 }
    //             );
    //             const data = await response.json();
    //             console.log("This is the profile data: ", data)
    //             setMyProfile(data)
    //             } catch (error) {
    //                 console.log(error);
    //             }
                
    //         }
    //         fetchProfileData();
    //     }, [])


    return (
        <div>
            
            <Navbar />
            <Outlet context={contextObject} />
        </div>
    )
}



export default Homepage;