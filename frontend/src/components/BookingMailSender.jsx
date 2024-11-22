import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import useBookings from "../hooks/useBookings";
import Swal from "sweetalert2";

const styles = {
  container: {
    backgroundColor: "#1C2128",
    padding: "24px",
    borderRadius: "8px",
    color: "white",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#2D333B",
      color: "white",
      borderRadius: "4px",
      "& fieldset": {
        borderColor: "#444C56",
      },
      "&:hover fieldset": {
        borderColor: "#6E40C9",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#8B949E",
    },
  },
  button: {
    backgroundColor: "#6E40C9",
    color: "white",
    "&:hover": {
      backgroundColor: "#553098",
    },
  },
  table: {
    "& .MuiTableCell-head": {
      backgroundColor: "#2D333B",
      color: "white",
      borderBottom: "1px solid #444C56",
    },
    "& .MuiTableCell-body": {
      color: "white",
      borderBottom: "1px solid #444C56",
    },
    "& .MuiTableRow-root:hover": {
      backgroundColor: "#2D333B",
    },
  },
};

const BookingMailSender = () => {
  const { data: fakeBookings } = useBookings();

  const [searchCriteria, setSearchCriteria] = useState({
    customerName: "",
    theaterName: "",
    bookingDate: "",
    bookingTime: "",
  });
  const [filteredBookings, setFilteredBookings] = useState(fakeBookings);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSearch = () => {
    const { customerName, theaterName, bookingDate, bookingTime } =
      searchCriteria;
    const filtered = fakeBookings?.filter((booking) => {
      return (
        (customerName
          ? booking.customerName
              .toLowerCase()
              .includes(customerName.toLowerCase())
          : true) &&
        (theaterName
          ? booking.theaterName
              .toLowerCase()
              .includes(theaterName.toLowerCase())
          : true) &&
        (bookingDate ? booking.bookingDate === bookingDate : true) &&
        (bookingTime ? booking.bookingTime === bookingTime : true)
      );
    });
    setFilteredBookings(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchCriteria]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedBookings(filteredBookings.map((booking) => booking._id));
    } else {
      setSelectedBookings([]);
    }
    setSelectAll(event.target.checked);
  };

  const handleCheckboxChange = (event, bookingId) => {
    if (event.target.checked) {
      setSelectedBookings((prevSelected) => [...prevSelected, bookingId]);
    } else {
      setSelectedBookings((prevSelected) =>
        prevSelected.filter((id) => id !== bookingId)
      );
    }
  };

  const extractEmails = () => {
    return filteredBookings
      .filter((booking) => selectedBookings.includes(booking._id))
      .map((booking) => booking.customerEmail);
  };

  const handleSendEmails = async () => {
    const emails = extractEmails();
    if (!subject || !message) {
      alert("Please provide a subject and message.");
      return;
    }

    try {
      Swal.fire({
        title: "Confirm Sending Emails?",
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
          await axios
            .post("http://localhost:3000/api/mail", {
              emails,
              subject,
              message,
            })
            .then((response) => {
              Swal.fire({
                title: "Success!",
                text: "Booking process completed.",
                icon: "success",
                color: "#e2e8f0",
              });
            }).catch((error) => {
              console.error("Error sending emails:", error);
            });
        }
      });

    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={{ marginBottom: "24px" }}>Send email for booked users</Typography>

      {/* Search Filters */}
      <Box sx={{ display: "grid", gap: "16px", marginBottom: "24px" }}>
        <TextField
          label="Customer Name"
          value={searchCriteria.customerName}
          onChange={(e) =>
            setSearchCriteria({
              ...searchCriteria,
              customerName: e.target.value,
            })
          }
          fullWidth
          sx={styles.textField}
        />
        <TextField
          label="Theater Name"
          value={searchCriteria.theaterName}
          onChange={(e) =>
            setSearchCriteria({
              ...searchCriteria,
              theaterName: e.target.value,
            })
          }
          fullWidth
          sx={styles.textField}
        />
        <TextField
          label="Booking Date (yyyy-mm-dd)"
          value={searchCriteria.bookingDate}
          onChange={(e) =>
            setSearchCriteria({
              ...searchCriteria,
              bookingDate: e.target.value,
            })
          }
          fullWidth
          sx={styles.textField}
        />
        <TextField
          label="Booking Time"
          value={searchCriteria.bookingTime}
          onChange={(e) =>
            setSearchCriteria({
              ...searchCriteria,
              bookingTime: e.target.value,
            })
          }
          fullWidth
          sx={styles.textField}
        />
      </Box>

      {/* Bookings Table */}
      <TableContainer>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectAll}
                      onChange={handleSelectAll}
                      sx={{ color: "white" }}
                    />
                  }
                  label="Select All"
                />
              </TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Theater Name</TableCell>
              <TableCell>Booking Date</TableCell>
              <TableCell>Booking Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings?.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedBookings.includes(booking._id)}
                    onChange={(e) => handleCheckboxChange(e, booking._id)}
                    sx={{ color: "white" }}
                  />
                </TableCell>
                <TableCell>{booking.customerName}</TableCell>
                <TableCell>{booking.theaterName}</TableCell>
                <TableCell>{booking.bookingDate}</TableCell>
                <TableCell>{booking.bookingTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Email Section */}
      <Box sx={{ marginTop: "24px", display: "grid", gap: "16px" }}>
        <TextField
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          fullWidth
          sx={styles.textField}
        />
        <TextField
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          rows={4}
          fullWidth
          sx={styles.textField}
        />
        <Button
          variant="contained"
          onClick={handleSendEmails}
          sx={styles.button}
        >
          Send Email to Selected
        </Button>
      </Box>
    </Box>
  );
};

export default BookingMailSender;
