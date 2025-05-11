import React, { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Service from "../components/Service";
import Sareecard from "../components/Sareecard";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products"); // Backend URL
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="bg-[#8eab92] w-full px-10 py-2 flex gap-5">
        <div className="text-white flex items-center gap-2">
          <FaPhoneAlt /> +91 1234567890
        </div>
        <div className="text-white flex items-center gap-2">
          <MdOutlineEmail /> info@narisaree.com
        </div>
      </div>
      <Navbar />
      <div className="h-1/2 w-full relative">
        <img src="/mainbanner2.jpg" alt="banner" className="h-full w-full" />
        <div className="absolute top-1/2 left-10 px-20 text-white flex gap-10 flex-col">
          <div>
            <h4 className="text-2xl font-bold font-serif">New Season</h4>
            <h1 className="text-5xl font-bold">
              Elevate your style with our exquisite
            </h1>
          </div>
          <Link
            to="/"
            className="bg-white rounded-full text-black px-13 py-3 w-fit font-medium flex gap-3 items-center justify-center"
          >
            <FaShoppingCart />
            Shop
          </Link>
        </div>
      </div>
      <Service />

      {/* Top Products Section */}
      <div className="flex px-50 flex-col items-center justify-center mt-10 gap-10">
        <h1 className="font-bold text-4xl">Top Product</h1>

        {loading ? (
          <div className="text-center text-xl">Loading...</div> // Show loading text
        ) : (
          <div className="flex flex-wrap gap-10">
            {products.map((product) => (
              <Sareecard
                key={product._id} // Make sure each product has a unique ID
                img={product.img}
                name={product.title}
                price={product.price}
                id={product._id}
              />
            ))}
          </div>
        )}
      </div>

      <div className="px-50 py-10 flex gap-10">
        <div className="relative">
          <img
            src="./banner3.webp"
            alt="banner3"
            className="w-full h-full object-cover"
          />
          <div className="bg-white absolute top-10 left-1/3 w-20 h-20 rounded-full flex items-center justify-center">
            <span className="font-bold text-lg -rotate-45">
              10% <br /> off
            </span>
          </div>
          <div className="absolute top-30 left-10 flex flex-col gap-3">
            <h3>Tips to Choose a</h3>
            <h1 className="text-2xl font-bold leading-1">Fancy Saree</h1>
            <h3>as per your body shape</h3>
            <Link
              to="/"
              className="bg-white rounded-full text-black px-5 py-2 w-fit font-medium flex gap-3 items-center justify-center"
            >
              <FaShoppingCart />
              Shop
            </Link>
          </div>
        </div>
        <div className="relative h-1/2">
          <img
            src="./banner2.webp"
            alt="banner3"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-10 left-5 flex flex-col gap-3">
            <h1 className="text-2xl font-bold  text-white">New Collection</h1>
            <Link
              to="/"
              className="bg-white rounded-full text-black px-5 py-2 w-fit font-medium flex gap-3 items-center justify-center"
            >
              <FaShoppingCart />
              Shop
            </Link>
          </div>
        </div>
      </div>

      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
