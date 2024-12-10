import React, { useState } from "react";
import Joi from "joi";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "@mui/material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import userService from "../services/userService";
import Login from "../components/Login";
import { styled } from "@mui/system";
import FacebookLogin from "../components/FacebookLogin";


// Styled components
const FormWrapper = styled(Box)({
  padding: "60px",
  backgroundColor: "#001529",
  borderRadius: "20px",
  width: "100%",
  maxWidth: "500px",
  margin: "30px auto",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
});

const LogoBox = styled(Box)({
  backgroundImage: "url(../src/assets/Register.png)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: "50px",
  height: "50px",
  margin: "0 auto 20px",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(79, 158, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(79, 158, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4f9eff',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: '#fff',
  },
  '& .MuiFormHelperText-root': {
    color: '#ff4d4d',
  },
});

const RegisterButton = styled(Button)({
  backgroundColor: "#4f9eff",
  color: "#fff",
  height: "50px",
  borderRadius: "8px",
  marginTop: "20px",
  '&:hover': {
    backgroundColor: "#3a7bd5",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  '& .MuiTypography-root': {
    color: "#4f9eff",
    marginTop: "10px",
    '&:hover': {
      color: "#3a7bd5",
    },
  },
});

// Joi schema for validation
const schema = Joi.object({
  name: Joi.string().min(2).required().label("Name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .required()
    .label("Password")
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});

const RegisterForm = () => {
  // State for form fields and errors
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const { login, authToken } = useAuth();
  const navigate = useNavigate();

  // Validate a single field based on Joi schema
  const validateField = (name, value) => {
    const fieldSchema = Joi.object({ [name]: schema.extract(name) });
    const { error } = fieldSchema.validate({ [name]: value });
    return error ? error.details[0].message : null;
  };

  // Handle changes dynamically based on the field name
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the field and update errors
    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  // Validate the entire form before submission
  const validateForm = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (!error) return null;

    const newErrors = {};
    error.details.forEach((detail) => {
      newErrors[detail.path[0]] = detail.message;
    });
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data: ", formData);

    // Validate form before submission
    const formErrors = validateForm();
    setErrors(formErrors || {});

    if (formErrors) {
      console.log("Form contains errors.");
    } else {
      console.log("Form Data: ", formData);

      userService
        .Create(formData)
        .then((res) => {
          console.log("Register successfully: ", res);
          toast.success("Register successfully!", {
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
          login(res);
          navigate("/");
        })
        .catch((err) => {
          setErrors(err.response.data);
        });
    }
  };

  return (
    <>
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
        transition={Bounce}
      />
      {authToken && <Navigate to="/" replace={true} />}

      <FormWrapper>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <LogoBox />
          <Typography variant="h5" sx={{ color: "#4f9eff", fontWeight: 600 }}>
            Sign Up
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            onKeyPress={(e) => {
              const char = String.fromCharCode(e.keyCode || e.which);
              if (!/^[a-zA-Z\s]*$/.test(char)) {
                e.preventDefault();
              }
            }}
          />

          <StyledTextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            onKeyPress={(e) => {
              const char = String.fromCharCode(e.keyCode || e.which);
              if (!/^[a-zA-Z0-9.@]*$/.test(char)) {
                e.preventDefault();
              }
            }}
          />

          <StyledTextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <StyledLink to="/signin">
            <Typography variant="subtitle2">
              Already have an account? Sign In
            </Typography>
          </StyledLink>

          {errors && typeof errors === "string" && (
            <Typography
              sx={{
                color: "#ff4d4d",
                mt: 2,
                textAlign: "center",
              }}
            >
              {errors}
            </Typography>
          )}

          <RegisterButton fullWidth type="submit">
            Register
          </RegisterButton>
        </form>
        <Login />
        <FacebookLogin/>
      </FormWrapper>
    </>
  );
};

export default RegisterForm;
