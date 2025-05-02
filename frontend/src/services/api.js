import axios from 'axios';
import { getToken } from '../utils/session';

const BASE_URL = 'https://restcountries.com/v3.1'; 


// fetch all the countries => used
const fetchAllCountries = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
};

// fetch country by name => used
const fetchCountryByName = async (name) => {
    try {
        const response = await axios.get(`${BASE_URL}/name/${name}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching country by name (${name}):`, error);
        throw error;
    }
};

// fetch countries by region => used
const fetchCountriesByRegion = async (region) => {
    try {
        const response = await axios.get(`${BASE_URL}/region/${region}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching countries by region (${region}):`, error);
        throw error;
    }
};

// fetch country details by code => 
const fetchCountryDetailsByCode = async (code) => {
    try {
        const response = await axios.get(`${BASE_URL}/alpha/${code}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching country details by code (${code}):`, error);
        throw error;
    }
};

// fetch country flags => used
const fetchCountryFlags = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all?fields=flags,name,region,subregion`);
        return response.data.map(country => ({
            name: country.name?.common,
            flag: country.flags?.png,
            region: country.region,
            subregion: country.subregion,
        }));
    } catch (error) {
        console.error('Error fetching country flags:', error);
        throw error;
    }
};

// fetch countries by language => used
const fetchCountriesByLanguage = async (language) => {
    try {
        const response = await axios.get(`${BASE_URL}/lang/${language}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching countries by language (${language}):`, error);
        throw error;
    }
};

export { 
    fetchAllCountries,  // used
    fetchCountryByName,  // used
    fetchCountriesByRegion,   // used
    fetchCountryDetailsByCode,
    fetchCountryFlags,  // used
    fetchCountriesByLanguage,   // used
};




// https://restcountries.com/v3.1/lang/{language}