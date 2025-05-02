import React, { useState } from 'react';
import { getSession } from '../../utils/session';
import { Box, Typography, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';


const CountryDetails = ({ country, userId }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const session = getSession();

    // const handleFavoriteClick = async () => {

    //     if (!session) {
    //         alert('Please log in to add favorites.');
    //         return;
    //     }

    //     setIsFavorite(!isFavorite);
    //     try {
    //         await axios.post('http://localhost:5011/api/favorites/add', {
    //             userId: session.userId,
    //             countryNames: [country.name.common],
    //         });
    //     } catch (error) {
    //         console.error('Error adding to favorites:', error);
    //     }
    // };

    if (
        !country || !country.flags || !country.flags.png || 
        !country.name || !country.name.common
    ) {
        return (
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                Invalid country data.
            </Typography>
        );
    }

    const { 
        name, capital, region, 
        population, languages, flags, 
        subregion, area, timezones, 
        currencies, maps, coatOfArms 
    } = country;



    return (
        <Card
            // variant="outlined"
            sx={{ 
                maxWidth: 700,
                maxHeight: '100%',
                margin: 'auto', 
                mb: 20,
                pt: 8, pb: 5, px: 10,
                border: '10px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s',
                '&:hover': { 
                    transform: 'scale(1.02)', 
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', 
                },
                backgroundColor: 'rgb(255, 234, 234)' // Pure white background
                // padding: '10px 10px 10px 10px',            
            }}
        >

            {/* Flag and Coat of Arms Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'nowrap', gap: 2 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={flags.png}
                    alt={`Flag of ${name.common}`}
                    sx={{ objectFit: 'contain', flex: '1 1 45%', p: 2, borderRadius: '8px' }}
                />
                {coatOfArms?.png && (
                    <CardMedia
                        component="img"
                        height="200"
                        image={coatOfArms.png}
                        alt={`Coat of Arms of ${name.common}`}
                        sx={{ objectFit: 'contain', flex: '1 1 45%', p: 2, borderRadius: '8px' }}
                    />
                )}
            </Box>


            {/* Country Details Section */}
            <CardContent sx={{ mt: 3 }}>

                {/* Country Name and Favorite Button */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>

                    <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
                        {name?.official || 'Unknown Country'} 
                        <Typography variant="subtitle1" color="text.secondary" fontWeight={500} gutterBottom>
                            ({name?.common})
                        </Typography>
                    </Typography>

                    {/* Favorite Button */}
                    {/* <IconButton
                        onClick={handleFavoriteClick}
                        sx={{ color: isFavorite ? 'red' : 'gray' }}
                    >
                        <FavoriteIcon />
                    </IconButton> */}

                </Box>
                

                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Capital:</strong> {capital?.[0] || 'N/A'}
                </Typography>

                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Region:</strong> {region || 'N/A'} ({subregion || 'N/A'})
                </Typography>

                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Population:</strong> {population ? population.toLocaleString() : 'N/A'}
                </Typography>

                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Area:</strong> {area ? `${area.toLocaleString()} km²` : 'N/A'}
                </Typography>

                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Time Zone:</strong> {timezones?.[0] || 'N/A'}
                </Typography>

                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Languages:</strong> {languages ? Object.values(languages).join(', ') : 'N/A'}
                </Typography>

                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Currencies:</strong>{' '}
                    {currencies
                        ? Object.values(currencies)
                            .map((cur) => `${cur.name} (${cur.symbol})`)
                            .join(', ')
                        : 'N/A'}
                </Typography>

                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Google Maps:</strong>{' '}
                    {maps?.googleMaps ? (
                        <a href={maps.googleMaps} target="_blank" rel="noopener noreferrer">
                            View on Google Maps
                        </a>
                    ) : (
                        'N/A'
                    )}
                </Typography>
            </CardContent>

        </Card>
    );
};

export default CountryDetails;