import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useBuyer = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { data: isBuyer, isLoading: isBuyerLoading } = useQuery({
    queryKey: [user?.uid, "isBuyer"],
    enabled: !!user?.uid && !loading,
    queryFn: async () => {
      if (!user?.uid) return false;
      const res = await axiosSecure.get(`/user/buyer/${user?.uid}`);
      return res.data?.isBuyer;
    },
  });
  return [isBuyer, isBuyerLoading];
};

export default useBuyer;
