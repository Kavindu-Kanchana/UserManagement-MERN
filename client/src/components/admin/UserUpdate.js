import React ,{useEffect, useState , Fragment} from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

import Header from './Header';
import Footer from "../Footer";

const Userupdate = () => {
    const [email, setEmail] = useState("")
    const [firstName, setFname] = useState("")
    // const [lastName, setLname] = useState("")
    const [mobile, setPhone] = useState("")
    const navigate=useNavigate()
    const id1 =useParams()

    useEffect(() => {
      const getUser = async () =>{
          const {data} = await axios.get(`/api/admin/edit/${id1.id}`)
          setEmail(data.email)
          setFname(data.firstName)
          // setLname(data.lastName)
          setPhone(data.mobile)
      }
     getUser()
    },[id1.id])
    
    const submitHandling =async (e)=>{
        e.preventDefault()
        
        try {
            const config ={
                headers: {
                    "Content-type":"application/json",
                },
            }
            await axios.patch(`/api/admin/edit/${id1.id}`,{
           firstName,
           mobile,
           email         
            },config)
        
          navigate('/admin-user-mgt')
        }
            catch(error){
                console.log(error.response.data.message);         
            }     
        }

        return (
          <Fragment>
            <div className="min-h-screen flex flex-col">
              <Header title="Admin User Update" />
              <div className="container mx-auto flex-grow py-10">
                <div className="flex justify-center">
                  <div className="w-full sm:w-[50%] lg:w-[50%]">
                    <div className="bg-white p-5 rounded-lg shadow-md">
                      <div className="text-center">
                        <h3 className="text-2xl font-semibold mb-4">Edit User Details</h3>
                      </div>
        
                      <form onSubmit={submitHandling}>
                        <div className="mb-4">
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            className="mt-1 p-3 w-full rounded-md shadow-sm border border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
                            value={firstName}
                            onChange={(e) => setFname(e.target.value)}
                            required
                          />
                        </div>
        
                        <div className="mb-4">
                          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                            Mobile Number
                          </label>
                          <input
                            id="mobile"
                            type="number"
                            className="mt-1 p-3 w-full rounded-md shadow-sm border border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
                            value={mobile}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
        
                        <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="mt-1 p-3 w-full rounded-md shadow-sm border border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

export default Userupdate
