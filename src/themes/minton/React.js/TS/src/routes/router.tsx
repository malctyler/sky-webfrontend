import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/Layout/MainLayout";
import LoginForm from "@/components/Auth/LoginForm";
import Register from "@/components/Auth/Register";
import Home from "@/components/Common/Home";
import Weather from "@/components/Weather/Weather";
import CustomerPlantHolding from "@/components/Customer/CustomerPlantHolding";
import AllCustomers from "@/components/Customer/AllCustomers";
import CustomerSummary from "@/components/Customer/CustomerSummary";
import CustomerNotes from "@/components/Customer/CustomerNotes";
import PlantCategories from "@/components/Plant/PlantCategories";
import ManagePlant from "@/components/Plant/ManagePlant";
import UserManagement from "@/components/UserManagement/UserManagement";
import CertificatePage from "@/components/Inspection/CertificatePage";

interface RouteType {
    path: string;
    name: string;
    element: React.ReactNode;
    requireAdmin?: boolean;
    requireStaffOrAdmin?: boolean;
    standalone?: boolean;
}

const authRoutes: RouteType[] = [
    {
        path: "/login",
        name: "Login",
        element: <Login />
    },
    {
        path: "/register",
        name: "Register",
        element: <Register />
    }
];

const appRoutes: RouteType[] = [
    {
        path: "/",
        name: "Home",
        element: <Home />
    },
    {
        path: "/home",
        name: "Home",
        element: <Home />
    },
    {
        path: "/weather",
        name: "Weather",
        element: <Weather />
    },
    {
        path: "/plant-holding",
        name: "Plant Holding",
        element: <CustomerPlantHolding />
    },
    {
        path: "/customers",
        name: "Customers",
        element: <AllCustomers />,
        requireStaffOrAdmin: true
    },
    {
        path: "/customers/:custId",
        name: "Customer Summary",
        element: <CustomerSummary />,
        requireStaffOrAdmin: true
    },
    {
        path: "/customers/:custId/notes",
        name: "Customer Notes",
        element: <CustomerNotes />,
        requireStaffOrAdmin: true
    },
    {
        path: "/plant-categories",
        name: "Plant Categories",
        element: <PlantCategories />,
        requireAdmin: true
    },
    {
        path: "/manage-plant",
        name: "Manage Plant",
        element: <ManagePlant />,
        requireAdmin: true
    },
    {
        path: "/user-management",
        name: "User Management",
        element: <UserManagement />,
        requireAdmin: true
    },    {
        path: "/certificate/:id",
        name: "Certificate",
        element: <CertificatePage />,
        requireStaffOrAdmin: true,
        standalone: true // Mark this route as standalone
    }
];

const AppRouter = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    // Protected route logic
    const ProtectedRoute = ({ children, route }: { children: React.ReactNode, route: RouteType }) => {
        if (!user) {
            return <Navigate to="/login" replace />;
        }

        // Customer access restrictions
        if (user.isCustomer) {
            const allowedPaths = ['/plant-holding', '/weather'];
            if (!allowedPaths.includes(route.path)) {
                return <Navigate to="/plant-holding" replace />;
            }
        }

        // Admin role check
        if (route.requireAdmin && !user.roles?.includes('Admin')) {
            return <Navigate to={user.isCustomer ? '/plant-holding' : '/'} replace />;
        }

        // Staff/Admin role check
        if (route.requireStaffOrAdmin && !(user.roles?.includes('Staff') || user.roles?.includes('Admin'))) {
            return <Navigate to={user.isCustomer ? '/plant-holding' : '/'} replace />;
        }

        return <>{children}</>;
    };

    return (
        <Routes>
            {/* Auth routes - unprotected */}
            {(authRoutes || []).map((route: RouteType) => (                <Route
                    key={route.path}
                    path={route.path}
                    element={<div className="auth-container">{route.element}</div>}
                />
            ))}            {/* App routes - protected */}
            {(appRoutes || []).map((route: RouteType) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={                        <ProtectedRoute route={route}>
                            {route.path === "/certificate/:id" ? (
                                route.element
                            ) : (
                                <MainLayout>{route.element}</MainLayout>
                            )}
                        </ProtectedRoute>
                    }
                />
            ))}

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;