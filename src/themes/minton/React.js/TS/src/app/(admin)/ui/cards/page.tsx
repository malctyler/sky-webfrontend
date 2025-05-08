import PageBreadcrumb from "@/components/PageBreadcrumb";

// components

import AllCards from "./AllCards";
const Cards = () => {

  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/cards" },
          { label: "Cards", path: "/ui/cards", active: true },
        ]}
        title={"Cards"}
      />
      <AllCards />
    </>
  );
};

export default Cards;
