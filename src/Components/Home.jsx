
import { TypeAnimation } from 'react-type-animation';
import { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import ScrollReveal from 'scrollreveal';

const Home = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      reset: false,
      distance: '80px',
      duration: 1500,
      delay: 100
    });
    sr.reveal('.toporigin', { origin: 'top' });
    sr.reveal('.bottomorigin', { origin: 'bottom' });
    sr.reveal('.leftorigin', { origin: 'left' });
    sr.reveal('.rightorigin', { origin: 'right' });
  },[])
  

  const [currentSlide, setCurrentSlide] = useState(0);

  const img = [
    {
      url: '/p1.jpeg',
    },
    {
      url: '/p2.jpeg',
    },
    {
      url: '/p3.jpeg',
    },
    {
      url: '/p4.jpeg',
    },
    {
      url: '/p5.jpeg',
    },
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? img.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === img.length - 1 ? 0 : prevSlide + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === img.length - 1 ? 0 : prevSlide + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [img.length]);

  return (
    <div className='w-[100%] h-full bg-gray-900 pb-5 overflow-x-hidden'>
      <div className='flex flex-col sm:flex-row w-[100%] '>
        <div className='flex flex-wrap w-[100%] h-[100vh]'>
          <div className='flex flex-col justify-center w-[100vw] sm:w-[49vw] h-[50vh] sm:h-[100vh] pl-10 pt-20 leftorigin'>
            <p className='text-4xl sm:text-6xl text-blue-800  font-semibold'>India's <span className='text-green-400'>#1</span>  <br /> End-to-End <br /> Digital Tipping Platform <br /> For<span className='text-white'>.</span>
              <TypeAnimation
                className='text-green-400' sequence={[
                  ' Hotels.', 3000,
                  ' Restaurants.', 3000,
                  ' Housekeepers.', 3000,
                  ' Salons.', 3000,
                  ' Bars.', 3000,
                ]}
                wrapper="span"
                speed={200}
                style={{ fontSize: '5xl', display: 'inline-block', }}
                repeat={Infinity}
                duration={200}

              /></p>
            <div className='ml-5 sw:ml-10 mt-10'>
              <button className='text-xl bg-green-300 border-2 rounded-xl border-green-200 hover:scale-110 duration-300 py-2 px-8'>How to tip??</button>
            </div>

          </div>
          <div className='w-[100vw] sm:w-[50vw] h-[50vh] sm:h-[100vh] flex items-center justify-center pt-20 rightorigin'>
            <div className='w-[100%] max-w-[300px] h-[300px] sm:max-w-[500px] sm:h-[400px] relative shadow-xl rounded-3xl shadow-gray-700 '>
              <div
                style={{
                  backgroundImage: `url(${img[currentSlide].url})`,
                  backgroundSize: 'cover', // Ensures the image covers the entire container
                  backgroundPosition: 'center', // Centers the image within the container
                  borderRadius: '20px', // Rounded corners for the image container
                }}
                className='h-full w-full rounded-2xl duration-300 flex justify-end'
              ></div>
              <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
                <div onClick={handlePrevSlide}>
                  <BsChevronCompactLeft />
                </div>
              </div>
              <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
                <div onClick={handleNextSlide}>
                  <BsChevronCompactRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='flex flex-col sm:flex-row justify-between items-center '>
        <img className='hover:scale-110 duration-300 ml-0 sm:ml-56 mt-20 sm:mt-56' src="/Revolutionizing-Tipping-Graphic.webp" alt="" />
        <p className='text-4xl text-blue-800 font-semibold pl-4 mr-0 sm:mr-56 pb-20 '>No <span className='font-semibold'>App</span>  needed, Just your <span className='text-green-600 font-bold sm:flex items-center justify-center'>Phone</span> <span className='text-white text-lg pt-2 sm:flex items-center justify-center'>Cashless Tips, Boundless  <span className='text-green-600'>-Gratitude.</span> </span>  </p>
        <p></p>
      </div>

      {/* <div className='flex  items-center mb-28'>
        <p className='text-3xl text-blue-800 ml-56 font-semibold'>Fast & simple cashless tipping for <span className='text-green-600 font-bold'>Hotels</span> <br /> <span className='text-xl'>Attract, retain, and motivate your hardworking <br /> staff while delighting your guests.</span> </p>
        
        <img src="/phone.jpg" className='h-96 ml-48 hover:scale-110 duration-300' alt="" />
      </div> */}


      {/* //hotelgrid */}

      <section className='m-5 bg-slate-800  rounded-xl p-5'>
        <div className='mt-2 mb-10 flex flex-col justify-center items-center'>
          <p className='text-3xl text-blue-800 font-semibold '> Where to display your <span className='text-green-600 font-bold'>QR codes:</span> </p>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-36 text-center py-8 px-12 sm:px-0 mt-5'>

            <div className='shadow-md shadow-gray-500 rounded-md duration-200 hover:scale-105'>
              <img className='rounded-md duration-200 hover:scale-105 sm:h-56' src="/hotel1.jpg" alt="" />
              <div className='flex items-center justify-center'>
                <p className='text-green-600 font-semibold py-4'>Added to your concierge desk</p>
              </div>
            </div>

            <div className='shadow-md shadow-gray-500 rounded-md duration-200 hover:scale-105'>
              <img className='rounded-md duration-200 hover:scale-105 sm:h-56' src="/hotel2.jpg" alt="" />
              <div className='flex items-center justify-center'>
                <p className='text-green-600 font-semibold py-4'>Placed after housekeeper visits</p>
              </div>
            </div>


            <div className='shadow-md shadow-gray-500 rounded-md duration-200 hover:scale-105'>
              <img className='rounded-md duration-200 hover:scale-105 sm:h-56' src="/hotel3.jpg" alt="" />
              <div className='flex items-center justify-center'>
                <p className='text-green-600 font-semibold py-4'>At each restaurant table</p>
              </div>
            </div>

            <div className='shadow-md shadow-gray-500 rounded-md duration-200 hover:scale-105'>
              <img className='rounded-md duration-200 hover:scale-105 sm:h-56' src="/hotel4.jpg" alt="" />
              <div className='flex items-center justify-center'>
                <p className='text-green-600 font-semibold py-4'>Displayed throughout your hotel</p>
              </div>
            </div>

            <div className='shadow-md shadow-gray-500 rounded-md duration-200 hover:scale-105'>
              <img className='rounded-md duration-200 hover:scale-105 sm:h-56' src="/hotel5.jpg" alt="" />
              <div className='flex items-center justify-center'>
                <p className='text-green-600 font-semibold py-4'>Placed next to valet stands</p>
              </div>
            </div>

            <div className='shadow-md shadow-gray-500 rounded-md duration-200 hover:scale-105'>
              <img className='rounded-md duration-200 hover:scale-105 sm:h-56' src="/hotel6.jpg" alt="" />
              <div className='flex items-center justify-center'>
                <p className='text-green-600 font-semibold py-4'>Shared by bellhops</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* gridend */}

      <div className='flex flex-col justify-center items-center  mt-36'>
        <p className='text-4xl text-blue-800 font-semibold'>Features for <span className='text-green-600 font-bold '>Restaurant</span>  Teams.</p>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-36 text-center py-8 px-12 sm:px-0 mt-5'>

          <div className='sm:pt-10 hover:scale-110 duration-300'>
            <img src="/res1.svg" className='h-28 ml-12 sm:ml-10 ' alt="" />
            <p className='text-blue-700 font-semibold text-xl'>Team tips are safe & <br /> secure with eTip. <br /> <span className='text-xs text-blue-500'>No more worrying about misplacing <br /> physical cash tips. Tips are securely <br /> transferred to team members.</span> </p>
          </div>


          <div className='sm:pt-10 hover:scale-110 duration-300'>
            <img src="/res2.svg" className='h-24  ml-14 sm:ml-14 pb-2 ' alt="" />
            <p className='text-blue-700 font-semibold text-xl pt-2'>Save time and remove the <br /> headache of cash tips <br /> <span className='text-xs text-blue-500'>There's no legwork required for your team <br /> to receive their tips. Payments are paid <br /> directly to their existing bank accounts.</span> </p>
          </div>

          <div className='sm:pt-10 hover:scale-110 duration-300'>
            <img src="/res3.svg" className='h-24 ml-14 sm:ml-14 sm:pb-2 ' alt="" />
            <p className='text-blue-700 font-semibold text-xl pt-2'>Improve team financial <br /> wellness <br /> <span className='text-xs text-blue-500'>Removing delays between tip payouts<br /> allows your team to manage their money <br /> with ease, planning ahead.</span> </p>
          </div>


        </div>
      </div>

      <section className='mt-5 mx-5 bg-slate-800  rounded-xl p-5'>
        <div className='mt-2  flex flex-col justify-center items-center'>
          <p className='text-3xl text-blue-600 font-semibold '>Digital tip jars for your restaurant </p>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-24 text-center py-8 px-8 sm:px-0 mt-5'>

            <div className='shadow-md shadow-gray-500 rounded-md duration-200 hover:scale-105'>
              <img className='rounded-md duration-200 hover:scale-105 h-56' src="/resj1.jpg" alt="" />
              <div className='flex items-center justify-center'>
                <p className='text-green-600 font-semibold py-4'>At your order counters.</p>
              </div>
            </div>

            <div className='shadow-md shadow-gray-500 rounded-md duration-200 hover:scale-105'>
              <img className='rounded-md duration-200 hover:scale-105 h-56' src="/resj2.jpg" alt="" />
              <div className='flex items-center justify-center'>
                <p className='text-green-600 font-semibold py-4'>On each of your tables</p>
              </div>
            </div>


            <div className='shadow-md  shadow-gray-500 rounded-md duration-200 hover:scale-105'>
              <img className='rounded-md duration-200 hover:scale-105 h-56' src="/resj3.jpg" alt="" />
              <div className='flex items-center justify-center'>
                <p className='text-green-600 font-semibold py-4'>Added to your deliveries</p>
              </div>
            </div>
          </div>
        </div>
      </section>




    </div>







  )
}

export default Home
