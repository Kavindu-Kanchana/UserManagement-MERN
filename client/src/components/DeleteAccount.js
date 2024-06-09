import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { verifyPassword, deleteUserAccount } from '../helper/helper';

import styles from '../styles/Username.module.css';

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Delete() {
    const navigate = useNavigate();
    const { username } = useAuthStore(state => state.auth);
    const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);
    const [isPasswordValidated, setIsPasswordValidated] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deletingAccount, setDeletingAccount] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteError, setDeleteError] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            // Validation logic moved to handleValidatePassword function
        }
    });

    const handleValidatePassword = async () => {
        try {
            const result = await verifyPassword({ username, password: formik.values.password });
            if (result) {
                setIsPasswordValidated(true);
                toast.success('Password Validated!', { duration: 2000 });
            } else {
                setIsPasswordValidated(false);
                toast.error('Password Is Incorrect!');
            }
        } catch (error) {
            setIsPasswordValidated(false);
            toast.error('Error validating password.');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            setDeletingAccount(true); // Show loading indicator
            const deleteResult = await deleteUserAccount(username);
            if (deleteResult && deleteResult.msg) {
                localStorage.removeItem('token');
                setDeleteSuccess(true);

                //window.location.reload();
            } else {
                setDeleteSuccess(false);
                setDeleteError(true);
                toast.error('Error deleting account.');
            }
        } catch (error) {
            setDeleteSuccess(false);
            setDeleteError(true);
            toast.error('Error deleting account.');
        }
        setShowDeleteConfirmation(false);
    };
    
    useEffect(() => {
        // Clear any existing toasts when the component mounts
        toast.dismiss();
    }, []);

    /* if (isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>; */
    if (isLoading) return <h1 className='text-2xl font-bold'> </h1>;
    if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="container mx-auto flex-grow py-8">
                <Toaster position='top-center' reverseOrder={false}></Toaster>
    
            <div className={`flex justify-center items-center`}>
                <div className={`${styles.glass}`}>
                <div className="title flex flex-col items-center gap-5">
                    <h4 className='text-5xl font-bold'>Hello {apiData?.firstName || apiData?.username}</h4>
                    <span className='py-4 text-xl text-center text-gray-500'>
                    Enter the password to delete your account
                    </span>
                </div>
                
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4 '>
                    <img src={apiData?.profile || avatar} className={styles.profile_img} alt="avatar" />
                    </div>
                    
                    <div className="textbox flex flex-col items-center gap-10">
                    {isPasswordValidated ? (
                        <>
                        <p className='text-xl font-bold'>Password Validated!</p>
                        <button
                            className={styles.btn}
                            type='button'
                            onClick={() => setShowDeleteConfirmation(true)}
                        >
                            Delete Account
                        </button>
                        </>
                    ) : (
                        <>
                        <input
                            {...formik.getFieldProps('password')}
                            className={styles.textbox}
                            type="password"
                            placeholder='Password'
                        />
                        <button
                            className={styles.btn}
                            type='button'
                            onClick={handleValidatePassword}
                        >
                            Validate Password
                        </button>
                        </>
                    )}
                    </div>
                </form>
                </div>
            </div>
    
            {/* Delete confirmation dialog */}
            {showDeleteConfirmation && (
                <div className={`fixed inset-0 flex justify-center items-center backdrop-filter backdrop-blur-md ${styles.overlay}`}>
                <div className={`bg-white p-8 rounded-lg shadow-lg ${styles.confirmDialog} lg:w-1/3`}>
                    <p className="text-lg font-semibold">Do you really want to delete your account?</p>
                    <div className="mt-4 flex justify-end">
                    {deletingAccount ? (
                        <p>Deleting Account...</p>
                    ) : (
                        <>
                        <button
                            className="px-4 py-2 mr-2 bg-red-500 text-white rounded"
                            onClick={handleDeleteAccount}
                        >
                            Delete Account
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-600 rounded"
                            onClick={() => setShowDeleteConfirmation(false)}
                        >
                            Cancel
                        </button>
                        </>
                    )}
                    </div>
                </div>
                </div>
            )}
    
            {/* Delete success dialog */}
            {deleteSuccess && (
                <div className={`fixed inset-0 flex justify-center items-center backdrop-filter backdrop-blur-md ${styles.overlay}`}>
                <div className={`bg-white p-8 rounded-lg shadow-lg ${styles.successDialog} lg:w-1/3`}>
                    <p className="text-lg font-semibold">Account Deleted Successfully...!</p>
                    <div className="mt-4 flex justify-end">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => {
                            // Log the user out and redirect
                            localStorage.removeItem('token');
                            navigate('/');
                            window.location.reload();
                        }}
                    >
                        OK
                    </button>
                    </div>
                </div>
                </div>
            )}

            {/* Delete error dialog */}
            {deleteError && (
                <div className={`fixed inset-0 flex justify-center items-center ${styles.overlay}`}>
                <div className={`bg-white p-8 rounded-lg shadow-lg ${styles.errorDialog} lg:w-1/3`}>
                    <p className="text-lg font-semibold">Error deleting account.</p>
                    <div className="mt-4 flex justify-end">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => {
                        setDeleteError(false);
                        formik.resetForm(); // Reset the form
                        }}
                    >
                        Retry
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-600 rounded ml-2"
                        onClick={() => navigate('/delete')}
                    >
                        Cancel
                    </button>
                    </div>
                </div>
                </div>
            )}
            </div>
            <Footer />
        </div>

    ); 
}
