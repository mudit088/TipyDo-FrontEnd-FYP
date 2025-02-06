import React from 'react'

export default function SessionCard({ data , deleteSession}) {
    return (
        <div className='bg-gray-900'>
            <div className="shadow-md rounded-lg  overflow-hidden m-4 w-20 relative ">
                <div className="p-4 flex flex-col">
                    <p className="text-gray-700 flex justify-center items-center text-3xl">{data}</p>
                    <button className='mt-2 p-0.5 rounded-lg hover:bg-red-300 bg-red-500 border-3 border-red-300' onClick={()=>{deleteSession(data)}}>
                        <i className="fa-solid fa-trash" style={{ color: "#000000" }} />
                    </button>
                </div>
            </div>
        </div>
    )
}
