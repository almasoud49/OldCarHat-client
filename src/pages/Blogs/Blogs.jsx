import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Blog from "./Blog";

const Blogs = () => {
  const axiosPublic = useAxiosPublic();
  

  const {data: blogs, isLoading} = useQuery({
    queryKey:['blogs'],
    queryFn: async()=>{
      const res = await axiosPublic.get('/blogs');
      return res.data;
    }
  });

  if(isLoading) return <progress className="progress w-56"></progress>
    return (
        <div>
          <div className='divider'></div>
          <h2 className='text-3xl text-center'>Blogs</h2>
          <div className='divider'></div>
<div className='space-y-10'>
{blogs?.map((blog)=>( <Blog key={blog._id} blog={blog}/>))}
</div>
        </div>
    );
};

export default Blogs;