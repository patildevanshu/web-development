import { useState } from "react";



export default function LikeButton(){
    let [isLiked , setIsLiked] = useState(false);
    let toggleLike = () => {
        setIsLiked(!isLiked);
        console.log("Liked : " + isLiked);  // for debugging purpose only. Remove in production code.  // TODO: Add some functionality to save the liked status to a backend.  // TODO: Add some animation for the heart icon to show the liking process.  // TODO: Add some feedback to the user when the like/unlike action is successful.  // TODO: Add some error handling for cases where the backend request fails.  // TODO: Implement some caching mechanism to reduce the number of backend requests.  // TODO: Add some localization support for the like/unlike text.  // TODO: Add some tests to ensure the functionality works as expected.  // TODO: Add some accessibility features for screen readers.  // TODO: Add some performance optimizations.  // TODO: Add some security measures to protect the backend from potential attacks.  // TODO: Add some monitoring and logging for debugging
        
    }
    

    let likeStyle = {
        color : "red",
    }
    
    return (
        <div>
            <p onClick={toggleLike} >{isLiked ? <i className="fa-solid fa-heart" style={likeStyle}></i> : <i className="fa-regular fa-heart"></i> }</p>
            
        </div>
    )
}