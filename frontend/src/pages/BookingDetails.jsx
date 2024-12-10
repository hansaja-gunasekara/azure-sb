import React from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import Swal from "sweetalert2";
import seatService from "../services/seatService";
import bookingService from "../services/bookingService";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { styled } from "@mui/system";

const StyledContainer = styled(Box)({
  padding: 3,
  maxWidth: "203vh",
  margin: "auto",
  marginTop: "100px",
  marginTop: "170px",
  marginBottom: "90px",
});

const StyledPaper = styled(Paper)({
  padding: "32px",
  borderRadius: "16px",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
});

const DetailLabel = styled(Typography)({
  color: "#e2e8f0",
  fontWeight: 500,
  marginBottom: "8px",
});

const DetailValue = styled(Typography)({
  color: "#94a3b8",
  marginBottom: "16px",
  fontSize: "1.1rem",
});

const ConfirmButton = styled(Button)({
  backgroundColor: "#5C2FC2",
  color: "#ffffff",
  padding: "12px",
  marginTop: "24px",
  "&:hover": {
    backgroundColor: "#4925A3",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
});

const bookSeat = async (bookingDataStr, userId, accessToken) => {
  try {
    const response = await axios.post(
      "https://azure-reservation-app.azurewebsites.net/api/create-calendar-event",
      {
        userId: userId,
        bookingDate: bookingDataStr.bookingDate,
        bookingTime: bookingDataStr.bookingTime,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Calendar event created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error booking seat and creating event:", error);
  }
};

const BookingDetails = () => {
  const bookingData = localStorage.getItem("bookingData");
  console.log("Booking data:", bookingData);
  const bookingDataStr = JSON.parse(bookingData);
  const theaterId = bookingDataStr.theater;
  const selectedSeats = bookingDataStr.seats;
  const { getCurrentUser } = useAuth();
  const userId = getCurrentUser()._id;
  const accessToken = getCurrentUser().accessToken;
  const service = getCurrentUser().service;

  const navigate = useNavigate();

  const handleConfirm = () => {
    Swal.fire({
      title: "Confirm Booking?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: "#1e2a38",
      color: "#e2e8f0",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#5C2FC2",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        seatService
          .CreateSeat({ theaterId, selectedSeats})
          .then((response) => {
            console.log(response.data);
            bookingService
              .Create(bookingDataStr)
              .then((response) => {
                if (service === "google") {
                  Swal.fire({
                    title: "Set reminder to the Google calender?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    background: "#1e2a38",
                    color: "#e2e8f0",
                    confirmButtonColor: "#dc2626",
                    cancelButtonColor: "#5C2FC2",
                    confirmButtonText: "Confirm",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      const res = bookSeat(bookingDataStr, userId, accessToken);
                      Swal.fire({
                        title: "Success!",
                        text: "Booking process completed.",
                        icon: "success",
                        color: "#e2e8f0",
                        background: "#1e2a38",
                      });
                      navigate("/");
                    } else {
                      Swal.fire({
                        title: "Success!",
                        text: "Booking process completed.",
                        icon: "success",
                        color: "#e2e8f0",
                        background: "#1e2a38",
                      });
                      navigate("/");
                    }
                  });
                }
                if (service !== "google") {
                  Swal.fire({
                    title: "Success!",
                    text: "Booking process completed.",
                    icon: "success",
                    color: "#e2e8f0",
                    background: "#1e2a38",
                  });
                }

                navigate("/");
                console.log(response.data);
              })
              .catch((error) => {
                console.error("Error booking seats:", error);
              });
          })
          .catch((error) => {
            console.error("Error booking seats:", error);
          });
      }
    });
  };

  return (
    <StyledContainer>
      <ToastContainer />
      <StyledPaper elevation={0}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: "#e2e8f0",
            fontWeight: "600",
            marginBottom: "32px",
            letterSpacing: "0.5px",
          }}
        >
          Booking Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DetailLabel variant="h6">Ref No</DetailLabel>
            <DetailValue variant="body1">
              tfe888gujw
            </DetailValue>
          </Grid>

          <Grid item xs={6}>
            <DetailLabel variant="h6">Date</DetailLabel>
            <DetailValue variant="body1">
              {bookingDataStr.bookingDate}
            </DetailValue>
          </Grid>

          <Grid item xs={6}>
            <DetailLabel variant="h6">Time</DetailLabel>
            <DetailValue variant="body1">
              {bookingDataStr.bookingTime}
            </DetailValue>
          </Grid>

          <Grid item xs={6}>
            <DetailLabel variant="h6">Total Price</DetailLabel>
            <DetailValue variant="body1">
              ${bookingDataStr.totalAmount}
            </DetailValue>
          </Grid>

          <Grid item xs={6}>
            <DetailLabel variant="h6">Seats</DetailLabel>
            <DetailValue variant="body1">
              {bookingDataStr.seats.join(", ")}
            </DetailValue>
          </Grid>
        </Grid>

        <ConfirmButton variant="contained" onClick={handleConfirm} fullWidth>
          Confirm Booking
        </ConfirmButton>
      </StyledPaper>
    </StyledContainer>
  );
};

export default BookingDetails;
