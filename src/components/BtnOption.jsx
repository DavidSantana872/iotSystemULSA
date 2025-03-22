import React, {useContext} from "react";
import { counterContext } from "../Context/counterContext";
const BtnOption = (props) => {

    const {setCurrentMetric} = useContext(counterContext)

    const propStyle = {
        'background': `linear-gradient(150deg, ${props.color1} 0%, ${props.color2} 100%)`,
    }

    return(
        <button className="btn-option" style={propStyle} onClick={() => {
            setCurrentMetric(props.text)
        }}>
            {
                props.text
            }
            <img src={props.img} alt="" width={props.widthImg} height={props.heightImg}/>
        </button>
    )
}
export default BtnOption 