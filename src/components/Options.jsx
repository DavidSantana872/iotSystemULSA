import React from "react";
import BtnOption from "./BtnOption"
import sound from "./../resources/icon/sound.png"
import oxigeno from "./../resources/icon/oxigeno.png"
import temperatura from "./../resources/icon/temperatura.png"
import oxigenoLeyenda from "./../resources/icon/oxigenoLeyenda.png"
import temperaturaLeyenda from "./../resources/icon/temperaturaLeyenda.png"
import sonidoLeyenda from "./../resources/icon/sonidoLeyenda.png"
import Live from "./Live";
const Options = () => {
    return(
        <section className="option-section">
            <h1>
                Parametros
                
                <span>
                    Mapa ULSA
                </span>
            </h1>
            <div className="option-section-btn">
                <BtnOption text="Ruido" widthImg="26" heightImg="20" img={sound} color1="rgb(0, 32, 202, 1)" color2="rgba(0, 50, 255, 0.24)"></BtnOption>
                <BtnOption text="Aire" widthImg="19" heightImg="14" img={oxigeno} color1="rgb(6, 184, 142, 1)" color2="rgba(6, 184, 142, 0.24)"></BtnOption>
                <BtnOption text="Temperatura" widthImg="15" heightImg="15" img={temperatura} color1="rgb(161, 6, 192, 1)" color2="rgba(213, 0, 255, 0.24)"></BtnOption>
        
            </div>
            <ul className="lista-leyenda">
                <li>
                    <img src={sonidoLeyenda} alt="" />Ambiente Silencioso
                </li>
                <li>
                    <img src={oxigenoLeyenda} alt="" />Calidad de aire excelente
                </li>
                <li>
                    <img src={temperaturaLeyenda} alt="" />Temperatura excelente
                </li>
                
              
            </ul>
        </section>
    )
}
export default Options;