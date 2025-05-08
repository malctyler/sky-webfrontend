import Dashboard from "@/app/(admin)/dashboard/analytics/page";
import { useEffect } from "react";
import { useLayoutContext } from "@/context/useLayoutContext";
const Page = () => {
  const {
    changeLayoutOrientation
  } = useLayoutContext();
  useEffect(() => {
    changeLayoutOrientation('horizontal');
  }, []);
  return <Dashboard />;
};
export default Page;