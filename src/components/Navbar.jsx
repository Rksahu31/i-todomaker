// import React from 'react'

function Navbar() {
  return (
    <nav className="flex justify-between bg-slate-900 text-white p-3">
    <div className="logo hover:text-blue-800 cursor-pointer transition-all ">
    <span className="font-bold text-xl mx-8 ">
    i-Task

    </span>

    </div>
    <ul className="flex gap-8 mx-9">
    <li className="cursor-pointer hover:font-bold  transition-all ">Home</li>
    <li className="cursor-pointer   hover:font-bold transition-all ">Your Task</li>
    </ul>

    </nav>
  )
}

export default Navbar
