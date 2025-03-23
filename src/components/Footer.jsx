import React, { useState } from "react";
import icon from "./../resources/icon/question-circle-fill.png"
import MoreInformation from "./MoreInformation";
const Footer = () => {
    const [moreInformation, setMoreInformation] = useState(false)
    const closeInformation = () => {
        setMoreInformation(false)
    }
    return(
        moreInformation ? <MoreInformation close={closeInformation}></MoreInformation> : 
        <footer onClick={() => {
            setMoreInformation(true)
        }}>
           <img width={"16"} height={"16"} src={icon} alt="" /> Más información
        </footer>
    )
}
export default Footer;