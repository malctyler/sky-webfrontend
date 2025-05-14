import { Navigate, Route, Routes } from "react-router-dom";
import { appRoutes, authRoutes } from "./index";
import MainLayout from "@/layouts/MainLayout";
import DefaultLayout from "@/layouts/Default";
import { useAuthContext } from "@/context/useAuthContext";

const AppRouter = props => {
  const { isAuthenticated, user } = useAuthContext();
  
  return (
    <Routes>
      {(authRoutes || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={<DefaultLayout {...props}>{route.element}</DefaultLayout>}
        />
      ))}

      {(appRoutes || []).map((route, idx) => {
        // Check if this is a customer route
        const isCustomerRoute = route.path.startsWith('/customers');
        // Block customers from accessing customer list, but allow them to access their own customer page
        const isCustomerAccessDenied = user?.isCustomer && isCustomerRoute && 
          (route.path === '/customers' || (route.path.startsWith('/customers/') && !route.path.includes(user.customerId?.toString())));

        return (
          <Route
            key={idx + route.name}
            path={route.path}
            element={
              isAuthenticated ? (
                isCustomerAccessDenied ? (
                  <Navigate to="/" replace />
                ) : (
                  <MainLayout {...props}>{route.element}</MainLayout>
                )
              ) : (
                <Navigate to="/auth/login" replace />
              )
            }
          />
        );
      })}
    </Routes>
  );
};

export default AppRouter;