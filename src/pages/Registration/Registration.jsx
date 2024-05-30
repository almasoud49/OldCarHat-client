import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";

const Registration = () => {
  const axiosPublic = useAxiosPublic();
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const { createUser, updateUserProfile ,logOut} = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    setCreateUserLoading(true);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    handleCreateUser(data, formData);
  };

  const handleCreateUser = (data, formData) => {
    createUser(data.email, data.password)
      .then((res) => {
        getImgLink(formData, res, data);
      })
      .catch((err) => {
        console.log(err);
        setCreateUserLoading(false);
        toast.error(err.message);
      });
  };

  const getImgLink = (formData, user, data) => {
    fetch(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOSTING_KEY
      }`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imgData) => {
        savedUserInDb(data, user?.user?.uid, imgData.data?.url);
        handleUpdateUserProfile(data?.name, imgData.data?.url);
      })
      .catch((err) => {
        console.log(err);
        setCreateUserLoading(false);
        toast.error(
          "Failed to save your picture! you can upload again from profile section"
        );
      });
  };

  const handleUpdateUserProfile = (name, photoURL) => {
    const profileData = { displayName: name, photoURL };
    updateUserProfile(profileData)
      .then(() => {
        setCreateUserLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registration Success",
          message: "Now you can Login",
          showConfirmButton: false,
          timer: 2500,
        });
        logOut()
        reset()
          .then(() => {
            navigate("/login");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        setCreateUserLoading(false);
      });
  };

  const savedUserInDb = (data, uid, photoURL) => {
    const userInfo = {
      displayName: data.name,
      email: data.email,
      photoURL: photoURL,
      role: data.role,
      uid: uid,
      status: "unverified",
    };

    axiosPublic
      .post("/users", userInfo)
      .then((res) => {
        console.log('User Saved',res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-center">
          <h1 className="text-5xl font-bold">Register Now</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="card-body"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered"
                {...register("name", { required: "name is required" })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
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
                {...register("email", { required: "email is required" })}
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
              {createUserLoading && (
                <div className="flex justify-center">
                  <progress className="progress w-56"></progress>
                </div>
              )}
              {!createUserLoading && (
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              )}
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
