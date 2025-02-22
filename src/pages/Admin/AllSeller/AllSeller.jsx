import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineVerifiedUser } from "react-icons/md";
import Swal from "sweetalert2";

const AllSeller = () => {
  const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
  
  //get all seller
    const {
    data: sellers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sellers", user?.uid],
    queryFn: async () => {
      if(!user?.uid){
        return [];
      }
      const res = await axiosSecure.get(
        `/users-by-role/${user?.uid}?role=seller`
      );
      console.log("Access Token:", localStorage.getItem("access-token"));
      return res.data;
    },
    enabled:!!user?.uid
  });

  if (isLoading) return <progress className="progress w-56"></progress>;

  //verify user as seller
  const handleConfirmVerify = (id) => {
    Swal.fire({
      title: "Do you want to verify this seller?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirm Verified",
      denyButtonText: `Don't Confirm`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/seller-verify/${user?.uid}?id=${id}`)
          .then((res) => {
            const data = res.data;
            if (data.modifiedCount) {
              refetch();
              Swal.fire("Verified Success!", "", "Success");
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "Something Went Wrong, Please Try Again",
              "",
              "error"
            );
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  //delete seller
  const handleUserDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete this buyer?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirm Deletion",
      denyButtonText: `Don't Confirm`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user-delete/${user?.uid}?id=${id}`)
          .then((res) => {
            const data = res.data;
            if (data.deletedCount) {
              Swal.fire("Deleted Successfully!", "", "Success");
              refetch();
            } else {
              Swal.fire("No user was deleted.", "", "Info");
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "Something Went Wrong, Please Try Again",
              "",
              "error"
            );
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="w-screen md:w-[calc(100vw-240px)]">
      <div className="divider"></div>
      <h2 className="text-3xl text-center">All Seller List</h2>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sellers?.map((seller, i) => (
             
              <tr key={seller._id}>
                <th>{i + 1}</th>
                <td className="flex items-center">
                  {seller?.displayName }{" "}
                  
                  <span>
                    {seller?.status === "verified" ? (
                      <MdOutlineVerifiedUser className="text-primary text-sm rounded-full ml-1" />
                    ) : (
                      ""
                    )}
                  </span>
                </td>
                <td>{seller.email}</td>
                <td>
                  {seller?.status !== "verified" ? (
                    <button
                      onClick={() => handleConfirmVerify(seller._id)}
                      className="btn btn-xs btn-primary"
                    >
                      Confirm Verify
                    </button>
                  ) : (
                    <p className="text-sm text-green-500 text-bold">Verified</p>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleUserDelete(seller._id)}
                    className="btn btn-xs btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSeller;
