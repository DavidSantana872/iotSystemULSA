import React, { useEffect, useState } from "react";

import "./style.css";
import "./script.js";
import salleImg from "./../../resources/img/salle.png";
import loadingImg from "./../../resources/gif/loading.gif";
import Welcome from "./welcome.jsx";
const Index = () => {
    const [showWelcome, setShowWelcome] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(true);
        }, 3200);

        // Limpiar el timeout si el componente se desmonta antes de que termine
        return () => clearTimeout(timer);
    }, []);

    function Animation() {
        return (
            <div>
                <div className="loading-container">
                    <div className="loading-img-container">
                        <img className="loading-img" src={loadingImg} alt="Sala" />
                    </div>
                </div>
                <img className="img-start-app" src={salleImg} alt="Sala" style={{display: "none"}}/>
            </div>
        );
    }

    return showWelcome ? <Welcome /> : <Animation />;
};

export default Index;
