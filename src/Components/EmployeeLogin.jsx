import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user)
  }
  const serverurl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    if (localStorage.getItem("emp-auth-token")) {
      navigate('/dashboard/employee')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const {name,email,password} = user;
    const response = await fetch(`${serverurl}/api/employee/login`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'email': user.email,
        'password': user.password
      },
      // body: JSON.stringify( user )
    });
    const json = await response.json();
    // console.log(json)
    // const expiryDate = new Date();

    // expiryDate.setTime(expiryDate.getTime() + (24 * 60 * 60 * 1000)); // 24 hours from now
    // document.cookie = `auth-token=${json.token}; expires=${expiryDate.toUTCString()}`;
    if (json.token) {
      localStorage.setItem("emp-auth-token", json.token);
      // props.showAlert("Account Created","success");
      navigate('/dashboard/employee')
    }
    // else {
    //   props.showAlert("Invalid Details","danger")
    // }
  }

  return (
    <section className="">
      <div className="flex items-center justify-center h-[100vh] px-4 pt-10 sm:px-6 sm:py-16 lg:px-8 bg-gray-800">

        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">

          <h1 className="font-semibold text-2xl text-white transition-all duration-200 hover:underline">Employee Login</h1>

          <form className="mt-8" onSubmit={handleSubmit} >
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="text-base font-medium text-white">
                  {' '}
                  {' '} Email{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={user.email}
                    required
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="Password" className="text-base font-medium text-white">
                    {' '}
                    Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={user.password}
                    required
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-teal-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-teal-200"
                >
                  Get started
                </button>
              </div>
            </div>
          </form>
          {/* <div className="mt-3 space-y-3">
            <button
            type="button"
            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
          >
          
            Sign in with Google
          </button>
          <button
            type="button"
            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
          >
           
            Sign in with Facebook
          </button>
          </div> */}
        </div>
      </div>
    </section>

  )
}

export default EmployeeLogin
