# DevHive — Tech Job Board

A premium dark-themed tech job board built with React, Tailwind CSS, and the Adzuna API. Find real-time software engineering roles with instant search, smart filtering, and a sleek slide-in detail panel.

## Live Demo

[View live on Vercel](https://your-deployment-url.vercel.app)

## Features

- Real-time job listings from Adzuna API
- Instant search with 500ms debouncing
- Filter by role type, tech stack, and work style
- Slide-in job detail panel with spring animation
- Bookmark jobs saved to localStorage
- Skeleton loading states
- Fully responsive — mobile, tablet, desktop

## Tech Stack

- React 18
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- Adzuna Jobs API
- Vite

## Getting Started

### Prerequisites

- Node.js 18+
- A free Adzuna API key from [developer.adzuna.com](https://developer.adzuna.com)

### Installation

1. Clone the repository

```bash
   git clone https://github.com/YOUR_USERNAME/devhive.git
   cd devhive
```

2. Install dependencies

```bash
   npm install
```

3. Create a `.env` file in the root directory

```
   VITE_ADZUNA_APP_ID=your_app_id
   VITE_ADZUNA_APP_KEY=your_app_key
```

4. Start the development server

```bash
   npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173)

## What I Learned

- Fetching real API data with useEffect and async/await
- Debouncing search input to reduce unnecessary API calls
- Custom hooks for separating data logic from UI components
- Framer Motion AnimatePresence for exit animations
- Tailwind CSS utility-first styling
- localStorage for persisting user data between sessions
- Derived state for filtering without extra useState
