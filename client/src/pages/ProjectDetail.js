import React, { useState } from 'react';
import {
  Container, Paper, Typography, Grid, Avatar, Chip, Button,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, IconButton, List, ListItem, ListItemAvatar,
  ListItemText, Divider, Box, Select, MenuItem, FormControl,
  InputLabel, Stack, useMediaQuery, useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const ProjectDetail = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [taskFilter, setTaskFilter] = useState('all');

  const project = {
    name: 'Sample Project Alpha',
    description: 'This is a detailed description for a sample project. It outlines the project\'s goals, scope, and expected outcomes.',
    lead: 'Alice Johnson',
    created: '2023-01-15',
    dueDate: '2024-12-31',
  };

  const members = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Peter Jones', email: 'peter@example.com' },
    { id: 4, name: 'Emily White', email: 'emily@example.com' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com' },
  ];

  const tasks = [
    { id: 1, name: 'Conduct Market Research', assignedTo: 'Jane Smith', dueDate: '2024-08-01', status: 'To Do' },
    { id: 2, name: 'Develop UI/UX Wireframes', assignedTo: 'Emily White', dueDate: '2024-07-20', status: 'In Progress' },
    { id: 3, name: 'Set Up Development Environment', assignedTo: 'John Doe', dueDate: '2024-06-30', status: 'Completed' },
    { id: 4, name: 'Implement User Authentication', assignedTo: 'Peter Jones', dueDate: '2024-08-15', status: 'In Progress' },
  ];

  const filteredTasks = taskFilter === 'all' ? tasks : tasks.filter(t => t.status === taskFilter);

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('');
  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do': return 'primary';
      case 'In Progress': return 'warning';
      case 'Completed': return 'success';
      default: return 'default';
    }
  };
  const getRandomColor = (name) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.error.main,
      theme.palette.warning.main,
    ];
    return colors[name.length % colors.length];
  };

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
          <ListItemText primary="Lead:" secondary={project.lead} />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Created:" secondary={project.created} />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Due Date:" secondary={project.dueDate} />
        </ListItem>
      </List>
    </Paper>
  </Grid>

  {/* Project Members */}
  <Grid item xs={12} md={4}>
    <Paper sx={{ p: 2, borderRadius: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Project Members ({members.length})
        </Typography>
        <Button size="small" startIcon={<AddIcon />} sx={{ minWidth: 'auto', p: 0 }}>
          Add
        </Button>
      </Box>
      <List dense>
        {members.map((member) => (
          <ListItem key={member.id} disableGutters sx={{ mb: 1 }}>
            <ListItemAvatar>
              <Avatar sx={{
                width: 28, height: 28, fontSize: '0.8rem',
                bgcolor: getRandomColor(member.name)
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
        ))}
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
            <Typography variant="h6">4</Typography>
            <Typography variant="caption">Total</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 1, textAlign: 'center', borderRadius: 1 }}>
            <Typography variant="h6" color="success.main">1</Typography>
            <Typography variant="caption">Completed</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 1, textAlign: 'center', borderRadius: 1 }}>
            <Typography variant="h6" color="warning.main">2</Typography>
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
            <Button variant="contained" size="small" startIcon={<AddIcon />}>
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
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar
                        sx={{
                          width: 24, height: 24,
                          fontSize: '0.7rem',
                          bgcolor: getRandomColor(task.assignedTo)
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ProjectDetail;
