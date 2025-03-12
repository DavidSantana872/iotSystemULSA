import React, { useEffect, useState } from "react";

import "./style.css";
import "./script.js";
import salleImg from "./../../resources/img/salle.png";
import Welcome from "./welcome.jsx";

const Index = () => {
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(true);
        }, 4200);

        // Limpiar el timeout si el componente se desmonta antes de que termine
        return () => clearTimeout(timer);
    }, []);

    function Animation() {
        return (
            <div>
                <h1 className="ml5">
                    <span className="text-wrapper">
                        <span className="line line1"></span>
                        <span className="letters letters-left">IOT</span>
                        <span className="letters ampersand">-</span>
                        <span className="letters letters-right">APP</span>
                        <span className="line line2"></span>
                    </span>
                </h1>
                <img className="img-start-app" src={salleImg} alt="Sala" />
            </div>
        );
    }

    return showWelcome ? <Welcome /> : <Animation />;
};

export default Index;
