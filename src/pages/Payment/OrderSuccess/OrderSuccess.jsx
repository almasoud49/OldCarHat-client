import { BsCash } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
<div className='flex justify-center items-center flex-col min-h-[80vh] gap-3'>
            <BsCash className='text-8xl text-green-500' />
            <p className='text-4xl'>Your Order Successfully Placed</p>
            <p className='text-2xl'>Product Shipped Soon</p>
            <Link to='/user/buyer' className='btn btn-success text-white bg-green-500'>Back Order Page</Link>
        </div>
    );
};

export default OrderSuccess;