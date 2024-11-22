import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import movie1 from "../assets/movie1.jpg";
import movie2 from "../assets/movie2.jpg";
import movie3 from "../assets/movie3.jpg";

const images = [movie1, movie2, movie3];
const dominantColors = ["#e3d5b8", "#b8c5e3", "#e3b8c5"];

const SliderContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "500px",
  [theme.breakpoints.down("md")]: {
    height: "auto",
  },
  position: "relative",
  overflow: "hidden",
  borderRadius: "16px",
  display: "flex",
}));

const BackgroundBlur = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "blur(20px)",
  transform: "scale(1.1)",
});

const ContentContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  display: "flex",
  width: "100%",
  height: "100%",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const TextContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    padding: "20px",
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "300px",
  },
}));

const SliderImage = styled("img")({
  maxWidth: "80%",
  maxHeight: "80%",
  objectFit: "contain",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const BookNowButton = styled(Button)(({ color }) => ({
  marginTop: "20px",
  backgroundColor: color,
  color: "#091057",
  padding: "12px 32px",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  width: "fit-content",
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: color,
    opacity: 0.9,
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
}));

const NewImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    window.scrollBy({
      top: 570,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ width: "100%", padding: 0, margin: 0 }}>
      <SliderContainer>
        <BackgroundBlur
          style={{
            backgroundImage: `url(${images[currentImage]})`,
          }}
        />
        <ContentContainer>
          <TextContainer>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              sx={{
                color: dominantColors[currentImage],
                marginBottom: 2,
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Your Next Great Event Starts Here!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: dominantColors[currentImage],
                marginBottom: 3,
                fontSize: "1.1rem",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              Experience Unforgettable Moments, One Click Away!
            </Typography>
            <BookNowButton
              color={dominantColors[currentImage]}
              onClick={handleScroll}
            >
              Book Now
            </BookNowButton>
          </TextContainer>
          <ImageContainer>
            <SliderImage
              src={images[currentImage]}
              alt={`Slide ${currentImage + 1}`}
            />
          </ImageContainer>
        </ContentContainer>
      </SliderContainer>
    </Box>
  );
};

export default NewImageSlider;
