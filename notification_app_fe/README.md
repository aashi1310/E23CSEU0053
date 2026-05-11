# Notification Priority Inbox System

A modern and responsive React + TypeScript notification management dashboard built for frontend evaluation purposes. The application provides an interactive notification experience with priority-based sorting, filtering, responsive layouts, dark mode support, and integrated logging middleware.

---

## Features

### Notification Management
- View all notifications in a clean dashboard
- Priority Inbox with top 10 most important notifications
- Filter notifications by type:
  - Event
  - Result
  - Placement
- Read / unread distinction
- Responsive notification cards
- Real-time UI feedback

---

## Priority Inbox Logic

Notifications are prioritized using the following order:

| Type | Priority Score |
|------|------|
| Placement | 3 |
| Result | 2 |
| Event | 1 |

Sorting logic:
1. Unread notifications first
2. Higher priority notifications first
3. Latest notifications first

Only the top 10 notifications are displayed in the Priority Inbox.

---

## UI/UX Highlights

- Modern SaaS-inspired dashboard UI
- Material UI components
- Responsive design for:
  - Desktop
  - Tablet
  - Mobile
- Dark / Light mode support
- Hover animations and transitions
- Loading skeletons
- Graceful API failure handling
- Fallback mock notifications

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Material UI
- React Router DOM
- Axios

---

## Folder Structure

```txt
notification_app_fe/
│
├── public/
├── src/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── middleware/
│   ├── pages/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Logging Middleware

A reusable logging middleware was implemented to capture:
- API success/failure
- Page navigation
- Filter interactions
- Notification events
- Sorting operations

### Example Log Payload

```json
{
  "stack": "frontend",
  "level": "info",
  "package": "component",
  "message": "Priority inbox loaded"
}
```

---

## API Integration

### Base URL

```txt
http://4.224.186.213/evaluation-service
```

### Endpoints Used

#### Authentication
```txt
POST /auth
```

#### Notifications
```txt
GET /notifications
```

#### Logging
```txt
POST /logs
```

---

## Error Handling Strategy

To ensure a smooth user experience:
- Snackbar alerts are displayed for failures
- Mock notification data is used as fallback
- Loading states and retry options are provided
- Errors are logged through middleware

---

## Installation

### Clone Repository

```bash
git clone <your-repository-url>
```

### Navigate to Project

```bash
cd notification_app_fe
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application runs on:

```txt
http://localhost:3000
```

---

## Screenshots to Include

- Desktop Dashboard
- Mobile Responsive View
- Priority Inbox
- Dark Mode
- API Response
- Logging Middleware Success
- Notification Filters

---

## Future Improvements

- Real-time notifications using WebSockets
- Backend persistence
- User authentication
- Push notifications
- Notification grouping
- Advanced analytics dashboard

---

## Learning Outcome

This project provided hands-on experience with:
- Frontend architecture
- TypeScript integration
- API handling
- Error management
- Responsive UI design
- Middleware implementation
- UX-focused engineering

---

## Author

Aashika  
Frontend Engineering Evaluation Project