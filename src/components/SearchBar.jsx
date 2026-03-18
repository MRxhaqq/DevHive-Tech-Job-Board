import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="relative"
    >
      {/* Search icon */}
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        size={18}
      />

      {/* Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search roles, companies, technologies..."
        className="w-full bg-dark-700 border border-dark-400 rounded-2xl
                   pl-12 pr-12 py-4 text-white placeholder-gray-500
                   text-sm focus:outline-none focus:border-indigo-500
                   focus:ring-1 focus:ring-indigo-500/50
                   transition-all duration-200"
      />

      {/* Clear button — only shows when there is text */}
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-4 top-1/2 -translate-y-1/2
                     text-gray-500 hover:text-gray-300 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </motion.div>
  );
}

export default SearchBar;
