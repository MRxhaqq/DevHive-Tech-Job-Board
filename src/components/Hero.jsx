import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Animated number counter — counts up from 0 to the target number
function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!target) return;

    // How long the animation runs in ms
    const duration = 1500;
    // How many times to update per second
    const steps = 60;
    const stepValue = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count.toLocaleString()}</span>;
}

function Hero({ totalJobs, isLoading }) {
  return (
    <div className="text-center py-8">
      {/* Live badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6"
      >
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-indigo-300 text-xs font-medium">
          {isLoading ? (
            "Fetching live jobs..."
          ) : (
            <>
              <AnimatedCounter target={totalJobs} /> live tech jobs
            </>
          )}
        </span>
      </motion.div>

      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight tracking-tight"
      >
        Find your next{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
          tech role
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed"
      >
        Real-time job listings from top tech companies. Remote, hybrid, and
        on-site roles across the stack.
      </motion.p>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center justify-center gap-8 mt-8"
      >
        {[
          { label: "Companies", value: "500+" },
          { label: "Remote roles", value: "60%" },
          { label: "New today", value: "120+" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-xl font-bold text-white">{stat.value}</div>
            <div className="text-gray-500 text-xs mt-0.5">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default Hero;
