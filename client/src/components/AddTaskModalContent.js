// AddTaskModalContent.jsx
import React, { useState } from 'react';
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
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const AddTaskModalContent = ({ members, onAddTask }) => {
  const [tasks, setTasks] = useState([
    { name: '', assignedTo: '', dueDate: '', status: 'To Do' },
  ]);

  const handleTaskChange = (index, field, value) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const handleAddTaskField = () => {
    setTasks([...tasks, { name: '', assignedTo: '', dueDate: '', status: 'To Do' }]);
  };

  const handleRemoveTaskField = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleSubmit = () => {
    // In a real application, you'd perform validation here
    onAddTask(tasks);
    setTasks([{ name: '', assignedTo: '', dueDate: '', status: 'To Do' }]); // Reset form
  };

  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Add Multiple Tasks
      </Typography>
      {tasks.map((task, index) => (
        <Stack key={index} direction="column" spacing={2} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <TextField
            label="Task Name"
            variant="outlined"
            fullWidth
            size="small"
            value={task.name}
            onChange={(e) => handleTaskChange(index, 'name', e.target.value)}
          />
          <FormControl fullWidth size="small">
            <InputLabel>Assigned To</InputLabel>
            <Select
              value={task.assignedTo}
              label="Assigned To"
              onChange={(e) => handleTaskChange(index, 'assignedTo', e.target.value)}
            >
              {members.map((member) => (
                <MenuItem key={member.id} value={member.name}>
                  {member.name}
                </MenuItem>
              ))}
            </Select>
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
          />
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={task.status}
              label="Status"
              onChange={(e) => handleTaskChange(index, 'status', e.target.value)}
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
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
      >
        Add Another Task
      </Button>
      <Button variant="contained" onClick={handleSubmit} fullWidth>
        Add Tasks
      </Button>
    </Box>
  );
};

export default AddTaskModalContent;