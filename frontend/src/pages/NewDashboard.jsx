// Dashboard.jsx
import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CustomCalendar from "../components/CustomerCalender";
import NewImageSlider from "../components/NewImageSlider";
import NewCardSlider from "../components/NewCardSlider";
import TheaterDropdown from "../components/TheaterDropdown";
import SeatSelection from "../components/SeatSelection";
import NewTimeScroller from "../components/NewTimeScroller";
import useGameQueryStore from "../store";
import { CSSTransition } from "react-transition-group";
import "../styles/NewDashboard.css"; // Import the CSS file for animations
import { styled } from "@mui/material/styles";

const RadiantBox = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "#ffffff",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    margin: "-5px", // Adjust the margin to make the border thicker/thinner
    borderRadius: "inherit",
    background: "linear-gradient(45deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF)",
    backgroundSize: "200% 200%",
    animation: "gradient 5s ease infinite",
  },

  "@keyframes gradient": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

const NewDashboard = () => {
  const [activeButton, setActiveButton] = useState("home");

  const selectedCard = useGameQueryStore((s) => s.selectedCard);

  const theaterId = useGameQueryStore((s) => s.selectedTheater);

  const selectedDate = useGameQueryStore((s) => s.selectedDate);

  const availableTime = useGameQueryStore((s) => s.availableTime);

  const renderContent = () => {
    switch (activeButton) {
      case "home":
        return <Typography variant="h4">Home Content</Typography>;
      case "chart":
        return <Typography variant="h4">Chart Content</Typography>;
      case "settings":
        return <Typography variant="h4">Settings Content</Typography>;
      default:
        return null;
    }
  };

  const availableTimes = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    // Add more available times as needed
  ];

  const handleTimeSelection = (selectedTime) => {
    console.log("Selected time:", selectedTime);
    // Handle the selected time
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{
            background: "linear-gradient(135deg, #001529 0%, #181818 100%)",
            minHeight: "100vh",
            overflow: "hidden",
            display: "flex",
            paddingTop: "80px",
          }}
        >
          {/* <NewSideBar
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        /> */}

          <Box sx={{ flexGrow: 1, p: 3, position: "relative" }}>
            <Typography
              component="div"
              sx={{ color: "#e2e8f0", mb: 4, fontSize: "2.6rem" }}
            >
              ReserveNow
            </Typography>

            <Grid container spacing={2} sx={{ mt: 4 }}>
              {/* <Grid item xs={12}>
              {renderContent()}
            </Grid> */}
              <Grid item xs={12} sm={6} md={12}>
                <NewImageSlider />
              </Grid>
              <Typography
                variant="h3"
                component="div"
                sx={{
                  color: "#e2e8f0",
                  mb: 4,
                  marginLeft: "14px",
                  marginTop: "40px",
                  fontSize: "2.6rem",
                }}
              >
                Current Events
              </Typography>
              <Grid item xs={12} sm={6} md={12}>
                <Box
                  sx={{
                    height: 340,
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    width: "193vh",
                    overflowX: "hidden",
                  }}
                >
                  <NewCardSlider />
                </Box>
              </Grid>

              {selectedCard && (
                <CSSTransition
                  in={!!selectedCard}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  <>
                    <Typography
                      variant="h3"
                      component="div"
                      sx={{
                        color: "#e2e8f0",
                        mb: 4,
                        marginLeft: "14px",
                        marginTop: "40px",
                        width: "100%",
                        fontSize: "2.6rem",
                      }}
                    >
                      Add Reservation
                    </Typography>

                    <Grid item xs={12} md={4} lg={4}>
                      <RadiantBox
                        elevation={0}
                        sx={{
                          p: 2,
                          height: "100%",
                          backgroundColor: "#002548",
                          borderRadius: 6,
                          color: "white",
                        }}
                      >
                        <Typography variant="h6" gutterBottom>
                          Select Theater
                        </Typography>
                        <TheaterDropdown />
                      </RadiantBox>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8}>
                      <CustomCalendar />
                    </Grid>
                  </>
                </CSSTransition>
              )}

              {selectedDate && theaterId && (
                <>
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{
                      color: "#e2e8f0",
                      mb: 4,
                      marginLeft: "14px",
                      marginTop: "40px",
                      width: "100%",
                    }}
                  >
                    Book Your Seats
                  </Typography>
                  <Grid item xs={12} sm={8} md={9}>
                    <SeatSelection />
                  </Grid>
                  <Grid item xs={12} sm={8} md={3}>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{ textAlign: "center", mb: 2 }}
                      >
                        Select Time
                      </Typography>
                      <NewTimeScroller
                        availableTimes={availableTimes}
                        onTimeSelect={handleTimeSelection}
                      />
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default NewDashboard;
