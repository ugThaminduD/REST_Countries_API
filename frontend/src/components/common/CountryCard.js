import React, { useState, useEffect } from 'react';
import { getSession } from '../../utils/session';
import axios from 'axios';
import { Box, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';


const CountryCard = ({ country, onClick }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const session = getSession();

    const handleFavoriteClick = async (e) => {
        e.stopPropagation(); // Prevent triggering card click
        if (!session) {
            alert('Please log in to add favorites.');
            return;
        }

        try {
            if (!isFavorite) {
                // add from favorites
                await axios.post(
                    `${process.env.REACT_APP_BACKEND_API_URL}/api/favorites/add`,
                    {
                        userId: session.userId,
                        countryNames: [country.name.common],
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${session.token}`,
                        },
                    }
                );
                setIsFavorite(true);
            } else {
                // remove from favorites
                await axios.post(
                    `${process.env.REACT_APP_BACKEND_API_URL}/api/favorites/remove`,
                    {
                        userId: session.userId,
                        countryNames: [country.name.common],
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${session.token}`,
                        },
                    }
                );
                setIsFavorite(false);
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (!session) return;
    
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/favorites/${session.userId}`, {
                    headers: { Authorization: `Bearer ${session.token}` },
                });
                const favoriteCountries = response.data.countryName;
                setIsFavorite(favoriteCountries.includes(country.name.common));
            } catch (error) {
                console.error('Error checking favorite status:', error);
            }
        };
        checkFavoriteStatus();
    }, [session, country.name.common]);

    return (
        <Card onClick={() => onClick(country)}
            sx={{
                width: 320, 
                height: "auto", 
                cursor: 'pointer',
                margin: 2, pl: 2, pr: 2,
                border: '2px solid rgb(116, 140, 206)', // Light border
                borderRadius: '8px', // Rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
                transition: 'transform 0.2s, box-shadow 0.2s', // Smooth hover effect
                '&:hover': {
                    transform: 'scale(1.05)', // Slight zoom on hover
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Enhanced shadow on hover
                },
                display: 'flex',
                flexDirection: 'column', // Ensure content stacks vertically
                backgroundColor: '#FFFFFF' /* Pure white */
            }}
        >
            {/* Frame for the flag */}
            <Box
                sx={{
                    height: 180, // Fixed height for the flag frame
                    backgroundColor: '#f5f5f5', // Light gray background for the frame
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '2px solid rgb(255, 0, 0)', // Light border for the frame
                    borderRadius: '8px',
                    marginTop: 2,
                }}
            >
                <CardMedia
                    component="img"
                    image={country.flags.png}
                    alt={`Flag of ${country.name.common}`}
                    sx={{
                        // margin: 1,
                        padding: 1,
                        border: '20px solid rgb(37, 37, 37)', // Match the frame background color
                        borderRadius: '8px',
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain', // Maintain aspect ratio
                    }}
                />
            </Box>

            {/* details of country */}
            <CardContent
                sx={{
                    flexGrow: 1, // Ensure content fills the remaining space
                    display: 'flex',
                    flexDirection: 'column',
                    height: 100,
                    marginTop: 1,
                    marginBottom: 1,
                    // justifyContent: 'space-between', // Space out content evenly
                }}
            >
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: 22, letterSpacing: '.1rem', }}>
                    {country.name.common}
                </Typography>
            
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                    Region: {country.region} ({country.subregion || 'N/A'})
                </Typography>    
            </CardContent>

            {/* Favorite Button */}
            <IconButton
                onClick={handleFavoriteClick}
                sx={{ color: isFavorite ? 'red' : 'gray' }}
            >
                <FavoriteIcon />
            </IconButton>
        </Card>
    );
};

export default CountryCard;