import React from "react";
import "./Live.css"
const Live = ({show}) => {
    return(
        show ? <div class="Live">
            <div class="Live2">
            </div>
            <div class="Live1">
            </div>
        </div> : null
    )
} 
export default Live;