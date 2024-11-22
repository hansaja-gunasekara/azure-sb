import React, { useState } from "react";
import Joi from "joi";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import authService from "../services/authService";
import { useAuth } from "../Context/AuthContext";

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
  backgroundImage: "url(../src/assets/login.png)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: "50px",
  height: "50px",
  margin: "0 auto 20px",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(79, 158, 255, 0.3)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(79, 158, 255, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4f9eff",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiInputBase-input": {
    color: "#fff",
  },
  "& .MuiFormHelperText-root": {
    color: "#ff4d4d",
  },
});

const SignInButton = styled(Button)({
  backgroundColor: "#4f9eff",
  color: "#fff",
  height: "50px",
  borderRadius: "8px",
  marginTop: "20px",
  "&:hover": {
    backgroundColor: "#3a7bd5",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  "& .MuiTypography-root": {
    color: "#4f9eff",
    marginTop: "10px",
    "&:hover": {
      color: "#3a7bd5",
    },
  },
});

// Joi schema
const schema = Joi.object({
  email: Joi.string().required().label("Email"),
  password: Joi.string().required().label("Password"),
});

const SignInForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { authToken, login, getCurrentUser } = useAuth();

  const validateField = (name, value) => {
    const fieldSchema = Joi.object({ [name]: schema.extract(name) });
    const { error } = fieldSchema.validate({ [name]: value });
    return error ? error.details[0].message : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const validateForm = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (!error) return null;

    const newErrors = {};
    error.details.forEach((detail) => {
      newErrors[detail.path[0]] = detail.message;
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors || {});

    if (!formErrors) {
      try {
        const response = await authService.AuthenticateUser(formData);
        toast.success("Signin successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        login(response);

        console.log("Storage error", getCurrentUser().role);

        if (getCurrentUser().role === "admin") {
          navigate("/Dashboard");
        } else {
          navigate("/");
        }
      } catch (err) {
        setErrors(err.response?.data);
      }
    }
  };

  if (authToken) return <Navigate to="/" replace={true} />;

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

      <FormWrapper>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <LogoBox />
          <Typography variant="h5" sx={{ color: "#4f9eff", fontWeight: 600 }}>
            Sign In
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
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

          <StyledLink to="/signup">
            <Typography variant="subtitle2">
              Don't have an account? Sign Up
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

          <SignInButton fullWidth type="submit">
            Sign In
          </SignInButton>
        </form>
      </FormWrapper>
    </>
  );
};

export default SignInForm;
