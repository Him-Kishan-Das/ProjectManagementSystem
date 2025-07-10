import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // Removed as projectId is not from URL
import {
  Box,
  Typography,
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
  Divider,
  TextField,
  IconButton,
  Tooltip,
  ListItemAvatar
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt"; // For To Do tasks
import EditIcon from "@mui/icons-material/Edit";
// import axiosInstance from "../api/axiosInstance"; // Commented out for dummy data

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

// --- Utility function to get first initial ---
const getInitial = (name) => {
  if (!name) return "";
  return name[0].toUpperCase();
};

const ProjectDetail = () => {
  // const { projectId } = useParams(); // Removed
  // console.log("ProjectDetail - projectId from URL:", projectId); // Removed

  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dialog states for adding members/tasks
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [addMemberLoading, setAddMemberLoading] = useState(false);
  const [addMemberError, setAddMemberError] = useState(null);

  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [addTaskLoading, setAddTaskLoading] = useState(false);
  const [addTaskError, setAddTaskError] = useState(null);

  // --- DUMMY DATA (Now static, not dependent on projectId) ---
  const dummyProject = {
    _id: "dummy-proj-123", // Static ID
    name: `Sample Project Alpha`,
    description: `This is a detailed description for a sample project. It outlines the project's goals, scope, and expected outcomes. This content is for design demonstration purposes only. You can imagine this being a complex software development project, a marketing campaign, or an event planning initiative.`,
    status: "In Progress",
    lead: { _id: "lead1", name: "Alice Johnson", email: "alice@example.com" },
    createdAt: "2023-01-15",
    dueDate: "2024-12-31",
  };

  const dummyMembers = [
    { _id: "mem1", name: "John Doe", email: "john@example.com", avatar: "" },
    { _id: "mem2", name: "Jane Smith", email: "jane@example.com", avatar: "" },
    { _id: "mem3", name: "Peter Jones", email: "peter@example.com", avatar: "" },
    { _id: "mem4", name: "Emily White", email: "emily@example.com", avatar: "" },
    { _id: "mem5", name: "Michael Brown", email: "michael@example.com", avatar: "" },
  ];

  const dummyTasks = [
    { _id: "task1", title: "Conduct Market Research", description: "Analyze competitor strategies and target audience needs.", status: "To Do", assigned_to: { _id: "mem2", name: "Jane Smith" } },
    { _id: "task2", title: "Develop UI/UX Wireframes", description: "Create initial visual layouts and user flows.", status: "In Progress", assigned_to: { _id: "mem4", name: "Emily White" } },
    { _id: "task3", title: "Set Up Development Environment", description: "Configure necessary tools and platforms for coding.", status: "Completed", assigned_to: { _id: "mem1", name: "John Doe" }, completed_by: { _id: "mem1", name: "John Doe" } },
    { _id: "task4", title: "Implement User Authentication", description: "Build login, registration, and password recovery features.", status: "In Progress", assigned_to: { _id: "mem3", name: "Peter Jones" } },
    { _id: "task5", title: "Draft Project Proposal", description: "Write the comprehensive project proposal document.", status: "Completed", assigned_to: { _id: "lead1", name: "Alice Johnson" }, completed_by: { _id: "lead1", name: "Alice Johnson" } },
    { _id: "task6", title: "Plan Sprint 1 Tasks", description: "Break down initial features into actionable tasks for the first sprint.", status: "To Do", assigned_to: { _id: "lead1", name: "Alice Johnson" } },
    { _id: "task7", title: "Backend Database Setup", description: "Design and implement the database schema.", status: "In Progress", assigned_to: { _id: "mem1", name: "John Doe" } },
    { _id: "task8", title: "Frontend Component Library", description: "Create a reusable library of UI components.", status: "To Do", assigned_to: { _id: "mem4", name: "Emily White" } },
  ];

  // Fetch project details, members, and tasks (using dummy data)
  const fetchProjectDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setProject(dummyProject);
      setMembers(dummyMembers);
      setTasks(dummyTasks);

      console.log("Fetched Project Details (Dummy):", dummyProject);
      console.log("Fetched Project Members (Dummy):", dummyMembers);
      console.log("Fetched Project Tasks (Dummy):", dummyTasks);

    } catch (err) {
      console.error("Error fetching project details (Dummy):", err);
      setError("Failed to load project details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // No projectId dependency needed, fetches once on mount
    fetchProjectDetails();
  }, []); // Empty dependency array means it runs once on mount

  // --- Add Member Logic ---
  const handleOpenAddMemberDialog = () => {
    setOpenAddMemberDialog(true);
    setNewMemberEmail(""); // Clear previous input
    setAddMemberError(null);
  };

  const handleCloseAddMemberDialog = () => {
    setOpenAddMemberDialog(false);
  };

  const handleAddMember = async () => {
    setAddMemberLoading(true);
    setAddMemberError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newMockMember = {
        _id: `mock-${Date.now()}`,
        name: newMemberEmail.split('@')[0] || "New Member",
        email: newMemberEmail,
        avatar: "",
      };
      setMembers((prevMembers) => [...prevMembers, newMockMember]);
      handleCloseAddMemberDialog();
      console.log(`Member ${newMemberEmail} added successfully (mock)!`);
    } catch (err) {
      console.error("Error adding member (mock):", err);
      setAddMemberError("Failed to add member. Please check the email and try again.");
    } finally {
      setAddMemberLoading(false);
    }
  };

  // --- Add Task Logic ---
  const handleOpenAddTaskDialog = () => {
    setOpenAddTaskDialog(true);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setAddTaskError(null);
  };

  const handleCloseAddTaskDialog = () => {
    setOpenAddTaskDialog(false);
  };

  const handleAddTask = async () => {
    setAddTaskLoading(true);
    setAddTaskError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newMockTask = {
        _id: `task-mock-${Date.now()}`,
        title: newTaskTitle,
        description: newTaskDescription,
        status: "To Do",
        assigned_to: null, // Can be assigned later
      };
      setTasks((prevTasks) => [...prevTasks, newMockTask]);
      handleCloseAddTaskDialog();
      console.log(`Task "${newTaskTitle}" added successfully (mock)!`);
    } catch (err) {
      console.error("Error adding task (mock):", err);
      setAddTaskError("Failed to add task. Please try again.");
    } finally {
      setAddTaskLoading(false);
    }
  };

  // Filter tasks by status
  const todoTasks = tasks.filter((task) => task.status === "To Do");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

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
          Loading project details...
        </Typography>
      </Box>
    );
  }

  // The 'error' and '!project' checks are less likely to be hit with static dummy data,
  // but are good practice for when you re-integrate real API calls.
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

  if (!project) {
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
        <Typography variant="h6" color="text.secondary">
          Project data not loaded.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "auto" }}>
      {/* Project Heading */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <WorkIcon color="primary" sx={{ fontSize: 40 }} />
        <Typography variant="h3" component="h1" sx={{ flexGrow: 1 }}>
          {project.name}
        </Typography>
        <Chip
          label={project.status || "Unknown"}
          color={project.status === "In Progress" ? "info" : "success"}
          size="medium"
        />
        <Tooltip title="Edit Project Details">
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {project.description || "No detailed description available."}
      </Typography>

      <Grid container spacing={4}>
        {/* Project Details Card */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Project Overview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List dense>
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
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 35 }}>
                  <CalendarTodayIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={`Due Date: ${project.dueDate || "N/A"}`}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Members Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6">Project Members ({members.length})</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenAddMemberDialog}
              >
                Add Member
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {members.length > 0 ? (
              <List dense>
                {members.map((member) => (
                  <ListItem key={member._id}>
                    <ListItemAvatar>
                      <Avatar
                        alt={member.name}
                        src={member.avatar || ""}
                        sx={{
                          bgcolor: member.name ? stringToColor(member.name) : undefined,
                        }}
                      >
                        {!member.avatar && member.name ? getInitial(member.name) : null}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.name}
                      secondary={member.email || "No email"}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No members assigned to this project yet.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Tasks Section */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6">Tasks</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenAddTaskDialog}
              >
                Add New Task
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={3}>
              {/* To Do Tasks */}
              <Grid item xs={12} md={4}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: "info.main", minHeight: 200 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <DoNotDisturbAltIcon sx={{ mr: 1, color: "info.main" }} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      To Do ({todoTasks.length})
                    </Typography>
                  </Box>
                  <List dense>
                    {todoTasks.length > 0 ? (
                      todoTasks.map((task) => (
                        <ListItem key={task._id} disablePadding>
                          <ListItemText primary={task.title} secondary={`Assigned to: ${task.assigned_to?.name || 'N/A'}`} />
                        </ListItem>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No tasks to do.
                      </Typography>
                    )}
                  </List>
                </Paper>
              </Grid>

              {/* In Progress Tasks */}
              <Grid item xs={12} md={4}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: "warning.main", minHeight: 200 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <HourglassEmptyIcon sx={{ mr: 1, color: "warning.main" }} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      In Progress ({inProgressTasks.length})
                    </Typography>
                  </Box>
                  <List dense>
                    {inProgressTasks.length > 0 ? (
                      inProgressTasks.map((task) => (
                        <ListItem key={task._id} disablePadding>
                          <ListItemText primary={task.title} secondary={`Assigned to: ${task.assigned_to?.name || 'N/A'}`} />
                        </ListItem>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No tasks in progress.
                      </Typography>
                    )}
                  </List>
                </Paper>
              </Grid>

              {/* Completed Tasks */}
              <Grid item xs={12} md={4}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: "success.main", minHeight: 200 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <CheckCircleOutlineIcon sx={{ mr: 1, color: "success.main" }} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Completed ({completedTasks.length})
                    </Typography>
                  </Box>
                  <List dense>
                    {completedTasks.length > 0 ? (
                      completedTasks.map((task) => (
                        <ListItem key={task._id} disablePadding>
                          <ListItemText primary={task.title} secondary={`Completed by: ${task.completed_by?.name || 'N/A'}`} />
                        </ListItem>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No completed tasks.
                      </Typography>
                    )}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Member Dialog */}
      <Dialog open={openAddMemberDialog} onClose={handleCloseAddMemberDialog}>
        <DialogTitle>Add New Project Member</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            label="Member Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
            error={!!addMemberError}
            helperText={addMemberError}
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary">
            Enter the email of the user you wish to add to this project.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddMemberDialog} disabled={addMemberLoading}>
            Cancel
          </Button>
          <Button onClick={handleAddMember} disabled={addMemberLoading}>
            {addMemberLoading ? <CircularProgress size={24} /> : "Add Member"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Task Dialog */}
      <Dialog open={openAddTaskDialog} onClose={handleCloseAddTaskDialog}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            error={!!addTaskError}
            helperText={addTaskError}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Task Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary">
            Provide a title and description for the new task. It will be added to "To Do" tasks.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddTaskDialog} disabled={addTaskLoading}>
            Cancel
          </Button>
          <Button onClick={handleAddTask} disabled={addTaskLoading}>
            {addTaskLoading ? <CircularProgress size={24} /> : "Add Task"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectDetail;
