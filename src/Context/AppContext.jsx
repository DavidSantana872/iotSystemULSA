import React, {useState} from "react";
import { counterContext } from "./counterContext.js";

const AppContext = ({children}) => {
    const [showApp, setShowApp] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [currentMetric, setCurrentMetric] = useState('Ruido Promedio')
    const [stationsOnline, setStationsOnline] = useState([])
    const [metricsAll, setMetricsAll] = useState('')
    return(
        <counterContext.Provider value={{showApp, setShowApp, showDetails, setShowDetails, currentMetric, setCurrentMetric, stationsOnline, setStationsOnline, metricsAll, setMetricsAll}}>
        {children}
        </counterContext.Provider>
    );
}

export default AppContext;