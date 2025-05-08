;
import { useLayoutContext } from "@/context/useLayoutContext";
import Footer from "@/layouts/Footer";
import LeftSidebar from "@/layouts/LeftSidebar";
import RightSidebar from "@/layouts/RightSidebar";
import Topbar from "@/layouts/Topbar";
import { Suspense, useState } from "react";
import { Container } from "react-bootstrap";

const loading = () => <div className="text-center"></div>;

interface VerticalLayoutProps {
    children?: any;
}

const DetachedLayout = ({children}: VerticalLayoutProps) => {
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

    const {menu, themeCustomizer} = useLayoutContext()

    /**
     * Open the menu when having mobile screen
     */
    const openMenu = () => {
        setIsMenuOpened((prevState) => !prevState);
        if (document.body) {
            if (isMenuOpened) {
                document.body.classList.add("sidebar-enable");
            } else {
                document.body.classList.remove("sidebar-enable");
            }
        }
    };


    const isCondensed = menu.size === 'condensed';

    return (
        <>
            <div id="wrapper">
                <Suspense fallback={loading()}>
                    <Topbar
                        openLeftMenuCallBack={openMenu}
                        navCssClasses="topnav-navbar topnav-navbar-dark"
                        topbarDark={true}
                    />
                </Suspense>
                <Suspense fallback={loading()}>
                    <LeftSidebar isCondensed={isCondensed}/>
                </Suspense>

                <div className="content-page">
                    <div className="content">
                        <Container fluid>
                            <Suspense fallback={loading()}>{children}</Suspense>
                        </Container>
                    </div>

                    <Suspense fallback={loading()}>
                        <Footer/>
                    </Suspense>
                </div>
            </div>
            {themeCustomizer.open && (
                <Suspense fallback={loading()}>
                    <RightSidebar/>
                </Suspense>
            )}
        </>
    );
};

export default DetachedLayout;
