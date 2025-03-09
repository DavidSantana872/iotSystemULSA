import React from "react";
import "./style.css"
import "./script.js"
import salleImg from "./../../resources/img/salle.png"
const index =  () => {
    return(
       <div>
        <h1 class="ml5">
            <span class="text-wrapper">
                <span class="line line1"></span>
                <span class="letters letters-left">IOT</span>
                <span class="letters ampersand">-</span>
                <span class="letters letters-right">APP</span>
                <span class="line line2"></span>
            </span>
       </h1>
       <img className="img-start-app" src={salleImg} alt="" />
     
       </div>
    )
}

export default index;