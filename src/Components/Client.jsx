import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import ClientCards from './ClientCards';
import LogoutNavbar from './LogoutNavbar';

const Client = () => {
  const { username } = useParams();
  const [mgr, setMgr] = useState({});
  const [employees, setEmployees] = useState([]);
  const [displayemps, setdisplayemps] = useState([]);
  const [value, setvalue] = useState(0);
  const [session, setsession] = useState([]);
  const [error, setError] = useState(""); //TODO: print this error msg in case of server error
  const serverurl = import.meta.env.VITE_SERVER_URL;
  const [status, setStatus] = useState({ success: false, msg: "" });
  const [count, setCount] = useState(0);

  const fetchdata = async () => {
    try {
      setError("");
      const response = await fetch(`${serverurl}/api/clientpage`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'username': username
        },
      });
      const json = await response.json();
      console.log(json)
      if (json.mgr) {
        setMgr(json.mgr)
        setEmployees(json.emps)
        setdisplayemps(json.emps)
        fetchCount()
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const fetchCount = async () => {
    try {
      setStatus({ success: false, msg: "" });
      const response = await fetch(`${serverurl}/api/count/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'mgrusername': username
        },
      });
      const json = await response.json();
      console.log(json.count);
      setCount(json.count);
      setStatus({ success: true, msg: "" });
      fetchSession();
    } catch (error) {
      setStatus({ success: false, msg: error.message || "Server error" });
    }
  }

  const fetchSession = async (email, c) => {
    try {
      setStatus({ success: false, msg: "" });
      const response = await fetch(`${serverurl}/api/employee/tableno`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'managerusername': username
        },
      });
      const json = await response.json();
      console.log(json.sessions);
      // const sessionNumbers = json.sessions.map(session => session.tableno);
      // const availableSessions = Array.from({ length: c }, (_, i) => i + 1).filter(i => !sessionNumbers.includes(i));
      // console.log(availableSessions);
      setsession(json.sessions);
      setStatus({ success: true, msg: "" });
    } catch (error) {
      setStatus({ success: false, msg: error.message || "Server error" });
    }
  }

  const handlechange = async (e) => {
    setvalue(e.target.value)
    const key = parseInt(e.target.value);
    setdisplayemps([]);
    if (key === 0) {
      setdisplayemps(employees)
    } else {
      for (let i = 0; i < session.length; i++) {
        if (session[i].tableno === key) {
          for (let j = 0; j < employees.length; j++) {
            if (session[i].email === employees[j].email) {
              setdisplayemps(prev => [...prev, employees[j]]);
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    fetchdata();
  }, [])

  return (
    <>
    <LogoutNavbar navto='client'/>
      <div>
        {mgr.username && (<div className='overflow-x-hidden pt-[10vh] min-h-[100vh] bg-gray-800'>
          <div className='flex flex-col space-y-4 items-center mt-4 text-white'>
            <div className='flex justify-center flex-col items-center'>
              <div className="text-3xl sm:text-5xl flex flex-col justify-center pr-8 font-semibold items-center font-mono gap-3 text-white">
                {/* <span className='bg-red-500 text-3xl px-4 py-1 rounded-3xl'> {mgr.businesstype} </span> */}
                <span className='text-center'>{mgr.businessname}</span>
                <span className="text-xl text-center sm:text-2xl flex justify-center">Manager : {mgr.ownername} </span>
              </div>
              {/* <p className="text-5xl flex justify-center pr-8 items-center text-blue-800"> {mgr.businesstype} </p> */}
            </div>
          </div>
          <div className='flex flex-col justify-center pt-12 px-5 items-center'>
            <p className='text-green-400 text-2xl text-center sm:text-4xl pb-8'>
              Payments have <span className='text-cyan-400'>evolved</span>  but how we tip  <span className='text-cyan-400'>hasn't :/</span>
            </p>
            {/* <p className='text-blue-600 text-2xl pt-10 pb-10 font-semibold'>HAPPY THANKSGIVING</p> */}

            <div>
              <label htmlFor="employeeType" className="text-base font-medium p-2 text-gray-100 text-xl">
                Table Number
              </label>
              <select
                id="employeeType"
                name="employeetype"
                value={value}
                onChange={handlechange}
                className="h-8 sm:w-56 rounded-md border  border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                required
              >
                <option id={0} value={0}>Choose...</option>
                {Array.from({ length: count }, (_, i) => i + 1).map(i => <option key={i}>{i}</option>)}
              </select>

            </div>
          </div>
          <div className="flex flex-wrap justify-center mt-8">
            {displayemps.length !== 0 ? (displayemps.map((employee) => (
              <ClientCards key={employee.upiId} employeeData={employee} />
            ))) : (<div className='text-3xl text-red-500 font-semibold h-full'>No Employees Found.</div>)}
          </div>
        </div>)}
      </div>
    </>
  )
}

export default Client