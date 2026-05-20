# Urvah Dynamics LMS

A modern, production-grade Learning Management System (LMS) built with React and Vite. Urvah Dynamics LMS provides an immersive, interactive learning experience with built-in code execution, AI-powered features, and comprehensive analytics.

## Features

- **Modern UI/UX**: Built with React 19, Tailwind CSS v4, and Framer Motion for a sleek, responsive, and animated user interface.
- **Interactive Code Environment**: Integrated Monaco Editor for in-browser coding exercises and assessments.
- **AI Integration**: Powered by Google's Gemini AI (`@google/genai`) for intelligent tutoring and assistance.
- **Rich Content Rendering**: Support for Markdown with GitHub Flavored Markdown (GFM) and syntax highlighting.
- **Comprehensive Analytics**: Interactive dashboards and progress tracking using Recharts.
- **Robust Routing**: Client-side routing managed by React Router DOM v7.

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: Radix UI, Base UI, Shadcn
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Code Editor**: Monaco Editor
- **Data Visualization**: Recharts
- **AI**: Google GenAI SDK

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd urvah-dynamics-lms
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Setup:
   Copy the example environment file and fill in your keys (e.g., your Gemini API key):
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs TypeScript type checking.
