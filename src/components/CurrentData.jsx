import React, { useContext, useEffect, useState } from "react";
import "./CurrentData.css";
import "./MainView.css";
import TargetCurrentData from "./TargetCurrentData";
import iconTemperatura from "./../resources/icon/temperatura.png";
import iconOxigeno from "./../resources/icon/oxigeno.png";
import iconSound from "./../resources/icon/sound.png";
import { counterContext } from "./../Context/counterContext";
import Live from "./Live.jsx";
import anime from "animejs";
import { TIME_POLLING, BASE_URL } from "./../utils/constants.js";

const CurrentData = () => {
    const { showDetails, setShowDetails, currentMetric, metricsAll } = useContext(counterContext);

    const [data, setData] = useState('');
    const [metricsDts, setMetricsDts] = useState([]);
    const [intervalId, setIntervalId] = useState(null); // Para guardar el intervalo
    useEffect(() => {
        if (showDetails) {
            if(metricsAll[showDetails]){

            }else{
                setShowDetails(false);
                return;
            }
            setData(metricsAll[showDetails]);
        }

       
    }, [showDetails, metricsAll]); // Dependencias ajustadas para el cambio de showDetails

    const getData = async () => {
        fetch(`${BASE_URL}/metrics/sector/${showDetails}`)
        .then((response) => response.json())
        .then((data) => {
            setMetricsDts(data)
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }
    useEffect(() => {
        console.log(showDetails)
        if(showDetails && metricsAll[showDetails]){
            getData();
            const interval = setInterval(() => {
               getData()
            }, TIME_POLLING);

            setIntervalId(interval); // Guardar el ID del intervalo
        }
    }, [showDetails])

    const icon = () => {
        if (currentMetric === "Oxigeno") {
            return iconOxigeno;
        } else if (currentMetric === "Sonido") {
            return iconSound;
        } else {
            return iconTemperatura;
        }
    };

    return (
        showDetails && data ? (
            <section className="current-data">
                <div>
                    <div className="current-data-header">
                        <Live show={data.monitoringStations.status === "ONLINE"} />
                        <p className="title-current-data-header">
                            Última actualización {data.data[0].metricData.registrationDate}
                        </p>
                        <button
                            onClick={() => {
                                

                                anime({
                                    targets: ".current-data",
                                    translateY: '550px', // Desplaza el componente hacia abajo fuera de la vista
                                    duration: 900,
                                    easing: 'easeOutQuad',
                                    complete: () => {
                                        setShowDetails(false); // Cambia el estado solo después de completar la animación.
                                    }
                                });
                                clearInterval(intervalId); // Limpiar el intervalo
                            }}
                            id="btn-close-current-data"
                        >
                            x
                        </button>
                    </div>
                    <p className="title-current-data-sector">
                        {showDetails} ULSA
                    </p>
                    <div className="selected-current-data">
                        <div style={{ top: "-20px", position: "relative" }}>
                            <p>
                                <img className="icon-current-data" src={icon()} alt="icon" />
                                {currentMetric}
                            </p>
                        </div>
                        <div className="value-current-data">
                            <p>
                                {data.data.map((element, index) => (
                                    currentMetric === element.title ? element.metricData.value : null
                                ))}
                            </p>
                        </div>
                    </div>
                    <div className="slider-dts">
                        <div>
                            {metricsDts.map((element, index) => (
                                currentMetric !== element.name && element.data !== null && element.data.length > 0 && !(element.name.includes("Mínimo")) && !(element.name.includes("Máximo")) && !(element.name.includes("Mínima")) && !(element.name.includes("Máxima")) ? (
                                    <TargetCurrentData key={index + element.name} id={index} title={element.name} value={element.data[0].value.toFixed(1)} dataGraph = {element.data} lastData = {data.data}/>
                                ) : null
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        ) : null
    );
};

export default CurrentData;
