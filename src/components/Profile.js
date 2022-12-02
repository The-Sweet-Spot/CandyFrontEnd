import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Profile = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem("token")) {
            navigate('/login')
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
                } catch (error) {
                    console.log(error);
                }
                
            }
            fetchProfileData();
    })
        
    
    function logOut(event) {
        localStorage.removeItem("token");
        navigate("/")
    }
    return(
        <div>
            <h3>Your Profile</h3>
            <p>Welcome Back!</p>
            <div>
                <button onClick={logOut}>Log Out</button>
            </div>
        </div>
    )
}
export default Profile