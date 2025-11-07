import React from 'react'
import { Link } from 'react-router-dom'
import RydeUP from '../assets/RydeUP.png'

const Start = () => {
  return (
    <div>
    <div className='bg-cover  bg-center bg-[url(https://images.unsplash.com/photo-1624724126923-e2c021df1311?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full'>
     <img className='w-20 ml-5 ' src={RydeUP}></img>
     <div className='bg-white pb-7 py-5 px-5'>
        <h2 className='text-[30px] font-bold'>Get Started with RydeUP</h2>
        <Link to='login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
    </div> 
     </div>

    </div>
  )
}

export default Start