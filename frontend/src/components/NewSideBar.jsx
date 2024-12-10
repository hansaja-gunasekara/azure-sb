// Sidebar.jsx
import React from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

const NewSideBar = ({ activeButton, setActiveButton }) => {
  const buttons = [
    { icon: <HomeIcon />, value: "home" },
    { icon: <BarChartIcon />, value: "chart" },
    { icon: <SettingsIcon />, value: "settings" },
    
  ];

  return (
    <Box
      sx={{
        width: "64px",
        bgcolor: "rgba(255, 255, 255, 0.05)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2,
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ color: "#4fd1c5", mb: 4 }}
      >
        <MenuIcon />
      </IconButton>
      {buttons.map((button) => (
        <IconButton
          key={button.value}
          onClick={() => setActiveButton(button.value)}
          sx={{
            color: activeButton === button.value ? "#4fd1c5" : "#e2e8f0",
            mb: 2,
          }}
        >
          {button.icon}
        </IconButton>
      ))}
    </Box>
  );
};

export default NewSideBar;
