import { useState, useEffect } from "react";
import { useJobs } from "./hooks/useJobs";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import FilterChips from "./components/FilterChips";
import JobGrid from "./components/JobGrid";
import JobDetailPanel from "./components/JobDetailPanel";

const FILTERS = [
  "All",
  "Remote",
  "Full-time",
  "Contract",
  "React",
  "Node.js",
  "Python",
  "DevOps",
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);

  // Debounce — wait 500ms after user stops typing before hitting the API
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Use debouncedQuery for the API call, not searchQuery
  const { jobs, isLoading, error, totalJobs } = useJobs(debouncedQuery);

  // Derived state — filter client-side
  const filteredJobs = jobs.filter((job) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Remote") {
      return (
        job.location?.display_name?.toLowerCase().includes("remote") ||
        job.title?.toLowerCase().includes("remote")
      );
    }
    if (activeFilter === "Full-time") {
      return job.contract_time === "full_time";
    }
    if (activeFilter === "Contract") {
      return job.contract_time === "contract";
    }
    return (
      job.title?.toLowerCase().includes(activeFilter.toLowerCase()) ||
      job.description?.toLowerCase().includes(activeFilter.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-dark-800">
      {/* Fixed navbar */}
      <Navbar />

      {/* Grid background pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Indigo glow at top */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hero */}
        <Hero totalJobs={totalJobs} isLoading={isLoading} />

        {/* Search */}
        <div className="mt-10">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* Typing indicator — shows while debounce is pending */}
        {searchQuery !== debouncedQuery && (
          <p className="text-gray-600 text-xs mt-2 ml-1">Searching...</p>
        )}

        {/* Filters */}
        <div className="mt-4">
          <FilterChips
            filters={FILTERS}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>

        {/* Results count */}
        {!isLoading && (
          <p className="text-gray-500 text-sm mt-6 mb-4">
            Showing{" "}
            <span className="text-gray-300 font-medium">
              {filteredJobs.length}
            </span>{" "}
            {filteredJobs.length === 1 ? "result" : "results"}
            {activeFilter !== "All" && (
              <span className="text-indigo-400"> · {activeFilter}</span>
            )}
            {debouncedQuery && (
              <span className="text-gray-600"> for "{debouncedQuery}"</span>
            )}
          </p>
        )}

        {/* Job grid */}
        <JobGrid
          jobs={filteredJobs}
          isLoading={isLoading}
          error={error}
          onJobClick={setSelectedJob}
          selectedJobId={selectedJob?.id}
        />
      </div>

      {/* Detail panel */}
      <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}

export default App;
