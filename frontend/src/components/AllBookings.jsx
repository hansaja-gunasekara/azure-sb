import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItemText,
  Divider,
  CircularProgress,
  Grid,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { styled } from "@mui/system";

// Styled Components
const ContentWrapper = styled(Box)({
  padding: "24px",
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "16px",
  marginRight: "24px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  minHeight: "100vh",
});

const StyledButton = styled(Button)({
  backgroundColor: "#5C2FC2",
  color: "#fff",
  marginBottom: "20px",
  marginRight: "10px",
  "&:hover": {
    backgroundColor: "#4925A3",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
});

const BookingCard = styled(Paper)({
  marginBottom: "20px",
  padding: "20px",
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
});

const AllBookings = () => {
  const { getCurrentUser } = useAuth();
  const customerEmail = getCurrentUser().email;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/bookings");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerEmail]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Theater Name",
      "Seats",
      "Total Amount",
      "Booking Date",
      "Booking Time",
      "Customer Name",
      "Customer Email",
    ];
    const tableRows = [];

    orders.forEach((order) => {
      const orderData = [
        order.theaterName,
        order.seats.join(", "),
        order.totalAmount,
        order.bookingDate,
        order.bookingTime,
        order.customerName,
        order.customerEmail,
      ];
      tableRows.push(orderData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("All Bookings Report", 14, 15);
    doc.save("bookings_report.pdf");
  };

  const downloadCSV = () => {
    const csvRows = [];
    const headers = [
      "Theater Name",
      "Seats",
      "Total Amount",
      "Booking Date",
      "Booking Time",
      "Customer Name",
      "Customer Email",
    ];
    csvRows.push(headers.join(","));

    orders.forEach((order) => {
      const orderData = [
        order.theaterName,
        order.seats.join(", "),
        order.totalAmount,
        order.bookingDate,
        order.bookingTime,
        order.customerName,
        order.customerEmail,
      ];
      csvRows.push(orderData.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "bookings_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <CircularProgress sx={{ color: "#5C2FC2" }} />
      </Box>
    );
  }

  return (
    <ContentWrapper>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: "2rem",
          color: "#e2e8f0",
          fontWeight: "600",
          mb: 3,
        }}
      >
        All Bookings
      </Typography>

      <Box sx={{ mb: 3 }}>
        <StyledButton onClick={generatePDF}>Generate PDF Report</StyledButton>
        <StyledButton onClick={downloadCSV}>Download CSV Report</StyledButton>
      </Box>

      {orders.length === 0 ? (
        <Typography sx={{ fontSize: "1.25rem", color: "#e2e8f0" }}>
          No orders found
        </Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <BookingCard key={order._id} elevation={0}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <ListItemText
                    primary={`Theater: ${order.theaterName}`}
                    secondary={`Seats: ${order.seats.join(
                      ", "
                    )} | Total Amount: $${order.totalAmount}`}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "1.5rem",
                        fontWeight: "500",
                        color: "#e2e8f0",
                      },
                    }}
                    secondaryTypographyProps={{
                      sx: {
                        fontSize: "1.25rem",
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                  <Typography
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: "500",
                      color: "#e2e8f0",
                      mb: 1,
                    }}
                  >
                    {`Booking Date: ${order.bookingDate}`}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: "500",
                      color: "#e2e8f0",
                    }}
                  >
                    {`Booking Time: ${order.bookingTime}`}
                  </Typography>
                </Grid>
              </Grid>

              <Divider
                sx={{
                  my: 2,
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              />

              <Typography
                sx={{
                  fontSize: "1rem",
                  color: "rgba(255, 255, 255, 0.7)",
                  mb: 1,
                }}
              >
                Customer Name: {order.customerName}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                Customer Email: {order.customerEmail}
              </Typography>
            </BookingCard>
          ))}
        </List>
      )}
    </ContentWrapper>
  );
};

export default AllBookings;
