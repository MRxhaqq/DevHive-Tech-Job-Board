import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
} from "lucide-react";
import BookmarkButton from "./BookmarkButton";

// Generate a consistent color for each company logo
function getCompanyColor(name = "") {
  const colors = [
    "from-indigo-500 to-purple-600",
    "from-blue-500 to-cyan-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-amber-600",
    "from-pink-500 to-rose-600",
    "from-violet-500 to-purple-600",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

// Format the posted date into a human-readable string
function formatDate(dateString) {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Just posted";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  return `${Math.floor(diffDays / 7)}w ago`;
}

// Extract tech tags from job title and description
function extractTags(job) {
  const techKeywords = [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "Vue",
    "Angular",
    "Java",
    "Go",
    "Rust",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "DevOps",
    "CI/CD",
    "Terraform",
    "Next.js",
    "Django",
    "Rails",
  ];
  const text = `${job.title} ${job.description}`.toLowerCase();
  return techKeywords
    .filter((tech) => text.includes(tech.toLowerCase()))
    .slice(0, 3);
}

function JobCard({ job, onClick, isSelected, index }) {
  const companyName = job.company?.display_name || "Unknown";
  const location = job.location?.display_name || "Remote";
  const tags = extractTags(job);
  const gradient = getCompanyColor(companyName);
  const isRemote =
    location.toLowerCase().includes("remote") ||
    job.title.toLowerCase().includes("remote");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={() => onClick(job)}
      className={`
        group relative bg-dark-700 border rounded-2xl p-5
        cursor-pointer transition-all duration-300
        hover:border-indigo-500/50 hover:bg-dark-600
        hover:shadow-xl hover:shadow-indigo-500/5
        hover:-translate-y-0.5
        ${
          isSelected
            ? "border-indigo-500 bg-dark-600 shadow-xl shadow-indigo-500/10"
            : "border-dark-500"
        }
      `}
    >
      {/* Top row — logo + bookmark */}
      <div className="flex items-start justify-between mb-4">
        {/* Company logo */}
        <div
          className={`
          w-11 h-11 rounded-xl bg-linear-to-br ${gradient}
          flex items-center justify-center
          text-white font-bold text-sm flex-shrink-0
          shadow-lg
        `}
        >
          {companyName.charAt(0).toUpperCase()}
        </div>

        {/* Bookmark button */}
        <BookmarkButton job={job} />
      </div>

      {/* Job title */}
      <h3
        className="text-white font-semibold text-sm leading-snug mb-1
                     group-hover:text-indigo-300 transition-colors line-clamp-2"
      >
        {job.title}
      </h3>

      {/* Company name */}
      <p className="text-gray-400 text-xs mb-3 font-medium">{companyName}</p>

      {/* Location + contract type */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <MapPin size={11} />
          <span className="truncate max-w-[140px]">{location}</span>
        </div>
        {isRemote && (
          <span
            className="bg-green-500/10 text-green-400 text-xs
                           px-2 py-0.5 rounded-full border border-green-500/20"
          >
            Remote
          </span>
        )}
      </div>

      {/* Tech tags */}
      {tags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-500/10 text-indigo-400 text-xs
                         px-2 py-0.5 rounded-full border border-indigo-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom row — posted date + view link */}
      <div
        className="flex items-center justify-between pt-3
                      border-t border-dark-500"
      >
        <div className="flex items-center gap-1 text-gray-600 text-xs">
          <Clock size={11} />
          <span>{formatDate(job.created)}</span>
        </div>
        <div
          className="flex items-center gap-1 text-indigo-400
                        text-xs opacity-0 group-hover:opacity-100
                        transition-opacity"
        >
          <span>View role</span>
          <ExternalLink size={11} />
        </div>
      </div>
    </motion.div>
  );
}

export default JobCard;
