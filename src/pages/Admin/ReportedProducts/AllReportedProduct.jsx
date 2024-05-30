import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const AllReportedProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reportedProducts", user?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reported-products/${user?.uid}`);
      return res.data;
    },
  });

  if (isLoading) return <progress className="progress w-56"></progress>;

  const handleDeleteReportedProduct = (id) => {
    Swal.fire({
      title: "Do you want to delete this Product?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirm",
      denyButtonText: `Don't Confirm`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/report-product-delete/${user?.uid}?id=${id}`)

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
              "Oops! Something went wrong, please try again",
              "",
              "error"
            );
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const handleReportSafe = (id) => {
    Swal.fire({
      title: "Do you want to mark this product as safe?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirm",
      denyButtonText: `Don't Confirm`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/report-product-safe/${user?.uid}?id=${id}`)

          .then((res) => {
            const data = res.data;
            console.log(data);
            if (data.modifiedCount) {
              Swal.fire("Report Undo Success!", "", "success");
              refetch();
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "Oops! Something went wrong, please try again",
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
      <h2 className="text-3xl text-center">All Reported Products</h2>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Seller Name</th>
              <th>Reported By</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <th>
                  <div className="avatar">
                    <div className="w-16 rounded">
                      <img
                        src={product.product_image}
                        alt="Tailwind-CSS-Avatar-component"
                      />
                    </div>
                  </div>
                </th>
                <td>{product.product_name}</td>
                <td>{product.seller_name}</td>
                <td>{product.reportCount} User</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleDeleteReportedProduct(product._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleReportSafe(product._id)}
                    className="btn btn-xs btn-success"
                  >
                    Safe
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

export default AllReportedProduct;
