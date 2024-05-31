import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useBuyer from "../../hooks/useBuyer";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import BookProductModal from "./BookProductModal";
import ProductByCategoryCard from "./ProductByCategoryCard";

const ProductByCategory = () => {
  const params = useParams();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [bookedProduct, setBookedProduct] = useState({});
  const [orderLoading, setOrderLoading] = useState(false);
  const [isBuyer] = useBuyer();
  const { user } = useAuth();

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["productsByCategory"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/category/${params.id}`);
      return res.data;
    },
  });

  if (isLoading) return <progress className="progress w-56"></progress>;

  const handleProductBooked = (data) => {
    const order = {
      customer_info: {
        customer_name: user?.displayName,
        customer_email: user?.email,
        customer_uid: user?.uid,
        customer_phone: data.customer_phone,
        meeting_location: data.customer_location,
      },
      product_info: {
        product_name: bookedProduct.product_name,
        product_image: bookedProduct.product_image,
        product_price: bookedProduct.resell_price,
        product_id: bookedProduct._id,
        product_category: bookedProduct.category_name,
        product_category_id: bookedProduct.category_id,
      },
      seller_info: {
        seller_name: bookedProduct.seller_name,
        seller_phone: bookedProduct.seller_phone,
        seller_email: bookedProduct.seller_email,
        seller_uid: bookedProduct.seller_uid,
        seller_image: bookedProduct.seller_image,
        seller_location: bookedProduct.seller_location,
      },
      order_status: false,
    };
    setOrderLoading(true);
    fetch(`http://localhost:5000/orders`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          document.getElementById("book-product-modal").checked = false;
          Swal.fire("Order Confirm", "The Seller Contact you soon", "success");
        }
        setOrderLoading(false);
      })
      .catch((err) => {
        setOrderLoading(false);
        Swal.fire("Something was wrong! please try again", "error");
      });
  };

  const handleReport = (id, reportCount) => {
    Swal.fire({
      title: "Do you want to Report this Product?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirm",
      denyButtonText: `Don't Confirm`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(
          `/report-product`
        );

        if (data.success) {
          Swal.fire("Reported Success!", "", "success");
          refetch();
        } else
          (err) => {
            console.log(err);
            Swal.fire(
              "Oops! Something went wrong, please try again",
              "",
              "error"
            );
          };
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

    console.log(id);
  };

  return (
    <div className="">
      <div className="divider"></div>
      <p className="text-2xl">All Product</p>
      <div className="divider"></div>
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductByCategoryCard
            setBookedProduct={setBookedProduct}
            key={product._id}
            product={product}
            handleReport={handleReport}
            isBuyer={isBuyer}
          />
        ))}
      </div>
      {user?.uid && (
        <BookProductModal
          handleProductBooked={handleProductBooked}
          bookedProduct={bookedProduct}
        />
      )}
    </div>
  );
};

export default ProductByCategory;
