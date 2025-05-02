import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                width: '100%', maxWidth: 1200, // Max width for larger screens
                backgroundColor: '#E3F2FD', 
                padding: 2,
                borderRadius: '8px', // Rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
                transition: 'transform 0.2s', // Smooth hover effect
                '&:hover': {
                    transform: 'scale(1.01)', // Slight zoom on hover
                },
            }}
        >
            <TextField
                label="Search for a country..."
                fullWidth
                variant="outlined"
                value={searchTerm}
                onChange={handleInputChange}
                sx={{ width: '100%', width: 250, color: 'black' }} // Adjusted width for smaller screens
                inputProps={{ style: { color: 'black' } }} // Input text color
            />
        </Box>
    );
};

export default SearchBar;