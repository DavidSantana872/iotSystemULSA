import React, {useState} from "react";
import { counterContext } from "./counterContext.js";

const AppContext = ({children}) => {
    const [showApp, setShowApp] = useState(false)
    return(
        <counterContext.Provider value={{showApp, setShowApp}}>
        {children}
        </counterContext.Provider>
    );
}

export default AppContext;