import React, {useContext, useEffect} from "react";
import gifIot from "./../../resources/gif/iot-welcome.gif"
import anime from "animejs";
import { counterContext } from "../../Context/counterContext";
import {TIME_POLLING} from "./../../utils/constants.js"
const welcome = () => {

    const {setStationsOnline, stationsOnline} = useContext(counterContext)
    
    useEffect( () => {
        setInterval(
        () => {
            let api = "https://iotulsa.duckdns.org/api/stations"
            let data = fetch(api)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setStationsOnline(data)
            })
        }, TIME_POLLING)
    }, [])

    const {setShowApp} = useContext(counterContext)
    const changeComponent = () => {
        anime({
            targets: '.gif-iot',
            opacity: 0,
            duration:300,
        })
        anime({
            targets: '.info-box-welcome',
            opacity: 0,
            duration:300,
            complete: () => {
                document.getElementById("section-welcome").style.display = "none"
                setShowApp(true)
            }
           
        })
    }
    return(
       
        <section class="section-welcome" id="section-welcome">
            <div className="gif-box">
                <img class="gif-iot" src={gifIot} alt="" />
            </div>
            <div class="info-box-welcome">
                <div>
                    <p class="title">
                        Bienvenido
                        <br />
                    </p>
                    <p class="text">
                        Explora nuestro proyecto de monitoreo en tiempo real de áreas para estudio dentro de <b>ULSA</b>, desarrollado para el curso <b>Temas Selectos de Cibernética</b>
                    </p> 
                    <svg onClick={changeComponent} id="btn-go-app" width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="52" width="52" height="52" rx="26" transform="rotate(90 52 0)" fill="url(#paint0_linear_2_37155)"/>
                        <rect x="52" width="52" height="52" rx="26" transform="rotate(90 52 0)" fill="black" fill-opacity="0.2"/>
                        <path d="M27.5 14C27.5 13.1716 26.8284 12.5 26 12.5C25.1716 12.5 24.5 13.1716 24.5 14H27.5ZM24.9393 39.0607C25.5251 39.6464 26.4749 39.6464 27.0607 39.0607L36.6066 29.5147C37.1924 28.9289 37.1924 27.9792 36.6066 27.3934C36.0208 26.8076 35.0711 26.8076 34.4853 27.3934L26 35.8787L17.5147 27.3934C16.9289 26.8076 15.9792 26.8076 15.3934 27.3934C14.8076 27.9792 14.8076 28.9289 15.3934 29.5147L24.9393 39.0607ZM24.5 14V38H27.5V14H24.5Z" fill="#8B8B8B"/>
                        <defs>
                        <linearGradient id="paint0_linear_2_37155" x1="139.286" y1="-47.7675" x2="42.6012" y2="-43.298" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#D9D9D9" stop-opacity="0.44"/>
                        <stop offset="1" stop-color="#737373" stop-opacity="0"/>
                        </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>           
        </section>
    )
}

export default welcome;