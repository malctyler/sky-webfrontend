import { AuthProvider } from "@/context/useAuthContext";
import { LayoutProvider } from "@/context/useLayoutContext";
import { NotificationProvider } from "@/context/useNotificationContext";
const AppWrapper = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
            <AuthProvider>
                <LayoutProvider>
                    <NotificationProvider>
                        {children}
                    </NotificationProvider>
                </LayoutProvider>
            </AuthProvider>
    )
}

export default AppWrapper;