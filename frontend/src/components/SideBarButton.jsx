import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  width: "252px",
  height: "45px",
  borderRadius: "8px",
  color: "#e2e8f0",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 500,
  transition: "all 0.2s ease",
  backgroundColor: "transparent",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  "&:hover": {
    backgroundColor: "rgba(92, 47, 194, 0.1)",
    border: "1px solid rgba(92, 47, 194, 0.3)",
  },
  "&.active": {
    backgroundColor: "rgba(92, 47, 194, 0.2)",
    border: "1px solid rgba(92, 47, 194, 0.5)",
  },
});

const SideBarButton = ({ title, setActiveContent, activeContent }) => {
  return (
    <StyledButton
      onClick={() => setActiveContent(title)}
      className={activeContent === title ? "active" : ""}
    >
      {title}
    </StyledButton>
  );
};

export default SideBarButton;
