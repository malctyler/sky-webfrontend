import React, { useState } from 'react';
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
  ListItemButton,
  Collapse,
  Toolbar,
  Typography,
  Button,
  useTheme as useMuiTheme,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  Home,
  People,
  Build,
  Category,
  Assignment,
  Person,
  PersonAdd,
  Settings,
  Brightness4,
  Brightness7,
  Cloud,
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import './MainLayout.css';

const drawerWidth = 280;

function MainLayout({ children }) {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (menuId) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    {
      id: 'home',
      text: 'Home',
      icon: <Home />,
      path: '/',
      requiredRoles: []
    },
    {
      id: 'customers',
      text: 'Customers',
      icon: <People />,
      path: '/customers',
      requiredRoles: ['Staff', 'Admin']
    },
    {
      id: 'plant',
      text: 'Plant Management',
      icon: <Build />,
      requiredRoles: ['Admin'],
      subItems: [
        {
          text: 'Plant Categories',
          path: '/plant-categories',
        },
        {
          text: 'Manage Plant',
          path: '/manage-plant',
        }
      ]
    },
    {
      id: 'holding',
      text: 'Plant Holding',
      icon: <Assignment />,
      path: '/plant-holding',
      requiredRoles: ['Customer']
    },
    {
      id: 'admin',
      text: 'Administration',
      icon: <Settings />,
      requiredRoles: ['Admin'],
      subItems: [
        {
          text: 'User Management',
          path: '/user-management',
        }
      ]
    }
  ];

  const drawer = (
    <div>
      <Toolbar 
        sx={{ 
          background: muiTheme.palette.primary.main,
          color: muiTheme.palette.primary.contrastText
        }}
      >
        <Typography variant="h6" noWrap component="div">
          Sky Technical Services
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => {
          // Check if user has required role for this menu item
          const hasRequiredRole = item.requiredRoles.length === 0 || 
            (user && item.requiredRoles.some(role => user.roles.includes(role)));

          if (!hasRequiredRole) return null;

          if (item.subItems) {
            return (
              <React.Fragment key={item.id}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleMenuClick(item.id)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                    {openMenus[item.id] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openMenus[item.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItemButton
                        key={subItem.path}
                        sx={{ pl: 4 }}
                        component={Link}
                        to={subItem.path}
                        selected={location.pathname === subItem.path}
                      >
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          }

          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={3}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: theme => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 70 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' },
              '&:hover': {
                background: theme => alpha(theme.palette.common.white, 0.1)
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            '& .MuiButton-root': {
              textTransform: 'none',
              px: 2,
              '&:hover': {
                background: theme => alpha(theme.palette.common.white, 0.1)
              }
            },
            '& .MuiIconButton-root': {
              '&:hover': {
                background: theme => alpha(theme.palette.common.white, 0.1)
              }
            }
          }}>
            <IconButton 
              component={Link} 
              to="/weather" 
              color="inherit"
              sx={{ 
                width: 40, 
                height: 40,
              }}
            >
              <Cloud />
            </IconButton>
            <IconButton 
              onClick={toggleTheme} 
              color="inherit"
              sx={{ 
                width: 40, 
                height: 40,
              }}
            >
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            {user ? (
              <>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Person sx={{ fontSize: 20 }} />
                  {user.email}
                </Typography>
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                  sx={{
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: 'rgba(255,255,255,0.2)',
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login"
                  sx={{
                    borderRadius: '20px',
                  }}
                >
                  Login
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/register"
                  sx={{
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: 'rgba(255,255,255,0.2)',
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
              background: theme => theme.palette.mode === 'dark' 
                ? 'linear-gradient(180deg, rgba(26,30,36,0.95) 0%, rgba(26,30,36,1) 100%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,1) 100%)',
              backdropFilter: 'blur(10px)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '70px',
          minHeight: 'calc(100vh - 70px)',
          background: theme => theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #282c34 0%, #1a1e24 100%)'
            : 'linear-gradient(180deg, #f8f9fa 0%, #f0f0f0 100%)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default MainLayout;