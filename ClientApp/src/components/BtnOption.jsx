import React from "react";

const BtnOption = (props) => {

    const propStyle = {
        'background': `linear-gradient(150deg, ${props.color1} 0%, ${props.color2} 100%)`,
    }

    return(
        <button className="btn-option" style={propStyle}>
            {
                props.text
            }
            <img src={props.img} alt="" width={props.widthImg} height={props.heightImg}/>
        </button>
    )
}
export default BtnOption 