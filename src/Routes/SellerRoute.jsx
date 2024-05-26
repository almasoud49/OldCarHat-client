import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSeller from "../hooks/useSeller"

const SellerRoute = ({children}) => {
    const [isSeller, isSellerLoading] = useSeller();
    const {user, loading} = useAuth();

    if(loading || isSellerLoading) return <progress className="progress w-56"></progress>;

    if(user && isSeller) {
        return children;
    }
    return <Navigate to="/seller-not-found"></Navigate>
};

export default SellerRoute;