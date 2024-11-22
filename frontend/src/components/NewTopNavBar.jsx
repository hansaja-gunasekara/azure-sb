import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Link,
  Avatar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import ReactQRScanner from "react-qr-scanner"; // Import the QR scanner component
import useUser from "../hooks/useUser";
import mainLogo from "../assets/mainlogo.png";

const StyledAppBar = styled(AppBar)({
  background: "#001529",
  boxShadow: "none",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
});

const NavButton = styled(Button)({
  color: "rgba(255,255,255,0.85)",
  textTransform: "none",
  fontSize: "16px",
  padding: "8px 16px",
  "&:hover": {
    color: "#FFB800",
    background: "transparent",
  },
});

const Logo = styled("img")({
  height: "40px",
});

const ProfileButton = styled(IconButton)({
  padding: "4px",
});

const LogoutBtn = styled(Button)({
  color: "#fff",
  textTransform: "none",
  fontSize: "14px",
  padding: "6px 16px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.2)",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.3)",
  },
});

const NewTopNavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null); // To hold the QR code data
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false); // To control QR scanner visibility
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    navigate("/mybookings");
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    navigate("/profile");
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const handleScan = (data) => {
    if (data) {
      const qrCodeJson = JSON.parse(data.text); // Parse the JSON string
      const bookingId = qrCodeJson.bookingId; // Extract the bookingId

      console.log("Booking ID:", bookingId);

      if(bookingId) {
        navigate(`/scannedbooking/${bookingId}`);
      }
      setQrCodeData(data); // Store the QR code data
      setIsQrScannerOpen(false); // Close the scanner after scan
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const { logout, getCurrentUser } = useAuth();

  const userId = getCurrentUser()._id;

  const { data } = useUser(userId);

  console.log("My data: ", data);

  const currentUserRole = getCurrentUser().role;

  return (
    <StyledAppBar position="fixed">
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ py: 1.5 }}>
          {/* Left Side: Logo and Navigation */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Link
              href="/"
              sx={{ display: "flex", alignItems: "center", mr: 3 }}
            >
              <Logo src={mainLogo} alt="Logo" />
            </Link>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <NavButton onClick={handleCloseNavMenu}>My Booking</NavButton>
              <NavButton onClick={() => navigate("/")}>Home</NavButton>
            </Box>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">My Booking</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/")}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Right Side: Profile, Logout, and QR Scanner */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {currentUserRole === "admin" && (
              <NavButton onClick={() => setIsQrScannerOpen(true)}>
                Scan QR
              </NavButton>
            )}

            {/* QR Scan button */}
            {isQrScannerOpen && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 9999,
                }}
              >
                <ReactQRScanner
                  delay={300}
                  onScan={handleScan}
                  onError={handleError}
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            )}
            <LogoutBtn
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              Logout
            </LogoutBtn>
            <ProfileButton onClick={handleOpenUserMenu}>
              <Avatar
                alt="User Name"
                src={data?.picture}
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid #FFB800",
                }}
              />
            </ProfileButton>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                sx: {
                  background: "#001529",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.1)",
                  minWidth: "200px",
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {data?.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {data?.email}
                </Typography>
              </Box>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
              <MenuItem onClick={handleCloseUserMenu}>
                <AccountCircleIcon sx={{ mr: 1 }} /> Profile
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ display: { sm: "none" } }}>
                <LogoutIcon sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default NewTopNavBar;
