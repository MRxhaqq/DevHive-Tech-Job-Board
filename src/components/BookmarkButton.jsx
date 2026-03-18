import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

const STORAGE_KEY = "devhive_bookmarks";

function BookmarkButton({ job }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check if this job is already bookmarked when component mounts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setIsBookmarked(saved.some((j) => j.id === job.id));
  }, [job.id]);

  const toggleBookmark = (e) => {
    // Stop the click from bubbling up to the card's onClick
    e.stopPropagation();

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (isBookmarked) {
      // Remove from bookmarks
      const updated = saved.filter((j) => j.id !== job.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setIsBookmarked(false);
    } else {
      // Add to bookmarks
      const updated = [...saved, job];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setIsBookmarked(true);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`
        p-1.5 rounded-lg transition-all duration-200
        ${
          isBookmarked
            ? "text-indigo-400 bg-indigo-500/10"
            : "text-gray-600 hover:text-gray-300 hover:bg-dark-500"
        }
      `}
    >
      {isBookmarked ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
    </button>
  );
}

export default BookmarkButton;
