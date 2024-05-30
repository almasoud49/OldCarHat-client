import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import  {  useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import OrderSuccess from '../OrderSuccess/OrderSuccess';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const PaymentPage = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [order, setOrder] = useState({});
	const [orderLoading, setOrderLoading] = useState(false);
	const [reloadOrder, setReloadOrder] = useState(0);
	const param = useParams();


    useEffect(() => {
		setOrderLoading(true);
		if (user?.uid) {
			axiosSecure
				.get(
					`/order/${user?.uid}?id=${param?.id}`)
				.then((res) => {
                    const data = res.data
					console.log(data);
					setOrder(data.data);
					setOrderLoading(false);
				});
		}
	}, [param?.id, user?.uid, reloadOrder, axiosSecure]);

    if (orderLoading) {
		return <progress className="progress w-56"></progress>;
	}

    return (
        <>
           {!order.order_status && (
				<Elements stripe={stripePromise}>
					<CheckoutForm
						order={order}
						setReloadOrder={setReloadOrder}
						reloadOrder={reloadOrder}
					/>
				</Elements>
			)}
			{order.order_status && <OrderSuccess />} 
        </>
    );
};

export default PaymentPage;