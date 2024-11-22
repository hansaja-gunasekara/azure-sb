// Content.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useRenderContent } from "../Context/RenderContentContext";
import { useAuth } from "../Context/AuthContext";
import { styled } from "@mui/system";

const ContentWrapper = styled(Box)({
  width: "100%",
  padding: "24px",
  boxSizing: "border-box",
});

const WelcomeSection = styled(Paper)({
  display: "flex",
  alignItems: "center",
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "16px",
  padding: "20px 30px",
  marginBottom: "24px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
});

const WelcomeText = styled(Typography)({
  color: "#e2e8f0",
  fontSize: "27px",
  fontWeight: "500",
  marginRight: "15px",
  letterSpacing: "0.5px",
  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
});

const WaveIcon = styled(Box)({
  width: "43px",
  height: "43px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  animation: "wave 2s infinite",
  "@keyframes wave": {
    "0%": { transform: "rotate(0deg)" },
    "10%": { transform: "rotate(14deg)" },
    "20%": { transform: "rotate(-8deg)" },
    "30%": { transform: "rotate(14deg)" },
    "40%": { transform: "rotate(-4deg)" },
    "50%": { transform: "rotate(10deg)" },
    "60%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(0deg)" },
  },
});

const ContentContainer = styled(Box)({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: "16px",
  padding: "24px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  width: "100%",
  minHeight: "calc(100vh - 180px)",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(255, 255, 255, 0.05)",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "4px",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.2)",
    },
  },
});

const Content = () => {
  const renderContent = useRenderContent();
  const { getCurrentUser } = useAuth();

  return (
    <ContentWrapper>
      <WelcomeSection elevation={0}>
        <WelcomeText>Welcome {getCurrentUser()?.name}!</WelcomeText>
        <WaveIcon
          sx={{
            backgroundImage: "url(../src/assets/wave.png)",
          }}
        />
      </WelcomeSection>

      <ContentContainer>{renderContent()}</ContentContainer>
    </ContentWrapper>
  );
};

export default Content;
