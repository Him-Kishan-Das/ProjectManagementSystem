import React, { useState } from "react";
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
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";


const projectsData = [
  {
    id: "proj1",
    name: "Website Redesign",
    description:
      "Complete overhaul of the company website to improve user experience and modern aesthetics. This project aims to enhance user engagement and streamline navigation across all devices. We are focusing on a clean, minimalist design with intuitive functionalities to ensure a seamless browsing experience for our customers.", // Example of a longer description
    status: "In Progress",
    members: [
      {
        id: "m1",
        name: "Rohan",
        avatar: "https://placehold.co/30x30/FFA07A/FFFFFF?text=R",
      },
      {
        id: "m2",
        name: "Soniya",
        avatar: "https://placehold.co/30x30/90EE90/FFFFFF?text=S",
      },
      {
        id: "m3",
        name: "Kishan",
        avatar: "https://placehold.co/30x30/ADD8E6/FFFFFF?text=K",
      },
    ],
    lead: { id: "l1", name: "Anjali Sharma" },
    createdAt: "2023-01-15",
  },
  {
    id: "proj2",
    name: "Mobile App Development",
    description:
      "Development of a new iOS and Android application for customer engagement. This project involves multiple phases, from initial design to final deployment and post-launch support, focusing on performance and a rich feature set.", // Longer description
    status: "In Progress",
    members: [
      {
        id: "m4",
        name: "Priya",
        avatar: "https://placehold.co/30x30/FFD700/FFFFFF?text=P",
      },
      {
        id: "m5",
        name: "Amit",
        avatar: "https://placehold.co/30x30/FF6347/FFFFFF?text=A",
      },
      {
        id: "m6",
        name: "Deepak",
        avatar: "https://placehold.co/30x30/DA70D6/FFFFFF?text=D",
      },
    ],
    lead: { id: "l2", name: "Rajesh Kumar" },
    createdAt: "2022-11-01",
  },
  {
    id: "proj3",
    name: "Database Migration",
    description:
      "Migrating legacy database to a new cloud-based solution for better scalability and performance. This is a critical infrastructure project requiring careful planning and execution to minimize downtime and ensure data integrity.", // Longer description
    status: "Completed",
    members: [
      {
        id: "m7",
        name: "Sneha",
        avatar: "https://placehold.co/30x30/20B2AA/FFFFFF?text=S",
      },
      {
        id: "m8",
        name: "Vivek",
        avatar: "https://placehold.co/30x30/FF4500/FFFFFF?text=V",
      },
    ],
    lead: { id: "l3", name: "Pooja Singh" },
    createdAt: "2022-07-20",
  },
  {
    id: "proj4",
    name: "Marketing Campaign Launch",
    description:
      "Planning and execution of a new digital marketing campaign for product launch, targeting key demographics across various online platforms to maximize reach and conversion rates.", // Longer description
    status: "In Progress",
    members: [
      {
        id: "m9",
        name: "Neha",
        avatar: "https://placehold.co/30x30/8A2BE2/FFFFFF?text=N",
      },
      {
        id: "m10",
        name: "Rahul",
        avatar: "https://placehold.co/30x30/A52A2A/FFFFFF?text=R",
      },
    ],
    lead: { id: "l4", name: "Surbhi Gupta" },
    createdAt: "2023-03-10",
  },
  {
    id: "proj5",
    name: "Internal Tool Development",
    description:
      "Building a custom internal tool to streamline HR processes, including employee onboarding, leave management, and performance reviews, enhancing operational efficiency.", // Longer description
    status: "Completed",
    members: [
      {
        id: "m1",
        name: "Rohan",
        avatar: "https://placehold.co/30x30/FFA07A/FFFFFF?text=R",
      },
      {
        id: "m7",
        name: "Sneha",
        avatar: "https://placehold.co/30x30/20B2AA/FFFFFF?text=S",
      },
    ],
    lead: { id: "l5", name: "Gaurav Jain" },
    createdAt: "2022-05-01",
  },
];


const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Projects = () => {
  const [selectedTab, setSelectedTab] = useState(0); // 0: All, 1: In Progress, 2: Completed

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

 
  const filteredProjects = projectsData.filter((project) => {
    if (selectedTab === 0) {
      
      return true;
    } else if (selectedTab === 1) {
      
      return project.status === "In Progress";
    } else if (selectedTab === 2) {
      
      return project.status === "Completed";
    }
    return false;
  });

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

      
      <Grid container spacing={4} alignItems="stretch">
    
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} md={6} key={project.id} sx={{ pb: 4 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  border: "1px solid #ddd",
                  marginBottom: 2, 
                }}
              >
                
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <WorkIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
                    {project.name}
                  </Typography>
                  <Chip
                    label={project.status}
                    color={
                      project.status === "In Progress" ? "info" : "success"
                    }
                    size="small"
                  />
                </Box>
                
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    flexGrow: 1,
                    maxHeight: "80px", // Adjusted maxHeight to give a more consistent appearance. You can fine-tune this value.
                    overflowY: "auto", // Add vertical scrollbar if content exceeds maxHeight
                    // minHeight removed as it's handled by flexGrow and parent height
                  }}
                >
                  {project.description}
                </Typography>

                {/* Details List (flex-shrink: 0 ensures it doesn't shrink) */}
                <List dense sx={{ p: 0, mb: 1, flexShrink: 0 }}>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <GroupIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Members: ${project.members.length}`}
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={`Lead: ${project.lead.name}`} />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <CalendarTodayIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Created: ${formatDate(project.createdAt)}`}
                    />
                  </ListItem>
                </List>

                {/* Team Avatars (flex-shrink: 0 ensures it doesn't shrink) */}
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mr: 1 }}
                  >
                    Team:
                  </Typography>
                  {project.members.map((member) => (
                    <Avatar
                      key={member.id}
                      alt={member.name}
                      src={member.avatar}
                      sx={{ width: 24, height: 24, fontSize: "0.75rem" }}
                      title={member.name}
                    />
                  ))}
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
