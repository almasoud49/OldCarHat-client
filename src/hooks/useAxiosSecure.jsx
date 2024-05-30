import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    // headers: {Authorization:`Bearer ${localStorage.getItem('accessToken')}`},

});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useAuth();

 // request interceptor to add authorization header for every secure call to teh api
//  axiosSecure.interceptors.request.use(function (config) {
//     const token = localStorage.getItem('access-token')
//     console.log('request stopped by interceptors', token)
//     config.headers.authorization = `Bearer ${token}`;
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access-token');
      console.log('Access Token in interceptor:', token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log('Request Headers:', config.headers);  // Log the headers
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Intercepts 401 and 403 status codes
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response ? error.response.status : null;
      console.log('Error status in interceptor:', status);
      if (status === 401 || 403) {
        await logOut();
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};
    
    // intercepts 401 and 403 status
    // axiosSecure.interceptors.response.use(function (response) {
    //     return response;
    // }, async (error) => {
    //     const status = error.response.status;
    //     console.log('status error in the interceptor', status);
    //     // for 401 or 403 logout the user and move the user to the login
    //     if (status === 401 || status === 403) {
    //         await logOut();
    //         navigate('/login');
    //     }
    //     return Promise.reject(error);
    // });

// return axiosSecure;
// };

export default useAxiosSecure;