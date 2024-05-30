import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import PromotedCard from "./PromotedCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

const DisplayPromoteProduct = () => {
  const axiosPublic = useAxiosPublic();

  const { data: products, isLoading } = useQuery({
    queryKey: ["promotedProduct"],
    queryFn: async () => {
      const res = await axiosPublic.get("/promoted-product");
      return res.data;
    },
  });

  if (isLoading) {
    return;
  }

  return (
    <>
      {products.length > 0 && (
        <div className="p-2">
          <p className="underline font-semibold">Advertisement</p>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              720: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Pagination]}
            className="grid h-full"
          >
            {products?.map((product) => (
              <SwiperSlide key={product._id}>
                <PromotedCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default DisplayPromoteProduct;
