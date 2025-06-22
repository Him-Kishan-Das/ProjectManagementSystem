import React,{ useState } from "react";
import CustomModal from "./CustomModal";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Snackbar,
  Alert
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";

const CreateProject = ({ open, setOpen }) => {
  
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [membersIds, setMembersIds] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");


  const handleCreateProject = async(e) =>{
    try{
      e.preventDefault();
      const response = await axiosInstance.post("projects/create-project",{
        name: projectName,
        description: projectDescription,
        created_by_user_id: "1",
        member_ids: membersIds,   
      })
      console.log("Created:", response.data);

      setSnackbarMessage("Project created successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setProjectName("");
      setProjectDescription("");
      setMembersIds([]);
      setOpen(false);
    }
    catch(err){
      console.error("Error:", err.message);
      setSnackbarMessage(`Error creating project: ${err.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
          <CustomModal
      open={open}
      onClose={() => setOpen(false)}
      title="Create Project"
    >
      <Box
        component="form"
        onSubmit={handleCreateProject}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
        }}
      >
        <TextField
          label="Project Name"
          variant="outlined"
          fullWidth
          required
          onChange={(e)=> setProjectName(e.target.value)}
        />

        <TextField
          label="Project Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          required
          onChange={(e)=> setProjectDescription(e.target.value)}
        />

      <FormControl fullWidth required>
        <InputLabel id="member-label">Assign Members</InputLabel>
        <Select
          labelId="member-label"
          multiple
          value={membersIds}
          onChange={(e) => setMembersIds(e.target.value)}
          label="Assign Members"
          renderValue={(selected) => selected.join(", ")}
        >
          <MenuItem value="1">Rohan</MenuItem>
          <MenuItem value="2">Soniya</MenuItem>
          <MenuItem value="3">Kishan</MenuItem>
        </Select>
      </FormControl>



        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 2,
          }}
        >
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Create
          </Button>
        </Box>
      </Box>
    </CustomModal>

<Snackbar
open={snackbarOpen}
autoHideDuration={6000} // Automatically hide after 6 seconds
onClose={handleCloseSnackbar}
anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Position at bottom-center
>
<Alert
  onClose={handleCloseSnackbar}
  severity={snackbarSeverity} // Can be 'success', 'error', 'warning', 'info'
  sx={{ width: "100%" }}
>
  {snackbarMessage}
</Alert>
</Snackbar>
    </>
  );
};

export default CreateProject;
