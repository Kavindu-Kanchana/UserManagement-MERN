import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'

import Navbar from "./Navbar";
import Footer from "./Footer";

import styles from '../styles/Username.module.css';

export default function Username() {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues : {
      username : ''
    },
    validate : usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/password')
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-grow py-8">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center'>
          <div className={`${styles.glass} w-full sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%]`}>
            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Hello Again!</h4>
              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Welcome to Ayurvedic Spa
              </span>
            </div>

            <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
                <button className={styles.btn} type='submit'>Login</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

