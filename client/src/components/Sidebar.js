import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  Collapse,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import FolderIcon from "@mui/icons-material/Folder";
import TaskIcon from "@mui/icons-material/Task";
import GroupsIcon from "@mui/icons-material/Groups";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Sidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [expandedProjects, setExpandedProjects] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleProjects = () => {
    setExpandedProjects(!expandedProjects);
  };

  // Example project names — you can replace with dynamic data
  const projectNames = ["Project Alpha", "Project Bravo", "Project Gamma"];

  return (
    <>
      {/* <IconButton
        onClick={toggleDrawer}
        sx={{ position: "fixed", top: 16, left: 16, zIndex: 1300 }}
      >
        <MenuIcon />
      </IconButton> */}

      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            width: drawerOpen ? 260 : 72,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        {/* Logo/Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent={drawerOpen ? "center" : "flex-start"}
          sx={{
            padding: 2,
            backgroundColor: "#1976d2",
            color: "#fff",
            cursor: "pointer",
            "&:hover": { opacity: 0.9 },
          }}
          onClick={toggleDrawer}
        >
          <img
            src="https://dummyimage.com/32x32/ffffff/1976d2.png&text=T"
            alt="Toggle sidebar"
            style={{ borderRadius: "50%" }}
          />
          {drawerOpen && (
            <Typography variant="h6" fontWeight="bold" sx={{ ml: 1 }}>
              Taskora
            </Typography>
          )}
        </Box>

        <Divider />

        {/* Sidebar List */}
        <List>
          {/* Dashboard */}
          <Tooltip title={!drawerOpen ? "Dashboard" : ""} placement="right">
            <ListItem button>
              <ListItemIcon>
                <StackedBarChartIcon />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Dashboard" />}
            </ListItem>
          </Tooltip>

          {/* Projects */}
          <Tooltip title={!drawerOpen ? "Projects" : ""} placement="right">
            <ListItem button onClick={toggleProjects}>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Projects" />}
              {drawerOpen &&
                (expandedProjects ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
          </Tooltip>

          <Collapse in={expandedProjects} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {projectNames.map((name) => (
                <ListItem button key={name} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <TaskIcon />
                  </ListItemIcon>
                  {drawerOpen && <ListItemText primary={name} />}
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* Members */}
          <Tooltip title={!drawerOpen ? "Members" : ""} placement="right">
            <ListItem button>
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Members" />}
            </ListItem>
          </Tooltip>

          {/* Admin */}
          <Tooltip title={!drawerOpen ? "Admin" : ""} placement="right">
            <ListItem button>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Admin" />}
            </ListItem>
          </Tooltip>

          {/* Profile */}
          <Tooltip title={!drawerOpen ? "Profile" : ""} placement="right">
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Profile" />}
            </ListItem>
          </Tooltip>

          {/* Logout */}
          <Tooltip title={!drawerOpen ? "Logout" : ""} placement="right">
            <ListItem button>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Logout" />}
            </ListItem>
          </Tooltip>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
