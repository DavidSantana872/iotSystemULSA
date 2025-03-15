import React from "react";

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

const MapView = () => {
    const styleElement = (x, y) => {
        return{
            position: "absolute",
            top: `${y}px`,
            left: `${x}px`
        }
    }
    return (
        <section className="map" style={
            {width: 'min-content',
            position: 'relative'}}
        >
            <span style= {styleElement(209, 256)}>
                <img src={campoFutbol} alt="" />
            </span>
            <span style = {styleElement(23, 342)}>
                <img src={campoBeisbol} alt="" />
            </span>
            <span style = {styleElement(626.79, 173.69)}>
                <img src={Group16} alt="" />
            </span>
            <span style = {styleElement(652, 223)}>
                <img src={Vector31} alt="" />
            </span>
            <span style = {styleElement(417, 122)}>
                <img src={Vector36} alt="" />
            </span>
            <span style = {styleElement(808, 216.5)}>
                <img src={Vector45} alt="" />
            </span>
            <span style = {styleElement(505,135)}>
                <img src={Vector25} alt="" />
            </span>
            <span style = {styleElement(753, 235.5)}>
                <img src={Vector32} alt="" />
            </span>
            <span style = {styleElement(605, 30)}>
                <img src={Vector37} alt="" />
            </span>
            <span style = {styleElement(626, 76)}>
                <img src={Vector26} alt="" />
            </span>
            <span style = {styleElement(843, 147.5)}>
                <img src={Vector33} alt="" />
            </span>
            <span style = {styleElement(549, 91)}>
                <img src={Vector38} alt="" />
            </span>
            <span style = {styleElement(731, 204)}>
                <img src={Vector27} alt="" />
            </span>
            <span style = {styleElement(716, 108)}>
                <img src={Vector34} alt="" />
            </span>
            <span style = {styleElement(400, 201)}>
                <img src={Vector39} alt="" />
            </span>
            <span style = {styleElement(509, 201)}>
                <img src={Vector28} alt="" />
            </span>
            <span style = {styleElement(768, 135)}>
                <img src={Vector35} alt="" />
            </span>
            <span style = {styleElement(489, 254)}>
                <img src={Vector40} alt="" />
            </span>
        </section>
    )
}
export default MapView;