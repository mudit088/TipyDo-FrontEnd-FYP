import React from 'react'
import errimg from '../../public/404.gif'

export default function Error() {
    return (
        <div className='flex flex-col justify-center items-center text-3xl h-[100vh]'>
            <img src={errimg} alt='Image not Found' className='w-[100vw] sm:w-[130vh]' />
            <div className='flex flex-col items-center justify-center mt-2 sm:text-6xl'>
                <span className='text-green-800'> Error 404 </span>
                <span> Page not Found!</span>
            </div>
        </div>
    )
}
