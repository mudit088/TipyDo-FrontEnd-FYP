import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [dashboardDropdownVisible, setDashboardDropdownVisible] = useState(false);
  const [loginDropdownVisible, setLoginDropdownVisible] = useState(false);

  const toggleDashboardDropdown = () => {
    setDashboardDropdownVisible(!dashboardDropdownVisible);
    setLoginDropdownVisible(false);
  };

  const toggleLoginDropdown = () => {
    setLoginDropdownVisible(!loginDropdownVisible);
    setDashboardDropdownVisible(false);
  };

  return (
    <div className='flex justify-between items-center bg-green-50 fixed w-[100%] border-b-2 border-green-200 z-10'>
      <div>
        <Link to="/"><img className='h-12 my-3 ml-2' src="/Logo.png" alt="Logo" /></Link>
      </div>

      <div className='flex mr-5 text-lg sm:mr-20'>
        <ul className='relative'>
          <li>
            <a
              onClick={toggleDashboardDropdown}
              className='text-xl ml-2 p-2 hover:text-green-400 hover:scale-110 duration-300 cursor-pointer'
            >
              Dashboard
            </a>
            {dashboardDropdownVisible && (
              <ul className='absolute left-2 mt-2 w-35 bg-white border border-gray-200 rounded shadow-lg'>
                <Link to="/dashboard/manager" onClick={toggleDashboardDropdown}>
                  <li className='px-4 py-2 hover:bg-green-100'>
                    Manager
                  </li>
                </Link>
                <Link to="/dashboard/employee" onClick={toggleDashboardDropdown}><li className='px-4 py-2 hover:bg-green-100'>
                  Employee
                </li></Link>
              </ul>
            )}
          </li>
        </ul>

        <ul className='relative'>
          <li>
            <a
              onClick={toggleLoginDropdown}
              className='text-xl p-2 sm:pl-6 hover:text-green-400 hover:scale-110 duration-300 cursor-pointer'
            >
              Login
            </a>
            {loginDropdownVisible && (
              <ul className='absolute left-0 mt-2 w-35 bg-white border border-gray-200 rounded shadow-lg'>
                <Link to="/login/manager" onClick={toggleLoginDropdown}><li className='px-0 sm:px-4 py-2 hover:bg-green-100'>
                  Manager
                </li></Link>
                <Link to="/login/employee" onClick={toggleLoginDropdown}><li className='px-4 py-2 hover:bg-green-100'>
                  Employee
                </li></Link>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
