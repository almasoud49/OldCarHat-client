import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AllBuyer = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: buyers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["buyers", user?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users-by-role/${user?.uid}?role=buyer`);

      return res.data;
    },
  });

  if (isLoading) return <progress className="progress w-56"></progress>;

  //delete buyer
  const handleUserDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete this buyer?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirm Verified",
      denyButtonText: `Don't Confirm`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/user-delete/${user?.uid}?id=${id}`)

          .then((res) => {
            const data = res.data;
            if (data.deletedCount) {
              Swal.fire("Deleted Success!", "", "success");
              refetch();
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
      <h2 className="text-3xl text-center">All Buyer List</h2>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {buyers?.map((buyer, i) => (
              <tr key={buyer._id}>
                <th>{i + 1}</th>
                <td>{buyer.displayName}</td>
                <td>{buyer.email}</td>

                <td>
                  <button
                    onClick={() => handleUserDelete(buyer._id)}
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

export default AllBuyer;
