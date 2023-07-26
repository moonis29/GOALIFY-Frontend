import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/features/auth.slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    // window.location.reload();
  };

  return (
    <nav className="bg-blue-500 text-white py-4 uppercase">
      <div className="w-[90%] container mx-auto flex items-center justify-between">
        <h1 className="text-2xl">
          <Link to={user ? "/dashboard" : "/"}>Goalify</Link>
        </h1>
        <ul className="flex items-center gap-5 text-lg">
          {user ? (
            <>
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
              <li
                className="bg-red-500 rounded-md py-2 px-3"
                onClick={handleLogout}
              >
                Signout
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/login"}>Signin</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
