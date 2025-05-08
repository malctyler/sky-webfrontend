import PageBreadcrumb from "@/components/PageBreadcrumb";
import ContactList from "@/app/(admin)/apps/contacts/list/ContactList";
const List = () => {
  return <>
            <PageBreadcrumb breadCrumbItems={[{
      label: "Contacts",
      path: "/apps/contacts/list"
    }, {
      label: "Members List",
      path: "/apps/contacts/list",
      active: true
    }]} title={"Members List"} />
            <ContactList />
        </>;
};
export default List;