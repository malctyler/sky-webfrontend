;
import { useLayoutContext } from "@/context/useLayoutContext";
import Footer from "@/layouts/Footer";
import RightSidebar from "@/layouts/RightSidebar";
import Topbar from "@/layouts/Topbar";
import LeftSidebar from "@/layouts/TwoColumnLayout/LeftSidebar";
import { changeHTMLAttribute } from "@/utils";
import { Suspense, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
const loading = () => <div className="text-center"></div>;
const TwoColumnLayout = ({
  children
}) => {
  const {
    menu,
    themeCustomizer
  } = useLayoutContext();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  /*
   * layout defaults
   */
  useEffect(() => {
    changeHTMLAttribute("data-two-column-color", menu.theme);
  }, []);

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = () => {
    setIsMenuOpened(prevState => !prevState);
    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.add("sidebar-enable");
      } else {
        document.body.classList.remove("sidebar-enable");
      }
    }
  };
  return <>
            <div id="wrapper">
                <Suspense fallback={loading()}>
                    <Topbar openLeftMenuCallBack={openMenu} topbarDark={true} />
                </Suspense>
                <Suspense fallback={loading()}>
                    <LeftSidebar />
                </Suspense>

                <div className="content-page">
                    <div className="content">
                        <Container fluid>
                            <Suspense fallback={loading()}>{children}</Suspense>
                        </Container>
                    </div>

                    <Suspense fallback={loading()}>
                        <Footer />
                    </Suspense>
                </div>
            </div>
            {themeCustomizer.open && <Suspense fallback={loading()}>
                    <RightSidebar />
                </Suspense>}
        </>;
};
export default TwoColumnLayout;