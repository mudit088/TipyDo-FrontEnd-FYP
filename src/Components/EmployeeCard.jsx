import React, { useEffect, useState } from 'react';

const EmployeeCard = ({ employeeData, handleDelete }) => {
  const { name, employeetype, worktype, dateofjoining, email, phone, upiId, upiname, image } = employeeData;
  const [reqDate, setReqDare] = useState('');
  const [delCover, setDelCover] = useState(false);
  const [display, setDisplay] = useState(true);


  // Function to add leading zero if needed
  const padTo2Digits = (num) => num.toString().padStart(2, '0');

  useEffect(() => {
    // Convert the string into a Date object
    const date = new Date(dateofjoining);

    // Extract day, month, and year from the Date object
    const day = padTo2Digits(date.getUTCDate());
    const month = padTo2Digits(date.getUTCMonth() + 1);
    const year = date.getUTCFullYear();
    setReqDare(`${day}-${month}-${year}`);
  }, [])

  return (
    <>
      { display && (<div className=" shadow-md rounded-lg bg-teal-100 overflow-hidden m-4 w-80 relative">
        {delCover && (<div className='bg-black/[0.6] z-10 h-full w-full absolute flex flex-col items-center justify-center gap-5'>
          <div className='text-white text-4xl'>Are You Sure?</div>
          <div className='flex items-center justify-center gap-12'>
            <button className="bg-red-500 px-2 py-1 rounded-lg" onClick={() => { handleDelete(email); setDisplay(false) }} >
              <span className='text-xl'>
                <i className="fa-solid fa-trash" style={{ color: "#000000" }} /> {" "} {" "}Delete
              </span>
            </button>
            <button className="bg-green-500 px-2 py-1 rounded-lg" onClick={() => { setDelCover(false) }}>
              <span className='text-xl'>
                <i className="fa-solid fa-xmark" style={{ color: "#000000" }} /> {" "} {" "}Cancel
              </span>
            </button>
          </div>
        </div>)}
        <button className="bg-red-500 p-1 rounded-lg absolute top-3 right-3" onClick={() => { setDelCover(true) }}>
          <i className="fa-solid fa-trash" style={{ color: "#000000" }} />
        </button>
        <div className="p-4">
          <div className='flex items-center justify-center h-24'>
            <img src={image} alt="Employee" className="object-cover mb-4 h-full" />
          </div>
          <p className="text-xl font-semibold">{name}</p>
          <p className="text-gray-700 mb-2">Employee Type: {employeetype}</p>
          <p className="text-gray-700 mb-2">Work Type: {worktype}</p>
          <p className="text-gray-700 mb-2">Joining Date: {reqDate}</p>
          <p className="text-gray-700 mb-2">Email: {email}</p>
          <p className="text-gray-700 mb-2">Phone: {phone}</p>
          <p className="text-gray-700 mb-2">UPI Name: {upiname}</p>
          <p className="text-gray-700 mb-2">UPI ID: {upiId}</p>
        </div>
      </div>)}
    </>
  );
};

export default EmployeeCard;
