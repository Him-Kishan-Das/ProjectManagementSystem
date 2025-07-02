import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const simpleAdminTheme = createTheme({
  palette: {
    primary: {
      main: '#424242', // Dark gray for primary elements
    },
    secondary: {
      main: '#FFC107', // Amber for accents (if needed, though image is minimal)
    },
    background: {
      default: '#f0f2f5', // Light background for the page
      paper: '#ffffff', // White for cards/panels
    },
    text: {
      primary: '#212121',
      secondary: '#616161',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Prevent uppercase tabs
          fontWeight: 600,
          '&.Mui-selected': {
            color: '#424242', // Selected tab text color
            backgroundColor: '#e0e0e0', // Light gray background for selected tab
            borderRadius: '4px 4px 0 0', // Rounded top corners
          },
        },
      },
    },
    MuiTabs: {
        styleOverrides: {
            indicator: {
                display: 'none', // Hide the default indicator
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: '8px', // Slightly rounded corners for all papers
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none', // Prevent uppercase button text
                fontWeight: 600,
            },
        },
    },
    MuiTableCell: {
        styleOverrides: {
            head: {
                fontWeight: 600,
                backgroundColor: '#f5f5f5', // Light background for table header
                color: '#424242',
            },
            body: {
                fontSize: '0.9rem',
            },
        },
    },
  },
});

// A helper component to render the content for each tab
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}> {/* Reduced padding for table content */}
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Mock Data for the Tables
const usersData = {
  pending: [
    { id: 1, name: "Jhoomar", email: "jhoomar12@gmail.com" },
    { id: 2, name: "Alice Smith", email: "alice.s@example.com" },
  ],
  rejected: [
    { id: 3, name: "Bob Johnson", email: "bob.j@example.com" },
    { id: 4, name: "Carol White", email: "carol.w@example.com" },
  ],
  assigned: [
    { id: 5, name: "David Lee", email: "david.l@example.com" },
    { id: 6, name: "Eve Green", email: "eve.g@example.com" },
  ],
};

function AdminPanel() {
  const [currentTab, setCurrentTab] = useState(0); // 0: Pending, 1: Rejected/Unassigned, 2: Assigned
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const adminDetails = {
    name: "Him Kishan Das",
    email: "himkishandablogger@gmail.com",
    role: "admin",
  };

  // Filter users based on search term (simple case-insensitive contains)
  const filterUsers = (users) => {
    if (!searchTerm) return users;
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Render a generic user table for a given tab's data
  const renderUserTable = (data, type) => (
    <TableContainer component={Paper} sx={{ mt: 2, border: '1px solid #e0e0e0' }}> {/* Added subtle border */}
      <Table sx={{ minWidth: 650 }} aria-label={`${type} users table`}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterUsers(data).length > 0 ? (
            filterUsers(data).map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="right">
                  {type === 'pending' && (
                    <>
                      <Button variant="text" size="small" sx={{ color: '#4CAF50', mr: 1, '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.04)' } }}>
                        Assign Role
                      </Button>
                      <Button variant="text" size="small" sx={{ color: '#F44336', '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.04)' } }}>
                        Reject
                      </Button>
                    </>
                  )}
                  {type === 'rejected' && (
                    <Button variant="text" size="small" sx={{ color: '#2196F3', '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.04)' } }}>
                      Re-evaluate
                    </Button>
                  )}
                  {type === 'assigned' && (
                    <Button variant="text" size="small" sx={{ color: '#F44336', '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.04)' } }}>
                      Revoke Role
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="body2" color="textSecondary" sx={{ py: 2 }}>
                  No users found in this category.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <ThemeProvider theme={simpleAdminTheme}>
      <CssBaseline />
      <Box sx={{ p: 3, backgroundColor: simpleAdminTheme.palette.background.default, minHeight: '100vh' }}>
        {/* Top Header Admin Role Manager */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <img src="https://mui.com/static/images/avatar/1.jpg" alt="Logo" style={{ height: 40, marginRight: 10, borderRadius: '50%' }} /> {/* Placeholder logo */}
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: simpleAdminTheme.palette.primary.main }}>
            Admin Role Manager
          </Typography>
        </Box>

        {/* Admin Details Section */}
        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Admin: {adminDetails.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Email: {adminDetails.email}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Role: {adminDetails.role}
          </Typography>
        </Paper>

        {/* Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3, '& fieldset': { borderRadius: '8px' } }} // Match paper border radius
        />

        {/* Tabs Section */}
        {/* Adjusted to match the image's tab styling closely */}
        <Box sx={{ width: '100%', mb: 2 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="admin roles tabs"
            TabIndicatorProps={{ style: { display: 'none' } }} // Hide default Material-UI indicator
            sx={{
              '& .MuiTabs-flexContainer': {
                justifyContent: 'flex-start', // Align tabs to the left
              },
              '& .MuiTab-root': {
                minHeight: '48px', // Standard tab height
                padding: '12px 24px', // Adjust padding for a button-like feel
                marginRight: '8px', // Space between tabs
                borderRadius: '8px', // Rounded corners for tab buttons
                backgroundColor: '#e0e0e0', // Background for unselected tabs
                color: simpleAdminTheme.palette.text.primary,
                '&.Mui-selected': {
                  backgroundColor: '#ffffff', // White background for selected tab
                  boxShadow: '0px 2px 4px rgba(0,0,0,0.1)', // Subtle shadow for selected tab
                  zIndex: 1, // Bring selected tab to front
                  color: simpleAdminTheme.palette.primary.main, // Darker text for selected
                },
                '&:hover': {
                    backgroundColor: '#d0d0d0', // Slightly darker hover for unselected
                },
              },
            }}
          >
            <Tab label="Pending Roles" {...a11yProps(0)} />
            <Tab label="Rejected/Unassigned Roles" {...a11yProps(1)} />
            <Tab label="Assigned Roles" {...a11yProps(2)} />
          </Tabs>
        </Box>

        {/* Tab Content Panels */}
        <CustomTabPanel value={currentTab} index={0}>
          {renderUserTable(usersData.pending, 'pending')}
        </CustomTabPanel>

        <CustomTabPanel value={currentTab} index={1}>
          {renderUserTable(usersData.rejected, 'rejected')}
        </CustomTabPanel>

        <CustomTabPanel value={currentTab} index={2}>
          {renderUserTable(usersData.assigned, 'assigned')}
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
}

export default AdminPanel;