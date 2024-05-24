import { Outlet } from "react-router-dom";
import Footer from "../../pages/shared/Footer/Footer";
import NavBar from "../../pages/shared/NavBar/NavBar";

const MainLayout = () => {
    return (
        <div>
           <NavBar/>
           <div className='w-11/12 mx-auto mt-20'>
            <Outlet/>
            </div> 
           <Footer/>
        </div>
    );
};

export default MainLayout;