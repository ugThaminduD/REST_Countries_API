import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getSession, logout } from '../../utils/session';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, IconButton, Button, Menu, MenuItem, Tooltip, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PublicIcon from '@mui/icons-material/Public';
import FlagIcon from '@mui/icons-material/Flag';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import AuthModal from '../auth/AuthModal';


const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const session = getSession();

    useEffect(() => {
        const fetchUser = async () => {
            if (session) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/profile`, {
                        headers: { Authorization: `Bearer ${session.token}` },
                    });
                    setUser(response.data);
                } catch (err) {
                    console.error('Error fetching user:', err);
                }
            }
        };
        fetchUser();
    }, [session]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };


    return (
        <AppBar 
            className='App-header'
            position='sticky'
            sx={{
                // background: 'linear-gradient(135deg, rgb(175, 211, 253), rgb(204, 213, 220))',
                background: 'linear-gradient(135deg, #4A90E2, #6EC6FF)', /* Blue to teal gradient */
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                borderBottom: '2px solid #ddd',
                // padding: '10px 20px',
                padding: '0', 
                width: '100%',
                marginBottom: '10px',
                color: '#FFFFFF', /* Text color */
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                
                {/* Logo and Title for smaller screens */}
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    
                    <IconButton
                        size="large"
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="black"
                    >
                        <MenuIcon />
                        <PublicIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography textAlign="center">Country Explorer</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/flags" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography textAlign="center">Flags</Typography>
                            </Link>
                        </MenuItem>
                        {/* <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/favorites" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography textAlign="center">Favorites</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography textAlign="center">Profile</Typography>
                            </Link>
                        </MenuItem> */}
                    </Menu>
                </Box>

                {/* Logo and Title for larger screens */}
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <PublicIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
                        <Typography 
                            variant="h5"
                            noWrap
                            // component="a"
                            sx={{
                              mr: 2,
                              display: { xs: 'none', md: 'flex' },
                              fontFamily: 'monospace',
                              fontWeight: 700,
                              letterSpacing: '.2rem',
                              color: 'inherit',
                              textDecoration: 'none',
                            }}
                        >
                            Country Explorer
                        </Typography>
                    </Link>
                    <OutlinedFlagIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Link to="/flags" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
                        <Typography 
                            variant="h5"
                            noWrap
                            // component="a"
                            sx={{
                              mr: 2,
                              display: { xs: 'none', md: 'flex' },
                              fontFamily: 'monospace',
                              fontWeight: 700,
                              letterSpacing: '.2rem',
                              color: 'inherit',
                              textDecoration: 'none',
                            }}
                        >
                            Flags
                        </Typography>
                    </Link>
                    {/* <Link to="/favorites" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
                        <Typography variant="h6" sx={{ fontWeight: '600', color: 'text.secondary' }}>
                            Favorites
                        </Typography>
                    </Link> */}
                    {/* <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h6" sx={{ fontWeight: '600', color: 'text.secondary' }}>
                            Profile
                        </Typography>
                    </Link> */}
                </Box>

                {/* Profile Icon */}
                {session ? (
                    <Tooltip title="Profile">
                        <IconButton
                            size="large"
                            aria-label="user profile"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => navigate("/profile")}
                            color="inherit"
                        >
                            <Avatar 
                                sx={{ 
                                    bgcolor: '#000000', fontSize: 30, fontWeight: 'bold', 
                                    fontFamily: 'monospace', textAlign: 'center', 
                                }}
                            >
                                {user?.username ? user.username.charAt(0).toUpperCase() : ''}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Button color="inherit" onClick={() => setAuthModalOpen(true)}>
                        Login
                    </Button>
                )}
            </Toolbar>

            {/* Auth Modal */}
            <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />

        </AppBar>
    );
};

export default Header;