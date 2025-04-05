import React, { useContext, useEffect, useState } from "react";
import "./CurrentData.css"
import "./MainView.css"
import TargetCurrentData from "./TargetCurrentData";
import iconTemperatura from "./../resources/icon/temperatura.png"
import iconOxigeno from "./../resources/icon/oxigeno.png"
import iconSound from "./../resources/icon/sound.png"
import { counterContext } from "./../Context/counterContext";
import Live from "./Live.jsx"
import anime from "animejs";

const CurrentData = () => {
  
    const {showDetails, setShowDetails, currentMetric, metricsAll} = useContext(counterContext)
    
    const [data, setData] = useState('')
    useEffect(
        () => {
         /*   setData(
                metricsAll[showDetails]
            )*/
           if(showDetails){
                setData(metricsAll[showDetails])
                console.log("data", data)
           }
        }, [showDetails]
    )
    const icon = () => {
        if(currentMetric === "Oxigeno"){
            return iconOxigeno
        }else if (currentMetric === "Sonido"){
            return iconSound
        }else{
            return iconTemperatura
        }
    }
    return(
        showDetails && data ? 
        <section className="current-data" style={{}}>
           <div>
           <div className="current-data-header">
                <Live show={data.monitoringStations.status == "ONLINE" ? true : false}></Live><p className="title-current-data-header" >Última actualización {data.data[0].metricData.registrationDate}</p>
                <button onClick={() => {
                        anime({
                            targets: ".current-data",
                            translateY: '550px',  // Desplaza el componente hacia abajo fuera de la vista
                            duration: 900,
                            easing: 'easeOutQuad',

                            complete: () => {
                                setShowDetails(false);  // Cambia el estado solo después de completar la animación.
                            }
                        })
                    }} id="btn-close-current-data">
                        x
                </button>
            </div>
            <p className="title-current-data-sector">
                {showDetails} ULSA
            </p>
            <div className="selected-current-data">
                <div style={{top: "-20px",
  position: "relative"}}>
                    <p>
                    <img className="icon-current-data" src={icon()}>
                    </img>
                        {currentMetric}
                    </p>
                </div>
                <div className="value-current-data">
                    <p>
                    32°
                    </p>
                </div>
            </div>
            <div className="slider-dts">
                <div>
                    {
                        data.data.map((element, index) => 
                            currentMetric != element.title ? <TargetCurrentData key={index+element.name} id={index} title={element.name} value={element.metricData.value}></TargetCurrentData> : null
                        )
                    }
                </div>
            </div>
           </div>
        </section> : null
    )
}
export default CurrentData;