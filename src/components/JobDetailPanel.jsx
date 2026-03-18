import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin, Clock, ExternalLink, Globe, Briefcase } from "lucide-react";
import BookmarkButton from "./BookmarkButton";

function formatDate(dateString) {
  if (!dateString) return "Recently posted";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDescription(description) {
  if (!description) return "";
  return description
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTags(job) {
  const keywords = [
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
    "CSS",
    "HTML",
    "Git",
    "Agile",
    "Scrum",
    "REST",
    "API",
  ];
  const text = (job.title + " " + job.description).toLowerCase();
  return keywords.filter((k) => text.includes(k.toLowerCase()));
}

function getCompanyColor(name) {
  const colors = [
    "from-indigo-500 to-purple-600",
    "from-blue-500 to-cyan-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-amber-600",
    "from-pink-500 to-rose-600",
    "from-violet-500 to-purple-600",
  ];
  if (!name) return colors[0];
  return colors[name.charCodeAt(0) % colors.length];
}

function ApplyButton({ url }) {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        backgroundColor: "#4f46e5",
        color: "white",
        fontSize: "14px",
        fontWeight: "600",
        padding: "12px 24px",
        borderRadius: "12px",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
    >
      Apply now
      <ExternalLink size={14} />
    </button>
  );
}

function JobDetailPanel({ job, onClose }) {
  if (!job) {
    return null;
  }

  const tags = extractTags(job);
  const gradient = getCompanyColor(job.company?.display_name);
  const description = formatDescription(job.description);
  const location = job.location?.display_name || "Location not specified";
  const isRemote =
    location.toLowerCase().includes("remote") ||
    job.title.toLowerCase().includes("remote");

  const sentences = description
    .split(". ")
    .filter((s) => s.length > 30)
    .slice(0, 12);

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />

      <motion.div
        key="panel"
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed inset-y-0 right-0 w-full sm:w-[520px] bg-dark-800 border-l border-dark-500 z-50 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-500 flex-shrink-0">
          <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">
            Job Details
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-dark-600 border border-dark-400 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-500 transition-all duration-150"
          >
            <X size={15} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Company + title */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg`}
            >
              {job.company?.display_name?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-bold text-lg leading-snug mb-1">
                {job.title}
              </h2>
              <p className="text-indigo-400 text-sm font-medium">
                {job.company?.display_name || "Unknown company"}
              </p>
            </div>
          </div>

          {/* Info pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex items-center gap-1.5 bg-dark-700 border border-dark-400 rounded-full px-3 py-1.5">
              <MapPin size={12} className="text-gray-500" />
              <span className="text-gray-300 text-xs">{location}</span>
            </div>

            {isRemote && (
              <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1.5">
                <Globe size={12} className="text-green-400" />
                <span className="text-green-400 text-xs">Remote</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 bg-dark-700 border border-dark-400 rounded-full px-3 py-1.5">
              <Clock size={12} className="text-gray-500" />
              <span className="text-gray-300 text-xs">
                {formatDate(job.created)}
              </span>
            </div>

            {job.contract_time && (
              <div className="flex items-center gap-1.5 bg-dark-700 border border-dark-400 rounded-full px-3 py-1.5">
                <Briefcase size={12} className="text-gray-500" />
                <span className="text-gray-300 text-xs capitalize">
                  {job.contract_time.replace("_", " ")}
                </span>
              </div>
            )}
          </div>

          {/* Tech tags */}
          {tags.length > 0 && (
            <div className="mb-6">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-3">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-indigo-500/10 text-indigo-400 text-xs px-3 py-1 rounded-full border border-indigo-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-3">
              About the role
            </p>
            <div className="space-y-3">
              {sentences.map((sentence, i) => (
                <p key={i} className="text-gray-400 text-sm leading-relaxed">
                  {sentence.trim()}
                  {sentence.endsWith(".") ? "" : "."}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <div className="flex-shrink-0 p-6 border-t border-dark-500 bg-dark-800">
          <div className="flex gap-3 items-center">
            <BookmarkButton job={job} />
            <ApplyButton url={job.redirect_url} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default JobDetailPanel;
