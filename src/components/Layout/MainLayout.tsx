import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  useMediaQuery,
  Tooltip,
  Menu,
  MenuItem,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useTheme as useMuiTheme, styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CloudIcon from '@mui/icons-material/Cloud';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeColorOption } from '../../contexts/ThemeContext';
import { MenuItem as MenuItemType } from '../../types/layoutTypes';
import styles from './MainLayout.module.css';

interface AuthUser {
  email: string;
  token: string;
  isCustomer: boolean;
  customerId?: string | number;
  roles: string[];
  emailConfirmed: boolean;
}

// Drawer width constant
const drawerWidth = 240;

interface LayoutProps {
  // No props needed since using Outlet for children
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// Update getMenuItems function to better organize menu items
const getMenuItems = (user: AuthUser | null, hasRole: (role: string) => boolean): MenuItemType[] => {
  const baseItems: MenuItemType[] = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/home' }
  ];

  if (user?.isCustomer) {
    baseItems.push(
      { text: 'My Plant Holdings', icon: <CategoryIcon />, path: '/plant-holding' }
    );
  }

  if (user && !user.isCustomer) {
    if (hasRole('Staff') || hasRole('Admin')) {
      baseItems.push(
        { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
        { text: 'Weather', icon: <CloudIcon />, path: '/weather' }
      );
    }
    
    if (hasRole('Admin')) {
      baseItems.push(
        { text: 'Plant Categories', icon: <CategoryIcon />, path: '/plant-categories' },
        { text: 'Manage Plant', icon: <CategoryIcon />, path: '/manage-plant' },
        { text: 'User Management', icon: <ManageAccountsIcon />, path: '/user-management' }
      );
    }
  }

  return baseItems;
};

const MainLayout: React.FC<LayoutProps> = () => {
  const { user, loading, logout, hasRole } = useAuth();
  const { isDarkMode, toggleTheme, changeThemeColor, currentThemeColor } = useTheme();
  const muiTheme = useMuiTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [colorMenuAnchorEl, setColorMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [showThemeDemo, setShowThemeDemo] = useState(false);
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = useCallback(() => {
    handleUserMenuClose();
    logout();
    navigate('/login');
  }, [logout, navigate]);

  const handleColorMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setColorMenuAnchorEl(event.currentTarget);
  };

  const handleColorMenuClose = () => {
    setColorMenuAnchorEl(null);
  };

  const handleThemeColorChange = (color: ThemeColorOption) => {
    changeThemeColor(color);
    handleColorMenuClose();
  };

  const toggleThemeDemo = () => {
    setShowThemeDemo(prev => !prev);
    handleColorMenuClose();
  };

  // If loading, show loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'var(--background-default)',
          gap: 2
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" color="textSecondary">
          Loading application...
        </Typography>
      </Box>
    );
  }

  // If no user, show nothing while redirecting
  if (!user) {
    return null;
  }

  const menuItems = getMenuItems(user, hasRole);

  // Get the first letter of the email for the avatar
  const avatarLetter = user?.email?.[0]?.toUpperCase() || 'U';
  const displayName = user?.email || 'User';
  return (
    <Box sx={{ display: 'flex', overflow: 'hidden' }}>
      <CssBaseline />
      <AppBar        
        position="fixed" 
        className={styles.appBar} 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          ml: { sm: `${open ? drawerWidth : 0}px` }
        }}
      >
        <Toolbar className={styles.toolbar}>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ 
              mr: 2,
              display: { sm: 'none' }
            }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Sky Application
          </Typography>
          <Tooltip title="Change theme colors">
            <IconButton 
              color="inherit" 
              onClick={handleColorMenuOpen}
              sx={{ mr: 1 }}
            >
              <ColorLensIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={colorMenuAnchorEl}
            open={Boolean(colorMenuAnchorEl)}
            onClose={handleColorMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem 
              selected={currentThemeColor === 'blue'} 
              onClick={() => handleThemeColorChange('blue')}
            >
              <Box sx={{ width: 20, height: 20, backgroundColor: '#0066cc', borderRadius: '50%', mr: 1 }} />
              Blue
            </MenuItem>
            <MenuItem 
              selected={currentThemeColor === 'orange'} 
              onClick={() => handleThemeColorChange('orange')}
            >
              <Box sx={{ width: 20, height: 20, backgroundColor: '#f57c00', borderRadius: '50%', mr: 1 }} />
              Orange
            </MenuItem>
            <MenuItem 
              selected={currentThemeColor === 'teal'} 
              onClick={() => handleThemeColorChange('teal')}
            >
              <Box sx={{ width: 20, height: 20, backgroundColor: '#00897b', borderRadius: '50%', mr: 1 }} />
              Teal
            </MenuItem>
            <MenuItem 
              selected={currentThemeColor === 'indigo'} 
              onClick={() => handleThemeColorChange('indigo')}
            >
              <Box sx={{ width: 20, height: 20, backgroundColor: '#3f51b5', borderRadius: '50%', mr: 1 }} />
              Indigo
            </MenuItem>
            <Divider />
            <MenuItem onClick={toggleThemeDemo}>
              <ColorLensIcon sx={{ mr: 1 }} />
              View Theme Demo
            </MenuItem>
          </Menu>
          <IconButton 
            color="inherit" 
            onClick={toggleTheme}
            sx={{ mr: 1 }}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleUserMenuOpen}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {avatarLetter}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
            onClick={handleUserMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleUserMenuClose}>
              <Avatar /> {displayName}
            </MenuItem>
            <Divider />
            <MenuItem onClick={toggleTheme}>
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              <ListItemText primary={isDarkMode ? 'Light Mode' : 'Dark Mode'} sx={{ ml: 2 }} />
            </MenuItem>
            <MenuItem onClick={handleColorMenuOpen}>
              <ColorLensIcon />
              <ListItemText primary="Change Theme Color" sx={{ ml: 2 }} />
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>      
      
      {/* Theme Demo Dialog */}
      <Dialog 
        open={showThemeDemo} 
        onClose={toggleThemeDemo} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>Theme Color Demo</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Current Theme: {currentThemeColor.charAt(0).toUpperCase() + currentThemeColor.slice(1)} ({isDarkMode ? 'Dark' : 'Light'} Mode)
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              This demo shows how different UI elements look with the current theme color.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Buttons</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <Button variant="contained">Primary Button</Button>
              <Button variant="outlined">Outlined Button</Button>
              <Button variant="text">Text Button</Button>
              <Button variant="contained" color="secondary">Secondary</Button>
              <Button variant="contained" color="error">Error</Button>
              <Button variant="contained" color="warning">Warning</Button>
              <Button variant="contained" color="info">Info</Button>
              <Button variant="contained" color="success">Success</Button>
            </Box>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Typography</Typography>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
            <Typography variant="subtitle1">Subtitle 1</Typography>
            <Typography variant="subtitle2">Subtitle 2</Typography>
            <Typography variant="body1">Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            <Typography variant="body2">Body 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Cards & Surfaces</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, width: 200 }}>
                <Typography variant="h6">Card Title</Typography>
                <Typography variant="body2">Card content with the current theme colors.</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText', width: 200, borderRadius: 1 }}>
                <Typography variant="h6">Primary Card</Typography>
                <Typography variant="body2">Primary background</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'secondary.main', color: 'secondary.contrastText', width: 200, borderRadius: 1 }}>
                <Typography variant="h6">Secondary Card</Typography>
                <Typography variant="body2">Secondary background</Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleThemeDemo}>Close</Button>
          <Button onClick={() => changeThemeColor('blue')} variant={currentThemeColor === 'blue' ? 'contained' : 'outlined'}>
            Blue Theme
          </Button>
          <Button onClick={() => changeThemeColor('orange')} variant={currentThemeColor === 'orange' ? 'contained' : 'outlined'}>
            Orange Theme
          </Button>
          <Button onClick={() => changeThemeColor('teal')} variant={currentThemeColor === 'teal' ? 'contained' : 'outlined'}>
            Teal Theme
          </Button>
          <Button onClick={() => changeThemeColor('indigo')} variant={currentThemeColor === 'indigo' ? 'contained' : 'outlined'}>
            Indigo Theme
          </Button>
        </DialogActions>
      </Dialog>
      
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        classes={{
          paper: styles.drawerPaper
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            position: 'fixed',
            transition: (theme) =>
              theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          },
        }}
      >
        <DrawerHeader className={styles.sidebarHeader}>
          {isMobile && (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) {
                  handleDrawerClose();
                }
              }}
            >
              <ListItemButton className={styles.listItemButton}>
                <ListItemIcon className={styles.listItemIcon}>{item.icon}</ListItemIcon>
                <ListItemText className={styles.listItemText} primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>      </Drawer>      <Box        component="main"
        className={styles.mainContent}
        sx={{
          flexGrow: 1,
          width: '100%',
          padding: '24px',
          overflow: 'auto',
          position: 'relative',
          marginTop: '64px', // Add margin to account for AppBar height
          transition: (theme) =>
            theme.transitions.create(['width', 'margin-left'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            })
        }}
      >        <Box sx={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
