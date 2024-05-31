import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import OrderSuccess from '../OrderSuccess/OrderSuccess';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentPage = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [order, setOrder] = useState(null); 
    const [orderLoading, setOrderLoading] = useState(true); 
    const [reloadOrder, setReloadOrder] = useState(0);
    const param = useParams();

    useEffect(() => {
        if (user) {
            axiosSecure
                .get(`/order/${param?.id}`)
                .then((res) => {
                    const data = res.data;
                    console.log(data);
                    if (data.success) {
                        setOrder(data.data);
                    } else {
                        console.error('Order not found');
                    }
                })
                .catch((error) => {
                    console.error("Error fetching order:", error);
                })
                .finally(() => {
                    setOrderLoading(false); // Stop loading regardless of success or error
                });
        } else {
            setOrderLoading(false); // Stop loading if user is not available
        }
    }, [param?.id, user, reloadOrder, axiosSecure]);

    if (orderLoading) {
        return <progress className="progress w-56"></progress>;
    }

    if (!order) {
        return <div>No order found.</div>; 
    }

    return (
        <>
            {order.order_status ? (
                <OrderSuccess />
            ) : (
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        order={order}
                        setReloadOrder={setReloadOrder}
                        reloadOrder={reloadOrder}
                    />
                </Elements>
            )}
        </>
    );
};

export default PaymentPage;