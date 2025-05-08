;
import { useLayoutContext } from "@/context/useLayoutContext";
import Footer from "@/layouts/Footer";
import Navbar from "@/layouts/HorizontalLayout/Navbar";
import RightSidebar from "@/layouts/RightSidebar";
import Topbar from "@/layouts/Topbar";
import { Suspense, useState } from "react";
import { Container } from "react-bootstrap";
const loading = () => <div className="text-center"></div>;
const HorizontalLayout = ({
  children
}) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const {
    themeCustomizer
  } = useLayoutContext();

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = () => {
    setIsMenuOpened(!isMenuOpened);
    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.remove("sidebar-enable");
      } else {
        document.body.classList.add("sidebar-enable");
      }
    }
  };
  return <>
            <div id="wrapper">
                <Suspense fallback={loading()}>
                    <Topbar openLeftMenuCallBack={openMenu} topbarDark={false} />
                </Suspense>

                <Suspense fallback={loading()}>
                    <Navbar isMenuOpened={isMenuOpened} />
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

                    {themeCustomizer.open && <Suspense fallback={loading()}>
                            <RightSidebar />
                        </Suspense>}
                </div>
            </div>
        </>;
};
export default HorizontalLayout;