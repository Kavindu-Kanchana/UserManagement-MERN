import React from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import styles from '../styles/Username.module.css';

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function UserProfile() {
  const navigate = useNavigate();
  const { username } = useAuthStore(state => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

  if (isLoading) return <h1 className='text-2xl font-bold'> </h1>;
  if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>;

  const handleUpdateProfile = () => {
    navigate('/profile');
  };

  const handleDeleteAccount = () => {
    navigate('/delete');
  };

 {/*
  function userLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }
  */}

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-grow py-8">
        <div className='flex justify-center items-center'>
          <div className={`w-full sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] ${styles.glass}`}>
            <div className="title flex flex-col items-center gap-5">
              <h4 className='text-6xl font-bold mb-6'>User Profile</h4>
              <h1 className='text-5xl font-bold'>Hello {apiData?.firstName || apiData?.username}</h1>
              <div className='profile flex justify-center py-4'>
                <img src={apiData?.profile || avatar} className={styles.profile_img} alt="avatar" />
              </div>
              <span className='py-4 text-xl text-center text-gray-500'>
                Choose the option below to Update or Delete your account
              </span>
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <button className={styles.btn} onClick={handleUpdateProfile}>Update Profile</button>
              <button className={styles.btn} onClick={handleDeleteAccount}>Delete Account</button>
            </div>

            {/* Logout section 
            <div className='text-center py-4'>
              <span className='text-gray-500'>Come back later? <button onClick={userLogout} className='text-red-500' to='/'>Logout</button></span>
            </div>
            */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
