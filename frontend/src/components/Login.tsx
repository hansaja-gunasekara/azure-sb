import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import googleIcon from "../assets/googleIcon.png";
import { useAuth } from "../Context/AuthContext";

const GoogleButton = styled(Button)({
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

const GoogleIcon = styled(Box)({
  width: "30px",
  height: "30px",
  backgroundColor: "#fff",
  borderRadius: "50%",
  padding: "2px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {login} = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      login(token);
      navigate("/");
    }
  }, [location, navigate]);

  const handleLogin = () => {
    window.location.href = `https://azure-reservation-app.azurewebsites.net/api/auth/google`;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <GoogleButton
        onClick={handleLogin}
        startIcon={
          <GoogleIcon component="img" src={googleIcon} alt="Google logo" />
        }
      >
        Sign in with Google
      </GoogleButton>
    </Box>
  );
};

export default Login;
