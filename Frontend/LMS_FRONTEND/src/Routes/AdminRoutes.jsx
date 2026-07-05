import { Navigate } from "react-router-dom";
import { useUserStore } from "@/Store/user.store";
import Cancel from "@/Pages/admin/Cancel"; // or AccessDenied if you rename it

export const AdminRoute = ({ children }) => {
    const user = useUserStore((state) => state.user);

    // If somehow no user exists, send to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If user is not an admin, show access denied page
    if (!user.admin) {
        return <Cancel />;
    }

    return children;
};