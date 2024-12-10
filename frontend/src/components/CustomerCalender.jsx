import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { Box, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import "react-calendar/dist/Calendar.css";
import useGameQueryStore from "../store";
import axios from "axios";

const CalendarWrapper = styled(Box)({
  display: "flex",
  width: "100%",
  maxWidth: "1000px",
  height: "600px",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
});

const SidebarWrapper = styled(Box)({
  width: "30%",
  backgroundColor: "#001529",
  padding: "20px",
  color: "white",
});

const CalendarContent = styled(Box)({
  width: "70%",
  backgroundColor: "#002548",
  padding: "20px",
  color: "white",
});

const StyledCalendar = styled(Calendar)({
  width: "100%",
  backgroundColor: "transparent",
  border: "none",
  color: "white",

  ".react-calendar__navigation": {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  ".react-calendar__navigation__label": {
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
    },
  },

  ".react-calendar__navigation__arrow": {
    color: "#fff",
    fontSize: "24px",
    background: "none",
    border: "none",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
    },
  },

  ".react-calendar__month-view__weekdays": {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "14px",
    marginBottom: "10px",
    color: "#4f9eff",
  },

  ".react-calendar__month-view__weekdays__weekday": {
    color: "#4f9eff",
    abbr: {
      textDecoration: "none",
    },
  },

  ".react-calendar__month-view__days__day": {
    color: "#fff",
    fontSize: "16px",
  },

  ".react-calendar__tile": {
    padding: "10px",
    backgroundColor: "transparent",
    borderRadius: "50%",
    color: "#fff",
    "&:enabled:hover, &:enabled:focus": {
      backgroundColor: "rgba(79, 158, 255, 0.3)",
    },
  },

  ".react-calendar__tile--now": {
    backgroundColor: "rgba(79, 158, 255, 0.2)",
    color: "#fff",
  },

  ".react-calendar__tile--active": {
    backgroundColor: "#4f9eff",
    color: "#fff",
    "&:enabled:hover": {
      backgroundColor: "#4f9eff",
    },
  },

  ".react-calendar__month-view__days__day--neighboringMonth": {
    color: "rgba(255,255,255,0.3)",
  },

  ".highlighted-date": {
    backgroundColor: "pink", // Highlighted dates in pink
    color: "#000",
    borderRadius: "50%",
  },
});

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [showtimes, setShowtimes] = useState([]);
  const SetSelectedDate = useGameQueryStore((s) => s.SetSelectedDate);

  const selectedTheater = useGameQueryStore((s) => s.selectedTheater);

  const theaterId = selectedTheater;

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get(
          `https://azure-reservation-app.azurewebsites.net/api/showtimes/events/${theaterId}`
        );
        setShowtimes(response.data);
        console.log("Showtimes:", response.data);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      }
    };

    fetchShowtimes();
  }, [theaterId]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    SetSelectedDate(newDate);
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const localDateString = date.toLocaleDateString("en-CA"); // "YYYY-MM-DD" format in local time

      const highlightedDates = showtimes.map((show) => {
        const showDate = new Date(show.date);
        return showDate.toLocaleDateString("en-CA"); // Convert each showtime date to local format
      });

      // Check if the local date matches any highlighted date
      if (highlightedDates.includes(localDateString)) {
        return "highlighted-date";
      }
    }
    return null;
  };

  return (
    <CalendarWrapper>
      <SidebarWrapper>
        <Typography variant="h1" sx={{ fontSize: "72px", fontWeight: "bold" }}>
          {date.getDate()}
        </Typography>
        <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
          {date.toLocaleString("default", { month: "long" })}
        </Typography>
        <Typography variant="h4">{date.getFullYear()}</Typography>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          TO DO
        </Typography>
        <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 1, mb: 1 }}>
          <Typography variant="body2">NOTES TO BE MADE</Typography>
        </Box>
        <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 1 }}>
          <Typography variant="body2">DON'T FORGET ABOUT B-DAY</Typography>
        </Box>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          SCHEDULE
        </Typography>
        <Grid container spacing={1}>
          {[
            { time: "10:00 - 01:10", task: "CLASSES" },
            { time: "02:00 - 05:00", task: "GAMING" },
            { time: "07:00 - 08:30", task: "HOMEWORK" },
            { time: "10:00 - 12:30", task: "CODING" },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={5}>
                <Typography
                  variant="body2"
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 0.5 }}
                >
                  {item.time}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography
                  variant="body2"
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 0.5 }}
                >
                  {item.task}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </SidebarWrapper>
      <CalendarContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          SELECT DATE
        </Typography>
        <StyledCalendar
          onChange={handleDateChange}
          value={date}
          formatShortWeekday={(locale, date) =>
            ["SUN", "MON", "TUS", "WED", "THUR", "FRI", "SAT"][date.getDay()]
          }
          tileClassName={tileClassName}
        />
      </CalendarContent>
    </CalendarWrapper>
  );
};

export default CustomCalendar;
