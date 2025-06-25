import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  Button
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CreateProject from "../components/CreateProject";

const Home = ({ sidebarWidth = 260 }) => {
  const navigate = useNavigate();
  const stats = [
    {
      label: "Total Projects",
      value: 42,
      color: "#1976d2",
      icon: <AssignmentIcon fontSize="large" />,
      tabIndex: 0,
    },
    {
      label: "Completed Projects",
      value: 30,
      color: "#2e7d32",
      icon: <CheckCircleIcon fontSize="large" />,
      tabIndex: 2,
    },
    {
      label: "In Progress Projects",
      value: 8,
      color: "#f9a825",
      icon: <HourglassEmptyIcon fontSize="large" />,
      tabIndex: 1,
    },
  ];

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStatCardClick = (tabIndex) => {
    navigate("/projects", { state: { initialTab: tabIndex } });
  };

  
  const [open, setOpen] = useState(false);
 
  return (
    <>
      {/* Custom TopBar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${sidebarWidth}px)`,
          ml: `${sidebarWidth}px`,
          backgroundColor: "#283593", // Custom blue shade
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Dashboard</Typography>
          <Box display="flex" alignItems="center">
            <AccessTimeIcon sx={{ mr: 1 }} />
            <Typography variant="body1">
              {time.toLocaleTimeString()} | {time.toLocaleDateString()}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      

      {/* Card Grid */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 3,
          mt: 12,
          px: 2,
        }}
      >
        
        {/* Create Project Modal Form  */}
       <CreateProject open={open} setOpen={setOpen} />

        {/* Create Project Button styled like a card */}
        <Card
          onClick={() => setOpen(true)}
          sx={{
            width: 250,
            height: 150,
            backgroundColor: "#ffffff",
            color: "#1976d2",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "2px dashed #1976d2",
            cursor: "pointer",
            boxShadow: 3,
            borderRadius: 2,
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.03)",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            + Create Project
          </Typography>
        </Card>

        {/* Stat Cards */}
        {stats.map((card, index) => (
          <Card
            key={index}
            onClick={() => handleStatCardClick(card.tabIndex)}
            sx={{
              backgroundColor: card.color,
              color: "#fff",
              width: 250,
              height: 150,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                paddingBottom: "16px !important",
              }}
            >
              <Box mb={1}>{card.icon}</Box>
              <Typography variant="h6" fontSize={"18px"}>
                {card.label}
              </Typography>
              <Typography variant="body1" fontSize={"16px"} fontWeight="bold">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Home;
