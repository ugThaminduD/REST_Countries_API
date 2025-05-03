import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Tab, Tabs } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { login, logout } from '../../utils/session';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ open, onClose }) => {
    const [tab, setTab] = useState(0); // 0 for Login, 1 for Signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
        setError('');
        setEmail('');
        setPassword('');
        setUsername('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/login`, { email, password });

            const token = response.data.token;
            const userId = response.data.userId;

             // Decode the token and check expiration
            const decoded = jwtDecode(token);
            const isExpired = decoded.exp * 1000 < Date.now();
            console.log('Token expired:', isExpired);
            if (isExpired) {
                logout();
                setError('Session expired. Please log in again.');
                alert('Session expired. Please log in again.');
                navigate('/');
                return;
            }

            login({ token, userId });
            console.log('Login successful:', token);

            onClose(); // Close the modal
            navigate('/'); // Redirect to profile page
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/register`, { username, email, password });
            setTab(0); // Switch to login tab after successful signup
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Tabs value={tab} onChange={handleTabChange} centered>
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
                </Tabs>

                {tab === 0 && (
                    <form onSubmit={handleLogin}>
                        <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                            Login
                        </Typography>
                        {error && <Typography color="error">{error}</Typography>}
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Login
                        </Button>
                    </form>
                )}

                {tab === 1 && (
                    <form onSubmit={handleSignup}>
                        <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                            Sign Up
                        </Typography>
                        {error && <Typography color="error">{error}</Typography>}
                        <TextField
                            label="Username"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Sign Up
                        </Button>
                    </form>
                )}
            </Box>
        </Modal>
    );
};

export default AuthModal;