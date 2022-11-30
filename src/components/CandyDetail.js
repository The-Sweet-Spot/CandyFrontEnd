import React from "react";
import { Link } from "react-router-dom"; 

const CandyDetail = (props) => {
    const candyData = props;
    
    return (
        <div>

            {/* Details for Each Candy Listing */}
            <h2>{candyData.candyId.candyName}</h2>
            <p>{candyData.candyId.candyDescription}</p>
            <p><strong>Price: </strong>{candyData.candyId.price}</p>

            {/* <div id="button-container">
                <button id="review-btn"><Link to={`/candy/${candyId}`}>Leave Review</Link></button>
            </div> */}
        </div>
    )
};

export default CandyDetail