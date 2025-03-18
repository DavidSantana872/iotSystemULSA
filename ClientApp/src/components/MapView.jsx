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
import { counterContext } from "./../Context/counterContext";
import CurrentData from "./CurrentData";
import PointAlert from "./PointAlert.jsx";
import anime from "animejs";
const MapView = () => {
    const {setShowDetails, currentMetric} = useContext(counterContext)
    const styleElement = (x, y) => {
        return{
            position: "absolute",
            top: `${y}px`,
            left: `${x}px`
        }
    }
    const showDeatilsFunction = (sector) => {
        setShowDetails(sector)
        console.log(sector)
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
            <span onClick={()=>{showDeatilsFunction("sector1")}} style= {styleElement(209, 256)}>
                {
                    /*
                        top: 56px;
                        left: 200px;
                    */
                }
                <PointAlert show="true" metric={currentMetric} positionValue= {styleElement(200, 56)}></PointAlert>
                <img src={campoFutbol} alt="" />
            </span>
            <span onClick={()=>{showDeatilsFunction("sector2")}} style = {styleElement(23, 342)}>
                <PointAlert show="true" metric={currentMetric} positionValue= {styleElement(200, 56)}></PointAlert>
                <img src={campoBeisbol} alt="" />
            </span>
            <span onClick={()=>{showDeatilsFunction("sector3")}} style = {styleElement(626.79, 173.69)}>
                <PointAlert show="true" metric={currentMetric} positionValue= {styleElement(-5, -30)}></PointAlert>
                <img src={Group16} alt="" />
            </span>
            <span onClick={()=>{showDeatilsFunction("sector4")}} style = {styleElement(652, 223)}>
                <PointAlert show="true" metric={currentMetric} positionValue= {styleElement(0, -25)}></PointAlert>
                <img src={Vector31} alt="" />
            </span>
            <span onClick={()=>{showDeatilsFunction("sector5")}} style = {styleElement(417, 122)}>
                <img src={Vector36} alt="" />
            </span>
            <span onClick={()=>{showDeatilsFunction("sector6")}} style = {styleElement(808, 216.5)}>
                <img src={Vector45} alt="" />
            </span>
            <span onClick={()=>{showDeatilsFunction("sector7")}} style = {styleElement(505,135)}>
                <img src={Vector25} alt="" />
            </span>
            <span onClick={()=>{showDeatilsFunction("sector8")}} style = {styleElement(753, 235.5)}>
                <PointAlert show="true" metric={currentMetric} positionValue= {styleElement(20, -15)}></PointAlert>
                <img src={Vector32} alt="" />
            </span>
            <span onClick={()=>{showDeatilsFunction("sector9")}} style = {styleElement(605, 30)}>
                <img src={Vector37} alt="" />
            </span>
            <span onClick={()=> {showDeatilsFunction("sector10")}} style = {styleElement(626, 76)}>
                <img src={Vector26} alt="" />
            </span>
            <span onClick={()=> {showDeatilsFunction("sector11")}} style = {styleElement(843, 147.5)}>
                <img src={Vector33} alt="" />
            </span>
            <span onClick={()=> {showDeatilsFunction("sector12")}} style = {styleElement(549, 91)}>
                <PointAlert show="true" metric={currentMetric} positionValue= {styleElement(-15, -30)}></PointAlert>
                <img src={Vector38} alt="" />
            </span>
            <span onClick={()=> {showDeatilsFunction("sector13")}} style = {styleElement(731, 204)}>
                <img src={Vector27} alt="" />
            </span>
            <span onClick={()=> {showDeatilsFunction("sector14")}} style = {styleElement(716, 108)}>
                <img src={Vector34} alt="" />
            </span>
            <span onClick={()=> {showDeatilsFunction("sector15")}} style = {styleElement(400, 201)}>
                <img src={Vector39} alt="" />
            </span>
            <span onClick={()=> {showDeatilsFunction("sector16")}} style = {styleElement(509, 201)}>
                <PointAlert show="true" metric={currentMetric} positionValue= {styleElement(5, -20)}></PointAlert>
                <img src={Vector28} alt="" />
            </span>
            <span onClick={()=> {showDeatilsFunction("sector17")}} style = {styleElement(768, 135)}>
                <img src={Vector35} alt="" />
            </span>
            <span onClick={()=> {showDeatilsFunction("sector18")}} style = {styleElement(489, 254)}>
                <img src={Vector40} alt="" />
            </span>
        </section>
        <CurrentData></CurrentData>
        </span>
    )
}
export default MapView;