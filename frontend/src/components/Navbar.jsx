import React from 'react'
import logo from "../assets/portfolio-logo.png";

function Navbar() {
  return (
    <div className='w-full py-4 fixed flex justify-center bg-[#1a0b2e]'>
        <div className='w-full grid grid-cols-12 gap-4'>
            <div className="logo col-span-6 w-full">
                <h1 className='text-lg font-bold text-white px-25'>portfolio.</h1>
            </div>
            <div className="links flex gap-15 px-20 col-span-6 w-full">
                <a href="" className="text-white hover:underline">About me</a>
                <a href="" className="text-white hover:underline">Skills</a>
                <a href="" className="text-white hover:underline">Projects</a>
                <button className='px-4 py-1 capitalize text-black rounded-full bg-zinc-100 hover:bg-[#6c4f8d] hover:text-white'>contact</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar