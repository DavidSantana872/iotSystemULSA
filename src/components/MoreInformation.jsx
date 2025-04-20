import React from "react";
import iconApp from "/iconApp.png"
import prototipo from "../assets/prototipo.gif";
import "./moreInformation.css";
const MoreInformation = ({close}) => {
    return (
        <section className="more-information">
            <div>
                <img width="64" src={iconApp} alt="" />
                <button onClick={close} className="close-btn" style={{
                    
                }}>
                    X
                </button>
                <div>
                
                <p class="title black-title">Espacios de Estudio ULSA</p>
                <p className="information">
                    Este proyecto se desarrolló con el objetivo de proporcionar a los estudiantes de la Universidad Tecnológica La Salle (ULSA) un entorno de estudio óptimo que fomente la estabilidad y el desarrollo académico. 
                    <br /><br />
                    Buscamos aprovechar las tecnologías disponibles para mejorar la experiencia de la comunidad estudiantil, facilitando el acceso a espacios adecuados para el aprendizaje.
                </p>
                
                <h3>
                    Estaciones 
                </h3>
                <p className="information">
                        A continuación, se presentan las estaciones de estudio que hemos ubicado en el campus de la ULSA. Cada estación está equipada con sensores que monitorean el entorno y proporcionan información en tiempo real sobre las condiciones de estudio.
                        <br />
                        <br />
                        <br />
                    </p>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                   
                <div className="prototipo-box">
                    <img id="prototipo" src={prototipo} alt="" />
                </div>
                </div>
               
                <h3>Importancia del Entorno de Estudio</h3>
                <p className="information">
                    Un ambiente de estudio adecuado es de suma importancia para la concentración y el rendimiento académico. Consideramos factores como:
                </p>
                <ul className="information">
                    <li>
                        <span>Sonido:</span> El ruido excesivo puede dificultar la concentración y aumentar el estrés. Un espacio tranquilo, con niveles de sonido controlados, favorece la atención y la retención de información.
                    </li>
                    <li>
                        <span>Calidad del Aire:</span> Un ambiente bien ventilado, con niveles óptimos de oxígeno, mejora la función cognitiva y reduce la fatiga. La falta de oxígeno puede causar somnolencia y dificultad para concentrarse.
                    </li>
                    <li>
                        <span>Temperatura:</span> La temperatura ideal para estudiar se sitúa entre 20°C y 24°C. Temperaturas extremas (frío o calor) pueden causar incomodidad, distracción y disminuir la productividad.
                    </li>
                </ul>
                <h3 className="x">Más Información Técnica</h3>
                <a href="https://github.com/DavidSantana872/iotSystemULSA-WebApp">
                    Si deseas conocer más detalles sobre la arquitectura, tecnologías y recursos utilizados en este proyecto, te invitamos a visitar nuestro repositorio público. Allí encontrarás toda la información técnica relevante.
                </a>
                <br />
                <br />
               
                <br />
               {/* <ul className="integrantes">
                    <li>Luz Argentina</li>
                    <li>Daniel Centeno</li>
                    <li>David Santana</li>
                </ul>*/}
                </div>
            </div>
        </section>
    );
};

export default MoreInformation;