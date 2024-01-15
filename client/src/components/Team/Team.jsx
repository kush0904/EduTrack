import { Box, useTheme } from "@mui/material";
import Header from '../Global/Header';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { tokens } from "../theme.js";

export default function Team() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users");
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'st_id', headerName: 'ID', width: 120 },
    { field: 'firstName', headerName: 'First name', width: 130, editable: true },
    { field: 'lastName', headerName: 'Last name', width: 130, editable: true },
    { field: 'age', headerName: 'Age', type: 'number', width: 20, editable: true },
    { field: 'email', headerName: 'Email', width: 190, editable: true },
    { field: 'contact', headerName: 'Contact', width: 130, editable: true },
    { field: 'address', headerName: 'Address', width: 130, editable: true },
    { field: 'city', headerName: 'City', width: 130, editable: true },
    { field: 'pincode', headerName: 'Pincode', width: 130, editable: true },
  ];

  return (
    <Box sx={{ height: 400 }} m="20px">
      <Header title="MY COLLEAGUES" subtitle="Information About Them" />
      <Box m="40px 0 0 0"
        height="73vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "2px solid white",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[700],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.redAccent[1000]} !important`,
          },
        }}>
        <DataGrid
          rows={rows} 
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row._id} 
        />
      </Box>
    </Box>
  );
}
