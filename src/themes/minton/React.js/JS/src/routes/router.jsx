import { Navigate, Route, Routes } from "react-router-dom";
import { appRoutes, authRoutes } from "./index";
import MainLayout from "@/layouts/MainLayout";
import DefaultLayout from "@/layouts/Default";
import { useAuthContext } from "@/context/useAuthContext";
const AppRouter = props => {
  const {
    isAuthenticated
  } = useAuthContext();
  return <Routes>
        {(authRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={<DefaultLayout {...props}>{route.element}</DefaultLayout>} />)}
  
        {(appRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={isAuthenticated ? <MainLayout {...props}>{route.element}</MainLayout> : <Navigate to={{
      pathname: '/auth/login',
      search: 'redirectTo=' + route.path
    }} />} />)}
      </Routes>;
};
export default AppRouter;