import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Blogs from "../pages/Blogs/Blogs";
import ErrorElement from "../pages/ErrorElement/ErrorElement";
import AllSeller from "../pages/Admin/AllSeller/AllSeller";
import AdminRoute from "./AdminRoute";
import AllBuyer from "../pages/Admin/AllBuyer/AllBuyer";
import AllReportedProduct from "../pages/Admin/ReportedProducts/AllReportedProduct";
import AdminLayout from "../layout/AdminLayout/AdminLayout";
import SellerLayout from "../layout/SellerLayout/SellerLayout";
import AddProduct from "../pages/Seller/AddProduct/AddProduct";
import ProductByCategory from "../pages/ProductByCategory/ProductByCategory";
import BuyerLayout from "../layout/BuyerLayout/BuyerLayout";
import BuyerRoute from "./BuyerRoute";
import AllOrder from "../pages/Buyer/AllOrder/AllOrder";
import DisplaySellerProducts from "../pages/Seller/DisplaySellerProducts/DisplaySellerProducts";





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
          path:'/category/:id',
          element: <ProductByCategory/>
        },
        {
          path:'/blogs',
          element:<Blogs/>
        },
        {
          path: '/admin-not-found',
          element: <ErrorElement message={'You Are Not An Admin'} />,
        },
        {
          path: '/seller-not-found',
          element: <ErrorElement message={'You Are Not A Seller'} />,
        },
        {
          path: '/buyer-not-found',
          element: <ErrorElement message={'You Are Not A Buyer'} />,
        },

    ]
  },
  {
    path:"/user/admin",
    element:<AdminLayout/>,
    children:[
      {
        path:"/user/admin",
        element:<AdminRoute><AllSeller/></AdminRoute>,
        
      },
      {
        path:"/user/admin/buyers",
        element: <AdminRoute><AllBuyer/></AdminRoute>
      },
      {
        path: '/user/admin/reported-product',
        // element:<AdminRoute><AllReportedProduct/></AdminRoute>
        element:<AllReportedProduct/>
      }
    ]
  },
  {
    path:'/user/seller',
    element: <SellerLayout/>,
    children:[
      {
        path: '/user/seller',
        element: <AddProduct/>
      },
      {
        path:'/user/seller/all-products',
        element: <DisplaySellerProducts />
      }
    ]
  },
  {
		path: '/user/buyer',
		element: <BuyerLayout />,
		children: [
			{
				path: '/user/buyer',
				element: 
					<BuyerRoute>
						<AllOrder />
					</BuyerRoute>,
				
						// <AllOrder />
					
				
			},
		],
	},
]);
