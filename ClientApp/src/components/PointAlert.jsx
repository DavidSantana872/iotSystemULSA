import React from "react"
import "./PointAlert.css"
const PointAlert = ({show, positionValue}) => {
    return(
        show == "true" ? <div class="point1" style = {(positionValue)}>
            <div class="point2">
                <div class="point3">
                </div>
            </div>
        </div> : null
    )
}
export default PointAlert;