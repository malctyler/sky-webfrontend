import {useLayoutContext} from "@/context/useLayoutContext";
import {ReactNode} from "react";

import VerticalLayout from "@/layouts/VerticalLayout";
import DetachedLayout from "@/layouts/DetachedLayout";
import HorizontalLayout from "@/layouts/HorizontalLayout";
import TwoColumnLayout from "@/layouts/TwoColumnLayout";

const MainLayout = ({children}: { children: ReactNode }) => {
    const {orientation} = useLayoutContext()

    return (
        <>
            {orientation === "vertical" && <VerticalLayout>{children}</VerticalLayout>}
            {orientation === "horizontal" && <HorizontalLayout>{children}</HorizontalLayout>}
            {orientation === "detached" && <DetachedLayout>{children}</DetachedLayout>}
            {orientation === "two-column" && <TwoColumnLayout>{children}</TwoColumnLayout>}
        </>
    )
}

export default MainLayout