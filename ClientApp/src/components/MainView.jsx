import React from "react";
import Options from "./Options";
import MapView from "./MapView";
const MainView = () => {
    return(
        <section>
            <div className="options-section">
                <Options></Options>
            </div>
            <div>
                <MapView></MapView>
            </div>
        </section>
    )
}
export default MainView;