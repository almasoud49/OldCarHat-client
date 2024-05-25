import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth"

const NavBar = () => {
  const {user, logOut} = useAuth();

  const handleLogOut = () => {
    logOut()
    .then(()=>{})
    .catch(error => console.log(error));
  }

  const menuItems = (
    <>
    <li>
      <Link to='/'>Home</Link>
    </li>
    <li>
      <Link to='/blogs'>Blogs</Link>
    </li>

    {
      user ? <> 
          <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
      </> : 
      <> 
          <li>
      <Link to='/login'>Login</Link>
    </li>
      </>
    }

    </>
  )
  return (

<div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            
            {menuItems}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">oldCarHat</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          
          {menuItems}
        </ul>
      </div>
      <div className="navbar-end">
      <>
          {user?.uid ? (
            <>
              <img
                alt="Man"
                src={user?.photoURL}
                className="h-10 w-10 rounded-full object-cover"
              />

              <p className="ml-2 hidden text-left text-xs sm:block">
                <strong className="block font-medium">
                  {user?.displayName}
                </strong>

                <span className="text-gray-500"> {user?.email} </span>
              </p>
            </>
          ) : (
            <Link to="/login" className="btn ">
              Login
            </Link>
          )}
        </>
      </div>
    </div>

  );
};

export default NavBar;
