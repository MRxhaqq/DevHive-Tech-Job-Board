import { useState, useEffect } from "react";
import { Bookmark, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "devhive_bookmarks";

function Navbar() {
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [showSaved, setShowSaved] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);

  // Read bookmark count from localStorage on mount
  // and whenever localStorage changes
  useEffect(() => {
    const update = () => {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setBookmarkCount(saved.length);
      setSavedJobs(saved);
    };
    update();
    // Listen for storage changes (when BookmarkButton updates localStorage)
    window.addEventListener("storage", update);

    // Poll every second as a fallback (storage event doesn't fire
    // for changes in the same tab in all browsers)
    const interval = setInterval(update, 1000);

    return () => {
      window.removeEventListener("storage", update);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-30
                      bg-dark-800/80 backdrop-blur-md
                      border-b border-dark-500"
      >
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
                        h-14 flex items-center justify-between"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg bg-linear-to-br
                            from-indigo-500 to-purple-600
                            flex items-center justify-center"
            >
              <Zap size={14} className="text-white" />
            </div>
            <span className="text-white font-bold text-sm tracking-tight">
              DevHive
            </span>
          </div>

          {/* Bookmark button with count badge */}
          <button
            onClick={() => setShowSaved(!showSaved)}
            className="flex items-center gap-2 px-3 py-1.5
                       bg-dark-700 border border-dark-400 rounded-lg
                       text-gray-400 hover:text-white
                       hover:border-indigo-500/50
                       transition-all duration-200 text-xs"
          >
            <Bookmark size={13} />
            <span>Saved</span>
            {bookmarkCount > 0 && (
              <span
                className="bg-indigo-500 text-white text-xs
                               w-4 h-4 rounded-full flex items-center
                               justify-center font-bold leading-none"
              >
                {bookmarkCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Saved jobs dropdown */}
      <AnimatePresence>
        {showSaved && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSaved(false)}
              className="fixed inset-0 z-30"
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="fixed top-16 right-4 sm:right-8 z-40
                         w-72 bg-dark-700 border border-dark-400
                         rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-dark-500">
                <p className="text-white text-sm font-semibold">Saved jobs</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {bookmarkCount === 0
                    ? "No saved jobs yet"
                    : `${bookmarkCount} job${bookmarkCount > 1 ? "s" : ""} saved`}
                </p>
              </div>

              {savedJobs.length === 0 ? (
                <div className="p-8 text-center">
                  <Bookmark className="mx-auto text-gray-600 mb-2" size={24} />
                  <p className="text-gray-500 text-xs">
                    Bookmark jobs to save them here
                  </p>
                </div>
              ) : (
                <div className="max-h-72 overflow-y-auto">
                  {savedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-3 border-b border-dark-500 last:border-0
                                 hover:bg-dark-600 transition-colors"
                    >
                      <p
                        className="text-white text-xs font-medium
                                    line-clamp-1 mb-0.5"
                      >
                        {job.title}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {job.company?.display_name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
