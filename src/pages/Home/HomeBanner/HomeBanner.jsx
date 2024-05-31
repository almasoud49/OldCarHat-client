import { Link } from "react-router-dom";


const HomeBanner = () => {
    return (
<section className='bg-banner-img '>
			<div className='mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center bg-gradient-to-t from-[#edebeb] to-[#ffffffb0]'>
				<div className='mx-auto max-w-xl text-center'>
					<h1 className='text-3xl text-gray-600 font-extrabold sm:text-5xl uppercase'>
						Join Thousand Used Car.
						<strong className='font-extrabold text-primary sm:block'>
							Old Car Hat.
						</strong>
					</h1>

					<p className='mt-4 sm:text-xl sm:leading-relaxed'>
						You can choose your any necessary here in cheap price
						without any hassles, we handle for it you.
					</p>

					<div className='mt-8 flex flex-wrap justify-center gap-4'>
						<Link
							className='block w-full rounded bg-primary px-12 btn-primary py-3 text-sm font-medium text-white shadow  focus:outline-none focus:ring  sm:w-auto'
							to='/registration'
						>
							Get Started
						</Link>

						<Link
							className='block w-full rounded px-12 py-3 text-sm font-medium  shadow btn-primary focus:outline-none focus:ring sm:w-auto'
							to='/blogs'
						>
							Learn More
						</Link>
					</div>
				</div>
			</div>
		</section>
    );
};

export default HomeBanner;