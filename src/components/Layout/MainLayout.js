import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import CloudIcon from '@mui/icons-material/Cloud'; // For weather icon
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; // Icon for User Management
import { useAuth } from '../../contexts/AuthContext';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';

const openedDrawerWidth = 240;
const closedDrawerWidth = 60; // Adjusted for icon-only view

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const navigate = useNavigate();
  const muiTheme = useTheme(); // This now gets the full theme from MuiThemeProvider in ThemeContext
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(!isMobile); // Keep drawer open by default on desktop

  const currentDrawerWidth = isMobile ? openedDrawerWidth : (isDrawerOpen ? openedDrawerWidth : closedDrawerWidth);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setIsDrawerOpen(!isDrawerOpen);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
    await logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
    { text: 'Plant Categories', icon: <CategoryIcon />, path: '/plant-categories', adminOnly: true },
    { text: 'User Management', icon: <ManageAccountsIcon />, path: '/user-management', adminOnly: true }, // Added User Management
  ];

  const drawerContent = (
    <div>
      <Toolbar sx={{
        justifyContent: 'flex-end',
        // Conditionally apply paddingRight only when the drawer is open or on mobile
        paddingRight: (isDrawerOpen || isMobile) ? muiTheme.spacing(2) : '0px',
        minHeight: '64px' // Ensure toolbar matches AppBar height
      }}>
        <IconButton onClick={handleDrawerToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <List sx={{ pt: 0 }}> {/* Remove default top padding from List */}
        {menuItems.map((item) => (
          (!item.adminOnly || (user?.roles && user.roles.includes('Admin'))) && (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                if (isMobile) {
                  setMobileOpen(false); // Close mobile drawer on item click
                }
              }}
              sx={{ 
                pl: isMobile || isDrawerOpen ? 2.5 : (closedDrawerWidth - muiTheme.spacing(7)) / 2 + 1, // Center icon when closed
                pr: isMobile || isDrawerOpen ? 2.5 : 0,
                justifyContent: isMobile || isDrawerOpen ? 'initial' : 'center',
                mb: 1, // Add some margin between items
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 0, 
                mr: isMobile || isDrawerOpen ? 3 : 'auto', 
                justifyContent: 'center',
                color: muiTheme.palette.text.secondary, // Use theme color for icons
              }}>{item.icon}</ListItemIcon>
              {(isMobile || isDrawerOpen) && <ListItemText primary={item.text} sx={{ color: muiTheme.palette.text.primary }} />}
            </ListItem>
          )
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}> {/* Ensure layout takes full height */}
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
          ml: { sm: `${currentDrawerWidth}px` },
          transition: muiTheme.transitions.create(['margin', 'width'], {
            easing: muiTheme.transitions.easing.sharp,
            duration: muiTheme.transitions.duration.enteringScreen, // Use entering for smoother open
          }),
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { xs: 'block', sm: (isDrawerOpen && !isMobile) ? 'none' : 'block' } 
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Sky Application
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" onClick={() => navigate('/weather')}>
              <CloudIcon />
            </IconButton>
            <IconButton color="inherit" onClick={toggleTheme}>
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Tooltip title="Account settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: muiTheme.palette.secondary.main }}>
                  {user?.email ? user.email[0].toUpperCase() : <AccountCircleIcon />}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: currentDrawerWidth }, flexShrink: { sm: 0 },
              transition: muiTheme.transitions.create('width', {
                easing: muiTheme.transitions.easing.sharp,
                duration: muiTheme.transitions.duration.enteringScreen,
              }),
        }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)} // Simplified close for mobile
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: openedDrawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: currentDrawerWidth,
              overflowX: 'hidden',
              transition: muiTheme.transitions.create('width', {
                easing: muiTheme.transitions.easing.sharp,
                duration: muiTheme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open // In permanent variant, 'open' prop controls visibility but not overlay behavior
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${currentDrawerWidth}px)` }, // Ensure this updates
          mt: '64px',
          transition: muiTheme.transitions.create(['margin', 'width'], {
            easing: muiTheme.transitions.easing.sharp,
            duration: muiTheme.transitions.duration.leavingScreen,
          }),
          overflow: 'auto', 
          padding: muiTheme.spacing(3), // Re-add padding here for consistent spacing
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;