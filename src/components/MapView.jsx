import React, {useContext, useEffect} from "react";
import campoBeisbol from "./../resources/img/sitesMap/campoBeisbol.svg"
import campoFutbol from "./../resources/img/sitesMap/campoFutbol.svg"
import Group16 from './../resources/img/sitesMap/Group 16.svg'
import Vector31 from './../resources/img/sitesMap/Vector 31.svg'
import Vector36 from './../resources/img/sitesMap/Vector 36.svg'
import Vector45 from './../resources/img/sitesMap/Vector 45.svg'
import Vector25 from './../resources/img/sitesMap/Vector 25.svg'
import Vector32 from './../resources/img/sitesMap/Vector 32.svg'
import Vector37 from './../resources/img/sitesMap/Vector 37.svg'
import Vector26 from './../resources/img/sitesMap/Vector 26.svg'
import Vector33 from './../resources/img/sitesMap/Vector 33.svg'
import Vector38 from './../resources/img/sitesMap/Vector 38.svg'
import Vector27 from './../resources/img/sitesMap/Vector 27.svg'
import Vector34 from './../resources/img/sitesMap/Vector 34.svg'
import Vector39 from './../resources/img/sitesMap/Vector 39.svg'
import Vector28 from './../resources/img/sitesMap/Vector 28.svg'
import Vector35 from './../resources/img/sitesMap/Vector 35.svg'
import Vector40 from './../resources/img/sitesMap/Vector 40.svg'
import eye from "./../resources/icon/eye.svg"
import { counterContext } from "./../Context/counterContext";
import CurrentData from "./CurrentData";
import PointAlert from "./PointAlert.jsx";
import Live from "./Live.jsx";
import anime from "animejs";
const MapView = () => {
    const {setShowDetails, currentMetric, stationsOnline} = useContext(counterContext)
    
    const detectStations = (sector) => {
        let found = false;
        for (const station of stationsOnline) {
            if (station.sector.name === sector) {
                found = true;
                break;
            }
        }
        return found;
    };
    const styleElement = (x, y) => {
        return{
            position: "absolute",
            top: `${y}px`,
            left: `${x}px`
        }
    }
    const showDeatilsFunction = (sector) => {
        setShowDetails(sector)
    }
    useEffect(() => {
        const animateScroll = () => {
            const TIME = 2300;
            anime({
                targets: '.box-map',
                scrollLeft: 1000,
                duration: TIME,
                easing: 'easeInOutQuad',
                complete: () => {
                    anime({
                        targets: '.box-map',
                        scrollLeft: 0,
                        duration: TIME,
                        easing: 'easeInOutQuad',
                        complete: () => {
                            anime({
                                targets: '.box-map',
                                scrollLeft: 430,
                                scrollTop: 50,
                                duration: TIME,
                                easing: 'easeInOutQuad',
                            })
                        }
                  });
                }
            });
        };

        animateScroll(); // Iniciar animación al montar el componente

        return () => anime.remove('.box-map'); // Limpieza al desmontar el componente
    }, []);
    return (
        <span>
            <section className="map" style={
            {
                width: 'min-content',
                position: 'relative'
            }}
        >
            <span onClick={()=>{showDeatilsFunction("Campo de futbol")}} style= {styleElement(209, 256)}>
                {
                    /*
                        top: 56px;
                        left: 200px;
                    */
                }
                 <div class="box-title-sector" style={styleElement(-14, 92)}>
                    <img class="opacity" src={eye} alt="Show!" />
                </div>
                <PointAlert show="true" metric={currentMetric} positionValue= {styleElement(200, 56)}></PointAlert>
                
                <img src={campoFutbol} alt="" />
            </span>
            <span onClick={()=>{showDeatilsFunction("Campo de beisbol")}} style = {styleElement(23, 342)}>
                <div class="box-title-sector" style={styleElement(-13, 116)}>
                    <img class="opacity" src={eye} alt="Show!" />
                </div>
                <PointAlert show="true" metric={currentMetric} positionValue= {styleElement(200, 56)}></PointAlert>
                <img src={campoBeisbol} alt="Campo de beislbol" />
            </span>
            <span onClick={()=>{showDeatilsFunction("Fuente ULSA")}} style = {styleElement(626.79, 173.69)}>
                <div class="box-title-sector" style={styleElement(-1, 1)}>
                    <p className="title-sector"><Live show={detectStations("Fuente ULSA")}></Live> Fuente ULSA</p>
                    <img class="opacity" src={eye} alt="Show!" />
                </div>
                <PointAlert show="true" metric={currentMetric} positionValue= {styleElement(-5, -30)}></PointAlert>
                <img src={Group16} alt="" />
            </span>
            <span onClick={()=>{showDeatilsFunction("Mesas Comedor")}} style = {styleElement(652, 223)}>
                <div class="box-title-sector" style={styleElement(-1, 8)}>
                    <p className="title-sector"><Live show={detectStations("Mesas Comedor")}></Live> Mesas Comedor</p>
                    <img class="opacity" src={eye} alt="Show!" />
                </div>
                <PointAlert show="true" metric={currentMetric} positionValue= {styleElement(0, -25)}></PointAlert>
                <img src={Vector31} alt="" />
            </span>
            <span onClick={()=>{}} style = {styleElement(417, 122)}>
                <img src={Vector36} alt="" />
            </span>
            <span onClick={()=>{}} style = {styleElement(808, 216.5)}>
                <img src={Vector45} alt="" />
            </span>
            <span onClick={()=>{}} style = {styleElement(505,135)}>
                <img src={Vector25} alt="" />
            </span>
            <span onClick={()=>{showDeatilsFunction("Kiosco D")}} style = {styleElement(753, 235.5)}>
                <div class="box-title-sector" style={styleElement(-1, 16)}>
                    <p className="title-sector"><Live show={detectStations("Kiosco D")}></Live> Kiosco D</p>
                    <img class="opacity" src={eye} alt="Show!" />
                </div>
                <PointAlert show="true" metric={currentMetric} positionValue= {styleElement(20, -15)}></PointAlert>
                <img src={Vector32} alt="" />
            </span>
            <span onClick={()=>{}} style = {styleElement(605, 30)}>
                <img src={Vector37} alt="" />
            </span>
            <span onClick={()=> {}} style = {styleElement(626, 76)}>
                <img src={Vector26} alt="" />
            </span>
            <span onClick={()=> {}} style = {styleElement(843, 147.5)}>
                <img src={Vector33} alt="" />
            </span>
            <span onClick={()=> {showDeatilsFunction("Kiosco A")}} style = {styleElement(549, 91)}>
                <div class="box-title-sector" style={styleElement(-1, 0)}>
                    <p className="title-sector"><Live show={detectStations("Kiosco A")}></Live> Kiosco A</p>
                    <img class="opacity" src={eye} alt="Show!" />
                </div>
                <PointAlert show="true" metric={currentMetric} positionValue= {styleElement(-15, -30)}></PointAlert>
                <img src={Vector38} alt="" />
            </span>
            <span onClick={()=> {}} style = {styleElement(731, 204)}>
                <img src={Vector27} alt="" />
            </span>
            <span onClick={()=> {}} style = {styleElement(716, 108)}>
                <img src={Vector34} alt="" />
            </span>
            <span onClick={()=> {}} style = {styleElement(400, 201)}>
                <img src={Vector39} alt="" />
            </span>
            <span onClick={()=> {showDeatilsFunction("Kiosco Sala Maestros")}} style = {styleElement(509, 201)}>
                <div class="box-title-sector" style={styleElement(-1, 10)}>
                    <p className="title-sector"><Live show={detectStations("Kiosco Sala Maestros")}></Live> Kiosco Sala Maestros</p>
                    <img class="opacity" src={eye} alt="Show!" />
                </div>
                <PointAlert show="true" metric={currentMetric} positionValue= {styleElement(5, -20)}></PointAlert>
                <img src={Vector28} alt="" />
            </span>
            <span onClick={()=> {}} style = {styleElement(768, 135)}>
                <img src={Vector35} alt="" />
            </span>
            <span onClick={()=> {}} style = {styleElement(489, 254)}>
                <img src={Vector40} alt="" />
            </span>
        </section>
        <CurrentData></CurrentData>
        </span>
    )
}
export default MapView;