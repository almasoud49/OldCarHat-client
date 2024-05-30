import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const DisplaySellerProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.uid],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${user?.uid}`, {
        headers: `Bearer ${localStorage.getItem("accessToken")}`,
      });
      return res.data;
    },
  });

  const handleProductDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete this Product?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirm",
      denyButtonText: `Don't Confirm`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/product-delete/${user?.uid}?id=${id}`, {
            headers: `Bearer ${localStorage.getItem("accessToken")}`,
          })

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

  const handleProductPromote = (id) => {
    Swal.fire({
      title: "Do you want to Promote this Product?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirm",
      denyButtonText: `Don't Confirm`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .patch(`/promote-product/${user?.uid}?id=${id}`, {
            headers: `Bearer ${localStorage.getItem("accessToken")}`,
          })

          .then((res) => {
            const data = res.data;
            Swal.fire({
              title: "Promoted Success!",
              text:
                data.message || "The product has been promoted successfully.",
            });
            refetch();
          })
          .catch((err) => {
            const errorMessage =
              err.response?.data?.message ||
              err.message ||
              "Oops! Something went wrong, please try again";
            Swal.fire({
              title: "Error",
              text: errorMessage,
            });
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

    console.log(id);
  };

  if (isLoading) return <progress className="progress w-56"></progress>;
  console.log(products);

  return (
    <div className="w-screen md:w-[calc(100vw-240px)]">
      <div className="divider"></div>
      <h2 className="text-3xl text-center">All order List</h2>
      <div className="divider"></div>
      {products.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Category Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Advertise</th>
                <th>Action</th>
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
                  <td>{product.category_name}</td>
                  <td>${product.resell_price}</td>
                  <td>
                    <div className="uppercase">
                      {product.order_status ? (
                        <div className="text-xs badge badge-success badge-outline">
                          SOLD
                        </div>
                      ) : (
                        <div className="text-xs badge badge-error badge-outline">
                          UNSOLD
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    {!product.order_status && !product.promote ? (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleProductPromote(product._id)}
                      >
                        Promote
                      </button>
                    ) : (
                      <p className="text-sm text-green-500">Promoted</p>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleProductDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="italic ">You have not placed any order yet!</p>
      )}
    </div>
  );
};

export default DisplaySellerProducts;
