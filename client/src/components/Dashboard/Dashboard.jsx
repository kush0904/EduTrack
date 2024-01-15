import { Box } from '@mui/material';
import React from 'react';
import Header from '../Global/Header';

const Dashboard = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <h2>AI CHATBOT HERE</h2>

      </Box>
    </Box>
  );
};

export default Dashboard;