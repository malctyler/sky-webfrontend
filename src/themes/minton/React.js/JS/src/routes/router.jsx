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
        // Check various access conditions
        const isCustomerRoute = route.customerOnly;
        const isStaffRoute = route.staffOnly;
        const isStaff = user?.roles?.includes('Staff') || user?.roles?.includes('Admin');
        
        // Determine if access should be denied
        const accessDenied = (isCustomerRoute && !user?.isCustomer) || 
                           (isStaffRoute && !isStaff) ||
                           (!isCustomerRoute && !isStaffRoute && user?.isCustomer);

        return (
          <Route
            key={idx + route.name}
            path={route.path}
            element={
              isAuthenticated ? (
                accessDenied ? (
                  <Navigate to={user?.isCustomer ? "/" : "/dashboard"} replace />
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