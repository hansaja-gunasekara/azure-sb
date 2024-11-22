import React from "react";
import { Typography, Grid, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import useBooking from "../hooks/useBooking";
import Swal from "sweetalert2";
import axios from "axios";

const RadiantBox = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  overflow: "hidden",
  marginBottom: "20px",
  marginTop: "200px",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    margin: "-5px",
    borderRadius: "inherit",
    background: "linear-gradient(45deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF)",
    backgroundSize: "200% 200%",
    animation: "gradient 5s ease infinite",
  },
}));

const ActionButton = styled(Button)({
  backgroundColor: "#003366", // Dark Blue color
  color: "#fff", // White text
  "&:hover": {
    backgroundColor: "#002244", // Darker Blue on hover
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
});

const ScannedBookingDetails = () => {
  const onReleaseBooking = () => {};

  const { bookingId } = useParams();

  const { data, refetch } = useBooking(bookingId);

  console.log("scanned booking: ", data);

  const handleCancelBooking = async (bookingId) => {
    console.log("bookingId: ", bookingId);
    try {
      Swal.fire({
        title: "Release Booking?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        background: "#1e2a38",
        color: "#e2e8f0",
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#5C2FC2",
        confirmButtonText: "Confirm",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(
            `http://localhost:3000/api/bookings/${bookingId}`
          );
          refetch();
          console.log("Booking canceled:", res.data);
        }
      });
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  return (
    <RadiantBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            sx={{
              color: "black",
              mb: 1,
              fontSize: "1.8rem",
              fontWeight: "bold",
            }}
          >
            {data?.theaterName}
          </Typography>
          <Typography
            sx={{ color: "black", fontSize: "1.2rem", fontWeight: "500" }}
          >
            Seats: {data?.seats.join(", ")}
          </Typography>
          <Typography
            sx={{ color: "black", fontSize: "1.2rem", fontWeight: "500" }}
          >
            Amount: ${data?.totalAmount}
          </Typography>
          <Typography
            sx={{ color: "black", fontSize: "1.2rem", fontWeight: "500" }}
          >
            Date: {data?.bookingDate} | Time: {data?.bookingTime}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {data?.state === "booked" ? (
            <ActionButton onClick={() => handleCancelBooking(data?._id)}>
              Release Booking
            </ActionButton>
          ) : (
            null
          )}
        </Grid>
      </Grid>
    </RadiantBox>
  );
};

export default ScannedBookingDetails;
