import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Banner */}
        <div className="bg-[#8eab92] h-64 text-white flex flex-col justify-center items-center gap-3 shadow">
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <h3 className="text-lg">
            <Link to="/" className="underline">
              Home
            </Link>{" "}
            / Contact
          </h3>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              We’d love to hear from you!
            </h2>
            <p className="text-gray-600 mb-4">
              Got a question about our sarees? Need help with your order? We're
              here for you.
            </p>
            <div className="text-gray-700 text-md space-y-3">
              <p>
                <strong>Email:</strong> support@narisaree.com
              </p>
              <p>
                <strong>Phone:</strong> +91 98765 43210
              </p>
              <p>
                <strong>Address:</strong> 12th Cross, Bangalore, India
              </p>
              <p>
                <strong>Hours:</strong> Mon - Sat, 10AM - 6PM
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white p-6 shadow-md rounded-xl space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                rows="4"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#8eab92] text-white px-4 py-2 rounded hover:bg-[#779e85] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
