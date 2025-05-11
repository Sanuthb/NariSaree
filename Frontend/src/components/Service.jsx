import React from "react";
import { FaTruck } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { IoGiftSharp } from "react-icons/io5";
import { FaHeadphonesSimple } from "react-icons/fa6";

const Service = () => {
  const service = [
    {
      icon: <FaTruck />,
      title: "Free shipping",
      description: "On order over Rs 1550",
    },
    {
      icon: <GiWallet />,
      title: "Cash On Delivery",
      description: "100% money back guarantee",
    },
    {
      icon: <IoGiftSharp />,
      title: "Special Gift Card",
      description: "Offer special bonuses with gift",
    },
    {
      icon: <FaHeadphonesSimple />,
      title: "24/7 customer service",
      description: "Call us 24/7 at 123-456-789",
    },
  ];
  return (
    <div className="flex items-center justify-center  gap-10 px-10 py-5">
      {service.map((item, index) => {
        return (
          <div key={index} className="bg-[#e0dede] rounded-2xl p-10 shadow-lg flex gap-2 flex-col items-center justify-center">
            <div className="bg-[#8eaa91] flex items-center justify-center rounded-full p-1 text-3xl text-white w-20 h-20">
              {item.icon}
            </div>
            <h3 className="font-bold uppercase">{item.title}</h3>
            <p className="font-light">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Service;
