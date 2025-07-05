import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import CustomModal from "./CustomModal";
import axiosInstance from "../api/axiosInstance"; 

const AssignRole = ({ open, user, onClose, onRoleAssigned }) => {
  const [selectedRole, setSelectedRole] = useState("");

  
  useEffect(() => {
    if (open) {
      setSelectedRole(""); 
    }
  }, [open, user]);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleAssignRole = async () => {
    if (!user || !selectedRole) {
      console.error("User or role not selected.");
      return;
    }

    try {
      console.log(user);
      console.log(`Assigning role '${selectedRole}' to user '${user.name}' (ID: ${user.id})`);

      
      await axiosInstance.post("/assignUserRole", {
        userId: user._id,
        role: selectedRole,
      });

      
      await new Promise((resolve) => setTimeout(resolve, 500));

      onRoleAssigned(); 
      onClose(); 
    } catch (error) {
      console.error("Error assigning role: ", error);
      
    }
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={`Assign Role to ${user?.name || "User"}`}
    >
      <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
        <InputLabel id="role-select-label">Select Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={selectedRole}
          label="Select Role"
          onChange={handleRoleChange}
        >
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="member">Team Member</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleAssignRole} variant="contained" color="primary">
          Assign
        </Button>
      </Box>
    </CustomModal>
  );
};

export default AssignRole;