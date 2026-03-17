function App() {
  return (
    <div className="min-h-screen bg-dark-800 flex items-center justify-center">
      <div className="bg-dark-700 border border-dark-500 rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">DevHive</h1>
        <p className="text-gray-400 text-sm mb-6">Dark theme is working</p>
        <div className="flex gap-2 justify-center">
          <span className="bg-indigo-500/10 text-indigo-400 text-xs px-3 py-1 rounded-full">
            Tailwind ✓
          </span>
          <span className="bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full">
            shadcn/ui ✓
          </span>
          <span className="bg-purple-500/10 text-purple-400 text-xs px-3 py-1 rounded-full">
            Dark mode ✓
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
