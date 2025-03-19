import React from "react";

const TargetCurrentData = ({value, title, arrayData, id}) => {
    return(
        <div className="target-current-data" style={
            {
                backgroundImage : `./../resources/gif/${title}.gif`
            }
        }>
            <div>
                <div>
                    <p className="target-current-data-title">
                        {title}
                    </p>
                    <p className="target-current-data-value">
                        {value}
                    </p>
                    <div className="grafico-dts">
                        <div id={`container${id}`}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TargetCurrentData;