import React, { useState, useEffect, Fragment } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
//import ErrorMessage from '../ErrorMessage';

import Header from './Header';
import Footer from "../Footer";

const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  let navigate = useNavigate();

  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo")
    if (adminInfo) {
      navigate('/admin')
    } else {
      navigate("/Adminlogin")
    }
  }, [navigate])

  const adSubmitHandle = async (e) => {
    e.preventDefault()

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }

      const { data } = await axios.post("/api/admin/adminlogin", {
        email,
        password,
      }, config)
      console.log(data);
      localStorage.setItem("adminInfo", JSON.stringify(data))
      if (localStorage.adminInfo) {
        navigate('/admin')
      }

    } catch (error) {
      setError("Invalid Login")
    }
  }

  // function handleClick(e) {
  //   e.preventDefault()
  //   navigate('/adminregister');
  // }

  return (
    <Fragment>
      <div className="min-h-screen flex flex-col">
        <Header title={"Admin Login"} />
        <div className="container mx-auto flex-grow py-10">
          <div className="flex justify-center">
            <div className="w-full sm:w-[50%] lg:w-[50%]">
              <div className="bg-white p-5 rounded-lg shadow-md">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold mb-4">Admin Login</h3>
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <form onSubmit={adSubmitHandle}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="mt-1 p-3 w-full rounded-md shadow-sm border border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="mt-1 p-3 w-full rounded-md shadow-sm border border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
                      value={password}
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <button
                      className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:ring focus:ring-indigo-200"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  )
}

export default AdminLogin