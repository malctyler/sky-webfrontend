import { Preloader } from "@/components";
import { Suspense } from "react";
const loading = () => <Preloader />;
const DefaultLayout = props => {
  // get the child view which we would like to render
  const children = props.children || null;
  return <>
      <Suspense fallback={loading()}>{children}</Suspense>
    </>;
};
export default DefaultLayout;