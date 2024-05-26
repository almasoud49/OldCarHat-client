import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure"
import useAuth from "./useAuth";

const useAdmin = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: isAdmin, isPending:isAdminLoading} = useQuery({
        queryKey: [user?.uid, 'isAdmin'],
        enabled: !loading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/user/admin/${user?.uid}`);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;