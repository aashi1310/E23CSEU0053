# Notification Priority Inbox

A modern, interactive SaaS-style dashboard for managing and prioritizing notifications. Built with React, TypeScript, and Material UI, this application features a sleek UI with dark mode support, a custom priority sorting algorithm, and resilient API fallback mechanisms.

## ✨ Features

- **Premium UI/UX**: Designed with a "SaaS-dashboard" aesthetic, featuring glassmorphism navbars, dense grid layouts, pill-style filtering, and interactive hover animations on cards.
- **Priority Inbox Engine**: Automatically sorts and surfaces critical updates first using a custom priority algorithm (`Placement > Result > Event`).
- **Resilient Engineering**: Gracefully handles API failures by catching errors, serving realistic dummy mock data, and alerting the user via toast notifications—ensuring the UI never breaks.
- **Global Theming**: Complete light and dark mode toggling using explicit theme palette tokens and customized `ThemeContext`.
- **Skeleton Loaders**: Provides a high-perceived-performance experience with structural skeleton loading states instead of generic spinners.
- **Custom Middleware**: Integrated custom console logging middleware that tracks user events (e.g., clicks, filtering, API responses) across the frontend.

## 🛠 Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Bundler:** Vite
- **UI Library:** Material UI (MUI) @mui/material & @mui/icons-material
- **HTTP Client:** Axios
- **Routing:** React Router v6

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd notification_app_fe
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port specified by Vite).

## 📂 Project Structure

```
src/
├── api/          # Axios instances and API service functions
├── components/   # Reusable UI components (Navbar, Cards, Skeletons)
├── context/      # React Context providers (ThemeContext)
├── middleware/   # Custom frontend logging middleware
├── pages/        # Main application views (AllNotifications, PriorityNotifications)
├── routes/       # React Router configuration
├── utils/        # Helper functions (sorting logic, mock fallback data)
└── types/        # Global TypeScript interfaces and type definitions
```

## 🎨 Design System

This app utilizes a custom overriding of Material UI defaults:
- **Typography:** Uses `Inter` with strict weight hierarchies.
- **Colors:** Custom palette targeting premium slate/navy aesthetics (e.g., `#0f172a`, `#f8fafc`).
- **Visual Cues:** Left-colored borders on unread notifications to establish scanning hierarchy (Green for Placements, Blue for Results, Amber for Events).
