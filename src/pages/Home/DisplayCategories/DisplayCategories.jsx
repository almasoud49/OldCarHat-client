import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const DisplayCategories = () => {
    const axiosPublic = useAxiosPublic();

    const { data: categories, isLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const res = await axiosPublic.get(
				`/categories`
			);
			return res.data;
		},
	});

    if(isLoading) return <progress className="progress w-56"></progress>
   
    return (
<div>
			<h1 className='text-lg font-bold mb-3'>Browse items by category</h1>
			<div className='grid grid-cols-2 sm:grid-cols-3 gap-5'>
				{categories?.map((category) => (
					<Link
						to={`/category/${category._id}`}
						className='p-8 text-center rounded-lg text-xl font-semibold bg-slate-100 uppercase shadow-md hover:shadow-xl hover:-translate-y-2 hover:cursor-pointer transition-all'
						key={category._id}
					>
						{category.category_name}
					</Link>
				))}
			</div>
		</div>
    );
};

export default DisplayCategories;