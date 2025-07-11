import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemAvatar,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import axiosInstance from "../api/axiosInstance";

// --- Utility function to generate a consistent color for an avatar ---
const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

// --- Utility function to get initials ---
const getInitials = (name) => {
  if (!name) return "";
  // Return only the first character of the name, converted to uppercase
  return name[0].toUpperCase();
};

const Projects = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  const [selectedTab, setSelectedTab] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMembersDialog, setOpenMembersDialog] = useState(false);
  const [currentProjectMembers, setCurrentProjectMembers] = useState([]); // Members for the dialog
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [membersLoading, setMembersLoading] = useState(false); // For dialog loading
  const [membersError, setMembersError] = useState(null); // For dialog errors

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);

    let endpoint = "";
    if (selectedTab === 0) {
      endpoint = "/projects/allProjects";
    } else if (selectedTab === 1) {
      endpoint = "/projects/inProgressProjects";
    } else if (selectedTab === 2) {
      endpoint = "/projects/completedProjects";
    }

    try {
      const projectsResponse = await axiosInstance.get(endpoint);
      console.log(
        "Projects API Response (initial, without detailed members):",
        projectsResponse.data
      );

      const projectsWithMembers = await Promise.all(
        projectsResponse.data.map(async (project) => {
          try {
            if (project.member_ids && project.member_ids.length > 0) {
              const membersResponse = await axiosInstance.get(
                `/projects/projectMembers?project_id=${project._id}`
              );
              console.log(
                `Raw members API response for project ${project._id}:`,
                membersResponse.data
              );

              const fetchedMembers =
                membersResponse.data.project?.members_details || [];

              return { ...project, members: fetchedMembers };
            }
            return { ...project, members: [] };
          } catch (memberError) {
            console.error(
              `Error fetching members for project ${project._id}:`,
              memberError.response?.data || memberError.message || memberError
            );
            return { ...project, members: [], membersError: true };
          }
        })
      );
      setProjects(projectsWithMembers);
      console.log(
        "Projects state updated (with detailed members):",
        projectsWithMembers
      );
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectMembers = async (projectId) => {
    setMembersLoading(true);
    setMembersError(null);
    setCurrentProjectMembers([]);

    try {
      const response = await axiosInstance.get(
        `/projects/projectMembers?project_id=${projectId}`
      );
      console.log(`Project Members for ${projectId} (Dialog Fetch):`, response.data);

      setCurrentProjectMembers(response.data.project?.members_details || []);
    } catch (error) {
      console.error(
        `Error fetching members for project ${projectId} (Dialog Fetch):`,
        error.response?.data || error.message || error
      );
      setMembersError("Failed to load project members. Please try again.");
    } finally {
      setMembersLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedTab]);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleEditAssignMembers = (projectId) => {
    setCurrentProjectId(projectId);
    setOpenMembersDialog(true);
    fetchProjectMembers(projectId);
  };

  const handleCloseMembersDialog = () => {
    setOpenMembersDialog(false);
    setCurrentProjectMembers([]);
    setCurrentProjectId(null);
    setMembersError(null);
  };

  // New handler for clicking project card
  const handleProjectCardClick = (projectId) => {
    navigate(`/project-detail?projectid=${projectId}`);
  };

  // --- Render Logic ---
  if (loading) {
    return (
      <Box
        sx={{
          p: 3,
          maxWidth: 1200,
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading projects...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          p: 3,
          maxWidth: 1200,
          margin: "auto",
          textAlign: "center",
          mt: 4,
        }}
      >
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
          projects.map((project) => {
            console.log(`Rendering Project ${project._id}:`, project);

            return (
              <Grid item xs={12} key={project._id}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    border: "1px solid #ddd",
                    minHeight: "180px",
                    cursor: "pointer", // Add cursor pointer to indicate clickability
                  }}
                  onClick={() => handleProjectCardClick(project._id)} // Add onClick handler
                >
                  {/* Project Header (Name + Status Chip) */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <WorkIcon color="primary" sx={{ mr: 1 }} />
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ flexGrow: 1 }}
                    >
                      {project.name}
                    </Typography>
                    <Chip
                      label={project.status || "Unknown"}
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
                    {project.description || "No description provided."}
                  </Typography>

                  {/* Details List */}
                  <List dense sx={{ p: 0, mb: 1, flexShrink: 0 }}>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 35 }}>
                        <GroupIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Members: ${
                          project.members ? project.members.length : 0
                        }`}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 35 }}>
                        <PersonIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Lead: ${project.lead ? project.lead.name : "N/A"}`}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 35 }}>
                        <CalendarTodayIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Created: ${project.createdAt || "N/A"}`}
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
                          key={member._id || index}
                          alt={member.name || "Member"}
                          src={member.avatar || ""}
                          sx={{
                            width: 24,
                            height: 24,
                            fontSize: "0.75rem",
                            bgcolor: member.name ? stringToColor(member.name) : undefined, // Apply consistent color
                          }}
                          title={member.name || "Member"}
                        >
                          {!member.avatar && member.name ? getInitials(member.name) : null} {/* Show initials if no avatar */}
                        </Avatar>
                      ))
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        No team members assigned
                      </Typography>
                    )}
                    {project.membersError && (
                      <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                        (Failed to load some members)
                      </Typography>
                    )}
                  </Box>

                  {/* Edit/Assign Members Button - **Crucially, prevent event propagation for this button** */}
                  <Box
                    sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={(e) => {
                        e.stopPropagation(); // Stop the event from bubbling up to the Paper
                        handleEditAssignMembers(project._id);
                      }}
                    >
                      Edit/Assign Members
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            );
          })
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

      {/* Dialog for Edit/Assign Members (remains separate, fetches members on demand) */}
      <Dialog
        open={openMembersDialog}
        onClose={handleCloseMembersDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit/Assign Members for Project ID: {currentProjectId}</DialogTitle>
        <DialogContent dividers>
          {membersLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100px",
              }}
            >
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Loading members...</Typography>
            </Box>
          ) : membersError ? (
            <Typography color="error">{membersError}</Typography>
          ) : currentProjectMembers.length > 0 ? (
            <List>
              {currentProjectMembers.map((member, index) => (
                <ListItem key={member._id || index}>
                  <ListItemAvatar>
                    <Avatar
                      alt={member.name}
                      src={member.avatar || ""}
                      sx={{
                        bgcolor: member.name ? stringToColor(member.name) : undefined,
                      }}
                    >
                      {!member.avatar && member.name ? getInitials(member.name) : null}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={member.name}
                    secondary={member.email || ""}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No members found for this project.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMembersDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;