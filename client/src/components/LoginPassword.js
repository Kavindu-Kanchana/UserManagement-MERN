import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { verifyPassword } from '../helper/helper';
import styles from '../styles/Username.module.css';
import { useAuth } from './AuthContext';

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Password() {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dispatch } = useAuth();

  const displayToast = async (loginPromise) => {
    setIsSubmitting(true); // Set form submission to true
    try {
      const response = await loginPromise;
      if (response.error) {
        toast.error('Password Is Incorrect !!');
      } else {
        dispatch({ type: "LOGIN", payload: response.data.user});
        localStorage.setItem('token', response.data.token);
        toast.success('Login Successful...!');
        setTimeout(() => {
          navigate('/'); // Redirect only if login was successful
        }, 1000); // Delay the redirection for 1 seconds
      }
    } catch (error) {
      setIsSubmitting(false); // Set form submission back to false on error
      toast.error('Password Is Incorrect !!');
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({ username, password: values.password });
      displayToast(loginPromise);
    },
  });

  useEffect(() => {
    // Clear any existing toasts when the component unmounts
    return () => {
      toast.dismiss();
    };
  }, []);

  if (isLoading) return <h1 className="text-2xl font-bold"> </h1>;
  if (serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-grow py-8">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
          <div className="flex justify-center items-center ">
            <div className={`w-full sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] ${styles.glass}`}>
              <div className="title flex flex-col items-center">
                <h4 className="text-5xl font-bold">Hello {apiData?.firstName || apiData?.username}</h4>
                <span className="py-4 text-xl w-2/3 text-center text-gray-500">Welcome to Ayurvedic Spa</span>
              </div>
              <form className="py-1" onSubmit={formik.handleSubmit}>
                <div className="profile flex justify-center py-4">
                  <img src={apiData?.profile || avatar} className={styles.profile_img} alt="avatar" />
                </div>
                <div className="textbox flex flex-col items-center gap-6">
                  <input
                    {...formik.getFieldProps('password')}
                    className={styles.textbox}
                    type="password"
                    placeholder="Password"
                    disabled={isSubmitting} // Disable input during form submission
                  />
                  <button className={styles.btn} type="submit" disabled={isSubmitting}>
                    Sign In
                  </button>
                </div>
                <div className="text-center py-4">
                  <span className="text-gray-500">
                    Forgot Password? <Link className="text-red-500" to="/recovery">Recover Now</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
      </div>
      <Footer />
    </div>

  );
}
