import React from 'react'
import notfound from "/404.gif";
// import loading from "/loading.gif";


const Notfound = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-black overflow-hidden '>
        <img className='w-[65%]' src={notfound} alt="" />
       
    </div>
  )
}

export default Notfound