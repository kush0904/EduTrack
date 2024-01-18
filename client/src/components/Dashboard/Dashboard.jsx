import { Box } from '@mui/material';
import React from 'react';
import Header from '../Global/Header';
import ChatBot from './ChatBot';
import Sidebars from '../Global/SideBar';

const Dashboard = () => {
  return (
      <Box m="20px">
        <Box alignItems="center">
          <Header title="EDUTRACK+" subtitle="" />
          <h4 style={{textAlign:"center", marginBottom:"4vh"}}>Tracking Academic Success Efficiently</h4>
          <ChatBot />
        </Box>  
      </Box>
  );
};

export default Dashboard;