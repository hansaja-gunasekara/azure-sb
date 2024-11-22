import React from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import SideBarButton from "./SideBarButton";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 300,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 300,
    boxSizing: "border-box",
    background: "linear-gradient(180deg, #1e2a38 0%, #181818 100%)",
    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
  },
}));

const LogoTypography = styled(Typography)({
  marginTop: "29px",
  fontSize: "30px",
  fontWeight: "bold",
  color: "#e2e8f0",
  textAlign: "center",
  letterSpacing: "1px",
  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
});

const ButtonContainer = styled(Box)({
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
});

const LogoutButton = styled(Button)({
  backgroundColor: "#5C2FC2",
  width: "252px",
  height: "45px",
  marginTop: "auto",
  borderRadius: "8px",
  color: "#fff",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#4925A3",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(92, 47, 194, 0.3)",
  },
});

const SideBar = ({ setActiveContent, activeContent }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const menuItems = ["Layout", "Bookings", "Events", "Users", "Mail Service"];

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <LogoTypography>ReserveNow</LogoTypography>
      <ButtonContainer>
        {menuItems.map((item) => (
          <SideBarButton
            key={item}
            activeContent={activeContent}
            setActiveContent={setActiveContent}
            title={item}
            sx={{
              width: "100%",
              backgroundColor:
                activeContent === item
                  ? "rgba(92, 47, 194, 0.2)"
                  : "transparent",
              "&:hover": {
                backgroundColor: "rgba(92, 47, 194, 0.1)",
              },
            }}
          />
        ))}
        <Box sx={{ flexGrow: 1, minHeight: "200px" }} /> {/* Spacer */}
        <LogoutButton variant="contained" onClick={handleLogout} fullWidth>
          Logout
        </LogoutButton>
      </ButtonContainer>
    </StyledDrawer>
  );
};

export default SideBar;
