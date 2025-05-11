import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, Typography, Paper, Select, MenuItem
} from '@mui/material';

const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/orders');
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
        status: newStatus
      });
      // Update state locally
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
      <Typography variant="h6" gutterBottom>Order List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Products</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.user?.email || 'N/A'}</TableCell>
                <TableCell>{order.user?.id || 'N/A'}</TableCell>
                <TableCell>{order.user?.address || 'N/A'}</TableCell>
                <TableCell>₹{order.total}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Processing">Processing</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  {order.products.map((product, idx) => (
                    <div key={idx} style={{ marginBottom: '12px' }}>
                      <img
                        src={product.productId.img}
                        alt={product.productId.title}
                        width={50}
                        height={50}
                        style={{ borderRadius: 4 }}
                      />
                      <Typography variant="body2">{product.productId.title}</Typography>
                      <Typography variant="body2">Qty: {product.quantity}</Typography>
                      {product.selectedKuchu && (
                        <div style={{ marginTop: 6 }}>
                          <img
                            src={product.selectedKuchu.img}
                            alt={product.selectedKuchu.title}
                            width={50}
                            height={50}
                            style={{ borderRadius: 4 }}
                          />
                          <Typography variant="body2">Kuchu: {product.selectedKuchu.title}</Typography>
                          <Typography variant="body2">₹{product.selectedKuchu.price}</Typography>
                        </div>
                      )}
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrdersTab;
