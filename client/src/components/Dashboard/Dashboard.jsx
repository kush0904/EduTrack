import { Box } from '@mui/material';
import React from 'react';
import Header from '../Global/Header';
import ChatBot from './ChatBot';
import Sidebars from '../Global/SideBar';

const Dashboard = () => {
  return (
      <Box m="20px">
        <Box alignItems="center">
          <Header title="DASHBOARD" subtitle="" />
          <ChatBot />
        </Box>  
      </Box>
  );
};

export default Dashboard;