// DashboardLayout.jsx
import { useState } from "react";
import { CssBaseline, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RenderContentProvider } from "../Context/RenderContentContext";
import AdminSeatConfigurator from "../components/AdminSeatConfigurator";
import AdminShowTimeForm from "../components/AdminShowTimeForm";
import { useAuth } from "../Context/AuthContext";
import AllBookings from "../components/AllBookings";
import UsersTable from "./UsersTable";
import SideBar from "../components/SideBar";
import MoviePostForm from "../components/MoviePostForm";
import Content from "../components/Content";
import { styled } from "@mui/system";
import BookingEmailSender from "../components/BookingMailSender";

const DashboardContainer = styled(Box)({
  display: "flex",
  minHeight: "100vh",
  width: "100vw",
  background: "linear-gradient(135deg, #1e2a38 0%, #181818 100%)",
  position: "relative",
});

const SidebarWrapper = styled(Box)({
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  width: "300px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRight: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  zIndex: 1200,
});

const MainContentWrapper = styled(Box)({
  marginLeft: "300px",
  width: "calc(100% - 300px)",
  minHeight: "100vh",
  position: "relative",
});

const DashboardLayout = () => {
  const [activeContent, setActiveContent] = useState("Layout");
  const navigate = useNavigate();
  const { authToken } = useAuth();

  if (!authToken) {
    navigate("/signin");
    return null;
  }

  const renderContent = () => {
    switch (activeContent) {
      case "Layout":
        return (
          <>
            <AdminSeatConfigurator />
            <AdminShowTimeForm />
          </>
        );
      case "Bookings":
        return <AllBookings />;
      case "Events":
        return <MoviePostForm />;
      case "Users":
        return <UsersTable />;
      case "Mail Service":
        return <BookingEmailSender/>;
      default:
        return (
          <Typography
            variant="h4"
            sx={{
              color: "#e2e8f0",
              textAlign: "center",
              mt: 4,
            }}
          >
            Welcome to the Dashboard
          </Typography>
        );
    }
  };

  return (
    <DashboardContainer>
      <CssBaseline />
      <SidebarWrapper>
        <SideBar
          setActiveContent={setActiveContent}
          activeContent={activeContent}
        />
      </SidebarWrapper>
      <MainContentWrapper>
        <RenderContentProvider renderContent={renderContent}>
          <Content />
        </RenderContentProvider>
      </MainContentWrapper>
    </DashboardContainer>
  );
};

export default DashboardLayout;
