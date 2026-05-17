# Urvah Dynamics LMS

Urvah Dynamics is a modern, feature-rich Learning Management System (LMS) built with React, Vite, and Tailwind CSS. It is designed to provide a comprehensive educational platform that integrates interactive learning, an advanced coding workspace, AI mentorship, and detailed analytics.

## Key Features

- **Authentication System**: Secure user authentication including Login, Signup, Password Recovery, and OTP verification.
- **Role-Based Access**: Specialized interfaces and routing for Students, Faculty, and Administrators.
- **Interactive Dashboard**: A centralized hub for users to track their progress, recent activities, and upcoming assignments.
- **Integrated Coding Workspace**:
  - Embedded **Monaco Editor** for writing and testing code directly in the browser.
  - Problem-solving environments and competitive coding contests.
  - Dedicated coding analytics and contest leaderboards.
- **AI Mentor Integration**: Powered by Google GenAI to provide intelligent assistance, answer queries, and guide students through complex topics.
- **Global & Course Analytics**: Comprehensive data visualization using Recharts to monitor engagement and performance.
- **Community Discussions**: Discussion boards and detailed threads to foster peer-to-peer learning and collaboration.
- **Gamification**: Global leaderboards to encourage healthy competition among learners.
- **Administration & Faculty Tools**: Manage courses, monitor students, and configure application settings seamlessly.

## Tech Stack

- **Frontend Core**: React 19, Vite, TypeScript
- **Routing**: React Router DOM
- **Styling & UI**: Tailwind CSS v4, Shadcn UI, Framer Motion
- **Code Editor**: Monaco Editor (`@monaco-editor/react`)
- **Data Visualization**: Recharts
- **AI Capabilities**: Google GenAI SDK
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd urvah-dynamics-lms
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` or `.env.local` file in the root directory based on the provided `.env.example`:
   ```env
   # Required for AI Mentor features
   GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
   
   # Optional: For self-referential links or OAuth
   APP_URL="http://localhost:3000"
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:3000`.

## Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Locally preview the production build.
- `npm run lint`: Runs TypeScript type checking.
- `npm run clean`: Removes the `dist` directory.
