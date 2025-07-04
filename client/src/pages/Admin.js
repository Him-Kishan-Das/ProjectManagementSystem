import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axiosInstance from "../api/axiosInstance";
import AssignRole from "../components/AssignRole"; // Import the new component

const simpleAdminTheme = createTheme({
  palette: {
    primary: {
      main: "#424242",
    },
    secondary: {
      main: "#FFC107",
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#616161",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          "&.Mui-selected": {
            color: "#424242",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px 4px 0 0",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          display: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: "#f5f5f5",
          color: "#424242",
        },
        body: {
          fontSize: "0.9rem",
        },
      },
    },
  },
});

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
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AdminPanel() {
  const [currentTab, setCurrentTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const userRaw = localStorage.getItem("user");
  const user = JSON.parse(userRaw);
  const adminDetails = {
    name: user.name,
    email: user.email,
    role: "admin",
  };

  const filterUsers = (users) => {
    if (!searchTerm) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const [pendingUsers, setPendingUsers] = useState([]);
  const fetchPendingUsers = async () => {
    try {
      const response = await axiosInstance.get("/getPendingUsers");
      setPendingUsers(response.data);
    } catch (error) {
      console.error("Error fetching pending users: ", error);
      setPendingUsers([]);
    }
  };

  const [rejectedUsers, setRejectedUsers] = useState([]);
  const fetchRejectedUsers = async () => {
    try {
      const response = await axiosInstance.get("/getRejectedUsers");
      setRejectedUsers(response.data);
    } catch (error) {
      console.error("Error fetching rejected users: ", error);
      setRejectedUsers([]);
    }
  };

  const [activeUsers, setActiveUsers] = useState([]);
  const fetchActiveUsers = async () => {
    try {
      const response = await axiosInstance.get("/getActiveUsers");
      setActiveUsers(response.data);
    } catch (error) {
      console.error("Error fetching active users: ", error);
      setActiveUsers([]);
    }
  };

  // State for the Assign Role dialog, now controlled by AdminPanel and passed to AssignRole
  const [openAssignRoleModal, setOpenAssignRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (currentTab === 0) {
      fetchPendingUsers();
    } else if (currentTab === 1) {
      fetchRejectedUsers();
    } else if (currentTab === 2) {
      fetchActiveUsers();
    }
  }, [currentTab]);

  // Function to handle opening the assign role modal
  const handleAssignRoleClick = (user) => {
    setSelectedUser(user);
    setOpenAssignRoleModal(true);
  };

  // Callback function to refresh user lists after a role assignment
  const handleRoleAssigned = () => {
    fetchPendingUsers();
    fetchActiveUsers();
    // No need to close the modal here; AssignRole component will handle its own close
  };

  // Render a generic user table for a given tab's data
  const renderUserTable = (data, type) => (
    <TableContainer
      component={Paper}
      sx={{ mt: 2, border: "1px solid #e0e0e0" }}
    >
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="right">
                  {type === "pending" && (
                    <>
                      <Button
                        variant="text"
                        size="small"
                        sx={{
                          color: "#4CAF50",
                          mr: 1,
                          "&:hover": {
                            backgroundColor: "rgba(76, 175, 80, 0.04)",
                          },
                        }}
                        onClick={() => handleAssignRoleClick(user)}
                      >
                        Assign Role
                      </Button>
                      <Button
                        variant="text"
                        size="small"
                        sx={{
                          color: "#F44336",
                          "&:hover": {
                            backgroundColor: "rgba(244, 67, 54, 0.04)",
                          },
                        }}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {type === "rejected" && (
                    <Button
                      variant="text"
                      size="small"
                      sx={{
                        color: "#2196F3",
                        "&:hover": {
                          backgroundColor: "rgba(33, 150, 243, 0.04)",
                        },
                      }}
                    >
                      Re-evaluate
                    </Button>
                  )}
                  {type === "assigned" && (
                    <Button
                      variant="text"
                      size="small"
                      sx={{
                        color: "#F44336",
                        "&:hover": {
                          backgroundColor: "rgba(244, 67, 54, 0.04)",
                        },
                      }}
                    >
                      Revoke Role
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ py: 2 }}
                >
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
      <Box
        sx={{
          p: 3,
          backgroundColor: simpleAdminTheme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <img
            src="https://mui.com/static/images/avatar/1.jpg"
            alt="Logo"
            style={{ height: 40, marginRight: 10, borderRadius: "50%" }}
          />
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 600,
              color: simpleAdminTheme.palette.primary.main,
            }}
          >
            Super Admin
          </Typography>
        </Box>

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

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3, "& fieldset": { borderRadius: "8px" } }}
        />

        <Box sx={{ width: "100%", mb: 2 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="admin roles tabs"
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "flex-start",
              },
              "& .MuiTab-root": {
                minHeight: "48px",
                padding: "12px 24px",
                marginRight: "8px",
                borderRadius: "8px",
                backgroundColor: "#e0e0e0",
                color: simpleAdminTheme.palette.text.primary,
                "&.Mui-selected": {
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                  zIndex: 1,
                  color: simpleAdminTheme.palette.primary.main,
                },
                "&:hover": {
                  backgroundColor: "#d0d0d0",
                },
              },
            }}
          >
            <Tab label="Pending Roles" {...a11yProps(0)} />
            <Tab label="Rejected/Unassigned Roles" {...a11yProps(1)} />
            <Tab label="Assigned Roles" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={currentTab} index={0}>
          {renderUserTable(filterUsers(pendingUsers), "pending")}
        </CustomTabPanel>

        <CustomTabPanel value={currentTab} index={1}>
          {renderUserTable(filterUsers(rejectedUsers), "rejected")}
        </CustomTabPanel>

        <CustomTabPanel value={currentTab} index={2}>
          {renderUserTable(filterUsers(activeUsers), "assigned")}
        </CustomTabPanel>
      </Box>

      {/* AssignRole Component */}
      <AssignRole
        open={openAssignRoleModal}
        user={selectedUser}
        onClose={() => setOpenAssignRoleModal(false)}
        onRoleAssigned={handleRoleAssigned}
      />
    </ThemeProvider>
  );
}

export default AdminPanel;