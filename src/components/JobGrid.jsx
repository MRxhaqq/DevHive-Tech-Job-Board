import JobCard from "./JobCard";
import SkeletonCard from "./SkeletonCard";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

function JobGrid({ jobs, isLoading, error, onJobClick, selectedJobId }) {
  // Error state
  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-red-400 font-medium mb-1">Failed to load jobs</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Loading state — show 8 skeleton cards
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // Empty state — no results found
  if (jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <SearchX className="mx-auto text-gray-600 mb-4" size={40} />
        <p className="text-gray-400 font-medium mb-1">No jobs found</p>
        <p className="text-gray-600 text-sm">
          Try a different search term or filter
        </p>
      </motion.div>
    );
  }

  // Jobs grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job, index) => (
        <JobCard
          key={job.id}
          job={job}
          index={index}
          onClick={onJobClick}
          isSelected={selectedJobId === job.id}
        />
      ))}
    </div>
  );
}

export default JobGrid;
