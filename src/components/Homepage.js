//this is where the Outlet and Navbar go
//this is where all outlet context go
import React, { useState, useEffect} from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate, useOutletContext} from "react-router-dom"


const Homepage = () => {
    const [bakery, setBakery] = useState ([])
    const [candy, setCandy] = useState ([])
    const [sweets, setSweets] = useState([])
    const [myProfile, setMyProfile] = useState({})
    const [myCart, setMyCart] = useState({})
    const contextObject = {
        bakeryState: [bakery, setBakery],
        candyState:[candy, setCandy],
        profileState: [myProfile, setMyProfile],
        cartState: [myCart, setMyCart],
        sweetsState: [sweets, setSweets]
    }
console.log("HI im from the homepage", myCart);

    const navigate = useNavigate()

    useEffect(() => {
        async function getAllSweets(){
            const sweetsFetch = await fetch(`https://backend-sweet-spot.onrender.com/api/sweets`,{
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            const pleaseFetch = await sweetsFetch.json();
            console.log("this is the fetch for sweets", pleaseFetch)

            const allBakedGoods = pleaseFetch.filter(oneSweet => {
                return oneSweet.departmentId === 1
            })
            const allCandyGoods = pleaseFetch.filter(oneSweet => {
                return oneSweet.departmentId === 2
            })
            console.log(pleaseFetch)
            console.log("both baked and candy", allBakedGoods, allCandyGoods)
            setBakery(allBakedGoods)
            setCandy(allCandyGoods)
        }
        getAllSweets()
    },[])

    useEffect(() => {
        console.log("Creating a cart")
        async function fetchingCart() {
            try {
                console.log("Start of create cart try block")
            const response = await fetch(`https://backend-sweet-spot.onrender.com/api/cart`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            
            })
            console.log("this is create cart response", response)
            // console.log("response", response)

            const data = await response.json()
            console.log("this is create cart data",data)
            setMyCart(data)
        } catch(error) {
            console.log(error)
        }

        }
        fetchingCart()
    }, []);

    // orderItems
    useEffect(() => {
        console.log("Start of my cart")
        async function fetchingMyCartItems() {
            try {
                console.log("Start of my cart try blcok")
            const response = await fetch(`https://backend-sweet-spot.onrender.com/api/cartitems/mycart`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            
            })
            console.log("this is the cart response", response)
            // console.log("response", response)

            const data = await response.json()
            console.log("this is the cart data",data)
            setMyCart(data)
        } catch(error) {
            console.error(error)
        }

        }
        fetchingMyCartItems()
    }, []);

    useEffect(() => {
        if(!localStorage.getItem("token")) {
            navigate("/login")
        }
            async function fetchProfileData() {
                try {
                    const response = await fetch('https://backend-sweet-spot.onrender.com/api/users/me',
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                console.log("this is response", response)
                const data = await response.json();
                console.log("This is the profile data: ", data)
                
                setMyProfile(data.user)
                } catch (error) {
                    console.log(error);
                }
                
            }
            fetchProfileData();
        }, [])


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
            
            <Navbar context={contextObject}/>
            <Outlet context={contextObject} />
        </div>
    )
}



export default Homepage;