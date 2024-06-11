import React from 'react';

import { Link } from 'react-router-dom';

import Header from './Header';
import Footer from '../Footer';
import avatar from '../../assets/Adminpp.png';


const AdminHome = () => {

    return (
        <div className="min-h-screen flex flex-col">
            <Header title={"Admin Home"} />
                <div className="container mx-auto flex-grow py-8">
                    <div className="flex justify-center items-center"> {/* Center the content */}
                        <div className="w-2/4 h-3/4 bg-white rounded-lg shadow-md text-center p-2"> {/* Square-shaped container */}
                            <img
                                src={avatar} // Display the Admin profile picture
                                alt="Admin Profile"
                                className="w-48 h-48 mx-auto mt-8 rounded-full"
                            />
                            <p className="text-3xl font-bold mt-4">Admin</p>
                            <Link to="/admin-user-mgt"> {/* Link to User Management */}
                                <button className="bg-green-500 text-white p-4 rounded-lg text-xl mt-8 hover:bg-green-600 focus:ring focus:ring-green-200">
                                    User Management
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>       
    )
    
};

export default AdminHome;