import React, { useEffect, useRef, useState } from 'react';
import EmployeeCard from './EmployeeCard';
import { useNavigate, useLocation, Link } from "react-router-dom";
import QRCode from "qrcode";
import LogoutNavbar from './LogoutNavbar';

const Dashboard = () => {
  const serverurl = import.meta.env.VITE_SERVER_URL;

  const [mgr, setMgr] = useState({});
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(""); //TODO: print this error msg in case of server error
  const [qrURL, setQrURL] = useState(false);
  const [cururl, setCururl] = useState("");
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef();

  const fetchmanager = async () => {
    let token = localStorage.getItem("auth-token") || "";
    if (!token) {
      navigate('/login/manager');
      return;
    }

    try {
      setError("");
      const response = await fetch(`${serverurl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
      });
      const json = await response.json();
      console.log(json)
      if (json.username) {
        setMgr(json)
        fetchemployee(json.username)
        fetchCount(json.username);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const fetchemployee = async (username) => {
    const serverurl = import.meta.env.VITE_SERVER_URL;

    const response = await fetch(`${serverurl}/api/employee/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'username': username
      },
    });
    const json = await response.json()
    console.log(json)
    setEmployees(json)
  }

  const fetchCount = async (mgrusername) => {
    const response = await fetch(`${serverurl}/api/count/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'mgrusername': mgrusername
      },
    });
    const json = await response.json()
    console.log(json)
    setCount(json.count)
  }

  const generateQR = (data) => {
    QRCode.toCanvas(canvasRef.current, data, {
      width: 200,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff"
      }
    }, error => {
      if (error) console.error('Error generating QR code:', error);
      else setQrURL(true);
    });
  };

  useEffect(() => {
    fetchmanager();
  }, []);

  useEffect(() => {
    if (mgr.username) {
      const url = window.location.href;
      const baseurl = url.substring(0, url.length - location.pathname.length);
      setCururl(baseurl);
      generateQR(`${baseurl}/client/${mgr.username}`);
    }
  }, [mgr]);


  const emptype = ['Full-time', 'Part-time', 'Temporary', 'Intern', 'Seasonal', 'Leased'];
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    managerusername: '',
    name: '',
    employeetype: '',
    worktype: '',
    dateofjoining: '',
    email: '',
    phone: '',
    upiId: '',
    upiname: '',
    image: '',
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(formData)
  };

  const handleImageUpload = (e) => {
    var reader = new FileReader();
    // console.log(e.target.files[0])
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setFormData({ ...formData, image: reader.result });
      console.log(formData.image)
    }
    // reader.onerror = error => {
    //     console.log(`Error: ${error.message}`)
    // }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    let token = "";
    if (localStorage.getItem("auth-token")) {
      token = localStorage.getItem("auth-token")
      console.log(token)
    }
    else {
      navigate('/login/manager')
    }
    console.log(token)
    const response = await fetch(`${serverurl}/api/employee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${token}`
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json()
    console.log(json)

    // Add new employee to the employees array
    const newEmployee = { ...formData };
    setEmployees([...employees, newEmployee]);
    // Reset form data and close modal
    setFormData({
      managerusername: mgr.username,
      name: '',
      employeetype: '',
      workType: '',
      joiningDate: '',
      email: '',
      phoneNumber: '',
      upiID: '',
      upiname: '',
      image: '',
    });
    setModal(false);
  };



  const handleQRDownload = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "qr-code.png";
      link.click();
    }
  };

  const handleDelete = async (email) => {
    const response = await fetch(`${serverurl}/api/employee/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const json = await response.json()
    console.log(json)
  }

  const handleCountSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${serverurl}/api/count/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mgrusername: mgr.username, count }),
    });
    const json = await response.json()
    console.log(json)
  }

  return (
    <>
      <LogoutNavbar navto="manager" />
      <div className='overflow-x-hidden pt-[10vh] min-h-[100vh] bg-gray-800'>
        {mgr.username && (
          <div className="w-screen h-full">
            {/* manager details */}
            <div className='mt-4 px-4 flex flex-col  items-center justify-evenly flex-wrap gap-5'>
              <div className="text-3xl sm:text-5xl flex flex-col justify-center pr-8 font-semibold items-center font-mono gap-3 text-white">
                {/* <span className='bg-red-500 text-3xl px-4 py-1 rounded-3xl'> {mgr.businesstype} </span> */}
                <span className='text-center'>{mgr.businessname}</span>
                <span className="text-xl text-center sm:text-2xl flex justify-center">Manager : {mgr.ownername} </span>
              </div>
              {qrURL && (<div className='flex mt-5 items-center justify-center  relative qr-box'>
                <canvas ref={canvasRef} className='qr-code border-green-500 border-4 border-dashed mb-2' />
                <button className='bg-teal-500  p-2 rounded-lg qr-btn  absolute' onClick={handleQRDownload}>
                  <i className="fa-solid fa-download " style={{ color: "#000000" }} /> QR
                </button>

              </div>)}

              <div>
                <form onSubmit={handleCountSubmit} className=''>
                  <div className=" ml-10 gap-1 ">
                    <label htmlFor="count" className="text-base  font-medium text-white">
                      Total number of Tables/Rooms
                    </label>
                    <input
                      type="number"
                      id="count"
                      name="count"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      className="h-8 w-[3rem] rounded-md border ml-2 border-gray-300 pl-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                    <button className='px-4 border-2 bg-green-400 border-green-200 rounded-lg hover:bg-green-600 text-black ml-2' type='submit'>Save</button>

                  </div>
                </form>
              </div>
              <div>
                <Link to={`${cururl}/client/${mgr.username}`}><button className='bg-teal-400 text-xl px-3 py-1 rounded-xl hover:scale-110 duration-300 border-2 border-teal-200'>View Client Page </button></Link>
              </div>
            </div>


            <div className='flex mt-16 mb-7 items-center justify-center gap-8'>
              <div className="text-4xl font-bold flex justify-center items-center underline text-teal-500">Employee Registration</div>
              <button onClick={toggleModal} className="bg-teal-500 p-2 rounded-lg">
                <i className="fa-solid fa-user-plus" style={{ color: "#000000" }} /> Employee
              </button>
            </div>

            {/* <div className="mt-20 float-start ml-10"> */}
            <section className="flex justify-center items-center">
              <div className="">
                {modal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20 p-4">
                    <div className="bg-teal-50 rounded-lg p-5 w-full max-w-md mx-auto overflow-y-auto max-h-screen">
                      <div className="flex justify-end">
                        <button onClick={toggleModal} className="bg-red-200 mb-4 px-2 py-1 rounded-lg">
                          close
                        </button>
                      </div>
                      <form onSubmit={handleFormSubmit}>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="fullName" className="text-base font-medium text-gray-900">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="h-8 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="Enter your Name"
                            minLength={5}
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="employeeType" className="text-base font-medium text-gray-900">
                            Employee Type
                          </label>
                          <select
                            id="employeeType"
                            name="employeetype"
                            onChange={handleInputChange}
                            value={formData.employeetype}
                            className="h-8 rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                            required
                          >
                            <option id={0} value="">Choose...</option>
                            {emptype.map(id => <option key={id} value={id}>{id}</option>)}
                          </select>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="workType" className="text-base font-medium text-gray-900">
                            Work Type
                          </label>
                          <input
                            type="text"
                            id="workType"
                            name="worktype"
                            value={formData.worktype}
                            onChange={handleInputChange}
                            className="h-8 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="Enter Work Type"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="joiningDate" className="text-base font-medium text-gray-900">
                            Joining Date
                          </label>
                          <input
                            type="date"
                            id="joiningDate"
                            name="dateofjoining"
                            value={formData.dateofjoining}
                            onChange={handleInputChange}
                            className="h-8 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="email" className="text-base font-medium text-gray-900">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="h-8 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="Enter Email"
                            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                            title="abcd@email.com"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="phoneNumber" className="text-base font-medium text-gray-900">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            id="phoneNumber"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="h-8 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="Enter Phone Number"
                            maxLength={10}
                            minLength={10}
                            title="10 Digits"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="upiID" className="text-base font-medium text-gray-900">
                            UPI ID
                          </label>
                          <input
                            type="email"
                            id="upiID"
                            name="upiId"
                            value={formData.upiId}
                            onChange={handleInputChange}
                            className="h-8 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="Enter UPI ID"
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,64}"
                            title="username@provider"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="upiname" className="text-base font-medium text-gray-900">
                            UPI Name
                          </label>
                          <input
                            type="text"
                            id="upiname"
                            name="upiname"
                            value={formData.upiname}
                            onChange={handleInputChange}
                            className="h-8 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="Enter your Name in UPI"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="image" className="text-base font-medium text-gray-900">
                            Image upload
                          </label>
                          <input
                            type="file"
                            id="image"
                            accept="image/*"
                            name="image"
                            onChange={handleImageUpload}
                            className="h-8 rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                            title='Image Only'
                            required
                          />
                        </div>
                        <button className="h-8 w-28 rounded-md border-2 text-sm border-gray-300 mb-1 mt-2 bg-teal-500">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* </div> */}

            {/* Display EmployeeCards for each employee */}
            <div className="flex flex-wrap justify-center">
              {employees.length !== 0 ? (employees.map((employee) => (
                <EmployeeCard key={employee.upiId} employeeData={employee} handleDelete={handleDelete} />
              ))) : (<div className='text-3xl text-red-500 font-semibold h-full mb-8'>No Employees added yet.</div>)}
            </div>
            <div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;