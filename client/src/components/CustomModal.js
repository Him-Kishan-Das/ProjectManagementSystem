import React from "react";
import { Modal, Box, Typography } from "@mui/material";

const CustomModal = ({ open, onClose, title, children }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh', // Sets a maximum height (e.g., 90% of viewport height)
    overflowY: 'auto', // Enables vertical scrolling when content exceeds maxHeight
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {/* The children are wrapped in a Box with mt: 2, which is fine */}
        <Box id="modal-modal-description" sx={{ mt: 2 }}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;