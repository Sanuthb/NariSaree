import React, { useState, useEffect } from "react";
import axios from "axios";
import Sareecard from "../components/Sareecard";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Shop = () => {
  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");  // Fetch products from backend
        setSarees(response.data);  // Update state with fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);  // Set loading to false once products are fetched
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Banner */}
        <div className="bg-[#8eab92] h-64 text-white flex items-center justify-center flex-col gap-3 shadow-lg">
          <h1 className="text-5xl font-bold">Shop</h1>
          <h3 className="text-lg">
            <Link to="/" className="underline">
              Home
            </Link>{" "}
            / Shop
          </h3>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Explore Our Sarees
          </h2>

          {loading ? (
            <div className="text-center text-xl">Loading...</div>  // Show loading indicator
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {sarees.map((saree) => (
                <Sareecard
                  key={saree._id}
                  img={saree.img}
                  name={saree.title}
                  price={saree.price}
                  id={saree._id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
