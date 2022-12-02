import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Profile = () => {
    const [username, setUsername] = useState("")
    const [myProfile, setMyProfile] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem("token")) {
            navigate('/login')
        }
            async function fetchProfileData(event) {
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
                setUsername(data)
                setMyProfile(data)
                } catch (error) {
                    console.log(error);
                }
                
            }
            fetchProfileData();
        }, [])
        
    
    function logOut(event) {
        localStorage.removeItem("token");
        navigate("/")
    }
    return (
        
        <div>
            <div>
            <h1>Your Profile</h1>
            <h3>Welcome Back!</h3>
            { 
            username.user.username ? 
            <h3>{username.user.username}</h3> :
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
// {
//     moreBakeryDetail.bakedDescription ?
//     <p id="bakery-details">{moreBakeryDetail.bakedDescription}</p>:
//     <p>Description can not be viewed</p>
// }