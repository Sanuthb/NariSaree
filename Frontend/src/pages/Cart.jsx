import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState(""); // State to store the user address
  const navigate = useNavigate();

  // Fetch the cart data from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(updatedCart);
  }, []);

  // Calculate the total cost whenever cartItems change
  useEffect(() => {
    const calculatedTotal = cartItems.reduce((sum, item) => {
      const itemTotal =
        item.price * item.quantity +
        (item.selectedKuchu?.price || 0) * item.quantity;
      return sum + itemTotal;
    }, 0);
    setTotal(calculatedTotal);
  }, [cartItems]);

  // Update cart data in localStorage
  const updateLocalStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  // Handle quantity changes
  const handleQuantityChange = (index, delta) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity += delta;
    if (updatedItems[index].quantity < 1) updatedItems[index].quantity = 1;
    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  // Remove item from cart
  const handleRemoveItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  // Handle placing the order
  const handlePlaceOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      const payload = {
        userId,
        products: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          selectedKuchu: item.selectedKuchu,
        })),
        total,
        address, // Send address with the order
      };

      // Send order data to the backend
      await axios.post("http://localhost:5000/api/orders", payload);
      alert("Order placed successfully!");
      navigate("/"); // Navigate to home page after order placement
      localStorage.removeItem("cart"); // Clear cart from localStorage
      setCartItems([]);
      setTotal(0);
      setAddress(""); // Reset address field
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-6 border-b pb-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-gray-700">Price: ₹{item.price}</p>

                    {item.selectedKuchu && (
                      <div className="mt-2">
                        <p className="text-sm font-semibold text-gray-600">
                          Kuchu Design: {item.selectedKuchu.title}
                        </p>
                        <img
                          src={item.selectedKuchu.img}
                          alt={item.selectedKuchu.title}
                          className="w-20 h-20 mt-1 object-cover rounded"
                        />
                        <p className="text-sm text-gray-600">
                          Kuchu Price: ₹{item.selectedKuchu.price}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center border px-2 rounded">
                        <button
                          onClick={() => handleQuantityChange(index, -1)}
                          className="px-2 py-1 text-lg"
                        >
                          −
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(index, 1)}
                          className="px-2 py-1 text-lg"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Address Input Field */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Enter Shipping Address</h3>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                rows="4"
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mt-10 text-right">
              <h3 className="text-2xl font-bold">Total: ₹{total}</h3>
              <button
                onClick={handlePlaceOrder}
                className="mt-4 bg-[#8eab92] text-white py-2 px-6 rounded hover:bg-[#7caa82] cursor-pointer"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
