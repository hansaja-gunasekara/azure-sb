import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Avatar, IconButton, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import avaterImg from "../assets/react.svg"; // Placeholder image
import axios from 'axios';
import useUser from '../hooks/useUser';
import { useAuth } from '../Context/AuthContext';

const Profile = () => {
  const [showhideTableButton, setShowHideTableButton] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUserName, setNewUserName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { logout, getCurrentUser } = useAuth();

  const userId = getCurrentUser()._id;

  const { data } = useUser(userId);

  console.log("My data: ", data);

// In your Profile component or wherever you're fetching the profile
const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const response = await fetch('/api/viewProfile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Attach token in Authorization header
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const data = await response.json();
    console.log('Profile:', data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchProfile();
}, []);


const updateProfile = async (updatedData) => {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/updateProfile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach token here
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    console.error('Failed to update profile');
  }
};


const deleteProfile = async () => {
  if (window.confirm('Are you sure you want to delete your profile?')) {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        console.error('Token not found in localStorage');
        alert('Authorization failed: No token found.');
        return;
      }

      const response = await fetch('/api/deleteProfile', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Attach token here
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting profile', errorData);
        alert('Failed to delete profile: ' + (errorData.error || 'Unknown error'));
      } else {
        const data = await response.json();
        alert(data.message);
        // Optionally redirect or perform other actions upon successful deletion
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Failed to delete profile due to network error.');
    }
  }
};


/*const deleteProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/deleteProfile', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach token here
    },
  });

  if (!response.ok) {
    console.error('Failed to delete profile');
  }
};*/

/*
  // Fetch profile data when the component loads
  useEffect(() => {
    viewProfile();
  }, []);

  const viewProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/viewProfile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNewUserName(response.data.username);
      setNewEmail(response.data.email);
    } catch (error) {
      console.error('Error fetching profile', error);
      alert('Failed to fetch profile');
    }
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/updateProfile', 
      {
        username: newUserName,
        email: newEmail,
        password: newPassword
      }, 
      {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.message) {
        alert('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile', error);
      alert('Failed to update profile');
    }
  };

  const deleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete('http://localhost:5000/api/deleteProfile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.message) {
          alert('Profile deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting profile', error);
        alert('Failed to delete profile');
      }
    }
  };*/

  const handleShowHide = (e) => {
    e.preventDefault();
    if (!showhideTableButton) {
      updateProfile();
    }
    setShowHideTableButton(!showhideTableButton);
  };

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #0d1a33, #001f4d)", // Dark blue gradient background
        marginTop: "40px",
        width: "203vh",
        overflowX: "hidden",
      }}
    >
      <Card
        sx={{
          width: 700,
          padding: 3,
          boxShadow: 6,
          borderRadius: 4,
          backgroundColor: "#003161",
        }}
      >
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <h1
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "2rem",
                margin: "0",
              }}
            >
              MY PROFILE
            </h1>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={data?.picture || avaterImg}
                alt="avatar"
                sx={{
                  width: 150,
                  height: 150,
                  border: "4px solid #3f4348",
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                }}
              />
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 5,
                  right: 10,
                  bgcolor: "#fff",
                  border: "2px solid #3f4348",
                  "&:hover": { bgcolor: "#f0f0f0" },
                }}
              >
                <UploadIcon sx={{ fontSize: "1.2rem" }} />
                <input type="file" hidden onChange={handleFileUpload} />
              </IconButton>
            </Box>
          </Box>

          <form>
            {showhideTableButton ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                      Field
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                      Information
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Username</TableCell>
                    <TableCell sx={{ color: "white" }}>{data?.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Email</TableCell>
                    <TableCell sx={{ color: "white" }}>{data?.email}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <>
                <TextField
                  label="New Username"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  fullWidth
                  sx={{ mb: 2, color: "white" }}
                />
                <TextField
                  label="New Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  fullWidth
                  sx={{ mb: 2, color: "white" }}
                />
                <TextField
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  fullWidth
                  sx={{ mb: 2, color: "white" }}
                />
              </>
            )}
            <Button
              onClick={handleShowHide}
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#3A9679",
                color: "#ffffff",
                mt: 3,
                "&:hover": { bgcolor: "#3A9679" },
              }}
            >
              {showhideTableButton ? "Edit Profile" : "Save Changes"}
            </Button>
          </form>

          <Button
            onClick={deleteProfile}
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#B31312",
              color: "#ffffff",
              mt: 2,
              "&:hover": { bgcolor: "#B31312" },
            }}
          >
            Delete Profile
          </Button>
        </CardContent>
      </Card>
    </Box>
  );

};

export default Profile;
