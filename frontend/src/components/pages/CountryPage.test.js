import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryDetails from './CountryDetails';

// Mock country data
const mockCountry = {
    name: {
        common: 'Japan',
        official: 'Japan'
    },
    capital: ['Tokyo'],
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 125700000,
    languages: { jpn: 'Japanese' },
    flags: {
        png: 'japan-flag-url'
    },
    area: 377975,
    timezones: ['UTC+09:00'],
    currencies: {
        JPY: { name: 'Japanese yen', symbol: '¥' }
    },
    maps: {
        googleMaps: 'https://maps.google.com/japan'
    },
    coatOfArms: {
        png: 'japan-coa-url'
    }
};

describe('CountryDetails Component', () => {
    test('renders all country information correctly', () => {
        render(<CountryDetails country={mockCountry} />);

        // Check for country name
        expect(screen.getByText('Japan')).toBeInTheDocument();
        expect(screen.getByText('(Japan)')).toBeInTheDocument();

        // Check for basic information using more specific queries
        expect(screen.getByText(/^Tokyo$/)).toBeInTheDocument(); // Exact match for Tokyo
        expect(screen.getByText(/Asia \(Eastern Asia\)/)).toBeInTheDocument(); // Combined region and subregion
        expect(screen.getByText(/125,700,000/)).toBeInTheDocument();
        
        // Use getByRole for images
        const images = screen.getAllByRole('img');
        expect(images[0]).toHaveAttribute('src', 'japan-flag-url');
        expect(images[0]).toHaveAttribute('alt', 'Flag of Japan');
        expect(images[1]).toHaveAttribute('src', 'japan-coa-url');
        expect(images[1]).toHaveAttribute('alt', 'Coat of Arms of Japan');

        // Check specific text content with their labels
        expect(screen.getByText((content, element) => {
            return element.tagName.toLowerCase() === 'p' && 
                   content.includes('Languages:') && 
                   content.includes('Japanese');
        })).toBeInTheDocument();

        expect(screen.getByText((content, element) => {
            return element.tagName.toLowerCase() === 'p' && 
                   content.includes('Currencies:') && 
                   content.includes('Japanese yen (¥)');
        })).toBeInTheDocument();

        // Check other specific information
        expect(screen.getByText(/377,975 km²/)).toBeInTheDocument();
        expect(screen.getByText(/UTC\+09:00/)).toBeInTheDocument();
    });

    test('renders without coat of arms when not provided', () => {
        const countryWithoutCoA = {
            ...mockCountry,
            coatOfArms: null
        };

        render(<CountryDetails country={countryWithoutCoA} />);
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(1); // Only flag should be present
        expect(images[0]).toHaveAttribute('alt', 'Flag of Japan');
    });

    test('handles missing data gracefully', () => {
        const incompleteCountry = {
            name: {
                common: 'Test Country',
                official: 'Test Country'
            },
            flags: {
                png: 'test-flag-url'
            }
        };

        render(<CountryDetails country={incompleteCountry} />);
        const naElements = screen.getAllByText('N/A');
        expect(naElements.length).toBeGreaterThan(0); // Check that N/A placeholders exist
    });

    test('renders invalid country data message when country data is null', () => {
        render(<CountryDetails country={null} />);
        expect(screen.getByText('Invalid country data.')).toBeInTheDocument();
    });

    test('renders Google Maps link correctly', () => {
        render(<CountryDetails country={mockCountry} />);
        const mapLink = screen.getByText('View on Google Maps');
        expect(mapLink).toHaveAttribute('href', 'https://maps.google.com/japan');
        expect(mapLink).toHaveAttribute('target', '_blank');
        expect(mapLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
});