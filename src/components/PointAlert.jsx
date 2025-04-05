import React, { useEffect, useState } from "react"
import "./PointAlert.css"
const PointAlert = ({show, positionValue, metric}) => {
    /*
	Puntos de alertas 
	
	- Ambiente silencioso 
	
	point1 
		rgb(0,72,255, 0.14)
	point2
		rgb(0,72,255, 0.29)
	point3
		rgba(0, 72, 255, 0.35)
	
	- Calidad de Oxigeno excelente
	 	
	point1 
		rgb(6, 184, 142, 0.14)
	point2
		rgb(6, 184, 142, 0.29)
	point3
		rgba(6, 184, 142, 0.35)
		
	- Temperatura excelente
	 	
	point1 
		rgb(161, 6, 192, 0.14)
	point2
		rgb(161, 6, 192, 0.29)
	point3
		rgba(161, 6, 192, 0.35)
		
    */
   const point1Color = () => {
        if(metric === "Sonido"){
            return 'rgb(0,72,255, calc(0.14 * 4))'
        }
        else if(metric === "Oxigeno"){
            return 'rgb(6, 184, 142, calc(0.14 * 4))'
        }
        else{
            return 'rgb(161, 6, 192, calc(0.14 * 4))'
        }
   }
   const point2Color = () => {
        if(metric === "Sonido"){
            return 'rgb(0,72,255, calc(0.29 * 4))'
        }
        else if(metric === "Oxigeno"){
            return 'rgb(6, 184, 142, calc(0.29 * 4))'
        }
        else{
            return 'rgb(161, 6, 192, calc(0.29 * 4))'
        }
    }
    const point3Color = () => {
        if(metric === "Sonido"){
            return 'rgb(0, 72, 255, calc(0.35 * 4))'
        }
        else if(metric === "Oxigeno"){
            return 'rgb(6, 184, 142, calc(0.35 * 4))'
        }
        else{
            return 'rgb(161, 6, 192, calc(0.35 * 4))'
        }
    }

    const [styleData, setStyleData] = useState(
        {
            ...(positionValue),
            background: point1Color()
        }
    )
    useEffect(
        () => {
            setStyleData(
                {
                    ...(positionValue),
                    background: point1Color()
                }
            )
        }, [metric]
    )

    return(
        show == "true" ? <div class="point1" style = {styleData}>
            <div class="point2" style={{background: point2Color()}}>
                <div class="point3" style={{background: point3Color()}}>
                </div>
            </div>
        </div> : null
    )
}
export default PointAlert;