import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  Grid,
} from "@mui/material";
import axios from "axios"; // For making API requests
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast, Bounce } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/system";


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

const AdminSeatConfigurator = () => {
  const [theater, setTheater] = useState("");
  const [location, setLocation] = useState("");
  const [sections, setSections] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [image, setImage] = useState(null);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const buttonSize = isSmallScreen ? 30 : 50; // Button size adjustment

  const setFileToBase = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result); // Storing the image as Base64
    };

    reader.onerror = (error) => {
      console.log("Error:", error);
    };
  };

  // Add a new section
  const handleAddSection = () => {
    if (sectionName && rows > 0 && cols > 0) {
      const newSection = {
        id: uuidv4(),
        name: sectionName,
        rows,
        cols,
        layout: Array(rows)
          .fill(null)
          .map(() => Array(cols).fill(true)), // Initialize seats as available
      };
      setSections([...sections, newSection]);
      setSectionName("");
      setRows(0);
      setCols(0);
    }
  };

  // Handle seat toggle (to delete a seat)
  const handleSeatToggle = (sectionId, row, col) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const updatedLayout = [...section.layout];
        updatedLayout[row][col] = !updatedLayout[row][col]; // Toggle availability
        return { ...section, layout: updatedLayout };
      }
      return section;
    });
    setSections(updatedSections);
  };

  // Handle the "Confirm Configuration" button
  const handleConfigure = async () => {
    try {
      const requestBody = {
        location, // Theater location
        theater, // Theater ID or name
        sections, // Sections with seat layouts
        image
      };
      console.log(requestBody);
      const response = await axios.post(
        "http://localhost:3000/api/seats/create",
        requestBody
      );
      toast.success("Theater added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.log(response); // Log success message
    } catch (error) {
      console.error("Error uploading seats:", error);
    }
  };

  return (
    <Box
      sx={{
        padding: "24px",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        width: "100%",
        marginBottom: "24px",
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "#e2e8f0",
          fontWeight: "600",
          fontSize: "2rem",
        }}
      >
        Theater Seat Configurator
      </Typography>
      <Box sx={{ mb: 4 }}>
        <TextField
          label="Theater Name"
          value={theater}
          onChange={(e) => setTheater(e.target.value)}
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
            "& .MuiInputBase-input": {
              color: "#e2e8f0",
            },
          }}
        />
        <TextField
          label="Theater Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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
            "& .MuiInputBase-input": {
              color: "#e2e8f0",
            },
          }}
        />
        <TextField
          label="Section Name"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
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
            "& .MuiInputBase-input": {
              color: "#e2e8f0",
            },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Number of Rows"
              type="number"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              fullWidth
              sx={{
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
                "& .MuiInputBase-input": {
                  color: "#e2e8f0",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Number of Columns"
              type="number"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              fullWidth
              sx={{
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
                "& .MuiInputBase-input": {
                  color: "#e2e8f0",
                },
              }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          onClick={handleAddSection}
          sx={{
            mt: 2,
            mb: 4,
            backgroundColor: "#5C2FC2",
            color: "white",
            "&:hover": {
              backgroundColor: "#4925A3",
            },
          }}
        >
          Add Section
        </Button>
      </Box>

      {/* Display Sections */}
      {sections.map((section) => (
        <Box
          key={section.id}
          sx={{
            mb: 4,
            padding: "24px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: "#e2e8f0",
              fontWeight: "500",
            }}
          >
            {section.name} Section
          </Typography>
          <Grid container justifyContent="center">
            {section.layout.map((row, rowIndex) => (
              <Grid
                container
                key={rowIndex}
                justifyContent="center"
                sx={{ mb: 1 }}
              >
                {row.map((isAvailable, colIndex) => (
                  <Box
                    key={colIndex}
                    onClick={() =>
                      handleSeatToggle(section.id, rowIndex, colIndex)
                    }
                    sx={{
                      width: buttonSize,
                      height: buttonSize,
                      margin: 0.5,
                      backgroundColor: isAvailable
                        ? "#5C2FC2"
                        : "rgba(255, 255, 255, 0.1)",
                      "&:hover": {
                        backgroundColor: isAvailable
                          ? "#4925A3"
                          : "rgba(255, 255, 255, 0.15)",
                      },
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                  />
                ))}
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{
            backgroundColor: "#5C2FC2",
            color: "white",
            "&:hover": {
              backgroundColor: "#4925A3",
            },
          }}
        >
          Upload file
          <VisuallyHiddenInput
            onChange={setFileToBase}
            type="file"
            accept=".jpg, .jpeg"
            id="avatar"
          />
        </Button>
        <Button
          variant="contained"
          onClick={handleConfigure}
          sx={{
            backgroundColor: "#5C2FC2",
            color: "white",
            "&:hover": {
              backgroundColor: "#4925A3",
            },
          }}
        >
          Confirm Configuration
        </Button>
      </Box>
    </Box>
  );
};

export default AdminSeatConfigurator;
