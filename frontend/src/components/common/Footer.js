import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box className="App-footer" sx={{ p: 2, textAlign: 'center', backgroundColor: '#4A90E2' }}>
            <Typography variant="body2" color="white" fontWeight="bold">
                © {new Date().getFullYear()} One World Many Nations. All rights reserved.
            </Typography>
            <Typography variant="body2" color="white" fontWeight="bold">
                Visit our website: 
                <a style={{ color: 'white' }} href="https://restcountries.com/" target="_blank" rel="noopener noreferrer">
                    https://restcountries.com
                </a>
            </Typography>
        </Box>
    );
};

export default Footer;