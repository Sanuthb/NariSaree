import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/user/${user.id}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    if (user?.id) fetchOrders();
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#8eab92]">Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Welcome, <span className="font-medium">{user?.email}</span></p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border rounded-lg p-5 bg-gray-50 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Order ID:</span> {order._id}
                  </div>
                  <div className="text-sm font-semibold text-green-600">
                    Status: {order.status}
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Total:</span> ₹{order.total}
                </div>

                <div className="mt-3 grid gap-4">
                  {order.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-center border-t pt-3 mt-3"
                    >
                      <img
                        src={item.productId?.img}
                        alt={item.productId?.title}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex flex-col text-sm text-gray-700">
                        <span className="font-medium">{item.productId?.title}</span>
                        <span>Price: ₹{item.productId?.price}</span>
                        <span>Quantity: {item.quantity}</span>
                        {item.selectedKuchu && (
                          <div className="flex items-center gap-2 mt-2">
                            <img
                              src={item.selectedKuchu.img}
                              alt={item.selectedKuchu.title}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <span className="text-xs text-gray-600">
                              Kuchu: {item.selectedKuchu.title} (₹{item.selectedKuchu.price})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Dashboard;
