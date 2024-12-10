import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledTableContainer = styled(TableContainer)({
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
});

const StyledTable = styled(Table)({
  "& .MuiTableCell-root": {
    borderColor: "rgba(255, 255, 255, 0.1)",
    color: "#e2e8f0",
  },
  "& .MuiTableHead-root .MuiTableCell-root": {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    color: "#e2e8f0",
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  "& .MuiTableBody-root .MuiTableRow-root:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
});

const DeleteButton = styled(Button)({
  backgroundColor: "#dc2626",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#b91c1c",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
});

const ContentWrapper = styled(Box)({
  padding: "24px",
  width: "100%",
});

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://azure-reservation-app.azurewebsites.net/api/user"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#5C2FC2",
      confirmButtonText: "Delete",
      background: "#1e2a38",
      color: "#e2e8f0",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `https://azure-reservation-app.azurewebsites.net/api/users/${id}`
        );
        Swal.fire({
          title: "Deleted!",
          text: "The user has been deleted.",
          icon: "success",
          background: "#1e2a38",
          color: "#e2e8f0",
        });
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <ContentWrapper>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#e2e8f0",
          fontWeight: "600",
          mb: 4,
          letterSpacing: "0.5px",
        }}
      >
        User List
      </Typography>

      <StyledTableContainer>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="center">
                  <DeleteButton
                    variant="contained"
                    onClick={() => handleDelete(user._id)}
                    size="small"
                  >
                    Delete
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </ContentWrapper>
  );
};

export default UsersTable;
