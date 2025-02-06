import React, { useEffect, useState } from 'react'

export default function ClientCards({ employeeData }) {
  const { name, employeetype, worktype, dateofjoining, email, upiId, image } = employeeData;
  const [reqDate, setReqDare] = useState('');
  const [UPI, setUPI] = useState('');

  const padTo2Digits = (num) => num.toString().padStart(2, '0');

  useEffect(() => {
    // Convert the string into a Date object
    const date = new Date(dateofjoining);

    // Extract day, month, and year from the Date object
    const day = padTo2Digits(date.getUTCDate());
    const month = padTo2Digits(date.getUTCMonth() + 1);
    const year = date.getUTCFullYear();
    setReqDare(`${day}-${month}-${year}`);

    //upi url
    const tempname = name.replace(" ", "%20");
    const tempupi = `upi://pay?pa=${upiId}&pn=${tempname}&cu=INR&tn=Transaction%20Note`
    setUPI(tempupi)
  }, [])

  return (
    <div className='bg-gray-800 sm:w-fit w-[100%]'>
      <div>
        <div className=" shadow-md rounded-lg bg-teal-100 overflow-hidden m-4 relative">
          <div className="p-4">
            <div className='flex gap-4 justify-evenly'>
              <div>
                <img src={image} alt="Employee" className="object-cover w-[7rem]" />
              </div>
              <div>
                <p className="text-xl font-bold">{name}</p>
                <p className="text-gray-700">{employeetype}</p>
                <p className="text-gray-700">Work: {worktype}</p>
                <a href={UPI} 
                className='flex test-xl px-3 py-1 hover:scale-100 duration-300 bg-blue-700 text-white rounded-xl absolute bottom-3 right-3'
                >Pay Tip</a>
              </div>

            </div>

            {/* <p className="text-gray-700 mb-2">Joining Date: {reqDate}</p>
            <p className="text-gray-700 mb-2">Email: {email}</p> */}
            {/* <p className="text-gray-700 mb-2">UPI ID: {upiId}</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}
