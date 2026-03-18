import { motion } from "framer-motion";

function FilterChips({ filters, activeFilter, setActiveFilter }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="flex gap-2 flex-wrap"
    >
      {filters.map((filter, index) => {
        const isActive = filter === activeFilter;

        return (
          <motion.button
            key={filter}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.04 }}
            onClick={() => setActiveFilter(filter)}
            className={`
              px-4 py-1.5 rounded-full text-xs font-medium
              border transition-all duration-200 cursor-pointer
              ${
                isActive
                  ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-dark-700 border-dark-400 text-gray-400 hover:border-indigo-500/50 hover:text-gray-200"
              }
            `}
          >
            {filter}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

export default FilterChips;
