import React from 'react'
import loader from "/loader.gif";
// import loading from "/loading.gif";


const Loading = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-black overflow-hidden '>
        <img className='w-[65%]' src={loader} alt="" />
       
    </div>
  )
}

export default Loading