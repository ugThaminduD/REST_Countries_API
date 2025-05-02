import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCountryByName } from '../../services/api';
import { Box, CircularProgress, Typography, Button } from '@mui/material';

import CountryDetails from '../common/CountryDetails';


const CountryPage = () => {
    const { countryName } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                const data = await fetchCountryByName(countryName);
                setCountry(data[0]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCountryDetails();
    }, [countryName]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6" color="error">
                    Error: {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 4, px: 2 }}>
            {/* Back Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(-1)} // Navigate to the previous page
                    sx={{
                        color: '#FFFFFF',
                        backgroundColor: '#4CAF50',
                        '&:hover': { backgroundColor: '#388E3C' },
                    }}
                >
                    Back
                </Button>
            </Box>
            
            {/* Country Details */}
            {country && <CountryDetails country={country} />}
        </Box>
    );
};

export default CountryPage;