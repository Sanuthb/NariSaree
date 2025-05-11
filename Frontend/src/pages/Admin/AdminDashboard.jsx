import React, { useState } from 'react';
import {
  Container, Paper, Typography, Tabs, Tab, Box, Button
} from '@mui/material';
import UsersTab from './UsersTab';
import OrdersTab from './OrdersTab';
import AddProduct from './AddProduct';
import ViewProducts from './ViewProducts';
import AddKuchu from './AddKuchu';
import { useNavigate } from 'react-router-dom';
import ViewKuchu from './ViewKuchu';

const AdminDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/login');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" color="primary">Admin Dashboard</Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ mt: 2 }}
        >
          <Tab label="Users" />
          <Tab label="Orders" />
          <Tab label="AddProduct" />
          <Tab label="ViewProducts" />
          <Tab label="AddKuchu" />
          <Tab label="ViewKuchu" />
        </Tabs>

        <Box mt={2}>
          {tabIndex === 0 && <UsersTab />}
          {tabIndex === 1 && <OrdersTab />}
          {tabIndex === 2 && <AddProduct />}
          {tabIndex === 3 && <ViewProducts />}
          {tabIndex === 4 && <AddKuchu />}
          {tabIndex === 5 && <ViewKuchu />}
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
