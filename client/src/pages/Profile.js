import React, { useState } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Avatar,
    Button,
    TextField,
    Box,
    Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PaletteIcon from '@mui/icons-material/Palette'; // Example icon for Theme Settings

const Profile = () => {
    // Placeholder user data - in a real app, this would come from an API or context
    const [user, setUser] = useState({
        fullName: 'Jane Doe',
        jobTitle: 'Senior Project Manager',
        email: 'jane.doe@example.com',
        phone: '+1 (555) 123-4567',
        linkedin: 'https://www.linkedin.com/in/janedoe',
        bio: 'Experienced project manager with a passion for leading cross-functional teams and delivering successful projects on time and within budget. Proficient in Agile and Scrum methodologies.',
        department: 'Product Development',
        activeProjects: 7,
        completedProjects: 25,
        skills: ['Agile', 'Scrum', 'Risk Management', 'Figma', 'Jira', 'Stakeholder Management'],
        profilePicture: 'https://via.placeholder.com/150/1976d2/FFFFFF?text=JD', // Placeholder image with MUI primary color
        recentActivity: [
            'Updated "Marketing Campaign Launch" project status to "In Progress".',
            'Commented on "Website Redesign" task: "Reviewed wireframes, looks good!"',
            'Completed "Sprint Planning for Q3" meeting.',
        ],
    });

    const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveProfile = () => {
        // In a real application, you would send updated user data to your backend API here
        console.log("Saving profile changes:", user);
        setIsEditing(false); // Exit edit mode after saving
        alert("Profile updated successfully!"); // Simple feedback
    };

    // You would typically have input change handlers here if you allowed editing
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                <Grid container spacing={4} alignItems="center">
                    {/* Profile Picture */}
                    <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar
                            alt={user.fullName}
                            src={user.profilePicture}
                            sx={{ width: 150, height: 150, border: '4px solid', borderColor: 'primary.main', boxShadow: 3 }}
                        >
                            {!user.profilePicture && <AccountCircleIcon sx={{ fontSize: 100 }} />}
                        </Avatar>
                    </Grid>

                    {/* User Details and Edit Buttons */}
                    <Grid item xs={12} md={9}>
                        <Box sx={{ mb: 2 }}>
                            {isEditing ? (
                                <>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="fullName"
                                        value={user.fullName}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Job Title"
                                        name="jobTitle"
                                        value={user.jobTitle}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </>
                            ) : (
                                <>
                                    <Typography variant="h3" component="h1" gutterBottom>
                                        {user.fullName}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" gutterBottom>
                                        {user.jobTitle}
                                    </Typography>
                                </>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            <Button
                                variant="contained"
                                color={isEditing ? 'error' : 'primary'}
                                onClick={handleEditToggle}
                                startIcon={<SettingsIcon />}
                            >
                                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                            </Button>
                            {isEditing && (
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleSaveProfile}
                                    startIcon={<CheckCircleOutlineIcon />}
                                >
                                    Save Profile
                                </Button>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* Profile Content Grid */}
            <Grid container spacing={4}>
                {/* Contact Information */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.main', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                            Contact Information
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemIcon><EmailIcon color="action" /></ListItemIcon>
                                {isEditing ? (
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleInputChange}
                                        variant="standard"
                                    />
                                ) : (
                                    <ListItemText primary={`Email: ${user.email}`} />
                                )}
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><PhoneIcon color="action" /></ListItemIcon>
                                {isEditing ? (
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        name="phone"
                                        value={user.phone}
                                        onChange={handleInputChange}
                                        variant="standard"
                                    />
                                ) : (
                                    <ListItemText primary={`Phone: ${user.phone}`} />
                                )}
                            </ListItem>
                            {user.linkedin && (
                                <ListItem>
                                    <ListItemIcon><LinkedInIcon color="action" /></ListItemIcon>
                                    {isEditing ? (
                                        <TextField
                                            fullWidth
                                            label="LinkedIn"
                                            name="linkedin"
                                            value={user.linkedin}
                                            onChange={handleInputChange}
                                            variant="standard"
                                        />
                                    ) : (
                                        <ListItemText
                                            primary={`LinkedIn:`}
                                            secondary={
                                                <a href={user.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                    {user.linkedin}
                                                </a>
                                            }
                                        />
                                    )}
                                </ListItem>
                            )}
                        </List>
                    </Paper>
                </Grid>

                {/* About Me */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'secondary.main', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                            About Me
                        </Typography>
                        {isEditing ? (
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                label="Biography"
                                name="bio"
                                value={user.bio}
                                onChange={handleInputChange}
                                variant="outlined"
                            />
                        ) : (
                            <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.6 }}>
                                {user.bio}
                            </Typography>
                        )}
                    </Paper>
                </Grid>

                {/* Professional Information */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'success.main', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                            Professional Information
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemIcon><BusinessIcon color="action" /></ListItemIcon>
                                {isEditing ? (
                                    <TextField
                                        fullWidth
                                        label="Department"
                                        name="department"
                                        value={user.department}
                                        onChange={handleInputChange}
                                        variant="standard"
                                    />
                                ) : (
                                    <ListItemText primary={`Department: ${user.department}`} />
                                )}
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><WorkIcon color="action" /></ListItemIcon>
                                <ListItemText primary={`Active Projects: ${user.activeProjects}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><CheckCircleOutlineIcon color="action" /></ListItemIcon>
                                <ListItemText primary={`Completed Projects: ${user.completedProjects}`} />
                            </ListItem>
                            <ListItem sx={{ alignItems: 'flex-start' }}>
                                <ListItemIcon><SettingsIcon color="action" /></ListItemIcon> {/* Using settings icon for skills */}
                                <ListItemText
                                    primary="Skills:"
                                    secondary={
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                            {isEditing ? (
                                                <TextField
                                                    fullWidth
                                                    label="Skills (comma-separated)"
                                                    name="skills"
                                                    value={user.skills.join(', ')}
                                                    onChange={handleInputChange}
                                                    variant="standard"
                                                    helperText="Separate skills with commas"
                                                />
                                            ) : (
                                                user.skills.map((skill, index) => (
                                                    <Chip key={index} label={skill} color="primary" variant="outlined" size="small" />
                                                ))
                                            )}
                                        </Box>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

                {/* Recent Activity */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'warning.main', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                            Recent Activity
                        </Typography>
                        <List>
                            {user.recentActivity.map((activity, index) => (
                                <ListItem key={index} disablePadding sx={{ mb: 1, '&:last-child': { mb: 0 } }}>
                                    <Paper elevation={1} sx={{ p: 1.5, width: '100%', display: 'flex', alignItems: 'center', bgcolor: 'background.default' }}>
                                        <ListItemIcon sx={{ minWidth: 35 }}><EventNoteIcon fontSize="small" color="action" /></ListItemIcon>
                                        <ListItemText primary={<Typography variant="body2" color="text.secondary">{activity}</Typography>} />
                                    </Paper>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Account Settings */}
                <Grid item xs={12}>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'error.main', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                            Account Settings
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <Button variant="outlined" color="error" startIcon={<SettingsIcon />}>
                                Change Password
                            </Button>
                            <Button variant="outlined" color="error" startIcon={<EmailIcon />}>
                                Email Preferences
                            </Button>
                            <Button variant="outlined" color="error" startIcon={<PaletteIcon />}> {/* Assuming PaletteIcon for Theme */}
                                Theme Settings
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;

// Don't forget to import icons you use!