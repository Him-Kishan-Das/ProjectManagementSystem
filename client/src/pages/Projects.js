import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axiosInstance from "../api/axiosInstance";

const Projects = () => {
  const location = useLocation();

  const [selectedTab, setSelectedTab] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);

    let endpoint = '';
    if (selectedTab === 0) {
      endpoint = 'projects/allProjects';
    } else if (selectedTab === 1) {
      endpoint = '/projects/inProgressProjects';
    } else if (selectedTab === 2) {
      endpoint = '/projects/completedProjects';
    }

    try {
      const response = await axiosInstance.get(endpoint);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      // It's good practice to ensure projects is an empty array on error
      setError("Failed to load projects. Please try again.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedTab]); // Call fetchProjects whenever selectedTab changes

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Render logic based on loading, error, and projects
  if (loading) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, margin: "auto" }}>
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          Loading projects...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, margin: "auto" }}>
        <Typography variant="h6" color="error" sx={{ textAlign: "center", mt: 4 }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Project Dashboard
      </Typography>

      <Paper elevation={3} sx={{ mb: 4, borderRadius: 2 }}>
        <Tabs
          value={selectedTab}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{ "& .MuiTabs-flexContainer": { flexWrap: "wrap" } }}
        >
          <Tab label="All Projects" />
          <Tab label="In Progress Projects" />
          <Tab label="Completed Projects" />
        </Tabs>
      </Paper>

      <Grid container spacing={4} alignItems="stretch">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Grid item xs={12} sm={6} md={6} key={project.id} sx={{ pb: 4 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  border: "1px solid #ddd",
                  marginBottom: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <WorkIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
                    {project.name}
                  </Typography>
                  <Chip
                    label={project.status}
                    color={
                      project.status === "In Progress" ? "info" : "success"
                    }
                    size="small"
                  />
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    flexGrow: 1,
                    maxHeight: "80px",
                    overflowY: "auto",
                  }}
                >
                  {project.description}
                </Typography>

                {/* Details List */}
                <List dense sx={{ p: 0, mb: 1, flexShrink: 0 }}>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <GroupIcon fontSize="small" />
                    </ListItemIcon>
                    {/* Safely access project.members.length */}
                    <ListItemText
                      primary={`Members: ${project.members ? project.members.length : 0}`}
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    {/* Add a check for project.lead as well, if it can be undefined */}
                    <ListItemText primary={`Lead: ${project.lead ? project.lead.name : 'N/A'}`} />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <CalendarTodayIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Created: ${project.createdAt}`}
                    />
                  </ListItem>
                </List>

                {/* Team Avatars */}
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mr: 1 }}
                  >
                    Team:
                  </Typography>
                  {/* Conditionally render members avatars only if project.members is an array */}
                  {project.members && project.members.map((member) => (
                    <Avatar
                      key={member.id} // Ensure member.id exists or use index if no unique ID
                      alt={member.name}
                      src={member.avatar}
                      sx={{ width: 24, height: 24, fontSize: "0.75rem" }}
                      title={member.name}
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ textAlign: "center", mt: 4 }}
            >
              No projects found in this category.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Projects;