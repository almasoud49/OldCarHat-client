
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth"
import { GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ProviderLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        googleSignIn(provider)
        .then((res)=> {
            const user = res.user;
            toast.success('Login Success');
            savedUserInDb(user)
            navigate(from, {replace: true})
        })
        .catch((err) => toast.error(err.message));
    };

    const savedUserInDb = (data) => {
		const userInfo = {
			displayName: data.displayName,
			email: data.email,
			photoURL:data.photoURL,
			role: 'buyer',
			uid: data.uid,
			status: 'unverified',
		};
		axiosPublic
			.post( "/users", userInfo)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	};


    return (
<div className='flex justify-center'>
			<div
				onClick={handleGoogleLogin}
				className='btn btn-ghost flex justify-center items-center gap-3 border border-gray-300 shadow'
			>
				
				<span>Continue With Google</span>
			</div>
		</div>
    );
};

export default ProviderLogin;