import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import Facebookpng from "../assets/facebook.png";

const FacebookButton = styled(Button)({
  width: "100%",
  backgroundColor: "#002548",
  color: "#fff",
  border: "1px solid rgba(79, 158, 255, 0.3)",
  padding: "10px 16px",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  marginTop: "20px",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(79, 158, 255, 0.1)",
    borderColor: "rgba(79, 158, 255, 0.5)",
    transform: "translateY(-2px)",
  },
});

const FacebookIcon = styled(Box)({
  width: "30px",
  height: "30px",
  backgroundColor: "#fff",
  borderRadius: "50%",
  padding: "2px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const FacebookLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [location, navigate]);

  const handleLogin = () => {
    window.location.href = `http://localhost:3000/api/auth/facebook`;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FacebookButton
        onClick={handleLogin}
        startIcon={
          <FacebookIcon component="img" src={Facebookpng} alt="Facebook logo" />
        }
      >
        Sign in with Facebook
      </FacebookButton>
    </Box>
  );
};

export default FacebookLogin;
