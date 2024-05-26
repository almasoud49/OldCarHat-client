import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Blogs from "../pages/Blogs/Blogs";
import ErrorElement from "../pages/ErrorElement/ErrorElement";
import AdminLayout from "../layout/MainLayout/AdminLayout/AdminLayout";
import AllSeller from "../pages/Admin/AllSeller/AllSeller";
import AdminRoute from "./AdminRoute";
import AllBuyer from "../pages/Admin/AllBuyer/AllBuyer";
import AllReportedProduct from "../pages/Admin/ReportedProducts/AllReportedProduct";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    errorElement:<ErrorPage/>,
    children:[
        {
            path:'/',
            element:<Home/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/registration',
          element:<Registration/>
        },
        {
          path:'/blogs',
          element:<Blogs/>
        },
        {
          path: '/admin-not-found',
          element: <ErrorElement message={'You Are Not An Admin'} />,
        },

    ]
  },
  {
    path:"/user/admin",
    element:<AdminLayout/>,
    children:[
      {
        path:"/user/admin",
        element:<AdminRoute><AllSeller/></AdminRoute>
      },
      {
        path:"/user/admin/buyers",
        element: <AdminRoute><AllBuyer/></AdminRoute>
      },
      {
        path: '/user/admin/reported-product',
        element:<AdminRoute><AllReportedProduct/></AdminRoute>
      }
    ]
  }
]);
