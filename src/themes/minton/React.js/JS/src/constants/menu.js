const MENU_ITEMS = [
  {
    key: "navigation",
    label: "Navigation",
    isTitle: true
  },
  {
    key: "dashboard",
    label: "Dashboard",
    isTitle: false,
    icon: "ri-dashboard-line",
    children: [
      {
        key: "customer-dashboard",
        label: "My Plant Holdings",
        url: "/",
        parentKey: "dashboard",
        customerOnly: true
      },
      {
        key: "staff-dashboard",
        label: "Staff Dashboard",
        url: "/dashboard/staff",
        parentKey: "dashboard",
        staffOnly: true
      }
    ]
  },
  {
    key: "customers",
    label: "Customers",
    isTitle: false,
    icon: "ri-user-line",
    url: "/customers",
    staffOnly: true
  },
  {
    key: "plant-categories",
    label: "Plant Categories",
    isTitle: false,
    icon: "ri-plant-line",
    url: "/plant-categories",
    staffOnly: true
  },
  {
    key: "inspections",
    label: "Inspections",
    isTitle: false,
    icon: "ri-checkbox-line",
    url: "/inspections",
    staffOnly: true
  }
];

export { MENU_ITEMS };