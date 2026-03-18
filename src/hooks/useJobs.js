import { useState, useEffect } from "react";

// The base URL for Adzuna's job search API
const BASE_URL = "https://api.adzuna.com/v1/api/jobs";

// We grab the credentials from the .env file
const APP_ID = import.meta.env.VITE_ADZUNA_APP_ID;
const APP_KEY = import.meta.env.VITE_ADZUNA_APP_KEY;

export function useJobs(searchQuery = "", filters = {}) {
  // State 1: the array of job objects from the API
  const [jobs, setJobs] = useState([]);

  // State 2: are we currently waiting for the API response?
  const [isLoading, setIsLoading] = useState(true);

  // State 3: did something go wrong?
  const [error, setError] = useState(null);

  // State 4: total number of jobs found (for the hero counter)
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    // This function runs every time searchQuery or filters changes
    const fetchJobs = async () => {
      // Reset to loading state before each new fetch
      setIsLoading(true);
      setError(null);

      try {
        // Build the search term — default to general tech jobs
        const query = searchQuery || "software developer";

        // Build the full API URL with all parameters
        const url =
          `${BASE_URL}/gb/search/1?` +
          `app_id=${APP_ID}&` +
          `app_key=${APP_KEY}&` +
          `results_per_page=20&` +
          `what=${encodeURIComponent(query)}&` +
          `content-type=application/json`;

        // Make the actual network request
        const response = await fetch(url);

        // If the server returned an error status, throw an error
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Update our state with the results
        setJobs(data.results || []);
        setTotalJobs(data.count || 0);
      } catch (err) {
        // If anything went wrong, store the error message
        setError(err.message);
        console.error("Failed to fetch jobs:", err);
      } finally {
        // Whether it succeeded or failed, stop showing the loading state
        setIsLoading(false);
      }
    };

    fetchJobs();

    // This array tells useEffect WHEN to re-run
    // It re-runs whenever searchQuery or filters changes
  }, [searchQuery]);

  // Return everything the components need
  return { jobs, isLoading, error, totalJobs };
}
