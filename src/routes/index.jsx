import { lazy } from "react";

// Authentication pages
const Login = lazy(() => import("@/app/(auth)/auth/login/page"));
const Logout = lazy(() => import("@/app/(auth)/auth/logout/page"));
const LockScreen = lazy(() => import("@/app/(auth)/auth/lock-screen/page"));
const Register = lazy(() => import("@/app/(auth)/auth/register/page"));

// Customer pages
const CustomerLayout = lazy(() => import("@/layouts/CustomerLayout"));

// All other app pages...

export const authRoutes = [
  {
    path: "/auth/login",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/auth/logout",
    name: "Logout",
    element: <Logout />,
  },
  {
    path: "/auth/register",
    name: "Register",
    element: <Register />,
  },
  {
    path: "/auth/lock-screen",
    name: "LockScreen",
    element: <LockScreen />,
  },
];

export const appRoutes = [
  // Customer route should be first to take precedence for customer users
  {
    path: "/",
    name: "Customer Dashboard",
    element: <CustomerLayout />,
    customerOnly: true,
  },
  // Staff/Admin routes
  {
    path: "/dashboard/sales",
    name: "Sales Dashboard",
    element: <SalesDashboard />,
    staffOnly: true,
  },
  {
    path: "/customers",
    name: "Customers",
    element: <CustomerList />,
    staffOnly: true,
  },
  {
    path: "/customers/:id",
    name: "Customer Details",
    element: <CustomerSummary />,
    staffOnly: true,
  },
  // ... rest of the routes
];