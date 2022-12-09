//this is where the Outlet and Navbar go
//this is where all outlet context go
import React, { useState, useEffect} from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate, useOutletContext, useParams} from "react-router-dom"


const Homepage = () => {
    const [bakery, setBakery] = useState ([])
    const [candy, setCandy] = useState ([])
    const [sweets, setSweets] = useState([])
    const [myProfile, setMyProfile] = useState({})
    const [myCart, setMyCart] = useState({})
    const [myCartItems, setMyCartItems] = useState([])
    const contextObject = {
        bakeryState: [bakery, setBakery],
        candyState:[candy, setCandy],
        profileState: [myProfile, setMyProfile],
        cartState: [myCart, setMyCart],
        sweetsState: [sweets, setSweets],
        cartItemsState: [myCartItems, setMyCartItems]
    }
    const navigate = useNavigate()

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

                const data = await response.json();
                console.log("This is the profile data: ", data)
                
                setMyProfile(data.user)
                console.log("line 47", myProfile)
                } catch (error) {
                    console.log(error);
                }
                
            }
            // async function fetchingCart() {
            //     try {
            //         console.log("this is my profile state", myProfile)
            //         const response = await fetch(`https://backend-sweet-spot.onrender.com/api/cart/${myProfile.id}`, {
            //             method: "POST",
            //             headers: {
            //                 "Content-Type": "application/json",
            //                 "Authorization": `Bearer ${localStorage.getItem("token")}`
            //             },
            //             body: JSON.stringify({
            //                 usersId: myProfile.id,
            //                 active: true
            //             })
                
            //         })
                    
            //         console.log("response", response)
    
            //         const data = await response.json()
            //         console.log("this is create cart data",data)
            //         setMyCart(data)
            //     } catch(error) {
            //         console.log(error)
            //     }
            // }
            console.log("now running fetch profile func")
            fetchProfileData();
            // console.log("now running fetching cart func")
            // fetchingCart();
        }, [])
    useEffect(() => {

        async function fetchingCart() {
            try {
                console.log("starting to run fetch cart")
                const response = await fetch(`https://backend-sweet-spot.onrender.com/api/cart/myexsistingcart`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        usersId: myProfile.id,
                        active: true
                    })
            
                })
                
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
            setBakery(allBakedGoods)
            setCandy(allCandyGoods)
        }
        getAllSweets()
    },[])

//     // orderItems
    // useEffect(() => {

    //     async function fetchingCart() {
    //         try {
                
    //             const response = await fetch(`https://backend-sweet-spot.onrender.com/api/cart/${myProfile.id}`, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${localStorage.getItem("token")}`
    //                 },
    //                 body: JSON.stringify({
    //                     usersId: myProfile.user.id,
    //                     active: true
    //                 })
            
    //             })
                
    //             // console.log("response", response)

    //             const data = await response.json()
    //             console.log("this is create cart data",data)
    //             setMyCart(data)
    //         } catch(error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchingCart()
    // }, []);

useEffect(() => {
    console.log("is use effect being trigger for cart items hook")
    async function fetchingMyCartItems() {
        try {
            console.log("Start of my cart try blcok")
        const response = await fetch(`https://backend-sweet-spot.onrender.com/api/cartitems/mycartitems`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        
        })
        console.log("this is the cartitems response", response)
        // console.log("response", response)

        const data = await response.json()
        console.log("this is the cart data",data)
        setMyCartItems(data)
    } catch(error) {
        console.error(error)
    }

    }
    fetchingMyCartItems()
    console.log("end of cart items hooks")
}, [])

  





    return (
        <div>
            
            <Navbar context={contextObject}/>
            <Outlet context={contextObject} />
        </div>
    )
}



export default Homepage;