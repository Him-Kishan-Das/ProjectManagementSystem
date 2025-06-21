import React, { useState } from "react";
import CustomModal from "./CustomModal";
import { Button } from "@mui/material";


const CreateProject = ({ open, setOpen }) => {

  return (
    <CustomModal
      open={open}
      onClose={() => setOpen(false)}
      title="Create Project"
    >
      <p>This is a create project form</p>
      <Button onClick={() => setOpen(false)}>Close</Button>
    </CustomModal>
  );
};

export default CreateProject;
