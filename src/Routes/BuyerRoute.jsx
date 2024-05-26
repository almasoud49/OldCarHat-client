import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useBuyer from "../hooks/useBuyer";

const BuyerRoute = ({ children }) => {
    const [isBuyer, isBuyerLoading] = useBuyer();
    const {user, loading} = useAuth();

    if(loading || isBuyerLoading) return <progress className="progress w-56"></progress>;

    if(user && isBuyer){
        return children;
    }
    return  <Navigate to="/buyer-not-found"></Navigate>;
};

export default BuyerRoute;