import React, { useState } from "react";
import {
  Box,
  Menu,
  MenuItem,
  Button,
  Grid,
  Typography,
  Paper,
  Fade,
} from "@mui/material";
import { styled } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import movie3 from "../assets/movie3.jpg";
import useTheaters from "../hooks/useTheaters";
import useGameQueryStore from "../store";

const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  justifyContent: "space-between",
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[2],
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "400px",
    maxHeight: "500px",
    borderRadius: "20px",
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: "#002548",
    boxShadow: theme.shadows[3],
  },
}));

const TheaterMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateX(4px)",
  },
}));

const TheaterImage = styled("img")({
  width: "100%",
  height: "80px",
  objectFit: "cover",
  borderRadius: "8px",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const SelectedTheaterImage = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "100%",
  height: "200px",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  transition: "all 0.3s ease",
  opacity: 0,
  transform: "translateY(20px)",
  "&.visible": {
    opacity: 1,
    transform: "translateY(0)",
  },
}));

const TheaterInfo = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
  color: "white",
}));

const TheaterDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTheater, setSelectedTheaters] = useState(null);

  const setSelectedTheater = useGameQueryStore((s) => s.SetSelectedTheater);

  const { data: theaters } = useTheaters();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTheaterSelect = (theater) => {
    console.log("Selected theater:", theater);
    setSelectedTheaters(theater);
    setSelectedTheater(theater._id);
    handleClose();
  };


  return (
    <Box sx={{ width: "100%", backgroundColor: "#002548" }}>
      <StyledButton
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        variant="contained"
      >
        {selectedTheater ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnIcon fontSize="small" />
            {selectedTheater.name}
          </Box>
        ) : (
          "Select Theater"
        )}
      </StyledButton>

      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Grid container spacing={2}>
          {theaters?.map((theater) => (
            <Grid item xs={12} key={theater._id}>
              <TheaterMenuItem onClick={() => handleTheaterSelect(theater)}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <TheaterImage src={theater.imageUrl} alt={theater.name} />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {theater.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <LocationOnIcon
                        fontSize="small"
                        sx={{ mr: 0.5, verticalAlign: "middle" }}
                      />
                      {theater.location}
                    </Typography>
                  </Grid>
                </Grid>
              </TheaterMenuItem>
            </Grid>
          ))}
        </Grid>
      </StyledMenu>

      {selectedTheater && (
        <SelectedTheaterImage className="visible" sx={{ position: "relative" }}>
          <TheaterImage
            src={selectedTheater.imageUrl}
            alt={selectedTheater.name}
            style={{ height: "100%", width: "100%" }}
          />
          <TheaterInfo>
            <Typography variant="h6" gutterBottom>
              {selectedTheater.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <LocationOnIcon fontSize="small" />
              {selectedTheater.location}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {selectedTheater.description}
            </Typography>
          </TheaterInfo>
        </SelectedTheaterImage>
      )}
    </Box>
  );
};

export default TheaterDropdown;
