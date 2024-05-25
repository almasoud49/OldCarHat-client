import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Registration = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleRegistration = (data) => {
    const image = data.image[0];
		const formData = new FormData();
		formData.append('image', image);
		handleCreateUser(data, formData);
  };

  const handleCreateUser = (data, formData) => {
    createUser(data.email, data.password)
    .then((res)=> {
      getImgLink(formData, res, data);
    })
    .catch((err)=> {
      console.log(err)
      toast.error(err.message)
    });
  };

  const getImgLink = (formData, user, data) =>{
    fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}` , {
      method: 'POST',
      body: formData,
    })
    .then((res) => res.json())
			.then((imgData) => {
				savedUserInDb(data, user?.user?.uid, imgData.data?.url);
				handleUpdateUserProfile(data?.name, imgData.data?.url);
			})
      .catch((err) => {
				console.log(err);
				
				toast.error(
					'Failed to save your picture! you can upload again from profile section'
				);
			});
  }

  const handleUpdateUserProfile = (name, photoURL) => {
		const profileData = { displayName: name, photoURL };
		updateUserProfile(profileData)
			.then(() => {
				
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Registration Success',
					message: 'Now you can Login',
					showConfirmButton: false,
					timer: 2500,
				});
				reset()
        
					.then(() => {
						navigate('/login');
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => {
				console.log(err);
				
			});
	};
	const savedUserInDb = (data, uid, photoURL) => {
		const userInfo = {
			displayName: data.name,
			email: data.email,
			photoURL: photoURL,
			role: data.role,
			uid: uid,
			status: 'unverified',
		};
		axiosPublic
			.post('/users',  userInfo)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	};

    // createUser(data.email, data.password).then((result) => {
    //   const loggedUser = result.user;
    //   console.log(loggedUser);
    //   updateUserProfile(data.name, data.photoURL)
    //     .then(() => {
    //       const userInfo = {
    //         displayName: data.name,
    //         email: data.email,
            
    //         role: data.role,
    //         uid: data?.user?.uid,
    //         status: "unverified",
    //       };
    //       axiosPublic.post("/users", userInfo).then((res) => {
    //         if (res.data.insertedId) {
    //           console.log("user added to the database");
    //           reset();
    //           Swal.fire({
    //             position: "top-end",
    //             icon: "success",
    //             title: "User Created Successfully.",
    //             showConfirmButton: false,
    //             timer: 1500,
    //           });
    //           navigate("/");
    //         }
    //       });
    //     })
    //     .catch((error) => console.log(error));
    // });
 

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-center">
          <h1 className="text-5xl font-bold">Register Now</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Photo</span>
              </label>
              <input
                type="file"
                placeholder="Photo"
                className="input input-bordered"
                {...register("image", {
                  required: "Image is required",
                })}
              />
              {errors.image && (
                <p className="text-red-500">{errors.image?.message}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">You are a?</span>
              </label>
              <select
                {...register("role", {
                  required: "Role is required",
                })}
                defaultValue="buyer"
                className="select select-bordered w-full"
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
              {errors.role && (
                <p className="text-red-500">{errors.role?.message}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p className="text-center text-sm text-gray-500">
              Have Already an Account? Please{" "}
              <Link className="underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
