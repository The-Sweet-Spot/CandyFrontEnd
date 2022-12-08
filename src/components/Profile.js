import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";

const Profile = () => {
    const { profileState: [myProfile, setMyProfile] } = useOutletContext();
    // const [myProfile, setMyProfile] = useState({})
    
    const navigate = useNavigate()

    // useEffect(() => {
    //     if(!localStorage.getItem("token")) {
    //         navigate("/login")
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
    //             console.log("this is response", response)
    //             const data = await response.json();
    //             console.log("This is the profile data: ", data)
                
    //             setMyProfile(data.user)
    //             } catch (error) {
    //                 console.log(error);
    //             }
                
    //         }
    //         fetchProfileData();
    //     }, [])
        
    
    function logOut(event) {
        localStorage.removeItem("token");
        navigate("/")
    }

    return (
        
        <div id="profile-container">
            { 
            myProfile.username && !!myProfile.username.length ? 
            <h3 id="profile-text">Welcome {myProfile.username}</h3>:
            <p>There is an error loading your things, I'm sowwy</p>
            } 
            <h4 id="profile-text2">Please explore our great selections of baked goods and candy</h4>
            <p id="profile-text2">And when you've had your fill, click the bag below to check out</p>
            <p><Link to ="/cart/:userId"><img src="https://www.creativefabrica.com/wp-content/uploads/2018/11/Shopping-bag-vector-logo-by-hartgraphic-580x386.jpg" id="cart-icon"></img></Link></p>
            {/* {
                myProfile.length ? myProfile.map((user, idx) => {
                    return <div key={idx} id="profile-text">
                        <p>Message: {user.username}</p>
                        </div>
                }) : <p>There are no messages!</p>
                
            } */}
            <div>
                <button onClick={logOut} id="logout">Log Out</button>
            </div>
        </div>
    )
}
export default Profile
