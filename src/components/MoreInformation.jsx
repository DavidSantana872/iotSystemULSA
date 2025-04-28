import React, {useState} from "react";
import iconApp from "/iconApp.png"
import prototipo from "../assets/prototipo.gif";
import "./moreInformation.css";
const MoreInformation = ({close}) => {

    const [isValid, setIsValid] = useState(false);
    const [click, setClick] = useState(false);
    const validateId = () => {
        const key = document.getElementById("key").value;
        if (key === "") {
            alert("Por favor, inserta el ID del reporte");
            return;
        }
        let response = fetch(
            `https://iotulsa.duckdns.org/api/report/validate?key=${key}`
        )
            .then((res) => res.json())
            .then((response) => {
                if (response.isValid) {
                    setIsValid(true);
                } else {
                    setIsValid(false);
                }
            })
        
        setClick(true);
    }
    return (
        <section className="more-information">
            <div>
                <img width="64" src={iconApp} alt="App Icon" />
                <button onClick={close} className="close-btn">
                    X
                </button>
                <div>
                    <p className="title black-title">Espacios de Estudio ULSA</p>
                    <p className="information">
                        Este proyecto se desarrolló con el objetivo de proporcionar a los estudiantes de la Universidad Tecnológica La Salle (ULSA) un entorno de estudio óptimo que fomente la estabilidad y el desarrollo académico.
                        <br /><br />
                        Buscamos aprovechar las tecnologías disponibles para mejorar la experiencia de la comunidad estudiantil, facilitando el acceso a espacios adecuados para el aprendizaje.
                    </p>
                    
                    <h3>Estaciones</h3>
                    <p className="information">
                        A continuación, se presentan las estaciones de estudio que hemos ubicado en el campus de la ULSA. Cada estación está equipada con sensores que monitorean el entorno y proporcionan información en tiempo real sobre las condiciones de estudio.
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
                            <img id="prototipo" src={prototipo} alt="Prototipo" />
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
                    <a 
                        href="https://github.com/DavidSantana872/iotSystemULSA-WebApp" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Si deseas conocer más detalles sobre la arquitectura, tecnologías y recursos utilizados en este proyecto, te invitamos a visitar nuestro repositorio público. Allí encontrarás toda la información técnica relevante.
                    </a>
                </div>
            </div>
            <div>
                <p className="title black-title">Reportes PDF</p>
                <p className="information">
                    Inserta el id de tu reporte para validar que fue
                </p>
              
                <input 
                    type="text" 
                    placeholder="Ingresa el ID de tu reporte" 
                    className = { click ? isValid ? "valid" : "invalid" : ""}
                    id="key"
                    style={{
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        marginBottom: "16px",
                        marginTop: "16px",
                        width: "95%",
                        maxWidth: "400px",
                    }}
                />
                <p className="information">
                    {click ? isValid ? "El ID es válido. El reporte fue generado en esta plataforma." : "El ID no es válido." : ""}
                    
                </p>


                
                <button 
                    onClick={
                        validateId
                    }
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "16px",
                    }}
                >
                    Validar
                </button>
              
            </div>
        </section>
    );
};

export default MoreInformation;