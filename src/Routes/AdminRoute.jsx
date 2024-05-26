import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const {user, loading} = useAuth();
    
    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }

    if(user && isAdmin){
        return children;
    }
    return <Navigate to="/admin-not-found"></Navigate>;
};

export default AdminRoute;