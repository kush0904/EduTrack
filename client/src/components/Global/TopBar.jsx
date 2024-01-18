import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, useTheme, Typography, Tooltip } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom';

export default function TopBar({ isCollapsed }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');

    navigate("/");
    window.location.reload();

    handleMenuClose();
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      style={{ background: colors.grey[900] }}
      borderBottom="5px solid white"
    >
      {/* SEARCH BAR */}
      <Box
        display="flex"
        borderRadius="3px"
      >
        <Typography
              variant="h5"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Tracking Academic Success Efficiently
            </Typography>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <Tooltip title="No new notifications for you">
          <span>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>

        <IconButton onClick={handleMenuOpen}>
          <PersonOutlinedIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
