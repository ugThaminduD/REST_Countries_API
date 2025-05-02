import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CountryCard from '../common/CountryCard';
import FilterBar from '../common/FilterBar';
import SearchBar from '../common/SearchBar';
import { fetchAllCountries, fetchCountriesByRegion, fetchCountriesByLanguage } from '../../services/api';
import { Box, Grid, Typography, Container, Pagination, } from '@mui/material';


const HomePage = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 9;
    
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState([]);

    const navigate = useNavigate(); // Initialize useNavigate


    useEffect(() => {
        const getCountries = async () => {
            const data = await fetchAllCountries();
            setCountries(data);
            setFilteredCountries(data);

            // Extract unique regions and languages
            const uniqueRegions = [...new Set(data.map((country) => country.region))]
                .filter(Boolean)
                .sort((a, b) => a.localeCompare(b));
            const uniqueLanguages = [
                ...new Set(
                    data.flatMap((country) => Object.values(country.languages || {}))
                ),
            ].sort((a, b) => a.localeCompare(b));

            
            setRegions(uniqueRegions);
            setLanguages(uniqueLanguages);

            // // Shuffle countries randomly
            // const shuffledCountries = data.sort(() => Math.random() - 0.5);
            // setCountries(shuffledCountries);
            // setFilteredCountries(shuffledCountries);

        };
        getCountries();
    }, []);


    // Handle region filter
    const handleRegionChange = async (region) => {
        setSelectedRegion(region);
        if (region) {
            const data = await fetchCountriesByRegion(region);
            setFilteredCountries(data);
        } else {
            setFilteredCountries(countries);
        }
    };
    // Handle language filter
    const handleLanguageChange = async (language) => {
        setSelectedLanguage(language);
        if (language) {
            const data = await fetchCountriesByLanguage(language);
            setFilteredCountries(data);
        } else {
            setFilteredCountries(countries);
        }
    };
    // Handle search input
    const handleSearch = (term) => {
        setSearchTerm(term);
        const filtered = countries.filter((country) =>
            country.name.common.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredCountries(filtered);
    };


    // handle country card click
    const handleCountryClick = (country) => {
        navigate(`/country/${country.name.common}`);
    }

    // Pagination logic
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    // const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
    const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    

    return (
        <Container maxWidth="lg" sx={{ mt: 0, px: 0, width: '100%' }}>

            {/* Welcome Section */}
            <Box
                sx={{
                    textAlign: 'center',
                    // mb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexDirection: 'column' }}>
                    <Typography variant="h3" component="h1" gutterBottom color="black" fontWeight="bold" sx={{ textAlign: 'center', fontFamily: 'monospace', fontSize: 34 }}>
                        One World Many Nations
                    </Typography>

                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif"
                        alt="Spinning Earth"
                        width="100" // Increased size
                        height="100" // Increased size
                        style={{
                            borderRadius: '50%',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Added shadow
                        }}
                    />
                </Box>
                <Typography variant="h6" component="p" color="black" fontWeight="bold"  
                    sx={{ margin: 3, textAlign: 'center', fontFamily: 'monospace', fontSize: 20, 
                        letterSpacing: '.1rem', lineHeight: 1.3, 
                    }}
                >
                    Welcome to One World Many Nations! 🌍  <br/>
                    Discover the world, one country at a time. Explore information about countries around the globe, including their flags, names, and more.
                </Typography>
            </Box>

            {/* Filter Bar & Search Bar */}
            <Box
                position={'sticky'}
                sx={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center',
                    mt: 2, mb: 3, mr: 5, ml: 5,
                    gap: 1,
                }}
            >
                <FilterBar
                    regions={regions}
                    languages={languages}
                    onRegionChange={handleRegionChange}
                    onLanguageChange={handleLanguageChange}
                />
                <SearchBar onSearch={handleSearch} />
            </Box>

            {/* Country Section */}
            <Grid container spacing={2} display={'flex'} justifyContent="space-evenly" >
                {currentCountries.map(country => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={country.alpha3Code}>
                        <CountryCard country={country} onClick={handleCountryClick} />
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            <Box 
                sx={{ 
                    display: 'flex', justifyContent: 'center', 
                    mt: 4, padding: 2,
                    backgroundColor: '#F0F4F8', color: 'gray',
                    borderRadius: '8px', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                    transition: 'transform 0.2s', 
                    '&:hover': { transform: 'scale(1.01)' } 
                }}
            >
                <Pagination
                    // count={Math.ceil(countries.length / countriesPerPage)} // Total pages
                    count={Math.ceil(filteredCountries.length / countriesPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

        </Container>
    );
};

export default HomePage;