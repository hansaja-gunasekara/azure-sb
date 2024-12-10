import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Grid,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";

const EventPopup = ({ open, onClose, event }) => {
  if (!event) return null;

  const handleContinue = () => {
    onClose();
    window.scrollBy({
      top: 590,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: "linear-gradient(135deg, #1e2a38 0%, #181818 100%)",
          borderRadius: 4,
          maxWidth: "90%",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          p: 4,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "#e2e8f0",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h4"
          sx={{ mb: 4, color: "#e2e8f0", fontWeight: "bold" }}
        >
          {event.title}
        </Typography>

        <Grid container spacing={4}>
          {/* Left side - Image */}
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={event.imageUrl}
              alt={event.title}
              sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
              }}
            />
          </Grid>

          {/* Right side - Details */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 4,
                p: 3,
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#e2e8f0", fontWeight: "bold" }}
                  >
                    Description
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, color: "#e2e8f0", opacity: 0.8 }}
                  >
                    {event.description}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#e2e8f0", fontWeight: "bold" }}
                  >
                    Director
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#e2e8f0", opacity: 0.8 }}
                  >
                    {event.director}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#e2e8f0", fontWeight: "bold" }}
                  >
                    Duration
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#e2e8f0", opacity: 0.8 }}
                  >
                    {event.duration} minutes
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#e2e8f0", fontWeight: "bold" }}
                  >
                    Release Date
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#e2e8f0", opacity: 0.8 }}
                  >
                    {format(new Date(event.releaseDate), "MMMM dd, yyyy")}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#e2e8f0", fontWeight: "bold" }}
                  >
                    Rating
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#e2e8f0", opacity: 0.8 }}
                  >
                    {event.rating}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#e2e8f0", fontWeight: "bold", mb: 1 }}
                  >
                    Genre
                  </Typography>
                  <Box
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}
                  >
                    {event.genre.map((g, index) => (
                      <Chip
                        key={index}
                        label={g}
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: "#e2e8f0",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#e2e8f0", fontWeight: "bold", mb: 1 }}
                  >
                    Cast
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {event.cast.map((actor, index) => (
                      <Chip
                        key={index}
                        label={actor}
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: "#e2e8f0",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Continue Button */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={handleContinue}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#e2e8f0",
              padding: "10px 40px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            Continue to Book
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default EventPopup;
