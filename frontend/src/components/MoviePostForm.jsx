import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Grid,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/system";
import movieService from "../services/movieService";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import useTheaters from "../hooks/useTheaters";

const FormWrapper = styled(Box)({
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "16px",
  padding: "30px",
  width: "100%",
  maxWidth: "800px",
  margin: "20px auto",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5C2FC2",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-focused": {
      color: "#5C2FC2",
    },
  },
  "& .MuiInputBase-input": {
    color: "#e2e8f0",
  },
  marginBottom: "20px",
});

const StyledSelect = styled(Select)({
  backgroundColor: "rgba(255, 255, 255, 0.02)",
  color: "#e2e8f0",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#5C2FC2",
  },
});

const UploadButton = styled(Button)({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#e2e8f0",
  padding: "12px 24px",
  marginTop: "20px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transform: "translateY(-2px)",
  },
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

const MoviePostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [image, setImage] = React.useState("");
  const [cast, setCast] = React.useState([]);
  const [genre, setGenre] = React.useState([]);
  const [theaterType, setTheaterType] = useState("");

  const navigate = useNavigate();

  const { data: theaters } = useTheaters();

  const ratings = ["G", "PG", "PG-13", "R", "NC-17"];

  const setFileToBase = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const handleCastChange = (event) => {
    setCast(event.target.value.split(","));
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value.split(","));
  };

  const onFormSubmit = async (data) => {
    const formData = {
      ...data,
      theater: theaterType,
      cast,
      genre,
      image,
    };

    console.log(formData);

    try {
      await movieService.CreateMovie(formData);
      toast.success("Movie added successfully!", {
        position: "top-right",
        theme: "dark",
        transition: Bounce,
      });
      navigate("/Dashboard");
    } catch (error) {
      toast.error("Error adding movie", {
        position: "top-right",
        theme: "dark",
      });
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1e2a38 0%, #181818 100%)",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <ToastContainer />
      <FormWrapper>
        <Typography
          variant="h4"
          sx={{
            color: "#e2e8f0",
            mb: 4,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Publish Event
        </Typography>

        <Grid
          container
          spacing={3}
          component="form"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <Grid item xs={12}>
            <StyledTextField
              label="Event Title"
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl
              fullWidth
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiSelect-icon": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
              }}
            >
              <InputLabel>Theater Type</InputLabel>
              <Select
                value={theaterType}
                onChange={(e) => setTheaterType(e.target.value)}
                label="Theater"
                sx={{
                  color: "#e2e8f0",
                }}
              >
                {theaters.map((theater) => (
                  <MenuItem value={theater._id}>{theater.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              label="Description"
              {...register("description")}
              multiline
              rows={4}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("releaseDate")}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="Duration (minutes)"
              type="number"
              {...register("duration")}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="Organizer"
              {...register("director")}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                Rating
              </InputLabel>
              <StyledSelect {...register("rating")} defaultValue="">
                {ratings.map((rating) => (
                  <MenuItem key={rating} value={rating}>
                    {rating}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              label="Cast (comma separated)"
              value={cast.join(", ")}
              onChange={handleCastChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              label="Genre (comma separated)"
              value={genre.join(", ")}
              onChange={handleGenreChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <UploadButton
              component="label"
              startIcon={<CloudUploadIcon />}
              fullWidth
            >
              Upload Event Poster
              <VisuallyHiddenInput
                onChange={setFileToBase}
                type="file"
                accept=".jpg, .jpeg"
              />
            </UploadButton>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#5C2FC2",
                color: "#fff",
                padding: "12px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#4925A3",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Publish Event
            </Button>
          </Grid>
        </Grid>
      </FormWrapper>
    </Box>
  );
};

export default MoviePostForm;
