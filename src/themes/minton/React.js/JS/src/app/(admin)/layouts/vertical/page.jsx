import { useEffect } from "react";
import Dashboard from "@/app/(admin)/dashboard/analytics/page";
import { useLayoutContext } from "@/context/useLayoutContext";
const Page = () => {
  const {
    changeLayoutOrientation
  } = useLayoutContext();
  useEffect(() => {
    changeLayoutOrientation('vertical');
  }, []);
  return <Dashboard />;
};
export default Page;