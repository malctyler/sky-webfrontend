import { useLayoutContext } from "@/context/useLayoutContext";
import VerticalLayout from "@/layouts/VerticalLayout";
import DetachedLayout from "@/layouts/DetachedLayout";
import HorizontalLayout from "@/layouts/HorizontalLayout";
import TwoColumnLayout from "@/layouts/TwoColumnLayout";
const MainLayout = ({
  children
}) => {
  const {
    orientation
  } = useLayoutContext();
  return <>
            {orientation === "vertical" && <VerticalLayout>{children}</VerticalLayout>}
            {orientation === "horizontal" && <HorizontalLayout>{children}</HorizontalLayout>}
            {orientation === "detached" && <DetachedLayout>{children}</DetachedLayout>}
            {orientation === "two-column" && <TwoColumnLayout>{children}</TwoColumnLayout>}
        </>;
};
export default MainLayout;