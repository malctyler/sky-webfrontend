import { useLayoutContext } from "@/context/useLayoutContext";
import { useAuthContext } from "@/context/useAuthContext";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import VerticalLayout from "@/layouts/VerticalLayout";
import DetachedLayout from "@/layouts/DetachedLayout";
import HorizontalLayout from "@/layouts/HorizontalLayout";
import TwoColumnLayout from "@/layouts/TwoColumnLayout";

const MainLayout = ({ children }) => {
  const { orientation } = useLayoutContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If user is a customer and trying to access any route other than root
    if (user?.isCustomer && location.pathname !== '/') {
      navigate('/');
    }
  }, [user, location.pathname, navigate]);

  return (
    <>
      {orientation === "vertical" && <VerticalLayout>{children}</VerticalLayout>}
      {orientation === "horizontal" && <HorizontalLayout>{children}</HorizontalLayout>}
      {orientation === "detached" && <DetachedLayout>{children}</DetachedLayout>}
      {orientation === "two-column" && <TwoColumnLayout>{children}</TwoColumnLayout>}
    </>
  );
};

export default MainLayout;