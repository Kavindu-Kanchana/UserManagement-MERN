import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImage from "../assets/profile.png";
import { useAuth } from "./AuthContext";
import useFetch from '../hooks/fetch.hook';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { state, dispatch } = useAuth(); // Use your AuthContext
  const [{ apiData}] = useFetch();

  const openDropdown = () => {
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const isLoggedIn = state.isLoggedIn;
  const user = state.user;

  const navigate = useNavigate();

  function userLogout() {
    localStorage.removeItem('token');
    dispatch({ type: "LOGOUT" });
    navigate('/');
    
    window.location.reload();
  }

  return (
    <nav className="bg-green-500 p-4 top-0 w-full z-10">
      <div className="container mx-auto flex justify between items-center">
        <Link to="/" className="text-white text-3xl font-bold">
          Ayurvedic Spa
        </Link>
        <ul className="space-x-4 flex ml-auto items-center text-white">
          <li className="inline">
            <Link to="/">Home</Link>
          </li>
          <li className="inline">
            <Link to="/packages">Packages</Link>
          </li>
          <li className="inline">
            <Link to="/appointment">Appointment</Link>
          </li>
          <li className="inline">
            <Link to="/about-us">About Us</Link>
          </li>
          <li
            className="inline ml-auto relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <div className="group cursor-pointer">
              <img
                src={apiData?.profile || profileImage}
                alt="User Profile"
                className="w-10 h-10 rounded-full"
              />
              <div
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } absolute right-0 mt-0 w-40 p-3 bg-white text-black rounded-lg shadow-lg z-10`}
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <ul className="py-1">
                  {isLoggedIn ? (
                    <>
                      <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                        <Link to="/mainprofile">My Account</Link>
                      </li>
                      <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                        <span onClick={userLogout}>Logout</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                        <Link to="/login">Login</Link>
                      </li>
                      <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                        <Link to="/register">Register</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;