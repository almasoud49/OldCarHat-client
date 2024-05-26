import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const ErrorElement = ({ message }) => {
    const {logOut} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
		logOut()
			.then(() => {
				toast.success('Logout Success');
				navigate('/login');
			})
			.catch((err) => console.log(err));
	};

    if (message) {
		return (
			<div className='h-[80vh] flex justify-center items-center uppercase flex-col gap-5'>
				<h4>Access Forbidden</h4>
				<h1 className='text-bold text-8xl'>403!</h1>
				<h3 className='text-3xl'>{message}</h3>
				<div className='flex gap-5 items-center'>
					<Link className='btn btn-primary' to='/'>Go back home</Link>
					<button className='btn btn-warning' onClick={handleLogout}>LOGOUT</button>
				</div>
			</div>
		);
	}

    // return (
    //     <div>
            
    //     </div>
    // );
};

export default ErrorElement;