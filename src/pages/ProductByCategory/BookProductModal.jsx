import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const BookProductModal = ({ bookedProduct, handleProductBooked }) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <input type="checkbox" id="book-product-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <form
          onSubmit={handleSubmit(handleProductBooked)}
          className="modal-box"
        >
          <h3 className="font-bold text-lg uppercase">
            {bookedProduct.product_name}
          </h3>
          <p>Price: ${bookedProduct.resell_price}</p>
          <div className="py-4 space-y-4">
            <input
              type="text"
              defaultValue={user?.displayName}
              disabled
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            <input
              type="uid"
              defaultValue={user?.email}
              disabled
              placeholder="Your Email"
              className="input input-bordered w-full"
            />
            <input
              type="tel"
              placeholder="Your Phone Number"
              className="input input-bordered w-full"
              {...register("customer_phone", {
                required: "Phone number is required",
              })}
            />
            {errors.customer_phone && (
              <p className="text-red-500">{errors.customer_phone?.message}</p>
            )}
            <input
              type="text"
              placeholder="Meeting Location"
              className="input input-bordered w-full"
              {...register("customer_location", {
                required: "Meeting location is required",
              })}
            />
            {errors.customer_location && (
              <p className="text-red-500">
                {errors.customer_location?.message}
              </p>
            )}
          </div>
          <div className="modal-action">
            <button className="btn btn-primary">Confirm</button>
            <label htmlFor="book-product-modal" className="btn">
              Cancel
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookProductModal;
