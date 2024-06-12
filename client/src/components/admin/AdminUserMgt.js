import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import Footer from '../Footer';
import avatar from '../../assets/profile.png';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminUserMgt = () => {
    const [search, setSearch] = useState('');
    const [initialData, setInitialData] = useState([]); // Store initial data separately
    const [arr, setArr] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const adminInfo = localStorage.getItem('adminInfo');
            if (adminInfo) {
                try {
                    const config = {
                        headers: {
                            'Content-type': 'application.json',
                        },
                    };
                    const { data } = await axios.get('/api/admin', config);
                    setArr(data);
                    setInitialData(data); // Store the initial data
                } catch (error) {
                    console.error('Error fetching data:', error);
                    // Handle the error, e.g., show an error message to the user.
                }
            } else {
                navigate('/adminlogin');
            }
        };

        fetchData();
    }, [refresh, navigate]);

    // Function to generate PDF report
    const generatePDF = async () => {
        try {
            const doc = new jsPDF();
    
            // Set header and footer
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('User Details Report', 105, 10, null, null, 'center');
            doc.setFont('helvetica', 'normal'); // Reset font style to normal
            doc.text('Page 1 of 1', 105, doc.internal.pageSize.height - 10, null, null, 'center');
    
            // Define table headers and data
            const tableHeaders = ['Name', 'Username', 'Email', 'Mobile', 'Address'];
            const tableData = arr.map((e) => [
                `${e.firstName} ${e.lastName}`,
                e.username,
                e.email,
                e.mobile,
                e.address,                
            ]);
    
            // Add total users count
            const totalUsers = arr.length;
            doc.setFont('helvetica', 'bold');
            doc.text(`Total Users: ${totalUsers}`, 10, 20);
            doc.setFont('helvetica', 'normal');
    
            // Set styling for the table
            doc.autoTable({
                head: [tableHeaders],
                body: tableData,
                startY: 25,
                theme: 'striped', // Add alternate row colors
                margin: { top: 25 }, // Add padding to the table
                headStyles: { fillColor: [0, 176, 80], fontStyle: 'bold', textColor: [255, 255, 255] }, // White text and green background for the headers
            });
    
            // Save the PDF with a filename based on the current date and time
            const filename = `user_details_report_${new Date().toISOString()}.pdf`;
            doc.save(filename);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };   

    const clickHandler = async (id) => {
        if (window.confirm('Sure to Delete?')) {
            try {
                const config = {
                    headers: {
                        'Content-type': 'application.json',
                    },
                };
                await axios.delete(`/api/admin/delete/${id}`, config);
                setRefresh(!refresh);
            } catch (error) {
                console.error('Error deleting item:', error);
                // Handle the error, e.g., show an error message to the user.
            }
        }
    };

    const editHandle = (id) => {
        navigate(`/edit/${id}`);
    };

    const searchHandler = (e) => {
        e.preventDefault();
        const filteredData = initialData.filter((item) => {
            return item.firstName.toLowerCase().includes(search.toLowerCase());
        });
        setArr(filteredData);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header title={'Admin User Management'} />
            <div className="container mx-auto flex-grow py-5">
                <div className="p-5 text-center">
                    <div className="container mx-auto">
                        <form onSubmit={searchHandler} className="flex justify-center">
                            <input
                                type="text"
                                placeholder="Search by First Name"
                                onChange={(e) => setSearch(e.target.value)}
                                className="mr-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
                                value={search}
                            />
                            <button type="submit" className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:ring focus:ring-green-200">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
                <div className="container mx-auto p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {arr.map((e) => {
                            return (
                                <div key={e._id} className="bg-white p-5 rounded-lg shadow-md flex flex-col">
                                    <div className="flex flex-row items-start justify-between w-full mb-4">
                                        <div>
                                            <h2 className="text-xl font-semibold mb-2">{e.firstName} {e.lastName}</h2>
                                            <p className="text-gray-600">{e.username}</p>
                                            <p className="text-gray-600">{e.email}</p>
                                            <p className="text-gray-600">{e.mobile}</p>                                                             
                                        </div>
                                        <div className="w-20 h-20 rounded-full ml-5">
                                            <img
                                                src={e.profile || avatar} // Use the user's profile image or the temporary avatar
                                                alt="Profile"
                                                className="w-20 h-20 rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex space-x-4 mt-2">
                                        <button
                                            onClick={() => {
                                                editHandle(e._id);
                                            }}
                                            className="w-1/2 bg-blue-500 text-white p-2 rounded-md hover-bg-blue-600 focus:ring focus:ring-blue-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                clickHandler(e._id);
                                            }}
                                            className="w-1/2 bg-red-500 text-white p-2 rounded-md hover-bg-red-600 focus:ring focus:ring-red-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>                  
            </div>

            <div className="container mx-auto p-5">
                <div className="flex items-center">
                    <p className="mr-2 font-bold">Generate user details PDF :</p>
                    <button
                        onClick={generatePDF}
                        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:ring focus:ring-green-200"
                    >
                        Generate PDF
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    )
};

export default AdminUserMgt;