import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Snackbar,
  useMediaQuery,
} from "@mui/material";
import useSeats from "../hooks/useSeats"; // Adjust the import path based on your structure
import seatService from "../services/seatService";
import useGameQueryStore from "../store";
import LivingIcon from "@mui/icons-material/Living";
import dayjs from "dayjs";
import { useAuth } from "../Context/AuthContext";
import Joi from "joi"; // Import Joi
import { useNavigate } from "react-router-dom";

const sectionPrices = {
  VIP: 15,
  Standard: 10,
};

const getFormattedDate = (dayjsObject) => {
  return dayjs(dayjsObject).format("YYYY-MM-DD"); // Customize format as needed
};

// Joi schema for booking validation
const bookingSchema = Joi.object({
  theater: Joi.string().required(),
  seats: Joi.array().items(Joi.string()).required(),
  customerName: Joi.string().min(1).required(),
  customerEmail: Joi.string()
    .pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) // Custom regex for email validation
    .required(),
  totalAmount: Joi.number().greater(0).required(),
  bookingDate: Joi.string().isoDate().required(),
  bookingTime: Joi.string().required(),
  event: Joi.string().required(),
});

const SeatSelection = () => {
  const theaterId = useGameQueryStore((s) => s.selectedTheater);
  const { data, isLoading, isError } = useSeats(theaterId);
  const [seatLayout, setSeatLayout] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Media query to detect screen size
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  const selectedDate = useGameQueryStore((s) => s.selectedDate);
  const selectedTime = useGameQueryStore((s) => s.selectedTime);
  const selectedCard = useGameQueryStore((s) => s.selectedCard);

  const { getCurrentUser } = useAuth();
  const { _id, name, email } = getCurrentUser();

  console.log("Current User :", _id, name, email);

  // Effect to handle seat layout when data changes
  useEffect(() => {
    if (data) {
      const layout = {};
      data.forEach((seat) => {
        const { section, row, number, isAvailable } = seat;

        if (!layout[section]) {
          layout[section] = [];
        }

        const rowIndex = row;
        if (!layout[section][rowIndex]) {
          layout[section][rowIndex] = [];
        }

        layout[section][rowIndex][number] = isAvailable;
      });
      setSeatLayout(layout);
    }
  }, [data]);

  // Handle seat selection
  const handleSeatClick = (section, row, col) => {
    const seatId = `${section}-${row}-${col}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
      updateTotalPrice(seatId, "remove");
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
      updateTotalPrice(seatId, "add");
    }
  };

  // Update total price based on selected seats
  const updateTotalPrice = (seatId, action) => {
    const [section] = seatId.split("-");
    const price = sectionPrices[section];
    setTotalPrice(action === "add" ? totalPrice + price : totalPrice - price);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const navigate = useNavigate();

  const handleConfirm = async () => {
    if (selectedSeats.length > 0) {
      const formattedDate = getFormattedDate(selectedDate);

      // Prepare booking data
      const bookingData = {
        theater: theaterId,
        seats: selectedSeats,
        customerName: name,
        customerEmail: email,
        totalAmount: totalPrice,
        bookingDate: formattedDate,
        bookingTime: selectedTime,
        event: selectedCard._id,
      };

      console.log("Booking data:", bookingData);

      // Validate booking data
      const { error } = bookingSchema.validate(bookingData);
      if (error) {
        console.error("Validation Error:", error.details);
        return; // Exit if validation fails
      }

      // Save valid booking data to local storage
      localStorage.setItem("bookingData", JSON.stringify(bookingData));

      navigate("/bookingdetails");
      setSnackbarOpen(true);

      // seatService
      //   .CreateSeat({ theaterId, selectedSeats })
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Error booking seats:", error);
      //   });
    }
  };

  // Render loading or error states
  if (isLoading) return <Typography>Loading seats...</Typography>;
  if (isError) return <Typography>Error loading seats!</Typography>;

  // Determine button size based on screen size
  const buttonSize = isSmallScreen ? 18 : isMediumScreen ? 25 : 30;

  // Render seats
  const renderSeats = () => {
    return Object.keys(seatLayout).map((section) => (
      <Box
        key={section}
        sx={{
          mb: 4,
          borderRadius: "12px",
          padding: "20px",
          backgroundColor: "background.paper",
          boxShadow: 1,
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: 3,
          },
        }}
      >
        <Typography
          sx={{
            mb: 2,
            fontSize: "16px",
            fontWeight: "bold",
            color: "text.primary",
          }}
        >
          {section} Seats - ${sectionPrices[section]}
        </Typography>
        <Grid container justifyContent="center" sx={{ mb: 2 }}>
          {Object.keys(seatLayout[section]).map((rowKey) => {
            const row = seatLayout[section][rowKey];
            const rowIndex = rowKey;

            return (
              <Grid
                container
                key={rowKey}
                justifyContent="center"
                sx={{ mb: 1, flexWrap: "nowrap" }}
              >
                <Grid item sx={{ mr: 1, alignSelf: "center" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "medium",
                      color: "text.secondary",
                    }}
                  >
                    {rowIndex}
                  </Typography>
                </Grid>
                {row.map((isAvailable, colIndex) => {
                  const seatId = `${section}-${rowIndex}-${colIndex}`;
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <Box
                      key={colIndex}
                      onClick={() => handleSeatClick(section, rowKey, colIndex)}
                      disabled={!isAvailable}
                      sx={{
                        width: buttonSize,
                        height: buttonSize,
                        margin: 0.3,
                        backgroundColor: !isAvailable
                          ? "action.disabledBackground"
                          : isSelected
                          ? "primary.main"
                          : "primary.light",
                        opacity: !isAvailable ? 0.5 : 1,
                        transition: "all 0.2s ease",
                        cursor: isAvailable ? "pointer" : "not-allowed",
                        "&:hover": {
                          backgroundColor:
                            isAvailable && !isSelected ? "primary.dark" : "",
                          transform: isAvailable ? "scale(1.05)" : "none",
                        },
                        borderRadius: "8px",
                      }}
                    />
                  );
                })}
              </Grid>
            );
          })}
        </Grid>
      </Box>
    ));
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: 3,
        backgroundColor: "background.default",
        borderRadius: "16px",
        margin: "20px",
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Select Your Seats
      </Typography>
      {renderSeats()}
      <Typography
        variant="h6"
        sx={{
          mt: 4,
          color: "text.primary",
          fontWeight: "medium",
        }}
      >
        Total Price: ${totalPrice}
      </Typography>
      <Button
        variant="contained"
        onClick={handleConfirm}
        disabled={selectedSeats.length === 0}
        sx={{
          mt: 4,
          px: 4,
          py: 1.5,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          borderRadius: "8px",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "primary.dark",
            transform: "translateY(-2px)",
          },
          "&:disabled": {
            backgroundColor: "action.disabledBackground",
          },
        }}
      >
        Confirm Selection
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={`Seats selected: ${selectedSeats.join(
          ", "
        )}, Total Price: $${totalPrice}`}
      />
    </Box>
  );
};

export default SeatSelection;
