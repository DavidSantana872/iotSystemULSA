import React from "react";

const TargetCurrentData = ({value, title, arrayData}) => {
    return(
        <div className="target-current-data">
            <div>
                <p className="target-current-data-title">
                    {title}
                </p>
                <p className="target-current-data-value">
                    {value}
                </p>
                <div className="grafico-dts">

                </div>
            </div>
        </div>
    )
}
export default TargetCurrentData;