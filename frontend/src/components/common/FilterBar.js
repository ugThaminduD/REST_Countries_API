import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, TextField } from '@mui/material';



const FilterBar = ({ regions = [], languages = [], onRegionChange, onLanguageChange }) => {


    return (
        <Box 
            sx={{ 
                display: 'flex', 
                gap: 4, 
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
            
            {/* Region Filter */}
            <FormControl sx={{ width: '200px' }}>
                <TextField
                    select
                    label="Select Region"
                    fullWidth
                    onChange={(e) => onRegionChange(e.target.value)}
                    defaultValue=""
                    sx={{ width: '100%', maxWidth: 200, color: 'black' }}
                    inputProps={{ style: { color: 'black' } }} // Input text color
                >
                    <MenuItem value="">All Regions</MenuItem>
                    {regions.map((region) => (
                        <MenuItem key={region} value={region}>
                            {region}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>

            {/* Language Filter */}
            <FormControl sx={{ width: '200px' }}>
                <TextField
                    select
                    label="Select Language"
                    fullWidth
                    onChange={(e) => onLanguageChange(e.target.value)}
                    defaultValue=""
                    sx={{ width: '100%', maxWidth: 200, color: 'black' }}
                    inputProps={{ style: { color: 'black' } }} // Input text color
                >
                    <MenuItem value="" >All Languages</MenuItem>
                    {languages.map((language) => (
                        <MenuItem key={language} value={language}>
                            {language}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>

        </Box>
    );
};

export default FilterBar;