import DisplayPromoteProduct from "../../Promote/DisplayPromoteProduct"
import Banner from "../Banner/Banner";
import DisplayCategories from "../DisplayCategories/DisplayCategories";


const Home = () => {
    return (
        <div>
            <Banner/>
            <DisplayPromoteProduct />
           <DisplayCategories/>
        </div>
    );
};

export default Home;