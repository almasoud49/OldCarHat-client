import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckoutForm = ({ order, reloadOrder, setReloadOrder }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (order.product_info?.product_id ) {
      axiosSecure
        .post(
          `/create-payment-intent/${order.product_info.product_id}`
        )

        .then((res) => {
          const data = res.data;
          setClientSecret(data.clientSecret);
        });
    }
  }, [order.product_info?.product_id, user?.uid, axiosSecure]);

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log(error);
      setCardError(error.message);
      setProcessing(false);
    } else {
      setCardError("");
      setProcessing(true);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const payment = {
        price: order.product_info.product_price,
        transactionId: paymentIntent.id,
        email: user.email,
        orderId: order._id,
        product_id: order.product_info.product_id,
      };
      axiosSecure
        .post(
          `/payments`,
          payment
        )

        .then((res) => {
          const data = res.data;
          console.log(data);
          if (data.insertedId) {
            Swal.fire(
              "Congrats! your payment completed",
              `${paymentIntent.id}`,
              "success"
            );
            setReloadOrder(reloadOrder + 1);
          }
        });
    }
    setProcessing(false);
  };

  return (
    <div className="h-[500px]">
      <div className="w-96 mx-auto p-10 my-20 shadow-md">
        <div className="mb-5">
          <p className="text-2xl">Product Info</p>
          <h1 className="text-lg">
            Payment for {order.product_info?.product_name}
          </h1>
          <p>Price: ${order.product_info?.product_price}</p>
        </div>
        <form onSubmit={handlePayment}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="btn btn-sm mt-9 btn-primary btn-block "
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
        </form>
        <p className="text-red-500">{cardError}</p>
      </div>
    </div>
  );
};

export default CheckoutForm;
