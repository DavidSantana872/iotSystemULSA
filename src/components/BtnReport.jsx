import React, {useState} from 'react';
import Loader from './Loader /index.jsx';
import { set } from 'animejs';
const GenerarReporteLink = () => {
    const generarReporteUrl = () => {
        const now = new Date();
        const formattedDateTime = now.toISOString(); // Formato ISO 8601 (incluye segundos)
        return `/api/report?data=${formattedDateTime}`;
    };
    const [loading, setLoading] = useState(false);
    const handleFetchReporte = async () => {
        const reportUrl = generarReporteUrl();
        try {
            setLoading(true);
            const response = await fetch(reportUrl);
            if (!response.ok) {
                throw new Error('Error al generar el reporte');
            }
            const data = await response.blob(); // Asumiendo que el reporte es un archivo descargable
            const url = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reporte.pdf'); // Cambia el nombre del archivo si es necesario
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener el reporte:', error);
            setLoading(false);
        }
    };

    function Animation() {
            return (
                <div style={{position: "absolute", top: "0px", left: "0px", zIndex: "9999", background:"#000000c7"}}>
                    <div className="loading-container">
                        <div className="loading-img-container">
                            <Loader></Loader>
                        </div>
                    </div>
                    
                </div>
            );
    }

    return (
        <>
        {
            loading ? <Animation></Animation> : null
        }
        <button
            onClick={handleFetchReporte}
            className="report-link"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: '#f0f0f0',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                fontFamily: 'sans-serif',
                textDecoration: 'none',
                color: 'white',
                fontWeight: '500',
                background: "rgb(0, 0, 0, 0.3)",
                width: "max-content",
                fontSize: "12px",
                position: "fixed",
                left: "48px",
                marginTop: "24px",
                border: "none"
            }}
        >
            <svg style={{
                marginRight: "5px",
            }} xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M360-460h40v-80h40q17 0 28.5-11.5T480-580v-40q0-17-11.5-28.5T440-660h-80v200Zm40-120v-40h40v40h-40Zm120 120h80q17 0 28.5-11.5T640-500v-120q0-17-11.5-28.5T600-660h-80v200Zm40-40v-120h40v120h-40Zm120 40h40v-80h40v-40h-40v-40h40v-40h-80v200ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg>
            Reporte General
        </button>
        </>
    );
};

export default GenerarReporteLink;
