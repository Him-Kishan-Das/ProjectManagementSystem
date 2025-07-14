import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Typography, Grid, Avatar, Chip, Button,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, IconButton, List, ListItem, ListItemAvatar,
  ListItemText, Divider, Box, Select, MenuItem, FormControl,
  InputLabel, Stack, useMediaQuery, useTheme, CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; // Import axiosInstance

import CustomModal from '../components/CustomModal';
import AddTaskModalContent from '../components/AddTaskModalContent';

const ProjectDetail = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [taskFilter, setTaskFilter] = useState('all');
  const { projectId } = useParams();
  console.log("ProjectDetail - Current Project ID:", projectId);

  // State for fetched project details and members
  const [project, setProject] = useState(null);
  const [projectMembers, setProjectMembers] = useState([]); // This will hold the actual members from the API
  const [loadingProject, setLoadingProject] = useState(true);
  const [errorProject, setErrorProject] = useState(null);

  // Renamed from 'tasks' to 'allTasks' to avoid confusion with filteredTasks
  // and to hold all project tasks including newly added ones.
  // Initialize with an empty array, as tasks will be fetched or added dynamically.
  const [allTasks, setAllTasks] = useState([]);

  // Fetch project details and members on component mount or projectId change
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoadingProject(true);
        setErrorProject(null);
        const response = await axiosInstance.get(`/projects/projectMembers?project_id=${projectId}`); // Use the same endpoint

        if (response.data && response.data.project) {
          setProject(response.data.project); // Set the project details
          if (Array.isArray(response.data.project.members_details)) {
            // Map _id to id for consistency if needed, or use _id directly
            const membersData = response.data.project.members_details.map(member => ({
              id: member._id,
              name: member.name,
              email: member.email, // Include email if available
              role: member.role // Include role if available
            }));
            setProjectMembers(membersData); // Set the project members
          } else {
            console.warn("Project members_details is not an array or missing.");
            setProjectMembers([]); // Ensure it's an empty array if not found
          }
          // You might also fetch initial tasks for this project here if your backend supports it
          // For now, tasks are handled by AddTaskModalContent and local state.
        } else {
          throw new Error("Unexpected response structure for project details.");
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
        if (error.response) {
          setErrorProject(`Failed to load project details: ${error.response.status} - ${error.response.data.message || JSON.stringify(error.response.data) || 'Server error'}`);
        } else if (error.request) {
          setErrorProject("Failed to load project details: No response from server. Check network or backend.");
        } else {
          setErrorProject(`Failed to load project details: ${error.message}`);
        }
      } finally {
        setLoadingProject(false);
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]); // Re-run effect if projectId changes

  // Filter tasks based on the selected status
  const filteredTasks = taskFilter === 'all' ? allTasks : allTasks.filter(t => t.status === taskFilter);

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return ''; // Defensive check
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do': return 'primary';
      case 'In Progress': return 'warning';
      case 'Completed': return 'success';
      default: return 'default';
    }
  };

  // Make getRandomColor more robust
  const getRandomColor = (inputName) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.error.main,
      theme.palette.warning.main,
    ];
    // Ensure inputName is a string before accessing length
    const name = typeof inputName === 'string' ? inputName : '';
    if (colors.length === 0) return '#CCCCCC'; // Fallback if no colors defined
    return colors[name.length % colors.length];
  };

  // Helper to find member name by ID
  const getMemberNameById = (memberId) => {
    const member = projectMembers.find(m => m.id === memberId);
    return member ? member.name : 'Unknown Member';
  };

  // State to control the visibility of the Add Task modal
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);

  // Function to open the Add Task modal
  const handleOpenAddTaskModal = () => {
    setOpenAddTaskModal(true);
  };

  // Function to close the Add Task modal
  const handleCloseAddTaskModal = () => {
    setOpenAddTaskModal(false);
  };

  // Function to handle adding new tasks from the modal
  const handleAddTasks = (newTasks) => {
    // In a real app, you would likely refetch tasks from the backend
    // after successful submission, or add them to local state if the
    // backend response provides the full new task objects with IDs.
    // For now, we'll just add them to the local state.
    const tasksWithLocalIds = newTasks.map((task, index) => ({
      ...task,
      // Use a more robust temporary ID if not getting from backend immediately
      id: `temp-${Date.now()}-${index}`,
      // Replace assignedTo ID with name for display if needed in this component's task list
      assignedTo: getMemberNameById(task.assigned_to_user_id) // Convert ID back to name for display
    }));
    setAllTasks((prevTasks) => [...prevTasks, ...tasksWithLocalIds]);
    handleCloseAddTaskModal(); // Close the modal after tasks are added
  };

  // Render loading or error states for project details
  if (loadingProject) {
    return (
      <Container maxWidth="xl" sx={{ py: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading project details...</Typography>
      </Container>
    );
  }

  if (errorProject) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Typography color="error">{errorProject}</Typography>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Typography>Project not found or data is empty.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">{project.name}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {project.description}
        </Typography>
        <Divider sx={{ mt: 2, mb: 3 }} />
      </Box>

      {/* Info Cards */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* Project Overview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, borderRadius: 2, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Project Overview
            </Typography>
            <List dense>
              <ListItem disableGutters>
                <ListItemText primary="Lead:" secondary={project.lead || 'N/A'} />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Created:" secondary={project.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A'} />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Due Date:" secondary={project.dueDate || 'N/A'} /> {/* Assuming project.dueDate exists or adjust */}
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Project Members */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, borderRadius: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Project Members ({projectMembers.length})
              </Typography>
              <Button size="small" startIcon={<AddIcon />} sx={{ minWidth: 'auto', p: 0 }}>
                Add
              </Button>
            </Box>
            <List dense>
              {projectMembers.length > 0 ? (
                projectMembers.map((member) => (
                  <ListItem key={member.id} disableGutters sx={{ mb: 1 }}>
                    <ListItemAvatar>
                      <Avatar sx={{
                        width: 28, height: 28, fontSize: '0.8rem',
                        bgcolor: getRandomColor(member.name) // Pass member.name
                      }}>
                        {getInitials(member.name)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.name}
                      secondary={member.email}
                      primaryTypographyProps={{ fontSize: '0.9rem' }}
                      secondaryTypographyProps={{ fontSize: '0.75rem' }}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem><ListItemText secondary="No members found for this project." /></ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Task Status */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, borderRadius: 2, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Task Status
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Paper sx={{ p: 1, textAlign: 'center', borderRadius: 1 }}>
                  <Typography variant="h6">{allTasks.length}</Typography>
                  <Typography variant="caption">Total</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 1, textAlign: 'center', borderRadius: 1 }}>
                  <Typography variant="h6" color="success.main">
                    {allTasks.filter(t => t.status === 'Completed').length}
                  </Typography>
                  <Typography variant="caption">Completed</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 1, textAlign: 'center', borderRadius: 1 }}>
                  <Typography variant="h6" color="warning.main">
                    {allTasks.filter(t => t.status === 'In Progress').length}
                  </Typography>
                  <Typography variant="caption">In Progress</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Task Table */}
      <Paper elevation={2} sx={{ mt: 4, p: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">Tasks ({filteredTasks.length})</Typography>
          <Stack direction="row" spacing={2}>
            <FormControl size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleOpenAddTaskModal}
            >
              Create Task
            </Button>
          </Stack>
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Task Name</strong></TableCell>
                <TableCell><strong>Assigned To</strong></TableCell>
                <TableCell><strong>Due Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.name}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar
                          sx={{
                            width: 24, height: 24,
                            fontSize: '0.7rem',
                            bgcolor: getRandomColor(task.assignedTo) // Pass task.assignedTo (which is now name)
                          }}
                        >
                          {getInitials(task.assignedTo)}
                        </Avatar>
                        <span>{task.assignedTo}</span>
                      </Stack>
                    </TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={task.status}
                        size="small"
                        color={getStatusColor(task.status)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                      <IconButton size="small"><DeleteIcon fontSize="small" /></IconButton>
                      {task.status !== 'Completed' && (
                        <IconButton size="small" color="success">
                          <CheckCircleIcon fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">No tasks found for this project.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Custom Modal for Adding Tasks - Add AddTaskModalContent as children */}
      <CustomModal
        open={openAddTaskModal}
        onClose={handleCloseAddTaskModal}
        title="Add New Tasks"
      >
        {/* Pass projectMembers to AddTaskModalContent for the dropdown */}
        <AddTaskModalContent onAddTask={handleAddTasks} />
      </CustomModal>
    </Container>
  );
};

export default ProjectDetail;
