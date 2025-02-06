import React from 'react'

const Howtip = () => {
  return (
    <div className='h-full'> 
      <div className='pt-28'>
        <h1 className='text-5xl flex justify-center  text-blue-700 font-semibold'>
        Tipping has never been easier, safer and more direct.
        </h1>
        <p className='text-3xl flex justify-center pt-5 font-bold text-green-500'>No App is required to send or receive tips!</p>
      </div>
      <div className='flex flex-col sm:flex-row space-x-14 justify-center mt-20'>

        <div className='flex flex-col justify-center items-center'>
        <img src="/htp1.svg " className='h-36  hover:scale-110 duration-300' alt="" />
        <p className='text-2xl flex justify-center items-center'>Open phone's camera</p>
        <p className='text-lg flex justify-center items-center'>Scan the QR code using your phone's camera, <br /></p>
        <p className='flex items-center justify-center text-lg'> and tap on the banner.</p>
        </div>

        <div className='flex flex-col justify-center items-center'>
        <img src="/htp2.svg " className='h-36  hover:scale-110 duration-300' alt="" />
        <p className='text-2xl flex justify-center items-center'>Choose person to tip</p>
        <p className='text-lg flex justify-center items-center'>pick your tip amount from a pre-defined tip <br /></p>
        <p className='flex items-center justify-center text-lg'> amount, or choose a custom amount.</p>
        </div>

        <div className='flex flex-col justify-center items-center'>
        <img src="/htp3.svg " className='h-36  hover:scale-110 duration-300' alt="" />
        <p className='text-2xl flex justify-center items-center'>Pay safely & securely</p>
        <p className='text-lg flex justify-center items-center'>ou can rest assured your payment is secure,  <br /></p>
        <p className='flex items-center justify-center text-lg'> nd goes directly to your desired recipient.</p>
        </div>
       
        
       
      </div>
      
    </div>
  )
}

export default Howtip
