import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';
import { fetchAllCountries, fetchCountriesByRegion, fetchCountriesByLanguage } from '../../services/api';

// Mock the API module
jest.mock('../../services/api');

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock child components
jest.mock('../common/CountryCard', () => ({ country, onClick }) => (
  <div data-testid="country-card" onClick={() => onClick(country)}>
    {country.name.common}
  </div>
));
jest.mock('../common/FilterBar', () => ({ regions, languages, onRegionChange, onLanguageChange }) => (
  <div>
    <button onClick={() => onRegionChange('Asia')}>Asia</button>
    <button onClick={() => onLanguageChange('English')}>English</button>
  </div>
));
jest.mock('../common/SearchBar', () => ({ onSearch }) => (
  <input
    data-testid="search-bar"
    onChange={e => onSearch(e.target.value)}
    placeholder="Search"
  />
));

// Mock data
const mockCountries = [
  {
    name: { common: 'Japan' },
    region: 'Asia',
    languages: { jpn: 'Japanese' },
    alpha3Code: 'JPN',
  },
  {
    name: { common: 'France' },
    region: 'Europe',
    languages: { fra: 'French' },
    alpha3Code: 'FRA',
  },
  {
    name: { common: 'Kenya' },
    region: 'Africa',
    languages: { eng: 'English', swa: 'Swahili' },
    alpha3Code: 'KEN',
  },
];

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

//   test('renders welcome section and country cards after loading', async () => {
//     fetchAllCountries.mockResolvedValueOnce(mockCountries);

//     render(<HomePage />);

//     // Welcome section
//     expect(screen.getByText(/One World Many Nations/i)).toBeInTheDocument();

//     // Wait for countries to load
//     await waitFor(() => {
//       expect(screen.getAllByTestId('country-card')).toHaveLength(3);
//     });

//     // Check that country names are rendered
//     expect(screen.getByText('Japan')).toBeInTheDocument();
//     expect(screen.getByText('France')).toBeInTheDocument();
//     expect(screen.getByText('Kenya')).toBeInTheDocument();
//   });

  test('filters countries by region', async () => {
    fetchAllCountries.mockResolvedValueOnce(mockCountries);
    fetchCountriesByRegion.mockResolvedValueOnce([mockCountries[0]]); // Only Japan

    render(<HomePage />);
    await waitFor(() => screen.getByText('Japan'));

    // Click Asia filter button
    fireEvent.click(screen.getByText('Asia'));

    await waitFor(() => {
      expect(screen.getAllByTestId('country-card')).toHaveLength(1);
      expect(screen.getByText('Japan')).toBeInTheDocument();
    });
  });

  test('filters countries by language', async () => {
    fetchAllCountries.mockResolvedValueOnce(mockCountries);
    fetchCountriesByLanguage.mockResolvedValueOnce([mockCountries[2]]); // Only Kenya

    render(<HomePage />);
    await waitFor(() => screen.getByText('Japan'));

    // Click English language filter button
    fireEvent.click(screen.getByText('English'));

    await waitFor(() => {
      expect(screen.getAllByTestId('country-card')).toHaveLength(1);
      expect(screen.getByText('Kenya')).toBeInTheDocument();
    });
  });

  test('searches countries by name', async () => {
    fetchAllCountries.mockResolvedValueOnce(mockCountries);

    render(<HomePage />);
    await waitFor(() => screen.getByText('Japan'));

    // Type in the search bar
    fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'france' } });

    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.queryByText('Japan')).not.toBeInTheDocument();
    expect(screen.queryByText('Kenya')).not.toBeInTheDocument();
  });

  test('pagination works', async () => {
    // 10 mock countries for pagination
    const manyCountries = Array.from({ length: 10 }, (_, i) => ({
      name: { common: `Country${i + 1}` },
      region: 'TestRegion',
      languages: { test: 'TestLang' },
      alpha3Code: `C${i + 1}`,
    }));
    fetchAllCountries.mockResolvedValueOnce(manyCountries);

    render(<HomePage />);
    await waitFor(() => screen.getByText('Country1'));

    // Should show 9 countries on first page
    expect(screen.getAllByTestId('country-card')).toHaveLength(9);

    // Go to next page
    fireEvent.click(screen.getByRole('button', { name: /2/i }));

    // Only 1 country on the second page
    await waitFor(() => {
      expect(screen.getAllByTestId('country-card')).toHaveLength(1);
      expect(screen.getByText('Country10')).toBeInTheDocument();
    });
  });
});