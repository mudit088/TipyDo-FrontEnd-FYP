import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionCard from './SessionCard';
import LogoutNavbar from './LogoutNavbar';

const EmployeeDashboard = () => {
  const [emp, setEmp] = useState({ name: "", managerusername: "", email: "" });
  const [count, setCount] = useState(0);
  const [sessions, setSessions] = useState([]);
  const [display, setDisplay] = useState(true);
  const [value, setValue] = useState(0);
  const [dropDown, setDropDown] = useState(0);
  const [status, setStatus] = useState({ success: false, msg: "" });
  const navigate = useNavigate();
  const serverurl = import.meta.env.VITE_SERVER_URL;

  const fetchemp = async () => {
    let token = "";
    if (localStorage.getItem("emp-auth-token")) {
      token = localStorage.getItem("emp-auth-token");
      console.log(token);
    } else {
      navigate('/login/employee');
      return;
    }
    try {
      setStatus({ success: false, msg: "" });
      const response = await fetch(`${serverurl}/api/employee/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
      });
      const json = await response.json();
      console.log(json.name);
      setEmp({ name: json.name, email: json.email, managerusername: json.managerusername });
      setStatus({ success: true, msg: "" });
      fetchCount(json.managerusername, json.email);
    } catch (error) {
      setStatus({ success: false, msg: error.message || "Server error" });
    }
  }

  const fetchCount = async (mgrusername, email) => {
    try {
      setStatus({ success: false, msg: "" });
      const response = await fetch(`${serverurl}/api/count/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'mgrusername': mgrusername
        },
      });
      const json = await response.json();
      console.log(json.count);
      setCount(json.count);
      setStatus({ success: true, msg: "" });
      fetchSession(email, json.count);
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
          'email': email
        },
      });
      const json = await response.json();
      console.log(json.sessions);
      const sessionNumbers = json.sessions.map(session => session.tableno);
      const availableSessions = Array.from({ length: c }, (_, i) => i + 1).filter(i => !sessionNumbers.includes(i));
      console.log(availableSessions);
      setSessions(availableSessions);
      setStatus({ success: true, msg: "" });
    } catch (error) {
      setStatus({ success: false, msg: error.message || "Server error" });
    }
  }

  const handleDropDownChange = async (e) => {
    const key = parseInt(e.target.value);
    setValue(e.target.value);
    console.log(key);
    setValue(0);
    const newSessions = sessions.filter(session => session !== key);
    let token = "";
    if (localStorage.getItem("emp-auth-token")) {
      token = localStorage.getItem("emp-auth-token");
      console.log(token);
    } else {
      navigate('/login/employee');
      return;
    }
    try {
      setDisplay(false);
      setStatus({ success: false, msg: "" });
      const response = await fetch(`${serverurl}/api/employee/tableno`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({ tableno: key })
      });
      const json = await response.json();
      console.log(json);
      setDisplay(true);
      setSessions(newSessions);
      setDropDown(key);
    } catch (error) {
      setStatus({ success: false, msg: error.message || "Server error" });
    }
  }

  const deleteSession = async (tableno) => {
    try {
      setDisplay(false);
      setStatus({ success: false, msg: "" });
      let arr = sessions;
      arr = [...arr, tableno];
      // arr.sort();
      console.log(arr)
      setSessions(arr)
      const response = await fetch(`${serverurl}/api/employee/tableno`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ managerusername: emp.managerusername, email: emp.email, tableno })
      });
      const json = await response.json();
      console.log(json);
      setDisplay(true);
    } catch (error) {
      setStatus({ success: false, msg: error.message || "Server error" });
    }
  }
  useEffect(() => {
    fetchemp();
  }, []);

  return (
    <>
      <LogoutNavbar navto="employee" />
      <div className='w-[97vw] min-h-screen m-4 bg-gray-800'>
        <div className='flex flex-col items-center text-3xl font-semibold justify-center text-blue-700'>
          <h1>Employee Dashboard</h1>
          <p className='text-green-400 pt-6'>{emp.name}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:pt-10">
          <label htmlFor="employeeType" className="text-base font-medium text-white text-xl">
            Add Session
          </label>
          <select
            id="employeeType"
            name="employeetype"
            onChange={handleDropDownChange}
            value={value}
            className="h-8 sm:w-56 rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            required
          >
            <option value={0}>Choose...</option>
            {sessions.map(i => <option key={i} value={i}>{i}</option>)}
          </select>

          <img className='w-96 ml-0 mr-10 sm:ml-36' src="/Dashpic.svg" alt="Dashboard Illustration" />
        </div>

        <div className='flex flex-col mt-10 justify-center items-center'>
          <p className='text-green-600 text-4xl'>Sessions</p>
          <div>
            <div className='mt-4 flex flex-wrap items-center justify-center sm:mt-4 mx-1 sm:mx-2'>
              {display && Array.from({ length: count }, (_, i) => i + 1)
                .filter(i => !sessions.includes(i))
                .map(i => (
                  <SessionCard key={i} data={i} deleteSession={deleteSession} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeDashboard;
