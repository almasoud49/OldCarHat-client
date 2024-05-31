import { format } from 'date-fns';
import { useEffect, useState } from "react";
import { MdOutlineVerifiedUser, MdReportProblem } from "react-icons/md";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ProductByCategoryCard = ({
  product,
  setBookedProduct,
  handleReport,
  isBuyer,
}) => {
  const [verifiedSeller, setVerifiedSeller] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {
    product_name,
		product_description,
		product_image,
		category,
		condition,
		resell_price,
		original_price,
		year_of_used,
		seller_location,
		seller_phone,
		seller_email,
		seller_name,
		seller_uid,
		seller_image,
		createAt,
		reported,
		order_status,
  } = product;

  useEffect(() => {
    if ((seller_uid)) {
      axiosSecure.get(`/seller-verify/${(seller_uid)}`)
        
        .then((res) => {
          const data = res.data;
          setVerifiedSeller(data.isVerified);
        });
    }
  }, [(seller_uid), axiosSecure]);
  return (
    <div className="block rounded-lg p-4 shadow-sm hover:shadow-md shadow-indigo-100 h-full">
      <img
        alt="Home"
        src={product_image}
        className="h-56 w-full rounded-md object-contain"
      />

      <div className="mt-2 space-y-3">
        <p className="font-medium text-lg uppercase">{product_name}</p>

        <div className="uppercase">
          <p className="flex items-center mb-2 font-medium">
            By: {seller_name}{" "}
            <span>
              {verifiedSeller ? (
                <MdOutlineVerifiedUser className="text-primary text-sm rounded-full ml-1" />
              ) : (
                ""
              )}
            </span>
          </p>
          <div className="flex justify-between">
            <p>used: {year_of_used} year</p>
            <p>Condition: {condition}</p>
          </div>
          <div>
            <div className="flex justify-between">
              <p className="">Resell Price: ${resell_price}</p>
              <p>Original Price: ${original_price}</p>
            </div>
          </div>

          <div className="my-3">
            <div className="flex justify-between text-sm">
              <p>{seller_location}</p>
              <p>{format(new Date(createAt), "Pp")}</p>
            </div>
          </div>
          <div className="mb-3 text-right"></div>
        </div>
        <div className="flex gap-2 justify-between">
          {isBuyer ? (
            <>
              {!order_status ? (
                <>
                  <label
                    htmlFor="book-product-modal"
                    className="btn btn-primary"
                    onClick={() => setBookedProduct(product)}
                  >
                    Book Now
                  </label>
                  <button
                    onClick={() =>
                      handleReport(product._id, product.reportCount)
                    }
                    className="btn btn-error text-white"
                  >
                    <MdReportProblem /> Report
                  </button>
                </>
              ) : (
                <p className="uppercase text-red-400 italic font-bold">
                  sold out
                </p>
              )}
            </>
          ) : (
            <p className="text-red-400 italic font-bold">
              Please login with buyer account for buy this product
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductByCategoryCard;
