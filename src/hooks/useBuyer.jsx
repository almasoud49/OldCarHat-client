import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBuyer = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const {data: isBuyer, isPending:isBuyerLoading} = useQuery({
        queryKey: [user?.uid, 'isBuyer'],
        enabled: !loading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/user/buyer/${user?.uid}`);
            return res.data?.buyer;
        }
    })
    return [isBuyer, isBuyerLoading]
};

export default useBuyer;