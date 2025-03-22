import React from "react";
import Options from "./Options";
import MapView from "./MapView";
import Footer from "./Footer";
import "./MainView.css"
const MainView = () => {
    return(
        <section className="animate">
            <div className="options-section">
                <Options></Options>
            </div>
            <div className="box-map">
                <MapView></MapView>
            </div>
            <Footer></Footer>
        </section>
    )
}
export default MainView;