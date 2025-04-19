import React, {useContext} from "react";
import { counterContext } from "../Context/counterContext";
const BtnOption = (props) => {

    const {setCurrentMetric} = useContext(counterContext)

    const propStyle = {
        'background': `linear-gradient(150deg, ${props.color1} 0%, ${props.color2} 100%)`,
        ...(props.text === "Temperatura" ? { width: "104px" } : {}),
    }

    const currentMetric = () => {
        if(props.text === "Ruido"){
            setCurrentMetric("Ruido Promedio")
        }else if(props.text === "Aire"){
            setCurrentMetric("Calidad Del Aire Promedio")
        }else if(props.text === "Temperatura"){
            setCurrentMetric("Temperatura")
        }
    }
    return(
        <button className="btn-option" style={propStyle} onClick={() => {
            currentMetric()
        }}>
            {
                props.text
            }
            <img src={props.img} alt="" width={props.widthImg} height={props.heightImg}/>
        </button>
    )
}
export default BtnOption 