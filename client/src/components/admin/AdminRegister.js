import React, { useState, Fragment } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

import Header from './Header';
import Footer from "../Footer";


function AdminRegister() {

  // const [fname, setFname] = useState("")
  // const [lname, setLname] = useState("")
  // const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/admin/adminregister", {
        email,
        password,
      }, config)
      console.log(data);
      navigate('/adminlogin')
    }
    catch (error) {
      console.log(error.response.data.message);
    }
  }

  return (
    <Fragment>
      <div className="min-h-screen flex flex-col">
        <Header title={"Admin Register"} />
        <div className="container mx-auto flex-grow py-10">
          <div className="flex justify-center">
            <div className="w-full sm:w-[50%] lg:w-[50%]">
              <div className="bg-white p-5 rounded-lg shadow-md">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold mb-4">Create an Admin Account</h3>
                </div>
                <form action="" className="form" onSubmit={submitHandler}>
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
                      Submit
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
export default AdminRegister