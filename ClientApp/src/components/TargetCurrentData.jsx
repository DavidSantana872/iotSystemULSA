import React, { useEffect, useRef } from "react";
import oxigeno from "./../resources/gif/Oxigeno.png";
import sonido from "./../resources/gif/Sonido.gif";

const TargetCurrentData = ({ value, title, arrayDatas , id }) => {
    const getImg = () => {
        if (title === "Oxigeno") {
            return oxigeno;
        } else if (title === "Sonido") {
            return sonido;
        }
    };

    const canvasRef = useRef(null);

    const arrayData = [
        { x: 0, y: 20 },
        { x: 1, y: 25 },
        { x: 2, y: 22 },
        { x: 3, y: 28 },
        { x: 4, y: 30 },
        { x: 5, y: 27 },
        { x: 6, y: 33 },
        { x: 7, y: 35 },
        { x: 8, y: 40 },
        { x: 9, y: 42 }
    ];
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Configuración de estilo del gráfico
        const padding = 0;  // Padding alrededor del gráfico
        const strokeWidth = 2;  // Ancho de la línea del gráfico

        // Limpia el canvas
        ctx.clearRect(0, 0, width, height);

        // Verifica que haya datos para dibujar
        if (arrayData.length === 0) return;

        // Escala y dimensiones ajustadas
        const maxX = Math.max(...arrayData.map(d => d.x));
        const maxY = Math.max(...arrayData.map(d => d.y));
        const minX = Math.min(...arrayData.map(d => d.x));
        const minY = Math.min(...arrayData.map(d => d.y));
        const scaleX = (width - padding * 2) / (maxX - minX);
        const scaleY = (height - padding * 2) / (maxY - minY);

        // Función para obtener la posición X ajustada al padding
        const getX = (x) => padding + (x - minX) * scaleX;
        // Función para obtener la posición Y ajustada al padding
        const getY = (y) => height - padding - (y - minY) * scaleY;

        // Dibuja la línea del gráfico
        ctx.beginPath();
        ctx.moveTo(getX(arrayData[0].x), getY(arrayData[0].y));
        arrayData.forEach(point => {
            ctx.lineTo(getX(point.x), getY(point.y));
        });
         // Crea un gradiente para el relleno bajo la línea
        const gradient = ctx.createLinearGradient(0, height - padding, 0, padding);
   
        if(title === "Sonido"){
            ctx.strokeStyle = 'rgb(0, 115, 255)';
            ctx.lineWidth = strokeWidth;
            ctx.stroke();
    
            // Crea un gradiente para el relleno bajo la línea
             gradient.addColorStop(0, 'rgba(0, 115, 255, 0)'); // Rojo semi-transparente en la parte superior
            gradient.addColorStop(1, 'rgba(0, 115, 255, 0.46)'); // Amarillo transparente hacia abajo
        }
        else if(title === "Oxigeno"){
            ctx.strokeStyle = 'rgb(0, 255, 195)';
            ctx.lineWidth = strokeWidth;
            ctx.stroke();
    
            gradient.addColorStop(0, 'rgba(0, 255, 195, 0)'); // Rojo semi-transparente en la parte superior
            gradient.addColorStop(1, 'rgba(0, 255, 195, 0.46)'); // Amarillo transparente hacia abajo

        }
        else{
            ctx.strokeStyle = 'rgb(255, 0, 255)';
            ctx.lineWidth = strokeWidth;
            ctx.stroke();
    
            // Crea un gradiente para el relleno bajo la línea
             gradient.addColorStop(0, 'rgba(255, 0, 255, 0)'); // Rojo semi-transparente en la parte superior
            gradient.addColorStop(1, 'rgba(255, 0, 255, 0.46)'); // Amarillo transparente hacia abajo

        }
        // Rellena bajo la línea
        ctx.lineTo(getX(arrayData[arrayData.length - 1].x), height - padding);
        ctx.lineTo(getX(arrayData[0].x), height - padding);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
    }, [arrayData]);  // Dependencia de useEffect para redibujar cuando los datos cambian


    return (
        /*<div className="target-current-data" style={{ backgroundImage: `url(${getImg()})` }}>*/
           <div className="target-current-data" >
      
            <div>
                <div>
                    <p className="target-current-data-title">
                        {title}
                    </p>
                    <p className="target-current-data-value">
                        {value}
                    </p>
                    <div className="grafico-dts">
                        <canvas ref={canvasRef} width="168" height="48"></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TargetCurrentData;
