import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Navbar = () => {

  return (
    <div className='flex items-center justify-between px-20 py-5'>
      <Link to="/"><img src="/logo.webp" className='w-30' alt="logo" /></Link>
      <ul className='flex items-center justify-between w-1/3'>
        <Link className="text-xl" to="/">Home</Link>
        <Link className="text-xl" to="/about">About</Link>
        <Link className="text-xl" to="/product">Shop</Link>
        <Link className="text-xl" to="/contact">Contact</Link>
        <Link className="text-xl" to="/cart"><FaShoppingCart /></Link>
        <Link className="text-xl" to="/dashboard"><FaUser /></Link>
      </ul>
    </div>
  )
}

export default Navbar
