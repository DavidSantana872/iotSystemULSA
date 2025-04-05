import React, {useState} from "react";
import { counterContext } from "./counterContext.js";

const AppContext = ({children}) => {
    const [showApp, setShowApp] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [currentMetric, setCurrentMetric] = useState('Sonido')
    const [stationsOnline, setStationsOnline] = useState([])
    return(
        <counterContext.Provider value={{showApp, setShowApp, showDetails, setShowDetails, currentMetric, setCurrentMetric, stationsOnline, setStationsOnline}}>
        {children}
        </counterContext.Provider>
    );
}

export default AppContext;