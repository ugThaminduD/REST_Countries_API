const Favorite = require('../models/Favorite');

// Add countries to favorites
const addFavorite = async (req, res) => {
    try {
        const { userId, countryNames } = req.body;
        // console.log('Received data:', req.body);

        if (!Array.isArray(countryNames) || countryNames.length === 0) {
            return res.status(400).json({ error: 'countryNames must be a non-empty array' });
        }

        // Check if the user already has a favorites document
        let favorite = await Favorite.findOne({ userId });

        if (favorite) {
            // Filter out duplicates before adding new countries
            const newCountries = countryNames.filter(
                (country) => !favorite.countryName.includes(country)
            );

            if (newCountries.length === 0) {
                return res.status(400).json({ error: 'All countries are already in favorites' });
            }

            // Append new countries to the existing array
            favorite.countryName.push(...newCountries);
            await favorite.save();
        } else {
            // Create a new favorites document
            favorite = new Favorite({ userId, countryName: countryNames });
            await favorite.save();
        }

        res.status(201).json({ message: 'Countries added to favorites', favorite });
    } catch (error) {
        console.error('Error in addFavorite:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get all favorite countries for user
const getFavorites = async (req, res) => {
    try {
        const { userId } = req.params;
        const favorite = await Favorite.findOne({ userId });

        if (!favorite) {
            return res.status(404).json({ error: 'No favorites found for this user' });
        }

        res.status(200).json(favorite);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove countries from favorites
const removeFavorite = async (req, res) => {
    try {
        const { userId, countryNames } = req.body;

        if (!Array.isArray(countryNames) || countryNames.length === 0) {
            return res.status(400).json({ error: 'countryNames must be a non-empty array' });
        }

        const favorite = await Favorite.findOne({ userId });

        if (!favorite) {
            return res.status(404).json({ error: 'No favorites found for this user' });
        }

        // Remove countries from the array
        favorite.countryName = favorite.countryName.filter(
            (country) => !countryNames.includes(country)
        );
        await favorite.save();

        res.status(200).json({ message: 'Countries removed from favorites', favorite });
    } catch (error) {
        console.error('Error in removeFavorite:', error);
        res.status(500).json({ error: error.message });
    }
};



module.exports = { addFavorite, getFavorites, removeFavorite };