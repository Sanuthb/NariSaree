import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#8eab92] text-white py-8 px-4 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">NariSaree</h2>
          <p className="text-sm">
            Elegant traditional sarees for every occasion. Made with love in India.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <div className="space-y-1 text-sm">
            <Link to="/">Home</Link><br />
            <Link to="/products">Shop</Link><br />
            <Link to="/about">About Us</Link><br />
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm">Email: support@NariSaree.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
          <p className="text-sm">Address: Bangalore, India</p>
        </div>
      </div>

      <div className="mt-8 text-center text-xs">
        © {new Date().getFullYear()} NariSaree. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
