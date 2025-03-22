import React, { useContext } from "react";
import "./CurrentData.css"
import "./MainView.css"
import TargetCurrentData from "./TargetCurrentData";
import iconCD from "./../resources/icon/temperatura.png"
import { counterContext } from "./../Context/counterContext";
import anime from "animejs";

const CurrentData = () => {
  

    const {showDetails, setShowDetails} = useContext(counterContext)
    return(
        showDetails ? 
        <section className="current-data" style={{}}>
           <div>
           <div className="current-data-header">
                <p className="title-current-data-header">Última actualización 12 Octubre 2024 12:00:00 AM</p>
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
                <div>
                    <p>
                    <img className="icon-current-data" src={iconCD}>
                    </img>
                        Temperatura
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
                        [
                            {
                                title: "Oxigeno",
                                value: "23%"
                            },
                            {
                                title: "Sonido",
                                value: "45%"
                            },
                            {
                                title: "Sensacion",
                                value: "23°"
                            }
                        ].map((element, index) => 
                            <TargetCurrentData key={index} id={index} title={element.title} value={element.value}></TargetCurrentData>
                        )
                    }
                </div>
            </div>
           </div>
        </section> : null
    )
}
export default CurrentData;