import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";

const Profile = () => {
    const [,,,,myProfile, setMyProfile] = useOutletContext()
    const navigate = useNavigate()

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
    //             setUsername(data)
    //             setMyProfile(data)
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
    console.log("this is my profile", myProfile)
    return (
        
        <div>
            <div>
            <h1>Your Profile</h1>
            <h3>Welcome Back!</h3>
            { 
            myProfile.user.username && myProfile.user.username.length ? 
            <h3>{myProfile.user.username}</h3> :
            <p>There is an error loading your things, I'm sowwy</p>
            } 
            </div>  
            <div>
                <button onClick={logOut}>Log Out</button>
            </div>
        </div>
    )
}
export default Profile
