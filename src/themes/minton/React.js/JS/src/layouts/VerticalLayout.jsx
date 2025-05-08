;
import { Suspense, useCallback, useEffect, useState } from "react";

// utils
import { Preloader } from "@/components";
import { useLayoutContext } from "@/context/useLayoutContext";
import Topbar from "@/layouts/Topbar";
import LeftSidebar from "@/layouts/LeftSidebar";
import Footer from "@/layouts/Footer";
import RightSidebar from "@/layouts/RightSidebar";
import { Container } from "react-bootstrap";
const loading = () => <div></div>;
const VerticalLayout = ({
  children
}) => {
  const {
    menu,
    changeMenuSize
  } = useLayoutContext();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = () => {
    setIsMenuOpened(prevState => !prevState);
    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.remove("sidebar-enable");
      } else {
        document.body.classList.add("sidebar-enable");
      }
    }
  };
  const updateDimensions = useCallback(() => {
    // activate the condensed sidebar if smaller devices like ipad or tablet
    if (window.innerWidth > 768 && window.innerWidth <= 1028) {
      changeMenuSize('condensed');
    } else if (window.innerWidth > 1028) {
      changeMenuSize('default');
    }
  }, [menu.size]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [updateDimensions]);
  const isCondensed = menu.size === 'condensed';
  return <>
            <div id="wrapper">

                <Suspense fallback={loading()}>
                    <Topbar openLeftMenuCallBack={openMenu} hideLogo={false} />
                </Suspense>

                <Suspense fallback={loading()}>
                    <LeftSidebar isCondensed={isCondensed} />
                </Suspense>

                <div className="content-page">
                    <div className="content">
                        <Container fluid>

                            <Suspense fallback={<Preloader />}>
                                {children}
                            </Suspense>

                        </Container>
                    </div>

                    <Suspense fallback={loading()}>
                        <Footer />
                    </Suspense>

                </div>
            </div>

            <Suspense fallback={loading()}>
                <RightSidebar />
            </Suspense>
        </>;
};
export default VerticalLayout;