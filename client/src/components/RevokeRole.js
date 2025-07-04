// src/components/RevokeRole.js
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";

const RevokeRole = ({ open, user, onClose, onRoleRevoked }) => {
  const handleRevoke = async () => {
    if (!user) {
      console.error("No user selected for role revocation.");
      return;
    }

    try {
      // Assuming your backend has an endpoint to revoke a user's role
      // You might pass userId in the body or URL
      await axiosInstance.put("/revokeUserRole", { userId: user._id }); // Example: POST to /revokeRole/:id
      // Or if you prefer sending in body:
      // await axiosInstance.post("/revokeRole", { userId: user.id });

      onRoleRevoked(); // Callback to refresh user lists in parent
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error revoking role: ", error);
      // Handle error
      alert("Failed to revoke role. Please try again.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="revoke-role-dialog-title"
      aria-describedby="revoke-role-dialog-description"
    >
      <DialogTitle id="revoke-role-dialog-title">Confirm Role Revocation</DialogTitle>
      <DialogContent>
        <DialogContentText id="revoke-role-dialog-description">
          Are you sure you want to revoke the role for user: <strong>{user?.name || "N/A"}</strong> (Email: {user?.email || "N/A"})?
          This will remove their current assigned role.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleRevoke} color="error" variant="contained">
          Revoke Role
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RevokeRole;