import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header(props) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the admin is already logged in.
    if (localStorage.getItem('adminInfo')) {
      setLoggedIn(true);
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    window.location.reload();
    navigate('/Admin');
  }

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/adminlogin');
    setLoggedIn(false);
  }

  // Conditionally render the Logout and related elements if the admin is logged in.
  const renderLogout = loggedIn ? (
    <li className="inline ml-auto relative">
      <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
    </li>
  ) : null;

  return (
    <Fragment>
      <nav className="bg-green-500 p-4 top-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <a className="text-white text-3xl font-bold cursor-pointer" onClick={handleClick}>
            {props.title}
          </a>
          <form className="d-flex">
            <ul className="space-x-4 flex ml-auto items-center text-white">
              {renderLogout}
            </ul>
          </form>
        </div>
      </nav>
    </Fragment>
  );
}

export default Header;