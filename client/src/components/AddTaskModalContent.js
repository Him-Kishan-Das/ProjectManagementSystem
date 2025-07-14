import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Stack,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const AddTaskModalContent = ({ onAddTask }) => {
  const { projectId } = useParams();
  console.log("Current Project ID:", projectId);

  const [tasks, setTasks] = useState([
    // Removed 'status' from initial state as it's now handled by backend
    { name: '', description: '', assignedTo: '', dueDate: '' },
  ]);
  const [projectMembers, setProjectMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [errorMembers, setErrorMembers] = useState(null);
  const [submittingTasks, setSubmittingTasks] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loadingUserId, setLoadingUserId] = useState(true);

  // Effect to load user ID from localStorage on component mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user'); // Common key for user object
      const storedUserId = localStorage.getItem('user_id'); // Common key for just user ID string

      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user && user._id) {
          setCurrentUserId(user._id);
        } else {
          console.warn("User object found in localStorage but _id property is missing or invalid.");
        }
      } else if (storedUserId) {
        setCurrentUserId(storedUserId);
      } else {
        console.warn("No user ID found in localStorage under 'user' or 'user_id' keys.");
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
    } finally {
      setLoadingUserId(false);
    }
  }, []);

  // Fetch project members when the component mounts or projectId changes
  useEffect(() => {
    const fetchProjectMembers = async () => {
      try {
        setLoadingMembers(true);
        setErrorMembers(null);
        const response = await axiosInstance.get(`/projects/projectMembers?project_id=${projectId}`);

        if (response.data && response.data.project && Array.isArray(response.data.project.members_details)) {
          const members = response.data.project.members_details.map(member => ({
            id: member._id,
            name: member.name
          }));
          setProjectMembers(members);
        } else {
          throw new Error("Unexpected response structure for project members. Missing 'project' or 'members_details'.");
        }

      } catch (error) {
        console.error("Error fetching project members:", error);
        if (error.response) {
          setErrorMembers(`Failed to load project members: ${error.response.status} - ${error.response.data.message || 'Server error'}`);
        } else if (error.request) {
          setErrorMembers("Failed to load project members: No response from server. Check network or backend.");
        } else {
          setErrorMembers(`Failed to load project members: ${error.message}`);
        }
      } finally {
        setLoadingMembers(false);
      }
    };

    if (projectId) {
      fetchProjectMembers();
    }
  }, [projectId]);

  const handleTaskChange = (index, field, value) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const handleAddTaskField = () => {
    // Removed 'status' from new task field as it's handled by backend
    setTasks([...tasks, { name: '', description: '', assignedTo: '', dueDate: '' }]);
  };

  const handleRemoveTaskField = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleSubmit = async () => {
    setSubmittingTasks(true);
    setSubmissionError(null);

    if (loadingUserId) {
      setSubmissionError("Please wait, user authentication is still loading.");
      setSubmittingTasks(false);
      return;
    }
    if (!currentUserId) {
      setSubmissionError("User ID is required to create tasks. Please ensure you are logged in and your user ID is stored in localStorage.");
      setSubmittingTasks(false);
      return;
    }

    const isValid = tasks.every(task => task.name && task.assignedTo && task.dueDate);
    if (!isValid) {
      setSubmissionError("Please fill in all required fields (Task Name, Assigned To, Due Date) for all tasks.");
      setSubmittingTasks(false);
      return;
    }

    const tasksToSubmit = tasks.map(task => ({
      project_id: projectId,
      name: task.name,
      description: task.description,
      assigned_to_user_id: task.assignedTo,
      created_by_user_id: currentUserId,
      due_date: task.dueDate,
      // Status is no longer sent from frontend, backend will set it to 'To Do'
    }));

    try {
      const response = await axiosInstance.post('/assigntasks', tasksToSubmit); // Corrected path
      console.log('Tasks submitted successfully:', response.data);
      onAddTask(response.data.tasks); // Pass the tasks returned by the backend (which include status)
      setTasks([{ name: '', description: '', assignedTo: '', dueDate: '' }]); // Reset form
    } catch (error) {
      console.error("Error submitting tasks:", error);
      if (error.response) {
        setSubmissionError(`Failed to add tasks: ${error.response.status} - ${error.response.data.message || JSON.stringify(error.response.data) || 'Server error'}`);
      } else if (error.request) {
        setSubmissionError("Failed to add tasks: No response from server. Check network connection or backend server status.");
      } else {
        setSubmissionError(`Failed to add tasks: ${error.message}`);
      }
    } finally {
      setSubmittingTasks(false);
    }
  };

  if (loadingUserId) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading user data...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Add Multiple Tasks
      </Typography>

      {loadingMembers && <Typography>Loading project members...</Typography>}
      {errorMembers && <Typography color="error">{errorMembers}</Typography>}

      {!loadingMembers && !errorMembers && currentUserId && tasks.map((task, index) => (
        <Stack key={index} direction="column" spacing={2} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <TextField
            label="Task Name"
            variant="outlined"
            fullWidth
            size="small"
            value={task.name}
            onChange={(e) => handleTaskChange(index, 'name', e.target.value)}
            required
            error={!task.name && !submittingTasks && submissionError !== null}
            helperText={!task.name && !submittingTasks && submissionError !== null ? "Task Name is required" : ""}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            size="small"
            value={task.description}
            onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
          />
          <FormControl fullWidth size="small" required
            error={!task.assignedTo && !submittingTasks && submissionError !== null}
          >
            <InputLabel>Assigned To</InputLabel>
            <Select
              value={task.assignedTo}
              label="Assigned To"
              onChange={(e) => handleTaskChange(index, 'assignedTo', e.target.value)}
            >
              {projectMembers.length > 0 ? (
                projectMembers.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    {member.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>No members available</MenuItem>
              )}
            </Select>
            {!task.assignedTo && !submittingTasks && submissionError !== null && (
              <Typography variant="caption" color="error" sx={{ ml: 1.5, mt: 0.5 }}>
                Assigned To is required
              </Typography>
            )}
          </FormControl>
          <TextField
            label="Due Date"
            type="date"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            value={task.dueDate}
            onChange={(e) => handleTaskChange(index, 'dueDate', e.target.value)}
            required
            error={!task.dueDate && !submittingTasks && submissionError !== null}
            helperText={!task.dueDate && !submittingTasks && submissionError !== null ? "Due Date is required" : ""}
          />
          {/* Removed Status FormControl - Status is now automatically "To Do" */}
          {tasks.length > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton color="error" onClick={() => handleRemoveTaskField(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Stack>
      ))}
      <Button
        startIcon={<AddIcon />}
        onClick={handleAddTaskField}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        disabled={submittingTasks || !currentUserId}
      >
        Add Another Task
      </Button>
      {submissionError && <Typography color="error" sx={{ mb: 2 }}>{submissionError}</Typography>}
      <Button
        variant="contained"
        onClick={handleSubmit}
        fullWidth
        disabled={submittingTasks || !currentUserId}
        startIcon={submittingTasks ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {submittingTasks ? 'Adding Tasks...' : 'Add Tasks'}
      </Button>
      {!currentUserId && !loadingUserId && (
        <Typography color="error" sx={{ mt: 2 }}>
          Cannot add tasks: User ID not found. Please ensure you are logged in.
        </Typography>
      )}
    </Box>
  );
};

export default AddTaskModalContent;
