import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import useTheaters from "../hooks/useTheaters";
import showTimeService from "../services/showTimeService";
import { ToastContainer, toast, Bounce } from "react-toastify";

const FormContainer = styled(Box)({
  padding: "24px",
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  marginTop: "20px",
  marginRight: "24px",
  marginBottom: "40px",
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
  },
  "& .MuiInputBase-input": {
    color: "#e2e8f0",
  },
  "& .MuiSelect-icon": {
    color: "rgba(255, 255, 255, 0.7)",
  },
});

const ActionButton = styled(Button)({
  backgroundColor: "#5C2FC2",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#4925A3",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
});

const AdminShowTimeForm = () => {
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      theater: "",
      date: "",
      times: [{ time: "" }],
    },
  });

  const { data } = useTheaters();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "times",
  });

  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().split(" ")[0].substring(0, 5);
  const selectedDate = watch("date");
  const minTime = selectedDate === today ? currentTime : "00:00";

  const onSubmit = async (formData) => {
    try {
      const formattedData = {
        ...formData,
        times: formData.times.map((item) => item.time),
      };

      await showTimeService.Create(formattedData);
      toast.success("Times added successfully!", {
        position: "top-right",
        theme: "dark",
        transition: Bounce,
      });
      reset();
    } catch (error) {
      toast.error("Error adding showtimes", {
        position: "top-right",
        theme: "dark",
      });
    }
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "#e2e8f0",
          fontWeight: "600",
          letterSpacing: "0.5px",
        }}
      >
        Create Showtimes
      </Typography>

      <Controller
        name="theater"
        control={control}
        render={({ field }) => (
          <StyledTextField
            {...field}
            select
            label="Select Theater"
            fullWidth
            margin="normal"
            required
          >
            {data?.map((theater) => (
              <MenuItem key={theater._id} value={theater._id}>
                {theater.name}
              </MenuItem>
            ))}
          </StyledTextField>
        )}
      />

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <StyledTextField
            {...field}
            type="date"
            label="Date"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: today }}
          />
        )}
      />

      <Box sx={{ mb: 4, mt: 3 }}>
        <Typography variant="h6" sx={{ color: "#e2e8f0", mb: 2 }}>
          Show Times
        </Typography>

        {fields.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Controller
              name={`times[${index}].time`}
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label={`Time ${index + 1}`}
                  fullWidth
                  type="time"
                  required
                  inputProps={{ min: minTime }}
                />
              )}
            />
            <IconButton
              onClick={() => remove(index)}
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                "&:hover": { color: "#ff4444" },
              }}
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}

        <Button
          onClick={() => append({ time: "" })}
          startIcon={<AddIcon />}
          sx={{
            color: "#e2e8f0",
            borderColor: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              borderColor: "#5C2FC2",
              backgroundColor: "rgba(92, 47, 194, 0.1)",
            },
          }}
        >
          Add Time
        </Button>
      </Box>

      <ActionButton type="submit" variant="contained" fullWidth>
        Submit Showtimes
      </ActionButton>
    </FormContainer>
  );
};

export default AdminShowTimeForm;
