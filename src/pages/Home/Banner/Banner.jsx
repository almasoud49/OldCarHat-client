import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../../../assets/banner/Mitsubishi_Lancer_Evo_6.png"
import img2 from "../../../assets/banner/Mitsubishi_Outlandar.png"
import img3 from "../../../assets/banner/Nissan_Sunny.png"

const Banner = () => {
   
    return (
        <Carousel>
           <div >
                <img className='h-300px' src={img1} />
             </div>
             <div>
                 <img src={img2} />
             </div>
             <div>
                 <img src={img3} />
             </div>
             
        </Carousel>

   

    );
};

export default Banner;