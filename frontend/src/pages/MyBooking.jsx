import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  Grid,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import Swal from "sweetalert2";


const ContentWrapper = styled(Box)({
  padding: "24px",
  width: "204vh",
  background: "linear-gradient(135deg, #001529 0%, #181818 100%)",
  minHeight: "100vh",
  marginTop: "70px",
});

const RadiantBox = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  overflow: "hidden",
  marginBottom: "20px",

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
  backgroundColor: "#4D96FF",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#3A7BD5",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
});

const CancelButton = styled(Button)({
  backgroundColor: "#FF6B6B",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#FF5252",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const MyBooking = () => {
  const { getCurrentUser } = useAuth();
  const customerEmail = getCurrentUser().email;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [customerEmail]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        "https://azure-reservation-app.azurewebsites.net/api/bookings/customer",
        { customerEmail }
      );
      setOrders(
        response.data.map((order) => ({
          ...order,
          poster: null,
        }))
      );
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      Swal.fire({
        title: "Cancel Booking?",
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
            `https://azure-reservation-app.azurewebsites.net/api/bookings/${bookingId}`
          );
          console.log("Booking canceled:", res.data);
          fetchOrders();
        }
      });
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress sx={{ color: "#4D96FF" }} />
      </Box>
    );
  }

  return (
    <ContentWrapper>
      <Typography
        variant="h3"
        sx={{
          color: "#e2e8f0",
          mb: 4,
          fontWeight: "400",
        }}
      >
        My Bookings
      </Typography>

      {orders?.length === 0 ? (
        <Typography sx={{ color: "#e2e8f0", fontSize: "1.25rem" }}>
          No bookings found
        </Typography>
      ) : (
        <List>
          {orders?.map((order) => (
            <RadiantBox key={order._id}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  {order.poster ? (
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        paddingTop: "133%", // 3:4 aspect ratio
                        borderRadius: "8px",
                        overflow: "hidden",
                        mb: { xs: 2, md: 0 },
                      }}
                    >
                      <img
                        src={order.poster}
                        alt="Event poster"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        minHeight: 200,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "8px",
                        mb: { xs: 2, md: 0 },
                      }}
                    ></Box>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h5" sx={{ color: "#e2e8f0", mb: 1 }}>
                    {order.theaterName}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Seats: {order.seats.join(", ")}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Amount: ${order.totalAmount}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Date: {order.bookingDate} | Time: {order.bookingTime}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <CancelButton onClick={() => handleCancelBooking(order._id)}>
                    Cancel Booking
                  </CancelButton>
                </Grid>
              </Grid>
            </RadiantBox>
          ))}
        </List>
      )}
    </ContentWrapper>
  );
};

export default MyBooking;
