import React, { useState, useEffect } from 'react';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation, mobileNumberValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function UpdateProfile() {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();

  const [mobileNumberUpdated, setMobileNumberUpdated] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || '',
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      if (mobileNumberUpdated) {
        const errors = await mobileNumberValidation(values);
        if (Object.keys(errors).length > 0) {
          return; // Prevent form submission if there are errors.
        }
      }

      const updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>,
      });

        // Wait for 2 seconds before redirecting
      setTimeout(() => {
        navigate('/mainprofile');
        toast.dismiss(); // Clear toast messages on navigation
      }, 2000);
    },
  });

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);

    // Update the image source immediately after selecting a file
    const imageElement = document.getElementById('profile-img');
    if (imageElement) {
      imageElement.src = base64 || apiData?.profile || avatar;
    }
  
    formik.setFieldValue('profile', base64);
  };

  useEffect(() => {
    // Clear any existing toasts when the component mounts
    toast.dismiss();
  }, []);

  if (isLoading) return <h1 className='text-2xl font-bold'> </h1>;
  if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className='container mx-auto flex-grow py-8'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className={`flex justify-center items-center`}>
          <div className={`${styles.glass} ${extend.glass}`} style={{ width: '45%', paddingTop: '3em' }}>

            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold mb-6'>Update My Profile</h4>
              <span className='text-xl w-2/3 text-center text-gray-500'>
                  You can update your details below
              </span>
            </div>

            <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                <label htmlFor='profile'>
                  <img id='profile-img' src={apiData?.profile || file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt='avatar' />
                </label>
                <input onChange={onUpload} type='file' id='profile' name='profile' />
              </div>

              <div className='textbox flex flex-col items-center gap-6'>
                <div className='name flex w-3/4 gap-10'>
                  <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='FirstName' />
                  <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='LastName' />
                </div>

                <div className='name flex w-3/4 gap-10'>
                  <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' onChange={(e) => {formik.handleChange(e); setMobileNumberUpdated(true);}} />
                  <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='Email*' />
                </div>

                <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='Address' />
                <button className={styles.btn} type='submit'>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  )
}