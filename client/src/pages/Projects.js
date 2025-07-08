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
  CircularProgress,
  Button, // Import Button component
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit"; // Import an icon for editing
// Or GroupAddIcon if you want a more specific "assign members" icon
// import GroupAddIcon from "@mui/icons-material/GroupAdd";
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
      endpoint = '/projects/allProjects';
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
      setError("Failed to load projects. Please try again.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedTab]);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // New handler for the Edit/Assign Members button
  const handleEditAssignMembers = (projectId) => {
    console.log(`Edit/Assign Members for Project ID: ${projectId}`);
    // In a real application, you would:
    // 1. Open a dialog/modal for editing members for this projectId
    // 2. Navigate to a dedicated project edit page:
    //    e.g., navigate(`/projects/${projectId}/edit-members`);
    // 3. Dispatch an action to a global state management system
  };

  // --- Render Logic ---
  if (loading) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, margin: "auto", display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading projects...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, margin: "auto", textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
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

      <Grid container spacing={4} direction="column">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Grid
              item
              xs={12}
              key={project.id}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  border: "1px solid #ddd",
                  minHeight: '180px',
                }}
              >
                {/* Project Header (Name + Status Chip) */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <WorkIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
                    {project.name}
                  </Typography>
                  <Chip
                    label={project.status || 'Unknown'}
                    color={
                      project.status === "In Progress" ? "info" : "success"
                    }
                    size="small"
                  />
                </Box>

                {/* Project Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    maxHeight: "80px",
                    overflowY: "auto",
                  }}
                >
                  {project.description || 'No description provided.'}
                </Typography>

                {/* Details List */}
                <List dense sx={{ p: 0, mb: 1, flexShrink: 0 }}>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <GroupIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Members: ${project.members ? project.members.length : 0}`}
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={`Lead: ${project.lead ? project.lead.name : 'N/A'}`} />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <CalendarTodayIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Created: ${project.createdAt || 'N/A'}`}
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
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mr: 1 }}
                  >
                    Team:
                  </Typography>
                  {project.members && project.members.length > 0 ? (
                    project.members.map((member, index) => (
                      <Avatar
                        key={member.id || index}
                        alt={member.name || 'Member'}
                        src={member.avatar || ''}
                        sx={{ width: 24, height: 24, fontSize: "0.75rem" }}
                        title={member.name || 'Member'}
                      />
                    ))
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      No team members
                    </Typography>
                  )}
                </Box>

                {/* Edit/Assign Members Button */}
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />} // Or GroupAddIcon
                    onClick={() => handleEditAssignMembers(project.id)}
                  >
                    Edit/Assign Members
                  </Button>
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