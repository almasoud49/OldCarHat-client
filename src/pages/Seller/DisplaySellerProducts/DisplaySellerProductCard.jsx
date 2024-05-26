
const DisplaySellerProductCard = ({
	product,
	handleProductDelete,
	handleProductPromote,
}) => {

    const {
		product_name,
		product_image,
		category_name,
		_id,
		order_status,
		promote,
	} = product;

    return (
<div className='relative block rounded-lg p-4 shadow-sm shadow-indigo-100 h-full'>
			<div className=''>
				<img
					alt='Home'
					src={product_image}
					className='h-56 w-full rounded-md object-contain'
				/>
				<span className='absolute top-4 z-10 inline-flex items-center rounded-full bg-gray-400 px-3 py-1 text-xs font-semibold text-white'>
					{category_name}
				</span>
			</div>
			<div className='mt-2'>
				<dl>
					<div>
						<p className='font-medium'>{product_name}</p>

						<p className='text-sm text-gray-500'>$240,000</p>
					</div>

					<div className='uppercase'>
						{order_status ? (
							<div className='text-xs badge badge-success badge-outline'>
								SOLD
							</div>
						) : (
							<div className='text-xs badge badge-error badge-outline'>
								UNSOLD
							</div>
						)}
					</div>
				</dl>

				<div className='flex justify-between my-5'>
					<button
						className='btn btn-sm btn-error'
						onClick={() => handleProductDelete(_id)}
					>
						Delete
					</button>
					{!order_status && !promote && (
						<button
							className='btn btn-sm btn-primary'
							onClick={() => handleProductPromote(_id)}
						>
							Promote
						</button>
					)}
				</div>
			</div>
		</div>
    );
};

export default DisplaySellerProductCard;