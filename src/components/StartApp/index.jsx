import React, { useEffect, useState } from "react";

import "./style.css";
import "./script.js";
import salleImg from "./../../resources/img/salle.png";
import Welcome from "./welcome.jsx";
import Loader from "../Loader /index.jsx";
import MoreInformation from "../MoreInformation.jsx";
const Index = () => {
    const [showWelcome, setShowWelcome] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(true);
        }, 4500);

        // Limpiar el timeout si el componente se desmonta antes de que termine
        return () => clearTimeout(timer);
    }, []);

    function Animation() {
        return (
            <div>
                <div className="loading-container">
                    <div className="loading-img-container">
                        <Loader></Loader>
                    </div>
                </div>
                <img className="img-start-app" src={salleImg} alt="Sala" style={{display: "none"}}/>
            </div>
        );
    }

    return showWelcome ? <MoreInformation/> : <MoreInformation/>;
};

export default Index;
