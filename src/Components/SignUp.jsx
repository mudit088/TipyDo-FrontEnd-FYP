import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Failure from './Failure';

const SignUp = () => {
  const busitype = ['Hotel', 'Valets', 'Bars', 'Restaurant', 'Salon', 'Non-Profit'];
  const [user, setUser] = useState({ "ownername": "", "businessname": "", "businesstype": "", "email": "", "phone": "", "username": "", "password": "" });
  // const [status, setStatus] = useState({success: true, msg: ""});
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user)
  }
  const serverurl = import.meta.env.VITE_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setStatus({success: true, msg: ""});
    // const {name,email,password} = user;
    const response = await fetch(`${serverurl}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user })
    });
    const json = await response.json();
    console.log(json)
    if(!json.success){
      showAlert("Username alreay taken","danger")
    }
    // const expiryDate = new Date();

    // expiryDate.setTime(expiryDate.getTime() + (24 * 60 * 60 * 1000)); // 24 hours from now
    // document.cookie = `auth-token=${json.token}; expires=${expiryDate.toUTCString()}`;
    if (json.token) {
      localStorage.setItem("auth-token", json.token);
      // props.showAlert("Account Created","success");
      navigate('/dashboard/manager')
    }
    // else {
    //   props.showAlert("Invalid Details","danger")
    // }
  }

  const showAlert = (message,type) => {
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(()=>{setAlert(null)},1500)
  }

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      navigate('/dashboard/manager')
    }
  }, [])

  return (
    <div>
      <section >
      <Failure alert ={alert} />
        <div className="flex items-center justify-center px-4 pt-[13vh] pb-4 bg-gray-800" style={{ minHeight: "100vh" }}>

          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-2xl font-bold leading-tight text-white">Sign up to your account</h2>

            <form action="#" method="POST" className="mt-8" onSubmit={handleSubmit}>

              <div className="space-y-5">
                <div>
                  <label htmlFor="" className="text-base font-medium text-white">
                    {' '}
                    Owner Name (Admin){' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="Text"
                      placeholder="Enter your Name"
                      onChange={handleChange}
                      name='ownername'
                      required
                    />
                  </div>
                </div>


                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-white">
                      {' '}
                      Business Name :
                      {' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="Text"
                      placeholder="Enter the name of your Business"
                      onChange={handleChange}
                      name='businessname'
                      required
                    ></input>
                  </div>
                </div>

                <div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="businesstype" className="text-base font-medium text-white">
                      {' '}
                      Business Type :
                      {' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <select name="businesstype" id="businesstype" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" onChange={handleChange} defaultValue={""} required>
                      <option id={0} value="">Choose...</option>
                      {busitype.map(id => <option key={id} value={id}>{id}</option>)}
                    </select>
                    {/* <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="Text"
                  placeholder="Enter the Type of your Business you have"
                ></input> */}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-white">
                      {' '}
                      Email:
                      {' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="xyz@gmail.com"
                      onChange={handleChange}
                      name='email'
                      pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                      title="abcd@email.com"
                      required
                    ></input>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-white">
                      {' '}
                      Phone number:
                      {' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="Number"
                      placeholder="Enter Phone Number"
                      onChange={handleChange}
                      name='phone'
                      minLength={10}
                      maxLength={10}
                      title="10 Digits"
                      required
                    ></input>
                  </div>
                </div>

                <div>
                  <label htmlFor="" className="text-base font-medium text-white">
                    {' '}
                    Username{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="Text"
                      placeholder="Enter your Username"
                      onChange={handleChange}
                      name='username'
                      minLength={5}
                      pattern="^[^\s]+$"
                      title="No spaces allowed"
                      // title='Minimum length should be 5'
                      required
                    ></input>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-white">
                      {' '}
                      Password:
                      {' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="*********"
                      onChange={handleChange}
                      name='password'
                      minLength={5}
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

          </div>
        </div>
      </section>
    </div>
  )
}

export default SignUp
