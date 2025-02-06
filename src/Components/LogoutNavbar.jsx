import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LogoutNavbar = ({navto}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate(`/login/${navto}`);
  };


  return (
    <div className='flex justify-between items-center bg-green-50 fixed w-[100%] border-b-2 border-green-200 z-10'>
      <div>
        <Link to="/"><img className='h-12 my-3 ml-2' src="/Logo.png" alt="Logo" /></Link>
      </div>

      {navto !== "client" ? (<div className='flex mr-5 text-lg sm:mr-20'>
        <ul className='relative'>
          <li>
              <a
                className='text-xl p-2 sm:pl-6 hover:text-green-400 hover:scale-110 duration-300 cursor-pointer'
                onClick={handleLogout}
              >
                Logout
              </a>
          </li>
        </ul>
      </div>):("")}
    </div>
  );
};

export default LogoutNavbar;
