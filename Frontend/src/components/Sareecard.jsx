import React from "react";
import { CiStar } from "react-icons/ci";
import {Link} from "react-router-dom"

const Sareecard = ({ id ,img, name, price }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="w-50 bg-white shadow rounded-lg p-3">
        <img src={img} alt={name} className="rounded-2xl " />
        <h1 className="text-xl font-bold">{name}</h1>
        <div className="flex justify-between mt-3">
          <p>Rs {price}</p>
          <div className="flex text-[#F3C623]">
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Sareecard;
