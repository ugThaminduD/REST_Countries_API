import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getSession, logout } from '../../utils/session';
import { fetchCountryByName } from '../../services/api';
import CountryCard from '../common/CountryCard'; 
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, Avatar, Grid, TextField } from '@mui/material';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    // Fetch user profile when the component mounts
    useEffect(() => {
        const fetchProfile = async () => {
            const session = getSession();
            if (!session) {
                navigate('/'); 
                alert('Please log in to add favorites.');
                return;
            }
            try {
                console.log('Token:', session.token);
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/profile`, {
                    headers: { Authorization: `Bearer ${session.token}` },
                });
                setUser(response.data);
                console.log('Authorization Header:', `Bearer ${session.token}`);

            } catch (err) {
                console.error('Error fetching profile:', err);
                logout();
                navigate('/');
            }
        };
        fetchProfile();
    }, [navigate]);

    // Fetch favorite countries when the component mounts
    useEffect(() => {
        const fetchFavorites = async () => {
            const session = getSession();
            if (!session) {
                navigate('/'); 
                alert('Please log in to add favorites.');
                return;
            }
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/favorites/${session.userId}`, {
                    headers: { Authorization: `Bearer ${session.token}` },
                });
                const favoriteCountryNames = response.data.countryName;

                // Fetch details for each favorite country
                const favoriteDetails = await Promise.all(
                    favoriteCountryNames.map(async (countryName) => {
                        try {
                            const countryData = await fetchCountryByName(countryName);
                            return countryData[0]; // REST Countries API returns an array
                        } catch (error) {
                            console.error(`Error fetching details for ${countryName}:`, error);
                            return null; // Skip if there's an error
                        }
                    })
                );

                // Filter out any null values (in case of errors)
                setFavorites(favoriteDetails.filter((country) => country !== null));
            } catch (err) {
                console.error('Error fetching favorites:', err);
            }
        };
        fetchFavorites();
    }, [navigate]);


    
    const handleCountryClick = (country) => {
        navigate(`/country/${country.name.common}`);
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" color="text.secondary">
                    Loading user data...
                </Typography>
            </Box>
        ); 
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, padding: 4, gap: 4 }}>
            {/* Profile Section */}
            <Card sx={{ width: '40%', padding: 4, boxShadow: 3 }}>
                <Avatar
                    alt={user.username}
                    src="/static/images/avatar/1.jpg"
                    sx={{ 
                        width: 100, height: 100, margin: '0 auto 16px', bgcolor: '#000000', 
                        fontFamily: 'monospace', fontSize: 75, fontWeight: 'bold',
                        textAlign: 'center'
                     }}
                >
                    {user?.username ? user.username.charAt(0).toUpperCase() : ''}
                </Avatar>
                <CardContent>
                    <Typography variant="h5" gutterBottom fontSize={30} fontFamily= "monospace" fontWeight="bold" color="black" sx={{ textAlign: 'center' }}>
                        {user.username}
                    </Typography>
                    <TextField
                        label="Username"
                        value={user.username}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="Email"
                        value={user.email}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="Password"
                        value="********"
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                    <Typography variant="body2" color="text.secondary" gutterBottom mt={2}>
                        Member since: {new Date(user.createdAt).toLocaleDateString()}
                    </Typography>
                    <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 2 }}>
                        Logout
                    </Button>
                </CardContent>
            </Card>

            {/* Favorite Countries Section */}
            <Box sx={{ width: '55%', padding: 4, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom fontSize={24} fontWeight="bold" color="black" 
                    sx={{ textAlign: 'center', marginBottom: 2, fontFamily: 'monospace', fontSize: 30, }}
                >
                    Your Favorite Countries
                </Typography>
                <Grid container spacing={2}>
                    {favorites.map((country, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <CountryCard country={country} onClick={handleCountryClick} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );

};

export default ProfilePage;