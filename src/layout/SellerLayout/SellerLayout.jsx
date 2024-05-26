import { BsBorderAll } from 'react-icons/bs';
import useAuth from '../../hooks/useAuth';
import { Link, Outlet } from 'react-router-dom';
import { GrChapterAdd } from 'react-icons/gr';
import logo from '../../assets/logo.jpg';

const SellerLayout = () => {
        
    const {user} = useAuth();

    const menuItems = (
		<>
			<Link
				to='/user/seller'
				href='#'
				className='flex items-center rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700'
			>
				<GrChapterAdd />

				<span className='ml-3 text-sm font-medium'>
					{' '}
					Add A Product{' '}
				</span>
			</Link>
			<Link
				to='/user/seller/all-products'
				href='#'
				className='flex items-center rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700'
			>
				<BsBorderAll />

				<span className='ml-3 text-sm font-medium'> My Products </span>
			</Link>
		</>
	);
    return (
<div className='relative'>
			<div>
				<div className='navbar bg-base-100 md:hidden'>
					<div className='flex-1'>
						<Link to='/' className='w-24'>
							<img src={logo} alt='' />
						</Link>
					</div>
					<div className='flex-none'>
						<div className='dropdown dropdown-end'>
							<div className='sticky inset-x-0 bottom-0 border-t border-gray-100'>
								<Link className='flex shrink-0 items-center bg-white p-4 hover:bg-gray-50'>
									<img
										alt='Man'
										src={user?.photoURL}
										className='h-10 w-10 rounded-full object-cover'
									/>

									<div className='ml-1.5'>
										<p className='text-xs'>
											<strong className='block font-medium'>
												{user?.displayName}
											</strong>

											<span> {user?.email} </span>
										</p>
									</div>
								</Link>
							</div>
							<ul
								tabIndex={0}
								className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
							>
								{menuItems}
							</ul>
						</div>
					</div>
				</div>
				<div className={`fixed`}>
					<div className='md:flex h-screen flex-col justify-between border-r bg-white hidden'>
						<div className='px-4 py-6'>
							<Link to='/' className='flex justify-center'>
								<img className='w-28' src={logo} alt='' />
							</Link>

							<nav
								aria-label='Main Nav'
								className='mt-6 flex flex-col space-y-3'
							>
								{menuItems}
							</nav>
						</div>

						<div className='sticky inset-x-0 bottom-0 border-t border-gray-100'>
							<Link className='flex shrink-0 items-center bg-white p-4 hover:bg-gray-50'>
								<img
									alt='Man'
									src={user?.photoURL}
									className='h-10 w-10 rounded-full object-cover'
								/>

								<div className='ml-1.5'>
									<p className='text-xs'>
										<strong className='block font-medium'>
											{user?.displayName}
										</strong>

										<span> {user?.email} </span>
									</p>
								</div>
							</Link>
						</div>
					</div>
				</div>
				<div className={`md:left-60 md:absolute`}>
					<Outlet />
				</div>
			</div>
		</div>
    );
};

export default SellerLayout;