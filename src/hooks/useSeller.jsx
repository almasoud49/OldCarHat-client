import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSeller = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isSeller, isLoading: isSellerLoading } = useQuery({
    queryKey: [user?.uid, "isSeller"],
    enabled: !loading,
    queryFn: async () => {
      if (!user?.uid) return false;
      const res = await axiosSecure.get(`/user/seller/${user?.uid}`);
      return res.data?.isSeller;
    },
  });
  return [isSeller, isSellerLoading];
};

export default useSeller;
