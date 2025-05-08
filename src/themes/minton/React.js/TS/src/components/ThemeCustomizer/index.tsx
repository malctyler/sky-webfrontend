
import React from "react"

// components
import LayoutOrientation from "./LayoutOrientation";
import LayoutWidth from "./LayoutWidth";
import MenuPositions from "./MenuPositions";
import MenuTheme from "./MenuTheme";
import MenuSize from "./MenuSize";
import SidebarUserInfo from "./SidebarUserInfo";
import TopbarTheme from "./TopbarTheme";
import LayoutTheme from "./LayoutTheme";
import { Link } from "react-router-dom";
import {useLayoutContext} from "@/context/useLayoutContext";

const ThemeCustomizer = () => {

    const {orientation, resetSettings} = useLayoutContext()

    return (
        <React.Fragment>
            <h6 className="fw-medium px-3 m-0 py-2 font-13 text-uppercase bg-light">
                <span className="d-block py-1">Theme Settings</span>
            </h6>
            <div className="p-3">
                <div className="alert alert-warning" role="alert">
                    <strong>Customize </strong> the overall color scheme, sidebar menu,
                    etc.
                </div>

                <LayoutOrientation/>

                <LayoutTheme/>

                <LayoutWidth/>

                <TopbarTheme/>


                {
                    orientation != "horizontal" &&
                    <MenuPositions/>
                }

                <MenuTheme/>

                {
                    orientation != "horizontal" &&
                    <MenuSize/>
                }

                {
                    orientation != "horizontal" &&
                    <SidebarUserInfo/>
                }

                <div className="d-grid mt-4">
                    <button
                        className="btn btn-primary"
                        id="resetBtn"
                        onClick={() => resetSettings()}
                    >
                        Reset to Default
                    </button>
                    <Link to="https://wrapbootstrap.com/theme/minton-admin-dashboard-template-WB0858DB6?ref=coderthemes"
                          className="btn btn-danger mt-2"
                          target="_blank"
                    >
                        <i className="mdi mdi-basket me-1"/>
                        Purchase Now
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ThemeCustomizer;
