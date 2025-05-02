import React, { useEffect, useState } from 'react';
import { fetchCountryFlags } from '../../services/api';
import { Box, Typography, Grid } from '@mui/material';

const regions = [
    'Asia',
    'Africa',
    'Americas',
    'Europe',
    'Oceania', 
    'Antarctic',
];

const CountryFlags = () => {
    const [flagsByRegion, setFlagsByRegion] = useState({});

    useEffect(() => {
        const getFlagsByRegionAndSubregion = async () => {
            try {
                const flags = await fetchCountryFlags();

                // Group flags by region and subregion
                const groupedFlags = regions.reduce((acc, region) => {
                    const regionFlags = flags.filter(flag => flag.region === region);

                    acc[region] = regionFlags.reduce((subAcc, flag) => {
                        const subregion = flag.subregion || 'Unknown Subregion';
                        if (!subAcc[subregion]) {
                            subAcc[subregion] = [];
                        }
                        subAcc[subregion].push(flag);
                        return subAcc;
                    }, {});

                    return acc;
                }, {});

                setFlagsByRegion(groupedFlags);
            } catch (error) {
                console.error('Error fetching flags by region and subregion:', error);
            }
        };

        getFlagsByRegionAndSubregion();
    }, []);



    return (
        <Box sx={{ px: 2, margin: 10, }}>

            {/* <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                Country Flags by Region and Subregion
            </Typography> */}

            {Object.entries(flagsByRegion).map(([region, subregions]) => (
                <Box key={region} sx={{ mt: 4, border: '10px solid #ccc', borderRadius: '8px', padding: '16px', backgroundColor: 'rgb(255, 234, 234)' }}>
                    
                    {/* Region Title */}
                    <Typography variant="h3" component="h1" gutterBottom textAlign="center" 
                        sx={{ textTransform: 'uppercase', textDecoration: 'underline', fontFamily: 'monospace', fontWeight: 'bold', color: '#333', mt: 0 }}  
                    >
                        {region} Region
                    </Typography>
                    

                    {/* Subregion Flags */}
                    {Object.entries(subregions).map(([subregion, flags]) => (
                        <Box key={subregion} sx={{ mt: 8 }}>
                            
                            {/* <Typography  gutterBottom> */}
                            <Typography variant="h4" component="h3" gutterBottom 
                                sx={{ textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 'bold', color: '#333', mb: 2 }}  
                            >
                                {subregion}
                            </Typography>


                            {/* flags in the subregion */}
                            <Grid container spacing={5} >
                                {flags.map((flag, index) => (
                                    <Grid item xs={6} sm={4} md={2} key={index}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <img
                                                src={flag.flag}
                                                alt={`${flag.name} flag`}
                                                
                                                style={{
                                                    width: '120px', // Increased width
                                                    height: '80px', // Increased height
                                                    objectFit: 'fit', // Maintain aspect ratio
                                                    borderRadius: '6px', // Slightly rounded corners
                                                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)', // Enhanced shadow
                                                }}
                                            />
                                            <Typography
                                                variant="body1" // Slightly larger text
                                                sx={{
                                                    mt: 1,
                                                    wordWrap: 'break-word',
                                                    textAlign: 'center',
                                                    maxWidth: '120px', 
                                                    lineHeight: '1.4em', 
                                                    fontSize: '1.0rem',
                                                    fontFamily: 'monospace',
                                                    fontWeight: 500, 
                                                    letterSpacing: '.001rem',
                                                }}
                                            >
                                                {flag.name}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                        </Box>
                    ))}

                </Box>                
            ))}

        </Box>
    );
};

export default CountryFlags;