import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const ProductDetail = () => {
  const { id } = useParams();
  const [saree, setSaree] = useState(null);
  const [kuchus, setKuchus] = useState([]);
  const [selectedKuchu, setSelectedKuchu] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setSaree(res.data))
      .catch((err) => console.error("Product fetch failed:", err));

    axios.get("http://localhost:5000/api/products/kuchu")
      .then((res) => setKuchus(res.data))
      .catch((err) => console.error("Kuchu fetch failed:", err));
  }, [id]);

  const handleAddToCart = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    }
    if (!selectedKuchu) {
      alert("Please select a Kuchu design before adding to cart.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...saree, selectedKuchu });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  if (!saree) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Saree Image */}
        <div className="lg:w-1/2">
          <img src={saree.img} alt={saree.title} className="w-full rounded shadow" />
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-2">{saree.title}</h2>
          <p className="text-xl text-gray-700 mb-4">₹{saree.price}</p>

          {/* Kuchu Selection */}
          <h4 className="text-lg font-semibold mb-2 text-green-700">
            Add your favorite Kuchu design to your saree:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {kuchus.map((kuchu) => (
              <div
                key={kuchu._id}
                onClick={() => setSelectedKuchu(kuchu)}
                className={`cursor-pointer border-2 p-2 rounded ${
                  selectedKuchu?._id === kuchu._id ? "border-green-600" : "border-gray-200"
                }`}
              >
                <img src={kuchu.img} alt={kuchu.title} className="w-full h-24 object-cover rounded" />
                <p className="text-sm text-center mt-1">{kuchu.title}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-[#8eab92] text-white py-2 px-6 rounded hover:bg-[#7caa82] cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
