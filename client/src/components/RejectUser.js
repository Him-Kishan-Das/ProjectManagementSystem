// src/components/RejectUser.js
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

const RejectUser = ({ open, user, onClose, onUserRejected }) => {
  const handleReject = async () => {
    if (!user) {
      console.error("No user selected for rejection.");
      return;
    }

    try {
      // // Assuming your backend has an endpoint to reject a user
      // // You might pass userId in the body or URL, depending on your API design
      // await axiosInstance.post(`/rejectUser/${user.id}`); // Example: POST to /rejectUser/:id
      // // Or if you prefer sending in body:
      console.log(user);
      await axiosInstance.put("/revokeUserRole", { userId: user._id });

      onUserRejected(); // Callback to refresh user lists in parent
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error rejecting user: ", error);
      // Handle error (e.g., show a toast notification)
      alert("Failed to reject user. Please try again.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="reject-user-dialog-title"
      aria-describedby="reject-user-dialog-description"
    >
      <DialogTitle id="reject-user-dialog-title">Confirm User Rejection</DialogTitle>
      <DialogContent>
        <DialogContentText id="reject-user-dialog-description">
          Are you sure you want to reject the user: <strong>{user?.name || "N/A"}</strong> (Email: {user?.email || "N/A"})?
          This action cannot be undone easily.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleReject} color="error" variant="contained">
          Reject User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RejectUser;