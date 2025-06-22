import React from "react";
import CustomModal from "./CustomModal";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

const CreateProject = ({ open, setOpen }) => {
  

  return (
    <CustomModal
      open={open}
      onClose={() => setOpen(false)}
      title="Create Project"
    >
      <Box
        component="form"
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
        />

        <TextField
          label="Project Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          required
        />

        <FormControl fullWidth>
          <InputLabel id="member-label">Assign Member</InputLabel>
          <Select labelId="member-label" label="Assign Member" required>
            <MenuItem value={1}>Rohan</MenuItem>
            <MenuItem value={2}>Soniya</MenuItem>
            <MenuItem value={3}>Kishan</MenuItem>
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
  );
};

export default CreateProject;
