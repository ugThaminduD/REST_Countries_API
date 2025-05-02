import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { fetchCountryFlags } from "../../services/api";
import CountryFlags from "./CountryFlags";

// Mock the API module
jest.mock("../../services/api");

// Mock data for testing
const mockFlags = [
  {
    name: "Japan",
    flag: "japan-flag-url",
    region: "Asia",
    subregion: "Eastern Asia",
  },
  {
    name: "Kenya",
    flag: "kenya-flag-url",
    region: "Africa",
    subregion: "Eastern Africa",
  },
  {
    name: "France",
    flag: "france-flag-url",
    region: "Europe",
    subregion: "Western Europe",
  }
];

describe("CountryFlags Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    fetchCountryFlags.mockResolvedValueOnce([]);
    render(<CountryFlags />);
  });

  test("fetches and displays country flags correctly", async () => {
    // Mock the API response
    fetchCountryFlags.mockResolvedValueOnce(mockFlags);

    render(<CountryFlags />);

    // Wait for the data to be loaded and rendered
    await waitFor(() => {
      expect(fetchCountryFlags).toHaveBeenCalledTimes(1);
    });

    // Check if regions are rendered
    expect(screen.getByText("Asia Region")).toBeInTheDocument();
    expect(screen.getByText("Europe Region")).toBeInTheDocument();
    expect(screen.getByText("Africa Region")).toBeInTheDocument();

    // Check if subregions are rendered
    expect(screen.getByText("Eastern Asia")).toBeInTheDocument();
    expect(screen.getByText("Western Europe")).toBeInTheDocument();
    expect(screen.getByText("Eastern Africa")).toBeInTheDocument();

    // Check if country names are rendered
    expect(screen.getByText("Japan")).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByText("Kenya")).toBeInTheDocument();

    // Check if flag images are rendered with correct attributes
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);

    
    // Find images by their alt text instead of assuming order
    const japanFlag = images.find(img => img.getAttribute("alt") === "Japan flag");
    const franceFlag = images.find(img => img.getAttribute("alt") === "France flag");
    const kenyaFlag = images.find(img => img.getAttribute("alt") === "Kenya flag");

    expect(japanFlag).toHaveAttribute("src", "japan-flag-url");
    expect(franceFlag).toHaveAttribute("src", "france-flag-url");
    expect(kenyaFlag).toHaveAttribute("src", "kenya-flag-url");
  });

  test("handles API error gracefully", async () => {
    // Mock console.error to prevent error output in tests
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Mock the API to throw an error
    fetchCountryFlags.mockRejectedValueOnce(new Error("API Error"));

    render(<CountryFlags />);

    // Wait for the error to be logged
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching flags by region and subregion:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  test("handles empty regions correctly", async () => {
    // Mock API response with empty data
    fetchCountryFlags.mockResolvedValueOnce([]);

    render(<CountryFlags />);

    await waitFor(() => {
      expect(fetchCountryFlags).toHaveBeenCalledTimes(1);
    });

    // Check if the component renders without crashing with empty data
    const regions = screen.queryAllByText(/Region$/);
    expect(regions.length).toBe(0);
  });

  test("handles missing subregions correctly", async () => {
    const flagsWithMissingSubregion = [
      {
        name: "Test Country",
        flag: "test-flag-url",
        region: "Asia",
        subregion: null,
      },
    ];

    fetchCountryFlags.mockResolvedValueOnce(flagsWithMissingSubregion);

    render(<CountryFlags />);

    await waitFor(() => {
      expect(fetchCountryFlags).toHaveBeenCalledTimes(1);
    });

    // Check if the unknown subregion is displayed
    expect(screen.getByText("Unknown Subregion")).toBeInTheDocument();
  });
});
