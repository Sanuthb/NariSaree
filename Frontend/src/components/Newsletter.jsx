import React from "react";
import { MdOutlineMail } from "react-icons/md";
const Newsletter = () => {
  return (
    <div className="bg-[#efefef] rounded-2xl mx-50 p-10 flex gap-5 items-center">
      <div className="bg-[#8eab92] w-20 h-20 rounded-full flex items-center justify-center text-5xl text-white">
        <MdOutlineMail />
      </div>
      <div>
        <h1 className="font-bold text-2xl">Newsletter</h1>
        <p className="text-sm">Get free 20% discount for all products on your first order.</p>
      </div>
      <div className="bg-white rounded-full ">
        <input  className="px-2 py-4 rounded-full w-70 focus:outline-0 text-black" type="text" placeholder="Enter Your E-mail.." />
        <button className="bg-[#8eab92] px-2 py-4 text-white rounded-r-2xl">Subscribe</button>
      </div>
    </div>
  );
};

export default Newsletter;
