import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSeller = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isSeller, isPending: isSellerLoading } = useQuery({
    queryKey: [user?.uid, "isSeller"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/seller/${user?.uid}`);
      return res.data?.seller;
    },
  });
  return [isSeller, isSellerLoading];
};

export default useSeller;
