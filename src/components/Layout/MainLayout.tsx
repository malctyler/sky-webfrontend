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
  MenuItem
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
import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
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
  children: React.ReactNode;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const getMenuItems = (user: AuthUser | null, hasRole: (role: string) => boolean): MenuItemType[] => {
  const baseItems: MenuItemType[] = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
    { text: 'Weather', icon: <CloudIcon />, path: '/weather' }
  ];

  if (user?.isCustomer) {
    baseItems.push(
      { text: 'My Plant Holdings', icon: <CategoryIcon />, path: '/plant-holding' }
    );
  }

  if (user && !user.isCustomer) {
    baseItems.push(
      { text: 'Plant Categories', icon: <CategoryIcon />, path: '/plant-categories' },
      { text: 'Manage Plant', icon: <CategoryIcon />, path: '/manage-plant' },
      { text: 'Customers', icon: <PeopleIcon />, path: '/customers' }
    );
  }

  if (hasRole('Staff')) {
    baseItems.push(
      { text: 'User Management', icon: <ManageAccountsIcon />, path: '/user-management' }
    );
  }

  return baseItems;
};

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, hasRole } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

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

  const menuItems = getMenuItems(user, hasRole);

  // Get the first letter of the email for the avatar
  const avatarLetter = user?.email?.[0]?.toUpperCase() || 'U';
  const displayName = user?.email || 'User';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />      <AppBar position="fixed" className={styles.appBar} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar className={styles.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Sky Application
          </Typography>
          {user && !user.isCustomer && (
            <IconButton 
              color="inherit" 
              onClick={() => navigate('/weather')}
              sx={{ mr: 1 }}
            >
              <CloudIcon />
            </IconButton>
          )}
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
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>      <Drawer
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
          },
        }}
      >
        <DrawerHeader className={styles.sidebarHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemButton className={styles.listItemButton}>
                <ListItemIcon className={styles.listItemIcon}>{item.icon}</ListItemIcon>
                <ListItemText className={styles.listItemText} primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>      <Box
        component="main"
        className={styles.mainContent}
        sx={{
          flexGrow: 1,
          width: '100%',
          padding: '24px',
          overflow: 'auto',
          position: 'relative',
          marginTop: '64px', // Add margin to account for AppBar height
          transition: (theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            })
        }}
      >
        <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
